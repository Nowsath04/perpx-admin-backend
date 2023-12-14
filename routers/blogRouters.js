const express= require("express");
const { NewBlog, GetSingleBlog, DeleteSingleBlog, UpdateSingleBlog, getAllBlog, GetSingleBlogUrl } = require("../controllers/blogControllers");
const jwtVerification = require("../middleware/jwtVerfication");
const upload = require("../utils/fileUpload");


const router=express.Router()

router.post("/newblog",jwtVerification,upload.single("image"),NewBlog)
router.get("/single-blog/:id",GetSingleBlog)
router.get("/single-blogs/:id",GetSingleBlogUrl)
router.delete("/single-blog/:id",jwtVerification,DeleteSingleBlog)
router.put("/single-blog/:id",jwtVerification,upload.single("image"),UpdateSingleBlog)
router.get("/allblog",getAllBlog)


module.exports=router