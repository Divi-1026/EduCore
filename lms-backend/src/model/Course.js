import mongoose from "mongoose";
import {User} from './user.js'
const courseschema=new mongoose.Schema
({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    },
    amount:{
        type:Number,
        required:true
    },
    totalstudent:{
        type:Number,
    },
    // Catgeory:{
     
    // },
    modules:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Modules"
        }
    ]
},{timestamps:true})
export const  Course=mongoose.model("Course",courseschema)