const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

    categories:{
        type:String,
    }
 
   
},{
    timestamps:true
})

const categorys= mongoose.model("category",categorySchema)


module.exports= categorys