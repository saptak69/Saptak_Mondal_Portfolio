"use client"

import { useEffect, useState, useTransition } from "react"
import { createContactMessage } from "@/lib/actions"
import { Toaster, toast } from "sonner"
import { Github, Linkedin, ExternalLink, Menu, X, Database, Monitor, Play, Pause, SkipForward, SkipBack, Instagram, Music, Disc, Terminal, Code, Cpu } from "lucide-react"

const portfolioData = {
  name: "Saptak Mondal",
  about:
    "As a Computer Science Engineering graduate, I am deeply passionate about software engineering and building high-fidelity, production-grade applications from the ground up. I thrive on solving complex engineering problems and crafting beautiful, highly intuitive user interfaces that balance aesthetics with robust backend performance. With a strong interest in startup culture, I value rapid learning, direct ownership, and continuous iteration. I am committed to writing clean, maintainable code and developing scalable architectures that deliver meaningful user experiences.",
  skills: [
    "Java", "JavaScript", "Python", "C", "SQL",
    "React", "HTML5", "CSS3", "Tailwind CSS", "Vite",
    "Spring Boot", "Node.js", "Express.js", "PostgreSQL", "MySQL", "Supabase",
    "Git", "GitHub", "Maven", "Docker", "Redis",
    "Spring Security", "Microservices", "System Design"
  ],
  education: [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "Guru Nanak Institute of Technology",
      period: "2022 - 2026",
      details: "Graduated (Recently completed). Relevant Coursework: Data Structures, Algorithms, DBMS, OOPs, OS, Computer Networks, Software Engineering, Machine Learning.",
    },
    {
      degree: "Class 12 (Higher Secondary)",
      institution: "Hindu School",
      score: "75%",
    },
    {
      degree: "Class 10 (Secondary)",
      institution: "The Scottish Church Collegiate School",
      score: "88%",
    },
  ],
  projects: [
    {
      title: "Mangrove",
      description: "A premium fashion brand streetwear e-commerce platform featuring high-fidelity animations, catalog filtering, responsive design, and cart functionality.",
      technologies: ["React", "Next.js", "Tailwind CSS", "MongoDB", "Framer Motion", "Render"],
      liveUrl: "https://mangrove-9jdw.onrender.com/",
      repoUrl: "https://github.com/saptak69",
    },
    {
      title: "PlotHole",
      description: "A modern movie review and discovery platform integrating third-party movie database APIs, advanced search/filter, and a responsive glassmorphic UI.",
      technologies: ["React", "Tailwind CSS", "REST API", "Vercel"],
      liveUrl: "https://plot-hole.vercel.app/",
      repoUrl: "https://github.com/saptak69",
    },
    {
      title: "Nexus",
      description: "A low-latency real-time chat application powered by WebSockets, featuring an interactive messaging interface, user presence, and robust authentication.",
      technologies: ["React", "Node.js", "Express.js", "WebSockets", "Supabase", "Vercel"],
      liveUrl: "https://nexus-chat-iota-dun.vercel.app/",
      repoUrl: "https://github.com/saptak69",
    },
    {
      title: "PennyWise",
      description: "A premium, brutalist-inspired expense tracker and budget management dashboard featuring detailed analytics, interactive charts, and secure multi-role access.",
      technologies: ["React", "Spring Boot", "PostgreSQL", "JWT", "REST API", "Recharts"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
    },
    {
      title: "ML Disease Prediction",
      description: "Final year engineering major project executing predictive analytics for disease detection and automated medicine recommendations using Machine Learning models.",
      technologies: ["Python", "Machine Learning", "Java", "REST API", "Healthcare AI"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
    },
    {
      title: "Automated Java Release Pipeline",
      description: "A fully automated build and release pipeline for Java applications implementing DevOps workflows, CI/CD concepts, Maven automation, and automated containerization.",
      technologies: ["Java", "Maven", "Git", "CI/CD", "Docker", "DevOps"],
      liveUrl: "#",
      repoUrl: "https://github.com/saptak69",
    }
  ],
  contact: {
    email: "saptakmondal.official@gmail.com",
    linkedin: "https://www.linkedin.com/in/saptak-mondal-448b8b40b",
    github: "https://github.com/saptak69",
    instagram: "https://www.instagram.com/saptak_._/",
  },
}

export default function PortfolioApp({ initialData }: { initialData?: any }) {
  const [currentPortfolioData, setCurrentPortfolioData] = useState(() => {
    if (!initialData) return portfolioData
    return {
      ...portfolioData,
      projects: initialData.projects || portfolioData.projects,
      skills: initialData.skills || portfolioData.skills,
      education: initialData.education || portfolioData.education,
    }
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const titles = [
    "Full Stack Developer",
    "Software Engineer",
    "Computer Science Engineer",
    "UI/UX Enthusiast",
    "Product Builder"
  ]

  const [activeTitleIndex, setActiveTitleIndex] = useState(0)

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setActiveTitleIndex(prev => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(titleTimer)
  }, [])
  
  // Contact Form State
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubject, setFormSubject] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  // Music Player State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playbackProgress, setPlaybackProgress] = useState(0)

  // Helper to parse duration string (e.g., "8:11", "1:17:16") to total seconds
  const parseDuration = (durationStr: string) => {
    const parts = durationStr.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // Helper to format seconds back to string (e.g., "1:17:16" or "5:04")
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const tracks = [
    {
      title: "Metropolis Pt. 2: Scenes from a Memory",
      artist: "Dream Theater",
      duration: "1:17:16",
      type: "Progressive Metal Concept Album",
      description: "Dream Theater's landmark conceptual masterpiece exploring reincarnation, tragedy, and memory.",
      youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_no4h8w4dhKZtqgM7ssWeBPI07BncIIZCE&si=w3O7ouUjsblybqz2",
      coverUrl: "/metropolis_cover.jpg"
    },
    {
      title: "Pull Me Under (Images & Words)",
      artist: "Dream Theater",
      duration: "57:04",
      type: "Classic Progressive Metal",
      description: "The classic breakthrough album featuring mind-bending instrumental interplay and soaring vocals.",
      youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_l1xRaVChi3KmhOWg6rn4ADC1NJe6FYf3o&si=gkpgQ5jRkmEIendf",
      coverUrl: "/images_words_cover.jpg"
    },
    {
      title: "Hail to the King",
      artist: "Avenged Sevenfold",
      duration: "53:11",
      type: "Heavy Metal / Hard Rock",
      description: "A tribute to metal royalty, built around massive mid-tempo grooves, epic solos, and dark gothic themes.",
      youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_ng4ywPIdy9khiwH-oEqvCisM6YwZqZhcQ&si=SZmCmTRKLFBCmAS7",
      coverUrl: "/hail_king_cover.jpg"
    }
  ]

  // Silent visualizer simulation
  useEffect(() => {
    if (isPlaying) {
      const progressTimer = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            return 0
          }
          return prev + 1
        })
      }, 500)
      
      return () => {
        clearInterval(progressTimer)
      }
    }
  }, [isPlaying, currentTrackIndex])

  useEffect(() => {
    // Telemetry tracking
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ referrer: document.referrer, path: window.location.pathname }),
    }).catch((err) => console.error("Telemetry failed:", err))
  }, [])

  const trackProjectView = (projectId?: string) => {
    if (!projectId) return
    fetch("/api/analytics/project-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    }).catch((err) => console.error("Project click tracking failed:", err))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) {
      toast.error("Please fill in all required fields.")
      return
    }
    
    startTransition(async () => {
      try {
        const res = await createContactMessage({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage
        })
        if (res.success) {
          toast.success("Connection established. Your message has been logged.")
          setFormName("")
          setFormEmail("")
          setFormSubject("")
          setFormMessage("")
        }
      } catch (err) {
        console.error(err)
        toast.error("Transmission failed. Please check connection.")
      }
    })
  }

  // Helper to categorize skills dynamically for a professional layout
  const categorizeSkills = (skills: string[]) => {
    const categories = {
      "LANGUAGES": [] as string[],
      "FRONTEND": [] as string[],
      "BACKEND & DATABASES": [] as string[],
      "DEVELOPER TOOLS": [] as string[],
      "CURRENTLY LEARNING": [] as string[],
    }
    
    skills.forEach(skill => {
      const s = skill.toLowerCase()
      if (s === "java" || s === "javascript" || s === "python" || s === "c" || s === "sql") {
        categories["LANGUAGES"].push(skill)
      } else if (["react", "html5", "css3", "tailwind css", "vite", "responsive design"].includes(s) || s.includes("frontend") || s.includes("ui") || s.includes("styling") || s.includes("animation")) {
        categories["FRONTEND"].push(skill)
      } else if (["spring boot", "node.js", "express.js", "rest apis", "authentication", "authorization", "jwt", "websockets", "mysql", "postgresql", "supabase"].includes(s) || s.includes("backend") || s.includes("database")) {
        categories["BACKEND & DATABASES"].push(skill)
      } else if (["git", "github", "vs code", "postman", "pnpm", "npm", "maven", "render", "vercel", "railway", "figma"].includes(s) || s.includes("tool")) {
        categories["DEVELOPER TOOLS"].push(skill)
      } else if (["spring security", "microservices", "system design", "docker", "redis", "advanced backend development"].includes(s) || s.includes("learning")) {
        categories["CURRENTLY LEARNING"].push(skill)
      } else {
        categories["DEVELOPER TOOLS"].push(skill)
      }
    })
    
    return categories
  }

  const categorizedSkills = categorizeSkills(currentPortfolioData.skills)

  // Render dynamic monochromatic visual mockup element for projects
  const renderProjectMockup = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes("mangrove") || t.includes("commerce")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-500 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// STOREFRONT_CATALOG.RAW</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">HTTPS_ACTIVE</span>
          </div>
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="border border-white/5 bg-zinc-900/10 p-1 flex flex-col justify-between aspect-[3/4]">
              <div className="bg-zinc-950 w-full h-[60%] border border-white/5 flex items-center justify-center font-bold text-[7px] text-zinc-700">GRID</div>
              <div className="h-0.5 bg-zinc-800 w-3/4 mt-1" />
              <div className="h-1 bg-zinc-800 w-1/2 mt-0.5" />
            </div>
            <div className="border border-white/5 bg-zinc-900/10 p-1 flex flex-col justify-between aspect-[3/4]">
              <div className="bg-zinc-950 w-full h-[60%] border border-white/5 flex items-center justify-center font-bold text-[7px] text-zinc-700">GRID</div>
              <div className="h-0.5 bg-zinc-800 w-3/4 mt-1" />
              <div className="h-1 bg-zinc-800 w-1/2 mt-0.5" />
            </div>
            <div className="border border-white/5 bg-zinc-900/10 p-1 flex flex-col justify-between aspect-[3/4]">
              <div className="bg-zinc-950 w-full h-[60%] border border-white/5 flex items-center justify-center font-bold text-[7px] text-zinc-700">GRID</div>
              <div className="h-0.5 bg-zinc-800 w-3/4 mt-1" />
              <div className="h-1 bg-zinc-800 w-1/2 mt-0.5" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-500 border-t border-white/5 pt-2">
            <span>INDEX // 12_PRODUCTS</span>
            <span>SECURE_CHECKOUT</span>
          </div>
        </div>
      )
    } else if (t.includes("pennywise") || t.includes("money") || t.includes("finance")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-500 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// FINANCIAL_LEDGER.XLS</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">BALANCE_OK</span>
          </div>
          <div className="flex items-end justify-between h-[45%] px-4 my-auto">
            <div className="w-[18%] bg-zinc-900 border border-white/5 h-[40%] relative"><span className="absolute -top-3 left-0 right-0 text-center text-[6px]">$1.2k</span></div>
            <div className="w-[18%] bg-zinc-900 border border-white/5 h-[65%] relative"><span className="absolute -top-3 left-0 right-0 text-center text-[6px]">$2.4k</span></div>
            <div className="w-[18%] bg-zinc-800 border border-white/10 h-[90%] relative"><span className="absolute -top-3 left-0 right-0 text-center text-[6px] text-zinc-400">$4.1k</span></div>
            <div className="w-[18%] bg-zinc-900 border border-white/5 h-[50%] relative"><span className="absolute -top-3 left-0 right-0 text-center text-[6px]">$1.8k</span></div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-500 border-t border-white/5 pt-2">
            <span>EXPENSES // -$850.00</span>
            <span>LIMIT // SAFE</span>
          </div>
        </div>
      )
    } else if (t.includes("plothole") || t.includes("movie")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-550 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// CINEMATIC_METRIC.DB</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">API_CONNECTED</span>
          </div>
          <div className="flex items-center gap-3 py-2 flex-1">
            <div className="w-[28%] aspect-[2/3] border border-white/10 bg-zinc-900 flex items-center justify-center text-[6px] text-zinc-500 font-bold">
              POSTER
            </div>
            <div className="flex-1 space-y-1">
              <div className="h-2 bg-zinc-800 w-3/4 rounded-sm" />
              <div className="h-1 bg-zinc-900 w-5/6" />
              <div className="h-1 bg-zinc-900 w-2/3" />
              <div className="flex gap-1 pt-1">
                <span className="text-[5px] border border-white/10 px-1 py-0.2">8.4 IMDB</span>
                <span className="text-[5px] border border-white/10 px-1 py-0.2">Sci-Fi</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-650 border-t border-white/5 pt-2">
            <span>STREAMING_ONLINE</span>
            <span>REVIEWS // 142</span>
          </div>
        </div>
      )
    } else if (t.includes("nexus") || t.includes("chat") || t.includes("real-time") || t.includes("communication")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-550 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// SOCKET_CHANNEL_0x4F</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-green-500 animate-pulse">WS_CONNECTED</span>
          </div>
          <div className="space-y-1 py-1.5 flex flex-col justify-center flex-1">
            <div className="bg-zinc-900/40 border border-white/5 rounded-md p-1 max-w-[70%] self-start text-[7px] text-zinc-450">
              <span>sys_peer: hello_world</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-md p-1 max-w-[70%] self-end text-[7px] text-zinc-300">
              <span>user_69: ping packet received</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-600 border-t border-white/5 pt-2">
            <span>MUTUAL_SSL_ACTIVE</span>
            <span>MEMBERS // 2</span>
          </div>
        </div>
      )
    } else if (t.includes("pipeline") || t.includes("automation") || t.includes("release")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-550 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// MAVEN_BUILD_RUNNER</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">JOB_RUNNING</span>
          </div>
          <div className="space-y-1 py-1.5 flex flex-col justify-center flex-1 text-[7px]">
            <div className="flex items-center justify-between text-zinc-450">
              <span>[STG.1] MAVENCOMPILE</span>
              <span className="text-green-500">SUCCESS [12s]</span>
            </div>
            <div className="flex items-center justify-between text-zinc-450">
              <span>[STG.2] UNITTESTS</span>
              <span className="text-green-500">SUCCESS [24s]</span>
            </div>
            <div className="flex items-center justify-between text-zinc-350 animate-pulse">
              <span>[STG.3] DOCKER_BUILD</span>
              <span className="text-zinc-550">RUNNING...</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-650 border-t border-white/5 pt-2">
            <span>COMMIT_HASH // e91c853</span>
            <span>DURATION // 0m 48s</span>
          </div>
        </div>
      )
    } else if (t.includes("disease") || t.includes("recommendation") || t.includes("ml") || t.includes("prediction")) {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-550 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// PYTORCH_MODEL_INFERENCE</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">GPU_EVAL</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-2 flex-1">
            <div className="flex flex-col justify-between h-full w-[45%] text-[7px] text-zinc-450">
              <span>SYMP // FEVER, COUGH</span>
              <span className="font-semibold text-zinc-300">DIAG // FLU</span>
            </div>
            <div className="w-[50%] h-full border border-white/5 bg-zinc-900/20 p-1 flex flex-col justify-center space-y-1">
              <span className="text-[6px] text-zinc-500">// SUGGESTIONS</span>
              <div className="h-1 bg-zinc-800 w-full" />
              <div className="h-1 bg-zinc-850 w-5/6" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-650 border-t border-white/5 pt-2">
            <span>ACCURACY // 94.2%</span>
            <span>REST_API_STABLE</span>
          </div>
        </div>
      )
    } else {
      return (
        <div className="w-full aspect-[16/9] border border-white/5 bg-zinc-950/60 p-3 flex flex-col justify-between font-mono text-[9px] text-zinc-550 select-none relative group-hover:border-white/10 transition-colors">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[8px] text-zinc-400">// WEB_LAYOUT_SCHEMATIC</span>
            <span className="bg-zinc-900/30 border border-white/5 px-1 text-[7px] text-zinc-300">LOCAL_PORT:3000</span>
          </div>
          <div className="flex items-center justify-between gap-3 h-[45%]">
            <div className="w-[35%] h-full border border-dashed border-white/5 bg-zinc-900/10 flex items-center justify-center text-[6px] text-zinc-655">
              [HERO_IMG]
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-1">
              <div className="h-1 bg-zinc-800 w-full" />
              <div className="h-0.5 bg-zinc-900 w-5/6" />
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-650 border-t border-white/5 pt-2">
            <span>SSR_BUILD // SUCCESS</span>
            <span>OPTIMIZED // STATIC</span>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Toaster theme="dark" position="bottom-right" closeButton />

      {/* Main Container */}
      <div className="min-h-screen bg-black text-white relative font-sans overflow-hidden">
        {/* Subtle premium background glow & mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Ambient grid mesh with radial gradient mask */}
          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" style={{ maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)' }} />
          {/* Premium glows: Violet/indigo cyber-space color accents & silver highlights */}
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-violet-600/12 blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute top-[20%] -right-[20%] w-[80%] h-[80%] rounded-full bg-indigo-500/12 blur-[160px] mix-blend-screen animate-pulse" style={{ animationDuration: '14s' }} />
          <div className="absolute -bottom-[10%] left-[15%] w-[50%] h-[50%] rounded-full bg-zinc-700/8 blur-[120px] mix-blend-screen" />
        </div>
        
        {/* Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full border border-white/10 bg-black/65 backdrop-blur-xl py-4 px-8 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
          <a href="#" className="text-base font-bold tracking-[0.2em] font-mono hover:opacity-80 transition-opacity">
            SAPTAK
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-mono text-xs md:text-sm tracking-[0.15em]">
            <a 
              href="#about" 
              className="transition-colors text-zinc-300 hover:text-white"
            >
              /ABOUT
            </a>
            <a 
              href="#projects" 
              className="transition-colors text-zinc-300 hover:text-white"
            >
              /PROJECTS
            </a>
            <a 
              href="#education" 
              className="transition-colors text-zinc-300 hover:text-white"
            >
              /ACADEMICS
            </a>
            <a 
              href="#contact" 
              className="transition-colors text-zinc-300 hover:text-white"
            >
              /CONTACT
            </a>
            <a 
              href="#music" 
              className="transition-colors text-zinc-300 hover:text-white"
            >
              /MUSIC
            </a>
          </nav>

          <a href="/admin" className="hidden md:block font-mono text-xs tracking-[0.1em] border border-white/20 rounded-full px-4 py-1.5 hover:bg-white hover:text-black transition-all">
            SYS_ADMIN
          </a>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center px-10">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-zinc-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            <nav className="flex flex-col space-y-8 font-mono text-sm tracking-[0.25em]">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">/ ABOUT</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">/ PROJECTS</a>
              <a href="#education" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">/ ACADEMICS</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">/ CONTACT</a>
              <a href="#music" onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white">/ MUSIC</a>
              <a href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-zinc-500 hover:text-white">/ SYS_ADMIN</a>
            </nav>
          </div>
        )}

        <main className="max-w-5xl mx-auto px-6 pt-28 md:pt-36 pb-20 relative z-10 space-y-20 md:space-y-32">
          
          {/* HERO SECTION */}
          <section id="hero" className="min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center py-4 sm:py-6">
            <div className="space-y-6 sm:space-y-10">
              
              {/* Upper row: Name/desc and picture side-by-side on ALL screens */}
              <div className="flex flex-row items-start justify-between gap-4 sm:gap-8 lg:gap-12">
                
                {/* Left block: Text info */}
                <div className="flex-1 min-w-0 space-y-4 sm:space-y-6">
                  {/* Live System Indicator */}
                  <div className="inline-flex items-center space-x-2 bg-zinc-950/45 border border-white/10 rounded-full px-2.5 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[9px] sm:text-xs tracking-wider text-zinc-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse" />
                    <span className="uppercase text-[9px] sm:text-xs">PORTFOLIO NODE // ACTIVE</span>
                  </div>
                  
                  <h1 className="text-3xl min-[360px]:text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-none metallic-text select-none">
                    {currentPortfolioData.name}
                  </h1>
                  
                  <div className="space-y-1.5 sm:space-y-3 border-l-2 border-zinc-800 pl-3 sm:pl-4">
                    <div className="h-6 sm:h-8 overflow-hidden flex items-center">
                      <span className="text-xs sm:text-base md:text-lg font-semibold tracking-wider text-white uppercase transition-all duration-500 block">
                        {titles[activeTitleIndex]}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base font-mono text-zinc-300 max-w-xl leading-relaxed font-light">
                      GNIT Graduate engineering modular systems, high-fidelity interfaces, and progressive music covers.
                    </p>
                  </div>
                </div>

                {/* Right block: Profile Picture (Side-by-side on all screens) */}
                <div className="w-[95px] min-[380px]:w-28 min-[440px]:w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96 flex-shrink-0 font-mono">
                  {/* Photo Title tag (hidden on mobile to save space) */}
                  <div className="hidden sm:flex justify-between items-center text-[9px] text-zinc-500 px-1 tracking-widest mb-2">
                    <span>[ID: SAPTAK_MONOCHROME.RAW]</span>
                    <span>106 KB // GRAYSCALE_OPT</span>
                  </div>
                  
                  <div className="relative group aspect-[3/4] w-full">
                    {/* Shadow glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-zinc-800 to-zinc-500 rounded-2xl blur-lg opacity-15 group-hover:opacity-25 transition duration-700" />
                    
                    {/* Photo container with modern camera corner focus markings */}
                    <div className="relative h-full w-full border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950/30 backdrop-blur-sm p-1 sm:p-2">
                      {/* Interactive Grayscale to Color Image */}
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Saptak Mondal professional portrait"
                        className="h-full w-full object-cover rounded-lg sm:rounded-xl filter grayscale contrast-[1.05] brightness-[0.9] group-hover:grayscale-0 group-hover:brightness-95 group-hover:scale-[1.01] transition-all duration-700 ease-out"
                      />
                      
                      {/* Tech Corner Markings */}
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40" />
                      <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40" />
                      <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40" />
                      <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Lower row: Stats & CTA Buttons */}
              <div className="space-y-6 pt-4 border-t border-white/5">
                {/* Dashboard stats style metadata */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl font-mono text-[9px] sm:text-xs text-zinc-400">
                  <div className="border border-white/5 bg-zinc-950/20 p-2.5 sm:p-5 rounded-lg sm:rounded-xl">
                    <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">/LOCATION</p>
                    <p className="text-zinc-200 font-medium text-[10px] sm:text-sm">KOLKATA, IN</p>
                  </div>
                  <div className="border border-white/5 bg-zinc-950/20 p-2.5 sm:p-5 rounded-lg sm:rounded-xl">
                    <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">/AVAILABILITY</p>
                    <p className="text-zinc-200 font-medium text-[10px] sm:text-sm">OPEN_TO_WORK</p>
                  </div>
                  <div className="border border-white/5 bg-zinc-950/20 p-2.5 sm:p-5 rounded-lg sm:rounded-xl">
                    <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">/SPECIALTIES</p>
                    <p className="text-zinc-200 font-medium text-[10px] sm:text-sm">FULL STACK & PROD</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-4 font-mono text-xs sm:text-sm tracking-wider">
                  <a 
                    href="#contact" 
                    className="bg-white text-black font-bold uppercase py-3.5 px-7 sm:py-4 sm:px-8 rounded-full border border-white hover:bg-black hover:text-white transition-all duration-300"
                  >
                    CONNECT
                  </a>
                  <a 
                    href="#projects" 
                    className="border border-white/20 hover:border-white/40 text-zinc-200 hover:text-white uppercase py-3.5 px-7 sm:py-4 sm:px-8 rounded-full transition-all duration-300 bg-zinc-950/10"
                  >
                    SCAN PROJECTS
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* ABOUT & SKILLS */}
          <section id="about" className="border-t border-white/10 pt-16 space-y-16">
            {/* About Me Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ IDENTITY</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-2">
                  ABOUT_ME<span className="text-zinc-600 animate-pulse font-mono">_</span>
                </h2>
                <div className="border border-white/5 bg-zinc-950/15 rounded-xl p-6 font-mono text-xs sm:text-sm text-zinc-400 space-y-4 backdrop-blur-sm">
                  <p className="flex justify-between"><span className="text-zinc-500 font-semibold uppercase tracking-wider">FULL_NAME:</span> <span className="text-zinc-200">Saptak Mondal</span></p>
                  <p className="flex justify-between"><span className="text-zinc-500 font-semibold uppercase tracking-wider">EDUCATION:</span> <span className="text-zinc-200 text-right">Guru Nanak Inst. of Tech</span></p>
                  <p className="flex justify-between"><span className="text-zinc-500 font-semibold uppercase tracking-wider">STREAM:</span> <span className="text-zinc-200">B.Tech CSE (Graduated)</span></p>
                  <p className="flex justify-between"><span className="text-zinc-500 font-semibold uppercase tracking-wider">PREFERENCES:</span> <span className="text-zinc-200">Remote/Hybrid/On-site</span></p>
                </div>
              </div>
              
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ BIOGRAPHY</p>
                </div>
                <p className="text-zinc-300 leading-relaxed font-light text-base sm:text-lg">
                  {currentPortfolioData.about}
                </p>
              </div>
            </div>

            {/* Technical Capabilities Bento Grid - Symmetric Layout */}
            <div className="pt-16 border-t border-white/5 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ CAPABILITIES_PORT</p>
                </div>
                <h3 className="text-2xl font-extralight tracking-tight text-white uppercase mt-2">
                  TECHNICAL_SKILLS<span className="text-zinc-650 animate-pulse font-mono">_</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {Object.entries(categorizedSkills).map(([categoryName, skillList]) => {
                  if (skillList.length === 0) return null
                  return (
                    <div key={categoryName} className="border border-white/5 bg-zinc-950/10 p-5 rounded-2xl space-y-4 backdrop-blur-sm hover:border-white/10 hover:bg-zinc-900/5 transition-all duration-300 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-300 font-mono text-xs tracking-wider font-semibold border-b border-white/5 pb-2">
                          {categoryName === "LANGUAGES" && <Code className="h-4 w-4 text-zinc-400" />}
                          {categoryName === "FRONTEND" && <Monitor className="h-4 w-4 text-zinc-400" />}
                          {categoryName === "BACKEND & DATABASES" && <Database className="h-4 w-4 text-zinc-400" />}
                          {categoryName === "DEVELOPER TOOLS" && <Terminal className="h-4 w-4 text-zinc-400" />}
                          {categoryName === "CURRENTLY LEARNING" && <Cpu className="h-4 w-4 text-zinc-400" />}
                          <span>{categoryName}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {skillList.map((skill) => (
                            <span 
                              key={skill}
                              className="bg-zinc-950/40 border border-white/10 text-zinc-200 text-xs font-mono px-3 py-1.5 rounded-lg hover:border-white/20 hover:text-white transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="border-t border-white/10 pt-16 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ SELECTED CREATIONS</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-1">
                  PROJECTS<span className="text-zinc-600 animate-pulse font-mono">_</span>
                </h2>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 bg-zinc-950/40 border border-white/5 rounded-full px-4 py-1.5 self-start sm:self-auto backdrop-blur-sm">
                LOGGED_COUNT: {currentPortfolioData.projects.length}
              </span>
            </div>

            {/* Brutalist Bento Project Grid with custom wireframes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentPortfolioData.projects.map((project: any, index: number) => (
                <div 
                  key={project._id || index}
                  onClick={() => trackProjectView(project._id)}
                  className="group bg-zinc-900/10 border border-white/5 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-sm cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-zinc-400 font-mono tracking-wider">
                      <span>[PROJECT.0{index + 1}]</span>
                      <span className="group-hover:text-white transition-colors">VIEWS: {project.views || 0}</span>
                    </div>

                    {/* Monochromatic silver layout mockup element */}
                    {renderProjectMockup(project.title)}
                    
                    <h3 className="text-xl font-semibold text-white tracking-tight uppercase group-hover:text-zinc-200 transition-colors pt-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech: string) => (
                        <span key={tech} className="text-xs bg-zinc-950/40 text-zinc-300 border border-white/10 rounded-md px-2.5 py-1 font-mono uppercase tracking-wider">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-white/5 font-mono text-xs tracking-wider">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-white hover:underline"
                      >
                        [LIVE_DEMO ↗]
                      </a>
                    )}
                    {project.repoUrl && project.repoUrl !== "#" && (
                      <a 
                        href={project.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                      >
                        [SOURCE ↗]
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ACADEMICS / EDUCATION */}
          <section id="education" className="border-t border-white/10 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ ACADEMIC FOUNDATION</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-1">
                  ACADEMICS<span className="text-zinc-600 animate-pulse font-mono">_</span>
                </h2>
                <p className="text-sm font-mono text-zinc-400">History log database timeline</p>
              </div>
              <div className="lg:col-span-8 relative py-4 pl-8 border-l border-white/10 space-y-12">
                {currentPortfolioData.education.map((edu: any, index: number) => (
                  <div key={index} className="relative group space-y-2">
                    {/* Premium polished circular timeline node */}
                    <div className="absolute -left-[36px] top-1.5 h-2.5 w-2.5 rounded-full bg-black border border-white/40 ring-4 ring-black group-hover:bg-white group-hover:border-white group-hover:ring-white/20 transition-all duration-350 shadow-[0_0_10px_rgba(0,0,0,0.8)]" />
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs tracking-wider text-zinc-300 bg-zinc-950/40 border border-white/10 px-2.5 py-1 rounded">
                        {edu.period || "SCORE: " + edu.score}
                      </span>
                      {edu.score && edu.period && (
                        <span className="font-mono text-xs tracking-wider text-zinc-400">
                          SCORE: {edu.score}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold tracking-tight text-white uppercase leading-none pt-1">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm font-mono text-zinc-400">
                      {edu.institution}
                    </h4>
                    {edu.details && (
                      <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-light pt-2">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}

                {/* Additional Certifications Box */}
                <div className="border border-white/5 bg-zinc-950/20 rounded-xl p-6 font-mono text-xs sm:text-sm text-zinc-400 space-y-3 mt-8">
                  <span className="text-zinc-500 font-semibold uppercase tracking-wider block">/ADDITIONAL CERTIFICATIONS</span>
                  <p className="text-zinc-200 font-light leading-relaxed">
                    • Advanced Data Structures and Algorithms — Coursera
                  </p>
                  <p className="text-zinc-200 font-light leading-relaxed">
                    • Advanced Approximation Algorithms — NPTEL Soft Computing Certification
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT INQUIRY */}
          <section id="contact" className="border-t border-white/10 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ SECURE_COMM_PORT</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-1">
                  CONTACT<span className="text-zinc-600 animate-pulse font-mono">_</span>
                </h2>
                <p className="text-zinc-300 text-sm md:text-base font-light leading-relaxed max-w-sm">
                  Have an interesting opportunity, collaboration, or music production request? Establish connection here and log your message directly.
                </p>
                <div className="space-y-4 font-mono text-xs sm:text-sm tracking-wider text-zinc-400 border-t border-white/5 pt-6">
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-zinc-500 font-medium">/EMAIL :</span> <a href={`mailto:${currentPortfolioData.contact.email}`}>{currentPortfolioData.contact.email}</a>
                  </p>
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-zinc-500 font-medium">/PHONE :</span> <a href="tel:+917439358307">+91 74393 58307</a>
                  </p>
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-zinc-500 font-medium">/LINKEDIN :</span> <a href={currentPortfolioData.contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN Profile</a>
                  </p>
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-zinc-500 font-medium">/GITHUB :</span> <a href={currentPortfolioData.contact.github} target="_blank" rel="noreferrer">GITHUB Profile</a>
                  </p>
                  <p className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="text-zinc-500 font-medium">/INSTAGRAM :</span> <a href={currentPortfolioData.contact.instagram} target="_blank" rel="noreferrer">INSTAGRAM Profile</a>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                {/* Premium Form with glassmorphic container and thin borders */}
                <form onSubmit={handleFormSubmit} className="relative group bg-zinc-950/20 border border-white/10 p-6 md:p-8 space-y-6 rounded-2xl backdrop-blur-sm shadow-xl">
                  {/* Decorative line */}
                  <div className="absolute -inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] font-mono text-zinc-450 mb-2">Sender Name *</label>
                      <input 
                        type="text"
                        required
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        className="w-full bg-zinc-900/30 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none transition-colors"
                        placeholder="NAME_ENTRY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] font-mono text-zinc-450 mb-2">Email Address *</label>
                      <input 
                        type="email"
                        required
                        value={formEmail}
                        onChange={e => setFormEmail(e.target.value)}
                        className="w-full bg-zinc-900/30 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none transition-colors"
                        placeholder="EMAIL_ENTRY"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] font-mono text-zinc-450 mb-2">Subject (optional)</label>
                    <input 
                      type="text"
                      value={formSubject}
                      onChange={e => setFormSubject(e.target.value)}
                      className="w-full bg-zinc-900/30 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none transition-colors"
                      placeholder="SUBJECT_ENTRY"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] font-mono text-zinc-450 mb-2">Message *</label>
                    <textarea 
                      required
                      rows={5}
                      value={formMessage}
                      onChange={e => setFormMessage(e.target.value)}
                      className="w-full bg-zinc-900/30 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none transition-colors resize-none"
                      placeholder="DETAILS_ENTRY..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-mono text-xs sm:text-sm tracking-wider font-bold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isPending ? "TRANSMITTING..." : "SEND_MESSAGE"}
                  </button>
                </form>
            </div>
          </div>
        </section>

          {/* MUSIC & COVERS SECTION */}
          <section id="music" className="border-t border-white/10 pt-16 space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-zinc-500 to-transparent" />
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">/ CREATIVE EXPRESSION</p>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase mt-1">
                  MUSIC & COVERS<span className="text-zinc-600 animate-pulse font-mono">_</span>
                </h2>
              </div>
              <a 
                href="https://www.instagram.com/offscale_._/" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-widest text-zinc-400 hover:text-white bg-zinc-950/40 border border-white/5 hover:border-white/20 rounded-full px-4 py-2 transition-all self-start sm:self-auto backdrop-blur-sm"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>FOLLOW @OFFSCALE_._</span>
              </a>
            </div>

            {/* Music Player & Tracklist Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Side: Premium Interactive Media Player */}
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl border border-white/10 bg-zinc-950/45 p-6 backdrop-blur-md shadow-2xl overflow-hidden space-y-6">
                  {/* Decorative glowing lines */}
                  <div className="absolute -inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  
                  {/* Mock Player Screen/Header */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Disc className={`h-3 w-3 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                      AUDIO_SYS: CONNECTED
                    </span>
                    <span>{tracks[currentTrackIndex].title.split(" ")[0].toUpperCase()} // ALBUM_SYS</span>
                  </div>

                  {/* Album Cover Art (Blended nicely) */}
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/60">
                    <img 
                      src={tracks[currentTrackIndex].coverUrl || "/music_cover.jpg"} 
                      alt={tracks[currentTrackIndex].title}
                      className="w-full h-full object-cover filter grayscale contrast-110 brightness-[0.45] opacity-50 group-hover:opacity-75 transition-opacity duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Visualizer overlay */}
                    <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest">OFFSCALE TRACK</span>
                        <span className="block text-sm font-semibold tracking-tight text-white">
                          {tracks[currentTrackIndex].title}
                        </span>
                      </div>
                      
                      {/* Dynamic Bouncing Wave Visualizer */}
                      <div className="flex items-end gap-1 h-8">
                        <span className={`w-0.5 bg-white/70 rounded-full h-1 ${isPlaying ? 'animate-soundwave-1' : ''}`} />
                        <span className={`w-0.5 bg-zinc-300/80 rounded-full h-1 ${isPlaying ? 'animate-soundwave-2' : ''}`} />
                        <span className={`w-0.5 bg-zinc-400/90 rounded-full h-1 ${isPlaying ? 'animate-soundwave-3' : ''}`} />
                        <span className={`w-0.5 bg-zinc-300/80 rounded-full h-1 ${isPlaying ? 'animate-soundwave-4' : ''}`} />
                        <span className={`w-0.5 bg-white/70 rounded-full h-1 ${isPlaying ? 'animate-soundwave-5' : ''}`} />
                      </div>
                    </div>
                  </div>

                  {/* Player Console (Controls) */}
                  <div className="space-y-4">
                    {/* Track Info */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        {tracks[currentTrackIndex].artist} • {tracks[currentTrackIndex].type}
                      </p>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                        {tracks[currentTrackIndex].description}
                      </p>
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-1.5">
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
                        <div 
                          className="h-full bg-white transition-all duration-500" 
                          style={{ width: `${playbackProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 tracking-wider">
                        <span>
                          {isPlaying 
                            ? formatTime(Math.floor((playbackProgress * parseDuration(tracks[currentTrackIndex].duration)) / 100))
                            : "0:00"}
                        </span>
                        <span>{tracks[currentTrackIndex].duration}</span>
                      </div>
                    </div>

                    {/* Audio system alert when playing */}
                    <div className="text-[8px] font-mono bg-zinc-900/30 border border-white/5 text-zinc-400 px-3 py-1.5 rounded-lg flex items-center justify-between">
                      <span>PREVIEW MODE // YOUTUBE REDIRECT AVAILABLE</span>
                      {isPlaying && <span className="h-1.5 w-1.5 bg-zinc-300 rounded-full animate-ping" />}
                    </div>

                    {/* Controller Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => {
                            setIsPlaying(false)
                            setCurrentTrackIndex(prev => (prev === 0 ? tracks.length - 1 : prev - 1))
                            setPlaybackProgress(0)
                            setTimeout(() => setIsPlaying(true), 50)
                          }}
                          className="text-zinc-400 hover:text-white transition-colors"
                          title="Previous Track"
                        >
                          <SkipBack className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="h-10 w-10 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                          title={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black ml-0.5" />}
                        </button>

                        <button 
                          onClick={() => {
                            setIsPlaying(false)
                            setCurrentTrackIndex(prev => (prev === tracks.length - 1 ? 0 : prev + 1))
                            setPlaybackProgress(0)
                            setTimeout(() => setIsPlaying(true), 50)
                          }}
                          className="text-zinc-400 hover:text-white transition-colors"
                          title="Next Track"
                        >
                          <SkipForward className="h-4 w-4" />
                        </button>
                      </div>

                      {/* YouTube Redirect Link Button */}
                      <a 
                        href={tracks[currentTrackIndex].youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-zinc-900 border border-white/15 hover:border-white/30 text-white text-xs font-mono px-4 py-2 rounded-full transition-all uppercase tracking-wider"
                      >
                        <span>Listen on YouTube</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Track Selector Panel */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="space-y-4 mt-8 lg:mt-0">
                  <p className="text-xs md:text-sm font-mono tracking-wider text-zinc-400 uppercase">/SELECT OFFSCALE PLAYLIST</p>
                  
                  <div className="space-y-3">
                    {tracks.map((track, idx) => (
                      <div 
                        key={track.title}
                        onClick={() => {
                          if (currentTrackIndex === idx) {
                            setIsPlaying(!isPlaying)
                          } else {
                            setIsPlaying(false)
                            setCurrentTrackIndex(idx)
                            setPlaybackProgress(0)
                            setTimeout(() => setIsPlaying(true), 50)
                          }
                        }}
                        className={`group border rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all duration-300 ${currentTrackIndex === idx ? 'bg-zinc-950/60 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.03)]' : 'bg-transparent border-white/5 hover:border-white/10 hover:bg-zinc-900/10'}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-zinc-500">0{idx + 1}.</span>
                            <span className={`text-sm sm:text-base font-semibold tracking-tight ${currentTrackIndex === idx ? 'text-white' : 'text-zinc-300 group-hover:text-zinc-200'}`}>
                              {track.title}
                            </span>
                            <span className="text-[10px] bg-zinc-900 border border-white/5 px-2 py-0.5 rounded text-zinc-400 font-mono">
                              {track.artist}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-400 font-light font-sans max-w-md">
                            {track.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-zinc-400 tracking-wider">
                            {track.duration}
                          </span>
                          
                          <a 
                            href={track.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="h-8 w-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-zinc-400 hover:text-white transition-colors bg-zinc-950/20"
                            title="Play directly on YouTube"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cover Link Callout Box */}
                <div className="mt-8 border border-white/5 bg-zinc-950/30 rounded-xl p-5 backdrop-blur-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                      <Music className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide uppercase">Cover Video Subsystem</h4>
                      <p className="text-xs text-zinc-400">Instagram cover clips & dynamic backing tracks</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed font-sans">
                    I frequently record guitar covers of progressive rock/metal songs and share them on Instagram. Dive into the complete catalogue of song covers, saxophone lines, and multi-instrument arrangements by accessing my official Instagram profile below.
                  </p>
                  <a 
                    href="https://www.instagram.com/offscale_._/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm tracking-wider text-black bg-white hover:bg-zinc-200 px-5 py-3 rounded-full transition-colors font-bold"
                  >
                    <span>LAUNCH OFFSCALE INSTAGRAM</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-zinc-950/40 py-10 px-6 mt-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] tracking-widest text-zinc-650">
            <p>&copy; {new Date().getFullYear()} {currentPortfolioData.name}. All Rights Reserved.</p>
            <div className="flex space-x-6 font-mono">
              {currentPortfolioData.contact.github !== "#" && (
                <a href={currentPortfolioData.contact.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GITHUB</a>
              )}
              <a href={currentPortfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
              {currentPortfolioData.contact.instagram && (
                <a href={currentPortfolioData.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">INSTAGRAM</a>
              )}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
