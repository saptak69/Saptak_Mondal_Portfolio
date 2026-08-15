"use client"

import React, { useState } from "react"
import { Cpu, Layout, Compass } from "lucide-react"

interface IdentityCardsProps {
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const pillars = [
  {
    id: "architect",
    number: "01",
    title: "System Architect",
    subtitle: "Distributed Infrastructure & Concurrency",
    description: "Designing high-throughput backend services in Java & Spring Boot, low-latency WebSockets, thread pool safety, and relational schema indexing.",
    icon: Cpu,
    renderIllustration: (isActive: boolean) => (
      <svg className="w-full h-24 text-[#111111]" viewBox="0 0 240 80" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Central Server Block */}
        <rect x="90" y="24" width="60" height="32" rx="4" className={`transition-all duration-300 ${isActive ? "fill-[#111111] stroke-[#111111]" : "fill-none stroke-[#111111]"}`} />
        {isActive && <rect x="96" y="30" width="16" height="4" rx="1" fill="#ffffff" />}
        {isActive && <circle cx="140" cy="32" r="2" fill="#d9532f" />}

        {/* Database Node Left */}
        <ellipse cx="34" cy="40" rx="18" ry="8" className="stroke-[#111111]" />
        <path d="M16 40 v12 c0 4.4 8 8 18 8 s18 -3.6 18 -8 v-12" className="stroke-[#111111]" />

        {/* API Arrow Right */}
        <rect x="186" y="28" width="36" height="24" rx="3" strokeDasharray="3 3" className="stroke-[#888888]" />

        {/* Connecting 1px Lines */}
        <path
          d="M52 40 L90 40 M150 40 L186 40"
          className={`transition-all duration-500 ${isActive ? "stroke-[#d9532f] stroke-[1.5]" : "stroke-[#aaaaaa]"}`}
          strokeDasharray={isActive ? "none" : "2 2"}
        />
      </svg>
    ),
  },
  {
    id: "developer",
    number: "02",
    title: "Full-Stack Developer",
    subtitle: "Reactive Components & APIs",
    description: "Crafting fluid, type-safe web applications with Next.js 14, React 18, TypeScript, and server-rendered data pipelines.",
    icon: Layout,
    renderIllustration: (isActive: boolean) => (
      <svg className="w-full h-24 text-[#111111]" viewBox="0 0 240 80" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Outer Browser Frame */}
        <rect x="30" y="12" width="180" height="56" rx="6" className={`transition-colors duration-300 ${isActive ? "stroke-[#111111]" : "stroke-[#cccccc]"}`} />
        <line x1="30" y1="26" x2="210" y2="26" className="stroke-[#e6e4dc]" />
        <circle cx="42" cy="19" r="2" fill="#888888" />
        <circle cx="50" cy="19" r="2" fill="#888888" />
        <circle cx="58" cy="19" r="2" fill="#888888" />

        {/* Layered Content Elements */}
        <rect x="42" y="34" width="48" height="26" rx="2" className={`transition-all duration-300 ${isActive ? "fill-[#111111]" : "fill-[#f4f3ee]"}`} />
        <line x1="100" y1="38" x2="190" y2="38" strokeLinecap="round" className="stroke-[#111111]" />
        <line x1="100" y1="46" x2="160" y2="46" strokeLinecap="round" className="stroke-[#888888]" />
        <line x1="100" y1="54" x2="135" y2="54" strokeLinecap="round" className="stroke-[#aaaaaa]" />
      </svg>
    ),
  },
  {
    id: "creative",
    number: "03",
    title: "Creative Developer",
    subtitle: "Procedural Geometry & Sound Design",
    description: "Harmonizing technical precision with progressive rock guitar, complex odd-time signatures (7/8, 11/8), and audio synthesis.",
    icon: Compass,
    renderIllustration: (isActive: boolean) => (
      <svg className="w-full h-24 text-[#111111]" viewBox="0 0 240 80" fill="none" stroke="currentColor" strokeWidth="1.2">
        {/* Orbital Geometry */}
        <ellipse cx="120" cy="40" rx="80" ry="24" className="stroke-[#aaaaaa]" strokeDasharray="3 3" />
        <circle cx="120" cy="40" r="7" className={`transition-all duration-300 ${isActive ? "fill-[#111111]" : "fill-none"}`} />
        <circle cx="170" cy="24" r="4" className={`transition-all duration-300 ${isActive ? "fill-[#d9532f]" : "fill-none"}`} />
        <circle cx="70" cy="54" r="5" className="fill-none stroke-[#111111]" />
        <line x1="120" y1="40" x2="170" y2="24" className="stroke-[#111111] opacity-60" />
      </svg>
    ),
  },
]

export default function IdentityCards({ onPlaySound }: IdentityCardsProps) {
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null)

  return (
    <section className="py-20 border-b border-[#e6e4dc] bg-[#f7f6f1]/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-10 border-b border-[#e6e4dc] pb-4">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#0d9488] font-semibold">
              CORE PILLARS • THREE FOUNDATIONS
            </span>
          </div>
          <span className="font-mono text-xs text-[#888888]">
            Interactive Architectural Cards
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon
            const isActive = activePillarIndex === idx

            return (
              <div
                key={pillar.id}
                tabIndex={0}
                role="button"
                data-cursor="VIEW"
                onFocus={() => {
                  setActivePillarIndex(idx)
                  onPlaySound("tap")
                }}
                onBlur={() => setActivePillarIndex(null)}
                onMouseEnter={() => {
                  setActivePillarIndex(idx)
                  onPlaySound("tap")
                }}
                onMouseLeave={() => setActivePillarIndex(null)}
                className={`group rounded-2xl border p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[360px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                  isActive
                    ? "bg-[#ffffff] border-[#111111] -translate-y-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.07)]"
                    : "bg-[#ffffff] border-[#e6e4dc] hover:border-[#888888]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-[#888888] mb-4">
                    <span className="font-semibold text-[#111111]">{pillar.number}</span>
                    <div className={`p-2 rounded-xl transition ${isActive ? "bg-[#111111] text-[#ffffff]" : "bg-[#f4f3ee] text-[#444444]"}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="font-serif-editorial text-3xl font-normal text-[#111111] group-hover:underline">
                    {pillar.title}
                  </h3>
                  <p className="font-mono text-xs text-[#777777] mt-1">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Custom Minimal Line-Art Diagram */}
                <div className="my-3 py-3 border-y border-[#f0eee6] flex items-center justify-center">
                  {pillar.renderIllustration(isActive)}
                </div>

                <p className="text-xs text-[#555555] leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
