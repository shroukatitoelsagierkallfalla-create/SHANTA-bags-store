const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));

const product = products.find(product => product.id === productId);


/* DISPLAY PRODUCT */

function displayProduct(product){

    document.querySelector(".details-image img").src =
    product.image || "images/logo/V . logo.png";

    document.querySelector(".details-info h1").innerText =
    product.name || "Luxury Bag";

    document.querySelector(".details-info p").innerText =
    product.description || "Elegant handmade luxury bag.";

    document.querySelector(".details-info h2").innerText =
    product.price + " EGP";
}


if(product){

    displayProduct(product);
}


/* ADD TO CART */

const addBtn = document.querySelector(".gold-btn");

if(addBtn){

    addBtn.addEventListener("click", () => {

        const cartProduct = {

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(cartProduct);

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCounter();
        
        showAlert("Product added to cart 🛒");
    });
}