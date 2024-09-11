import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUpkBTJChw8KtjAMuukwsgkJd_LfDjEiE",
    authDomain: "event-management-8adf7.firebaseapp.com",
    projectId: "event-management-8adf7",
    storageBucket: "event-management-8adf7.appspot.com",
    messagingSenderId: "84271754120",
    appId: "1:84271754120:web:f0cb597fe6fc8a0355e83d"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
