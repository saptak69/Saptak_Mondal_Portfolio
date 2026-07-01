"use client"

import React from "react"

export function TargetCursor() {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const pos = React.useRef({ x: 0, y: 0 })
  const target = React.useRef({ x: 0, y: 0 })
  const raf = React.useRef<number>()

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener("mousemove", onMove)

    const tick = () => {
      // simple easing
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 shadow-[0_0_24px_var(--color-primary)]"
      style={{ mixBlendMode: "difference" as any }}
    />
  )
}
