const express= require("express");
const { NewBlog, GetSingleBlog, DeleteSingleBlog, UpdateSingleBlog, getAllBlog, GetSingleBlogUrl } = require("../controllers/blogControllers");
const jwtVerification = require("../middleware/JwtVerfication");
const upload = require("../utils/fileUpload");


const router=express.Router()

router.post("/newblog", jwtVerification, upload.array('image', 2), NewBlog);
router.get("/single-blog/:id",GetSingleBlog)
router.get("/single-blogs/:id",GetSingleBlogUrl)
router.delete("/single-blog/:id",jwtVerification,DeleteSingleBlog)
router.put("/single-blog/:id",jwtVerification, upload.array('image', 2),UpdateSingleBlog)
router.get("/allblog",getAllBlog)


module.exports=router