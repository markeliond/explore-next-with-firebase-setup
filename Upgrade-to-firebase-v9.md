Following instructions on the [firebase upgrade page](https://firebase.google.com/docs/web/modular-upgrade).

## Frontend

- Upgrade firebase in the app directory: `$ npm i firebase@9`. This installed v9.6.6.

- Upgrade reactfire in the app directory ` npm install reactfire@latest`. This installed v4.2.1

- Add `useFirebaseApp()` hook to main app wrapper:

```javascript
function FirebaseComponents({ children }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
```

- Change imports to straight v9.

```javascript
import { getAuth } from "firebase/auth"; // Firebase v9+
import { collection, where, query, addDoc } from "firebase/firestore"; // note how each of the functons need to be imported separately.
```

- Re-create wrapper and emulator connections

Note this loads everything at once. We might want to do some lazy loading of the non-auth libraries.

Note using the [non-suspense version](https://github.com/FirebaseExtended/reactfire/blob/main/example/withoutSuspense) of reactfire.

```javascript
const FirebaseComponents = ({ children }) => {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  const functions = getFunctions(app);

  const [isConfigured, setIsConfigured] = useState(false);

  if (!isConfigured) {
    if (shouldUseEmulators) {
      connectAuthEmulator(auth, "http://localhost:9099");
      connectStorageEmulator(storage, "localhost", 9199);
      connectFirestoreEmulator(firestore, "localhost", 8080);
      connectFunctionsEmulator(functions, "localhost", 5001);

      console.log("finshed configuring enumlators");
    }
    console.log("finshed configuring firebase components");
    setIsConfigured(true);
  }

  return (
    <>
      <AuthProvider sdk={auth}>
        <FunctionsProvider sdk={functions}>
          <FirestoreProvider sdk={firestore}>
            <StorageProvider sdk={storage}>{children}</StorageProvider>
          </FirestoreProvider>
        </FunctionsProvider>
      </AuthProvider>
    </>
  );
};
```

- Improved implementation pattern for emulator load

inspired from [here](https://github.com/CodingCatDev/ccd-starter-nextjs-tailwind-firebase/blob/53074f6176d3c366b0df42aa3fc4ee16b75b2966/frontend/nextjs-tailwind/src/components/firebase/wrappers.tsx)

Key parts:

1. wrappers set up for firebase components that pick up additional settings from each service that allow whether the emulator is already connected. These are found by e.g `const storage = getStorage(app); console.log(storage);`
1. A new interface is declared in the wrapper file that picks out these settings for each and a test is added for each wrapper appropriately.
1. In the main `_app.tsx` we dynamically import the components from `wrappers.tsx`, setting for client side only (`ssr: false`) and then the App component includes these dynamic links - but only the main app and auth for fast loading.
1. Create a client side wrapper that includes the additional providers for storage, functions, firestore that is loaded after the auth completes.
1. Wrap in performance provider, ensuring this is only loaded if we are not doing local emulation.

- Ensure that .vercelignore in in the vercel root (ie `app.`) to be detected!

## Backend

- Upgrade firebase-functions `$ npm upgrade firebase-functions`

- Upgrade to the next major version of firebase-admin `$ npm install firebase-admin@10`

This gives:

```json
    "firebase-admin": "^10.0.2",
    "firebase-functions": "^3.17.1"
```

- Change imports on functions

```javascript
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';

initializeApp();

export const function = functions.https.onCall(async (data, context) => {
  const firestore = getFirestore();

  const testCollection = firestore.collection('testCollection');
  const testDoc = await testCollection.where('testId','==',something).get();
}

export const helloWorldAuthFunc = functions.auth
  .user()
  .onCreate((user, context) => {
    functions.logger.info('Created firestore user', user.uid);
    return null;
});

```

- Rebuild `$ cd functions && npm run build`
