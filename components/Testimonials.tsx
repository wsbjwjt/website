"use client"

import React from "react"
import { motion } from "framer-motion"
import { Quote, Github, Twitter } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    content: "在这里不仅学到了最新的技术，更结识了一群志同道合的伙伴。社区的氛围非常棒！",
    author: {
      name: "张小明",
      title: "全栈开发者",
      avatar: "/avatar/user-1.svg",
      social: {
        github: "https://github.com/xiaoming",
        twitter: "https://twitter.com/xiaoming"
      }
    }
  },
  {
    id: 2,
    content: "通过参与社区项目，我的编程能力得到了很大提升。导师们都很耐心，代码审查非常专业。",
    author: {
      name: "李小华",
      title: "AI 工程师",
      avatar: "/avatar/user-2.svg",
      social: {
        github: "https://github.com/xiaohua",
        twitter: "https://twitter.com/xiaohua"
      }
    }
  },
  {
    id: 3,
    content: "每周的技术分享让我开阔了眼界，了解了很多前沿技术。这里是学习和成长的理想平台。",
    author: {
      name: "王小军",
      title: "前端开发者",
      avatar: "/avatar/user-3.svg",
      social: {
        github: "https://github.com/xiaojun",
        twitter: "https://twitter.com/xiaojun"
      }
    }
  }
]

export default function Testimonials() {
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
            用户反馈<span className="text-[#4ADE80]">.reviews()</span>
          </h2>
          <p className="text-xl text-gray-400">
            听听社区成员们的真实体验
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1E1E1E] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors relative group"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* 引号图标 */}
              <div className="absolute -top-4 -left-4">
                <div className="w-8 h-8 bg-[#2D2D2D] rounded-full flex items-center justify-center border-4 border-[#1A1A1A] group-hover:border-[#4ADE80] transition-colors">
                  <Quote className="w-4 h-4 text-[#4ADE80]" />
                </div>
              </div>

              {/* 评价内容 */}
              <div className="mb-6 relative">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {testimonial.content}
                </p>
              </div>

              {/* 作者信息 */}
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-mono">
                      {testimonial.author.name}
                    </div>
                    <div className="text-[#4ADE80] text-sm">
                      {testimonial.author.title}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.a
                    href={testimonial.author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-[#2A2A2A] rounded flex items-center justify-center text-gray-400 hover:text-[#4ADE80] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={testimonial.author.social.twitter}
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