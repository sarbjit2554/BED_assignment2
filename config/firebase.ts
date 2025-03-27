import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore, FieldValue } from "firebase-admin/firestore";
import dotenv from "dotenv";
import * as fs from "fs";

dotenv.config(); // Load .env variables

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY_PATH is not defined in the .env file");
}

// ✅ Read the JSON key file
const serviceAccount: ServiceAccount = JSON.parse(
    fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH as string, "utf-8")
);

initializeApp({
    credential: cert(serviceAccount),
});

const db: Firestore = getFirestore();

console.log("✅ Firebase initialized successfully!");

export { db, FieldValue };
