"use client"

import React from "react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"

export default function QRCode() {
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
            <span className="text-gray-400 text-sm">订阅更新</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 font-mono">
            订阅更新<span className="text-[#4ADE80]">.subscribe()</span>
          </h2>
          <p className="text-xl text-gray-400">
            扫码关注，获取最新动态
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="bg-[#1A1A1A] p-8 rounded-lg border border-[#333] hover:border-[#4ADE80] transition-colors">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG
                value="https://digital-hills.com"
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">关注 Digital Hills 公众号</p>
              <p className="text-[#4ADE80] text-xs mt-1">获取最新技术资讯和活动信息</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 