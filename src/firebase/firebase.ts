// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3ZDdcogeiR-RwL0gr1yRXL0aP0iQuWz8",
    authDomain: "pulse-47625.firebaseapp.com",
    databaseURL: "https://pulse-47625-default-rtdb.firebaseio.com",
    projectId: "pulse-47625",
    storageBucket: "pulse-47625.appspot.com",
    messagingSenderId: "264181530274",
    appId: "1:264181530274:web:f02a78fa3ee44144c3a1fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const db = getFirestore();