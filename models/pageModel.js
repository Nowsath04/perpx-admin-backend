const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({

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
    page: {
        required: [true, "Please enter the page name"],
        type: String,
        unique: true, // Enforce uniqueness constraint
    },
    imageurl:{
        type:String
    },
 
},{
    timestamps:true
})

const Pages = mongoose.model("Pages",pageSchema)


module.exports = Pages