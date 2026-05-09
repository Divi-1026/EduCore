import mongoose from 'mongoose'
import{ ENV} from './env.js'
export const connectDB=async()=>{
    try{
  await mongoose.connect(ENV.Mongo_Url, {
    
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  console.log("Database Connected")
  console.log(ENV.Mongo_Url);
    }
    catch(error){
        console.log("Error from DB:", error.message);
        process.exit(1); // Exit the process on connection failure
    }
}