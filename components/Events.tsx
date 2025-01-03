"use client"

import React from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Clock, MapPin, ArrowRight, Terminal, Laptop, Brain } from "lucide-react"

const events = [
  {
    id: 1,
    title: "AI 黑客马拉松",
    date: "2024.05.25",
    time: "09:00 - 21:00",
    location: "深圳市南山区科技园",
    participants: 120,
    type: "hackathon",
    icon: Terminal,
    tag: "Hackathon",
    status: "即将开始"
  },
  {
    id: 2,
    title: "开源项目工作坊",
    date: "2024.05.28",
    time: "14:00 - 17:00",
    location: "线上",
    participants: 80,
    type: "workshop",
    icon: Laptop,
    tag: "Workshop",
    status: "可报名"
  },
  {
    id: 3,
    title: "AI 技术分享会",
    date: "2024.06.01",
    time: "19:00 - 21:00",
    location: "深圳市福田区创新中心",
    participants: 150,
    type: "meetup",
    icon: Brain,
    tag: "Meetup",
    status: "可报名"
  }
]

export default function Events() {
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
            近期活动<span className="text-[#4ADE80]">.events()</span>
          </h2>
          <p className="text-xl text-gray-400">
            参与精彩活动，结识志同道合的伙伴
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[#1E1E1E] rounded-lg overflow-hidden border border-[#333] hover:border-[#4ADE80] transition-colors"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* 活动标签 */}
              <div className="absolute top-4 right-4">
                <div className="px-2 py-1 bg-[#2A2A2A] rounded text-xs font-mono text-[#4ADE80]">
                  {event.tag}
                </div>
              </div>

              {/* 活动内容 */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-[#2D2D2D] rounded flex items-center justify-center mb-4">
                    <event.icon className="w-6 h-6 text-[#4ADE80]" />
                  </div>
                  <h3 className="text-white text-xl mb-2 font-mono">{event.title}</h3>
                  <div className="text-[#4ADE80] text-sm font-mono mb-1">
                    {event.status}
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.participants} 人已报名</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full bg-[#2A2A2A] hover:bg-[#333] text-gray-400 hover:text-[#4ADE80] px-4 py-2 rounded font-mono text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>$ register --event {event.id}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2A2A2A] hover:bg-[#333] text-gray-400 hover:text-[#4ADE80] px-6 py-3 rounded-lg font-mono text-sm inline-flex items-center gap-2 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>$ view --all-events</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 