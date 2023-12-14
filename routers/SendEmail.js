const express=require("express")
const { sendData, sendMoreData } = require("../controllers/sendDataController")



const router=express.Router()

router.post("/senddata",sendData)
router.post("/send-moredata",sendMoreData)

module.exports=router