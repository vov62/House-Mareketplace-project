// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1t9xCif7gs3nrnKPrx7hwjfdoLLm2Mas",
    authDomain: "house-marketplace-projec-e24dc.firebaseapp.com",
    projectId: "house-marketplace-projec-e24dc",
    storageBucket: "house-marketplace-projec-e24dc.appspot.com",
    messagingSenderId: "177543017364",
    appId: "1:177543017364:web:61f1c603da3c0c5db61581"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();