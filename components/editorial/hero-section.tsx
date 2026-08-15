"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowDownRight, Zap } from "lucide-react"

export default function HeroSection() {
  const [imgError, setImgError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="pt-10 pb-16 sm:pt-20 sm:pb-28 border-b border-[#e6e4dc] bg-[#fbfaf7] overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Stagger 1 (0ms): Status Indicator 'shipped.' */}
        <div
          className={`flex items-center gap-2 mb-4 sm:mb-6 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d9488] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d9488]" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#0d9488]">
            shipped.
          </span>
        </div>

        {/* Hero Grid Container */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headline & Bio Statement */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Stagger 2 (120ms): Main Headline */}
            <div
              className={`transition-all duration-800 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              <h1 className="font-serif-editorial text-3xl sm:text-5xl lg:text-[68px] font-normal leading-[1.1] sm:leading-[1.06] tracking-tight text-[#111111]">
                I build digital experiences where{" "}
                <span className="italic font-serif-editorial underline decoration-[#ea580c] decoration-2 underline-offset-4 sm:underline-offset-8 text-[#ea580c]">
                  engineering precision
                </span>{" "}
                meets{" "}
                <span className="italic font-serif-editorial text-[#0d9488]">
                  creative curiosity
                </span>.
              </h1>
            </div>

            {/* Stagger 4 (350ms): Bio Statement */}
            <div
              className={`transition-all duration-800 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <p className="text-sm sm:text-lg text-[#555555] leading-relaxed max-w-2xl font-sans pt-1 sm:pt-2">
                Full-stack software engineer &amp; B.Tech Computer Science graduate based in Kolkata. 
                Focused on scalable backend infrastructure, reactive component interfaces, real-time distributed WebSockets, and progressive tone design.
              </p>
            </div>

            {/* Stagger 4 (350ms): Telemetry Cards Grid */}
            <div
              className={`pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 font-mono text-xs transition-all duration-800 ease-out ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="p-3 sm:p-3.5 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#ea580c] transition">
                <div className="flex items-center justify-between text-[#888888] text-[9px] sm:text-[10px] uppercase mb-1">
                  <span>01 • FOCUS</span>
                  <ArrowDownRight className="h-3 w-3 text-[#ea580c]" />
                </div>
                <span className="text-[#111111] font-semibold block text-[10px] sm:text-[11px]">Systems &amp; Web</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#0d9488] transition">
                <div className="flex items-center justify-between text-[#888888] text-[9px] sm:text-[10px] uppercase mb-1">
                  <span>02 • LOCATION</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                </div>
                <span className="text-[#111111] font-semibold block text-[10px] sm:text-[11px]">Kolkata, IN</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#0d9488] transition">
                <div className="flex items-center justify-between text-[#888888] text-[9px] sm:text-[10px] uppercase mb-1">
                  <span>03 • STATUS</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                </div>
                <span className="text-[#0d9488] font-semibold block text-[10px] sm:text-[11px]">Open to Roles</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#ea580c] transition">
                <div className="flex items-center justify-between text-[#888888] text-[9px] sm:text-[10px] uppercase mb-1">
                  <span>04 • STACK</span>
                  <Zap className="h-3 w-3 text-[#ea580c]" />
                </div>
                <span className="text-[#111111] font-semibold block text-[10px] sm:text-[11px]">Java &bull; Next &bull; React</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Portrait Image Component */}
          <div
            className={`lg:col-span-5 transition-all duration-900 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "220ms" }}
          >
            <div
              className="group relative rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-3 shadow-sm hover:border-[#0d9488] hover:shadow-md transition-all duration-300 overflow-hidden"
              data-cursor="ZOOM"
            >
              {/* Outer Image Wrapper with overflow-hidden for smooth 1.02 scale zoom on hover */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f4f3ee]">
                <Image
                  src={imgError ? "/placeholder-user.jpg" : "/media/hero/saptak-portrait.jpg"}
                  alt="Saptak Mondal — Editorial Portrait"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  onError={() => setImgError(true)}
                />
              </div>

              {/* Editorial Caption Tag */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#888888] px-1">
                <span>PORTRAIT • ARCHIVE</span>
                <span className="text-[#0d9488] font-bold">SAPTAK MONDAL</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
