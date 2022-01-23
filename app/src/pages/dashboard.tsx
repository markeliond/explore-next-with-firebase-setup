import React from 'react';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { AuthWrapper, AuthFallback } from '../components/Auth';
import MenuBar from '../components/MenuBar';

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
            
            
            </AuthWrapper>

        </Container>
    </>
  )
}
