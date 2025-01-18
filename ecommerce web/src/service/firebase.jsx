import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Firebase Authentication import
import { getDatabase } from "firebase/database";  // Firebase Realtime Database import

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDJkgkxK-1FUxtjVXy6AVH5hIu7Ic5Hzt4",
    authDomain: "user2-5684a.firebaseapp.com",
    projectId: "user2-5684a",
    storageBucket: "user2-5684a.firebasestorage.app",
    messagingSenderId: "255405737654",
    appId: "1:255405737654:web:5fda8c0fa5322e141d8817",
    measurementId: "G-1Z1F72K83Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

export { auth, database };
