"use client"

import type { ReactNode } from "react"

type Placement = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left"

interface OverlayProps {
  children: ReactNode
  width?: number
  placement?: Placement
}

export function InlinePreview({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center justify-center"
      style={{ left: "392px" }}
    >
      <div className="pointer-events-auto">{children}</div>
    </div>
  )
}

export function LayoutCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute right-0 top-0 bottom-0 px-6 py-6"
      style={{ left: "392px" }}
    >
      <div className="pointer-events-auto mx-auto flex h-full w-full max-w-[1100px] items-start justify-center">
        {children}
      </div>
    </div>
  )
}

export function ChartCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute right-0 top-0 bottom-0 px-6 py-6"
      style={{ left: "392px" }}
    >
      <div className="pointer-events-auto mx-auto flex h-full w-full max-w-[1200px] items-center justify-center rounded-lg border border-border bg-[var(--bg-primary)] p-4">
        {children}
      </div>
    </div>
  )
}

export function TopOverlayPreview({ children, width = 420, placement = "top-right" }: OverlayProps) {
  const style: React.CSSProperties = { position: "fixed", zIndex: 90, width }
  if (placement === "top-right") {
    style.top = 84
    style.right = 24
  } else if (placement === "top-left") {
    style.top = 84
    style.left = 24
  } else if (placement === "top-center") {
    style.top = 84
    style.left = "50%"
    style.transform = "translateX(-50%)"
  } else if (placement === "bottom-left") {
    style.bottom = 24
    style.left = 24
  } else {
    style.bottom = 24
    style.right = 24
  }

  return <div style={style}>{children}</div>
}

export function RightPanelPreview({ children, width = 420 }: OverlayProps) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 90,
        top: 72,
        right: 0,
        width,
      }}
    >
      {children}
    </div>
  )
}

export function CenterDialogPreview({ children, width = 560 }: OverlayProps) {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 90,
        top: "50%",
        left: "50%",
        width,
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  )
}

export function AnchorPreview({ children }: { children: ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute right-0 top-0 bottom-0 px-6 py-8"
      style={{ left: "392px" }}
    >
      <div className="pointer-events-auto mx-auto flex h-full w-full max-w-[900px] items-center justify-center">
        {children}
      </div>
    </div>
  )
}

