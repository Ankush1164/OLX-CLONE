const express = require("express")
const router = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './uploads')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const {signup ,login , getProducts , likeProduct ,getlikedProducts ,getProduct,deleteProduct,myProducts,getUserInfo} = require("../controller/routeController")
const sellProductController = require("../controller/SellProductController");

router.post("/signUp" , signup)
router.post("/login" , login)
router.get("/all-Products" , getProducts)
router.post("/like-product" , likeProduct)
router.post("/likedProducts" , getlikedProducts)
router.get("/get-product/:id" , getProduct)
router.get("/getUserInfo/:uId" , getUserInfo)
router.post("/myProducts" , myProducts)
router.delete('/likedProducts/:userId/:productId' , deleteProduct)
router.post("/sellProduct", upload.fields([{name:"photo1"} ,{name:"photo2"}]), sellProductController.sellProduct);
module.exports = router