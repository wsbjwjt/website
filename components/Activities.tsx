"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Coffee, Presentation, Flag } from "lucide-react"

const activities = [
  {
    icon: Calendar,
    title: "创客交流会",
    schedule: "每周",
    description: "分享创意，碰撞灵感，结识志同道合的伙伴"
  },
  {
    icon: Coffee,
    title: "CoWork 创客咖啡",
    schedule: "每周",
    description: "一起工作，互相帮助，享受创造的过程"
  },
  {
    icon: Presentation,
    title: "Demo Day",
    schedule: "每月",
    description: "展示成果，分享经验，庆祝每一个进步"
  },
  {
    icon: Flag,
    title: "黑客马拉松",
    schedule: "不定期",
    description: "挑战自我，突破界限，实现想法"
  }
]

export default function Activities() {
  return (
    <section className="bg-[#1A1A1A] py-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            活动形式<span className="text-[#4ADE80]">.format()</span>
          </h2>
          <p className="text-xl text-gray-400">
            多样化的活动形式，总有一款适合你
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1E1E1E] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors"
            >
              <activity.icon className="w-12 h-12 text-[#4ADE80] mb-4" />
              <h3 className="text-white text-xl mb-2 font-mono">{activity.title}</h3>
              <div className="text-[#4ADE80] text-sm mb-3 font-mono">{activity.schedule}</div>
              <p className="text-gray-400">{activity.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 