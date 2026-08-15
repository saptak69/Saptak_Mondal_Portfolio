"use client"

import React, { useState, useTransition } from "react"
import { Copy, Check, ArrowUpRight } from "lucide-react"
import { createContactMessage } from "@/lib/actions"
import { toast } from "sonner"

interface ContactSectionProps {
  email: string
  linkedinUrl: string
  githubUrl: string
  copiedEmail: boolean
  onCopyEmail: () => void
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

export default function ContactSection({
  email,
  linkedinUrl,
  githubUrl,
  copiedEmail,
  onCopyEmail,
  onPlaySound,
}: ContactSectionProps) {
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formSubject, setFormSubject] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formMessage) {
      toast.error("Please fill in all required fields (Name, Email, Message)")
      return
    }

    onPlaySound("click")
    startTransition(async () => {
      try {
        const res = await createContactMessage({
          name: formName,
          email: formEmail,
          subject: formSubject || "Editorial Portfolio Transmission",
          message: formMessage,
        })
        if (res.success) {
          onPlaySound("blip")
          toast.success("Message dispatched successfully! Saptak will get back to you shortly.")
          setFormName("")
          setFormEmail("")
          setFormSubject("")
          setFormMessage("")
        } else {
          toast.error("Failed to dispatch message. Please email directly.")
        }
      } catch (err) {
        console.error(err)
        toast.error("Transmission error. Please email saptakmondal.official@gmail.com")
      }
    })
  }

  return (
    <section id="contact" className="py-20 border-b border-[#e6e4dc]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Editorial Ending Statement */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#0d9488] font-semibold">
                  06 • GET IN TOUCH
                </span>
              </div>
              <h2 className="font-serif-editorial text-4xl sm:text-5xl font-normal text-[#111111] leading-tight">
                Got an interesting idea? <br />
                <span className="italic text-[#ea580c]">Let&apos;s build something.</span>
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed font-sans pt-2">
                Whether you have a full-stack engineering role, a technical architecture collaboration, or simply wish to connect over distributed systems and progressive rock — dispatch a message or reach out directly.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs pt-4">
              <button
                onClick={onCopyEmail}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#0d9488] transition text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d9488]"
              >
                <div>
                  <span className="text-[#888888] block text-[10px]">EMAIL ADDRESS</span>
                  <span className="text-[#0d9488] font-semibold break-all sm:break-normal">{email}</span>
                </div>
                {copiedEmail ? <Check className="h-4 w-4 text-[#0d9488]" /> : <Copy className="h-4 w-4 text-[#888888]" />}
              </button>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-[#e6e4dc] bg-[#ffffff] hover:border-[#ea580c] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]"
              >
                <div>
                  <span className="text-[#888888] block text-[10px]">LINKEDIN</span>
                  <span className="text-[#111111] font-medium">/in/saptak-mondal</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#ea580c]" />
              </a>
            </div>
          </div>

          {/* Right Column: Dispatch Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 sm:p-8 shadow-sm">
              <h3 className="font-mono text-xs uppercase text-[#888888] mb-6">
                DISPATCH DIRECT MESSAGE
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[#666666] block">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full rounded-lg border border-[#e6e4dc] bg-[#fbfaf7] px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:border-[#0d9488] focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[#666666] block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-lg border border-[#e6e4dc] bg-[#fbfaf7] px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:border-[#0d9488] focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[#666666] block">Subject (Optional)</label>
                  <input
                    type="text"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="Software Engineering Opportunity / Project Discussion"
                    className="w-full rounded-lg border border-[#e6e4dc] bg-[#fbfaf7] px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:border-[#0d9488] focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#666666] block">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Share your message, project specifications, or questions..."
                    className="w-full rounded-lg border border-[#e6e4dc] bg-[#fbfaf7] px-3.5 py-2.5 text-[#111111] placeholder:text-[#999999] focus:border-[#0d9488] focus:outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-xl border border-[#ea580c] bg-[#ea580c] py-3 text-white font-medium hover:bg-[#c2410c] hover:border-[#c2410c] transition duration-200 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]"
                >
                  {isPending ? "Transmitting..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
