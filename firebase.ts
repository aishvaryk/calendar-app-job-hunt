
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZaJYwxzafiWvSP__ufWqKCMSLtIO_xdk",
  authDomain: "job-hunt-calendar.firebaseapp.com",
  projectId: "job-hunt-calendar",
  storageBucket: "job-hunt-calendar.firebasestorage.app",
  messagingSenderId: "613918536632",
  appId: "1:613918536632:web:d1fc58032f2debc9f3954d",
  measurementId: "G-71G4ZGJV3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
