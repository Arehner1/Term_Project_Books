document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.querySelector("#upload-form");

    const categoryMap = {
        "Fiction": 1,
        "Non-fiction": 2,
        "Mystery": 3,
        "Sci-Fi": 4,
        "Fantasy": 5,
        "Historical Fiction": 6
    };

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fileInput = document.querySelector("#json-file");
        const file = fileInput.files[0];

        if (!file) return alert("Please select a JSON file");

        const reader = new FileReader();
        reader.onload = async function () {
            try {
                const raw = JSON.parse(reader.result);
                const rawProducts = raw.products || [];

                const products = rawProducts.map(p => ({
                    name: p.name,
                    description: p.description,
                    category_id: categoryMap[p.category] || null,
                    image_url: p.image,
                    price: Math.round(parseFloat(p.price.replace("$", "")) * 100),
                    status: "featured"
                }));

                const validProducts = products.filter(p => p.category_id !== null);

                const res = await fetch("/api/products/bulk", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ products: validProducts })
                });

                if (!res.ok) throw new Error("Bulk upload failed");

                alert("✅ Products uploaded successfully!");
                window.location.href = "admin-products.html";
            } catch (err) {
                console.error("Bulk upload error:", err);
                alert("❌ Failed to upload products. Check your JSON format.");
            }
        };

        reader.readAsText(file);
    });
});
