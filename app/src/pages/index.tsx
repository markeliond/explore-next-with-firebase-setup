import React from 'react';
import Head from 'next/head';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

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
            <svg xmlns="http://www.w3.org/2000/svg" width="109.002" height="22.719" viewBox="0 0 109.002 22.719">
              <g id="Logo" transform="translate(-27.217 -23.641)">
                <text id="KONECT" transform="translate(59.22 40.628)" fill="#2E457B" fontSize="16" fontFamily="Montserrat-Medium, Montserrat" fontWeight="500"><tspan x="0" y="0" letterSpacing="0.075em">K</tspan><tspan y="0" letterSpacing="0.099em">O</tspan><tspan y="0" letterSpacing="0.1em">N</tspan><tspan y="0" letterSpacing="0.097em">E</tspan><tspan y="0" letterSpacing="0.092em">C</tspan><tspan y="0">T</tspan></text>
                <g id="Group_455" data-name="Group 455" transform="translate(-0.148 3.266)">
                  <path id="Path_468" data-name="Path 468" d="M18.8,20.444a40.5,40.5,0,0,1-8.633-6.933A121.7,121.7,0,0,1,2,2,42.206,42.206,0,0,1,3.371,12.25a65.262,65.262,0,0,1-.932,10.469s3.886-7.564,7.918-12.168A43.678,43.678,0,0,1,18.937,3.1" transform="translate(26.365 19.375)" fill="none" stroke="#2E457B" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2"/>
                  <path id="Path_469" data-name="Path 469" d="M11.475,20.024l1.313,1.625-.722,1.006-1.028-2.038Z" transform="translate(22.658 11.555)" fill="#2E457B"/>
                </g>
              </g>
            </svg>
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
