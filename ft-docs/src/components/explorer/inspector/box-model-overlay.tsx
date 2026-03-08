"use client"

import { MeasurementBadge } from "@/components/explorer/inspector/measurement-badge"
import { chartAlpha, chartColor } from "@/lib/chart-color-tokens"
import type { InspectorMeasurement, InspectorViewOptions } from "@/components/explorer/inspector/types"

interface BoxModelOverlayProps extends InspectorViewOptions {
  measurement: InspectorMeasurement
}

export function BoxModelOverlay({ measurement, scale = 1, highContrast = false }: BoxModelOverlayProps) {
  const rootLeft = measurement.rootRect.left - measurement.hostRect.left
  const rootTop = measurement.rootRect.top - measurement.hostRect.top
  const rootWidth = measurement.rootRect.width
  const rootHeight = measurement.rootRect.height

  return (
    <>
      <div
        className="pointer-events-none absolute border"
        style={{
          left: rootLeft,
          top: rootTop,
          width: rootWidth,
          height: rootHeight,
          borderColor: highContrast ? chartColor("critical") : chartAlpha("positive", 0.9),
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: rootLeft + measurement.border.left,
          top: rootTop + measurement.border.top,
          width: Math.max(0, rootWidth - measurement.border.left - measurement.border.right),
          height: Math.max(0, rootHeight - measurement.border.top - measurement.border.bottom),
          background: highContrast ? chartAlpha("critical", 0.2) : chartAlpha("neutral", 0.14),
          outline: highContrast ? `1px dashed ${chartAlpha("critical", 0.8)}` : `1px dashed ${chartAlpha("neutral", 0.5)}`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: measurement.content.x,
          top: measurement.content.y,
          width: measurement.content.width,
          height: measurement.content.height,
          background: highContrast ? chartAlpha("warning", 0.2) : chartAlpha("critical", 0.12),
          outline: highContrast ? `1px dashed ${chartAlpha("warning", 0.9)}` : `1px dashed ${chartAlpha("critical", 0.7)}`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
      <MeasurementBadge
        x={rootLeft + rootWidth / 2}
        y={rootTop - 12}
        label={`border ${Math.round(measurement.border.top)}`}
        highContrast={highContrast}
      />
      <MeasurementBadge
        x={rootLeft + rootWidth / 2}
        y={rootTop + rootHeight + 12}
        label={`padding ${Math.round(measurement.padding.bottom)}`}
        highContrast={highContrast}
      />
    </>
  )
}
