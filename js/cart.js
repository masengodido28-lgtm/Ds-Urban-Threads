const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");

function loadCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "R0.00";

        return;
    }


    let total = 0;


    cart.forEach((product) => {

        const productTotal =
            product.price * product.quantity;

        total += productTotal;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            <img
                src="${product.imageURL}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h3>${product.name}</h3>

                <p>R${product.price.toFixed(2)}</p>

                <div class="quantity-controls">

                    <button
                        class="decrease-btn"
                        data-id="${product.id}"
                    >
                        −
                    </button>

                    <span>${product.quantity}</span>

                    <button
                        class="increase-btn"
                        data-id="${product.id}"
                    >
                        +
                    </button>

                </div>

            </div>

            <div class="cart-item-right">

                <strong>
                    R${productTotal.toFixed(2)}
                </strong>

                <button
                    class="remove-btn"
                    data-id="${product.id}"
                >
                    Remove
                </button>

            </div>
        `;


        cartContainer.appendChild(cartItem);

    });


    cartTotal.textContent = `R${total.toFixed(2)}`;


    setupCartButtons();
}


function setupCartButtons() {

    document.querySelectorAll(".increase-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                updateQuantity(
                    button.dataset.id,
                    1
                );

            });

        });


    document.querySelectorAll(".decrease-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                updateQuantity(
                    button.dataset.id,
                    -1
                );

            });

        });


    document.querySelectorAll(".remove-btn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                removeFromCart(
                    button.dataset.id
                );

            });

        });

}


function updateQuantity(productId, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const product = cart.find(
        (item) => item.id === productId
    );


    if (!product) return;


    product.quantity += change;


    if (product.quantity <= 0) {

        cart = cart.filter(
            (item) => item.id !== productId
        );

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


function removeFromCart(productId) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart = cart.filter(
        (item) => item.id !== productId
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();
}


loadCart();