  
import React from 'react';
import { connectAuthEmulator, getAuth } from '@firebase/auth';
import {
  connectFirestoreEmulator,
  Firestore,
  FirestoreSettings,
  getFirestore,
} from '@firebase/firestore';
import {
  useFirebaseApp,
  AuthProvider,
  FirestoreProvider,
  FirebaseAppProvider,
  StorageProvider, 
  FunctionsProvider, 
  useInitFirestore
} from 'reactfire';
import { 
  getStorage, 
  connectStorageEmulator,
  FirebaseStorage, 
} from 'firebase/storage';
import { 
  getFunctions, 
  connectFunctionsEmulator,
  Functions 
} from 'firebase/functions';
import { config, emulation, shouldUseEmulators } from '@/config/firebase';

interface FirestoreExt extends Firestore {
  _settings: FirestoreSettings;
}

interface FirebaseStorageExt extends FirebaseStorage {
  _host: string;
}

interface FirebaseFunctionsExt extends Functions {
  emulatorOrigin: string;
}

export const FirebaseProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      {children}
    </FirebaseAppProvider>
  );
};

export const FirebaseAuthProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  if (shouldUseEmulators && emulation.authEmulatorHost && !auth.emulatorConfig) {
    connectAuthEmulator(auth, emulation.authEmulatorHost);
    console.log(`Connected to auth emulator on ${emulation.authEmulatorHost}`);
  }
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

export const FirebaseFirestoreProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const app = useFirebaseApp();
  const firestore = getFirestore(app) as FirestoreExt;
  if (
    shouldUseEmulators &&
    emulation.firestoreEmulatorHost &&
    firestore?._settings?.host != emulation.firestoreEmulatorHost
  ) {
    const { urn, port } = hostSplitter(emulation.firestoreEmulatorHost);
    if (urn && port) {
      connectFirestoreEmulator(firestore, urn, port);
      console.log(`Connected to firestore emulator on ${emulation.firestoreEmulatorHost}`);
    }
  }
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>;
};

const hostSplitter = (host: string) => {
  const split = host.split(':');
  let urn = '';
  let port = 0;
  if (split && split.length == 2) {
    urn = split[0];
    port = parseInt(split[1]);
    if (isNaN(port)) {
      port = 0;
    }
  }
  return { urn, port };
};

// from: https://github.com/CodingCatDev/ccd-starter-nextjs-tailwind-firebase/blob/53074f6176d3c366b0df42aa3fc4ee16b75b2966/frontend/nextjs-tailwind/src/components/firebase/wrappers.tsx

export const FirebaseStorageProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const app = useFirebaseApp();
  const storage = getStorage(app) as FirebaseStorageExt;
  console.log(storage);
  if (
    shouldUseEmulators && 
    emulation.cloudStorageEmulatorHost &&
    storage?._host != emulation.cloudStorageEmulatorHost
    ) {
    const { urn, port } = hostSplitter(emulation.cloudStorageEmulatorHost);
    if (urn && port) {
      connectStorageEmulator(storage, urn, port);
      console.log(`Connected to storage emulator on ${emulation.cloudStorageEmulatorHost}`);
    }
  }
  return <StorageProvider sdk={storage}>{children}</StorageProvider>;
};

export const FirebaseFunctionsProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const app = useFirebaseApp();
  const functions = getFunctions(app) as FirebaseFunctionsExt;
  console.log(functions);
  if (
    shouldUseEmulators && 
    emulation.cloudFunctionsEmulatorHost &&
    !functions?.emulatorOrigin?.includes(emulation.cloudFunctionsEmulatorHost)
    ) {
    const { urn, port } = hostSplitter(emulation.cloudFunctionsEmulatorHost);
    if (urn && port) {
      connectFunctionsEmulator(functions, urn, port);
      console.log(`Connected to functions emulator on ${emulation.cloudFunctionsEmulatorHost}`);
    }
  }
  return <FunctionsProvider sdk={functions}>{children}</FunctionsProvider>;
};