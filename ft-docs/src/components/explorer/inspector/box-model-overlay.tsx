"use client"

import { MeasurementBadge } from "@/components/explorer/inspector/measurement-badge"
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
          borderColor: highContrast ? "rgba(239, 68, 68, 1)" : "rgba(34, 197, 94, 0.9)",
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
          background: highContrast ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.14)",
          outline: highContrast ? "1px dashed rgba(239, 68, 68, 0.8)" : "1px dashed rgba(59, 130, 246, 0.5)",
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
          background: highContrast ? "rgba(245, 158, 11, 0.2)" : "rgba(236, 72, 153, 0.12)",
          outline: highContrast ? "1px dashed rgba(245, 158, 11, 0.9)" : "1px dashed rgba(236, 72, 153, 0.7)",
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

