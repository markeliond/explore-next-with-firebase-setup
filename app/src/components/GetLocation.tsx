import React, { useState, useEffect } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

import { useFirestore, useCallableFunctionResponse, useUser, useFunctions } from 'reactfire';

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
                
          const ref = doc(firestore, 'players', user.data.uid);
        if (timestamp) {
          
          setDoc(ref, {
              name: user.data.displayName,
              locAccuracy: accuracy,
              locTimestamp: timestamp,
              lat: lat,
              long: lng,
              gameId: 'test',
              team: 'blue',
          }, { merge: true })
          .then(res => console.log('updated location on firestore'))
          .catch(err => console.error('unable to update location'));           
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

    const checkHoldingsFn = httpsCallable<null, null>(functions, 'calcBaseHoldings');
    
    const checkHoldings = () => {
      checkHoldingsFn()
        .then((result) => {
            console.log(`Ran checkholdings successfully`);
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