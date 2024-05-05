// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "feedbackcollectionsystem.firebaseapp.com",
  projectId: "feedbackcollectionsystem",
  storageBucket: "feedbackcollectionsystem.appspot.com",
  messagingSenderId: "366482014230",
  appId: "1:366482014230:web:b31e420322066033aaf537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;