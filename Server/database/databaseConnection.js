const mongoose = require("mongoose")

const dbConnection = ()=>{
   mongoose.connect("mongodb+srv://ankushdhiman028:quEvH7fWvqMxRwdG@marketplace.uhfmydu.mongodb.net/")
   .then(()=>{console.log("MongoDb connection Successfully")})
   .catch(()=>{console.log("Error in DB connection")})
} 

module.exports = dbConnection;