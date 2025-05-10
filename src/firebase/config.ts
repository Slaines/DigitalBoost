// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwpiVznOL3ixny1gTdFVsw8lFHdjXKS5Q",
  authDomain: "digital-boost-9c3e3.firebaseapp.com",
  projectId: "digital-boost-9c3e3",
  storageBucket: "digital-boost-9c3e3.firebasestorage.app",
  messagingSenderId: "610694394476",
  appId: "1:610694394476:web:f5ebbf4e8d1b873f995e49",
  measurementId: "G-MQ9WFF8YYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics - only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, analytics };
export default app;
