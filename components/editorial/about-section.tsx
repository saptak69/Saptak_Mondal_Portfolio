"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Copy, Check, ArrowUpRight } from "lucide-react"
import { motion, useInView } from "motion/react"

interface AboutSectionProps {
  email: string
  githubUrl: string
  linkedinUrl: string
  copiedEmail: boolean
  onCopyEmail: () => void
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function AboutSection({
  email,
  githubUrl,
  linkedinUrl,
  copiedEmail,
  onCopyEmail,
  onPlaySound,
}: AboutSectionProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="py-20 bg-[#ffffff]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Large Editorial Motorcycle Lifestyle Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div
              className="group relative rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-3.5 shadow-sm hover:border-[#111111] transition-all duration-300 overflow-hidden"
              data-cursor="ZOOM"
            >
              <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f4f3ee]">
                <Image
                  src={imgError ? "/placeholder-user.jpg" : "/media/about/saptak-about.jpg"}
                  alt="Saptak Mondal — Philosophy Portrait"
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] grayscale contrast-[1.18] brightness-95"
                  onError={() => setImgError(true)}
                />
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[#888888] px-1">
                <span>PORTRAIT • MONOCHROME</span>
                <span className="text-[#0d9488] font-bold">SAPTAK MONDAL</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Strong Editorial Narrative Statement */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#0d9488] font-semibold">
                  ABOUT ME • PHILOSOPHY &amp; CRAFT
                </span>
              </div>

              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-tight">
                I enjoy building products that feel good to use, solving technical challenges, and exploring ideas beyond the usual boundaries of code.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 text-base text-[#555555] leading-relaxed font-sans pt-2"
            >
              <p>
                As a Computer Science Engineering graduate from Guru Nanak Institute of Technology (2022–2026), I treat software engineering as both an exact discipline and a creative craft. I thrive on building resilient backend services in Java &amp; Spring Boot, optimizing PostgreSQL query execution paths, and designing reactive web interfaces in React and Next.js that communicate with zero friction.
              </p>
              <p>
                Beyond engineering, my passion for progressive rock and heavy metal guitar (inspired by Dream Theater and John Petrucci) fuels my attention to detail, rhythmic precision, and structural composition. Whether tuning a complex WebSocket event loop or arranging odd-time guitar riffs (7/8, 11/8), I prioritize clean execution, maintainability, and end-to-end system ownership.
              </p>
            </motion.div>

            {/* Animated Key Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4"
            >
              <div className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-3.5 text-center hover:border-[#0d9488] transition-colors">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#111111] block">
                  <AnimatedCounter target={6} suffix="+" />
                </span>
                <span className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">Projects Shipped</span>
              </div>
              <div className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-3.5 text-center hover:border-[#ea580c] transition-colors">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#111111] block">
                  <AnimatedCounter target={5} suffix="+" />
                </span>
                <span className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">Tech Stacks</span>
              </div>
              <div className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-3.5 text-center hover:border-[#0d9488] transition-colors">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#111111] block">
                  <AnimatedCounter target={2026} duration={1500} />
                </span>
                <span className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">B.Tech Graduate</span>
              </div>
              <div className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-3.5 text-center hover:border-[#ea580c] transition-colors">
                <span className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#ea580c] block">
                  &lt;<AnimatedCounter target={15} />ms
                </span>
                <span className="font-mono text-[10px] text-[#888888] uppercase tracking-wider">Socket Latency</span>
              </div>
            </motion.div>

            {/* Quick Email & Social Links Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-[#111111]"
            >
              <button
                onClick={onCopyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-[#111111] bg-[#111111] px-4 py-2.5 text-[#ffffff] hover:bg-transparent hover:text-[#111111] transition duration-200"
              >
                {copiedEmail ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedEmail ? "Email Copied!" : "Copy Direct Email"}</span>
              </button>

              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => onPlaySound("click")}
                className="inline-flex items-center gap-1 hover:underline p-2 rounded"
              >
                <span>GitHub Archive</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => onPlaySound("click")}
                className="inline-flex items-center gap-1 hover:underline p-2 rounded"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Soft gradient section divider */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-[#e6e4dc] to-transparent" />
    </section>
  )
}
