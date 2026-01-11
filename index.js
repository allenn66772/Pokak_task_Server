const express=require("express")

require("dotenv").config()

const router=require("./router")
require("./db/connection")

const cors=require("cors")


const pokaktaskserver=express()
pokaktaskserver.use(cors())
pokaktaskserver.use(express.json())
pokaktaskserver.use(router)

const PORT=3000

pokaktaskserver.listen(PORT,()=>{
    console.log(`Server started running in ${PORT}`);
    
})

pokaktaskserver.get("/",(req,res)=>{
    res.status(200).send("Pokak Task Server running")
})