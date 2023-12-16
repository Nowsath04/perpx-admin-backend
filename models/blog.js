const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({

    mainheading:{
        required:[true,"pls Enter the Main Heading"],
        type:String
    },
    url:{
        required:[true,"pls Enter the url"],
        type:String
    },
    meta_title:{
        required:[true,"pls Enter the meta_title"],
        type:String
    },
    meta_description:{
        required:[true,"pls Enter the meta_description"],
        type:String
    },
    meta_keywords:{
        required:[true,"pls Enter the meta_keywords"],
        type:String
    },
    maincontent:{
        required:[true,"pls Enter the Main content"],
        type:String
    },
    category:{
        required:[true,"pls select the category"],
        type:String
    },
    content:{
        type:String
    },
    imageurl:{
        type:String
    },
    ogImage:{
        type:String
    }
 
   
},{
    timestamps:true
})

const Blogs=mongoose.model("Blogs",blogSchema)


module.exports=Blogs