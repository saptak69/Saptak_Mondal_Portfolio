"use client"

import React from "react"
import SectionLabel from "./section-label"

interface TimelineRow {
  role: string
  institution: string
  date: string
  details: string
}

const experienceRows: TimelineRow[] = [
  {
    role: "B.Tech in Computer Science & Engineering",
    institution: "Guru Nanak Institute of Technology",
    date: "2022 — 2026",
    details: "Graduated. Core studies in DSA, Java OOPs, DBMS, Operating Systems, Computer Networks, Software Engineering, and Machine Learning.",
  },
  {
    role: "Full-Stack & WebSockets Developer",
    institution: "Personal Engineering Systems",
    date: "2024 — Present",
    details: "Architecting low-latency real-time chat gateways, e-commerce storefronts, and expense analytics suites.",
  },
  {
    role: "Higher Secondary (Class 12)",
    institution: "Hindu School",
    date: "2020 — 2022",
    details: "Science stream with 75% score emphasizing Mathematics, Physics, Chemistry, and Computer Science.",
  },
  {
    role: "Secondary Examination (Class 10)",
    institution: "The Scottish Church Collegiate School",
    date: "2020",
    details: "Secondary education with distinction (88% score) in Mathematics and Physical Sciences.",
  },
]

export default function TimelineDiagram() {
  return (
    <section id="experience" className="py-20 border-b border-[#e6e4dc] bg-[#ffffff]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="EXPERIENCE & ACADEMICS • MINIMALIST TIMELINE"
          title="Experience & Systems Timeline"
          subtitle="A clean chronological table of formal computer science education, software engineering projects, and academic milestones."
        />

        {/* Minimalist Table View */}
        <div className="rounded-2xl border border-[#e6e4dc] bg-[#ffffff] overflow-hidden shadow-sm">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-[#fbfaf7] px-6 py-3.5 border-b border-[#e6e4dc] font-mono text-[11px] uppercase tracking-widest text-[#888888]">
            <div className="col-span-5 sm:col-span-5">ROLE / MILESTONE</div>
            <div className="col-span-4 sm:col-span-4">INSTITUTION / ORGANIZATION</div>
            <div className="col-span-3 sm:col-span-3 text-right">DATE</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#e6e4dc]">
            {experienceRows.map((row, idx) => (
              <div
                key={idx}
                className="group grid grid-cols-12 gap-4 px-6 py-5 items-center transition-colors duration-200 hover:bg-[#f7f6f1]/80 cursor-default"
              >
                <div className="col-span-5 sm:col-span-5 space-y-1">
                  <h3 className="font-serif-editorial text-lg sm:text-xl font-normal text-[#111111] group-hover:font-semibold transition-all">
                    {row.role}
                  </h3>
                  <p className="text-xs text-[#666666] font-sans line-clamp-1 hidden sm:block">
                    {row.details}
                  </p>
                </div>

                <div className="col-span-4 sm:col-span-4 font-mono text-xs text-[#555555]">
                  {row.institution}
                </div>

                <div className="col-span-3 sm:col-span-3 text-right font-mono text-xs text-[#888888] group-hover:text-[#111111] group-hover:translate-x-1 transition-all">
                  {row.date}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
