"use client"

import React from "react"

export function PixelTransition() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const startRef = React.useRef<number>(0)
  const rafRef = React.useRef<number>()

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * DPR)
      canvas.height = Math.floor(window.innerHeight * DPR)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    resize()
    window.addEventListener("resize", resize)

    const duration = 900
    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts
      const t = ts - startRef.current
      const p = Math.min(1, t / duration)

      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      // pixel size goes from large to small as it reveals
      const maxPixel = Math.max(16, Math.min(64, Math.floor(w / 20)))
      const pix = Math.max(1, Math.floor(maxPixel * (1 - p)))
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-background")

      for (let y = 0; y < h; y += pix) {
        for (let x = 0; x < w; x += pix) {
          // random jitter fade pattern
          const noise = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1
          if (noise > p) {
            ctx.fillRect(x, y, pix, pix)
          }
        }
      }

      if (p < 1) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        // fade out canvas overlay
        const overlay = canvas
        overlay.style.transition = "opacity 300ms ease"
        overlay.style.opacity = "0"
        setTimeout(() => {
          overlay.style.display = "none"
        }, 320)
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
}
