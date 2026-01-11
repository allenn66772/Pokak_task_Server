const mongoose=require("mongoose")
const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Started running successfully");

    
}).catch(err=>{
    console.log(`MongoDb connection faileddue to ${err}`);
    
})
