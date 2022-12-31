// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY6uhxgKb2G4h5rYZEuYxXbtPslntbjlc",
  authDomain: "workdates-app.firebaseapp.com",
  projectId: "workdates-app",
  storageBucket: "workdates-app.appspot.com",
  messagingSenderId: "1052906207095",
  appId: "1:1052906207095:web:49faaacb7e8e7235cc5372"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);