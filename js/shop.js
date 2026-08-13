import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const productsContainer = document.getElementById("products-container");
const filterButtons = document.querySelectorAll(".filter-btn");

let allProducts = [];

// Load products from Firestore
async function loadProducts() {
    try {
        const snapshot = await getDocs(collection(db, "products"));

        allProducts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        displayProducts(allProducts);

    } catch (error) {
        console.error("Error loading products:", error);
    }
}


// Display products
function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach((product) => {

        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img 
                src="${product.imageURL}" 
                alt="${product.name}"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <strong>
                        R${product.price.toFixed(2)}
                    </strong>

                    <button 
                        class="add-to-cart"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productsContainer.appendChild(productCard);
    });


    // Add event listeners to buttons
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const productId = button.dataset.id;

            addToCart(productId);

        });

    });

}


// Add product to cart
function addToCart(productId) {

    const product = allProducts.find(
        (item) => item.id === productId
    );

    if (!product) {
        console.error("Product not found");
        return;
    }


    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // Check if product already exists
    const existingProduct = cart.find(
        (item) => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageURL: product.imageURL,
            quantity: 1
        });

    }


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(`${product.name} added to cart!`);

}


// Category filtering
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });


        // Add active to clicked button
        button.classList.add("active");


        const category = button.dataset.category;


        if (category === "all") {

            displayProducts(allProducts);

        } else {

            const filteredProducts = allProducts.filter(
                (product) => product.category === category
            );

            displayProducts(filteredProducts);

        }

    });

});


// Start the application
loadProducts();