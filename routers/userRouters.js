const express=require("express")
const { register, LoginUser, Myprofile, Userlogout, UpdateUser } = require("../controllers/userControllers")
const jwtVerification = require("../middleware/jwtVerfication")


const router=express.Router()


router.post("/register",register)
router.post("/login",LoginUser)
router.get("/myprofile",jwtVerification,Myprofile)
router.get("/logout",Userlogout)
router.put("/updateprofile",jwtVerification,UpdateUser)

module.exports=router