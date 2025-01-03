import React from "react"
import { motion } from "framer-motion"
import { Code2, Image, Wallet } from "lucide-react"

const projects = [
  {
    icon: Image,
    title: "AI图像生成",
    description: "基于 Stable Diffusion 的创新图像生成应用",
    tech: ["Python", "PyTorch", "React"],
    stats: {
      stars: "1.2k",
      forks: "234"
    }
  },
  {
    icon: Code2,
    title: "智能问答助手",
    description: "基于大语言模型的个性化助手应用",
    tech: ["TypeScript", "Next.js", "OpenAI"],
    stats: {
      stars: "892",
      forks: "156"
    }
  },
  {
    icon: Wallet,
    title: "Web3 钱包",
    description: "安全可靠的区块链钱包解决方案",
    tech: ["Solidity", "React", "Ethers.js"],
    stats: {
      stars: "567",
      forks: "89"
    }
  }
]

export default function Projects() {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors"
            >
              <project.icon className="w-12 h-12 text-[#4ADE80] mb-4" />
              <h3 className="text-white text-xl mb-3 font-mono">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-[#2A2A2A] text-[#4ADE80] text-sm rounded font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-[#4ADE80]">★</span>
                  <span className="text-gray-400">{project.stats.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#4ADE80]">⑂</span>
                  <span className="text-gray-400">{project.stats.forks}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 