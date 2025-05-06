document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product_id");

    const form = document.querySelector("#edit-product-form");
    const saveBtn = document.querySelector("#save-btn");
    const createBtn = document.querySelector("#create-btn");
    const idGroup = document.querySelector("#product-id")?.closest(".form-group");

    // Hide ID field in create mode
    if (!productId && idGroup) {
        idGroup.style.display = "none";
    }

    // If editing, load the existing product
    if (productId) {
        try {
            const res = await fetch(`/api/products/${productId}`);
            if (!res.ok) throw new Error("Failed to fetch product.");
            const product = await res.json();

            form.querySelector("#product-id").value = product.id;
            form.querySelector("#product-name").value = product.name || "";
            form.querySelector("#product-description").value = product.description || "";
            form.querySelector("#product-category").value = product.category_id || "";
            form.querySelector("#product-image").value = product.image_url || "";
            form.querySelector("#product-price").value = (product.price / 100).toFixed(2) || "";
        } catch (err) {
            console.error("Error loading product:", err);
            alert("❌ Failed to load product for editing.");
        }
    }

    // Extract form data safely
    function getFormData() {
        const name = form.querySelector("#product-name").value.trim();
        const description = form.querySelector("#product-description").value.trim();
        const image_url = form.querySelector("#product-image").value.trim();
        const priceStr = form.querySelector("#product-price").value.replace("$", "").trim();
        const categoryRaw = form.querySelector("#product-category").value.trim();
        const category_id = parseInt(categoryRaw);

        if (!name || !description || !image_url || !priceStr || isNaN(category_id)) {
            alert("⚠️ Please fill out all fields and use a valid numeric category ID.");
            throw new Error("Invalid form input");
        }

        return {
            name,
            description,
            category_id,
            image_url,
            price: Math.round(parseFloat(priceStr) * 100),
            status: "featured"
        };
    }

    // Save Changes (PUT)
    saveBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (!productId) return alert("⚠️ No product ID found for update.");

        try {
            const data = getFormData();
            const res = await fetch(`/api/products/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Update failed");
            alert("✅ Product updated!");
            window.location.href = "admin-products.html";
        } catch (err) {
            console.error("Update error:", err);
            alert("❌ Failed to update product.");
        }
    });

    // Create New Item (POST)
    createBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            const data = getFormData();
            const res = await fetch(`/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Creation failed");
            alert("✅ Product created!");
            window.location.href = "admin-products.html";
        } catch (err) {
            console.error("Create error:", err);
            alert("❌ Failed to create product.");
        }
    });
});
