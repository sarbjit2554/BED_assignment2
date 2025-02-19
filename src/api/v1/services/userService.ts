// src/api/v1/services/userService.ts

import db from './db'; // Import Firestore instance

// Define the structure of a user document
interface User {
  id: string;
  name: string;
  email: string;
}

class UserService {
  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return null; // User not found
      }
      return userDoc.data() as User; // Return user data
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error fetching user: ' + error.message); // Ensure error is an instance of Error
      }
      throw new Error('Unknown error occurred during fetching user.');
    }
  }

  // Create a new user
  async createUser(user: User): Promise<User> {
    try {
      const userRef = db.collection('users').doc(user.id);
      await userRef.set(user);
      return user; // Return the created user
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error creating user: ' + error.message); // Ensure error is an instance of Error
      }
      throw new Error('Unknown error occurred during creating user.');
    }
  }

  // Update an existing user
  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    try {
      const userRef = db.collection('users').doc(userId);
      await userRef.update(user);
      const updatedUserDoc = await userRef.get();
      if (!updatedUserDoc.exists) {
        return null; // User not found
      }
      return updatedUserDoc.data() as User; // Return updated user
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error updating user: ' + error.message); // Ensure error is an instance of Error
      }
      throw new Error('Unknown error occurred during updating user.');
    }
  }

  // Delete a user
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const userRef = db.collection('users').doc(userId);
      await userRef.delete();
      return true; // User deleted
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error deleting user: ' + error.message); // Ensure error is an instance of Error
      }
      throw new Error('Unknown error occurred during deleting user.');
    }
  }
}

export default new UserService();
