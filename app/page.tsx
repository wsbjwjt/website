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
import Assistant from "@/components/Assistant"

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
