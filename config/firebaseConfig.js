const admin = require('firebase-admin');
const serviceAccount = require('../config/assignment3-c08d7-firebase-adminsdk-fbsvc-b3e2ca86e2.json');  // Path to the private key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();  // Access Firestore with the initialized admin SDK
