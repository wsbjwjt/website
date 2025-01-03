"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const navItems = [
  { name: "~/简介", href: "#intro" },
  { name: "~/特色", href: "#features" },
  { name: "~/活动", href: "#activities" },
  { name: "~/历程", href: "#timeline" },
  { name: "~/社区", href: "#community" },
  { name: "~/飞书文档", href: "/docs" },
  { name: "~/加入社区", href: "/join" },
]

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-[#1A1A1A] border-b border-[#333] z-50"
    >
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#4ADE80] flex items-center justify-center rounded">
                <span className="text-black font-mono">{">"}</span>
              </div>
              <span className="text-white font-mono">Digital<span className="text-[#4ADE80]">.hills()</span></span>
            </Link>
            <div className="hidden md:flex items-center space-x-2 text-sm font-mono">
              <span className="text-[#4ADE80]">●</span>
              <span className="text-[#4ADE80]">system.status: online</span>
              <span className="text-gray-500">v1.0.0</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-[#4ADE80] text-sm font-mono transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden text-gray-400 hover:text-[#4ADE80]"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  )
} 