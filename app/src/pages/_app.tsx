import React, { useState } from 'react';
import type { AppProps } from 'next/app';

// import { FirebaseAppProvider, AuthProvider, StorageProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp, useInitFirestore  } from 'reactfire';
import dynamic from 'next/dynamic';


const FirebaseProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebaseProvider
      ),
    {
      ssr: false,
    }
  );
  
  const FirebaseAuthProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebaseAuthProvider
      ),
    {
      ssr: false,
    }
  );

  const FirebasePerformanceProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebasePerformanceProvider
      ),
    {
      ssr: false,
    }
  );


function App({ Component, pageProps }: AppProps) {

    return ( 
        <div className="flex flex-wrap justify-around p-4">
            <FirebaseProvider >
                <FirebasePerformanceProvider>
                  <FirebaseAuthProvider>
                    <Component {...pageProps} />
                  </FirebaseAuthProvider>
                </FirebasePerformanceProvider>
            </FirebaseProvider>
        </div>
    );

}
export default App;
