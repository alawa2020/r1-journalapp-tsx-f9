// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQwbbIjKbqRp8fo18ASBVYYJ8Zl3o3Ers",
  authDomain: "r1-journal-ts-f9.firebaseapp.com",
  projectId: "r1-journal-ts-f9",
  storageBucket: "r1-journal-ts-f9.appspot.com",
  messagingSenderId: "713673150845",
  appId: "1:713673150845:web:d49e1e1c688a9af44dbc14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth( app );
export const db = getFirestore( app );