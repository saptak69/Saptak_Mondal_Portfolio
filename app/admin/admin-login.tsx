"use client"

import { useState } from "react"
import { loginAdmin } from "@/lib/actions"
import { useRouter } from "next/navigation"

export default function AdminLoginClient() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const res = await loginAdmin(null, formData)
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    } else {
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.5px)] bg-[size:18px_18px] opacity-35 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl blur opacity-30" />
        
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-widest font-['Press_Start_2P',_sans-serif] uppercase text-red-500">
              SYS_ADMIN
            </h1>
            <p className="text-zinc-500 text-sm mt-2">Enter credentials to establish connection</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-950/50 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-500 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
            >
              {loading ? "ESTABLISHING..." : "LOGIN_"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
