import mongoose from "mongoose";
import { User } from "./user.js";
import { Course } from "./Course.js";
// import { Course } from "./Course.js";
// import { Course } from "./course.js";
const orderschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    stripeSessionId:{
        type:String,
        unique:true
    }
},{timestamps:true})
export const Order=mongoose.model("Order",orderschema)