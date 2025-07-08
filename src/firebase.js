// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfvIoaQ7mnxMtcMApueYhp4eWTtIb0h7k",
  authDomain: "baguio-trip.firebaseapp.com",
  projectId: "baguio-trip",
  storageBucket: "baguio-trip.firebasestorage.app",
  messagingSenderId: "627728504276",
  appId: "1:627728504276:web:bc4cddbf809ed4e53f3241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//firebase is still in test mode dont forget to set rules to production mode
