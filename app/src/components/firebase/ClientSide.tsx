import * as React from 'react';
import dynamic from 'next/dynamic';

const FirebaseFirestoreProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebaseFirestoreProvider
      ),
    {
      ssr: false,
    }
);

const FirebaseStorageProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebaseStorageProvider
      ),
    {
      ssr: false,
    }
);

const FirebaseFunctionsProvider = dynamic<any>(
    () =>
      import('@/components/firebase/wrappers').then(
        (mod) => mod.FirebaseFunctionsProvider
      ),
    {
      ssr: false,
    }
);


function ClientSide({ children }: { children: JSX.Element }) {

    return ( 
        <FirebaseFunctionsProvider>
            <FirebaseFirestoreProvider>
                <FirebaseStorageProvider>
                    {children}
                </FirebaseStorageProvider>
            </FirebaseFirestoreProvider>
        </FirebaseFunctionsProvider> 
    );

}
export default ClientSide;
