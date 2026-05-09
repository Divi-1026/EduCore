import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  messages: [
    {
      role: String,   // "user" | "assistant"
      content: String
    }
  ]
}, { timestamps: true });

export const Chat = mongoose.model("Chat", ChatSchema);