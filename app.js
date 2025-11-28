let cart = JSON.parse(localStorage.getItem("cart")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
}

function loadCart() {
    let output = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        output += `
        <p>
            ${item.name} - ₹${item.price} x ${item.qty}
            <button onclick="removeItem(${index})">Remove</button>
        </p>`;
    });

    document.getElementById("cartItems").innerHTML = output || "Cart is empty";
    document.getElementById("total").innerHTML = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    loadCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    history.push({
        date: new Date().toLocaleString(),
        items: cart,
        total: total
    });

    localStorage.setItem("history", JSON.stringify(history));
    clearCart();
    alert("Order placed successfully!");
    window.location.href = "history.html";
}

function showHistory() {
    let output = "";

    history.forEach(order => {
        output += `
        <div class="card">
            <p><b>Date:</b> ${order.date}</p>
            <p><b>Items:</b> ${order.items.map(i => i.name).join(", ")}</p>
            <p><b>Total:</b> ₹${order.total}</p>
        </div>
        `;
    });

    document.getElementById("historyData").innerHTML = output || "No history found.";
}

function searchMedicine() {
    let value = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.dataset.name.toLowerCase();
        card.style.display = name.includes(value) ? "block" : "none";
    });
}
