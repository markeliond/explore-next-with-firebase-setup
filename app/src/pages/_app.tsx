import React, { useState } from 'react';
import type { AppProps } from 'next/app';




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


import { getAuth, connectAuthEmulator } from 'firebase/auth'; // Firebase v9+
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'; // Firebase v9+

import { FirebaseAppProvider, FirestoreProvider, AuthProvider, useFirebaseApp } from 'reactfire';

function FirebaseComponents({ children }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  if (shouldUseEmulators) {
    // Set up emulators
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
  }

  // any child components will be able to use `useUser`,  etc
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <>{children}</>
      </FirestoreProvider>
    </AuthProvider>
  );
}

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
