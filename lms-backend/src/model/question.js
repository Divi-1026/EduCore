import mongoose from "mongoose";
import { Quiz } from "./Quiz.js";
const questionschema=new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Quiz",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    options:[
        {
            type:String,

        }
    ],
    correctOption:{
        type:String,
    },
    explanation:{
        type:String
    }
},{timestamps:true})
export const Questions=mongoose.model("Questions",questionschema)