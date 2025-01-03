"use client"

import React from "react"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { Mail, Phone, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] py-20 border-t border-[#333]">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo 和简介 */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4 font-mono">
              Digital<span className="text-[#4ADE80]">.hills()</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              用代码构建梦想，用创新改变世界。在这里，我们用技术的力量，共同创造无限可能。
            </p>
          </div>

          {/* 联系我们 */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 text-lg">联系我们</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@digital-hills.com" 
                   className="text-gray-400 hover:text-[#4ADE80] text-sm flex items-center gap-2 transition-colors">
                  <Mail size={16} />
                  <span>hello@digital-hills.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+86138-0000-0000" 
                   className="text-gray-400 hover:text-[#4ADE80] text-sm flex items-center gap-2 transition-colors">
                  <Phone size={16} />
                  <span>+86 138-0000-0000</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 关注我们 */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 text-lg">关注我们</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" 
                   className="text-gray-400 hover:text-[#4ADE80] text-sm flex items-center gap-2 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M8.4 2.4c1.2 0 2.4.6 3.6 1.2 1.2-.6 2.4-1.2 3.6-1.2 3 0 5.4 2.4 5.4 5.4 0 4.8-4.8 8.4-9 11.4-4.2-3-9-6.6-9-11.4 0-3 2.4-5.4 5.4-5.4z"/>
                  </svg>
                  <span>公众号：Digital Hills</span>
                </a>
              </li>
              <li>
                <a href="https://github.com" 
                   className="text-gray-400 hover:text-[#4ADE80] text-sm flex items-center gap-2 transition-colors">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 二维码 */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-6 text-lg">订阅更新</h3>
            <div className="flex flex-col items-start">
              <div className="bg-white p-2 rounded-lg hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-shadow">
                <QRCodeSVG
                  value="https://digital-hills.com"
                  size={90}
                  level="H"
                  includeMargin={false}
                />
              </div>
              <p className="text-gray-400 text-sm mt-3">扫码获取最新动态</p>
            </div>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-16 pt-8 border-t border-[#333] text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Digital Hills. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 