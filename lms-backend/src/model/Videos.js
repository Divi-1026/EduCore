import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
  lectureId: { type: String, required: true },
  lectureTitle: { type: String, required: true },
  lectureDuration: { type: Number, required: true },
  lectureUrl: { type: String, required: true },
  isPreviewFree: { type: Boolean, required: true },
  lectureOrder: { type: Number, required: true },

  // 🟢 NEW FIELD - Full Transcript
  transcript: {
    type: String
  },

  // 🟢 NEW FIELD - Chunks with embeddings
  chunks: [
    {
      text: String,
      embedding: [Number],
      timestamp: String   // optional (future upgrade)
    }
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],

  quiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

export const Lecture = mongoose.model("Lecture", LectureSchema);