import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);
// better: process.env.GEMINI_API_KEY

export async function generateAnswer(messages) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"   // 2.5 tab use karo jab enabled ho
  });

  // OpenAI format → Gemini format
  const contents = messages.map(msg => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: msg.content
      }
    ]
  }));

  const result = await model.generateContent({
    contents: contents
  });

  return result.response.text();
}