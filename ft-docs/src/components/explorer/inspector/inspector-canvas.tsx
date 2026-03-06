"use client"

import * as React from "react"
import type { ExplorerInspectorConfig, ExplorerInspectorMode } from "@/types/explorer-inspector"
import { cn } from "@/lib/utils"
import { useInspectorMeasurements } from "@/components/explorer/inspector/use-inspector-measurements"
import { BoxModelOverlay } from "@/components/explorer/inspector/box-model-overlay"
import { TokenSpacingOverlay } from "@/components/explorer/inspector/token-spacing-overlay"

interface InspectorCanvasProps {
  mode: ExplorerInspectorMode
  config?: ExplorerInspectorConfig
  children: React.ReactNode
  className?: string
  scale?: number
  highContrast?: boolean
}

export function InspectorCanvas({
  mode,
  config,
  children,
  className,
  scale = 1,
  highContrast = false,
}: InspectorCanvasProps) {
  const hostRef = React.useRef<HTMLDivElement>(null)
  const { measurement } = useInspectorMeasurements(hostRef, config, [children])

  const showBox = mode === "box-model" || mode === "both"
  const showTokens = mode === "token-spacing" || mode === "both"

  return (
    <div ref={hostRef} className={cn("relative inline-flex", className)}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
      {measurement && showBox && <BoxModelOverlay measurement={measurement} scale={scale} highContrast={highContrast} />}
      {measurement && showTokens && <TokenSpacingOverlay measurement={measurement} config={config} scale={scale} highContrast={highContrast} />}
    </div>
  )
}

