"use client"

import type { ExplorerInspectorConfig } from "@/types/explorer-inspector"
import { MeasurementBadge } from "@/components/explorer/inspector/measurement-badge"
import type { InspectorMeasurement, InspectorViewOptions } from "@/components/explorer/inspector/types"
import { pxToToken } from "@/components/explorer/inspector/tokens"

interface TokenSpacingOverlayProps extends InspectorViewOptions {
  measurement: InspectorMeasurement
  config?: ExplorerInspectorConfig
}

export function TokenSpacingOverlay({ measurement, config, highContrast = false }: TokenSpacingOverlayProps) {
  const rootLeft = measurement.rootRect.left - measurement.hostRect.left
  const rootTop = measurement.rootRect.top - measurement.hostRect.top
  const rootWidth = measurement.rootRect.width
  const rootHeight = measurement.rootRect.height
  const edgeY = config?.spacingHints?.outerYToken || pxToToken(Math.min(measurement.outer.top, measurement.outer.bottom))
  const edgeX = config?.spacingHints?.outerXToken || pxToToken(Math.min(measurement.outer.left, measurement.outer.right))

  return (
    <>
      <MeasurementBadge x={rootLeft + rootWidth / 2} y={Math.max(10, rootTop - 18)} label={edgeY} highContrast={highContrast} />
      <MeasurementBadge x={Math.max(14, rootLeft - 18)} y={rootTop + rootHeight / 2} label={edgeX} highContrast={highContrast} />
      <MeasurementBadge x={rootLeft + rootWidth + 18} y={rootTop + rootHeight / 2} label={edgeX} highContrast={highContrast} />
      <MeasurementBadge x={rootLeft + rootWidth / 2} y={rootTop + rootHeight + 18} label={edgeY} highContrast={highContrast} />
      {(measurement.gap > 0 || config?.spacingHints?.innerGapToken) && (
        <MeasurementBadge
          x={rootLeft + rootWidth / 2}
          y={rootTop + rootHeight / 2}
          label={config?.spacingHints?.innerGapToken || pxToToken(measurement.gap)}
          highContrast={highContrast}
        />
      )}
    </>
  )
}

