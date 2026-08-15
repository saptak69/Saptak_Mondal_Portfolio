"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Code2, Play, Sparkles, Terminal, Layers } from "lucide-react"
import SectionLabel from "./section-label"

interface SandboxItem {
  id: string
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  imageSrc: string
}

const sandboxItems: SandboxItem[] = [
  {
    id: "voxel",
    title: "Procedural 3D Voxel Architecture",
    category: "Three.js & WebGL",
    year: "2024",
    description: "An isometric 3D voxel landscape study exploring procedural noise generation, custom light diffusion, and raycasting.",
    tags: ["Three.js", "WebGL", "GLSL Shaders", "TypeScript"],
    imageSrc: "/media/sandbox/voxel.webp",
  },
  {
    id: "shader",
    title: "GPU Wireframe Displacement Wave",
    category: "GLSL Shader",
    year: "2024",
    description: "A mathematical computational art study simulating dynamic vertex displacement waves using fragment shaders.",
    tags: ["GLSL", "Fragment Shader", "Math", "Canvas"],
    imageSrc: "/media/sandbox/shader.webp",
  },
  {
    id: "dsp",
    title: "Web Audio Synthesizer Engine",
    category: "DSP & Audio API",
    year: "2024",
    description: "Real-time web audio haptic blip synthesizer generating micro-harmonics and custom frequency curves.",
    tags: ["Web Audio API", "DSP", "Tone Generation"],
    imageSrc: "/media/sandbox/voxel.webp",
  },
  {
    id: "topology",
    title: "Sub-15ms WebSocket Gateway",
    category: "Distributed Systems",
    year: "2024",
    description: "Heartbeat broadcasting topology handling thousands of concurrent message frames with stateless JWT handshakes.",
    tags: ["Node.js", "WebSockets", "Event Loops"],
    imageSrc: "/media/sandbox/shader.webp",
  },
]

export default function SandboxSection({
  onPlaySound,
}: {
  onPlaySound?: (type: "blip" | "click" | "tap") => void
}) {
  const [activeItem, setActiveItem] = useState<SandboxItem | null>(null)

  return (
    <section id="sandbox" className="py-20 border-b border-[#e6e4dc] bg-[#fbfaf7]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="SANDBOX • EXPERIMENTAL SKETCHBOOK"
          title="Curiosities & Shaders Archive"
          subtitle="A sketchbook of WebGL experiments, audio DSP studies, and micro-interaction prototypes."
          align="between"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {sandboxItems.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              role="button"
              data-cursor="VIEW"
              onClick={() => {
                if (onPlaySound) onPlaySound("click")
                setActiveItem(item)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  if (onPlaySound) onPlaySound("click")
                  setActiveItem(item)
                }
              }}
              className="group rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 cursor-pointer transition-all duration-300 hover:border-[#111111] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              {/* Minimalist Code / Technical Experiment Canvas Box */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#111111] border border-[#111111] mb-5 p-5 flex flex-col justify-between font-mono text-xs text-white group-hover:scale-[1.01] transition-transform">
                <div className="flex items-center justify-between text-gray-400 text-[10px] border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="h-3.5 w-3.5" />
                    {item.category}
                  </span>
                  <span>{item.year}</span>
                </div>
                <div className="py-2">
                  <span className="text-white text-sm font-semibold block">{item.title}</span>
                  <p className="text-gray-400 text-[11px] font-sans line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-white/10 pt-2">
                  <span className="text-emerald-400">STATUS: COMPILED</span>
                  <span className="text-white font-semibold">INSPECT SKETCH &rarr;</span>
                </div>
              </div>  

              {/* Text Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#888888]">
                  <span className="text-[#111111] font-semibold">{item.title}</span>
                  <span>{item.year}</span>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed font-sans">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[#e6e4dc] bg-[#f8f7f2] px-2 py-0.5 font-mono text-[10px] text-[#555555]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
