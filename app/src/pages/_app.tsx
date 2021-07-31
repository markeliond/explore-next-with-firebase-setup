import type { AppProps } from 'next/app'

// import initialiseFirebaseApp from '../utils/firebase-config';

// import firebase from 'firebase/app';
// import 'firebase/auth';


// import { useAuthState } from 'react-firebase-hooks/auth';

console.log("Running _app.tsx outside function");

function MyApp({ Component, pageProps }: AppProps) {
    // const fbapp = initialiseFirebaseApp();

    // const [user, loading, error] = useAuthState(firebase.auth());

    console.log("Running _app.tsx inside MyApp component");

    // if (!user) {
    //     router.push(`/auth/signin`);
    // } else {
        return <Component {...pageProps} />
    // }

}
export default MyApp
