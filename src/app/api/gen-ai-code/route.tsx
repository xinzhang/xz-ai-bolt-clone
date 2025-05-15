import { codeGenSession } from "@/configs/AIModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await codeGenSession.sendMessage({
      message: JSON.stringify(prompt),
    });

    // this is using json response for chat
    const response = JSON.parse(result.text);
    return NextResponse.json(response);

  } catch (e) {
    console.error("Error sending message:", e);
    return NextResponse.json({ error: "Error sending message" });
  }
}