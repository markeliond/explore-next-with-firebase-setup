// export const serviceAccountKey = {
//     type: process.env.FIREBASE_SERVICE_TYPE,
//     projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
//     privateKeyId: process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID,
//     privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
//     clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
//     clientOd: process.env.FIREBASE_SERVICE_CLIENT_ID,
//     authUri: process.env.FIREBASE_SERVICE_AUTH_URI,
//     tokenUri: process.env.FIREBASE_SERVICE_TOKEN_URI,
//     authProviderX509CertUrl:
//       process.env.FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
//     clientX509CertUrl: process.env.FIREBASE_SERVICE_CLIENT_509_CERT_URL,
// };
  
// export const config = {
//     apiKey: process.env.NEXT_PUBLIC_FB_CONFIG_APIKEY,
//     authDomain: process.env.NEXT_PUBLIC_FB_CONFIG_AUTHDOMAIN,
//     databaseURL: process.env.NEXT_PUBLIC_FB_CONFIG_DATABASEURL,
//     projectId: process.env.NEXT_PUBLIC_FB_CONFIG_PROJECTID,
//     storageBucket: process.env.NEXT_PUBLIC_FB_CONFIG_STORAGEBUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FB_CONFIG_MESSAGINGSENDERID,
//     appId: process.env.NEXT_PUBLIC_FB_CONFIG_APPID,
//     measurementId: process.env.NEXT_PUBLIC_FB_CONFIG_MEASUREMENTID,
// };

export const config: { [key: string]: unknown } = {
    apiKey: "AIzaSyATy9v6tD9g9gIkseVJitizJvmOwW2BwJc",
    authDomain: "next-with-firebase-30219.firebaseapp.com",
    projectId: "next-with-firebase-30219",
    storageBucket: "next-with-firebase-30219.appspot.com",
    messagingSenderId: "698887021648",
    appId: "1:698887021648:web:f955416d14e92bfab7dd55",
    measurementId: "G-L8G8F61673"
};

  
export const emulation = {
    authEmulatorHost: "http://localhost:9099",  // process.env.NEXT_PUBLIC_FB_AUTH_HOST,
    firestoreEmulatorHost: "localhost:8080", // process.env.NEXT_PUBLIC_FB_FS_HOST,
    cloudStorageEmulatorHost: "localhost:9199", // process.env.NEXT_PUBLIC_CS_HOST,
    cloudFunctionsEmulatorHost: "localhost:5001" // process.env.NEXT_PUBLIC_FB_FN_HOST,
};

export const shouldUseEmulators = process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR == '1';