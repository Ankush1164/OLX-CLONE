const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 4000
app.use(express.json())
const path = require("path")

app.use('/uploads' , express.static(path.join(__dirname , 'uploads')))

// using cors
app.use(cors())
// routes
const routes = require("./routes/userRoutes")
app.use("/api" , routes)

// DB connection
const dbConnection = require("./database/databaseConnection")
dbConnection();

app.listen(PORT ,()=>{
    console.log(`Server is starting at ${PORT}`)
})