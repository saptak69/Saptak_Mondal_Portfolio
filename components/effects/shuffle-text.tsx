// "use client";

import React from "react"

type ShuffleTextProps = {
  text: string
  className?: string
  speed?: number // ms per frame
  duration?: number // total duration in ms
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~"

export function ShuffleText({ text, className, speed = 20, duration = 900 }: ShuffleTextProps) {
  const spanRef = React.useRef<HTMLSpanElement | null>(null)
  const frameRef = React.useRef<number>()
  const startRef = React.useRef<number>(0)

  React.useEffect(() => {
    const el = spanRef.current
    if (!el) return

    const original = text
    const len = original.length

    function step(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(1, elapsed / duration)
      const revealCount = Math.floor(progress * len)

      const shuffled = original
        .split("")
        .map((ch, i) => {
          if (i < revealCount) return original[i]
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join("")

      el.textContent = shuffled

      if (progress < 1) {
        frameRef.current = window.setTimeout(() => {
          requestAnimationFrame(step)
        }, speed) as unknown as number
      } else {
        el.textContent = original
      }
    }

    const r = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(r)
      if (frameRef.current) clearTimeout(frameRef.current)
      startRef.current = 0
    }
  }, [text, speed, duration])

  return <span ref={spanRef} className={className} aria-label={text} />
}
