// Wait for the DOM to be fully loaded before running script
document.addEventListener("DOMContentLoaded", async () => {
    // Parse the product_id 
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id");

    // If no product ID is present, exit 
    if (!productId) {
        console.error("No product_id in URL");
        return;
    }

    try {
        // Fetch product details 
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("Product not found");

        const product = await res.json();

        // Update the HTML with the product data
        document.querySelector(".product-name").textContent = product.name;
        document.querySelector(".product-price").textContent = `$${parseFloat(product.price).toFixed(2)}`;
        document.querySelector("img").src = product.image_url;
        document.querySelector("img").alt = product.name;
        document.querySelector(".product-description p").textContent = product.description;

    } catch (err) {
        // Handle any fetch or API errors
        console.error("Failed to load product:", err);
    }
});
