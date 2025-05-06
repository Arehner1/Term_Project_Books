document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".admin-product-list");
    const modal = document.getElementById("delete-modal");
    const confirmBtn = document.getElementById("confirm-delete");
    const cancelBtn = document.getElementById("cancel-delete");
    const searchInput = document.getElementById("search");

    let productIdToDelete = null;
    let rowToDelete = null;

    // Load and display all products
    async function loadProducts() {
        try {
            const res = await fetch("/api/products");
            const products = await res.json();

            productList.innerHTML = "";
            products.forEach(product => {
                const row = document.createElement("tr");
                row.dataset.id = product.id;

                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description || ""}</td>
                    <td>${product.category_name || ""}</td>
                    <td><img src="${product.image_url}" alt="${product.name}" class="product-image" /></td>
                    <td>$${(product.price / 100).toFixed(2)}</td>
                    <td>
                        <a href="product-edit.html?product_id=${product.id}" class="edit-btn">Edit</a>
                        |
                        <a href="#" class="delete-btn" data-id="${product.id}">Delete</a>
                    </td>
                `;

                row.querySelector(".delete-btn").addEventListener("click", (e) => {
                    e.preventDefault();
                    productIdToDelete = product.id;
                    rowToDelete = row;
                    modal.classList.remove("hidden");
                });

                productList.appendChild(row);
            });

            // Apply filter again if there's a search value
            if (searchInput.value) filterProducts();

        } catch (err) {
            console.error("Failed to load products:", err);
        }
    }

    // Filter function for search bar
    function filterProducts() {
        const filter = searchInput.value.toLowerCase();
        const rows = productList.querySelectorAll("tr");

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(filter) ? "" : "none";
        });
    }

    // Delete confirmed
    confirmBtn.addEventListener("click", async () => {
        try {
            const res = await fetch(`/api/products/${productIdToDelete}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            alert("✅ Product deleted!");
            rowToDelete.remove();
        } catch (err) {
            console.error("Delete error:", err);
            alert("❌ Failed to delete product.");
        } finally {
            modal.classList.add("hidden");
            productIdToDelete = null;
            rowToDelete = null;
        }
    });

    // Cancel delete
    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        productIdToDelete = null;
        rowToDelete = null;
    });

    // Filter on keyup
    searchInput?.addEventListener("keyup", filterProducts);

    loadProducts();
});
