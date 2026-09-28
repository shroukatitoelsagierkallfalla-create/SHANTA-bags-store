const summaryItems = document.getElementById("summary-items");
const summaryTotal = document.getElementById("summary-total");
const checkoutForm = document.getElementById("checkout-form");

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* RENDER SUMMARY */
function renderSummary() {

    const cart = getCart();

    if (!summaryItems) return;

    summaryItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        summaryItems.innerHTML = "<p>Your cart is empty 🛒</p>";
        if (summaryTotal) summaryTotal.innerText = "";
        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        summaryItems.innerHTML += `
            <div class="summary-item">
                <p>${item.name} × ${item.quantity}</p>
                <span>${item.price * item.quantity} EGP</span>
            </div>
        `;
    });

    if (summaryTotal) {
        summaryTotal.innerText = `Total: ${total} EGP`;
    }
}

/* PLACE ORDER */
if (checkoutForm) {

    checkoutForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const cart = getCart();

        if (cart.length === 0) {
            showAlert("Cart is empty 🛒");
            return;
        }

        const fullname = document.getElementById("fullname").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const payment = document.getElementById("payment-method").value;

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
        });

        const order = {
            id: Date.now(),
            customer: fullname,
            phone,
            address,
            payment,
            products: cart,
            total,
            status: "Pending",
            date: new Date().toLocaleDateString()
        };

        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        orders.push(order);

        localStorage.setItem("orders", JSON.stringify(orders));

        /* clear cart */
        localStorage.removeItem("cart");

        updateCartCounter();

        showAlert("Order placed successfully ✨");

        setTimeout(() => {
            window.location.href = "orders.html";
        }, 1500);
    });
}

document.addEventListener("DOMContentLoaded", renderSummary);