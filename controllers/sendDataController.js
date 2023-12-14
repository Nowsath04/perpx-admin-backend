const SendEmail = require("../models/emailModel")
const userMoreData = require("../models/sendMoreDataModel")

exports.sendData=async(req,res)=>{

    const {email_id,message,from_name}=req.body

    try {
        const user=await SendEmail.create({email_id,message,from_name})
        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
    }

}

exports.sendMoreData=async(req,res)=>{

    try {
        const user=await userMoreData.create(req.body)
        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
    }

}