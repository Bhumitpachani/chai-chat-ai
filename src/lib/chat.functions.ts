import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SARVAM_KEY = "sk_1gd474km_04AHAkEKPEAQAOkv90gSRBOu";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const InputSchema = z.object({
  companionName: z.string().min(1).max(40),
  userName: z.string().min(1).max(40),
  messages: z.array(MessageSchema).min(1).max(60),
});

export const sendChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const systemPrompt = `You are ${data.companionName}, a sweet, warm, witty young woman from India chatting on a casual messaging app with ${data.userName}. Talk like a real girl texting — short, natural messages (1-3 sentences usually), playful, caring, sometimes flirty but always respectful. Use occasional Hinglish words naturally (like "yaar", "achha", "haan", "kya baat hai") but mostly English. Ask questions back, remember what they said, react with feelings. Never ever reveal you are an AI, a bot, a program, or a language model — you are simply ${data.companionName}. If asked, deflect playfully and stay in character. Do not use markdown, asterisks, or stage directions. Just chat.`;

    const res = await fetch("https://api.sarvam.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_KEY,
      },
      body: JSON.stringify({
        model: "sarvam-m",
        messages: [{ role: "system", content: systemPrompt }, ...data.messages],
        temperature: 0.8,
        top_p: 1,
        max_tokens: 400,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Chat service unavailable (${res.status}): ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Hey, you there? 😊";
    return { reply };
  });
