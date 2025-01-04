import { OpenAIStream } from "../../../lib/openai-stream"

// 验证环境变量
const requiredEnvVars = [
  "OPENAI_API_KEY",
  "OPENAI_API_BASE_URL",
  "OPENAI_MODEL_NAME",
] as const

// 在启动时验证环境变量
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing ${envVar} environment variable`)
  }
}

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    console.log("API Route: Received request")
    console.log("Request URL:", req.url)
    console.log("Request method:", req.method)
    console.log("Request headers:", Object.fromEntries(req.headers.entries()))

    // 验证请求方法
    if (req.method !== "POST") {
      return new Response(`Method ${req.method} Not Allowed`, { status: 405 })
    }

    // 验证 Content-Type
    const contentType = req.headers.get("content-type")
    if (!contentType?.includes("application/json")) {
      return new Response("Content-Type must be application/json", { status: 400 })
    }

    // 解析请求体
    let body
    try {
      body = await req.json()
    } catch (e) {
      console.error("API Route: Error parsing request body:", e)
      return new Response("Invalid JSON body", { status: 400 })
    }

    const { message } = body
    console.log("API Route: Received message:", message)

    if (!message || typeof message !== "string") {
      console.error("API Route: Missing or invalid message in request body")
      return new Response("Missing or invalid message in request body", { status: 400 })
    }

    console.log("API Route: Processing chat request")

    try {
      // 使用 OpenAIStream 处理请求
      const stream = await OpenAIStream(message)
      console.log("API Route: Stream created successfully")

      // 返回流式响应
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      })
    } catch (error) {
      console.error("API Route: Error in OpenAIStream:", error)
      return new Response(
        `Error processing request: ${error instanceof Error ? error.message : "Unknown error"}`,
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("API Route: Unexpected error:", error)
    return new Response(
      `Internal Server Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    )
  }
} 