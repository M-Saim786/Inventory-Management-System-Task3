const exp = require("express");
const { addCategory, getCategory, updateCategory, deleteCateogry } = require("../Controller/CategoryController");
const { signUpUser, loginUser } = require("../Controller/UserController");
const protect = require("../Middleware/AuthMiddleware");
const { addProduct, deleteProduct, updateProduct, getProducts, updateStocks, sellStocks } = require("../Controller/ProductController");
const router = exp.Router();


// router.post("/user/signUp", signUpUser)
router.post("/user/login", loginUser)

// ----------- product crud -----------------
router.post("/product", protect, addProduct)
router.get("/product", protect, getProducts)
router.put("/product", protect, updateProduct)
router.delete("/product", protect, deleteProduct)
// ----------- update stock levels --------------
router.post("/stock/add", protect, updateStocks)
router.post("/stock/sell", protect, sellStocks)


// ----------- category crud -----------------
router.post("/category", protect, addCategory)
router.get("/category", protect, getCategory)
router.put("/category", protect, updateCategory)
router.delete("/category", protect, deleteCateogry)



module.exports = router;