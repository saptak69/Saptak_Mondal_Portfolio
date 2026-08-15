"use client"

import React, { useState, useEffect, useTransition, useMemo } from "react"
import { createContactMessage } from "@/lib/actions"
import { Toaster, toast } from "sonner"
import {
  Terminal,
  Code2,
  Cpu,
  Database,
  Server,
  Layers,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Search,
  Command,
  ArrowRight,
  GraduationCap,
  Award,
  Disc,
  Send,
  Radio,
  Sliders,
  Activity,
  CheckCircle2,
  Lock,
  ChevronRight,
  X,
  FileCode,
  Music,
  Workflow,
  ShieldCheck,
  Cloud,
  Zap,
  Globe,
  CornerDownLeft,
} from "lucide-react"

// Sound synthesizer using Web Audio API
const playHapticSound = (
  type: "blip" | "click" | "success" | "toggle" | "switch",
  enabled: boolean = true
) => {
  if (!enabled || typeof window === "undefined") return
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    if (type === "blip") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.03)
    } else if (type === "click") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } else if (type === "success") {
      const notes = [440, 554.37, 659.25, 880]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "sine"
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04)
        gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.04)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx + 1) * 0.04)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.04)
        osc.stop(ctx.currentTime + (idx + 1) * 0.04)
      })
    } else if (type === "toggle") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(600, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } else if (type === "switch") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(350, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.06)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.06)
    }
  } catch (e) {
    // audio context muted or blocked
  }
}

// Portfolio baseline fallback structure
const defaultData = {
  name: "Saptak Mondal",
  title: "Full-Stack Software Engineer & Distributed Systems Architect",
  location: "Kolkata, West Bengal, IN",
  status: "Available for Full-Time Roles",
  about:
    "B.Tech Computer Science graduate specializing in scalable backend architectures, high-performance distributed systems, real-time WebSockets, and modern Next.js/React applications. Driven by rapid learning, end-to-end ownership, and building software that balances elegant aesthetics with rock-solid reliability.",
  contact: {
    email: "saptakmondal.official@gmail.com",
    linkedin: "https://www.linkedin.com/in/saptak-mondal-448b8b40b",
    github: "https://github.com/saptak69",
    instagram: "https://www.instagram.com/saptak_._/",
  },
  skillsByCategory: [
    {
      category: "Backend & Microservices",
      icon: Server,
      skills: ["Java", "Spring Boot", "Spring Security", "REST APIs", "Microservices", "Node.js", "Express.js"],
    },
    {
      category: "Frontend & Reactive UI",
      icon: Layers,
      skills: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Vite", "HTML5", "CSS3", "Framer Motion"],
    },
    {
      category: "Databases & Caching",
      icon: Database,
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Redis", "Mongoose"],
    },
    {
      category: "DevOps & Cloud Infra",
      icon: Cloud,
      skills: ["Docker", "CI/CD Pipelines", "Maven", "Git", "GitHub", "Linux", "System Design"],
    },
    {
      category: "Languages & AI Capstone",
      icon: Code2,
      skills: ["Java", "JavaScript", "Python", "C", "SQL", "Scikit-Learn", "Machine Learning"],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Guru Nanak Institute of Technology",
      period: "2022 - 2026",
      status: "Graduated",
      badge: "Major Degree",
      details:
        "Rigorous study in Data Structures & Algorithms, Database Management Systems, OOPs, Operating Systems, Computer Networks, Software Engineering, and AI/ML.",
      coursework: ["DSA", "DBMS", "OOPs in Java", "Computer Networks", "Operating Systems", "Software Architecture"],
    },
    {
      degree: "Higher Secondary (Class 12)",
      institution: "Hindu School",
      period: "2020 - 2022",
      status: "75% Score",
      badge: "Science Stream",
      details: "Higher Secondary curriculum emphasizing Mathematics, Physics, Chemistry, and Computer Science.",
      coursework: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
    },
    {
      degree: "Secondary Examination (Class 10)",
      institution: "The Scottish Church Collegiate School",
      period: "2020",
      status: "88% Score",
      badge: "Distinction",
      details: "Secondary foundation with academic distinction across Mathematics and Physical Sciences.",
      coursework: ["Mathematics", "Physical Sciences", "Life Sciences", "English"],
    },
  ],
  projects: [
    {
      id: "mangrove",
      title: "Mangrove",
      category: "Full-Stack Web",
      tagline: "High-Fidelity Streetwear E-Commerce Platform",
      description:
        "A luxury streetwear fashion platform built with Next.js and MongoDB, featuring dynamic catalog filtering, cart state management, fluid micro-interactions, and render cloud deployment.",
      technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Render"],
      liveUrl: "https://mangrove-9jdw.onrender.com/",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Dynamic client/server rendered product catalog with faceted filter trees",
        "Persistent cart state synchronization with optimistic UI updates",
        "High-performance image delivery and mobile-first responsive layout",
      ],
      architecture: "Next.js SSR Frontend ➔ REST API Layer ➔ MongoDB Atlas ➔ Render Hosting",
    },
    {
      id: "plothole",
      title: "PlotHole",
      category: "Full-Stack Web",
      tagline: "Cinematic Movie Discovery & Review Platform",
      description:
        "A modern movie discovery and review platform integrating third-party TMDB REST APIs with responsive search, genre filtering, and a sleek dark glassmorphic UI.",
      technologies: ["React", "Tailwind CSS", "REST API", "Vercel", "JavaScript"],
      liveUrl: "https://plot-hole.vercel.app/",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Instant debounced search across thousands of cinematic titles",
        "Rich movie detail modals with cast, ratings, trailers, and reviews",
        "Edge-cached API proxy with graceful offline fallbacks",
      ],
      architecture: "Client SPA (React) ➔ TMDB REST API ➔ Vercel Global Edge CDN",
    },
    {
      id: "nexus",
      title: "Nexus",
      category: "Real-Time Systems",
      tagline: "Low-Latency WebSocket Collaborative Chat",
      description:
        "A high-throughput, low-latency real-time chat application powered by WebSockets, featuring bidirectional message delivery, live user presence indicators, and Supabase auth.",
      technologies: ["React", "Node.js", "Express.js", "WebSockets", "Supabase", "Vercel"],
      liveUrl: "https://nexus-chat-iota-dun.vercel.app/",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Sub-15ms WebSocket event loop handling broadcast channels & private rooms",
        "Active user presence heartbeat and dynamic typing status broadcast",
        "JWT-based session authentication with Supabase backend",
      ],
      architecture: "React Client ➔ WebSocket Gateway ➔ Node/Express Event Broker ➔ Supabase Auth",
    },
    {
      id: "pennywise",
      title: "PennyWise",
      category: "Backend & Finance",
      tagline: "Enterprise Financial Expense & Analytics Suite",
      description:
        "A secure financial tracker and expense analytics dashboard featuring multi-role authentication, interactive Recharts visualizations, and a robust Java Spring Boot REST backend with PostgreSQL.",
      technologies: ["React", "Spring Boot", "PostgreSQL", "JWT", "REST API", "Recharts"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Spring Security JWT authentication with stateless session verification",
        "Relational schema design with PostgreSQL and JPA/Hibernate query optimization",
        "Interactive budget distribution charts and historical spending velocity metrics",
      ],
      architecture: "React Dashboard ➔ Spring Boot REST ➔ Spring Security JWT ➔ PostgreSQL Database",
    },
    {
      id: "disease-pred",
      title: "ML Disease Prediction",
      category: "AI & Capstone",
      tagline: "Predictive Healthcare Analytics & Diagnostic Engine",
      description:
        "Final-year engineering capstone project executing machine learning classification algorithms for early disease detection, clinical symptom parsing, and automated medicine recommendations.",
      technologies: ["Python", "Machine Learning", "Java", "REST API", "Healthcare AI"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Multi-class disease classification model trained on comprehensive symptom datasets",
        "Automated medicine and precautionary regimen recommendation pipeline",
        "RESTful API bridging Python predictive model with Java application layer",
      ],
      architecture: "Client Telemetry ➔ Python ML Engine (Scikit-Learn) ➔ REST API ➔ Diagnostic Output",
    },
    {
      id: "release-pipeline",
      title: "Automated Java Release Pipeline",
      category: "DevOps & Cloud Infra",
      tagline: "Containerized CI/CD & Build Automation Workflow",
      description:
        "A production-ready build and release automation pipeline for Java applications implementing automated Maven builds, unit testing suites, Docker containerization, and GitOps triggers.",
      technologies: ["Java", "Maven", "Git", "CI/CD", "Docker", "DevOps"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      highlights: [
        "Automated Maven lifecycle orchestration (compile, test, package, verify)",
        "Multi-stage Docker builds minimizing production image footprint by 65%",
        "Continuous integration workflows executing automated test assertions on every commit",
      ],
      architecture: "Git Commit ➔ Maven Build & JUnit Test ➔ Multi-Stage Dockerfile ➔ Registry Container",
    },
  ],
}

const tracks = [
  {
    id: "metropolis",
    title: "Metropolis Pt. 2: Scenes from a Memory",
    artist: "Dream Theater",
    duration: "1:17:16",
    genre: "Progressive Metal",
    description: "A landmark progressive metal concept album featuring complex time signatures, virtuosic guitar solos, and intricate storytelling.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_no4h8w4dhKZtqgM7ssWeBPI07BncIIZCE&si=w3O7ouUjsblybqz2",
    coverUrl: "/metropolis_cover.jpg",
  },
  {
    id: "images-words",
    title: "Pull Me Under (Images & Words)",
    artist: "Dream Theater",
    duration: "57:04",
    genre: "Progressive Rock / Metal",
    description: "The seminal album that defined 90s progressive metal with John Petrucci's signature technical phrasing and soaring melodies.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_l1xRaVChi3KmhOWg6rn4ADC1NJe6FYf3o&si=gkpgQ5jRkmEIendf",
    coverUrl: "/images_words_cover.jpg",
  },
  {
    id: "hail-to-the-king",
    title: "Hail to the King",
    artist: "Avenged Sevenfold",
    duration: "53:11",
    genre: "Heavy Metal",
    description: "A masterclass in modern heavy metal riffing, thunderous rhythm section orchestration, and soaring dual guitar harmonies.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_ng4ywPIdy9khiwH-oEqvCisM6YwZqZhcQ&si=SZmCmTRKLFBCmAS7",
    coverUrl: "/hail_king_cover.jpg",
  },
]

const rotatingRoles = [
  "Full-Stack Software Engineer",
  "Distributed Backend Architect (Java / Spring)",
  "Modern React 18 & Next.js 14 Developer",
  "Real-Time WebSockets & Systems Builder",
  "DevOps & Containerized CI/CD Engineer",
]

export default function PortfolioStudio({ initialData }: { initialData?: any }) {
  const [data] = useState(() => {
    if (!initialData) return defaultData
    return {
      ...defaultData,
      projects: initialData.projects && initialData.projects.length > 0 ? initialData.projects : defaultData.projects,
      education: initialData.education && initialData.education.length > 0 ? initialData.education : defaultData.education,
    }
  })

  // Theme & Audio Controls
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeProjectModal, setActiveProjectModal] = useState<any | null>(null)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [cmdSearch, setCmdSearch] = useState("")

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playbackSeconds, setPlaybackSeconds] = useState(0)
  const [volume, setVolume] = useState(80)

  // Interactive Live Demos / Blueprints State
  const [nexusTestMsg, setNexusTestMsg] = useState("")
  const [nexusLogs, setNexusLogs] = useState<Array<{ text: string; time: string; ping: number }>>([
    { text: "WebSocket Handshake Established [ws://nexus.local:8080]", time: "19:04:10", ping: 12 },
    { text: "Heartbeat ACK received from channel #general", time: "19:04:14", ping: 14 },
  ])
  const [mlSymptom, setMlSymptom] = useState<string>("Fatigue & Joint Pain")
  const [ciCdStep, setCiCdStep] = useState<number>(3)

  // Contact Form State
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubject, setFormSubject] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Skills Search Filter
  const [skillQuery, setSkillQuery] = useState("")

  // Rotating roles timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRoleIndex((prev) => (prev + 1) % rotatingRoles.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandPaletteOpen((prev) => {
          const next = !prev
          if (next) playHapticSound("blip", soundEnabled)
          return next
        })
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
      if (e.key === "Escape" && activeProjectModal) {
        setActiveProjectModal(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [commandPaletteOpen, activeProjectModal, soundEnabled])

  // Simulated audio playback progression
  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const currentTrack = tracks[currentTrackIndex]

  const handlePlayToggle = () => {
    playHapticSound("toggle", soundEnabled)
    setIsPlaying(!isPlaying)
  }

  const handleNextTrack = () => {
    playHapticSound("switch", soundEnabled)
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    setPlaybackSeconds(0)
  }

  const handlePrevTrack = () => {
    playHapticSound("switch", soundEnabled)
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
    setPlaybackSeconds(0)
  }

  const handleCopyEmail = () => {
    playHapticSound("success", soundEnabled)
    navigator.clipboard.writeText(data.contact.email)
    setCopiedEmail(true)
    toast.success("Email copied to clipboard: " + data.contact.email)
    setTimeout(() => setCopiedEmail(false), 2800)
  }

  const handleSendNexusMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nexusTestMsg.trim()) return
    playHapticSound("blip", soundEnabled)
    const now = new Date()
    const timeStr = now.toTimeString().split(" ")[0]
    const ping = Math.floor(Math.random() * 10) + 4
    setNexusLogs((prev) => [...prev.slice(-3), { text: `Client Payload ➔ "${nexusTestMsg.trim()}"`, time: timeStr, ping }])
    setNexusTestMsg("")
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) {
      toast.error("Please fill in all required fields (Name, Email, Message)")
      return
    }

    playHapticSound("click", soundEnabled)
    startTransition(async () => {
      try {
        const res = await createContactMessage({
          name: formName,
          email: formEmail,
          subject: formSubject || "Portfolio Transmission",
          message: formMessage,
        })
        if (res.success) {
          playHapticSound("success", soundEnabled)
          toast.success("Message dispatched successfully! Saptak will get back to you shortly.")
          setFormName("")
          setFormEmail("")
          setFormSubject("")
          setFormMessage("")
        } else {
          toast.error("Failed to transmit message. Please email directly.")
        }
      } catch (err) {
        console.error(err)
        toast.error("Transmission error. Please email saptakmondal.official@gmail.com")
      }
    })
  }

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return data.projects
    return data.projects.filter(
      (p: any) =>
        p.category === selectedCategory ||
        (selectedCategory === "Full-Stack Web" && (p.technologies.includes("React") || p.technologies.includes("Next.js"))) ||
        (selectedCategory === "Real-Time / Sockets" && p.technologies.includes("WebSockets")) ||
        (selectedCategory === "Backend & Finance" && (p.technologies.includes("Spring Boot") || p.technologies.includes("PostgreSQL"))) ||
        (selectedCategory === "AI & DevOps" && (p.technologies.includes("Python") || p.technologies.includes("Docker")))
    )
  }, [data.projects, selectedCategory])

  // Filter Command Palette Items
  const commandResults = useMemo(() => {
    if (!cmdSearch.trim()) return []
    const q = cmdSearch.toLowerCase()
    const results: Array<{ title: string; category: string; action: () => void }> = []

    // Projects
    data.projects.forEach((p: any) => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.technologies.some((t: string) => t.toLowerCase().includes(q))) {
        results.push({
          title: `Project: ${p.title}`,
          category: "Projects",
          action: () => {
            setActiveProjectModal(p)
            setCommandPaletteOpen(false)
          },
        })
      }
    })

    // Navigation
    if ("systems projects work".includes(q)) {
      results.push({
        title: "Jump to Systems & Projects",
        category: "Navigation",
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          setCommandPaletteOpen(false)
        },
      })
    }
    if ("architecture skills stack".includes(q)) {
      results.push({
        title: "Jump to Architecture & Skills Matrix",
        category: "Navigation",
        action: () => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
          setCommandPaletteOpen(false)
        },
      })
    }
    if ("music audio rock song player".includes(q)) {
      results.push({
        title: "Jump to Audiophile Music Console",
        category: "Navigation",
        action: () => {
          document.getElementById("audio")?.scrollIntoView({ behavior: "smooth" })
          setCommandPaletteOpen(false)
        },
      })
    }
    if ("contact email message transmit".includes(q)) {
      results.push({
        title: "Jump to Message Transmission / Contact",
        category: "Navigation",
        action: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          setCommandPaletteOpen(false)
        },
      })
    }

    return results
  }, [cmdSearch, data.projects])

  return (
    <>
      <Toaster theme="dark" position="bottom-right" closeButton />

      <div className="min-h-screen bg-[#08090d] text-[#f8fafc] font-sans antialiased selection:bg-cyan-500/25 selection:text-cyan-200 relative overflow-x-hidden">
        
        {/* Subtle Ambient Background Lighting */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] mix-blend-screen" />
          <div className="absolute top-[35%] -right-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[160px] mix-blend-screen" />
          <div className="absolute bottom-20 left-10 w-[550px] h-[550px] bg-emerald-500/08 rounded-full blur-[150px] mix-blend-screen" />
        </div>

        {/* ========================================================================= */}
        {/* TOP SYSTEM HUD NAVIGATION BAR */}
        {/* ========================================================================= */}
        <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#08090d]/80 backdrop-blur-xl transition-all">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo / Brandmark */}
            <div className="flex items-center gap-3">
              <a
                href="#hero"
                onClick={() => playHapticSound("blip", soundEnabled)}
                className="group flex items-center gap-2.5 font-mono text-sm tracking-wider font-semibold text-slate-200 hover:text-white transition"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold group-hover:border-cyan-400 group-hover:glow-cyan transition">
                  SM
                </div>
                <span className="hidden sm:inline-block font-mono text-xs text-slate-400 group-hover:text-slate-200">
                  STUDIO // 2026
                </span>
              </a>

              {/* Status Pill */}
              <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for Roles</span>
              </div>
            </div>

            {/* Central Navigation Pills */}
            <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0f121a]/80 p-1 backdrop-blur-md">
              <a
                href="#projects"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              >
                01 // Systems
              </a>
              <a
                href="#skills"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              >
                02 // Stack
              </a>
              <a
                href="#timeline"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              >
                03 // Timeline
              </a>
              <a
                href="#audio"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              >
                04 // Audio Deck
              </a>
              <a
                href="#contact"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition"
              >
                05 // Transmit
              </a>
            </nav>

            {/* Right Header Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Cmd+K Quick Search Trigger */}
              <button
                onClick={() => {
                  playHapticSound("blip", soundEnabled)
                  setCommandPaletteOpen(true)
                }}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0f121a] px-2.5 py-1.5 text-xs text-slate-400 hover:border-cyan-500/40 hover:text-white transition"
                title="Command Palette (Cmd+K)"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:inline font-mono text-[11px]">Cmd+K</span>
              </button>

              {/* Sound Synthesizer SFX Toggle */}
              <button
                onClick={() => {
                  const next = !soundEnabled
                  setSoundEnabled(next)
                  if (next) playHapticSound("success", true)
                }}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                  soundEnabled
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    : "border-white/[0.08] bg-[#0f121a] text-slate-500"
                }`}
                title={soundEnabled ? "Haptic Audio: ON" : "Haptic Audio: MUTED"}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              {/* GitHub Link */}
              <a
                href={data.contact.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0f121a] text-slate-300 hover:border-white/20 hover:text-white transition"
                title="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>

              {/* SysAdmin Portal Link */}
              <a
                href="/admin"
                onClick={() => playHapticSound("click", soundEnabled)}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-mono text-indigo-300 hover:border-indigo-400 transition"
              >
                <Lock className="h-3 w-3" />
                <span>SysAdmin</span>
              </a>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section id="hero" className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Top Telemetry Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>FULL-STACK SYSTEMS ARCHITECT & DEVELOPER</span>
            </div>

            {/* Main Headline */}
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Saptak Mondal
                </h1>

                {/* Rotating Dynamic Role Ticker */}
                <div className="flex items-center gap-3 font-mono text-lg sm:text-2xl text-cyan-400">
                  <span className="text-slate-500">&gt;</span>
                  <span className="border-b border-cyan-500/40 pb-0.5 transition-all duration-300 font-medium">
                    {rotatingRoles[activeRoleIndex]}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
                  {data.about}
                </p>

                {/* Quick Interactive Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
                  <a
                    href="#projects"
                    onClick={() => playHapticSound("click", soundEnabled)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-slate-950 hover:brightness-110 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition"
                  >
                    <span>Explore Shipped Systems</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#0f121a] px-4 py-3 text-slate-200 hover:border-cyan-500/40 hover:text-white transition"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-400" />}
                    <span>{copiedEmail ? "Email Copied!" : "Copy Direct Email"}</span>
                  </button>

                  <a
                    href="#audio"
                    onClick={() => playHapticSound("blip", soundEnabled)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0f121a] px-4 py-3 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-300 transition"
                  >
                    <Music className="h-4 w-4 text-indigo-400" />
                    <span>Prog Rock Console</span>
                  </a>
                </div>
              </div>

              {/* Right Telemetry HUD Card */}
              <div className="lg:col-span-4">
                <div className="glass-panel rounded-2xl p-6 relative border border-white/[0.08] bg-[#0d1017]/90 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                      <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
                      <span>TELEMETRY METRICS</span>
                    </div>
                    <span className="font-mono text-[11px] text-cyan-400">ONLINE</span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400">Location</span>
                      <span className="text-slate-200 font-semibold">Kolkata, IN 🇮🇳</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400">Academics</span>
                      <span className="text-cyan-300 font-semibold">B.Tech CSE (Graduated)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400">Shipped Apps</span>
                      <span className="text-emerald-400 font-semibold">6 Full-Stack Systems</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-slate-400">Primary Stack</span>
                      <span className="text-indigo-300 font-semibold">Java • Spring • Next.js</span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.08] pt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>RESPONSE TIME: &lt;24H</span>
                    <span>TYPE-SAFE: 100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 01: FEATURED SYSTEMS & INTERACTIVE ARCHITECTURE */}
        {/* ========================================================================= */}
        <section id="projects" className="py-20 border-t border-white/[0.06] relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header & Filter Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                  <span>01 // PRODUCTION ARTIFACTS</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Featured Systems & Architecture
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                  Engineered end-to-end applications showcasing reactive frontends, distributed microservices, low-latency WebSockets, and DevOps pipelines.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {["All", "Full-Stack Web", "Real-Time / Sockets", "Backend & Finance", "AI & DevOps"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      playHapticSound("click", soundEnabled)
                      setSelectedCategory(cat)
                    }}
                    className={`rounded-lg px-3.5 py-1.5 transition ${
                      selectedCategory === cat
                        ? "border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold glow-cyan"
                        : "border border-white/[0.06] bg-[#0f121a] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project: any) => (
                <div
                  key={project.id || project.title}
                  className="group rounded-2xl border border-white/[0.08] bg-[#0e1119]/80 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.12)] hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    
                    {/* Top Tag & Category */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-medium">
                        {project.category || "Full-Stack System"}
                      </span>
                      <span className="text-slate-500 font-mono text-[11px]">
                        SYS-{project.title.substring(0, 3).toUpperCase()}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition">
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Interactive Blueprint Preview Mockup */}
                    <div className="rounded-xl border border-white/[0.06] bg-[#07090e] p-3 font-mono text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/[0.04] pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-cyan-400" />
                          <span>Topology Flow</span>
                        </span>
                        <span className="text-emerald-400">ACTIVE</span>
                      </div>
                      <p className="text-[11px] text-slate-300 truncate">
                        {project.architecture || project.technologies.join(" ➔ ")}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Links */}
                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => {
                        playHapticSound("blip", soundEnabled)
                        setActiveProjectModal(project)
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <span>Inspect Details</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.repoUrl && project.repoUrl !== "#" && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playHapticSound("click", soundEnabled)}
                          className="text-slate-400 hover:text-white transition p-1"
                          title="Source Code"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playHapticSound("click", soundEnabled)}
                          className="inline-flex items-center gap-1 text-xs font-mono text-slate-200 hover:text-cyan-300 transition"
                          title="Live Deployment"
                        >
                          <span>Live</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===================================================================== */}
            {/* LIVE INTERACTIVE SYSTEM LAB / ARCHITECTURE PLAYGROUND */}
            {/* ===================================================================== */}
            <div className="mt-16 rounded-2xl border border-white/[0.08] bg-[#0c0f17] p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
                    <Workflow className="h-4 w-4" />
                    <span>SYSTEM LAB // LIVE ARCHITECTURAL TESTING</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    Interactive Engineering Simulators
                  </h3>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  Test live simulated components below:
                </span>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                
                {/* Lab 1: Nexus WebSocket Event Loop Simulator */}
                <div className="rounded-xl border border-white/[0.06] bg-[#07090e] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-cyan-400">
                      NEXUS // WebSocket Frame Echo
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400">WS://ACTIVE</span>
                  </div>
                  
                  {/* Message Stream */}
                  <div className="h-28 overflow-y-auto rounded-lg bg-[#040508] p-2.5 font-mono text-[11px] space-y-1.5 border border-white/[0.04]">
                    {nexusLogs.map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-300">
                        <span className="truncate">{log.text}</span>
                        <span className="text-slate-500 text-[10px] shrink-0 ml-2">{log.ping}ms</span>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendNexusMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={nexusTestMsg}
                      onChange={(e) => setNexusTestMsg(e.target.value)}
                      placeholder="Type test payload..."
                      className="flex-1 rounded-lg border border-white/[0.08] bg-[#0f121a] px-3 py-1.5 font-mono text-xs text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 font-mono text-xs text-cyan-300 hover:bg-cyan-500/30 transition"
                    >
                      Emit
                    </button>
                  </form>
                </div>

                {/* Lab 2: ML Disease Diagnostic Scanner */}
                <div className="rounded-xl border border-white/[0.06] bg-[#07090e] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-indigo-400">
                      ML ENGINE // Diagnostic Classifier
                    </span>
                    <span className="font-mono text-[10px] text-indigo-300">RANDOM FOREST</span>
                  </div>

                  {/* Symptom Selector */}
                  <div className="space-y-2 font-mono text-xs">
                    <label className="text-slate-400 block text-[11px]">Select Symptom Cluster:</label>
                    <select
                      value={mlSymptom}
                      onChange={(e) => {
                        playHapticSound("blip", soundEnabled)
                        setMlSymptom(e.target.value)
                      }}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#0f121a] px-3 py-1.5 text-slate-200 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Fatigue & Joint Pain">Fatigue &amp; Joint Pain (Rheumatology)</option>
                      <option value="Fever & Rash">Fever &amp; Acute Rash (Dermatology)</option>
                      <option value="Shortness of Breath">Shortness of Breath (Cardio-Pulmonary)</option>
                    </select>
                  </div>

                  {/* Output Telemetry */}
                  <div className="rounded-lg bg-[#040508] p-3 font-mono text-xs border border-white/[0.04] space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Inference Confidence:</span>
                      <span className="text-emerald-400 font-bold">96.8%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-emerald-400 h-1.5 rounded-full w-[96.8%]" />
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1">
                      Status: Automated Regimen Computed
                    </p>
                  </div>
                </div>

                {/* Lab 3: Java CI/CD Pipeline Build Stage */}
                <div className="rounded-xl border border-white/[0.06] bg-[#07090e] p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      DEVOPS // Multi-Stage CI/CD
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">MAVEN &bull; DOCKER</span>
                  </div>

                  {/* Stepper */}
                  <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px] text-center">
                    {["Lint", "Maven", "JUnit", "Docker"].map((step, idx) => (
                      <div
                        key={step}
                        className={`p-1.5 rounded border ${
                          ciCdStep >= idx
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                            : "border-white/[0.04] bg-[#0f121a] text-slate-600"
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-[#040508] p-2.5 font-mono text-[11px] text-slate-300 border border-white/[0.04] flex items-center justify-between">
                    <span>Artifact: java-release:v2.4.0</span>
                    <span className="text-emerald-400 font-semibold">PASS (0.8s)</span>
                  </div>

                  <button
                    onClick={() => {
                      playHapticSound("success", soundEnabled)
                      setCiCdStep((prev) => (prev % 4) + 1)
                    }}
                    className="w-full rounded-lg bg-emerald-500/20 border border-emerald-500/40 py-1.5 font-mono text-xs text-emerald-300 hover:bg-emerald-500/30 transition"
                  >
                    Trigger Pipeline Webhook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02: TECHNICAL SKILL MATRIX & ARCHITECTURE STACK */}
        {/* ========================================================================= */}
        <section id="skills" className="py-20 border-t border-white/[0.06] relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
                  <span>02 // ARCHITECTURE MATRIX</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Technical Stack & Proficiencies
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                  Deep engineering expertise spanning backend systems, real-time protocols, database management, and modern component frameworks.
                </p>
              </div>

              {/* Skill Live Search Filter */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Filter skills (e.g. Java, Docker)..."
                  className="w-full rounded-xl border border-white/[0.08] bg-[#0f121a] pl-9 pr-4 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {defaultData.skillsByCategory.map((categoryGroup) => {
                const IconComponent = categoryGroup.icon
                const matchingSkills = categoryGroup.skills.filter((s) =>
                  s.toLowerCase().includes(skillQuery.toLowerCase())
                )

                if (skillQuery && matchingSkills.length === 0) return null

                return (
                  <div
                    key={categoryGroup.category}
                    className="rounded-2xl border border-white/[0.08] bg-[#0e1119]/80 backdrop-blur-xl p-6 space-y-4 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition duration-300"
                  >
                    <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-mono text-sm font-semibold text-white">
                          {categoryGroup.category}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-500">
                          {matchingSkills.length} Skills Listed
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {matchingSkills.map((skill) => (
                        <div
                          key={skill}
                          onClick={() => playHapticSound("blip", soundEnabled)}
                          className="group/pill inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-slate-300 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-white transition cursor-pointer"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 group-hover/pill:scale-125 transition" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03: ACADEMICS, CREDENTIALS & CAREER TIMELINE */}
        {/* ========================================================================= */}
        <section id="timeline" className="py-20 border-t border-white/[0.06] relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="space-y-2 mb-12">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
                <GraduationCap className="h-4 w-4" />
                <span>03 // EDUCATION & FOUNDATION</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Academic Journey & Credentials
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                Formal computer science education and academic milestones fostering analytical problem-solving and software engineering discipline.
              </p>
            </div>

            {/* Vertical Chronological Progression */}
            <div className="relative border-l border-white/[0.1] ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
              {data.education.map((edu: any, index: number) => (
                <div key={index} className="relative group">
                  
                  {/* Glowing Node on Timeline */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-400 bg-[#08090d] group-hover:scale-125 group-hover:glow-emerald transition duration-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  </div>

                  {/* Card Content */}
                  <div className="rounded-2xl border border-white/[0.08] bg-[#0e1119]/80 backdrop-blur-xl p-6 space-y-4 hover:border-emerald-500/40 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3">
                      <div>
                        <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300 mb-1">
                          {edu.badge || edu.status || "ACADEMIC"}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-slate-400 font-mono">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="text-left sm:text-right font-mono text-xs">
                        <span className="text-slate-400 block">{edu.period || "Completed"}</span>
                        {edu.score && (
                          <span className="text-emerald-400 font-semibold">{edu.score}</span>
                        )}
                      </div>
                    </div>

                    {edu.details && (
                      <p className="text-sm text-slate-300 leading-relaxed font-sans">
                        {edu.details}
                      </p>
                    )}

                    {edu.coursework && (
                      <div className="pt-2">
                        <span className="text-xs font-mono text-slate-400 block mb-2">
                          Key Coursework & Domains:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.coursework.map((course: string) => (
                            <span
                              key={course}
                              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono text-slate-300"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04: AUDIOPHILE PROGRESSIVE ROCK & METAL CONSOLE */}
        {/* ========================================================================= */}
        <section id="audio" className="py-20 border-t border-white/[0.06] relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="space-y-2 mb-12">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <Music className="h-4 w-4" />
                <span>04 // AUDIOPHILE DECK</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Progressive Rock &amp; Metal Studio Console
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl">
                Music meets engineering. Featuring curated progressive masterpieces (Dream Theater, Avenged Sevenfold) with interactive playback &amp; frequency oscillations.
              </p>
            </div>

            {/* Audio Deck Rack Unit */}
            <div className="rounded-3xl border border-white/[0.1] bg-[#0c0e15] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Rotating Vinyl Disc / Cover */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    {/* Vinyl Disc Body */}
                    <div
                      className={`h-48 w-48 sm:h-56 sm:w-56 rounded-full border-4 border-[#1f2638] bg-gradient-to-tr from-[#05060a] via-[#121622] to-[#05060a] shadow-2xl flex items-center justify-center relative ${
                        isPlaying ? "animate-spin-vinyl" : "paused"
                      }`}
                    >
                      {/* Grooves */}
                      <div className="absolute inset-4 rounded-full border border-white/[0.05]" />
                      <div className="absolute inset-8 rounded-full border border-white/[0.05]" />
                      <div className="absolute inset-12 rounded-full border border-white/[0.05]" />
                      
                      {/* Center Label */}
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-cyan-500/40 bg-[#0c101d] flex items-center justify-center text-center p-1">
                        <span className="font-mono text-[9px] font-bold text-cyan-300 leading-tight">
                          DREAM THEATER // PROG
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-slate-400 text-center">
                    {isPlaying ? "♫ STREAMING AUDIO BUFFER..." : "♫ AUDIO PAUSED"}
                  </span>
                </div>

                {/* Right: Console Controls & Frequency Equalizer */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Active Track Metadata */}
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 font-mono text-[11px] text-cyan-300 mb-2">
                      <span>{currentTrack.genre}</span>
                      <span>&bull;</span>
                      <span>{currentTrack.duration}</span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {currentTrack.title}
                    </h3>
                    <p className="text-sm font-mono text-slate-400 mt-1">
                      {currentTrack.artist}
                    </p>
                    <p className="text-sm text-slate-300 mt-2 font-sans leading-relaxed">
                      {currentTrack.description}
                    </p>
                  </div>

                  {/* Simulated 16-Bar Sound Wave Equalizer */}
                  <div className="rounded-xl border border-white/[0.08] bg-[#07090e] p-4 flex items-end justify-between h-20 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 1, 3, 5, 7, 2, 4, 6, 8].map((waveId, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-sm transition-all duration-300 ${
                          isPlaying
                            ? `bg-gradient-to-t from-cyan-500 to-indigo-400 animate-soundwave-${waveId}`
                            : "bg-slate-700 h-1.5"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Playback Controls Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrevTrack}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0f121a] text-slate-300 hover:border-cyan-500/40 hover:text-white transition"
                        title="Previous Track"
                      >
                        <SkipBack className="h-4 w-4" />
                      </button>

                      <button
                        onClick={handlePlayToggle}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                      </button>

                      <button
                        onClick={handleNextTrack}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0f121a] text-slate-300 hover:border-cyan-500/40 hover:text-white transition"
                        title="Next Track"
                      >
                        <SkipForward className="h-4 w-4" />
                      </button>
                    </div>

                    {/* External Streaming Links */}
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <a
                        href={currentTrack.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playHapticSound("click", soundEnabled)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-red-300 hover:border-red-400 transition"
                      >
                        <span>Listen on YouTube Music</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>

                      <a
                        href={data.contact.instagram}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playHapticSound("click", soundEnabled)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3.5 py-2 text-purple-300 hover:border-purple-400 transition"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        <span>Guitar Covers</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05: TRANSMISSION & CONTACT TERMINAL */}
        {/* ========================================================================= */}
        <section id="contact" className="py-20 border-t border-white/[0.06] relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="grid lg:grid-cols-12 gap-12">
              
              {/* Left Column: Direct Communication Channels */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                    <Radio className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span>05 // DISPATCH TRANSMISSION</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Let&apos;s Build Something Resilient.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Available for full-time software engineering roles, high-impact backend projects, and distributed system collaborations. Reach out directly or dispatch a message.
                  </p>
                </div>

                {/* Direct Channel Badges */}
                <div className="space-y-3 font-mono text-xs pt-2">
                  <button
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0e1119] p-4 text-left hover:border-cyan-500/40 hover:bg-[#121622] transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">DIRECT INBOX</span>
                        <span className="text-slate-200 group-hover:text-cyan-300 transition">
                          {data.contact.email}
                        </span>
                      </div>
                    </div>
                    {copiedEmail ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />}
                  </button>

                  <a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playHapticSound("click", soundEnabled)}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0e1119] p-4 hover:border-blue-500/40 hover:bg-[#121622] transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        <Linkedin className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">LINKEDIN NETWORK</span>
                        <span className="text-slate-200 group-hover:text-blue-300 transition">
                          /in/saptak-mondal
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                  </a>

                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playHapticSound("click", soundEnabled)}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-[#0e1119] p-4 hover:border-white/20 hover:bg-[#121622] transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-200">
                        <Github className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block">GITHUB REPOSITORIES</span>
                        <span className="text-slate-200 group-hover:text-white transition">
                          github.com/saptak69
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-slate-300" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Form Terminal */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/[0.08] bg-[#0d1017] p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                      <Terminal className="h-4 w-4 text-cyan-400" />
                      <span>SECURE DISPATCH FORM</span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400">STATUS: READY</span>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 font-mono text-xs">
                        <label className="text-slate-400 block">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Alex Mercer"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#07090e] px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition"
                        />
                      </div>

                      <div className="space-y-1.5 font-mono text-xs">
                        <label className="text-slate-400 block">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full rounded-xl border border-white/[0.08] bg-[#07090e] px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <label className="text-slate-400 block">Subject (Optional)</label>
                      <input
                        type="text"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        placeholder="Software Engineering Opportunity / Project Inquiry"
                        className="w-full rounded-xl border border-white/[0.08] bg-[#07090e] px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1.5 font-mono text-xs">
                      <label className="text-slate-400 block">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Share project scope, role specifications, or simply say hello..."
                        className="w-full rounded-xl border border-white/[0.08] bg-[#07090e] px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isPending}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-mono text-xs font-semibold text-slate-950 hover:brightness-110 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] transition disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isPending ? "Transmitting Packet..." : "Dispatch Message"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOOTER */}
        {/* ========================================================================= */}
        <footer className="border-t border-white/[0.06] bg-[#05070a] py-12 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-semibold">Saptak Mondal</span>
              <span>&bull;</span>
              <span>&copy; {new Date().getFullYear()} All Systems Operational</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#hero" className="hover:text-slate-300 transition">Back to Top ↑</a>
              <a href="/admin" className="hover:text-indigo-400 transition">SysAdmin Portal</a>
            </div>
          </div>
        </footer>

        {/* ========================================================================= */}
        {/* COMMAND PALETTE MODAL (Cmd+K) */}
        {/* ========================================================================= */}
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
            <div
              className="w-full max-w-xl rounded-2xl border border-white/[0.12] bg-[#0c0f17] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input Header */}
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3 bg-[#08090d]">
                <Search className="h-4 w-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={cmdSearch}
                  onChange={(e) => setCmdSearch(e.target.value)}
                  placeholder="Type a command, project, or section..."
                  className="w-full bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
                />
                <button
                  onClick={() => setCommandPaletteOpen(false)}
                  className="rounded-lg p-1 text-slate-500 hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="max-h-80 overflow-y-auto p-2 font-mono text-xs space-y-1">
                {commandResults.length > 0 ? (
                  commandResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        playHapticSound("click", soundEnabled)
                        item.action()
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-slate-300 hover:bg-white/[0.06] hover:text-cyan-300 transition"
                    >
                      <span>{item.title}</span>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </button>
                  ))
                ) : cmdSearch.trim() ? (
                  <div className="py-6 text-center text-slate-500">
                    No results found for &ldquo;{cmdSearch}&rdquo;
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                      Quick Shortcuts
                    </span>
                    <button
                      onClick={() => {
                        playHapticSound("click", soundEnabled)
                        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                        setCommandPaletteOpen(false)
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-slate-300 hover:bg-white/[0.06] transition"
                    >
                      <span>Jump to Featured Systems</span>
                      <span className="text-slate-500 text-[10px]">Projects</span>
                    </button>
                    <button
                      onClick={() => {
                        playHapticSound("click", soundEnabled)
                        document.getElementById("audio")?.scrollIntoView({ behavior: "smooth" })
                        setCommandPaletteOpen(false)
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-slate-300 hover:bg-white/[0.06] transition"
                    >
                      <span>Open Progressive Rock Deck</span>
                      <span className="text-slate-500 text-[10px]">Audio</span>
                    </button>
                    <button
                      onClick={() => {
                        handleCopyEmail()
                        setCommandPaletteOpen(false)
                      }}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-slate-300 hover:bg-white/[0.06] transition"
                    >
                      <span>Copy Direct Email Address</span>
                      <span className="text-slate-500 text-[10px]">Clipboard</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="border-t border-white/[0.08] px-4 py-2 bg-[#08090d] flex items-center justify-between font-mono text-[10px] text-slate-500">
                <span>Navigate: ↑ ↓</span>
                <span>Select: ↵</span>
                <span>Close: ESC</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PROJECT DETAILS MODAL / DRAWER */}
        {/* ========================================================================= */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div
              className="w-full max-w-2xl rounded-2xl border border-white/[0.12] bg-[#0d1017] p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => {
                  playHapticSound("click", soundEnabled)
                  setActiveProjectModal(null)
                }}
                className="absolute right-5 top-5 rounded-lg border border-white/[0.08] bg-[#07090e] p-1.5 text-slate-400 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1">
                <span className="inline-block rounded-md border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-mono text-cyan-300">
                  {activeProjectModal.category || "System Architecture"}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {activeProjectModal.title}
                </h3>
                {activeProjectModal.tagline && (
                  <p className="text-xs font-mono text-slate-400">
                    {activeProjectModal.tagline}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {activeProjectModal.description}
              </p>

              {/* Architecture Topology */}
              {activeProjectModal.architecture && (
                <div className="rounded-xl border border-white/[0.08] bg-[#07090e] p-4 font-mono text-xs space-y-1.5">
                  <span className="text-slate-400 block text-[11px]">System Topology Flow:</span>
                  <p className="text-cyan-300">
                    {activeProjectModal.architecture}
                  </p>
                </div>
              )}

              {/* Key Engineering Highlights */}
              {activeProjectModal.highlights && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 block">
                    Engineering Highlights &amp; Solved Challenges:
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    {activeProjectModal.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-slate-400 block">Integrated Technologies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProjectModal.technologies.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end gap-3 font-mono text-xs">
                {activeProjectModal.repoUrl && activeProjectModal.repoUrl !== "#" && (
                  <a
                    href={activeProjectModal.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.12] bg-[#07090e] px-4 py-2.5 text-slate-200 hover:text-white transition"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {activeProjectModal.liveUrl && activeProjectModal.liveUrl !== "#" && (
                  <a
                    href={activeProjectModal.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 font-semibold text-slate-950 hover:brightness-110 transition"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
