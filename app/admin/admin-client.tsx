"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  logoutAdmin, 
  createProject, 
  updateProject, 
  deleteProject,
  addSkill,
  deleteSkillByName,
  createEducation,
  updateEducation,
  deleteEducation
} from "@/lib/actions"
import { 
  BarChart3, Eye, Users, Mail, Plus, Edit2, Trash2, 
  LogOut, Globe, X, 
  ExternalLink, Calendar, Award, MessageSquare, Shield, Check
} from "lucide-react"
import { toast, Toaster } from "sonner"

interface ProjectData {
  _id?: string
  title: string
  description: string
  technologies: string[]
  liveUrl: string
  repoUrl: string
  views?: number
}

interface EducationData {
  _id?: string
  degree: string
  institution: string
  period?: string
  score?: string
  details?: string
}

interface AnalyticsData {
  totalViews: number
  uniqueViews: number
  countries: { name: string; value: number }[]
  projectViews: { title: string; views: number }[]
  messages: any[]
}

interface AdminDashboardClientProps {
  initialPortfolio: {
    projects: ProjectData[]
    skills: string[]
    education: EducationData[]
  }
  initialAnalytics: AnalyticsData
}

export default function AdminDashboardClient({ initialPortfolio, initialAnalytics }: AdminDashboardClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<"analytics" | "projects" | "skills" | "education">("analytics")
  
  // Modals
  const [projectModal, setProjectModal] = useState<{ open: boolean; editMode: boolean; data?: ProjectData } | null>(null)
  const [educationModal, setEducationModal] = useState<{ open: boolean; editMode: boolean; data?: EducationData } | null>(null)
  
  // Skill Input
  const [newSkillText, setNewSkillText] = useState("")

  const handleLogout = async () => {
    const res = await logoutAdmin()
    if (res.success) {
      toast.success("Session disconnected successfully")
      router.refresh()
    }
  }

  // --- Project CRUD Actions ---
  const saveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const projectData = {
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      technologies: (formData.get("technologies")?.toString() || "").split(",").map(t => t.trim()).filter(Boolean),
      liveUrl: formData.get("liveUrl")?.toString() || "#",
      repoUrl: formData.get("repoUrl")?.toString() || "#",
    }

    startTransition(async () => {
      try {
        if (projectModal?.editMode && projectModal.data?._id) {
          const res = await updateProject(projectModal.data._id, projectData)
          if (res.success) toast.success("Project updated successfully")
        } else {
          const res = await createProject(projectData)
          if (res.success) toast.success("Project added successfully")
        }
        setProjectModal(null)
        router.refresh()
      } catch (err: any) {
        toast.error(err.message || "Failed to save project")
      }
    })
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    startTransition(async () => {
      try {
        const res = await deleteProject(id)
        if (res.success) {
          toast.success("Project deleted successfully")
          router.refresh()
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to delete project")
      }
    })
  }

  // --- Skill CRUD Actions ---
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkillText.trim()) return
    
    const skillName = newSkillText.trim()
    setNewSkillText("")
    
    startTransition(async () => {
      try {
        const res = await addSkill(skillName)
        if (res.success) {
          toast.success(`Skill "${skillName}" added`)
          router.refresh()
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to add skill")
      }
    })
  }

  const handleDeleteSkill = async (name: string) => {
    if (!confirm(`Delete skill "${name}"?`)) return
    startTransition(async () => {
      try {
        const res = await deleteSkillByName(name)
        if (res.success) {
          toast.success(`Skill "${name}" deleted`)
          router.refresh()
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to delete skill")
      }
    })
  }

  // --- Education CRUD Actions ---
  const saveEducation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const eduData = {
      degree: formData.get("degree")?.toString() || "",
      institution: formData.get("institution")?.toString() || "",
      period: formData.get("period")?.toString() || "",
      score: formData.get("score")?.toString() || "",
      details: formData.get("details")?.toString() || "",
    }

    startTransition(async () => {
      try {
        if (educationModal?.editMode && educationModal.data?._id) {
          const res = await updateEducation(educationModal.data._id, eduData)
          if (res.success) toast.success("Education record updated")
        } else {
          const res = await createEducation(eduData)
          if (res.success) toast.success("Education record added")
        }
        setEducationModal(null)
        router.refresh()
      } catch (err: any) {
        toast.error(err.message || "Failed to save education")
      }
    })
  }

  const handleDeleteEducation = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education record?")) return
    startTransition(async () => {
      try {
        const res = await deleteEducation(id)
        if (res.success) {
          toast.success("Education record deleted")
          router.refresh()
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to delete education")
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#111111] font-sans pb-24 relative selection:bg-[#111111] selection:text-[#fbfaf7]">
      <Toaster theme="light" position="top-right" closeButton />
      <div className="absolute inset-0 bg-[radial-gradient(#e6e4dc_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      
      {/* Header Bar */}
      <header className="border-b border-[#e6e4dc] bg-[#ffffff]/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 font-serif-editorial text-2xl font-semibold tracking-tight text-[#111111]"
            >
              <span>SM</span>
              <span className="h-2 w-2 rounded-full bg-[#ea580c]" />
            </Link>
            <span className="text-[#e6e4dc]">|</span>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#ea580c]" />
              <h1 className="text-sm font-mono tracking-widest uppercase font-semibold text-[#111111]">
                System Control Room
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="text-xs font-mono bg-[#ffffff] hover:bg-[#fbfaf7] border border-[#e6e4dc] text-[#666666] hover:text-[#111111] px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
            >
              <span>Live Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-mono text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 mt-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888]">
            ADMINISTRATION &bull; DASHBOARD
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-semibold text-[#111111] mt-1">
            Portfolio Content & Telemetry
          </h2>
        </div>

        {/* Metric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute right-4 top-4 text-[#ea580c]/10"><Eye className="h-12 w-12 text-[#ea580c]" /></div>
            <p className="text-[#888888] text-xs font-mono uppercase tracking-wider">Total Views</p>
            <h3 className="text-4xl font-serif-editorial font-bold text-[#111111] mt-2 font-mono">{initialAnalytics.totalViews}</h3>
          </div>
          <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute right-4 top-4 text-[#0d9488]/10"><Users className="h-12 w-12 text-[#0d9488]" /></div>
            <p className="text-[#888888] text-xs font-mono uppercase tracking-wider">Unique Visitors</p>
            <h3 className="text-4xl font-serif-editorial font-bold text-[#111111] mt-2 font-mono">{initialAnalytics.uniqueViews}</h3>
          </div>
          <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <div className="absolute right-4 top-4 text-[#ea580c]/10"><Mail className="h-12 w-12 text-[#ea580c]" /></div>
            <p className="text-[#888888] text-xs font-mono uppercase tracking-wider">Contact Inquiries</p>
            <h3 className="text-4xl font-serif-editorial font-bold text-[#111111] mt-2 font-mono">{initialAnalytics.messages.length}</h3>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#e6e4dc] space-x-8 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`pb-4 text-xs font-mono font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "analytics" ? "text-[#ea580c]" : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            Analytics & Messages
            {activeTab === "analytics" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`pb-4 text-xs font-mono font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "projects" ? "text-[#ea580c]" : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            Projects ({initialPortfolio.projects.length})
            {activeTab === "projects" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
          <button 
            onClick={() => setActiveTab("skills")}
            className={`pb-4 text-xs font-mono font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "skills" ? "text-[#ea580c]" : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            Skills ({initialPortfolio.skills.length})
            {activeTab === "skills" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
          <button 
            onClick={() => setActiveTab("education")}
            className={`pb-4 text-xs font-mono font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "education" ? "text-[#ea580c]" : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            Education ({initialPortfolio.education.length})
            {activeTab === "education" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ea580c]" />}
          </button>
        </div>

        {/* Tab Contents */}
        
        {/* --- ANALYTICS TAB --- */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Views */}
              <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-mono uppercase tracking-wider font-semibold mb-6 flex items-center gap-2 text-[#111111]">
                  <BarChart3 className="h-4.5 w-4.5 text-[#ea580c]" /> Project View Metrics
                </h3>
                {initialAnalytics.projectViews.length === 0 ? (
                  <p className="text-[#888888] text-xs font-mono py-4">No projects registered yet.</p>
                ) : (
                  <div className="space-y-4">
                    {initialAnalytics.projectViews.map((p) => {
                      const maxViews = Math.max(...initialAnalytics.projectViews.map(pv => pv.views), 1)
                      const pct = Math.min(100, Math.max(5, (p.views / maxViews) * 100))
                      return (
                        <div key={p.title} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[#111111] font-semibold">{p.title}</span>
                            <span className="text-[#888888]">{p.views} views</span>
                          </div>
                          <div className="h-2 bg-[#f0eee6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#ea580c] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Country Views */}
              <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl shadow-sm">
                <h3 className="text-sm font-mono uppercase tracking-wider font-semibold mb-6 flex items-center gap-2 text-[#111111]">
                  <Globe className="h-4.5 w-4.5 text-[#0d9488]" /> Visitor Geolocation Distribution
                </h3>
                {initialAnalytics.countries.length === 0 ? (
                  <p className="text-[#888888] text-xs font-mono py-4">Waiting for incoming traffic telemetry...</p>
                ) : (
                  <div className="space-y-4">
                    {initialAnalytics.countries.map((c) => {
                      const maxVal = Math.max(...initialAnalytics.countries.map(co => co.value), 1)
                      const pct = (c.value / maxVal) * 100
                      return (
                        <div key={c.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[#111111] font-semibold">{c.name}</span>
                            <span className="text-[#888888]">{c.value} unique</span>
                          </div>
                          <div className="h-2 bg-[#f0eee6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0d9488] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Messages Inbox */}
            <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl shadow-sm">
              <h3 className="text-sm font-mono uppercase tracking-wider font-semibold mb-6 flex items-center gap-2 text-[#111111]">
                <MessageSquare className="h-4.5 w-4.5 text-[#ea580c]" /> Received Inquiries ({initialAnalytics.messages.length})
              </h3>
              {initialAnalytics.messages.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-[#e6e4dc] rounded-xl">
                  <Mail className="h-8 w-8 text-[#cccccc] mx-auto mb-2" />
                  <p className="text-[#888888] text-xs font-mono">Inbox is clear. No messages submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {initialAnalytics.messages.map((m) => (
                    <div key={m._id} className="border border-[#e6e4dc] bg-[#fbfaf7] p-5 rounded-xl transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-[#111111] text-sm">{m.name}</h4>
                          <a href={`mailto:${m.email}`} className="text-[#ea580c] hover:underline text-xs transition-colors font-mono">{m.email}</a>
                        </div>
                        <span className="text-[11px] text-[#888888] font-mono">{new Date(m.createdAt).toLocaleString()}</span>
                      </div>
                      {m.subject && <h5 className="font-mono text-xs text-[#666666] uppercase tracking-wider mb-2">Subject: {m.subject}</h5>}
                      <p className="text-[#333333] text-sm whitespace-pre-wrap leading-relaxed mt-2 p-3 bg-[#ffffff] border border-[#e6e4dc] rounded-lg">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === "projects" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#666666]">Registered Portfolio Projects</h3>
              <button 
                onClick={() => setProjectModal({ open: true, editMode: false })}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialPortfolio.projects.map((p) => (
                <div key={p._id} className="border border-[#e6e4dc] bg-[#ffffff] p-6 rounded-2xl flex flex-col justify-between hover:border-[#111111]/30 transition-all shadow-sm">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-serif-editorial font-bold text-xl text-[#111111]">{p.title}</h4>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setProjectModal({ open: true, editMode: true, data: p })}
                          className="p-1.5 hover:bg-[#f0eee6] border border-transparent text-[#666666] hover:text-[#111111] rounded-lg transition-all cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(p._id!)}
                          className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#555555] text-sm leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.technologies.map(t => (
                        <span key={t} className="text-[10px] bg-[#f0eee6] text-[#444444] px-2.5 py-1 rounded-full font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#f0eee6] text-xs text-[#888888] font-mono">
                    <span>Views: {p.views || 0}</span>
                    <div className="flex space-x-4">
                      {p.liveUrl !== "#" && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#ea580c] transition-colors">Live <ExternalLink className="h-3 w-3" /></a>}
                      {p.repoUrl !== "#" && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#111111] transition-colors">Repo <ExternalLink className="h-3 w-3" /></a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SKILLS TAB --- */}
        {activeTab === "skills" && (
          <div className="space-y-6 max-w-3xl animate-fadeIn">
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#666666]">Core Technical Capabilities</h3>
            
            <form onSubmit={handleAddSkill} className="flex gap-3">
              <input
                type="text"
                value={newSkillText}
                onChange={e => setNewSkillText(e.target.value)}
                placeholder="Type a new skill (e.g. Docker, AWS, System Design)"
                className="flex-1 bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]"
              />
              <button 
                type="submit"
                className="bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>

            <div className="bg-[#ffffff] border border-[#e6e4dc] p-6 rounded-2xl shadow-sm">
              <div className="flex flex-wrap gap-2.5">
                {initialPortfolio.skills.map((s) => (
                  <div 
                    key={s} 
                    className="flex items-center bg-[#f0eee6] border border-[#e6e4dc] px-3.5 py-1.5 rounded-full text-xs font-mono text-[#333333] hover:border-[#ea580c] transition-all group"
                  >
                    <span>{s}</span>
                    <button 
                      onClick={() => handleDeleteSkill(s)}
                      className="ml-2 text-[#888888] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- EDUCATION TAB --- */}
        {activeTab === "education" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#666666]">Academic Background</h3>
              <button 
                onClick={() => setEducationModal({ open: true, editMode: false })}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold text-xs px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="h-4 w-4" /> Add Education Record
              </button>
            </div>

            <div className="space-y-4">
              {initialPortfolio.education.map((e) => (
                <div key={e._id} className="border border-[#e6e4dc] bg-[#ffffff] p-6 rounded-2xl hover:border-[#111111]/30 transition-all shadow-sm flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-serif-editorial font-bold text-xl text-[#111111]">{e.degree}</h4>
                    <p className="text-[#ea580c] text-sm font-semibold">{e.institution}</p>
                    {e.period && <p className="text-xs text-[#888888] flex items-center gap-1 font-mono mt-1"><Calendar className="h-3 w-3" /> {e.period}</p>}
                    {e.score && <p className="text-xs text-[#555555] flex items-center gap-1 font-mono"><Award className="h-3 w-3 text-[#ea580c]" /> Score: {e.score}</p>}
                    {e.details && <p className="text-[#555555] text-sm mt-3 pt-3 border-t border-[#f0eee6]">{e.details}</p>}
                  </div>
                  
                  <div className="flex space-x-1 shrink-0 self-end md:self-auto">
                    <button 
                      onClick={() => setEducationModal({ open: true, editMode: true, data: e })}
                      className="p-1.5 hover:bg-[#f0eee6] border border-transparent text-[#666666] hover:text-[#111111] rounded-lg transition-all cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEducation(e._id!)}
                      className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- PROJECT FORM MODAL --- */}
      {projectModal?.open && (
        <div className="fixed inset-0 z-50 bg-[#111111]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#e6e4dc] rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6e4dc]">
              <h3 className="font-serif-editorial font-bold text-[#111111] text-lg">
                {projectModal.editMode ? "Edit Portfolio Project" : "Create New Project"}
              </h3>
              <button onClick={() => setProjectModal(null)} className="text-[#888888] hover:text-[#111111] transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveProject} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={projectModal.data?.title || ""} 
                  required 
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="e.g. Mangrove"
                />
              </div>

              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={projectModal.data?.description || ""} 
                  required 
                  rows={4}
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="Explain system problem, architectural solution, and features..."
                />
              </div>

              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Technologies (comma-separated)</label>
                <input 
                  type="text" 
                  name="technologies" 
                  defaultValue={projectModal.data?.technologies.join(", ") || ""} 
                  required 
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="React, Next.js, Tailwind CSS, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Live Demo URL</label>
                  <input 
                    type="text" 
                    name="liveUrl" 
                    defaultValue={projectModal.data?.liveUrl || ""} 
                    className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Source Code URL</label>
                  <input 
                    type="text" 
                    name="repoUrl" 
                    defaultValue={projectModal.data?.repoUrl || ""} 
                    className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#e6e4dc] flex justify-end space-x-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setProjectModal(null)} 
                  className="bg-[#ffffff] hover:bg-[#f0eee6] border border-[#e6e4dc] text-[#666666] hover:text-[#111111] font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-sm disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EDUCATION FORM MODAL --- */}
      {educationModal?.open && (
        <div className="fixed inset-0 z-50 bg-[#111111]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#e6e4dc] rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e6e4dc]">
              <h3 className="font-serif-editorial font-bold text-[#111111] text-lg">
                {educationModal.editMode ? "Edit Education Record" : "Create Education Record"}
              </h3>
              <button onClick={() => setEducationModal(null)} className="text-[#888888] hover:text-[#111111] transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveEducation} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Degree / Certificate</label>
                <input 
                  type="text" 
                  name="degree" 
                  defaultValue={educationModal.data?.degree || ""} 
                  required 
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="e.g. B.Tech in Computer Science Engineering"
                />
              </div>

              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Institution Name</label>
                <input 
                  type="text" 
                  name="institution" 
                  defaultValue={educationModal.data?.institution || ""} 
                  required 
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="e.g. Guru Nanak Institute of Technology"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Period (Years)</label>
                  <input 
                    type="text" 
                    name="period" 
                    defaultValue={educationModal.data?.period || ""} 
                    className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                    placeholder="e.g. 2022 - 2026"
                  />
                </div>
                <div>
                  <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Score / GPA (optional)</label>
                  <input 
                    type="text" 
                    name="score" 
                    defaultValue={educationModal.data?.score || ""} 
                    className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                    placeholder="e.g. 88% or 3.9 GPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">Additional Details / Accomplishments</label>
                <textarea 
                  name="details" 
                  defaultValue={educationModal.data?.details || ""} 
                  rows={3}
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl px-4 py-2.5 text-sm text-[#111111] focus:outline-none placeholder-[#999999]" 
                  placeholder="List coursework, distinction, software projects..."
                />
              </div>

              <div className="pt-4 border-t border-[#e6e4dc] flex justify-end space-x-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setEducationModal(null)} 
                  className="bg-[#ffffff] hover:bg-[#f0eee6] border border-[#e6e4dc] text-[#666666] hover:text-[#111111] font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all shadow-sm disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
