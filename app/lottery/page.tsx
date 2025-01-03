"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function LotteryPage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const participants = [
    "张三", "李四", "王五", "赵六", "孙七", "周八", 
    "吴九", "郑十", "钱一", "孙二", "周三", "吴四"
  ]

  const startLottery = () => {
    setIsSpinning(true)
    setWinner(null)
    
    // 随机抽取时间 2-4 秒
    const duration = 2000 + Math.random() * 2000
    
    // 快速切换名字的动画
    let count = 0
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length)
      setWinner(participants[randomIndex])
      count++
      
      if (count > duration / 100) {
        clearInterval(interval)
        setIsSpinning(false)
      }
    }, 100)
  }

  return (
    <section className="min-h-screen bg-[#1A1A1A] flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[600px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E1E1E] rounded-lg overflow-hidden border border-[#333] p-8 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-8 font-mono">
              抽奖<span className="text-[#4ADE80]">.lottery()</span>
            </h1>
            
            <div className="bg-[#2A2A2A] rounded-lg p-8 mb-8">
              <motion.div
                animate={{ scale: isSpinning ? [1, 1.1, 1] : 1 }}
                transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.5 }}
                className="text-3xl font-mono text-[#4ADE80] mb-4"
              >
                {winner || "等待抽取..."}
              </motion.div>
              <div className="text-gray-400 text-sm">
                当前参与人数: {participants.length}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startLottery}
              disabled={isSpinning}
              className="bg-[#4ADE80] hover:bg-[#3AAD70] text-black px-8 py-3 rounded-lg font-mono transition-colors text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              {isSpinning ? "抽取中..." : "开始抽奖"}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
