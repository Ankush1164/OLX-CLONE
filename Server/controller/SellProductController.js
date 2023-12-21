const Products = require("../models/ProductsSchema")
module.exports.sellProduct = async (req, res) => {
    const { categories, productCondition, productTitle, pDesc, pPrice, pAddress} = req.body
    const addedBy = req.body.userId
    const photo1 = req.files.photo1[0].path
    const photo2 = req.files.photo2[0].path
    try {
        const saveProductDetails = new Products({
            categories,
            productCondition,
            productTitle,
            pDesc,
            pPrice,
            pAddress,
            photo1,
            photo2,
            addedBy
        });

        const savedProducts = await saveProductDetails.save();
        res.status(200).json({
            success: true,
            message: "Product submitted successfully",
            data: savedProducts
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            error: "Error in saving products"
        });
    }
};