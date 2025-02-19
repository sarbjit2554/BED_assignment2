// services/userService.js
const db = require('../config/firebase'); // Firestore instance

// Add a new user to Firestore
async function addUser(userData) {
  try {
    const userRef = db.collection('users').doc(); // Automatically generate a new document ID
    await userRef.set(userData); // Add user data to Firestore
    return userRef.id; // Return the generated document ID
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error('Failed to add user');
  }
}

// Get a user by ID from Firestore
async function getUser(userId) {
  try {
    const userRef = db.collection('users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      throw new Error('User not found');
    }
    return doc.data(); // Return user data
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }
}

module.exports = { addUser, getUser };
