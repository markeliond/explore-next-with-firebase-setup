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

const ClientSide = dynamic<any>(() => import('@/components/firebase/ClientSide'), {
    ssr: false,
  });

export default function Dashboard() {
  return (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>

        

        <MenuBar />

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <AuthWrapper fallback={<AuthFallback />}>

            <ClientSide>

                <Box
                    sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
            
                    <Typography id='page-title' component="h1" variant="h1">
                        Dashboard
                    </Typography>
                    
                    <Box sx={{ mt: 1 }}>
                        <Typography component="h1" variant="h5">
                            This is an example
                        </Typography>
                    </Box>
                </Box>

                </ClientSide>
            
            
            </AuthWrapper>

        </Container>

        
    </>
  )
}
