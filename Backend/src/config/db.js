const mongoose=require('mongoose');
const connectDB=async()=>{
    try{
             await mongoose.connect(process.env.MONGO_URI);
             console.log("Db s conncted")
    }
    catch(err){
        console.error("DB conncetion error", err.message)
        process.exit(1);
    }
}
module.exports = connectDB;