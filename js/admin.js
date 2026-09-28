const orders = JSON.parse(localStorage.getItem("orders")) || [];

/* TOTAL ORDERS */
document.getElementById("total-orders").innerText = orders.length;

/* TOTAL REVENUE */
const revenue = orders.reduce((sum, order) => sum + order.total, 0);
document.getElementById("total-revenue").innerText = revenue + " EGP";

/* TOTAL PRODUCTS SOLD */
let productsCount = 0;

orders.forEach(order => {
    order.products.forEach(p => {
        productsCount += p.quantity || 1;
    });
});

document.getElementById("total-products").innerText = productsCount;

/* SHOW ORDERS */
const container = document.getElementById("orders-container");

orders.reverse().forEach(order => {

    let productsHTML = "";

    order.products.forEach(p => {
        productsHTML += `
            <div class="order-product">
                <span>${p.name}</span>
                <span>${p.price} EGP x ${p.quantity || 1}</span>
            </div>
        `;
    });

    container.innerHTML += `
        <div class="order-card">

            <h3>Order - ${order.date}</h3>

            <p><b>Name:</b> ${order.customer}</p>
            <p><b>Phone:</b> ${order.phone}</p>
            <p><b>Total:</b> ${order.total} EGP</p>

            <div class="order-products">
                ${productsHTML}
            </div>

        </div>
    `;
});
function updateStatus(index, value){

    orders[index].status = value;

    localStorage.setItem("orders", JSON.stringify(orders));

    renderOrders();
}