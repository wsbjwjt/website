"use client"

import { motion } from "framer-motion"

interface TeamMember {
  name: string
  title: string
  description: string
  avatar: string
  command: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Chen",
    title: "北京主理人",
    description: "独立开发者，INTJ",
    avatar: "/avatar/1.svg",
    command: "$ contact --member alexchen --type 北京主理人"
  },
  {
    name: "林晓风",
    title: "杭州主理人",
    description: "坚持做成就自有价值的事情",
    avatar: "/avatar/2.svg",
    command: "$ contact --member 林晓风 --type 杭州主理人"
  },
  {
    name: "张明远",
    title: "上海主理人",
    description: "企业AI数据式顾问，新范式人工智能创始人，前千亿上市科技人公司商业化负责人",
    avatar: "/avatar/3.svg",
    command: "$ contact --member 张明远 --type 上海主理人"
  },
  {
    name: "王思哲",
    title: "北京主理人",
    description: "Blur.today 的founder，正在理想主义的徘徊",
    avatar: "/avatar/4.svg",
    command: "$ contact --member 王思哲 --type 北京主理人"
  },
  {
    name: "陈云飞",
    title: "上海主理人",
    description: "706科技主理人，Web3 BUIDLer",
    avatar: "/avatar/5.svg",
    command: "$ contact --member 陈云飞 --type 上海主理人"
  },
  {
    name: "吴天成",
    title: "杭州主理人",
    description: "一个关注AI机器人的欧式式研发",
    avatar: "/avatar/6.svg",
    command: "$ contact --member 吴天成 --type 杭州主理人"
  },
  {
    name: "黄嘉诚",
    title: "上海主理人",
    description: "熵增力场创始人，用AI让人机交互感增增一样自然",
    avatar: "/avatar/7.svg",
    command: "$ contact --member 黄嘉诚 --type 上海主理人"
  },
  {
    name: "李远航",
    title: "北京主理人",
    description: "来自硅谷的连续创业者，前Apple硬件工程师，微信阅读重度用户，每日有氧运动，跑步，游泳，乒乓",
    avatar: "/avatar/8.svg",
    command: "$ contact --member 李远航 --type 北京主理人"
  }
]

export default function Team() {
  return (
    <section className="py-20 bg-[#1A1A1A]" id="team">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
          <span className="text-[#4ADE80] text-sm">核心团队</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Team<span className="text-[#4ADE80]">.members()</span>
          </h2>
          <p className="text-gray-400">与优秀的人一起，做有趣的事</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1E1E1E] rounded-lg p-6 border border-[#333] group"
            >
              <div className="flex items-center space-x-1 mb-1 opacity-40">
                <div className="w-2 h-2 rounded-full bg-[#FF5F56]"></div>
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2 h-2 rounded-full bg-[#27C93F]"></div>
                <span className="ml-2 text-xs text-gray-500">team-member</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 bg-opacity-20" style={{ backgroundColor: '#4ADE80' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{member.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-[#4ADE80]"></div>
                  <span className="text-[#4ADE80] text-sm">{member.title}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 text-center">{member.description}</p>
                <div className="w-full bg-black bg-opacity-30 rounded p-2">
                  <code className="text-[#4ADE80] text-xs font-mono">{member.command}</code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 