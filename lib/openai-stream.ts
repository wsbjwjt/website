import { createParser } from 'eventsource-parser'

export async function OpenAIStream(content: string) {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const res = await fetch(process.env.OPENAI_API_BASE_URL + '/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL_NAME,
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      temperature: 0.7,
      stream: true,
    }),
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  const stream = new ReadableStream({
    async start(controller) {
      // @ts-ignore - eventsource-parser 类型定义问题
      const parser = createParser((event: any) => {
        if (event.type === 'event') {
          const data = event.data
          if (data === '[DONE]') {
            controller.close()
            return
          }
          try {
            const json = JSON.parse(data)
            const text = json.choices[0]?.delta?.content || ''
            const queue = encoder.encode(text)
            controller.enqueue(queue)
          } catch (e) {
            controller.error(e)
          }
        }
      })

      // 处理响应流
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk))
      }
    },
  })

  return stream
} 