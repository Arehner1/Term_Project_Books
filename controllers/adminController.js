const adminController = {
    addProduct: async (req, res) => {
        const { name, description, price, category_id } = req.body;

        // Stubbed success response
        const result = {
            message: 'Stub: product added successfully',
            product: { name, description, price, category_id }
        };

        res.json(result);
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { name, description, price, category_id } = req.body;

        // Stubbed success response
        const result = {
            message: `Stub: product ${id} updated successfully`,
            updates: { name, description, price, category_id }
        };

        res.json(result);
    },

    bulkUploadProducts: async (req, res) => {
        const products = req.body.products || [];

        // Stubbed success response
        const result = {
            message: 'Stub: bulk upload complete',
            uploaded: products.length,
            products
        };

        res.json(result);
    }
};

module.exports = adminController;
