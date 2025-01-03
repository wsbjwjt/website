"use client"

import React from "react"
import { motion } from "framer-motion"
import { Code2, Cpu, Users, Rocket, Bot, Globe } from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "开源共创",
    description: "所有项目代码开源，共同维护和改进",
    tag: "Open Source"
  },
  {
    icon: Cpu,
    title: "AI 驱动",
    description: "运用最新 AI 技术，提升开发效率",
    tag: "AI Powered"
  },
  {
    icon: Users,
    title: "社区互助",
    description: "技术大咖在线答疑，经验分享",
    tag: "Community"
  },
  {
    icon: Rocket,
    title: "创新项目",
    description: "孵化有趣的创新项目，从想法到落地",
    tag: "Innovation"
  },
  {
    icon: Bot,
    title: "技术集成",
    description: "整合前沿技术，快速实现想法",
    tag: "Integration"
  },
  {
    icon: Globe,
    title: "全球视野",
    description: "对接国际资源，拓展海外市场",
    tag: "Global"
  }
]

export default function Features() {
  return (
    <section className="bg-[#1E1E1E] py-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            特色介绍<span className="text-[#4ADE80]">.features()</span>
          </h2>
          <p className="text-xl text-gray-400">
            打造一个充满创造力的开发者社区
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#1A1A1A] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* 标签 */}
              <div className="absolute top-4 right-4">
                <div className="px-2 py-1 bg-[#2A2A2A] rounded text-xs font-mono text-[#4ADE80]">
                  {feature.tag}
                </div>
              </div>

              {/* 图标 */}
              <div className="mb-4 relative">
                <div className="w-12 h-12 bg-[#2D2D2D] rounded flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-[#4ADE80]" />
                </div>
                <div className="absolute -inset-1 bg-[#4ADE80]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* 内容 */}
              <h3 className="text-white text-xl mb-2 font-mono relative">
                {feature.title}
              </h3>
              <p className="text-gray-400 relative">
                {feature.description}
              </p>

              {/* 悬停时显示的箭头 */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-[#4ADE80] font-mono">→</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 