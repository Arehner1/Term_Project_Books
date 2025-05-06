document.addEventListener("DOMContentLoaded", async () => {
    const productGrid = document.querySelector(".product-grid");
    const sortSelect = document.getElementById("sort-by");
    const categorySelect = document.getElementById("category");
    const userId = 1; // Default user ID for cart operations

    // Mapping dropdown values to DB category names
    const categoryMap = {
        "fiction": "Fiction",
        "non-fiction": "Non-fiction",
        "mystery": "Mystery",
        "sci-fi": "Sci-Fi",
        "fantasy": "Fantasy",
        "historical fiction": "Historical Fiction"
    };

    // Fetch and display products from the backend
    async function fetchProducts() {
        try {
            let url = "/api/products";

            const sort = sortSelect?.value;
            const rawCategory = categorySelect?.value;

            const params = new URLSearchParams();
            if (rawCategory && rawCategory !== "all") {
                const mappedCategory = categoryMap[rawCategory.toLowerCase()];
                if (mappedCategory) {
                    params.append("category", mappedCategory);
                }
            }

            if (sort) params.append("sort", sort);
            if ([...params].length > 0) url += "?" + params.toString();

            const res = await fetch(url);
            const products = await res.json();
            renderProducts(products);
        } catch (err) {
            console.error("Failed to load products:", err);
        }
    }

    // Render product cards into the DOM
    function renderProducts(products) {
        productGrid.innerHTML = "";

        products.forEach(product => {
            const section = document.createElement("section");
            section.className = "product-item";

            const imagePath = product.image_url?.startsWith("/")
                ? product.image_url
                : "/" + product.image_url;

            section.innerHTML = `
                <img src="${imagePath}" alt="${product.name}">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-price">$${(product.price / 100).toFixed(2)}</p>
                <a href="details.html?product_id=${product.id}" class="view-details">View Details</a>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;

            const addToCartBtn = section.querySelector(".add-to-cart-btn");
            addToCartBtn.addEventListener("click", async () => {
                try {
                    const res = await fetch(`/api/cart/${userId}/add`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            productId: product.id,
                            quantity: 1
                        })
                    });

                    if (!res.ok) throw new Error("Failed to add product to cart");
                    window.location.href = "cart.html";
                } catch (err) {
                    console.error("Add to cart error:", err);
                    alert("❌ Could not add product to cart.");
                }
            });

            productGrid.appendChild(section);
        });
    }

    sortSelect?.addEventListener("change", fetchProducts);
    categorySelect?.addEventListener("change", fetchProducts);

    fetchProducts(); // Initial load
});
