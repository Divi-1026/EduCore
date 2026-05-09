// models/GlobalTitle.js
import mongoose from "mongoose";

const GlobalTitleSchema = new mongoose.Schema({
  titles: {
    type: [String], // array of course titles
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.GlobalTitle || mongoose.model("GlobalTitle", GlobalTitleSchema);