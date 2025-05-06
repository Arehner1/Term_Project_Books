const userId = 1; // Default user

document.addEventListener("DOMContentLoaded", () => {
    loadCart();

    // Checkout button
    document.querySelector(".checkout-btn").addEventListener("click", async () => {
        try {
            const res = await fetch(`/api/cart/${userId}/checkout`, { method: "POST" });
            if (!res.ok) throw new Error("Checkout failed");

            alert("✅ Checkout complete!");
            loadCart(); // refresh
        } catch (err) {
            console.error("Checkout error:", err);
        }
    });
});

// Load cart data and render it
async function loadCart() {
    try {
        const res = await fetch(`/api/cart/${userId}`);
        const cart = await res.json();

        const cartItemsContainer = document.querySelector(".cart-items");
        cartItemsContainer.innerHTML = "";

        let subtotal = 0;
        const items = cart.items || [];

        items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            // Use placeholder if no image
            const imageSrc = item.image || "/images/placeholder.jpg";

            cartItem.innerHTML = `
                <img src="${imageSrc}" alt="${item.title}">
                <div class="item-details">
                    <h2 class="product-name">${item.title}</h2>
                    <p class="product-price">$${(item.price / 100).toFixed(2)}</p>
                    <label for="quantity-${index}">Quantity:</label>
                    <input type="number" id="quantity-${index}" value="${item.quantity}" min="1">
                    <button class="remove-item">Remove</button>
                    <p class="item-total">Total: $${(itemTotal / 100).toFixed(2)}</p>
                </div>
            `;

            // Quantity change handler
            cartItem.querySelector("input").addEventListener("change", async (e) => {
                const newQty = parseInt(e.target.value);
                if (newQty < 1) return;

                await fetch(`/api/cart/${userId}/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId: item.productId, quantity: newQty })
                });

                loadCart();
            });

            // Remove button handler
            cartItem.querySelector(".remove-item").addEventListener("click", async () => {
                try {
                    const res = await fetch(`/api/cart/${userId}/remove`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productId: item.product_id })  
                    });
            
                    if (!res.ok) throw new Error("Failed to remove item");
            
                    alert("Item removed from cart.");
                    loadCart(); // Refresh the cart
                } catch (err) {
                    console.error("Remove error:", err);
                    alert("❌ Could not remove item.");
                }
            });

            cartItemsContainer.appendChild(cartItem);
        });

        // Summary (outside the loop!)
        const tax = subtotal * 0.0675;
        const delivery = 500; // cents
        const service = 200;  // cents
        const total = subtotal + tax + delivery + service;

        document.querySelector(".subtotal").textContent = `Subtotal: $${(subtotal / 100).toFixed(2)}`;
        document.querySelector(".tax").textContent = `Tax (6.75%): $${(tax / 100).toFixed(2)}`;
        document.querySelector(".delivery-fee").textContent = `Delivery Fee: $${(delivery / 100).toFixed(2)}`;
        document.querySelector(".service-fee").textContent = `Service Fee: $${(service / 100).toFixed(2)}`;
        document.querySelector(".total").textContent = `Total: $${(total / 100).toFixed(2)}`;
    } catch (err) {
        console.error("Failed to load cart:", err);
    }
}
