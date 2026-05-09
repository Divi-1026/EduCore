import mongoose, { mongo } from "mongoose";
import { User } from "./user.js";
import { Course } from "./Course.js";
const enrollmentschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    stripeSessionId:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Enrollment=mongoose.model("Enrollment",enrollmentschema)