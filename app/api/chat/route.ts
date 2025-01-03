import { OpenAIStream } from "@/lib/openai-stream"

// 验证环境变量
const requiredEnvVars = [
  "OPENAI_API_KEY",
  "OPENAI_API_BASE_URL",
  "OPENAI_MODEL_NAME",
] as const

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing ${envVar} environment variable`)
  }
}

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return new Response("Missing message in request body", { status: 400 })
    }

    console.log("Processing chat request:", { message: message.slice(0, 100) })

    const response = await fetch(`${process.env.OPENAI_API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL_NAME,
        messages: [
          {
            role: "system",
            content: "你是一个专业、友好的 AI 助手，可以帮助用户解答各种问题。请用简洁、准确的语言回答。",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        stream: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("OpenAI API error:", error)
      return new Response(`OpenAI API error: ${error}`, { status: response.status })
    }

    // 直接返回 OpenAI 的响应流
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
} 