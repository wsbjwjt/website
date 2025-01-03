"use client"

import React from "react"
import { motion } from "framer-motion"
import { Terminal, ArrowRight } from "lucide-react"
import Image from "next/image"

const commands = [
  {
    input: "digital-hills init --project weekly",
    output: "Initializing Digital Hills weekly project...",
    delay: 0
  },
  {
    input: "community status",
    output: "Active members: 1000+ | Projects: 200+ | Events: 50+",
    delay: 1.5
  },
  {
    input: "next event --info",
    output: "Next hackathon: This weekend | Theme: AI + Open Source",
    delay: 3
  }
]

const partners = [
  {
    name: "OpenAI",
    description: "AI 技术合作伙伴",
    logo: "/partners/openai-light.svg"
  },
  {
    name: "Microsoft ftrel",
    description: "云服务合作伙伴",
    logo: "/partners/microsoft-light.svg"
  },
  {
    name: "SIVIV",
    description: "基础设施合作伙伴",
    logo: "/partners/aws-light.svg"
  },
  {
    name: "GET IOw",
    description: "AI 基础设施合作伙伴",
    logo: "/partners/google-cloud-light.svg"
  },
  {
    name: "I I I I",
    description: "AI 模型合作伙伴",
    logo: "/partners/huggingface-light.svg"
  },
  {
    name: "COO",
    description: "开源社区合作伙伴",
    logo: "/partners/github-light.svg"
  },
  {
    name: "I I I",
    description: "部署服务合作伙伴",
    logo: "/partners/vercel-light.svg"
  },
  {
    name: "I I I",
    description: "AI 研究合作伙伴",
    logo: "/partners/anthropic-light.svg"
  }
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-[#1A1A1A] flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,1fr] gap-16 items-center">
            {/* 左侧内容 */}
            <div className="flex flex-col justify-center">
              {/* 版本标签 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center bg-[#2A2A2A] px-2.5 py-1 rounded-md mb-6 w-fit"
              >
                <span className="text-[#4ADE80] text-xs font-mono flex items-center gap-1.5">
                  <span className="text-[#4ADE80]">●</span>
                  v1.0.0 stable
                </span>
              </motion.div>

              {/* 主标题 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight font-mono">
                  Digital<span className="text-[#4ADE80]">.hills()</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-lg">
                  用代码构建梦想，用创新改变世界。在这里，我们用技术的力量，共同创造无限可能。
                </p>
              </motion.div>

              {/* 命令行按钮 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#4ADE80] hover:bg-[#3AAD70] text-black px-5 py-2.5 rounded-lg font-mono transition-colors text-sm inline-flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  $ join --next-event
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#2A2A2A] hover:bg-[#333333] text-gray-400 px-5 py-2.5 rounded-lg font-mono transition-colors text-sm inline-flex items-center gap-2"
                >
                  <span>$ learn --more</span>
                  <span className="text-[#4ADE80]">&lt;/&gt;</span>
                </motion.button>
              </motion.div>

              {/* 统计数据 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  { number: "1000+", label: "开发者" },
                  { number: "200+", label: "项目" },
                  { number: "50+", label: "活动" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-[#1E1E1E] p-4 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors group"
                  >
                    <div className="text-[#4ADE80] text-3xl font-bold group-hover:scale-110 transition-transform">
                      {stat.number}
                    </div>
                    <div className="text-gray-500 mt-1 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* 右侧终端 */}
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1E1E1E] rounded-lg overflow-hidden shadow-2xl w-full border border-[#333]"
              >
                {/* 终端标题栏 */}
                <div className="bg-[#2D2D2D] px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="h-4 w-px bg-[#333]"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
                      <span className="text-[#4ADE80] text-xs font-mono">digital-hills</span>
                    </div>
                  </div>
                </div>

                {/* 终端内容 */}
                <div className="p-6 font-mono text-sm">
                  <div className="space-y-6">
                    {commands.map((cmd, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: cmd.delay }}
                      >
                        <div className="text-[#4ADE80] flex items-center gap-2">
                          <span className="text-gray-400">❯</span>
                          <span>$ {cmd.input}</span>
                        </div>
                        <div className="text-gray-400 mt-2">
                          {cmd.output}
                        </div>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 4.5 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-gray-400">❯</span>
                      <span className="text-[#4ADE80] animate-pulse">_</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 