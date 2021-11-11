import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { AuthWrapper, AuthFallback } from '../components/Auth';
import MenuBar from '../components/MenuBar';

export default function MapPage() {

    const Map = dynamic(
        () => import('../components/Map'), // replace '@components/map' with your component's location
        { ssr: false } // This line is important. It's what prevents server-side render
      )

    const GetLocation = dynamic(
        () => import('../components/GetLocation'), // replace '@components/map' with your component's location
        { ssr: false } // This line is important. It's what prevents server-side render
    )

  return (
    <>
        <Head>
            <title>Map Page</title>
        </Head>

        <MenuBar />

        <Container component="main" maxWidth="lg">
            <CssBaseline />

            <AuthWrapper fallback={<AuthFallback />}>
            <Box sx={{m: 6}}>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Map />
                        
                    </Grid>
                    <Grid item xs={4}>
                        <GetLocation /> 
                    </Grid>
                </Grid>

            </Box>
                           
            
            
            </AuthWrapper>

        </Container>
    </>
  )
}
