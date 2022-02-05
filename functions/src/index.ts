import * as functions from "firebase-functions";

import * as admin from'firebase-admin';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// NOTE: reconfigured functions and server based on example at:
// https://github.com/jthegedus/firebase-gcp-examples/tree/main/functions-nextjs

// test to see if triggers work
export const helloWorldFunc = functions.firestore
  .document('users/{userId}')  
  .onWrite((change, context) => {
    functions.logger.info('Created firestore user', change.after.id, change.after.data());
    return null;
});

// test to see if triggers work
export const helloWorldAuthFunc = functions.auth
  .user()
  .onCreate((user, context) => {
    functions.logger.info('Created firestore user', user.uid);
    return null;
});

const isWithinRadius = (baselat: number, baselong: number, testlat: number, testlong: number, radius: number): boolean => {
  
  function calcDiffLatLongInMeters (ilat1: number, ilon1: number, ilat2: number, ilon2: number)
  {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    let lon1 =  ilon1 * Math.PI / 180;
    let lon2 = ilon2 * Math.PI / 180;
    let lat1 = ilat1 * Math.PI / 180;
    let lat2 = ilat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371000;

    // calculate the result
    return(c * r);
  }


  const distance = calcDiffLatLongInMeters(baselat, baselong, testlat, testlong);
  const isWithin = ( distance < radius );
  
  functions.logger.info(`isWithin calc: distance=${distance}; radius=${radius}; isWithin=${isWithin}`);

  return isWithin;
}


export const calcBaseHoldings = functions.https.onCall(async (data, context) => {

  functions.logger.info(`Running holding calc at ${Date.now()}`);
  functions.logger.info(process.env.FIRESTORE_EMULATOR_HOST);
  
  
  const basesCollection = admin.firestore().collection('bases');
  const bases = await basesCollection.where('gameId','==','test').get();

  functions.logger.info(`Loaded bases - ${bases.size}`);
  
  const playersCollection = admin.firestore().collection('players');
  const players = await playersCollection.where('gameId','==','test').get();

  functions.logger.info(`Loading players - ${players.size}`);
  

  if (bases.empty) return;  // just exit if no bases
  if (players.empty) return;  // just exit if no players
  
  // loop over each base and see if we have someone there
  bases.forEach(base => {
    const currentBase = base.data();
    functions.logger.info(`Found Base: ${currentBase["name"]}`);
    functions.logger.info(currentBase);
    let countOfPlayersInside = 0;
    
    players.forEach(player => {
      const playerData = player.data();
      functions.logger.info(`Found Player: ${playerData["name"]}`);
      functions.logger.info(playerData);
      if (isWithinRadius(currentBase["lat"], currentBase["long"], playerData["lat"], playerData["long"], currentBase["radius"])) countOfPlayersInside++;
    })

    const isTaken = countOfPlayersInside > 0;
    functions.logger.info(`Base: ${currentBase.name} is taken? ${isTaken}`);

    if (!!isTaken && currentBase['owningTeam'] === 'blue') {
      // taken
      base.ref.set({ owningTeam: 'green' }, {merge: true});
      functions.logger.info(`Base: ${currentBase["name"]} changing owning team`);
      
    } else if (!isTaken && currentBase['owningTeam'] === 'green') {
      // back to untaken
      base.ref.set({ owningTeam: 'blue' }, {merge: true})
      functions.logger.info(`Base: ${currentBase["name"]} changing owning team`);
    
    }
  })

})
