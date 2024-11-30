const userModel = require("../models/index")

exports.getUser = async ( request,response) =>{
    const {username,password} = request.body  
    if(!username || !password){
        return response.status(400).json({message : "Please enter username or password"})
    }
    try{
        const user = await userModel.findOne({username,password})  
        if(!user){
            return response.status(400).json({message : "No such user found. Check your credentials and try again!"})
        }    
        return response.status(200).json({result : user, totalCount : 1 })
    }
    catch(error){
        return response.status(500).json({message : "An Error has been occured at the server.Please try again", details : error.message})
    }
}

exports.newUser = async(request,response) => {
    const {username,password} = request.body

    if(!username || !password){
        return response.status(400).json({message : "Please enter username or password"})
    }
    
    try{
        const existingUser = await userModel.find({username})
        
        if(existingUser.length>0){
            return response.status(400).json({message : "An user already exists with the same username. Please provide another username"})
        }
        const newUser = new userModel({username,password})
        const saveNewUser = await newUser.save();
        return response.status(200).json({message : "User Successfully Created"})
    }
    catch(error){
        return response.status(500).json({message : "An Error has occured at the Server. Please try again after some time", details : error.message})
    }
}

exports.updateUser = async (request, response) => {
    const { username, attributeToUpdate } = request.body;

    if (!username || typeof attributeToUpdate !== "object" || Object.keys(attributeToUpdate).length === 0) {
        return response.status(400).json({
            message: "Username and a valid attributeToUpdate object are required.",
        });
    }

    try {
        const existingUser = await userModel.findOne({ username });

        if (!existingUser) {
            return response.status(404).json({
                message: "User not found.",
            });
        }

        if (existingUser.username === attributeToUpdate?.username) {
            return response.status(400).json({
                message: "Username and attributeToUpdate cannot be the same.",
            });
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { username }, 
            attributeToUpdate, 
            { new: true } 
        );

        return response.status(200).json({
            message: "User updated successfully.",
            result: updatedUser,
        });
    } catch (error) {
        return response.status(500).json({
            message: "An error occurred while updating the user.",
            details: error.message,
        });
    }
};