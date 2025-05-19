import { codeGenSession } from "@/configs/AIModel";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const result = await codeGenSession.sendMessage({
      message: JSON.stringify(prompt),
    });

    fs.writeFileSync('./temp.json', result.text || "{}", 'utf-8');
    console.log(result.text);

    // this is using json response for chat
    const response = JSON.parse(result.text || "{}");
    return NextResponse.json(response);

  } catch (e) {
    console.error("Error sending message:", e);
    return NextResponse.json({ error: "Error sending message" });
  }
}