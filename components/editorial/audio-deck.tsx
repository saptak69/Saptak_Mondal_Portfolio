"use client"

import React from "react"
import Image from "next/image"
import { ExternalLink, Instagram, Play, Disc } from "lucide-react"
import SectionLabel from "./section-label"

interface AudioDeckProps {
  onPlaySound: (type: "blip" | "click" | "tap") => void
}

const musicTracks = [
  {
    id: "pull-me-under",
    number: "01",
    title: "Pull Me Under",
    album: "Images and Words",
    artist: "Dream Theater",
    duration: "8:13 • Progressive Rock / Metal",
    description: "The seminal track defining 90s progressive rock with John Petrucci's signature technical precision, sweeping riffs, and virtuosic guitar composition.",
    coverImg: "/media/music/pull-me-under.png",
    youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_l1xRaVChi3KmhOWg6rn4ADC1NJe6FYf3o&si=gkpgQ5jRkmEIendf",
  },
  {
    id: "metropolis",
    number: "02",
    title: "Metropolis Pt. 2: Scenes from a Memory",
    album: "Metropolis Pt. 2",
    artist: "Dream Theater",
    duration: "1:17:16 • Progressive Metal",
    description: "A landmark conceptual work featuring intricate 7/8 & 11/8 rhythmic meters, cinematic guitar solos, and symphonic prog metal arrangements.",
    coverImg: "/media/music/metropolis.png",
    youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_no4h8w4dhKZtqgM7ssWeBPI07BncIIZCE&si=w3O7ouUjsblybqz2",
  },
  {
    id: "hail-to-the-king",
    number: "03",
    title: "Hail to the King",
    album: "Hail to the King",
    artist: "Avenged Sevenfold",
    duration: "53:11 • Heavy Metal",
    description: "A masterclass in driving heavy metal riffs, thunderous rhythm section orchestration, and dual guitar harmony solos led by Synyster Gates.",
    coverImg: "/media/music/hail-to-the-king.png",
    youtubeUrl: "https://music.youtube.com/playlist?list=OLAK5uy_ng4ywPIdy9khiwH-oEqvCisM6YwZqZhcQ&si=SZmCmTRKLFBCmAS7",
  },
]

export default function AudioDeck({ onPlaySound }: AudioDeckProps) {
  return (
    <section id="audio" className="py-20 border-b border-[#e6e4dc] bg-[#f7f6f1]/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <SectionLabel
          label="PERSONAL ARCHIVE • SOUND & GUITAR"
          title="Progressive Rock & Metal Vault"
          subtitle="Curated album art archive — click any cover image to stream the full album directly on YouTube Music."
        />

        {/* 3-Column Album Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-2">
          {musicTracks.map((track) => (
            <div
              key={track.id}
              className="group flex flex-col justify-between rounded-3xl border border-[#e6e4dc] bg-[#ffffff] p-5 sm:p-6 shadow-sm hover:border-[#111111] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="space-y-4">
                
                {/* Clickable Album Art Container */}
                <a
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onPlaySound("click")}
                  className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#111111] block group/cover border border-[#e6e4dc] shadow-xs cursor-pointer"
                  title={`Stream ${track.title} on YouTube Music`}
                >
                  <Image
                    src={track.coverImg}
                    alt={`${track.title} Album Cover`}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 ease-out group-hover/cover:scale-105"
                  />

                  {/* Dark Gradient Hover Overlay with Play Badge */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ea580c] text-white shadow-xl transform scale-90 group-hover/cover:scale-100 transition-transform duration-300">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white bg-black/60 px-3 py-1 rounded-full border border-white/20">
                      Listen on YouTube Music
                    </span>
                  </div>
                </a>

                {/* Album Metadata */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#0d9488] font-bold tracking-wider">
                    <span>{track.number} • {track.artist.toUpperCase()}</span>
                    <Disc className="h-3.5 w-3.5 text-[#ea580c]" />
                  </div>

                  <h3 className="font-serif-editorial text-xl sm:text-2xl font-normal text-[#111111] leading-snug group-hover:text-[#ea580c] transition-colors">
                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => onPlaySound("click")}
                    >
                      {track.title}
                    </a>
                  </h3>

                  <p className="font-mono text-[11px] text-[#777777]">
                    {track.duration}
                  </p>

                  <p className="text-xs text-[#555555] font-sans leading-relaxed pt-1">
                    {track.description}
                  </p>
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-5 border-t border-[#f0eee6] mt-4 flex items-center justify-between">
                <a
                  href={track.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onPlaySound("click")}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#ea580c] hover:underline"
                >
                  <span>Open YouTube Music</span>
                  <ExternalLink className="h-3 w-3" />
                </a>

                <span className="font-mono text-[10px] text-[#999999] uppercase">
                  {track.album}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Action */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://www.instagram.com/saptak_._/"
            target="_blank"
            rel="noreferrer"
            onClick={() => onPlaySound("click")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#e6e4dc] bg-[#ffffff] px-4 sm:px-5 py-3 text-xs font-mono text-[#111111] hover:border-[#0d9488] hover:text-[#0d9488] transition shadow-xs text-center flex-wrap sm:flex-nowrap"
          >
            <Instagram className="h-4 w-4 text-[#ea580c] shrink-0" />
            <span>Watch My Heavy Metal &amp; Prog Guitar Covers on Instagram</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#0d9488] shrink-0 hidden sm:inline-block" />
          </a>
        </div>

      </div>
    </section>
  )
}
