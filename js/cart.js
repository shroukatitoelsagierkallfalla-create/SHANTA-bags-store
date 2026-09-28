const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");
const clearBtn = document.querySelector(".clear-btn");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    const cart = getCart();

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h3>Your cart is empty 🛒</h3>";

        if (totalPriceEl) totalPriceEl.innerText = "";
        updateCartCounter();

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" />

                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p class="cart-price">${item.price} EGP</p>

                    <div class="qty-controls">
                        <button onclick="decreaseQty(${item.id})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQty(${item.id})">+</button>
                    </div>
                </div>

                <button class="remove-btn" onclick="removeItem(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    if (totalPriceEl) {
        totalPriceEl.innerText = `Total: ${total} EGP`;
    }

    updateCartCounter();
}

/* INCREASE QTY */
window.increaseQty = function(id) {

    const cart = getCart();

    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity += 1;
    }

    saveCart(cart);
    renderCart();
};

/* DECREASE QTY */
window.decreaseQty = function(id) {

    const cart = getCart();

    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity -= 1;

    if (item.quantity <= 0) {
        const updated = cart.filter(p => p.id !== id);
        saveCart(updated);
    } else {
        saveCart(cart);
    }

    renderCart();
};

/* REMOVE ITEM */
window.removeItem = function(id) {

    const cart = getCart();

    const updated = cart.filter(p => p.id !== id);

    saveCart(updated);
    renderCart();
};

/* CLEAR CART */
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        renderCart();
        showAlert("Cart cleared 🗑️");
    });
}

/* INIT */
document.addEventListener("DOMContentLoaded", renderCart);