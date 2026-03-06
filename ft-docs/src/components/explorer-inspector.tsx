"use client"

import { InspectorCanvas } from "@/components/explorer/inspector/inspector-canvas"
import type { ExplorerInspectorConfig, ExplorerInspectorMode } from "@/types/explorer-inspector"
import type { ReactNode } from "react"

interface ExplorerInspectorProps {
  mode: ExplorerInspectorMode
  config?: ExplorerInspectorConfig
  children: ReactNode
  className?: string
  scale?: number
  highContrast?: boolean
}

export function ExplorerInspector(props: ExplorerInspectorProps) {
  return <InspectorCanvas {...props} />
}
