const productsContainer = document.getElementById("products-container");
const searchInput = document.getElementById("search-input");


/* RENDER PRODUCTS */

function renderProducts(items){

    productsContainer.innerHTML = "";

    items.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

                <span class="wishlist">♡</span>

            </div>

            <div class="product-info">

                <p class="category">${product.category}</p>

                <h3>${product.name}</h3>

                <p class="price">${product.price} EGP</p>

                <button class="add-btn" onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

                <a class="details-btn" href="product-details.html?id=${product.id}">
                    View Details
                </a>

            </div>

        </div>
        `;
    });
}


/* FILTER PRODUCTS */

function filterProducts(category){

    if(category === "All"){

        renderProducts(products);

        return;
    }

    const filteredProducts = products.filter(product =>
        product.category === category
    );

    renderProducts(filteredProducts);

    showAlert("Products filtered ✨");
}


/* SEARCH PRODUCTS */

if(searchInput){

    searchInput.addEventListener("input", (e) => {

        const value = e.target.value.toLowerCase();

        const filteredProducts = products.filter(product =>

            product.name.toLowerCase().includes(value)

        );

        renderProducts(filteredProducts);
    });
}


/* ADD TO CART */

window.addToCart = function(id) {

    id = Number(id);

    const product = products.find(p => p.id === id);
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter();
    showAlert("Added to cart 🛍️");
};

/* CATEGORY FROM URL */

const urlParams = new URLSearchParams(window.location.search);

const selectedCategory = urlParams.get("category");

if(selectedCategory){

    filterProducts(selectedCategory);

}else{

    renderProducts(products);
}