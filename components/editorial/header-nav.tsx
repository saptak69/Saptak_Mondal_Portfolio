"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Volume2, VolumeX, ArrowRight, X, Shield } from "lucide-react"

interface HeaderNavProps {
  soundEnabled: boolean
  onToggleSound: () => void
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const menuLinks = [
  { label: "Projects", href: "#work", number: "01" },
  { label: "About", href: "#about", number: "02" },
  { label: "Experience", href: "#experience", number: "03" },
  { label: "Sandbox", href: "#sandbox", number: "04" },
  { label: "Contact", href: "#contact", number: "05" },
  { label: "Resume", href: "#contact", number: "06" },
  { label: "Admin Controls", href: "/admin", number: "07" },
]

export default function HeaderNav({
  soundEnabled,
  onToggleSound,
  onPlaySound,
}: HeaderNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const toggleMenu = () => {
    onPlaySound("click")
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full bg-[#ffffff]/85 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "border-b border-[#eaeaea] shadow-sm py-3.5" : "border-b border-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: SM. Logo */}
          <a
            href="#hero"
            onClick={() => onPlaySound("blip")}
            className="group flex items-center gap-1.5 font-serif-editorial text-2xl font-semibold tracking-tight text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] rounded"
            aria-label="Saptak Mondal Home"
            data-cursor="OPEN"
          >
            <span>SM</span>
            <span className="h-2 w-2 rounded-full bg-[#ea580c] group-hover:scale-125 transition-transform" />
          </a>

          {/* Right Controls: Audio Toggle, Admin Button & Circular Menu Button */}
          <div className="flex items-center gap-3">
            
            {/* Admin Portal Button */}
            <Link
              href="/admin"
              onClick={() => onPlaySound("blip")}
              className="flex h-9 items-center gap-1.5 px-3 rounded-full border border-[#eaeaea] bg-[#ffffff] text-xs font-mono text-[#666666] hover:text-[#111111] hover:border-[#111111] transition duration-200"
              title="Admin Portal"
            >
              <Shield className="h-3.5 w-3.5 text-[#ea580c]" />
              <span className="hidden sm:inline">Admin</span>
            </Link>

            {/* Audio Toggle Button */}
            <button
              onClick={onToggleSound}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#eaeaea] bg-[#ffffff] text-[#666666] hover:text-[#111111] hover:border-[#111111] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
              title={soundEnabled ? "Tactile Audio: ON" : "Tactile Audio: OFF"}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Circular Menu Button with Three Thin Lines */}
            <button
              onClick={toggleMenu}
              data-cursor="OPEN"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-[#ffffff] transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
              aria-label="Open Navigation Overlay"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4 text-[#ffffff]" />
              ) : (
                <div className="flex flex-col gap-1 items-center justify-center group-hover:translate-y-[0.5px] transition-transform duration-200">
                  <span className="h-[1.5px] w-4 bg-[#ffffff] rounded-full transition-transform" />
                  <span className="h-[1.5px] w-4 bg-[#ffffff] rounded-full transition-transform" />
                  <span className="h-[1.5px] w-4 bg-[#ffffff] rounded-full transition-transform" />
                </div>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Overlay Navigation */}
      <div
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-50 bg-[#111111] text-[#ffffff] flex flex-col justify-between p-6 sm:p-12 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay Header */}
        <div className="flex items-center justify-between max-w-6xl mx-auto w-full border-b border-white/10 pb-6">
          <span className="font-serif-editorial text-2xl font-semibold tracking-tight text-[#ffffff]">
            SM.
          </span>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gray-400 hidden sm:inline-block uppercase tracking-widest">
              Navigation Overlay
            </span>
            <button
              onClick={toggleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-transparent text-[#ffffff] hover:bg-white hover:text-[#111111] transition duration-200"
              aria-label="Close Navigation Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Overlay Links List */}
        <div className="max-w-6xl mx-auto w-full my-auto py-8">
          <nav className="space-y-4 sm:space-y-6" aria-label="Overlay Navigation">
            {menuLinks.map((link) => {
              const isRoute = link.href.startsWith("/")
              const LinkComp = isRoute ? Link : "a"
              return (
                <LinkComp
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    onPlaySound("tap")
                    setIsMenuOpen(false)
                  }}
                  className="group flex items-center justify-between py-2 border-b border-white/5 text-3xl sm:text-5xl lg:text-6xl font-serif-editorial text-gray-300 hover:text-white transition-all duration-300"
                >
                  <div className="flex items-center gap-4 sm:gap-8 group-hover:translate-x-3 sm:group-hover:translate-x-4 transition-transform duration-300">
                    <span className="font-mono text-xs sm:text-sm text-[#0d9488] font-semibold">{link.number}</span>
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="h-6 w-6 sm:h-10 sm:w-10 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#ea580c]" />
                </LinkComp>
              )
            })}
          </nav>
        </div>

        {/* Overlay Footer */}
        <div className="max-w-6xl mx-auto w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-gray-400 gap-4">
          <div>
            <span>Saptak Mondal &bull; Kolkata, IN</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/saptak69" target="_blank" rel="noreferrer" className="hover:text-white transition">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/saptak-mondal-448b8b40b" target="_blank" rel="noreferrer" className="hover:text-white transition">
              LinkedIn ↗
            </a>
          </div>
        </div>

      </div>
    </>
  )
}
