"use client"

import dynamic from 'next/dynamic'
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Activities from "@/components/Activities"
import Events from "@/components/Events"
import Showcase from "@/components/Showcase"
import Stats from "@/components/Stats"
import Testimonials from "@/components/Testimonials"
import Timeline from "@/components/Timeline"
import Team from "@/components/Team"
import Partners from "@/components/Partners"
import Footer from "@/components/Footer"

// 动态导入 Assistant 组件
const Assistant = dynamic(() => import('@/components/Assistant'), {
  ssr: false,
})

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A]">
      <Navbar />
      <Hero />
      <Features />
      <Activities />
      <Events />
      <Showcase />
      <Stats />
      <Testimonials />
      <Timeline />
      <Team />
      <Partners />
      <Footer />
      <Assistant />
    </main>
  )
}
