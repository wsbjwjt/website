import { createParser } from 'eventsource-parser'

export async function OpenAIStream(content: string) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  console.log("OpenAIStream: Starting request to OpenAI API")
  console.log("API URL:", process.env.OPENAI_API_BASE_URL)
  console.log("Model:", process.env.OPENAI_MODEL_NAME)

  // 验证环境变量
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable")
  }
  if (!process.env.OPENAI_API_BASE_URL) {
    throw new Error("Missing OPENAI_API_BASE_URL environment variable")
  }
  if (!process.env.OPENAI_MODEL_NAME) {
    throw new Error("Missing OPENAI_MODEL_NAME environment variable")
  }

  try {
    const res = await fetch(`${process.env.OPENAI_API_BASE_URL}/chat/completions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      method: 'POST',
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL_NAME,
        messages: [
          {
            role: 'system',
            content: '你是一个专业、友好的 AI 助手，可以帮助用户解答各种问题。请用简洁、准确的语言回答。',
          },
          {
            role: 'user',
            content,
          },
        ],
        temperature: 0.7,
        stream: true,
      }),
    })

    console.log("OpenAI API response status:", res.status)
    console.log("OpenAI API response headers:", Object.fromEntries(res.headers.entries()))

    if (!res.ok) {
      const errorText = await res.text()
      console.error("OpenAI API error response:", errorText)
      throw new Error(`OpenAI API error: ${res.status} ${errorText}`)
    }

    if (!res.body) {
      throw new Error("No response body received from OpenAI API")
    }

    const stream = new ReadableStream({
      async start(controller) {
        console.log("Stream: Starting to process response")

        // @ts-ignore - eventsource-parser 类型定义问题
        const parser = createParser((event: any) => {
          if (event.type === 'event') {
            const data = event.data
            console.log("Stream: Received event data:", data)

            if (data === '[DONE]') {
              console.log("Stream: Received DONE signal")
              controller.close()
              return
            }

            try {
              const json = JSON.parse(data)
              console.log("Stream: Parsed JSON:", json)

              const text = json.choices[0]?.delta?.content || ''
              console.log("Stream: Extracted text:", text)

              if (text) {
                const queue = encoder.encode(text)
                controller.enqueue(queue)
              }
            } catch (e) {
              console.error("Stream: Error parsing data:", e)
              controller.error(e)
            }
          }
        })

        console.log("Stream: Starting to read response body")

        try {
          // 处理响应流
          for await (const chunk of res.body as any) {
            const decoded = decoder.decode(chunk)
            console.log("Stream: Received chunk:", decoded)
            parser.feed(decoded)
          }
        } catch (e) {
          console.error("Stream: Error reading response body:", e)
          controller.error(e)
        }
      },
    })

    return stream
  } catch (error) {
    console.error("OpenAIStream: Unexpected error:", error)
    throw error
  }
} 