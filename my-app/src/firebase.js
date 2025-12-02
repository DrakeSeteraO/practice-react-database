// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIFcKtB-qYFwXKi7h_BjZlXkn1yR5vBsw",
  authDomain: "practice-4cd1a.firebaseapp.com",
  projectId: "practice-4cd1a",
  storageBucket: "practice-4cd1a.firebasestorage.app",
  messagingSenderId: "664450682578",
  appId: "1:664450682578:web:bdbf11bfa64809a264270b",
  measurementId: "G-T2JFDGMFKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
