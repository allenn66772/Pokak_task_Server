const express=require("express")
const { userRegisterController, userLoginController } = require("./controller/userController")
const { createTaskController, getTaskController } = require("./controller/taskController")
const jwtMiddleware = require("./middleware/jwtmiddleware")


const router= express.Router()


//register
router.post("/register",userRegisterController)
//login
router.post("/login",userLoginController)



//creatte task controller
router.post("/create-task",jwtMiddleware,createTaskController)
//get tasks
router.get("/get-all-task",jwtMiddleware,getTaskController)

module.exports=router