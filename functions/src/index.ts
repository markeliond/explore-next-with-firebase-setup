import * as functions from "firebase-functions";
import next from "next";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const nextjsDistDir = ".next";
const nextjsServer = next({
  dev: false,
  dir: ".",
  conf: {
    distDir: nextjsDistDir,
    experimental: {

    },
    future: {

    },
  },
});


const nextjsHandle = nextjsServer.getRequestHandler();

export const nextServe = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
