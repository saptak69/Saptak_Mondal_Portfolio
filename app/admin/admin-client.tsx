"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
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
  LogOut, Globe, FolderKanban, BookOpen, Cpu, X, 
  ExternalLink, Calendar, Award, MessageSquare, Check, RefreshCw
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
      toast.success("Disconnected successfully")
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
    <div className="min-h-screen bg-black text-zinc-100 font-sans pb-20">
      <Toaster theme="dark" position="top-right" closeButton />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1.5px)] bg-[size:18px_18px] opacity-30 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-lg font-bold tracking-widest font-['Press_Start_2P',_sans-serif] uppercase text-zinc-100">
              DASHBOARD_
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push("/")}
              className="text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1"
            >
              Live Site <ExternalLink className="h-3 w-3" />
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-400 hover:text-red-300 font-semibold text-xs px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 relative z-10">
        {/* Metric Cards (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 text-zinc-800"><Eye className="h-10 w-10" /></div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total Views</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 font-mono">{initialAnalytics.totalViews}</h3>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 text-zinc-800"><Users className="h-10 w-10" /></div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Unique Visitors</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 font-mono">{initialAnalytics.uniqueViews}</h3>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute right-4 top-4 text-zinc-800"><Mail className="h-10 w-10" /></div>
            <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Contact Inquiries</p>
            <h3 className="text-3xl font-extrabold text-white mt-2 font-mono">{initialAnalytics.messages.length}</h3>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-900 space-x-8 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("analytics")}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "analytics" ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Analytics & Messages
            {activeTab === "analytics" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "projects" ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Projects ({initialPortfolio.projects.length})
            {activeTab === "projects" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
          <button 
            onClick={() => setActiveTab("skills")}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "skills" ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Skills ({initialPortfolio.skills.length})
            {activeTab === "skills" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
          <button 
            onClick={() => setActiveTab("education")}
            className={`pb-4 text-sm font-semibold tracking-wider uppercase transition-colors relative cursor-pointer ${
              activeTab === "education" ? "text-red-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Education ({initialPortfolio.education.length})
            {activeTab === "education" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />}
          </button>
        </div>

        {/* Tab Contents */}
        
        {/* --- ANALYTICS TAB --- */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Grid for graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Views */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
                <h3 className="text-md font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="h-4.5 w-4.5 text-red-500" /> Project View Metrics
                </h3>
                {initialAnalytics.projectViews.length === 0 ? (
                  <p className="text-zinc-600 text-sm py-4">No projects registered yet.</p>
                ) : (
                  <div className="space-y-4">
                    {initialAnalytics.projectViews.map((p) => {
                      const maxViews = Math.max(...initialAnalytics.projectViews.map(pv => pv.views), 1)
                      const pct = Math.min(100, Math.max(5, (p.views / maxViews) * 100))
                      return (
                        <div key={p.title} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-300 font-semibold">{p.title}</span>
                            <span className="text-zinc-500 font-mono">{p.views} views</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Country Views */}
              <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
                <h3 className="text-md font-bold mb-6 flex items-center gap-2">
                  <Globe className="h-4.5 w-4.5 text-red-500" /> Visitor Geolocation Distribution
                </h3>
                {initialAnalytics.countries.length === 0 ? (
                  <p className="text-zinc-600 text-sm py-4">Waiting for incoming traffic logs...</p>
                ) : (
                  <div className="space-y-4">
                    {initialAnalytics.countries.map((c) => {
                      const maxVal = Math.max(...initialAnalytics.countries.map(co => co.value), 1)
                      const pct = (c.value / maxVal) * 100
                      return (
                        <div key={c.name} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-300 font-semibold">{c.name}</span>
                            <span className="text-zinc-500 font-mono">{c.value} unique</span>
                          </div>
                          <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Messages Inbox */}
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
              <h3 className="text-md font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-4.5 w-4.5 text-red-500" /> Received contact inquiries ({initialAnalytics.messages.length})
              </h3>
              {initialAnalytics.messages.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-zinc-900 rounded-xl">
                  <Mail className="h-8 w-8 text-zinc-800 mx-auto mb-2" />
                  <p className="text-zinc-600 text-sm">Inbox is empty. No messages submitted yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {initialAnalytics.messages.map((m) => (
                    <div key={m._id} className="border border-zinc-900 bg-zinc-950 hover:bg-zinc-900/30 p-5 rounded-lg transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <div>
                          <h4 className="font-bold text-white text-sm">{m.name}</h4>
                          <a href={`mailto:${m.email}`} className="text-red-400 hover:text-red-300 text-xs transition-colors">{m.email}</a>
                        </div>
                        <span className="text-[10px] text-zinc-600 font-mono">{new Date(m.createdAt).toLocaleString()}</span>
                      </div>
                      {m.subject && <h5 className="font-semibold text-zinc-300 text-xs uppercase tracking-wider mb-2">Subj: {m.subject}</h5>}
                      <p className="text-zinc-400 text-sm whitespace-pre-wrap leading-relaxed mt-2 p-3 bg-zinc-900/50 border border-zinc-900 rounded">
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
              <h3 className="text-md font-bold text-zinc-400">Registered Projects</h3>
              <button 
                onClick={() => setProjectModal({ open: true, editMode: false })}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                <Plus className="h-4 w-4" /> Add Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {initialPortfolio.projects.map((p) => (
                <div key={p._id} className="border border-zinc-900 bg-zinc-950 p-5 rounded-xl flex flex-col justify-between hover:border-zinc-800 transition-colors">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h4 className="font-bold text-lg text-white">{p.title}</h4>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => setProjectModal({ open: true, editMode: true, data: p })}
                          className="p-1.5 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white rounded transition-all cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteProject(p._id!)}
                          className="p-1.5 hover:bg-red-950/20 border border-transparent hover:border-red-900/50 text-zinc-500 hover:text-red-400 rounded transition-all cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.technologies.map(t => (
                        <span key={t} className="text-[10px] bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-xs text-zinc-500">
                    <span className="font-mono">Views: {p.views || 0}</span>
                    <div className="flex space-x-4">
                      {p.liveUrl !== "#" && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-300">Live <ExternalLink className="h-3 w-3" /></a>}
                      {p.repoUrl !== "#" && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-300">Repo <ExternalLink className="h-3 w-3" /></a>}
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
            <h3 className="text-md font-bold text-zinc-400">Core Capabilities</h3>
            
            <form onSubmit={handleAddSkill} className="flex gap-3">
              <input
                type="text"
                value={newSkillText}
                onChange={e => setNewSkillText(e.target.value)}
                placeholder="Type a new skill (e.g. Docker, AWS, NestJS)"
                className="flex-1 bg-zinc-950 border border-zinc-900 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700"
              />
              <button 
                type="submit"
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition-all flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </form>

            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-xl">
              <div className="flex flex-wrap gap-2.5">
                {initialPortfolio.skills.map((s) => (
                  <div 
                    key={s} 
                    className="flex items-center bg-zinc-900 hover:bg-red-950/20 border border-zinc-800 hover:border-red-900/50 px-3 py-1.5 rounded-full text-xs text-zinc-300 hover:text-red-400 transition-all group"
                  >
                    <span>{s}</span>
                    <button 
                      onClick={() => handleDeleteSkill(s)}
                      className="ml-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
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
              <h3 className="text-md font-bold text-zinc-400">Academic Background</h3>
              <button 
                onClick={() => setEducationModal({ open: true, editMode: false })}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)]"
              >
                <Plus className="h-4 w-4" /> Add Education
              </button>
            </div>

            <div className="space-y-4">
              {initialPortfolio.education.map((e) => (
                <div key={e._id} className="border border-zinc-900 bg-zinc-950 p-5 rounded-xl hover:border-zinc-800 transition-colors flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-md">{e.degree}</h4>
                    <p className="text-red-400 text-sm font-semibold">{e.institution}</p>
                    {e.period && <p className="text-xs text-zinc-500 flex items-center gap-1 font-mono mt-1"><Calendar className="h-3 w-3" /> {e.period}</p>}
                    {e.score && <p className="text-xs text-zinc-400 flex items-center gap-1 font-mono"><Award className="h-3 w-3" /> Score: {e.score}</p>}
                    {e.details && <p className="text-zinc-400 text-sm mt-3 pt-3 border-t border-zinc-900">{e.details}</p>}
                  </div>
                  
                  <div className="flex space-x-1 shrink-0 self-end md:self-auto">
                    <button 
                      onClick={() => setEducationModal({ open: true, editMode: true, data: e })}
                      className="p-1.5 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white rounded transition-all cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEducation(e._id!)}
                      className="p-1.5 hover:bg-red-950/20 border border-transparent hover:border-red-900/50 text-zinc-500 hover:text-red-400 rounded transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900">
              <h3 className="font-bold text-white text-md">
                {projectModal.editMode ? "EDIT_PROJECT" : "CREATE_NEW_PROJECT"}
              </h3>
              <button onClick={() => setProjectModal(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveProject} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Project Title</label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={projectModal.data?.title || ""} 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="e.g. Next-Level Portfolio"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={projectModal.data?.description || ""} 
                  required 
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="Explain what the project does..."
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Technologies (comma-separated)</label>
                <input 
                  type="text" 
                  name="technologies" 
                  defaultValue={projectModal.data?.technologies.join(", ") || ""} 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="React, Next.js, Tailwind CSS, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Live Demo URL</label>
                  <input 
                    type="text" 
                    name="liveUrl" 
                    defaultValue={projectModal.data?.liveUrl || ""} 
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Source Code URL</label>
                  <input 
                    type="text" 
                    name="repoUrl" 
                    defaultValue={projectModal.data?.repoUrl || ""} 
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-900 flex justify-end space-x-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setProjectModal(null)} 
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] disabled:opacity-50"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl w-full max-w-xl shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-900">
              <h3 className="font-bold text-white text-md">
                {educationModal.editMode ? "EDIT_EDUCATION" : "CREATE_EDUCATION_RECORD"}
              </h3>
              <button onClick={() => setEducationModal(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors"><X className="h-5 w-5" /></button>
            </div>
            
            <form onSubmit={saveEducation} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Degree / Certificate</label>
                <input 
                  type="text" 
                  name="degree" 
                  defaultValue={educationModal.data?.degree || ""} 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="e.g. B.Tech in Computer Science"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Institution Name</label>
                <input 
                  type="text" 
                  name="institution" 
                  defaultValue={educationModal.data?.institution || ""} 
                  required 
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="e.g. Harvard University"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Period (Years)</label>
                  <input 
                    type="text" 
                    name="period" 
                    defaultValue={educationModal.data?.period || ""} 
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                    placeholder="e.g. 2022 - 2026"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Score / GPA (optional)</label>
                  <input 
                    type="text" 
                    name="score" 
                    defaultValue={educationModal.data?.score || ""} 
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                    placeholder="e.g. 88% or 3.9 GPA"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Additional details / accomplishments</label>
                <textarea 
                  name="details" 
                  defaultValue={educationModal.data?.details || ""} 
                  rows={3}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none placeholder-zinc-700" 
                  placeholder="List coursework, clubs, projects, or context..."
                />
              </div>

              <div className="pt-4 border-t border-zinc-900 flex justify-end space-x-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setEducationModal(null)} 
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] disabled:opacity-50"
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
