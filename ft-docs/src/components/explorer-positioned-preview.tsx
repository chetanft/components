"use client"

import type { ReactNode } from "react"

type Placement = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left"

interface ExplorerPositionedPreviewProps {
  children: ReactNode
  placement?: Placement
  width?: number
}

const placementStyles: Record<Placement, React.CSSProperties> = {
  "top-right": { top: 16, right: 16 },
  "top-left": { top: 16, left: 16 },
  "top-center": { top: 16, left: "50%", transform: "translateX(-50%)" },
  "bottom-right": { bottom: 16, right: 16 },
  "bottom-left": { bottom: 16, left: 16 },
}

export function ExplorerPositionedPreview({
  children,
  placement = "top-right",
  width = 400,
}: ExplorerPositionedPreviewProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: 400, background: "var(--bg-primary)" }}
    >
      <div
        className="absolute"
        style={{
          ...placementStyles[placement],
          width,
        }}
      >
        {children}
      </div>
    </div>
  )
}
