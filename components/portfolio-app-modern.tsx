"use client"

import { useEffect, useState, useTransition } from "react"
import { createContactMessage } from "@/lib/actions"
import { Toaster, toast } from "sonner"
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  Zap,
  Shield,
  Heart,
  Terminal,
  Code,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Instagram,
  Disc,
  Send,
  ChevronUp,
  Copy,
  Check,
  Cpu,
  Database,
  Monitor,
  Flame,
  Award,
  Swords,
  Radio,
} from "lucide-react"

// Sound Synthesizer function using Web Audio API
const playArcadeSound = (
  type: "hover" | "click" | "coin" | "powerup" | "laser",
  soundEnabled: boolean = true
) => {
  if (!soundEnabled || typeof window === "undefined") return
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()

    if (type === "hover") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "square"
      osc.frequency.setValueAtTime(440, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.03, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } else if (type === "click") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.setValueAtTime(587.33, ctx.currentTime)
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } else if (type === "coin") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "square"
      osc.frequency.setValueAtTime(987.77, ctx.currentTime) // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08) // E6
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.22)
    } else if (type === "powerup") {
      const notes = [261.63, 329.63, 392.0, 523.25]
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = "square"
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05)
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (idx + 1) * 0.05)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime + idx * 0.05)
        osc.stop(ctx.currentTime + (idx + 1) * 0.05)
      })
    } else if (type === "laser") {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.12)
    }
  } catch (e) {
    // Silent fail if audio blocked
  }
}

const portfolioData = {
  name: "SAPT-AK 69",
  realName: "Saptak Mondal",
  title: "LEVEL 24 FULL-STACK SOFTWARE ENGINEER",
  location: "KOLKATA, IN",
  stats: {
    hp: "100 / 100",
    mp: "999 / 999",
    xp: "99,450 XP",
    level: "LEVEL 24",
    class: "FULL-STACK ARCHITECT",
  },
  about:
    "B.Tech Computer Science graduate specializing in high-throughput backend infrastructure, real-time WebSockets, distributed Spring Boot microservices, and reactive React/Next.js interfaces. Equipped with full 8-bit precision & system performance.",
  skills: [
    { name: "Java", level: 92, category: "BACKEND" },
    { name: "JavaScript", level: 95, category: "FRONTEND" },
    { name: "React / Next.js", level: 96, category: "FRONTEND" },
    { name: "Python", level: 86, category: "AI / ML" },
    { name: "Spring Boot", level: 88, category: "BACKEND" },
    { name: "Node.js / Express", level: 90, category: "BACKEND" },
    { name: "PostgreSQL / SQL", level: 87, category: "DATABASE" },
    { name: "Supabase / Redis", level: 85, category: "DATABASE" },
    { name: "Docker / DevOps", level: 82, category: "INFRA" },
  ],
  education: [
    {
      stage: "STAGE 3 CLEAR",
      degree: "B.Tech in Computer Science Engineering",
      institution: "Guru Nanak Institute of Technology",
      period: "2022 - 2026",
      status: "GRADUATED",
      reward: "+50,000 XP (DEGREE ACQUIRED)",
      details:
        "Completed rigorous curriculum in Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Architecture.",
    },
    {
      stage: "STAGE 2 CLEAR",
      degree: "Class 12 (Higher Secondary)",
      institution: "Hindu School",
      period: "2020 - 2022",
      status: "75% SCORE",
      reward: "+25,000 XP (SCIENCE STREAM)",
      details: "Higher Secondary education with focus on Mathematics, Physics, Chemistry, and Computer Science.",
    },
    {
      stage: "STAGE 1 CLEAR",
      degree: "Class 10 (Secondary)",
      institution: "The Scottish Church Collegiate School",
      period: "2020",
      status: "88% SCORE",
      reward: "+15,000 XP (DISTINCTION)",
      details: "Secondary Education with academic distinction in Mathematics and Science.",
    },
  ],
  projects: [
    {
      id: "mangrove",
      stage: "QUEST 01",
      title: "MANGROVE FASHION E-COMMERCE",
      boss: "BOSS: COMPLEX CATALOG & CHECKOUT",
      status: "VICTORY (SHIPPED)",
      description:
        "Luxury streetwear fashion platform with micro-interactions, reactive catalog filtering, and real-time cart state management.",
      technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Render"],
      liveUrl: "https://mangrove-9jdw.onrender.com/",
      repoUrl: "https://github.com/saptak69",
      score: "98,500 PTS",
    },
    {
      id: "plothole",
      stage: "QUEST 02",
      title: "PLOT-HOLE MOVIE DISCOVERY",
      boss: "BOSS: REST API DATA PARSING",
      status: "VICTORY (SHIPPED)",
      description:
        "Cinematic movie review and discovery platform integrating TMDB REST API, instant search/filtering, and glassmorphic UI.",
      technologies: ["React", "Tailwind CSS", "REST API", "Vercel"],
      liveUrl: "https://plot-hole.vercel.app/",
      repoUrl: "https://github.com/saptak69",
      score: "94,200 PTS",
    },
    {
      id: "nexus",
      stage: "QUEST 03",
      title: "NEXUS REAL-TIME CHAT",
      boss: "BOSS: WEBSOCKET CONCURRENCY",
      status: "VICTORY (SHIPPED)",
      description:
        "Low-latency real-time chat application with WebSocket channel delivery, active user presence, and Supabase auth.",
      technologies: ["React", "Node.js", "Express.js", "WebSockets", "Supabase", "Vercel"],
      liveUrl: "https://nexus-chat-iota-dun.vercel.app/",
      repoUrl: "https://github.com/saptak69",
      score: "96,800 PTS",
    },
    {
      id: "pennywise",
      stage: "QUEST 04",
      title: "PENNYWISE FINANCIAL TRACKER",
      boss: "BOSS: JWT & SPRING BOOT REST",
      status: "VICTORY (SHIPPED)",
      description:
        "Expense management system with analytics charts, multi-role access, and Spring Boot REST backend.",
      technologies: ["React", "Spring Boot", "PostgreSQL", "JWT", "REST API", "Recharts"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      score: "91,000 PTS",
    },
    {
      id: "disease-pred",
      stage: "QUEST 05",
      title: "HEALTHCARE ML PREDICTION",
      boss: "BOSS: ML DIAGNOSTIC ALGORITHMS",
      status: "VICTORY (SHIPPED)",
      description:
        "Engineering capstone executing predictive analytics for disease classification and automated medicine recommendations.",
      technologies: ["Python", "Machine Learning", "Java", "REST API", "Healthcare AI"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      score: "89,500 PTS",
    },
    {
      id: "release-pipeline",
      stage: "QUEST 06",
      title: "JAVA AUTOMATED RELEASE PIPELINE",
      boss: "BOSS: DEVOPS & DOCKER BUILD",
      status: "VICTORY (SHIPPED)",
      description:
        "Fully automated build and release pipeline for Java applications implementing CI/CD concepts, Maven automation, and Docker.",
      technologies: ["Java", "Maven", "Git", "CI/CD", "Docker", "DevOps"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
      score: "88,000 PTS",
    },
  ],
  contact: {
    email: "saptakmondal.official@gmail.com",
    linkedin: "https://www.linkedin.com/in/saptak-mondal-448b8b40b",
    github: "https://github.com/saptak69",
    instagram: "https://www.instagram.com/saptak_._/",
  },
}

const tracks = [
  {
    title: "Metropolis Pt. 2: Scenes from a Memory",
    artist: "Dream Theater",
    duration: "1:17:16",
    type: "PROGRESSIVE METAL SOUNDTRACK",
    description: "A landmark conceptual work with cinematic storytelling and technical guitar precision.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_no4h8w4dhKZtqgM7ssWeBPI07BncIIZCE&si=w3O7ouUjsblybqz2",
    coverUrl: "/metropolis_cover.jpg",
  },
  {
    title: "Pull Me Under (Images & Words)",
    artist: "Dream Theater",
    duration: "57:04",
    type: "CLASSIC PROG TRACK",
    description: "A breakthrough album with dramatic compositions and memorable guitar solos.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_l1xRaVChi3KmhOWg6rn4ADC1NJe6FYf3o&si=gkpgQ5jRkmEIendf",
    coverUrl: "/images_words_cover.jpg",
  },
  {
    title: "Hail to the King",
    artist: "Avenged Sevenfold",
    duration: "53:11",
    type: "HEAVY METAL SOUNDTRACK",
    description: "A dramatic heavy metal album with razor-sharp riffs and heavy rhythm section.",
    youtubeUrl:
      "https://music.youtube.com/playlist?list=OLAK5uy_ng4ywPIdy9khiwH-oEqvCisM6YwZqZhcQ&si=SZmCmTRKLFBCmAS7",
    coverUrl: "/hail_king_cover.jpg",
  },
]

export default function PortfolioAppModern({ initialData }: { initialData?: any }) {
  const [currentPortfolioData] = useState(() => {
    if (!initialData) return portfolioData
    return {
      ...portfolioData,
      projects: initialData.projects || portfolioData.projects,
      education: initialData.education || portfolioData.education,
    }
  })

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [score, setScore] = useState(999850)
  const [credits, setCredits] = useState(99)
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Form state
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubject, setFormSubject] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  // Music state
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const handleCoinInsert = () => {
    playArcadeSound("coin", soundEnabled)
    setCredits((prev) => prev + 1)
    setScore((prev) => prev + 1000)
    toast.success("COIN INSERTED! +1000 BONUS PTS!")
  }

  const handleActionClick = (soundType: "click" | "powerup" | "laser" = "click") => {
    playArcadeSound(soundType, soundEnabled)
    setScore((prev) => prev + 100)
  }

  const handleCopyEmail = () => {
    playArcadeSound("powerup", soundEnabled)
    navigator.clipboard.writeText(currentPortfolioData.contact.email)
    setCopiedEmail(true)
    toast.success("EMAIL COPIED TO CLIPBOARD!")
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) {
      playArcadeSound("laser", soundEnabled)
      toast.error("ERROR: FILL REQUIRED SLOTS!")
      return
    }
    playArcadeSound("powerup", soundEnabled)
    startTransition(async () => {
      try {
        const res = await createContactMessage({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage,
        })
        if (res.success) {
          toast.success("HIGH SCORE LOGGED SUCCESSFULLY! VICTORY!")
          setFormName("")
          setFormEmail("")
          setFormSubject("")
          setFormMessage("")
          setScore((prev) => prev + 5000)
        }
      } catch (err) {
        console.error(err)
        toast.error("TRANSMISSION ERROR. RETRY!")
      }
    })
  }

  return (
    <>
      <Toaster theme="dark" position="bottom-right" closeButton />
      <div className="min-h-screen bg-[#080a0f] text-[#00ff88] font-vt323 selection:bg-[#00ff88] selection:text-[#080a0f]">

        {/* TOP ARCADE HUD SYSTEM BAR */}
        <header className="sticky top-0 z-50 border-b-4 border-[#00ff88] bg-[#0d111a]/95 px-4 py-2 shadow-[0_4px_20px_rgba(0,255,136,0.3)] backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between font-press-start text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <span className="text-[#ff0055] animate-pulse">1P</span>
              <span className="text-white">SCORE:</span>
              <span className="text-[#ffe600]">{score.toLocaleString()}</span>
            </div>

            <div className="hidden items-center gap-6 md:flex">
              <span className="text-[#00ff88]">HIGH: 999,990</span>
              <span className="text-white">CREDITS: {credits}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled)
                  if (!soundEnabled) playArcadeSound("coin", true)
                }}
                className="flex items-center gap-1.5 rounded border-2 border-[#00ff88] bg-[#080a0f] px-2.5 py-1 text-[10px] text-[#00ff88] hover:bg-[#00ff88] hover:text-[#080a0f] transition"
              >
                {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                <span>{soundEnabled ? "SFX: ON" : "SFX: OFF"}</span>
              </button>

              <button
                onClick={handleCoinInsert}
                onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                className="hidden sm:inline-block rounded border-2 border-[#ffe600] bg-[#ffe600] px-3 py-1 text-[10px] text-black font-bold hover:scale-105 transition"
              >
                + INSERT COIN
              </button>
            </div>
          </div>
        </header>

        {/* MAIN GAME CONTAINER */}
        <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 space-y-20">

          {/* STAGE 1: PLAYER 1 ORIGIN & HERO CRT CABINET */}
          <section className="arcade-box p-6 sm:p-10 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#00ff88] pb-4 mb-8 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#ffe600]">
                <Gamepad2 className="h-5 w-5" />
                <span>STAGE 1: PLAYER 1 SELECT</span>
              </div>
              <span className="text-[#ff0055] animate-pulse">PRESS START</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Player Stats & Class Info */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded border border-[#00ff88] bg-[#00ff88]/10 px-3 py-1 font-press-start text-[10px] text-[#00ff88]">
                  <Flame className="h-4 w-4 text-[#ff0055]" />
                  <span>CLASS: FULL-STACK ENGINEER (LEVEL 24)</span>
                </div>

                <h1 className="font-press-start text-2xl sm:text-4xl text-white leading-relaxed tracking-wider arcade-glow-green">
                  SAPTAK MONDAL
                </h1>

                <p className="text-xl sm:text-2xl text-slate-200 leading-relaxed font-vt323">
                  {currentPortfolioData.about}
                </p>

                {/* RPG Player Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-press-start text-[10px] pt-2">
                  <div className="border-2 border-[#00ff88] p-2 bg-[#080a0f]">
                    <span className="text-slate-400 block">HP</span>
                    <span className="text-[#00ff88] text-xs">100 / 100</span>
                  </div>
                  <div className="border-2 border-[#00ff88] p-2 bg-[#080a0f]">
                    <span className="text-slate-400 block">MANA</span>
                    <span className="text-[#3b82f6] text-xs">999 / 999</span>
                  </div>
                  <div className="border-2 border-[#00ff88] p-2 bg-[#080a0f]">
                    <span className="text-slate-400 block">EXP</span>
                    <span className="text-[#ffe600] text-xs">99,450 XP</span>
                  </div>
                  <div className="border-2 border-[#00ff88] p-2 bg-[#080a0f]">
                    <span className="text-slate-400 block">GUILD</span>
                    <span className="text-[#ff0055] text-xs">GNIT '26</span>
                  </div>
                </div>

                {/* Arcade Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#quests"
                    onClick={() => handleActionClick("powerup")}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="arcade-button px-6 py-3 text-xs tracking-wider uppercase inline-flex items-center gap-2"
                  >
                    <Swords className="h-4 w-4" /> START QUEST LOG
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="border-2 border-[#ff0055] bg-[#1a0d14] px-6 py-3 font-press-start text-xs text-[#ff0055] hover:bg-[#ff0055] hover:text-white transition inline-flex items-center gap-2"
                  >
                    {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedEmail ? "EMAIL COPIED!" : "COPY EMAIL"}
                  </button>

                  <a
                    href="/Saptak_Mondal_Resume.pdf"
                    download
                    onClick={() => handleActionClick("click")}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="border-2 border-[#ffe600] bg-[#1a180d] px-6 py-3 font-press-start text-xs text-[#ffe600] hover:bg-[#ffe600] hover:text-black transition"
                  >
                    RESUME.PDF ↓
                  </a>
                </div>
              </div>

              {/* Right Column: Hero CRT Player Portrait */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm border-4 border-[#00ff88] bg-[#000000] p-3 shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                  <div className="relative aspect-[3/4] border-2 border-[#00ff88] overflow-hidden bg-slate-900">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Saptak Mondal Arcade Portrait"
                      className="h-full w-full object-cover object-top contrast-125 filter"
                    />

                    {/* CRT Scanline Effect Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none" />

                    {/* Arcade Frame Tag */}
                    <div className="absolute bottom-2 left-2 right-2 border-2 border-[#00ff88] bg-[#080a0f]/90 p-2 font-press-start text-[9px] text-[#00ff88] text-center">
                      PLAYER 1: SAPTAK MONDAL
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* STAGE 2: SKILL INVENTORY & POWER-UP TREE */}
          <section id="skills" className="arcade-box-yellow p-6 sm:p-10">
            <div className="flex items-center justify-between border-b-2 border-[#ffe600] pb-4 mb-8 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#ffe600]">
                <Zap className="h-5 w-5" />
                <span>STAGE 2: SKILL INVENTORY & POWER-UPS</span>
              </div>
              <span className="text-[#ffe600]">9 ATK ABILITIES</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {currentPortfolioData.skills.map((skill: any) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                  className="border-2 border-[#ffe600] bg-[#0d0f14] p-4 font-vt323 hover:border-white transition"
                >
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-[#ffe600]">{skill.level}%</span>
                  </div>
                  <span className="text-xs font-press-start text-slate-400 block mt-1">
                    TYPE: {skill.category}
                  </span>
                  
                  {/* Skill XP Meter Bar */}
                  <div className="mt-3 h-3 w-full border border-[#ffe600] bg-black p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-[#ffe600] to-[#ff0055]"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STAGE 3: QUEST LOG & COMPLETED MISSIONS (PROJECTS) */}
          <section id="quests" className="arcade-box p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-[#00ff88] pb-4 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#00ff88]">
                <Trophy className="h-5 w-5" />
                <span>STAGE 3: COMPLETED QUESTS & BOSS BATTLES</span>
              </div>
              <span className="text-[#00ff88]">6 / 6 CLEARED</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {currentPortfolioData.projects.map((project: any) => (
                <div
                  key={project.id}
                  onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                  className="border-2 border-[#00ff88] bg-[#080a0f] p-6 space-y-4 hover:border-white transition"
                >
                  <div className="flex items-center justify-between font-press-start text-[10px]">
                    <span className="text-[#ff0055]">{project.stage}</span>
                    <span className="text-[#ffe600]">{project.score}</span>
                  </div>

                  <h3 className="font-press-start text-sm text-white leading-relaxed">
                    {project.title}
                  </h3>

                  <div className="border border-[#00ff88]/40 bg-[#00ff88]/10 p-2 font-press-start text-[9px] text-[#00ff88]">
                    {project.boss} — {project.status}
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed font-vt323">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.map((tech: string) => (
                      <span
                        key={tech}
                        className="border border-slate-700 bg-slate-900 px-2 py-0.5 font-press-start text-[8px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-press-start text-[10px]">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleActionClick("click")}
                        className="text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <Github className="h-3.5 w-3.5" /> REPO
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleActionClick("powerup")}
                        className="text-[#00ff88] hover:text-white flex items-center gap-1"
                      >
                        PLAY DEMO <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STAGE 4: LEVEL-UP ACADEMIC TIMELINE */}
          <section id="academic" className="arcade-box-pink p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-[#ff0055] pb-4 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#ff0055]">
                <Shield className="h-5 w-5" />
                <span>STAGE 4: ACADEMIC LEVEL-UP CHRONICLE</span>
              </div>
              <span className="text-[#ff0055]">LEVEL 24 REACHED</span>
            </div>

            <div className="space-y-6">
              {currentPortfolioData.education.map((edu: any) => (
                <div
                  key={edu.institution}
                  onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                  className="border-2 border-[#ff0055] bg-[#080a0f] p-6 space-y-3"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center font-press-start text-[10px]">
                    <span className="text-[#ffe600]">{edu.stage} • {edu.period}</span>
                    <span className="text-[#00ff88]">{edu.reward}</span>
                  </div>

                  <h3 className="font-press-start text-sm text-white">{edu.degree}</h3>
                  <p className="text-xl text-[#ff0055] font-vt323">{edu.institution}</p>
                  <p className="text-lg text-slate-300 font-vt323">{edu.details}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STAGE 5: SOUNDTRACK & PROG ROCK SOUND TEST */}
          <section id="soundtrack" className="arcade-box p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-[#00ff88] pb-4 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#00ff88]">
                <Radio className="h-5 w-5" />
                <span>STAGE 5: OFFSCALE ARCADE SOUND TEST</span>
              </div>
              <a
                href="https://www.instagram.com/offscale_._/"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff0055] hover:text-white flex items-center gap-1"
              >
                <Instagram className="h-4 w-4" /> @offscale_._
              </a>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              {/* Jukebox Deck */}
              <div className="lg:col-span-7 border-2 border-[#00ff88] bg-[#080a0f] p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-[#00ff88]/40 pb-4">
                  <div className="h-14 w-14 border border-[#00ff88] overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={tracks[currentTrackIndex].coverUrl}
                      alt="Cover"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-press-start text-[9px] text-[#ffe600] block">
                      {tracks[currentTrackIndex].type}
                    </span>
                    <h4 className="font-press-start text-xs text-white mt-1">
                      {tracks[currentTrackIndex].title}
                    </h4>
                    <p className="text-lg text-slate-400 font-vt323">{tracks[currentTrackIndex].artist}</p>
                  </div>
                </div>

                {/* Animated Equalizer Bars */}
                <div className="flex h-12 items-center justify-center gap-1.5 border border-[#00ff88] bg-black px-4">
                  {[...Array(24)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 bg-[#00ff88] transition-all duration-300 ${
                        isPlaying ? `animate-soundwave-${(i % 5) + 1}` : "h-2 opacity-30"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between font-press-start text-[10px]">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        handleActionClick("click")
                        setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
                      }}
                      className="border border-[#00ff88] p-2 hover:bg-[#00ff88] hover:text-black transition"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => {
                        handleActionClick("powerup")
                        setIsPlaying(!isPlaying)
                      }}
                      className="border-2 border-[#00ff88] bg-[#00ff88] p-3 text-black hover:scale-105 transition"
                    >
                      {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={() => {
                        handleActionClick("click")
                        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
                      }}
                      className="border border-[#00ff88] p-2 hover:bg-[#00ff88] hover:text-black transition"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                  </div>

                  <a
                    href={tracks[currentTrackIndex].youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#ffe600] hover:text-white flex items-center gap-1"
                  >
                    YOUTUBE <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Tracks List */}
              <div className="lg:col-span-5 space-y-2">
                {tracks.map((track, idx) => (
                  <div
                    key={track.title}
                    onClick={() => {
                      handleActionClick("click")
                      setCurrentTrackIndex(idx)
                      setIsPlaying(true)
                    }}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className={`cursor-pointer border-2 p-3 font-vt323 text-lg flex items-center justify-between transition ${
                      currentTrackIndex === idx
                        ? "border-[#00ff88] bg-[#00ff88]/10 text-white"
                        : "border-slate-800 bg-[#080a0f] text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Disc className={`h-4 w-4 ${currentTrackIndex === idx && isPlaying ? "animate-spin text-[#00ff88]" : "text-slate-600"}`} />
                      <span>{track.title}</span>
                    </div>
                    <span className="font-press-start text-[8px] text-[#ffe600]">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STAGE 6: HIGH SCORE REGISTRATION & MULTIPLAYER CONTACT */}
          <section id="contact" className="arcade-box-pink p-6 sm:p-10 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-[#ff0055] pb-4 font-press-start text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-[#ff0055]">
                <Terminal className="h-5 w-5" />
                <span>STAGE 6: HIGH SCORE REGISTRATION (CONTACT)</span>
              </div>
              <span className="text-[#ff0055]">P1 CONNECT</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 border-2 border-[#ff0055] bg-[#080a0f] p-6 space-y-4">
                <h3 className="font-press-start text-xs text-white">ENTER YOUR INITIALS & TRANSMIT</h3>

                <form onSubmit={handleFormSubmit} className="space-y-4 font-press-start text-[10px]">
                  <div>
                    <label className="text-[#ff0055] block mb-1">PLAYER NAME *</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="PLAYER 1"
                      required
                      className="w-full border-2 border-[#ff0055] bg-black p-3 text-white focus:border-white focus:outline-none font-vt323 text-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[#ff0055] block mb-1">PLAYER EMAIL *</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="player@arcade.com"
                      required
                      className="w-full border-2 border-[#ff0055] bg-black p-3 text-white focus:border-white focus:outline-none font-vt323 text-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[#ff0055] block mb-1">MESSAGE / QUEST INQUIRY *</label>
                    <textarea
                      rows={4}
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Transmit project inquiry or multiplayer invite..."
                      required
                      className="w-full border-2 border-[#ff0055] bg-black p-3 text-white focus:border-white focus:outline-none font-vt323 text-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="arcade-button w-full py-4 text-xs tracking-widest text-black uppercase"
                  >
                    {isPending ? "TRANSMITTING..." : "SUBMIT HIGH SCORE"}
                  </button>
                </form>
              </div>

              {/* Direct Channels */}
              <div className="lg:col-span-5 border-2 border-[#ff0055] bg-[#080a0f] p-6 space-y-6 font-press-start text-[10px]">
                <h3 className="text-white text-xs">DIRECT MULTIPLAYER CHANNELS</h3>

                <div className="space-y-4">
                  <a
                    href={`mailto:${currentPortfolioData.contact.email}`}
                    onClick={() => handleActionClick("click")}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="block border-2 border-[#ff0055] p-3 text-slate-300 hover:border-white hover:text-white transition"
                  >
                    <span className="text-[#ff0055] block mb-1">EMAIL TRANSMISSION</span>
                    <span className="font-vt323 text-xl block">{currentPortfolioData.contact.email}</span>
                  </a>

                  <a
                    href={currentPortfolioData.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleActionClick("click")}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="block border-2 border-[#ff0055] p-3 text-slate-300 hover:border-white hover:text-white transition"
                  >
                    <span className="text-[#ff0055] block mb-1">LINKEDIN GUILD</span>
                    <span className="font-vt323 text-xl block">saptak-mondal-448b8b40b</span>
                  </a>

                  <a
                    href={currentPortfolioData.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleActionClick("click")}
                    onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
                    className="block border-2 border-[#ff0055] p-3 text-slate-300 hover:border-white hover:text-white transition"
                  >
                    <span className="text-[#ff0055] block mb-1">GITHUB REPO ARCHIVE</span>
                    <span className="font-vt323 text-xl block">github.com/saptak69</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* ARCADE FOOTER */}
        <footer className="border-t-4 border-[#00ff88] bg-[#0d111a] py-6 text-center font-press-start text-[10px] text-[#00ff88]">
          <div className="mx-auto max-w-6xl px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span>© {new Date().getFullYear()} SAPTAK MONDAL • ALL RIGHTS RESERVED</span>
            <a
              href="#"
              onClick={() => handleActionClick("click")}
              onMouseEnter={() => playArcadeSound("hover", soundEnabled)}
              className="text-[#ffe600] hover:text-white flex items-center gap-1"
            >
              TOP OF STAGE <ChevronUp className="h-4 w-4" />
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}
