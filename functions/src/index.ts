import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// NOTE: reconfigured functions and server based on example at:
// https://github.com/jthegedus/firebase-gcp-examples/tree/main/functions-nextjs