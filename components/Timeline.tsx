import React from "react"
import { motion } from "framer-motion"
import { Flag, Users, Globe, Cpu, Lightbulb, Plane, Puzzle } from "lucide-react"

const milestones = [
  {
    icon: Flag,
    date: "2024.05.19",
    title: "社区成立",
    description: "在北京成立，开启共学共创之旅"
  },
  {
    icon: Users,
    date: "2024.06",
    title: "社区扩张",
    description: "深圳社区迅速发展，吸引500+创造者加入"
  },
  {
    icon: Globe,
    date: "2024.07",
    title: "全国布局",
    description: "深圳、广州、上海、杭州等城市相继成立分部"
  },
  {
    icon: Cpu,
    date: "2024.08",
    title: "主题拓展",
    description: "新增硬件、机器人、出海SEO等创新主题"
  },
  {
    icon: Lightbulb,
    date: "2024.09",
    title: "形式创新",
    description: "推出Cursor共创、AI夜校、DemoDay等多样化活动"
  },
  {
    icon: Plane,
    date: "2024.10",
    title: "国际化探索",
    description: "在泰国清迈举办首次海外创客活动"
  },
  {
    icon: Puzzle,
    date: "2024.11",
    title: "生态共建",
    description: "与更多合作伙伴一起探索AI游戏、3D打印等新领域"
  }
]

export default function Timeline() {
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
            发展历程<span className="text-[#4ADE80]">.timeline()</span>
          </h2>
          <p className="text-xl text-gray-400">
            记录每一个重要的里程碑
          </p>
        </motion.div>

        <div className="relative">
          {/* 中间的时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#333]" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors">
                    <milestone.icon className="w-8 h-8 text-[#4ADE80] mb-4" />
                    <div className="text-[#4ADE80] text-sm font-mono mb-2">
                      {milestone.date}
                    </div>
                    <h3 className="text-white text-xl mb-2 font-mono">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-[#4ADE80] rounded-full relative z-10">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#1E1E1E] rounded-full" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 