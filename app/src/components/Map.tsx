import React, { useState } from 'react';
import { useMapEvent, MapContainer, Marker, Popup, TileLayer, FeatureGroup , Circle, CircleMarker, Tooltip, Rectangle } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire';
import { ConstructionOutlined } from '@material-ui/icons';
// import firebase from 'firebase';
// require('firebase/firestore')


const currentGame = 'test';

const PersonIconBlue = L.icon({
    iconUrl: '/personicon-blue.png',
    iconSize: [30,30],

});
const PersonIconGreen = L.icon({
    iconUrl: '/personicon-green.png',
    iconSize: [30,30],

});

const ClickMarker = () => {
    const [clickPosition, setClickPosition] = useState(null);
    const map = useMapEvent('click', (ev) => {
        console.log(ev);
        setClickPosition(ev.latlng);

    });

    return clickPosition === null ? null : (
        <Marker position={clickPosition} icon={PersonIconGreen}>
          <Popup>You clicked here</Popup>
        </Marker>
      )
}

const Map = () => {

    const firestore = useFirestore();

    
    // const ref = firestore.doc('players/IzX8yJjQZS2qSGyKhmGe');

    // const { status, data: player } = useFirestoreDocData<{
    //     name: string; 
    //     locAccuracy: number;
    //     location: unknown;
    //     locTimeStamp: number;
    //     gameId: string;
    //     team: string;
    //     id: string;
    // }>(ref);

    const playersCollection = firestore.collection('players');
    const playersQuery =  playersCollection.where('gameId','==',currentGame);
    const { status: collectionStatus, data: players } = useFirestoreCollectionData<{
        name: string; 
        locAccuracy: number;
        lat: number;
        long: number;
        locTimeStamp: number;
        gameId: string;
        team: string;
        id: string;
    }>(playersQuery, {
      idField: 'id',
    });

    console.log(players);
    console.log(collectionStatus);

    const basesCollection = firestore.collection('bases');
    const basesQuery =  basesCollection.where('gameId','==',currentGame);
    const { status: baseCollectionStatus, data: bases } = useFirestoreCollectionData<{
        name: string; 
        lat: number;
        long: number;
        radius: number
        locTimeStamp: number;
        gameId: string;
        originalTeam: string;
        owningTeam: string;
        id: string;
    }>(basesQuery, {
      idField: 'id',
    });

    //const PlayerIcon = (player['team']) === 'blue' ? PersonIconBlue : PersonIconGreen

  return (
    <MapContainer center={[-41.300295, 174.7650568]} zoom={16} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {/* <FeatureGroup >
              <Rectangle bounds={[[-41.300295, 174.7650568],[-41.2940953, 174.7798363]]} pathOptions={{color:'black', fillColor: 'gray'}} />
        </FeatureGroup > */}

        {players && (players?.length > 0) && (collectionStatus === 'success') &&
            players.map(player => {
                const PlayerIcon = (player['team']) === 'blue' ? PersonIconBlue : PersonIconGreen
                return (
                    <Marker key={player.id} position={[player['lat'], player['long']]} icon={PlayerIcon}>
                    <Popup>
                        <p>{player['name']}</p>
                        <p>{player['lat']}  {player['long']}</p>
                        <p>{player['locTimestamp']}</p>
                        <p>{player['locAccuracy']}</p>
                    </Popup>
                    </Marker>
                )
            }
               
            )
        }
        
        <ClickMarker />


        {/* <FeatureGroup >
            <Popup>
                Team A Base
            </Popup>
            <Circle center={[-41.300295, 174.7650568]} pathOptions={{color:'darkred', fillColor: 'red'}} radius={20} />
        </FeatureGroup >

        <FeatureGroup >
            <Popup>
                Team B Base
            </Popup>
            <Circle center={[-41.2940953, 174.7798363]} pathOptions={{color:'darkblue', fillColor: 'blue'}} radius={20} />
        </FeatureGroup > */}

        {bases && (bases?.length > 0) && (baseCollectionStatus === 'success') &&
            bases.map(base => {
                const isCaptured = base.originalTeam !== base.owningTeam ? true : false;
                return (
                    <FeatureGroup key={base.id}>
                        <Popup>{base.name} <br/>{isCaptured ? 'Captured!' : 'Held'}<br/> Owning Team: {base.owningTeam}<br/> Original Team: {base.originalTeam}</Popup>
                        <Circle center={[base.lat, base.long]} pathOptions={{color:`${base.owningTeam}`, fillColor: base.originalTeam}} radius={base.radius} />
                    </FeatureGroup >
                )
            }
               
            )
        }

        {/* <CircleMarker
            center={[-41.305, 174.7651]}
            pathOptions={{ color: 'green' }}
            radius={20}>
            <Tooltip>Tooltip for CircleMarker</Tooltip>
    </CircleMarker> */}
      
    </MapContainer>
  )
}

export default Map