const mongoose=require("mongoose")



const emailSchema=new mongoose.Schema({
    email_id:{
        type:String
    },
    from_name:{
        type:String
    },
    message:{
        type:String
    }
})


const SendEmail=mongoose.model("SendEmail",emailSchema)

module.exports=SendEmail