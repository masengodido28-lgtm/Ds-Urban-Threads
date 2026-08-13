// Firebase App
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";


// Firebase Authentication
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// Firebase Firestore
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN_ebioDN9qeCNECl-wDOp0slHByR4K8Q",
    authDomain: "ds-urban-threads.firebaseapp.com",
    projectId: "ds-urban-threads",
    storageBucket: "ds-urban-threads.firebasestorage.app",
    messagingSenderId: "516938964366",
    appId: "1:516938964366:web:1ee73f3267c1b7b7f598df",
    measurementId: "G-P4419QRC2F"
};
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Export Firebase services
export { db, auth };