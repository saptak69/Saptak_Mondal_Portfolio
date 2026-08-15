"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { X, CheckCircle2, ArrowLeft, ArrowRight, Github, ExternalLink, ZoomIn } from "lucide-react"
import { ProjectData } from "./project-modules"

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

interface GalleryItem {
  title: string
  label: string
  src: string
}

const projectGalleryMap: Record<string, GalleryItem[]> = {
  plothole: [
    { title: "Movie Discovery & Search", label: "Primary App View", src: "/media/projects/plothole/hero.webp" },
    { title: "Movie Details & Ratings", label: "Detail View", src: "/media/projects/plothole/movie.webp" },
    { title: "Reviews & Discussion Archive", label: "Community View", src: "/media/projects/plothole/discussion.webp" },
    { title: "Cinematic Home Grid", label: "Home Viewport", src: "/media/projects/plothole/home.webp" },
  ],
  pennywise: [
    { title: "Financial Dashboard & Net Worth", label: "Primary App View", src: "/media/projects/pennywise/dashboard.webp" },
    { title: "Secure Multi-Role Authentication", label: "Login Interface", src: "/media/projects/pennywise/login.webp" },
    { title: "Interactive Analytics & Cashflow", label: "Analytics View", src: "/media/projects/pennywise/hero.webp" },
  ],
  mangrove: [
    { title: "Storefront & Hero Banner", label: "Primary Store View", src: "/media/projects/mangrove/hero.webp" },
    { title: "Streetwear Product Catalog", label: "Catalog Grid View", src: "/media/projects/mangrove/catalog.webp" },
    { title: "Interactive Features & Showcase", label: "Feature View", src: "/media/projects/mangrove/feature.webp" },
  ],
  nexus: [
    { title: "Real-Time Chat Authentication", label: "Login Interface View", src: "/media/projects/nexus/login.webp" },
    { title: "Sub-15ms WebSocket Engine", label: "System Gateway", src: "/media/projects/nexus/hero.webp" },
  ],
  medfinder: [
    { title: "AI Disease Prediction & Diagnostic Console", label: "Predictive ML Dashboard", src: "/media/projects/medfinder/hero.webp" },
  ],
  "release-pipeline": [
    { title: "Automated Java Release & CI/CD Pipeline", label: "DevOps Pipeline Visualizer", src: "/media/projects/release-pipeline/hero.webp" },
  ],
}

export default function ProjectModal({
  project,
  onClose,
  onNext,
  onPrev,
}: ProjectModalProps) {
  const [activeLightboxImg, setActiveLightboxImg] = useState<GalleryItem | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeLightboxImg) {
          setActiveLightboxImg(null)
        } else {
          onClose()
        }
      }
      if (!activeLightboxImg) {
        if (e.key === "ArrowRight") onNext()
        if (e.key === "ArrowLeft") onPrev()
      }
    }
    if (project) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [project, onClose, onNext, onPrev, activeLightboxImg])

  if (!project) return null

  // Gallery items for current project
  const galleryItems = projectGalleryMap[project.id] || [
    { title: "Main Application View", label: "Primary View", src: `/media/projects/${project.id}/hero.png` },
  ]

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-4xl rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 sm:p-10 shadow-2xl space-y-6 relative max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 rounded-full border border-[#e6e4dc] text-[#666666] hover:text-[#111111] hover:border-[#111111] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            aria-label="Close project details"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header Header */}
          <div className="space-y-2 border-b border-[#f0eee6] pb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#666666]">
              <span className="font-semibold text-[#0d9488]">{project.number}</span>
              <span>&bull;</span>
              <span className="uppercase text-[#0d9488] font-semibold">{project.category}</span>
              <span>&bull;</span>
              <span>{project.year}</span>
            </div>

            <h3 id="project-modal-title" className="font-serif-editorial text-3xl sm:text-5xl font-normal text-[#111111]">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[#777777]">
              {project.tagline}
            </p>
          </div>

          {/* Story: The Problem */}
          {project.problem && (
            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase block">
                01 • THE PROBLEM &amp; CONTEXT
              </span>
              <p className="text-sm text-[#444444] font-sans leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {/* Story: What I Built & Architecture */}
          {project.solution && (
            <div className="space-y-1.5">
              <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase block">
                02 • ARCHITECTURAL SOLUTION
              </span>
              <p className="text-sm text-[#444444] font-sans leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {/* Architecture Topology Box */}
          {project.architecture && (
            <div className="rounded-xl border border-[#e6e4dc] bg-[#fbfaf7] p-4 font-mono text-xs space-y-1">
              <span className="text-[#0d9488] text-[10px] uppercase font-bold block">SYSTEM TOPOLOGY:</span>
              <p className="text-[#111111] font-medium">
                {project.architecture}
              </p>
            </div>
          )}

          {/* System Architecture & Technical Specifications */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase block">
              03 • SYSTEM ARCHITECTURE &amp; DEPLOYMENT SPECS
            </span>
            <div className="rounded-xl border border-[#111111] bg-[#111111] p-6 text-[#ffffff] font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-gray-400 text-[10px]">
                <span>PRODUCT CASE ARCHITECTURE • {project.title}</span>
                <span className="text-[#0d9488] font-bold">PRODUCTION VERIFIED</span>
              </div>

              <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1.5">
                <span className="text-[10px] text-[#ea580c] uppercase font-semibold block">END-TO-END DATA PIPELINE:</span>
                <p className="text-white text-xs leading-relaxed font-semibold">
                  {project.architecture}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <span className="text-[9px] text-gray-400 block uppercase">PRIMARY REPOSITORY</span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#ea580c] transition-colors font-semibold block truncate"
                  >
                    {project.repoUrl.replace("https://", "")}
                  </a>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-white/5 space-y-1">
                  <span className="text-[9px] text-gray-400 block uppercase">LIVE DEPLOYMENT</span>
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0d9488] hover:underline font-semibold block truncate"
                    >
                      {project.liveUrl.replace("https://", "")}
                    </a>
                  ) : (
                    <span className="text-gray-400 font-medium block">Internal System / Capstone</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Highlights */}
          {project.highlights && (
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase block">
                04 • KEY HIGHLIGHTS &amp; FEATURES
              </span>
              <div className="space-y-2 font-mono text-xs">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-[#333333]">
                    <CheckCircle2 className="h-4 w-4 text-[#ea580c] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase block">
              05 • TECHNOLOGIES USED
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded border border-[#e6e4dc] bg-[#fbfaf7] hover:border-[#0d9488]/40 hover:text-[#0d9488] transition-colors px-2.5 py-1 font-mono text-xs text-[#444444]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Real Deployed Screenshots Gallery */}
          <div className="space-y-3 pt-4 border-t border-[#e6e4dc]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#0d9488] font-semibold uppercase">
                PRODUCT GALLERY • {project.title}
              </span>
              <span className="font-mono text-xs text-[#888888]">
                {galleryItems.length} HIGH-RES CAPTURES
              </span>
            </div>

            <div className="space-y-4">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#e6e4dc] bg-[#ffffff] p-2 space-y-2 shadow-xs"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#f4f3ee]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-xs px-2 py-1">
                    <span className="font-medium text-[#111111]">{item.title}</span>
                    <span className="text-[#0d9488] text-[10px] font-semibold uppercase">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Links & Pagination */}
          <div className="pt-6 border-t border-[#f0eee6] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={onPrev}
                className="inline-flex items-center gap-1 text-[#666666] hover:text-[#111111] transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] rounded px-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous Case</span>
              </button>
              <span className="text-[#cccccc]">|</span>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-1 text-[#666666] hover:text-[#111111] transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#111111] rounded px-1"
              >
                <span>Next Case</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              {project.repoUrl && project.repoUrl !== "#" && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#e6e4dc] px-3.5 py-2 text-[#111111] hover:border-[#111111] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#111111] bg-[#111111] px-4 py-2 text-[#fbfaf7] hover:bg-transparent hover:text-[#111111] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ENLARGED LIGHTBOX MODAL */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl border border-white/20 bg-[#111111] p-6 text-[#ffffff] space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute right-4 top-4 p-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-[#111111] transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#0d9488] font-semibold">REAL DEPLOYED SCREENSHOT • {project.title}</span>
              <h4 className="font-serif-editorial text-2xl text-white">{activeLightboxImg.title}</h4>
            </div>
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-black/50">
              <Image
                src={activeLightboxImg.src}
                alt={activeLightboxImg.title}
                fill
                sizes="1000px"
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center font-mono text-xs text-gray-400 pt-2 border-t border-white/10">
              <span>{activeLightboxImg.label}</span>
              <span className="text-white font-semibold">Real Product Viewport</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

