const express = require("express")
const router = express.Router()


const userController = require("../controllers/index")


router.get("/users",userController.getUser)
router.post("/users",userController.newUser)
router.patch("/users",userController.updateUser)

module.exports = router;