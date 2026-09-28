const ordersContainer =
document.getElementById("orders-container");


function getOrders(){

    return JSON.parse(
        localStorage.getItem("orders")
    ) || [];

}


function saveOrders(orders){

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

}


function renderOrders(){

    if(!ordersContainer) return;

    let orders = getOrders();

    ordersContainer.innerHTML="";

    if(orders.length===0){

        ordersContainer.innerHTML=
        "<h3>No Orders Yet</h3>";

        return;
    }

    orders.reverse().forEach(order=>{

        let productsHTML="";

        order.products.forEach(p=>{

            productsHTML += `

                <div class="order-product">

                    <span>
                        ${p.name} × ${p.quantity}
                    </span>

                    <span>
                        ${p.price*p.quantity} EGP
                    </span>

                </div>

            `;
        });

        ordersContainer.innerHTML += `

            <div class="order-card">

                <h2>
                    Order - ${order.date}
                </h2>

                <p>
                    Name: ${order.customer}
                </p>

                <p>
                    Phone: ${order.phone}
                </p>

                <p>
                    Address: ${order.address}
                </p>

                <p>
                    Total:
                    ${order.total} EGP
                </p>

                <p>
                    Status:
                    ${order.status}
                </p>

                <div class="order-products">

                    ${productsHTML}

                </div>

                <button
                class="action-btn"
                onclick="toggleStatus(${order.id})">

                Change Status

                </button>

                <button
                class="action-btn delete-btn"
                onclick="deleteOrder(${order.id})">

                Delete

                </button>

            </div>

        `;
    });

}


/* CHANGE STATUS */

window.toggleStatus=function(id){

    let orders=getOrders();

    orders=orders.map(order=>{

        if(order.id===id){

            order.status=

            order.status==="Pending"

            ?

            "Completed"

            :

            "Pending";
        }

        return order;

    });

    saveOrders(orders);

    renderOrders();

};


/* DELETE ORDER */

window.deleteOrder=function(id){

    let orders=getOrders();

    orders=orders.filter(order=>

        order.id!==id

    );

    saveOrders(orders);

    renderOrders();

};


document.addEventListener(
"DOMContentLoaded",
renderOrders
);