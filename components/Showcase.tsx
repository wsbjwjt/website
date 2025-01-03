"use client"

import React from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink, Star, GitFork, Code2, Bot, Cpu, Globe } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "AI 代码助手",
    description: "基于大语言模型的智能编程助手，支持多种编程语言。提供实时代码补全、错误检测和最佳实践建议，大幅提升开发效率。",
    icon: Bot,
    tech: ["TypeScript", "Next.js", "OpenAI"],
    preview: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1920&h=1080&q=80",
    github: "https://github.com/digital-hills/ai-assistant",
    demo: "https://ai.digital-hills.com",
    stats: {
      stars: 1289,
      forks: 234
    }
  },
  {
    id: 2,
    title: "智能 UI 生成器",
    description: "通过自然语言描述自动生成精美的前端界面代码。支持组件复用、主题定制和响应式设计，让设计师的创意快速变为现实。",
    icon: Code2,
    tech: ["React", "TailwindCSS", "GPT-4"],
    preview: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1920&h=1080&q=80",
    github: "https://github.com/digital-hills/ui-generator",
    demo: "https://ui.digital-hills.com",
    stats: {
      stars: 892,
      forks: 156
    }
  },
  {
    id: 3,
    title: "AI 模型训练平台",
    description: "低代码机器学习模型训练和部署平台。通过可视化界面轻松构建、训练和部署 AI 模型，无需深厚的技术背景。",
    icon: Cpu,
    tech: ["Python", "PyTorch", "FastAPI"],
    preview: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1920&h=1080&q=80",
    github: "https://github.com/digital-hills/ml-platform",
    demo: "https://ml.digital-hills.com",
    stats: {
      stars: 567,
      forks: 89
    }
  },
  {
    id: 4,
    title: "开源项目分析器",
    description: "深入分析开源项目的健康度和活跃度。提供代码质量评估、贡献者分析和趋势预测，助力开源社区发展。",
    icon: Globe,
    tech: ["Go", "GraphQL", "D3.js"],
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&h=1080&q=80",
    github: "https://github.com/digital-hills/repo-analyzer",
    demo: "https://analyzer.digital-hills.com",
    stats: {
      stars: 432,
      forks: 67
    }
  }
]

export default function Showcase() {
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
            项目展示<span className="text-[#4ADE80]">.showcase()</span>
          </h2>
          <p className="text-xl text-gray-400">
            展示社区成员的优秀作品，见证创新的力量
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#333] hover:border-[#4ADE80] transition-all duration-300 hover:shadow-lg hover:shadow-[#4ADE80]/10"
            >
              {/* 项目预览图 */}
              <div className="relative aspect-[16/9] bg-[#2A2A2A] overflow-hidden">
                <Image
                  src={project.preview}
                  alt={project.title}
                  width={1920}
                  height={1080}
                  priority={index < 2}
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#2A2A2A]/90 backdrop-blur-sm text-[#4ADE80] text-xs rounded-full font-mono border border-[#4ADE80]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* 项目信息 */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#2D2D2D] rounded-xl flex items-center justify-center group-hover:bg-[#4ADE80]/10 transition-colors">
                      <project.icon className="w-6 h-6 text-[#4ADE80]" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-mono group-hover:text-[#4ADE80] transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <GitFork className="w-4 h-4" />
                          <span className="text-sm">{project.stats.forks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80]/10 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-[#2A2A2A] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4ADE80] hover:bg-[#4ADE80]/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
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
          <motion.a
            href="https://github.com/digital-hills"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2A2A2A] hover:bg-[#333] text-gray-400 hover:text-[#4ADE80] px-6 py-3 rounded-lg font-mono text-sm inline-flex items-center gap-2 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>$ explore --all-projects</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 