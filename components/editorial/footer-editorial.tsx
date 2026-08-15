"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function FooterEditorial() {
  return (
    <footer className="py-20 bg-[#ffffff] border-t border-[#e6e4dc]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Large Typography Statement */}
        <div className="space-y-4 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888]">
            COLLABORATION &bull; CONTACT
          </span>
          <h2 className="font-serif-editorial text-4xl sm:text-6xl font-normal text-[#111111] leading-tight">
            Let&apos;s Build Systems That Last Long!
          </h2>
          <div className="pt-2">
            <a
              href="mailto:saptakmondal.official@gmail.com"
              data-cursor="OPEN"
              className="group inline-flex items-center gap-2 font-serif-editorial text-2xl sm:text-3xl text-[#111111] hover:text-[#ea580c] transition-colors"
            >
              <span className="underline underline-offset-8 decoration-1 decoration-[#111111]/30 group-hover:decoration-[#ea580c] break-all sm:break-normal">
                saptakmondal.official@gmail.com
              </span>
              <ArrowUpRight className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer Navigation & Social Links */}
        <div className="pt-8 border-t border-[#f0eee6] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#888888]">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#111111]">
              <span className="font-semibold">&copy; 2026 Saptak Mondal</span>
              <span>&bull;</span>
              <span>Kolkata, IN</span>
            </div>
            <p className="text-[11px] text-[#999999]">
              Built with curiosity, caffeine, and questionable amounts of debugging.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/saptak69"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#111111] hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <a
              href="https://www.linkedin.com/in/saptak-mondal-448b8b40b"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#111111] hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <a
              href="#contact"
              className="hover:text-[#111111] hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
            >
              <span>Resume</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>

            <Link
              href="/admin"
              className="hover:text-[#ea580c] hover:translate-x-0.5 transition-all inline-flex items-center gap-1 font-semibold text-[#111111]"
            >
              <span>SysAdmin</span>
              <ArrowUpRight className="h-3 w-3 text-[#ea580c]" />
            </Link>

            <a
              href="#hero"
              className="hover:text-[#111111] transition border-l border-[#e6e4dc] pl-4 ml-2"
            >
              Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
