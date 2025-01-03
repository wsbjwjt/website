"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Send, X, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface Message {
  role: "user" | "assistant"
  content: string
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleClose = () => {
    setIsOpen(false)
    setMessages([])
    setInput("")
  }

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
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      console.log("Sending message:", userMessage)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API Error:", errorText)
        throw new Error(`Network response was not ok: ${errorText}`)
      }

      // 添加一个空的助手消息
      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available")

      const decoder = new TextDecoder()
      let partialMessage = ""

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          // 解码新的数据块
          const chunk = decoder.decode(value)
          
          // 处理 SSE 格式的数据
          const lines = chunk.split('\n').filter(line => line.trim() !== '')
          
          for (const line of lines) {
            // 检查是否是 SSE 数据行
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim() // 移除 'data: ' 前缀并清理空白
              
              // 跳过特殊标记
              if (data === '[DONE]' || !data) continue

              try {
                // 尝试解析 JSON
                const json = JSON.parse(data)
                
                // 验证响应格式
                if (json?.choices?.[0]?.delta?.content) {
                  const text = json.choices[0].delta.content
                  partialMessage += text
                  
                  // 更新最后一条消息的内容
                  setMessages(prev => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1].content = partialMessage
                    return newMessages
                  })
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e, '\nRaw data:', data)
                continue // 跳过错误的数据，继续处理下一行
              }
            }
          }
        }
      } catch (e) {
        console.error("Error reading stream:", e)
        throw e
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error)
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "抱歉，发生了一些错误。请稍后再试。" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const MarkdownComponents: Components = {
    pre: ({ node, children, ...props }) => (
      <div className="relative my-2">
        <pre className="bg-[#1E1E1E] p-4 rounded-lg overflow-x-auto font-mono" {...props}>
          {children}
        </pre>
      </div>
    ),
    code: ({ node, inline, className, children, ...props }: CodeProps) => (
      inline ? (
        <code className="bg-[#1E1E1E] px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      ) : (
        <code className="font-mono" {...props}>
          {children}
        </code>
      )
    ),
    p: ({ node, children, ...props }) => (
      <p className="my-1 font-['SimSun']" {...props}>
        {children}
      </p>
    ),
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <div className="fixed bottom-8 right-8 group">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#2A2A2A] hover:bg-[#333333] text-[#4ADE80] p-3 rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
        >
          <Terminal className="w-5 h-5" />
        </motion.button>
        {/* 提示框 */}
        <div className="absolute bottom-full right-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-[#333] text-gray-200 text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            点击这里与 AI 助手对话
          </div>
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#333] transform rotate-45"></div>
        </div>
      </div>

      {/* 对话窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 right-8 z-50 w-[480px] bg-[#1E1E1E] rounded-lg shadow-xl border border-[#333] overflow-hidden"
          >
            {/* 头部 */}
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
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 消息列表 */}
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
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
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        className="prose prose-invert prose-sm max-w-none font-['SimSun']"
                        components={MarkdownComponents}
                      >
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 rounded-lg bg-[#4ADE80] flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-[#1E1E1E]" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入框 */}
            <div className="p-4 border-t border-[#333] bg-[#252525]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-lg border border-[#333] group focus-within:border-[#4ADE80]">
                <span className="text-[#4ADE80] font-mono">❯</span>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit()
                    }
                  }}
                  placeholder="输入命令 (例如: help)"
                  className="flex-1 bg-transparent outline-none text-sm text-gray-300 font-['SimSun'] placeholder:text-gray-600 placeholder:font-['SimSun'] resize-none"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSubmit()}
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "p-1 rounded transition-colors",
                    "text-gray-400 hover:text-[#4ADE80]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 