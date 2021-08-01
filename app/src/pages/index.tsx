import React from 'react';
import Head from 'next/head';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Auth } from '../components/Auth';

export default function Home() {
  return (
    <>
        <Head>
            <title>Next with Firebase</title>
        </Head>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Auth />
          </Grid>
        </Grid>
    </>
  )
}
