const mongoose = require("mongoose")

 const userSendSchema = new mongoose.Schema({
    from_name: {
        type: String
    },
    from_email: {
        type: String
    },
    phonenumber: {
        type: String
    },
    country: {
        type: String
    },
    skypeId: {
        type: String
    },
    Ask_for: {
        type: String
    },
    message: {
        type: String
    },
    lookingFor: {
        type: String
    },

})



const userMoreData = mongoose.model("userMoreDatas", userSendSchema)

module.exports = userMoreData