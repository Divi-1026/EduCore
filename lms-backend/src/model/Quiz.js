import mongoose from "mongoose";
import { User } from "./user.js";
import { Modules } from "./modules.js";
import { Lecture } from "./Videos.js";
import { Questions } from "./question.js";
const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
    questions: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Questions",
        },
        selectedOption: {
          type: String,
        },
        isCorrect: {
          type: Boolean,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    attempted: {
  type: Boolean,
  default: false
}
  },
  { timestamps: true }
);
export const Quiz=mongoose.model("Quiz",quizSchema)