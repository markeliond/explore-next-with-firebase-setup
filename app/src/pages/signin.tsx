import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { useSigninCheck } from 'reactfire';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { SignInForm, AuthLoading } from '../components/Auth';
import MenuBar from '../components/MenuBar';

export default function SignInPage() {

    const router = useRouter();

    // find the target page from the query or default to dashboard
    const destPage = decodeURIComponent(router.query?.routeTo as string || 'dashboard');

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch(`/${destPage}`);
    }, [])

    const { status, data: signinResult } = useSigninCheck();

    
    useEffect(() => {
        if ((status === 'success') && signinResult?.signedIn) {
            router.push(`/${destPage}`);
        }
    }, [signinResult, status]);
    
    
    

    return (
    <>
        <Head>
            <title>Sign In</title>
        </Head>

        <MenuBar />

        <Container component="main" maxWidth="xs">
            <CssBaseline />

            {(status === 'loading') &&
                <AuthLoading />
            }
            {(status === 'success') &&
                <SignInForm />
            }

        </Container>
    </>
  )
}
