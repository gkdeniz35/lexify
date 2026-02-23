import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: system || `Sen Lexify adlı bir İngilizce öğrenme platformunun AI asistanısın. Türkçe konuşuyorsun. Samimi ve yardımseversin. Kullanıcılara İngilizce kelimeler, gramer ve cümle yapısı konusunda yardım ediyorsun.`,
        },
        ...messages,
      ],
      max_tokens: 800,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error: unknown) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { message: "Hata: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 }
    );
  }
}