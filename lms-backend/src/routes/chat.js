import express from "express";
import { chatWithHistory } from "../controller/chat.js";
import { protectRoute } from "../middleware/authmiddleware.js"; // agar login required hai

const chatRouter = express.Router();

// Lecture AI Chat
chatRouter.post(
  "/lectures/chat",
  protectRoute,   // optional (agar sirf logged in user allowed)
  chatWithHistory
);

export default chatRouter;