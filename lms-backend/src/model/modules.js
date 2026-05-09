import mongoose from "mongoose";
import { User } from "./user.js";
import { Quiz } from "./Quiz.js";
import { Comment } from "./comment.js";
import { Lecture } from "./Videos.js"; // lecture schema file

const ModuleSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  title: {
    type: String,
    required: true
  },
 
  
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }]

}, { timestamps: true });

export const Modules = mongoose.model("Modules", ModuleSchema);
