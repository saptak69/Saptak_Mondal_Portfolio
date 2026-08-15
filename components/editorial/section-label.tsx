import React from "react"

interface SectionLabelProps {
  label: string
  title: string
  subtitle?: string
  align?: "left" | "between"
  actionSlot?: React.ReactNode
}

export default function SectionLabel({
  label,
  title,
  subtitle,
  align = "left",
  actionSlot,
}: SectionLabelProps) {
  if (align === "between" && actionSlot) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#0d9488] font-semibold">
              {label}
            </span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-5xl font-normal text-[#111111] tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-[#555555] max-w-xl font-sans leading-relaxed pt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div>{actionSlot}</div>
      </div>
    )
  }

  return (
    <div className="space-y-2 mb-12">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
        <span className="font-mono text-xs uppercase tracking-widest text-[#0d9488] font-semibold">
          {label}
        </span>
      </div>
      <h2 className="font-serif-editorial text-3xl sm:text-5xl font-normal text-[#111111] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[#555555] max-w-xl font-sans leading-relaxed pt-1">
          {subtitle}
        </p>
      )}
    </div>
  )
}
