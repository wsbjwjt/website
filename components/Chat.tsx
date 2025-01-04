"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, User, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // 添加用户消息
    setMessages(prev => [...prev, { role: "user" as const, content: userMessage }])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 添加一个空的助手消息
      setMessages(prev => [...prev, { role: "assistant" as const, content: "" }])

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available")

      const decoder = new TextDecoder()
      let currentMessage = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  currentMessage += content
                  // 更新最后一条消息
                  setMessages(prev => {
                    const newMessages = [...prev]
                    if (newMessages.length > 0) {
                      const lastMessage = newMessages[newMessages.length - 1]
                      if (lastMessage.role === "assistant") {
                        newMessages[newMessages.length - 1] = {
                          ...lastMessage,
                          content: currentMessage
                        }
                      }
                    }
                    return newMessages
                  })
                }
              } catch (e) {
                console.error('Error parsing chunk:', e)
              }
            }
          }
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.role === "assistant") {
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: "抱歉，发生了一些错误。请稍后再试。"
          }
          return newMessages
        }
        return [...prev, { 
          role: "assistant" as const, 
          content: "抱歉，发生了一些错误。请稍后再试。" 
        }]
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setMessages([])
    setInput("")
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#4ADE80] flex items-center justify-center shadow-lg hover:bg-[#3EBE70] transition-colors"
      >
        <Bot className="w-6 h-6 text-[#1E1E1E]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[400px] bg-[#1E1E1E] rounded-lg shadow-xl border border-[#333] overflow-hidden"
          >
            <div className="bg-[#2D2D2D] px-4 py-2 flex justify-between items-center border-b border-[#333]">
              <div className="flex items-center gap-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="h-4 w-px bg-[#333]"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-[#4ADE80] text-xs font-mono">ai-assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1 rounded-md bg-[#4ADE80] text-[#1E1E1E] text-sm font-['SimSun']">
                  你好
                </button>
                <button className="p-2 rounded-md bg-[#2A2A2A] text-gray-400 hover:text-gray-300">
                  <User className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-4 font-['SimSun']">
                  你好！我是 AI 助手，请问有什么可以帮你的？
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex gap-3 items-start",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg bg-[#2D2D2D] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-[#4ADE80]" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm font-['SimSun']",
                        message.role === "user"
                          ? "bg-[#4ADE80] text-[#1E1E1E]"
                          : "bg-[#2D2D2D] text-gray-200"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <div className="min-h-[1.5rem]">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            className="prose prose-invert prose-sm max-w-none font-['SimSun'] break-words"
                            components={{
                              p: ({node, ...props}) => <p className="mb-2" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                              li: ({node, ...props}) => <li className="mb-1" {...props} />,
                              code: ({node, ...props}) => (
                                <code 
                                  className="bg-[#333] px-1 py-0.5 rounded text-sm" 
                                  {...props} 
                                />
                              ),
                              pre: ({node, ...props}) => (
                                <pre 
                                  className="bg-[#333] p-2 rounded my-2 overflow-x-auto" 
                                  {...props} 
                                />
                              )
                            }}
                          >
                            {message.content || '正在思考...'}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                      )}
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-lg bg-[#4ADE80] flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-[#1E1E1E]" />
                      </div>
                    )}
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#333] bg-[#252525]">
              <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-lg border border-[#333] group focus-within:border-[#4ADE80]">
                <span className="text-[#4ADE80] font-mono">❯</span>
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  placeholder="输入问题..."
                  className="flex-1 min-w-0 bg-transparent outline-none text-sm text-gray-300 font-['SimSun'] placeholder:text-gray-600 placeholder:font-['SimSun']"
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck="false"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "p-1 rounded transition-colors flex-shrink-0",
                    "text-gray-400 hover:text-[#4ADE80]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
