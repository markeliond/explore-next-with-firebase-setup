import React from 'react';
import type { AppProps } from 'next/app';

import { FirebaseAppProvider } from 'reactfire';
import { Auth } from '../components/Auth';


// Import auth directly because most components need it
// Other Firebase libraries can be lazy-loaded as-needed
import 'firebase/auth';

const firebaseConfig: { [key: string]: unknown } = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyATy9v6tD9g9gIkseVJitizJvmOwW2BwJc",
    authDomain: "next-with-firebase-30219.firebaseapp.com",
    projectId: "next-with-firebase-30219",
    storageBucket: "next-with-firebase-30219.appspot.com",
    messagingSenderId: "698887021648",
    appId: "1:698887021648:web:f955416d14e92bfab7dd55",
    measurementId: "G-L8G8F61673"
};



function MyApp({ Component, pageProps }: AppProps) {

    return ( 
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <Component {...pageProps} />
        </FirebaseAppProvider>
    );

}
export default MyApp
