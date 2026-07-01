"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type Props = {
  children: React.ReactNode
  className?: string
}

export function ElectricBorder({ children, className }: Props) {
  return (
    <div className={cn("relative rounded-xl border border-primary/30 bg-card/50 p-[1px] shadow-sm", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-primary) 0%, transparent 20%, var(--color-accent) 40%, transparent 60%, var(--color-primary) 80%, transparent 100%)",
          mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          animation: "spin 6s linear infinite",
          opacity: 0.6,
        }}
      />
      <div className="relative rounded-[calc(var(--radius-lg))] bg-card p-4">{children}</div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
