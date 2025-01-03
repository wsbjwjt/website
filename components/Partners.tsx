"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "Github",
    logo: "/partners/github-light.svg",
    type: "代码托管合作伙伴"
  },
  {
    name: "Microsoft",
    logo: "/partners/microsoft-light.svg", 
    type: "云服务合作伙伴"
  },
  {
    name: "Ubuntu",
    logo: "/partners/ubuntu-light.svg",
    type: "操作系统合作伙伴"
  },
  {
    name: "Google Cloud",
    logo: "/partners/google-cloud-light.svg",
    type: "云计算合作伙伴"
  },
  {
    name: "Hugging Face",
    logo: "/partners/huggingface-light.svg",
    type: "AI 模型合作伙伴"
  },
  {
    name: "Vercel",
    logo: "/partners/vercel-light.svg",
    type: "部署服务合作伙伴"
  }
]

export default function Partners() {
  return (
    <section className="bg-[#1E1E1E] py-20">
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div>
            <span className="text-gray-400 text-sm">合作伙伴</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            Partners<span className="text-[#4ADE80]">.list()</span>
          </h2>
          <p className="text-xl text-gray-400">
            与行业领先者一起，探索 AI 的未来
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A1A1A] p-6 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors group"
            >
              <div className="h-16 flex items-center justify-center mb-4">
                <div className="relative w-32 h-8">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-white text-lg mb-1 font-mono">{partner.name}</h3>
                <div className="text-gray-400 text-sm">{partner.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 