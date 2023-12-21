const mongoose = require("mongoose")
const Products = require("../models/ProductsSchema")

const userSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:["Please Enter Your Name" , true],
        maxLength: 50
    },
    email:{
        type:String,
        required:["Please Enter email id" ,true],
        unique:true
    },
    password:{
        type:String,
        required:["Please Enter Password" ,true]
    },
    contactNo:{
        type:Number,
        required:true,
        unique:true
    },
    likedProducts:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:Products
        }
    ]
        
})

module.exports = mongoose.model("UsersInfo" , userSchema)