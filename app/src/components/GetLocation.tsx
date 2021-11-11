import React, { useState, useEffect } from 'react';

import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useUser, useFunctions } from 'reactfire';

type PlayerDoc = {
    name: string; 
    locAccuracy: number;
    lat: number;
    long: number;
    locTimeStamp: number;
    gameId: string;
    team: string;
    id: string;
}

const locationUpdateInterval = 10000 // 10s;

const GetLocation = () => {
    const user = useUser();
    const firestore = useFirestore();
    const functions = useFunctions();
        
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [lookupStatus, setStatus] = useState(null);
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        getLocation();
        checkHoldings();
      }, locationUpdateInterval);
      return () => clearInterval(interval);
    }, []);

    useEffect( () => {
        // upload to firestore
        
          const ref = firestore.collection('players').doc(user.data.uid);
        if (timestamp) {
          
          ref.set({
              name: user.data.displayName,
              locAccuracy: accuracy,
              locTimestamp: timestamp,
              lat: lat,
              long: lng,
              gameId: 'test',
              team: 'blue',
          }, { merge: true }).then(res => console.log('updated location on firestore')).catch(err => console.error('unable to update location'));           
        }
    }, [timestamp, accuracy, lat, lng]);
    
    const getLocation = () => {
        if (!navigator.geolocation) {
          setStatus('Geolocation is not supported by your browser');
        } else {
          setStatus('Locating...');
          navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setAccuracy(position.coords.accuracy);
            setTimestamp(position.timestamp);
            setStatus(null);

            
          }, () => {
            setStatus('Unable to retrieve your location');
          });
        }
      }

    const checkHoldingsFn = functions.httpsCallable('calcBaseHoldings');
    
    const checkHoldings = () => {
      checkHoldingsFn()
        .then((result) => {
            // Read result of the Cloud Function.
            const sanitizedMessage = result?.data?.text;
            console.log(`Message from checkholdings: ${sanitizedMessage}`);
        });
    }
    


    return (
        <>
            <button onClick={getLocation}>Get Location</button>
            <h1>My Coordinates</h1>
            <p>{lookupStatus}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
            {accuracy && <p>Accuracy: {accuracy}</p>}
            {timestamp && <p>Timestamp: {timestamp}</p>}
        </>
    )
}

export default GetLocation