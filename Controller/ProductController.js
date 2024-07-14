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
        const id = req.query.id;
        const checkProduct = await ProductSchema.findByIdAndUpdate(id,
            req.body,
            { new: true, runValidators: true });
        if (!checkProduct) {
            return res.status(400).json({
                message: "product not found"
            })
        }
        // await checkProduct(req.body).save()
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
        const id = req.query.id;
        const checkProduct = await ProductSchema.findByIdAndDelete(id);
        if (!checkProduct) {
            return res.status(400).json({
                message: "product not found"
            })
        }
        // await ProductSchema.findOneAndDelete({ id });

        return res.status(200).json({
            message: "Product deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


exports.updateStocks = async (req, res) => {
    try {
        const id = req.query.id;
        let { stock } = req.body;
        if (!stock) {
            return res.status(400).json({
                message: "Stock not found"
            })
        }
        const product = await ProductSchema.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        const newStock = stock + product.stock;
        // console.log("newStock:", newStock)
        // console.log("stock :", stock)
        await ProductSchema.findByIdAndUpdate(
            id,
            { $inc: { stock } },
            { mew: true }
        )
        return res.status(200).json({
            message: `Product stocks update to ${newStock}`
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.sellStocks = async (req, res) => {
    try {
        const id = req.query.id;
        let { stock } = req.body;
        if (!stock) {
            return res.status(400).json({
                message: "Stock not found"
            })
        }
        const product = await ProductSchema.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        if (stock > product.stock)
            return res.status(400).json({
                message: "selling stock  is greater than present stock"
            })

        const newStock = product.stock - stock;
        console.log("newStock:", newStock)
        console.log("product.stock:", product.stock)
        
        product.stock = newStock;
        await product.save();

        return res.status(200).json({
            message: `Product stocks update to ${newStock}`
        })


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}