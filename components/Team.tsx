"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import Image from "next/image"

const team = [
  {
    name: "张三",
    title: "创始人 & CEO",
    avatar: "/team/member-1.jpg",
    social: {
      github: "https://github.com/zhangsan",
      twitter: "https://twitter.com/zhangsan"
    }
  },
  {
    name: "李四",
    title: "CTO",
    avatar: "/team/member-2.jpg",
    social: {
      github: "https://github.com/lisi",
      twitter: "https://twitter.com/lisi"
    }
  },
  {
    name: "王五",
    title: "产品总监",
    avatar: "/team/member-3.jpg",
    social: {
      github: "https://github.com/wangwu",
      twitter: "https://twitter.com/wangwu"
    }
  }
]

export default function Team() {
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
            团队介绍<span className="text-[#4ADE80]">.team()</span>
          </h2>
          <p className="text-xl text-gray-400">
            遇见改变世界的开发者们
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-white text-xl mb-1 font-mono">{member.name}</h3>
                <p className="text-[#4ADE80] text-sm mb-4">{member.title}</p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-[#2A2A2A] rounded flex items-center justify-center text-gray-400 hover:text-[#4ADE80] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-[#2A2A2A] rounded flex items-center justify-center text-gray-400 hover:text-[#4ADE80] transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 