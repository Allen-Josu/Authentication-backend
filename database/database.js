const mongoose = require("mongoose")

const connection = process.env.database

mongoose.connect(connection).then(()=>{
    console.log("MongoDb connected successfully");
}).catch((error=> console.log("An Error has been occured",error)))

module.exports = connection


