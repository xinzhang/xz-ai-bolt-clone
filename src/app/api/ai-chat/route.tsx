import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const result = await chatSession.sendMessage({
      message: JSON.stringify(prompt),
    });

    const response = result.text;
    return NextResponse.json({result: response});

  } catch (e) {
    console.error("Error sending message:", e);
    return NextResponse.json({ error: "Error sending message" });
  }
}