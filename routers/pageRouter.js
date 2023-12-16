const express= require("express");
const jwtVerification = require("../middleware/JwtVerfication");
const upload = require("../utils/fileUpload");
const { NewPage, getAllpage, GetSinglePage, UpdateSinglePage } = require("../controllers/PageController");


const router=express.Router()

router.post("/newpage",jwtVerification,upload.single("image"),NewPage)
router.get("/allpage",getAllpage)
router.get("/single-page/:id",GetSinglePage)
router.put("/single-page/:id",jwtVerification,upload.single("image"),UpdateSinglePage)






module.exports=router