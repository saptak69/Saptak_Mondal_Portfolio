"use client"

import React, { useState } from "react"
import SectionLabel from "./section-label"
import { motion } from "motion/react"

interface ProcessFlowProps {
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const steps = [
  {
    step: "01",
    phase: "Idea",
    tagline: "Problem Dissection",
    description: "Deconstructing core requirements to first principles. Stripping away unnecessary assumptions and defining what truly needs to exist.",
  },
  {
    step: "02",
    phase: "Research",
    tagline: "Architecture & Trade-offs",
    description: "Analyzing concurrency patterns, latency boundaries, database schemas, and selecting the most maintainable tech stack.",
  },
  {
    step: "03",
    phase: "Design",
    tagline: "Information & Flow",
    description: "Structuring clean API contracts, component states, and human-friendly interaction flows before writing application logic.",
  },
  {
    step: "04",
    phase: "Build",
    tagline: "Type-Safe Execution",
    description: "Crafting modular, clean, and type-safe code across Java/Spring Boot backends and React/Next.js frontends.",
  },
  {
    step: "05",
    phase: "Break",
    tagline: "Stress & Resilience",
    description: "Testing edge cases, simulating connection drops, concurrent WebSocket broadcasts, and verifying security boundaries.",
  },
  {
    step: "06",
    phase: "Improve",
    tagline: "Profiling & Polish",
    description: "Refining query efficiency, optimizing bundle footprint, polishing micro-interactions, and documenting architectural decisions.",
  },
]

export default function ProcessFlow({ onPlaySound }: ProcessFlowProps) {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <section id="process" className="py-20 bg-[#f7f6f1]/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
        <SectionLabel
          label="ENGINEERING WORKFLOW • PHILOSOPHY"
          title="How I Think & Build"
          subtitle="An intentional, iterative cycle transforming abstract requirements into reliable, resilient software architectures."
        />

        {/* Horizontal / Grid Workflow Stages */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              tabIndex={0}
              role="button"
              onFocus={() => {
                setActiveStep(idx)
                onPlaySound("tap")
              }}
              onMouseEnter={() => {
                setActiveStep(idx)
                onPlaySound("tap")
              }}
              className={`rounded-2xl border p-6 transition-all duration-300 space-y-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                activeStep === idx
                  ? "bg-[#ffffff] border-[#111111] shadow-md -translate-y-1"
                  : "bg-[#ffffff] border-[#e6e4dc] hover:border-[#bbbbbb]"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#888888] border-b border-[#f0eee6] pb-3">
                <span className="font-semibold text-[#0d9488]">STAGE {step.step}</span>
                <span className="text-[11px]">{step.tagline}</span>
              </div>

              <h3 className="font-serif-editorial text-3xl font-normal text-[#111111]">
                {step.phase}
              </h3>

              <p className="text-xs text-[#555555] leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        </motion.div>
      </div>

      {/* Soft gradient section divider */}
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-[#e6e4dc] to-transparent" />
    </section>
  )
}
