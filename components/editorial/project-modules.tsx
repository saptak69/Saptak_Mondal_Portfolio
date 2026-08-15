"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useInView } from "motion/react"
import { ArrowUpRight, ExternalLink } from "lucide-react"

export interface ProjectData {
  id: string
  number: string
  title: string
  tagline: string
  category: string
  year: string
  featured: boolean
  description: string
  technologies: string[]
  liveUrl: string
  repoUrl: string
  problem?: string
  solution?: string
  highlights?: string[]
  architecture?: string
  heroImage?: string
  readTime?: string
}

interface ProjectModulesProps {
  projects: ProjectData[]
  onSelectProject: (project: ProjectData) => void
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

// Environmental backdrops for each project mockup
const projectEnvironmentMap: Record<string, {
  bgGradient: string
  mockupBg: string
  badgeBg: string
  accentColor: string
  readTime: string
}> = {
  nexus: {
    bgGradient: "from-[#18181b] via-[#27272a] to-[#09090b]",
    mockupBg: "bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b]",
    badgeBg: "bg-white/10 text-white border-white/20",
    accentColor: "#111111",
    readTime: "Case Study • 15 mins read",
  },
  plothole: {
    bgGradient: "from-[#18181b] via-[#27272a] to-[#09090b]",
    mockupBg: "bg-gradient-to-br from-[#3f3f46]/70 via-[#18181b] to-[#09090b]",
    badgeBg: "bg-[#e4e4e7]/10 text-[#f4f4f5] border-[#e4e4e7]/20",
    accentColor: "#e4e4e7",
    readTime: "Case Study • 20 mins read",
  },
  pennywise: {
    bgGradient: "from-[#064e3b] via-[#047857] to-[#022c22]",
    mockupBg: "bg-gradient-to-br from-[#065f46]/80 via-[#047857]/50 to-[#022c22]",
    badgeBg: "bg-[#34d399]/10 text-[#34d399] border-[#34d399]/20",
    accentColor: "#10b981",
    readTime: "Case Study • 18 mins read",
  },
  mangrove: {
    bgGradient: "from-[#1c1917] via-[#292524] to-[#0c0a09]",
    mockupBg: "bg-gradient-to-br from-[#44403c]/70 via-[#292524] to-[#0c0a09]",
    badgeBg: "bg-[#f59e0b]/10 text-[#fbbf24] border-[#f59e0b]/20",
    accentColor: "#f59e0b",
    readTime: "Case Study • 22 mins read",
  },
  medfinder: {
    bgGradient: "from-[#18181b] via-[#27272a] to-[#09090b]",
    mockupBg: "bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b]",
    badgeBg: "bg-white/10 text-white border-white/20",
    accentColor: "#111111",
    readTime: "Case Study • 16 mins read",
  },
  "release-pipeline": {
    bgGradient: "from-[#18181b] via-[#27272a] to-[#09090b]",
    mockupBg: "bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b]",
    badgeBg: "bg-white/10 text-white border-white/20",
    accentColor: "#111111",
    readTime: "Case Study • 14 mins read",
  },
}

// Default images mapping
const projectImageMap: Record<string, string> = {
  nexus: "/media/projects/nexus/hero.webp",
  plothole: "/media/projects/plothole/hero.webp",
  pennywise: "/media/projects/pennywise/hero.webp",
  mangrove: "/media/projects/mangrove/hero.webp",
  medfinder: "/media/projects/medfinder/hero.webp",
  "release-pipeline": "/media/projects/release-pipeline/hero.webp",
}

// Individual Sticky Project Card Component
function EditorialProjectCard({
  project,
  index,
  totalProjects,
  onSelectProject,
  onPlaySound,
}: {
  project: ProjectData
  index: number
  totalProjects: number
  onSelectProject: (project: ProjectData) => void
  onPlaySound: (type: "blip" | "click" | "tap") => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { margin: "-20% 0px -20% 0px" })
  const [imgError, setImgError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const env = projectEnvironmentMap[project.id] || {
    bgGradient: "from-[#18181b] via-[#27272a] to-[#09090b]",
    mockupBg: "bg-gradient-to-br from-[#27272a] to-[#09090b]",
    badgeBg: "bg-white/10 text-white border-white/20",
    accentColor: "#111111",
    readTime: "Case Study • 15 mins read",
  }

  const primaryImage = projectImageMap[project.id] || `/media/projects/${project.id}/hero.webp`

  return (
    <div
      ref={cardRef}
      className="relative min-h-[90vh] sm:min-h-[130vh] w-full flex justify-center items-start pt-8 sm:pt-24 pb-12 sm:pb-20"
      style={{
        zIndex: index + 1,
      }}
    >
      {/* Sticky Card Wrapper */}
      <div className="sticky top-[60px] sm:top-[100px] w-full max-w-[1050px] px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative w-full bg-[#ffffff] rounded-[24px] sm:rounded-[36px] border border-[#111111]/12 shadow-[0_18px_50px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_24px_60px_rgba(0,0,0,0.1)] p-4 sm:p-10 lg:p-12"
        >
          {/* Top Environmental Screenshot Presentation Area */}
          <div
            onClick={() => {
              onPlaySound("click")
              onSelectProject(project)
            }}
            tabIndex={0}
            role="button"
            data-cursor="VIEW"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onPlaySound("click")
                onSelectProject(project)
              }
            }}
            className="relative w-full aspect-[16/9] sm:aspect-[16/8.5] rounded-[20px] sm:rounded-[26px] overflow-hidden cursor-pointer group/image transition-all duration-500"
          >
            {/* Environmental Backdrop Container */}
            <div className={`absolute inset-0 ${env.mockupBg} p-4 sm:p-8 lg:p-10 flex items-center justify-center transition-all duration-700`}>
              {/* Subtle Atmospheric Light Effect */}
              <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/40 pointer-events-none" />

              {/* Floating Product UI Screenshot Frame */}
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-black/40 flex items-center justify-center">
                
                {/* Reveal Animation for Screenshot: Semi-obscured blur -> full sharpness */}
                <motion.div
                  initial={{ opacity: 0.35, filter: "blur(10px)", scale: 1.04 }}
                  animate={
                    isInView
                      ? { opacity: 1, filter: "blur(0px)", scale: 1.0 }
                      : { opacity: 0.35, filter: "blur(8px)", scale: 1.04 }
                  }
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={imgError ? "/placeholder-user.jpg" : primaryImage}
                    alt={`${project.title} — Real Viewport Screenshot`}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1050px"
                    priority={index === 0}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-[1.02]"
                    onError={() => setImgError(true)}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Glassmorphic Overlay Hover Effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300" />
                </motion.div>

                {/* Subtle View Case Study Tag Overlay on Hover */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white font-mono text-xs border border-white/20 shadow-lg">
                    <span>Inspect System</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Card Content & Typography Area */}
          <div className="mt-8 sm:mt-10 lg:mt-12 space-y-4">
            
            {/* Sequential Reveal: Title, Metadata, Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0eee6] pb-4"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#0d9488]">
                  {project.number}
                </span>
                <span className="text-[#ccc]">&bull;</span>
                <span className="font-mono text-xs tracking-wider uppercase font-semibold text-[#666666]">
                  {project.category}
                </span>
                <span className="text-[#ccc]">&bull;</span>
                <span className="font-mono text-xs text-[#888888]">
                  {project.year}
                </span>
              </div>

              <span className="font-mono text-xs text-[#0d9488] font-medium">
                {env.readTime}
              </span>
            </motion.div>

            {/* Project Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.28 }}
            >
              <h3
                onClick={() => {
                  onPlaySound("click")
                  onSelectProject(project)
                }}
                className="font-serif-editorial text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#111111] leading-[1.1] tracking-tight cursor-pointer hover:underline decoration-[#ea580c] underline-offset-8 transition-colors"
              >
                {project.title}
              </h3>
            </motion.div>

            {/* Project Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <p className="text-base sm:text-lg lg:text-[20px] text-[#555555] leading-relaxed font-sans max-w-3xl pt-1">
                {project.description}
              </p>
            </motion.div>

            {/* Technologies Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 pt-2"
            >
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-[#e6e4dc] bg-[#f8f7f2] hover:border-[#0d9488]/40 hover:text-[#0d9488] transition-colors px-3 py-1 font-mono text-xs text-[#444444]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Bottom Minimalist Navigation Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="pt-6 border-t border-[#f0eee6] flex items-center justify-between font-mono text-xs sm:text-sm text-[#111111]"
            >
              <button
                onClick={() => {
                  onPlaySound("click")
                  onSelectProject(project)
                }}
                className="group/link inline-flex items-center gap-2 font-semibold text-[#111111] hover:text-[#ea580c] transition-colors focus-visible:outline-none"
              >
                <span className="underline decoration-[#ea580c]/40 group-hover/link:decoration-[#ea580c] underline-offset-4">
                  View Full Case Study
                </span>
                <ArrowUpRight className="h-4 w-4 text-[#ea580c] transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5" />
              </button>

              {project.liveUrl && project.liveUrl !== "#" ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onPlaySound("tap")}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
                >
                  <span>Live App</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-xs text-[#888888] bg-[#f4f3ee] px-2.5 py-1 rounded-md border border-[#e6e4dc]">
                  <span>Internal / Capstone</span>
                </span>
              )}
            </motion.div>

          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default function ProjectModules({
  projects,
  onSelectProject,
  onPlaySound,
}: ProjectModulesProps) {
  // Ensure we prioritize the main 4 core case study projects as specified
  const displayProjects = projects.length > 0 ? projects : []

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-[#fbfaf7] border-b border-[#e6e4dc] overflow-hidden"
    >
      {/* FULL-WIDTH EDITORIAL BACKGROUND LAYER */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft warm off-white paper editorial atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfaf7] via-[#f4f3ee] to-[#fbfaf7]" />
        
        {/* Soft warm radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(240,238,230,0.5),rgba(251,250,247,0))]" />

        {/* Low contrast ambient noise/film texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* TOP UNDERSTATED SECTION HEADING PILL */}
      <div className="relative z-10 pt-16 pb-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0d9488]/30 shadow-xs font-mono text-xs font-medium text-[#111111]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
          <span>Selected Projects</span>
        </motion.div>
      </div>

      {/* STICKY STACKED EDITORIAL CARDS CONTAINER */}
      <div className="relative z-10 w-full pb-32">
        {displayProjects.map((project, index) => (
          <EditorialProjectCard
            key={project.id || index}
            project={project}
            index={index}
            totalProjects={displayProjects.length}
            onSelectProject={onSelectProject}
            onPlaySound={onPlaySound}
          />
        ))}
      </div>

    </section>
  )
}
