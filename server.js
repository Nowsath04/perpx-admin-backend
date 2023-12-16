const express =require("express")
const dotenv =require("dotenv").config()
const cors= require("cors")
const ConnectDb = require("./config/DbConnection")
const sendData =require("./routers/SendEmail")
const ErrorMiddleware = require("./middleware/error")
const authRouter=require("./routers/userRouters")
const cookieparser=require("cookie-parser")
const blogRouter=require("./routers/blogRouters")
const app=express()
const multer=require("multer")
const pageRouter = require("./routers/pageRouter")
//  middleware
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json())

app.use("/api",sendData)
app.use("/api/auth",authRouter)
app.use("/api/blog",blogRouter)
app.use("/api/page",pageRouter)
// db connection

ConnectDb()

// asign port
const PORT=process.env.PORT || 4001

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})

app.use(ErrorMiddleware)