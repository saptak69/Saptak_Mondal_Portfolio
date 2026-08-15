"use client"

import React, { useState } from "react"
import { Toaster, toast } from "sonner"
import CustomCursor from "./editorial/cursor"
import HeaderNav from "./editorial/header-nav"
import HeroSection from "./editorial/hero-section"
import IdentityCards from "./editorial/identity-cards"
import AboutSection from "./editorial/about-section"
import ProcessFlow from "./editorial/process-flow"
import ProjectModules, { ProjectData } from "./editorial/project-modules"
import ProjectModal from "./editorial/project-modal"
import SandboxSection from "./editorial/sandbox-section"
import BrainSearch from "./editorial/brain-search"
import SkillsTree from "./editorial/skills-tree"
import PlaygroundCollage from "./editorial/playground-collage"
import TimelineDiagram from "./editorial/timeline-diagram"
import AudioDeck from "./editorial/audio-deck"
import ContactSection from "./editorial/contact-section"
import FooterEditorial from "./editorial/footer-editorial"

// Subtle Web Audio Haptic Blip Synthesizer
let sharedAudioCtx: AudioContext | null = null

const playSubtleSound = (type: "blip" | "click" | "tap", enabled: boolean = true) => {
  if (!enabled || typeof window === "undefined") return
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx()
    }
    
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {})
      return
    }

    const ctx = sharedAudioCtx
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    
    if (type === "blip") {
      osc.type = "sine"
      osc.frequency.setValueAtTime(650, ctx.currentTime)
      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    } else if (type === "click") {
      osc.type = "triangle"
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } else if (type === "tap") {
      osc.type = "sine"
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.025)
    }
  } catch (e) {
    // audio context blocked or muted
  }
}

// Default Projects Data (Fallback & Seeded)
const defaultProjects: ProjectData[] = [
  {
    id: "mangrove",
    number: "01",
    title: "Mangrove",
    tagline: "Luxury Streetwear E-Commerce Platform",
    category: "Full-Stack Web App",
    year: "2024",
    featured: true,
    description:
      "A premium fashion brand streetwear e-commerce platform featuring high-fidelity animations, catalog filtering, responsive design, cart state synchronization, and render cloud deployment.",
    technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Render"],
    liveUrl: "https://mangrove-9jdw.onrender.com/",
    repoUrl: "https://github.com/saptak69",
    problem: "Traditional streetwear store templates often lack high-performance fluid animations, instant faceted filtering, and persistent cart synchronization without heavy client overhead.",
    solution: "Engineered an end-to-end e-commerce experience using Next.js App Router for server-rendered catalog views, optimized MongoDB aggregation pipelines for instant filtering, and responsive cart state.",
    highlights: [
      "Dynamic client/server rendered catalog with responsive multi-category filtering",
      "Optimistic cart state management with persistent session synchronization",
      "Mobile-first responsive layout with custom editorial typography and micro-interactions",
    ],
    architecture: "Next.js SSR ➔ REST API Layer ➔ MongoDB Atlas Database ➔ Render Cloud Platform",
  },
  {
    id: "plothole",
    number: "02",
    title: "PlotHole",
    tagline: "Cinematic Movie Discovery & Review Archive",
    category: "Frontend & REST APIs",
    year: "2024",
    featured: false,
    description:
      "A modern movie review and discovery platform integrating third-party TMDB database REST APIs, debounced search, genre exploration, and responsive glassmorphic interfaces.",
    technologies: ["React", "Tailwind CSS", "REST API", "Vercel", "JavaScript"],
    liveUrl: "https://plot-hole.vercel.app/",
    repoUrl: "https://github.com/saptak69",
    problem: "Discovering cinematic titles across vast public movie databases often suffers from sluggish search UX, uninspired layouts, and lack of visual hierarchy.",
    solution: "Developed a responsive movie discovery hub connecting with TMDB REST endpoints, featuring debounced instant queries, detail modals, and curated genre carousels.",
    highlights: [
      "Instant debounced search across thousands of cinematic titles with zero UI blocking",
      "Rich editorial detail sheets displaying cast, trailer embeds, and community ratings",
      "Edge caching strategies optimizing third-party REST API response times",
    ],
    architecture: "Client SPA (React) ➔ TMDB REST API ➔ Vercel Global Edge CDN",
  },
  {
    id: "pennywise",
    number: "03",
    title: "PennyWise",
    tagline: "Enterprise Expense Tracker & Financial Analytics",
    category: "Backend & Financial Suite",
    year: "2024",
    featured: false,
    description:
      "A financial expense tracker and budget management dashboard featuring detailed analytics, interactive Recharts graphs, and a Java Spring Boot REST backend with PostgreSQL.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "JWT", "REST API", "Recharts"],
    liveUrl: "https://pennywise-m0y1zivhb-saptaks-projects.vercel.app/login",
    repoUrl: "https://github.com/saptak69",
    problem: "Personal finance tools frequently lack strong transactional consistency, secure role-based access, and transparent breakdown charts.",
    solution: "Built a robust Java Spring Boot REST service with Spring Security JWT tokens, relational PostgreSQL database schema with JPA/Hibernate, and responsive Recharts dashboards.",
    highlights: [
      "Stateless Spring Security JWT authentication and role-based route guards",
      "Optimized relational PostgreSQL schema with index tuning for historical query speed",
      "Interactive monthly cashflow and category distribution analytics via Recharts",
    ],
    architecture: "React Dashboard ➔ Spring Boot REST ➔ Spring Security JWT ➔ PostgreSQL Database",
  },
  {
    id: "nexus",
    number: "04",
    title: "Nexus",
    tagline: "Low-Latency WebSocket Real-Time Chat Engine",
    category: "Real-Time Systems",
    year: "2024",
    featured: false,
    description:
      "A low-latency real-time collaborative chat application powered by WebSockets, featuring sub-15ms message delivery, live user presence heartbeats, and Supabase authentication.",
    technologies: ["React", "Node.js", "Express.js", "WebSockets", "Supabase", "Vercel"],
    liveUrl: "https://nexus-chat-iota-dun.vercel.app/",
    repoUrl: "https://github.com/saptak69",
    problem: "Building reliable multi-channel messaging requires low-latency event loops, resilient reconnect strategies, and stateless token verification.",
    solution: "Architected a custom WebSocket gateway with Node.js/Express handling broadcast channels and presence heartbeats, paired with Supabase for JWT session persistence.",
    highlights: [
      "Sub-15ms WebSocket event delivery across public channels and private rooms",
      "Live presence heartbeat broadcasting typing indicators and online state",
      "Stateless token authentication integrating Supabase auth with WebSocket handshakes",
    ],
    architecture: "React Client ➔ WebSocket Gateway ➔ Node.js Event Loop ➔ Supabase Auth",
  },
  {
    id: "medfinder",
    number: "05",
    title: "MedFinder",
    tagline: "Predictive Healthcare Diagnostic Capstone Engine",
    category: "AI / Healthcare",
    year: "2024",
    featured: false,
    description:
      "A medical-tech diagnostic platform implementing predictive classification algorithms for early disease detection, clinical symptom matrix parsing, and automated medicine recommendations.",
    technologies: ["Python", "Scikit-Learn", "Java", "REST API", "Healthcare AI"],
    liveUrl: "#",
    repoUrl: "https://github.com/saptak69",
    problem: "Early medical diagnosis often faces delays in clinical symptom parsing and structured symptom-to-medicine correlation.",
    solution: "Trained Random Forest and multi-class classification models on clinical datasets, wrapped with a REST API communicating with a Java application interface.",
    highlights: [
      "Multi-class disease classification engine trained on clinical symptom matrices",
      "Automated medicine and precautionary regimen recommendation pipeline",
      "RESTful API bridging the Python inference runtime with front-facing interfaces",
    ],
    architecture: "Clinical Telemetry ➔ Python ML Engine (Scikit-Learn) ➔ REST API ➔ Diagnostic Output",
  },
  {
    id: "release-pipeline",
    number: "06",
    title: "Automated Java Release Pipeline",
    tagline: "Containerized CI/CD & Build Automation Workflow",
    category: "DevOps & Cloud Infra",
    year: "2024",
    featured: false,
    description:
      "A fully automated build and release pipeline for Java applications implementing DevOps workflows, CI/CD concepts, Maven automation, and automated containerization.",
    technologies: ["Java", "Maven", "Git", "CI/CD", "Docker", "DevOps"],
    liveUrl: "#",
    repoUrl: "https://github.com/saptak69",
    problem: "Manual Java build, test, and container packaging cycles introduce human errors and slow down production release cadence.",
    solution: "Created an automated Maven build lifecycle with automated JUnit test execution, multi-stage Docker builds, and GitOps trigger hooks.",
    highlights: [
      "Automated Maven lifecycle orchestration (compile, test, package, verify)",
      "Multi-stage Docker builds reducing production container image footprint by 65%",
      "Continuous integration verification executing automated test suites on every commit",
    ],
    architecture: "Git Commit ➔ Maven Build & JUnit Test ➔ Multi-Stage Dockerfile ➔ Registry Container",
  },
]

const getProjectSlug = (title: string): string => {
  if (!title) return "unknown"
  const lower = title.toLowerCase()
  if (lower.includes("mangrove")) return "mangrove"
  if (lower.includes("plothole") || lower.includes("plot-hole")) return "plothole"
  if (lower.includes("pennywise") || lower.includes("penny-wise")) return "pennywise"
  if (lower.includes("nexus")) return "nexus"
  if (lower.includes("medfinder") || lower.includes("disease") || lower.includes("medicine")) return "medfinder"
  if (lower.includes("pipeline") || lower.includes("devops") || lower.includes("release")) return "release-pipeline"
  return lower.replace(/[^a-z0-9]/g, "")
}

export default function PortfolioEditorial({ initialData }: { initialData?: any }) {
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const rawProjects = initialData?.projects && initialData.projects.length > 0
    ? initialData.projects.map((p: any) => {
        const slugId = getProjectSlug(p.title)
        const matchedDefault = defaultProjects.find((dp) => dp.id === slugId)
        return {
          id: slugId,
          number: "00",
          title: matchedDefault?.title || p.title,
          tagline: matchedDefault?.tagline || "Engineered Full-Stack System",
          category: matchedDefault?.category || "Full-Stack System",
          year: matchedDefault?.year || "2024",
          featured: slugId === "mangrove",
          description: matchedDefault?.description || p.description,
          technologies: matchedDefault?.technologies || p.technologies || [],
          liveUrl: matchedDefault?.liveUrl || p.liveUrl || "#",
          repoUrl: matchedDefault?.repoUrl || p.repoUrl || "#",
          problem: matchedDefault?.problem || "Solving system performance, latency, and data consistency challenges.",
          solution: matchedDefault?.solution || "Architected an end-to-end full-stack solution balancing performance with UX.",
          highlights: matchedDefault?.highlights || ["Production-ready architecture", "Optimized database schemas", "Type-safe codebase"],
          architecture: matchedDefault?.architecture || "Client Interface ➔ API Gateway ➔ Database ➔ Deployment Platform",
        }
      })
    : defaultProjects

  const desiredOrder = ["mangrove", "plothole", "pennywise", "nexus", "medfinder", "release-pipeline"]

  const sortedProjects = [...rawProjects].sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.id)
    const indexB = desiredOrder.indexOf(b.id)
    return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB)
  })

  const projects: ProjectData[] = sortedProjects.map((p, idx) => ({
    ...p,
    number: `0${idx + 1}`,
  }))

  const handlePlaySound = (type: "blip" | "click" | "tap") => {
    playSubtleSound(type, soundEnabled)
  }

  const handleCopyEmail = () => {
    handlePlaySound("tap")
    const email = "saptakmondal.official@gmail.com"
    navigator.clipboard.writeText(email)
    setCopiedEmail(true)
    toast.success(`Email copied: ${email}`)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleNextProjectModal = () => {
    if (!activeModalProject) return
    handlePlaySound("tap")
    const currentIndex = projects.findIndex((p) => p.id === activeModalProject.id)
    const nextIndex = (currentIndex + 1) % projects.length
    setActiveModalProject(projects[nextIndex])
  }

  const handlePrevProjectModal = () => {
    if (!activeModalProject) return
    handlePlaySound("tap")
    const currentIndex = projects.findIndex((p) => p.id === activeModalProject.id)
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length
    setActiveModalProject(projects[prevIndex])
  }

  return (
    <>
      <Toaster theme="light" position="bottom-right" closeButton />
      <CustomCursor />

      <div className="min-h-screen bg-[#fbfaf7] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#fbfaf7] relative">
        
        {/* Navigation */}
        <HeaderNav
          soundEnabled={soundEnabled}
          onToggleSound={() => {
            const next = !soundEnabled
            setSoundEnabled(next)
            if (next) playSubtleSound("blip", true)
          }}
          onPlaySound={handlePlaySound}
        />

        <main>
          {/* Hero Section with Verified Hero Portrait Image */}
          <HeroSection />

          {/* Core Pillars Media Cards (System Architect, Full-Stack Developer, Creative Developer) */}
          <IdentityCards onPlaySound={handlePlaySound} />

          {/* About / Personal Narrative with Lifestyle Portrait */}
          <AboutSection
            email="saptakmondal.official@gmail.com"
            githubUrl="https://github.com/saptak69"
            linkedinUrl="https://www.linkedin.com/in/saptak-mondal-448b8b40b"
            copiedEmail={copiedEmail}
            onCopyEmail={handleCopyEmail}
            onPlaySound={handlePlaySound}
          />

          {/* "How I Think / How I Work" Process Flow */}
          <ProcessFlow onPlaySound={handlePlaySound} />

          {/* Projects Showcase Modules */}
          <ProjectModules
            projects={projects}
            onSelectProject={(project) => setActiveModalProject(project)}
            onPlaySound={handlePlaySound}
          />

          {/* Sandbox / Explorations Experimental Sketchbook */}
          <SandboxSection onPlaySound={handlePlaySound} />

          {/* Search My Brain Discovery Feature */}
          <BrainSearch onPlaySound={handlePlaySound} />

          {/* Information Architecture & Skills Tree */}
          <SkillsTree onPlaySound={handlePlaySound} />

          {/* Playground & Curiosities Collage */}
          <PlaygroundCollage />

          {/* Minimalist Experience & Academics Table Timeline */}
          <TimelineDiagram />

          {/* Progressive Rock & Metal Audio Console */}
          <AudioDeck onPlaySound={handlePlaySound} />

          {/* Contact / Dispatch */}
          <ContactSection
            email="saptakmondal.official@gmail.com"
            linkedinUrl="https://www.linkedin.com/in/saptak-mondal-448b8b40b"
            githubUrl="https://github.com/saptak69"
            copiedEmail={copiedEmail}
            onCopyEmail={handleCopyEmail}
            onPlaySound={handlePlaySound}
          />
        </main>

        {/* Footer */}
        <FooterEditorial />

        {/* In-Depth Case Study & Lightbox Gallery Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onNext={handleNextProjectModal}
          onPrev={handlePrevProjectModal}
        />

      </div>
    </>
  )
}
