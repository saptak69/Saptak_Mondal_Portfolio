"use client"

import { useState } from "react"
import { loginAdmin } from "@/lib/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, ArrowLeft, KeyRound, User } from "lucide-react"

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
    <div className="min-h-screen bg-[#fbfaf7] text-[#111111] font-sans flex flex-col items-center justify-center px-4 relative selection:bg-[#111111] selection:text-[#fbfaf7]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e6e4dc_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#ffffff] border border-[#e6e4dc] rounded-2xl p-8 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all">
          
          {/* Header & Logo */}
          <div className="mb-8 text-center space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-serif-editorial text-3xl font-semibold tracking-tight text-[#111111] hover:opacity-80 transition-opacity"
            >
              <span>SM</span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ea580c]" />
            </Link>
            
            <div>
              <h1 className="text-2xl font-serif-editorial font-bold text-[#111111]">
                System Control Room
              </h1>
              <p className="text-[#666666] text-xs font-mono mt-1">
                Enter authorized credentials to proceed
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-red-600 text-xs font-medium text-center animate-fadeIn">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#999999]" />
                <input
                  type="text"
                  name="username"
                  required
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#111111] placeholder-[#999999] focus:outline-none transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#666666] text-xs font-mono uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-[#999999]" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-[#ffffff] border border-[#e6e4dc] focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#111111] placeholder-[#999999] focus:outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Shield className="h-4 w-4" />
              {loading ? "ESTABLISHING CONNECTION..." : "Authenticate Control"}
            </button>
          </form>

          {/* Footer return link */}
          <div className="mt-8 pt-6 border-t border-[#f0eee6] text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#666666] hover:text-[#111111] font-mono transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Portfolio Site</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
