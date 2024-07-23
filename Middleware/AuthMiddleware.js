const asyncHandle = require("express-async-handler")
const jwt = require("jsonwebtoken");
const UserSchema = require("../Model/UserSchema");

const protect = asyncHandle(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token not found' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const verifyToken = await jwt.verify(token, process.env.secretKey)
        const user = await UserSchema.findById({ _id: verifyToken?.userId })
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();

    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
})


module.exports = protect;