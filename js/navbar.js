import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


const loginLink = document.getElementById("login-link");
const userEmail = document.getElementById("user-email");
const logoutBtn = document.getElementById("logout-btn");


onAuthStateChanged(auth, (user) => {

    if (user) {

        // User is logged in
        userEmail.textContent = user.email;

        loginLink.style.display = "none";
        logoutBtn.style.display = "inline-block";

    } else {

        // User is logged out
        userEmail.textContent = "";

        loginLink.style.display = "inline-block";
        logoutBtn.style.display = "none";

    }

});


logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error("Logout error:", error);

    }

});