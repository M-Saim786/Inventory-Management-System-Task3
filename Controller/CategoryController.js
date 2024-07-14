const CategorySchema = require("../Model/CategorySchema");

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "category not found" })
        }
        const checkCategory = await CategorySchema.findOne({ name });

        if (checkCategory) {
            return res.status(400).json({
                message: "category already exists"
            })
        }
        await CategorySchema(req.body).save();
        res.status(200).json({
            message: "Category added successfully.."
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


exports.getCategory = async (req, res) => {
    try {
        const data = await CategorySchema.find();
        res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.query.id;
        const { name } = req.body;
        const checkCategory = await CategorySchema.findOne({ _id: id });
        if (!checkCategory) {
            return res.status(400).json({
                message: "Category not found"
            })
        }
        if (!name) {
            return res.status(400).json({
                message: "Category name not found"
            })
        }

        const update = await CategorySchema.findOneAndUpdate({ _id: id }, req.body, { new: true })

        return res.status(200).json({
            message: "Category Updated",
            data: update
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteCateogry = async (req, res) => {
    try {
        const id = req.query.id;
        const checkCategory = await CategorySchema.findById(id);
        if (!checkCategory) {
            return res.status(400).json({
                message: "Category not found"
            })
        }

        await CategorySchema.findOneAndDelete({ _id: id })

        return res.status(200).json({
            message: "Category deleted successfully",
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}