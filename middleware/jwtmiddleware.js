const jwt=require("jsonwebtoken");
const { model } = require("mongoose");

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt Middleware");

    const token=req.headers.authorization.split(" ")[1]
    console.log(token);
    try {
        const jwtResponse=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(jwtResponse);
        req.payload=jwtResponse.userMail
        next()
        
    } catch (error) {
        res.status(500).json(error)
    }
    
    
}
module.exports=jwtMiddleware