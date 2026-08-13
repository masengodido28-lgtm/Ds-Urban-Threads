console.log("AUTH JS IS WORKING");

import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";


// Login form
const loginForm = document.getElementById("login-form");

// Signup form
const signupForm = document.getElementById("signup-form");

// Message area
const authMessage = document.getElementById("auth-message");

// Signup link
const showSignup = document.getElementById("show-signup");


// Show signup form
showSignup.addEventListener("click", (event) => {

    event.preventDefault();

    loginForm.classList.add("hidden");

    signupForm.classList.remove("hidden");

});


// Login
loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("login-email").value;

    const password =
        document.getElementById("login-password").value;


    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        authMessage.textContent =
            "Login successful!";

        window.location.href = "shop.html";


    } catch (error) {

        console.error(error);

        authMessage.textContent =
            "Login failed. Please check your email and password.";

    }

});


// Sign up
signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("signup-email").value;

    const password =
        document.getElementById("signup-password").value;


    try {

        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        authMessage.textContent =
            "Account created successfully!";

        window.location.href = "shop.html";


    } catch (error) {

        console.error(error);

        authMessage.textContent =
            "Could not create account. Please try again.";

    }

});