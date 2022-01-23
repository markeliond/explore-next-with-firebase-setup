import React from 'react';
import Head from 'next/head';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MenuBar from '../components/MenuBar';

export default function Home() {
  return (
    <>
        <Head>
            <title>Next with Firebase</title>
        </Head>
        <MenuBar />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Typography id='page-title' component="h1" variant="h1">
              Next with Firebase
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Typography component="h1" variant="h5">
                This is an example
              </Typography>
            </Box>
          </Box>
        </Container>
    </>
  )
}
