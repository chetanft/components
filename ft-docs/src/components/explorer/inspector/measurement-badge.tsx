"use client"

interface MeasurementBadgeProps {
  x: number
  y: number
  label: string
  highContrast?: boolean
}

export function MeasurementBadge({ x, y, label, highContrast = false }: MeasurementBadgeProps) {
  return (
    <div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs-rem font-semibold"
      style={{
        left: x,
        top: y,
        background: highContrast ? "var(--critical)" : "var(--neutral)",
        color: "var(--white)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {label}
    </div>
  )
}
