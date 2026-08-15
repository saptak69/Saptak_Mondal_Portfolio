"use client"

import React, { useState, useMemo } from "react"
import { Search, X, Sparkles } from "lucide-react"
import SectionLabel from "./section-label"

interface BrainSearchProps {
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const brainResponses: Record<string, string> = {
  java: "System architecture, Spring Boot, REST APIs and backend work are a big part of my stack.",
  music: "Guitar, rock and progressive metal are the other half of my brain.",
  react: "I use React for expressive, performance-minded frontend systems.",
  ai: "MedFinder and ML experiments are where software meets curiosity.",
  guitar: "I play guitar and spend an unreasonable amount of time dialing in tones.",
}

const searchableDatabase = [
  { type: "Project", title: "MedFinder", description: "AI Healthcare diagnostic classification and medicine recommendation platform.", tags: ["AI", "Healthcare", "Python", "Java", "Scikit-Learn"], link: "#work" },
  { type: "Project", title: "PlotHole", description: "Cinematic movie review and discovery platform integrating TMDB REST APIs.", tags: ["React", "REST API", "Vercel", "Movies"], link: "#work" },
  { type: "Project", title: "Mangrove", description: "Luxury streetwear e-commerce platform built with Next.js and MongoDB.", tags: ["React", "Next.js", "Tailwind", "MongoDB", "E-Commerce"], link: "#work" },
  { type: "Project", title: "Nexus", description: "Low-latency real-time chat powered by WebSockets, Node.js, and Supabase.", tags: ["WebSockets", "React", "Node.js", "Express", "Chat"], link: "#work" },
  { type: "Project", title: "PennyWise", description: "Enterprise expense tracker with Java Spring Boot, PostgreSQL, and Recharts.", tags: ["Java", "Spring Boot", "PostgreSQL", "Finance", "JWT"], link: "#work" },
  { type: "Project", title: "Automated Java Pipeline", description: "CI/CD build and containerization automation using Maven and Docker.", tags: ["Java", "Maven", "Docker", "DevOps", "CI/CD"], link: "#work" },
  { type: "Skill", title: "Java & Spring Boot", description: "Enterprise backend development, Spring Security, JPA/Hibernate, and REST microservices.", tags: ["Java", "Spring", "Backend", "Microservices"], link: "#architecture" },
  { type: "Skill", title: "React 18 & Next.js 14", description: "Server components, App Router, responsive interfaces, and type-safe frontends.", tags: ["React", "Next.js", "TypeScript", "Frontend"], link: "#architecture" },
  { type: "Interest", title: "Progressive Rock & Metal", description: "Dream Theater, Avenged Sevenfold, technical guitar solos, and music theory.", tags: ["Music", "Guitar", "Dream Theater", "Prog Rock"], link: "#audio" },
  { type: "Education", title: "B.Tech in Computer Science", description: "Graduated from Guru Nanak Institute of Technology with rigorous foundation in DSA & Systems.", tags: ["Degree", "Education", "GNIT", "B.Tech", "Academics"], link: "#experience" },
]

export default function BrainSearch({ onPlaySound }: BrainSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const matchedInsight = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase().trim()
    for (const key of Object.keys(brainResponses)) {
      if (q.includes(key)) {
        return brainResponses[key]
      }
    }
    return null
  }, [searchQuery])

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchableDatabase.slice(0, 6)
    }
    const q = searchQuery.toLowerCase()
    return searchableDatabase.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    )
  }, [searchQuery])

  return (
    <section id="search" className="py-20 border-b border-[#e6e4dc] bg-[#ffffff]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="DISCOVERY MECHANISM • CLIENT-SIDE QUERY"
          title="What do you want to know?"
          subtitle="Search my brain across projects, backend architecture, progressive rock music, and core engineering philosophy."
        />

        <div className="space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                onPlaySound("tap")
              }}
              placeholder="Search my brain..."
              className="w-full rounded-2xl border border-[#e6e4dc] bg-[#fbfaf7] pl-11 pr-10 py-4 font-mono text-sm text-[#111111] placeholder:text-[#999999] shadow-sm focus:border-[#111111] focus:bg-[#ffffff] focus:outline-none transition-all"
              aria-label="Search portfolio knowledge database"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  onPlaySound("tap")
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#111111] p-1"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Filter Keyword Chips */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="text-[#888888] text-[11px]">Suggested keywords:</span>
            {["Java", "Music", "React", "AI", "Guitar"].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  onPlaySound("tap")
                  setSearchQuery(chip)
                }}
                className={`rounded-xl border px-3 py-1.5 transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] ${
                  searchQuery.toLowerCase() === chip.toLowerCase()
                    ? "bg-[#111111] text-[#ffffff] border-[#111111]"
                    : "bg-[#ffffff] border-[#e6e4dc] text-[#555555] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Direct Brain Insight Banner if keyword matched */}
          {matchedInsight && (
            <div className="rounded-2xl border border-[#111111] bg-[#111111] text-[#ffffff] p-5 space-y-1 font-mono text-xs animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-[#d9532f] font-semibold text-[10px] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>BRAIN INSIGHT MATCHED</span>
              </div>
              <p className="text-sm font-sans text-gray-200 pt-1 leading-relaxed">
                &ldquo;{matchedInsight}&rdquo;
              </p>
            </div>
          )}

          {/* Live Filtered Results Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {results.length > 0 ? (
              results.map((res, idx) => (
                <a
                  key={idx}
                  href={res.link}
                  onClick={() => onPlaySound("click")}
                  data-cursor="OPEN"
                  className="rounded-xl border border-[#e6e4dc] bg-[#ffffff] p-5 hover:border-[#111111] hover:shadow-md transition-all duration-200 block space-y-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] group"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#888888]">
                    <span className="uppercase font-semibold text-[#111111]">{res.type}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform text-[#111111]">Jump ↗</span>
                  </div>
                  <h4 className="font-serif-editorial text-xl font-normal text-[#111111] group-hover:underline">
                    {res.title}
                  </h4>
                  <p className="text-xs text-[#555555] font-sans line-clamp-2">
                    {res.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {res.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[#e6e4dc] bg-[#fbfaf7] px-1.5 py-0.5 font-mono text-[9px] text-[#666666]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full py-8 text-center font-mono text-xs text-[#888888]">
                No direct records found for &ldquo;{searchQuery}&rdquo;. Try querying Java, Music, React, AI, or Guitar.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
