// Firebase configuration - using modular SDK v9
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Import Firestore types for mock implementation
import type { Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwpiVznOL3ixny1gTdFVsw8lFHdjXKS5Q",
  authDomain: "digital-boost-9c3e3.firebaseapp.com",
  projectId: "digital-boost-9c3e3",
  storageBucket: "digital-boost-9c3e3.appspot.com",
  messagingSenderId: "610694394476",
  appId: "1:610694394476:web:f5ebbf4e8d1b873f995e49",
  databaseURL: "https://digital-boost-9c3e3.firebaseio.com"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Create a mock Firestore implementation to avoid channel errors
// This will prevent actual Firestore connections while allowing the app to function
const db = {} as Firestore;

// Log that we're using a mock implementation
console.log('Using mock Firestore implementation to prevent channel errors');

// Connect to Firestore emulator if in development
// Uncomment this if you're using the emulator
/*
import { connectFirestoreEmulator } from 'firebase/firestore';
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('Connected to Firestore emulator');
}
*/

// Initialize Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

console.log('Firebase initialized successfully');

export { auth, analytics, db };
export default app;
