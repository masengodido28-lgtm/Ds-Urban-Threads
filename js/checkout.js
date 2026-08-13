import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// Checkout elements
const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");

const checkoutMessage =
    document.getElementById("checkout-message");


// Get cart from localStorage
const cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Calculate total
let total = 0;


// Display cart
function displayCheckoutItems() {

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        checkoutTotal.textContent = "R0.00";

        return;
    }


    cart.forEach((product) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;


        const item = document.createElement("div");

        item.classList.add("checkout-item");


        item.innerHTML = `
            <div>
                <strong>${product.name}</strong>

                <p>
                    Quantity: ${product.quantity}
                </p>
            </div>

            <strong>
                R${productTotal.toFixed(2)}
            </strong>
        `;


        checkoutItems.appendChild(item);

    });


    checkoutTotal.textContent =
        `R${total.toFixed(2)}`;
}


// Check authentication
onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;
    }

    displayCheckoutItems();

});


// Place order
checkoutForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const user = auth.currentUser;


        if (!user) {

            window.location.href = "login.html";

            return;
        }


        if (cart.length === 0) {

            checkoutMessage.textContent =
                "Your cart is empty.";

            return;
        }


        const fullName =
            document.getElementById("full-name").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;


        try {

            await addDoc(
                collection(db, "orders"),
                {

                    userId: user.uid,

                    email: user.email,

                    customerName: fullName,

                    phone: phone,

                    address: address,

                    products: cart,

                    total: total,

                    createdAt: serverTimestamp()

                }
            );


            // Clear cart
            localStorage.removeItem("cart");


            checkoutMessage.textContent =
                "Order placed successfully! 🎉";


            checkoutForm.reset();


            checkoutItems.innerHTML = `
                <p>
                    Thank you for your order.
                </p>
            `;


            checkoutTotal.textContent =
                "R0.00";


        } catch (error) {

            console.error(
                "Error placing order:",
                error
            );

            checkoutMessage.textContent =
                "Something went wrong. Please try again.";

        }

    }
);


// Load checkout
displayCheckoutItems();