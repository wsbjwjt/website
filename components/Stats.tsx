import React from "react"
import { motion } from "framer-motion"
import { Users, FolderGit, Calendar, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "200+",
    label: "社区成员",
    description: "来自不同领域的创新者"
  },
  {
    icon: FolderGit,
    number: "50+",
    label: "项目数量",
    description: "已完成的开源项目"
  },
  {
    icon: Calendar,
    number: "30+",
    label: "活动场次",
    description: "成功举办的技术活动"
  },
  {
    icon: Award,
    number: "10+",
    label: "获奖项目",
    description: "各类比赛中获得认可"
  }
]

export default function Stats() {
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
            数据统计<span className="text-[#4ADE80]">.growth()</span>
          </h2>
          <p className="text-xl text-gray-400">
            成长的每一个数字，都见证着我们共同的努力
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1E1E1E] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors text-center"
            >
              <stat.icon className="w-12 h-12 text-[#4ADE80] mx-auto mb-4" />
              <div className="text-[#4ADE80] text-4xl font-bold mb-2 font-mono">
                {stat.number}
              </div>
              <div className="text-white text-lg mb-2 font-mono">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 