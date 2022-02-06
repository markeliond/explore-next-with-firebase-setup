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


// const FirebaseComponents = ({children}) => {
    
//     const [isConfigured, setIsConfigured] = useState(false);

//     const app = useFirebaseApp();

//     const auth = getAuth(app);
//     const storage = getStorage(app);
//     const functions = getFunctions(app);
//     const firestore = getFirestore(app);

//     // // firestore and enable offline persistence
//     // const {status: firestoreStatus, data: firestore} = useInitFirestore(async (firebaseApp) => {
//     //     const db = initializeFirestore(firebaseApp, {});
//     //     await enableIndexedDbPersistence(db);
//     //     return db;
//     // });

//     // const isLoading = ((firestoreStatus === 'loading') || (false));
      
//     // // just return the auth provider while we lazy load the others
//     // if (isLoading) {
//     //     if (shouldUseEmulators) {
//     //         connectAuthEmulator(auth, "http://localhost:9099");
//     //     }
        
//     //     return (
//     //         <>
//     //             <AuthProvider sdk={auth}>
//     //                 <p>Loading...</p>;
//     //             </AuthProvider>
//     //         </>
//     //     )
//     // }
        
//     // everything is loaded, so set up the emulators and wrap all child components
//     if (!isConfigured) {
//         if (shouldUseEmulators) {
            
//             connectAuthEmulator(auth, "http://localhost:9099");
//             connectStorageEmulator(storage, 'localhost', 9199);
//             connectFirestoreEmulator(firestore, 'localhost', 8080);
//             connectFunctionsEmulator(functions, 'localhost', 5001);

//             console.log('finshed configuring enumlators')
//         }
//         console.log('finshed configuring firebase components')
//         setIsConfigured(true);
//     }

//     return (
//         <>
//             <AuthProvider sdk={auth}>
//                 <FunctionsProvider sdk={functions}>
//                     <FirestoreProvider sdk={firestore}>
//                         <StorageProvider sdk={storage}>
//                             {children}
//                         </StorageProvider>
//                     </FirestoreProvider>
//                 </FunctionsProvider>
//             </AuthProvider>
//         </>
//     );
// };

function App({ Component, pageProps }: AppProps) {

    return ( 
        <div className="flex flex-wrap justify-around p-4">
            <FirebaseProvider >
                <FirebaseAuthProvider>
                  <Component {...pageProps} />
                </FirebaseAuthProvider>
            </FirebaseProvider>
        </div>
    );

}
export default App;
