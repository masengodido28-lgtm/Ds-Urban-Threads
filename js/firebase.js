import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

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

const db = getFirestore(app);

export { db };