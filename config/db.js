const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("mongobb connected:")
    }catch(err){
        console.log("mongobb connction error:")
        process.exit();
    }
}
module.exports=connectDB