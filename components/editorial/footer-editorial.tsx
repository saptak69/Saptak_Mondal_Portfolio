"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight, ArrowUp } from "lucide-react"
import { motion } from "motion/react"

export default function FooterEditorial() {
  return (
    <footer className="py-24 sm:py-32 bg-[#ffffff]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Large Typography Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-4xl"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#888888]">
            COLLABORATION &bull; CONTACT
          </span>
          <h2 className="font-serif-editorial text-5xl sm:text-6xl lg:text-7xl font-normal text-[#111111] leading-[1.05] tracking-tight">
            Let&apos;s Build Systems That Last Long!
          </h2>
          <div className="pt-4">
            <a
              href="mailto:saptakmondal.official@gmail.com"
              data-cursor="OPEN"
              className="group inline-flex items-center gap-3 font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#111111] hover:text-[#ea580c] transition-colors duration-300"
            >
              <span className="relative">
                <span className="break-all sm:break-normal">
                  saptakmondal.official@gmail.com
                </span>
                {/* Animated underline that slides in from left on hover */}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ea580c] group-hover:w-full transition-all duration-500 ease-out" />
              </span>
              <ArrowUpRight className="h-7 w-7 sm:h-8 sm:w-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* Footer Navigation & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 border-t border-[#e6e4dc] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#888888]"
        >
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
              className="group hover:text-[#111111] transition border-l border-[#e6e4dc] pl-4 ml-2 inline-flex items-center gap-1.5"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
