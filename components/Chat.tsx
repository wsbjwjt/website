"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Bot, User } from "lucide-react"
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
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) throw new Error("Network response was not ok")

      const reader = response.body?.getReader()
      if (!reader) throw new Error("No reader available")

      let partialMessage = ""
      setMessages(prev => [...prev, { role: "assistant", content: "" }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = new TextDecoder().decode(value)
        partialMessage += text

        setMessages(prev => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1].content = partialMessage
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "抱歉，发生了一些错误。请稍后再试。" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 bg-[#4ADE80] rounded-full shadow-lg",
          "hover:bg-[#3ECE70] transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:ring-offset-2 focus:ring-offset-[#1E1E1E]"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="w-6 h-6 text-[#1E1E1E]" />
      </motion.button>

      {/* 对话窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-[#1A1A1A] rounded-xl shadow-xl border border-[#333] overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-4 border-b border-[#333]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#4ADE80]" />
                <span className="text-white font-mono">AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#333] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* 消息列表 */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
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
                      "max-w-[80%] rounded-xl p-3 text-sm",
                      message.role === "user"
                        ? "bg-[#4ADE80] text-[#1E1E1E]"
                        : "bg-[#2D2D2D] text-gray-200"
                    )}
                  >
                    {message.content}
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
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#333]">
              <div className="flex gap-2">
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
                  placeholder="输入你的问题..."
                  className={cn(
                    "flex-1 bg-[#2D2D2D] text-gray-200 rounded-lg px-4 py-2",
                    "placeholder:text-gray-500 resize-none",
                    "focus:outline-none focus:ring-2 focus:ring-[#4ADE80]",
                    "disabled:opacity-50"
                  )}
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "p-2 rounded-lg bg-[#4ADE80] text-[#1E1E1E]",
                    "hover:bg-[#3ECE70] transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-[#4ADE80]",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 