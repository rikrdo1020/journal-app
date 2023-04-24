// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzmnWdRdSruouDTGcpzbuzynqhDaaUZpk",
  authDomain: "journal-app-38eaf.firebaseapp.com",
  projectId: "journal-app-38eaf",
  storageBucket: "journal-app-38eaf.appspot.com",
  messagingSenderId: "472464672217",
  appId: "1:472464672217:web:defe6ba392a6db8716c5c8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );