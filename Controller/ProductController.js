const ProductSchema = require("../Model/ProductSchema");

exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        if (!name || !price) {
            return res.status(400).json({
                message: "Product Name or Price not found"
            })
        }
        const checkProduct = await ProductSchema.findOne({ name })
        if (checkProduct)
            return res.status(400).json({
                message: "Product already present. Try to update stock levels"
            })

        if (!category)
            return res.status(400).json({
                message: "Product Category not found"
            })
        if (!stock)
            return res.status(400).json({
                message: "Product stock/quantity not found"
            })
        const product = await ProductSchema(req.body).save();
        return res.status(200).json({
            message: "Porduct added successfully",
            data: product
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const data = await ProductSchema.find();
        return res.status(200).json({
            data: data
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.quert.id;
        const checkProduct = await ProductSchema.findById(id);
        if (!checkProduct) {
            return res.status(400).json({
                message: "product not found"
            })
        }
        const { name, category, price, stock } = req.body;
        await checkProduct(req.body).save()
        return res.status(200).json({
            message: "Product updated successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.quert.id;
        const checkProduct = await ProductSchema.findById(id);
        if (!checkProduct) {
            return res.status(400).json({
                message: "product not found"
            })
        }
        await ProductSchema.findOneAndDelete({ id });

        return res.status(200).json({
            message: "Product deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}