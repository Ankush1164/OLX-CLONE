const User = require("../models/userSchema")
const Products = require("../models/ProductsSchema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require("dotenv").config()


// SignUp logic
module.exports.signup = async (req, res) => {
    const { userName, password, email, contactNo,address } = req.body
    if (!userName || !password || !email || !contactNo || !address) {
        return res.status(401).json({
            success: false,
            error: "Please add all the fields"
        })
    }
    try {
        const alreadyUser = await User.findOne({ $or: [{ userName: userName }, { email: email }] })
        if (alreadyUser) {
            return res.status(400).json({
                success: false,
                error: "User Already Exist"
            })
        }
        let hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            userName: userName,
            email: email,
            password: hashPassword,
            contactNo: contactNo,
            address:address
        })
        const savedUser = await newUser.save()
        res.status(200).json({
            success: true,
            message: "Account Created Successfully",
            data: savedUser
        })
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

// Login logic
module.exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Please input all the fields"
        })
    }
    try {
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            return res.status(200).json({
                success: false,
                error: "Details Not found",
            })
        }
        const passwordMatched = await bcrypt.compare(password, findUser.password);
        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                error: "Password wrong"
            })
        }
        let token = jwt.sign({
            data: findUser
        }, process.env.SECRETE_KEY, { expiresIn: '5h' });
        res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            data: findUser,
            token: token,
            userId: findUser._id
        })

    }
    catch (er) {
        console.log(er)
        return res.status(400).json({
            success: false,
            error: "Something went wrong"
        })
    }
}

// 
// Get all the products


module.exports.getProducts = (req, res) => {
    Products.find()
        .then((result) => {
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No products found',
                });
            }
            res.send(result);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            return res.status(500).json({
                success: false,
                error: 'Error in fetching data',
            });
        });
};


// like Product
module.exports.likeProduct = (req, res) => {
    let productId = req.body.productId
    let userId = req.body.userId
    User.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.json({
                success: true,
                message: "Liked Success"
            })
        }).catch(() => {
            return res.json({
                success: false,
                error: "Eror occured"
            })
        })
}

// Get like the products for a uniqe user

module.exports.getlikedProducts = (req, res) => {
    User.findOne({ _id: req.body.userId }).populate("likedProducts")
        .then((result) => {
            res.send({ message: "Success", products: result.likedProducts })
        }).catch(() => {
            res.send("Error")
        })
}

// get productInfo when user click on a product

module.exports.getProduct = (req, res) => {
    Products.findOne({ _id: req.params.id })
        .then((result) => {
            res.send({ message: "success ", product: result })
        })
        .catch((er) => {
            res.send({ message: "false", error: er })
        })
}

// get userContact details when user click on product info
module.exports.getUserInfo = (req , res)=>{
    const _userId = req.params.uId
    User.findOne({_id:_userId})
    .then((user)=>{
        res.json({message:"success" , user:user})
    })
    .catch(()=>{
        res.json({error:"error in finding user"})
    })
}

// delete Liked Product
module.exports.deleteProduct = async (req, res) => {

    const userId = req.params.userId;
    const productId = req.params.productId;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedProducts: productId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'Product removed  successfully' });
    } catch (error) {
        console.error('Error removing product from liked list:', error);
        res.status(500).json({ error: 'Failed to remove product from liked list' });
    }
}

// Get user's created products
module.exports.myProducts = (req, res) => {
    const userId = req.body.userId;
  
    Products.find({ addedBy: userId })
      .then((products) => {
        if (!products || products.length === 0) {
          return res.status(404).json({ message: 'No products found', data: [] });
        }
        res.status(200).json({ message: 'Success', data: products });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error in fetching data' });
      });
  };