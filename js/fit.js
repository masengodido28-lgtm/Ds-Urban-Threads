// Build Your Fit

const fitOptions =
    document.querySelectorAll(".fit-option");

const selectedFit =
    document.getElementById("selected-fit");

const fitTotal =
    document.getElementById("fit-total");

const addFitCart =
    document.getElementById("add-fit-cart");


let selectedProducts = {};


// Select a product
fitOptions.forEach((option) => {

    option.addEventListener("click", () => {

        const type =
            option.dataset.type;

        const product = {

            name: option.dataset.name,

            price: Number(option.dataset.price),

            // Gets the image path from the HTML data-image attribute
            imageURL: option.dataset.image,

            quantity: 1

        };


        selectedProducts[type] = product;


        // Remove previous selection
        document
            .querySelectorAll(
                `.fit-option[data-type="${type}"]`
            )
            .forEach((item) => {

                item.classList.remove("selected");

            });


        // Highlight selected product
        option.classList.add("selected");


        updateFit();

    });

});


// Update fit summary
function updateFit() {

    selectedFit.innerHTML = "";

    let total = 0;

    const products =
        Object.values(selectedProducts);


    if (products.length === 0) {

        selectedFit.innerHTML = `
            <p>Select your pieces to build your fit.</p>
        `;

        fitTotal.textContent = "R0";

        addFitCart.disabled = true;

        return;

    }


    products.forEach((product) => {

        total += product.price;


        const item =
            document.createElement("div");

        item.classList.add(
            "selected-fit-item"
        );


        item.innerHTML = `

            <img
                src="${product.imageURL}"
                alt="${product.name}"
            >

            <div>

                <strong>
                    ${product.name}
                </strong>

                <p>
                    R${product.price.toLocaleString()}
                </p>

            </div>

        `;


        selectedFit.appendChild(item);

    });


    fitTotal.textContent =
        `R${total.toLocaleString()}`;


    // Require both a top and sneakers
    addFitCart.disabled =
        !selectedProducts.top ||
        !selectedProducts.shoes;

}


// Add fit to existing cart
addFitCart.addEventListener(
    "click",
    () => {

        let cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        Object.values(selectedProducts)
            .forEach((product) => {

                const existingProduct =
                    cart.find(
                        (item) =>
                            item.name === product.name
                    );


                if (existingProduct) {

                    existingProduct.quantity += 1;

                } else {

                    cart.push(product);

                }

            });


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        window.location.href =
            "cart.html";

    }
);