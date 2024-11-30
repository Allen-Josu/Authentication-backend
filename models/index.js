const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel;