const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    categories:{
        type:String
    },
    productCondition:{
        type:String
    },
    productTitle:{
        type:String
    },
    pDesc:{
        type:String
    },
    pPrice:{
        type:String
    },
    pAddress:{
        type:String
    },
    photo1:{
        type:String
    },
    photo2:{
        type:String
    },
    addedBy:mongoose.Schema.Types.ObjectId
        
})



module.exports = mongoose.model("Products" , productSchema)