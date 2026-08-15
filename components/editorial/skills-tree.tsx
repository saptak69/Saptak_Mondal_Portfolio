"use client"

import React, { useState } from "react"
import SectionLabel from "./section-label"
import { GitBranch, Cpu, Database, Layout, Terminal, Network } from "lucide-react"

interface SkillsTreeProps {
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const skillsTreeData = [
  {
    category: "Languages & CS Core",
    icon: Terminal,
    description: "Foundational programming, algorithms, OOP, and data structures",
    items: ["Java", "Python", "JavaScript", "C", "SQL", "Scikit-Learn", "Machine Learning"],
  },
  {
    category: "Frontend & UI Engineering",
    icon: Layout,
    description: "Component architecture, responsive layouts, and reactive design",
    items: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Vite", "HTML5 & CSS3", "Framer Motion"],
  },
  {
    category: "Backend & Microservices",
    icon: Cpu,
    description: "Distributed systems, REST APIs, WebSockets, and security protocols",
    items: ["Java", "Spring Boot", "Spring Security", "Node.js", "Express.js", "WebSockets", "REST APIs"],
  },
  {
    category: "Databases & Storage",
    icon: Database,
    description: "Relational modeling, document stores, and in-memory caching",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Redis", "Mongoose"],
  },
  {
    category: "DevOps & Cloud Infra",
    icon: Network,
    description: "Containerization, automated build workflows, and system design",
    items: ["Docker", "CI/CD Pipelines", "Maven", "Git & GitHub", "Linux", "System Design"],
  },
]

export default function SkillsTree({ onPlaySound }: SkillsTreeProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [viewMode, setViewMode] = useState<"diagram" | "branches">("diagram")

  return (
    <section id="architecture" className="py-20 border-b border-[#e6e4dc]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="TECHNICAL LANDSCAPE • INFORMATION ARCHITECTURE"
          title="Technical Proficiencies & Systems"
          subtitle="A structured overview of core languages, distributed backend services, component frameworks, and infrastructure tools."
          align="between"
          actionSlot={
            <div className="flex items-center gap-1 font-mono text-xs border border-[#e6e4dc] bg-[#ffffff] p-1 rounded-xl">
              <button
                onClick={() => {
                  onPlaySound("tap")
                  setViewMode("diagram")
                }}
                className={`px-3 py-1 rounded-lg transition ${
                  viewMode === "diagram" ? "bg-[#111111] text-[#fbfaf7]" : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                Topology Map
              </button>
              <button
                onClick={() => {
                  onPlaySound("tap")
                  setViewMode("branches")
                }}
                className={`px-3 py-1 rounded-lg transition ${
                  viewMode === "branches" ? "bg-[#111111] text-[#fbfaf7]" : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                Branch Nodes
              </button>
            </div>
          }
        />

        {/* TOPOLOGY MAP DIAGRAM VIEW */}
        {viewMode === "diagram" ? (
          <div className="rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 sm:p-10 space-y-8 shadow-sm">
            
            {/* Root Node: Saptak -> Build */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#111111] bg-[#111111] px-5 py-2 font-mono text-xs font-semibold text-[#fbfaf7]">
                <GitBranch className="h-4 w-4 text-[#d9532f]" />
                <span>SAPTAK MONDAL</span>
                <span className="text-gray-400">➔</span>
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <span className="font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                ROOT SYSTEM MAP &bull; B.TECH CSE &bull; FULL-STACK
              </span>
            </div>

            {/* Connecting Lines Graphic */}
            <div className="hidden md:block relative h-6 w-full max-w-4xl mx-auto">
              <svg className="w-full h-full text-[#cccccc]" viewBox="0 0 800 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <line x1="400" y1="0" x2="400" y2="12" />
                <line x1="80" y1="12" x2="720" y2="12" />
                <line x1="80" y1="12" x2="80" y2="24" />
                <line x1="240" y1="12" x2="240" y2="24" />
                <line x1="400" y1="12" x2="400" y2="24" />
                <line x1="560" y1="12" x2="560" y2="24" />
                <line x1="720" y1="12" x2="720" y2="24" />
              </svg>
            </div>

            {/* 5 Architecture Layer Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {skillsTreeData.map((branch, idx) => {
                const Icon = branch.icon
                return (
                  <div
                    key={branch.category}
                    onClick={() => {
                      onPlaySound("tap")
                      setActiveCategory(idx)
                      setViewMode("branches")
                    }}
                    className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-4 space-y-3 cursor-pointer hover:border-[#111111] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#888888]">
                      <span>0{idx + 1}</span>
                      <Icon className="h-4 w-4 text-[#111111] group-hover:scale-110 transition-transform" />
                    </div>

                    <h4 className="font-mono text-xs font-semibold text-[#111111] border-b border-[#e6e4dc] pb-2">
                      {branch.category}
                    </h4>

                    <div className="space-y-1.5 pt-1">
                      {branch.items.map((item) => (
                        <div key={item} className="flex items-center gap-1.5 font-mono text-[11px] text-[#444444]">
                          <span className="h-1 w-1 rounded-full bg-[#111111]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pt-4 border-t border-[#f0eee6] flex items-center justify-between font-mono text-[11px] text-[#888888]">
              <span>Information Architecture: Verified Production Stack</span>
              <span className="text-[#111111]">Click any node to inspect details</span>
            </div>
          </div>
        ) : (
          /* BRANCH SELECTOR VIEW */
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-2">
              {skillsTreeData.map((branch, idx) => (
                <button
                  key={branch.category}
                  onClick={() => {
                    onPlaySound("tap")
                    setActiveCategory(idx)
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                    activeCategory === idx
                      ? "bg-[#ffffff] border-[#111111] shadow-sm text-[#111111]"
                      : "bg-[#ffffff]/60 border-[#e6e4dc] text-[#666666] hover:bg-[#ffffff] hover:text-[#111111]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-1">
                    <span className="font-semibold">0{idx + 1} &bull; {branch.category}</span>
                    <span className="text-[10px] text-[#888888]">{branch.items.length} Techs</span>
                  </div>
                  <p className="text-xs text-[#777777] font-sans">
                    {branch.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 sm:p-8 space-y-6">
                
                <div className="border-b border-[#f0eee6] pb-4 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#0d9488] font-semibold">
                    BRANCH • {skillsTreeData[activeCategory].category.toUpperCase()}
                  </span>
                  <span className="text-[#111111] font-semibold">VERIFIED PROFICIENCY</span>
                </div>

                <p className="text-sm text-[#555555] font-sans">
                  {skillsTreeData[activeCategory].description}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {skillsTreeData[activeCategory].items.map((tech) => (
                    <div
                      key={tech}
                      className="rounded-lg border border-[#e6e4dc] bg-[#fbfaf7] p-3.5 flex items-center justify-between hover:border-[#111111] transition-colors"
                    >
                      <span className="font-mono text-xs text-[#111111] font-medium">
                        {tech}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#f0eee6] flex items-center justify-between font-mono text-[11px] text-[#888888]">
                  <span>Architecture Layer: Production Standard</span>
                  <span>100% Type-Safe &amp; Documented</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
