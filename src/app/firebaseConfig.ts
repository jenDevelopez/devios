// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "devios-shop.firebaseapp.com",
  projectId: "devios-shop",
  storageBucket: "devios-shop.appspot.com",
  messagingSenderId: "634826113616",
  appId: "1:634826113616:web:d9b2009d65cf9f52710755",
  measurementId: "G-REV9PL56M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
// export const db = getFirestore(app)