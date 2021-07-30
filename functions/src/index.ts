import * as functions from "firebase-functions";
import next from "next";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// const nextjsDistDir = ".next";
const nextjsServer = next({
  dev: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore // due to issue with type file
  conf: {
    distDir: ".next",
  },
});


const nextjsHandle = nextjsServer.getRequestHandler();

export const nextServe = functions.https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
