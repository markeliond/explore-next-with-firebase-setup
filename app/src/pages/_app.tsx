import React, { useState } from 'react';
import type { AppProps } from 'next/app';

var globalThis = require('globalthis/polyfill')();

import { FirebaseAppProvider, useAuth, useFirestore, useStorage, useFunctions } from 'reactfire';


// Import auth directly because most components need it
// Other Firebase libraries can be lazy-loaded as-needed
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';



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


const shouldUseEmulators = process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR == '1';

// // Our components will lazy load the
// // SDKs to decrease their bundle size.
// // Since we know that, we can start
// // fetching them now
// const preloadSDKs = firebaseApp => {
//     return Promise.all([
//         preloadFirestore({
//             firebaseApp: firebaseApp,
//             setup: async (firestore) => {
//                 //await firestore().enablePersistence();
//                 if (shouldUseEmulators) firestore().useEmulator('localhost', 8080);
//                 return;
//             }
//         }),
//         preloadStorage({
//             firebaseApp,
//             setup: async (storage) => {
//                 storage().setMaxUploadRetryTime(10000);
//                 if (shouldUseEmulators) storage().useEmulator("localhost", 9199);
//                 return;
//             }
//         }),
//         preloadAuth({ 
//             firebaseApp: firebaseApp, 
//             setup: async (auth) => {
//                 if (shouldUseEmulators) auth().useEmulator("http://localhost:9099");
//                 await auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//                 return;
//             }}),
//         ]);
// };

// const preloadData = async firebaseApp => {
//     const user = await preloadUser(firebaseApp);

//     if (user) {
//         preloadFirestoreDoc(
//         firestore => firestore.doc('count/counter'),
//         firebaseApp
//         );
//     }
// };


const FirebaseComponents = ({children}) => {
    
    const auth = useAuth();
    const storage = useStorage();
    const firestore = useFirestore();
    const functions = useFunctions();
    
    const [isConfigured, setIsConfigured] = useState(false);

    if (!isConfigured) {
        if (shouldUseEmulators) {
            auth.useEmulator("http://localhost:9099");
            storage.useEmulator("localhost", 9199);
            firestore.useEmulator('localhost', 8080);
            functions.useEmulator('localhost', 5001);
            console.log('finshed configuring enumlators')
        }
        console.log('finshed configuring firebase components')
        setIsConfigured(true);
    }

    return (
        <>
            {children}
        </>
    );
};

function App({ Component, pageProps }: AppProps) {

    return ( 
        <div className="flex flex-wrap justify-around p-4">
            <FirebaseAppProvider firebaseConfig={firebaseConfig} >
                <FirebaseComponents> 
                    <Component {...pageProps} />
                </FirebaseComponents>
            </FirebaseAppProvider>
        </div>
    );

}
export default App;
