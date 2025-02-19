// src/api/v1/services/db.ts
import * as admin from 'firebase-admin';

// Mock Firestore in the test environment
let db: FirebaseFirestore.Firestore;

if (process.env.NODE_ENV === 'test') {
  db = {
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnThis(),
      get: jest.fn(),
      set: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }),
  } as any; // Mocking Firestore methods
} else {
  admin.initializeApp();
  db = admin.firestore();
}

export default db;
