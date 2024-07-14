const UserSchema = require("../Model/UserSchema");
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signUpUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email or pasword not found"
            })
        }
        const checkUser = await UserSchema.findOne({ email })
        if (checkUser) {
            return res.status(404).json({
                message: "User already exists"
            })
        }

        const user = await UserSchema(req.body).save();

        return res.status(200).json({
            message: "User registered successfully",
            data: user
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email or pasword not found"
            })
        }
        const checkUser = await UserSchema.findOne({ email })
        if (!checkUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const token = await jwt.sign({ userId: checkUser?._id }, process.env.secretKey, { expiresIn: "2h" })
        return res.status(200).json({
            data: checkUser,
            token
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}