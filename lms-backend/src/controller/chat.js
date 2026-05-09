import { Chat } from "../model/chat.js";
import { Lecture } from "../model/Videos.js";
import { generateAnswer } from "../config/ai.js";

export const chatWithHistory = async (req, res) => {
  try {
    const { lectureId, question } = req.body;
    const userId = req.user._id; // if auth enabled

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found" });

    // 1️⃣ Find existing chat
    let chat = await Chat.findOne({ lectureId, userId });

    if (!chat) {
      chat = await Chat.create({
        lectureId,
        userId,
        messages: []
      });
    }

    // 2️⃣ Last 10 messages lo
    const lastMessages = chat.messages.slice(-10);

    // 3️⃣ LLM format banao
    const messages = [
      {
        role: "system",
        content: `You are an AI tutor for lecture titled "${lecture.lectureTitle}". You have to answer the questions in point wise and return the response in line sperated so that one can easily understand`
      },
      ...lastMessages,
      {
        role: "user",
        content: question
      }
    ];

    // 4️⃣ LLM call
    const answer = await generateAnswer(messages);

    // 5️⃣ Save new messages
    chat.messages.push(
      { role: "user", content: question },
      { role: "assistant", content: answer }
    );

    await chat.save();

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};