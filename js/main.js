/* MOBILE MENU */
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
}

/* DARK MODE */
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

/* ALERT */
function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMsg = document.getElementById("alert-message");

    if (!alertBox || !alertMsg) return;

    alertMsg.innerText = message;
    alertBox.classList.remove("hidden");

    setTimeout(() => {
        alertBox.classList.add("hidden");
    }, 2000);
}

/* CART COUNTER (IMPORTANT FIX) */
function updateCartCounter() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const counter = document.getElementById("cart-count");

    if (!counter) return;

    const total = cart.reduce((sum, item) => {
        return sum + (item.quantity || 1);
    }, 0);

    counter.innerText = total;
}

document.addEventListener("DOMContentLoaded", updateCartCounter);




function updateNavbarAuth(){

    const navIcons = document.querySelector(".nav-icons");
    if(!navIcons) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("loggedIn");

    let cartHTML = navIcons.querySelector(".cart-icon")?.outerHTML || "";

    if(loggedIn && user){

        navIcons.innerHTML = `

            <span class="user-name">
                Hi, ${user.username}
            </span>

            <button onclick="logout()" class="logout-btn">
                Logout
            </button>

            ${cartHTML}
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateNavbarAuth();
});