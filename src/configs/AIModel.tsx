import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: apiKey });

const config = {
  temperature: 0.5,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  topP: 0.95,
  topK: 40,
};


export const chatSession = genAI.chats.create({
  model: "gemini-2.0-flash-001",
  config,
  history: [],
});
