import mongoose from "mongoose";
import { User } from "./user.js";
import { Course } from "./Course.js";
import { Lecture } from "./Videos.js";
const commentschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    lectureId:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    },
    comment:{
        type:String,
        required:true
    }

},{timestamps:true})
export const Comment=mongoose.model("Comment",commentschema)