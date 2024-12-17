import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqdc6m4Zem8JUJliRDG_WRisUWsWAqa9c",
  authDomain: "harunspaho-494e6.firebaseapp.com",
  projectId: "harunspaho-494e6",
  storageBucket: "harunspaho-494e6.firebasestorage.app",
  messagingSenderId: "468501939058",
  appId: "1:468501939058:web:8bff7af32bff070e2dd3eb",
  measurementId: "G-KJ8THMSN4F",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
