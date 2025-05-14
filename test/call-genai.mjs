import dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';

dotenv.config({ path: '.env.local', override: true });

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const config = {
  temperature: 0.5,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  topP: 0.95,
  topK: 40,
};


async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Why is the sky blue?',
  });
  console.log(response.text);
}

main();
