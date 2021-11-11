import React, { useState } from 'react';
import { useMapEvent, MapContainer, Marker, Popup, TileLayer, FeatureGroup , Circle, CircleMarker, Tooltip, Rectangle } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useFunctions } from 'reactfire';
import { ConstructionOutlined } from '@material-ui/icons';

import Stack from '@material-ui/core/Stack';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form';


const currentGame = 'test';

type BaseDoc = {
    name: string; 
    lat: number;
    long: number;
    radius: number
    locTimeStamp: number;
    locAccuracy: number;
    gameId: string;
    originalTeam: string;
    owningTeam: string;
    id?: string;
}

const PersonIconGreen = L.icon({
    iconUrl: '/personicon-green.png',
    iconSize: [30,30],

});

const ClickMarker = (props: {clickPosition: any; setClickPostionFn: React.Dispatch<any>}) => {
    
    const map = useMapEvent('click', (ev) => {
        console.log(ev);
        // setClickPosition(ev.latlng);
        props.setClickPostionFn(ev.latlng);
    });

    return props?.clickPosition === null ? null : (
        <Marker position={props?.clickPosition} icon={PersonIconGreen}>
          <Popup>Set New Base Here</Popup>
        </Marker>
      )
}

const AddBases = () => {

    const firestore = useFirestore();

    const [ clickedPosition, setClickedPosition ] = useState(null);
    
    const basesCollection = firestore.collection('bases');
    const basesQuery =  basesCollection.where('gameId','==',currentGame);
    const { status: baseCollectionStatus, data: bases } = useFirestoreCollectionData<BaseDoc>(basesQuery, {
      idField: 'id',
    });

    const onSubmit = fields => {
        console.log(fields);
        
        basesCollection.add({
            name: fields.basename,
            lat: Number(clickedPosition.lat),
            long: Number(clickedPosition.lng),
            radius: Number(fields.radius),
            locTimeStamp: Date.now(),
            locAccuracy: 0,
            gameId: fields.gameId,
            originalTeam: fields.team,
            owningTeam: fields.team,
        })

        setClickedPosition(null);
    }

    

    
  return (
    <Grid container spacing={2}>
        <Grid item xs={8}>
                 
                        
                    
    
        <MapContainer center={[-41.300295, 174.7650568]} zoom={16} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

             
            <ClickMarker clickPosition={clickedPosition} setClickPostionFn={setClickedPosition}/>


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

 
        </MapContainer>
    </Grid>
        <Grid item xs={4}>
            {clickedPosition && 
            <Form 
                onSubmit={onSubmit}
                render={({handleSubmit, form}) => (
                    <form onSubmit={async event  =>  {
                        await handleSubmit(event);
                        form.reset(); } } >
                    <Stack>
                      <div>
                        <label>Base Name</label>
                        <Field
                            name="basename"
                            component="input"
                            type="text"
                            />
                        </div>
                      <div>
                        <label>Radius</label>
                        <Field
                            name="radius"
                            component="input"
                            type="text"
                            />
                        </div>
                      <div>
                        <label>GameId</label>
                        <Field
                            name="gameId"
                            component="input"
                            type="text"
                            />
                        </div>
                      <div>
                        <label>Team</label>
                        <Field
                            name="team"
                            component="input"
                            type="text"
                            />
                        </div>
                      <div>
                        
                        <p>Lat: {clickedPosition?.lat}</p>
                        <p>Long: {clickedPosition?.lng}</p>
                        
                        </div>
                    </Stack>
                  <button type="submit">Add Base</button>  
                  </form>
                    
                )}
                
            />
            }
            
           
        </Grid>
    </Grid>
  )
}

export default AddBases