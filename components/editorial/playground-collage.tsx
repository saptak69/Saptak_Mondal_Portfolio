import React from "react"
import SectionLabel from "./section-label"

const playgroundItems = [
  {
    id: "guitar",
    title: "Progressive Guitar & Tone Lab",
    category: "Music & Acoustic Theory",
    description: "Arranging technical Dream Theater riffs, John Petrucci phrasing, odd-time meters (7/8, 11/8), and audio mastering on Instagram (@saptak_._).",
    tag: "Prog Rock / Metal",
  },
  {
    id: "architecture",
    title: "Distributed Concurrency & WebSockets",
    category: "Systems Engineering",
    description: "Exploring event-driven message brokers, sub-millisecond socket framing, backpressure handling, and stateless token rotation.",
    tag: "Real-Time Protocols",
  },
  {
    id: "learning",
    title: "Currently Exploring",
    category: "Continuous Exploration",
    description: "Investigating distributed event streaming with Kafka/Redis, Go microservices, and lightweight client-side machine learning inference.",
    tag: "Active Research",
  },
  {
    id: "philosophy",
    title: "Engineering Philosophy",
    category: "Core Principles",
    description: "Simple is harder than complex. Type safety is non-negotiable. Every line of code and every pixel must earn its place.",
    tag: "Craftsmanship",
  },
  {
    id: "workstation",
    title: "Minimalist Workspace",
    category: "Environment & Tools",
    description: "Custom Linux/macOS workflows, VS Code with clean editorial theme, mechanical switches, and plenty of coffee.",
    tag: "Setup",
  },
]

export default function PlaygroundCollage() {
  return (
    <section id="playground" className="py-20 border-b border-[#e6e4dc] bg-[#f7f6f1]/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="PLAYGROUND • PERSONAL ARCHIVE & CURIOSITIES"
          title="Things I Care About"
          subtitle="A modular collage of creative explorations, progressive rock guitar, engineering curiosities, and personal craftsmanship."
        />

        {/* Modular Collage Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {playgroundItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#e6e4dc] bg-[#ffffff] p-6 space-y-4 hover:border-[#111111] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#888888] border-b border-[#f0eee6] pb-2.5">
                  <span>{item.category}</span>
                  <span className="text-[#111111] font-semibold">{item.tag}</span>
                </div>

                <h3 className="font-serif-editorial text-2xl font-normal text-[#111111] pt-1">
                  {item.title}
                </h3>

                <p className="text-xs text-[#555555] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0eee6] flex items-center justify-between font-mono text-[10px] text-[#888888]">
                <span>STATUS: ACTIVE DISCOVERY</span>
                <span className="text-[#111111]">&bull;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
