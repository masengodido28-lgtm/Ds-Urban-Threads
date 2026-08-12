import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAHrvULhLKvFnHDeV1BBTNbPHVBl2W3BLw",
    authDomain: "ds-urban-threads.firebaseapp.com",
    projectId: "ds-urban-threads",
    storageBucket: "ds-urban-threads.firebasestorage.app",
    messagingSenderId: "516938964366",
    appId: "1:516938964366:web:1ee73f3267c1b7b7f598df",
    measurementId: "G-P4419QRC2F"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };