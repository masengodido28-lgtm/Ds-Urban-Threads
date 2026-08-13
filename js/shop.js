import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const productsContainer = document.getElementById("products-container");


async function loadProducts() {

    try {

        const productsSnapshot = await getDocs(
            collection(db, "products")
        );

        productsSnapshot.forEach((productDocument) => {

            const product = productDocument.data();

            const productCard = document.createElement("article");

            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <div class="product-image">
                    <img 
                        src="${product.imageURL}" 
                        alt="${product.name}"
                    >
                </div>

                <div class="product-info">

                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.category}</p>
                    </div>

                    <strong>R${product.price}</strong>

                </div>
            `;

            productsContainer.appendChild(productCard);

        });

    } catch (error) {

        console.error("Error loading products:", error);

    }

}


loadProducts();