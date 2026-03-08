"use client"

import { chartAlpha } from "@/lib/chart-color-tokens"

/**
 * Absolute-positioned gradient mesh backdrop.
 * Render as a sibling (not wrapper) inside a `position: relative` container.
 * Sits behind preview content via z-index.
 */
export function GlassPreviewBackdrop({ active }: { active: boolean }) {
  return (
    <div
      className="absolute inset-0 rounded-lg transition-opacity duration-200"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: "none",
        zIndex: 0,
        background: [
          `radial-gradient(circle at 20% 20%, ${chartAlpha("critical", 0.5)}, transparent 50%)`,
          `radial-gradient(circle at 80% 20%, ${chartAlpha("neutral", 0.5)}, transparent 50%)`,
          `radial-gradient(circle at 25% 80%, ${chartAlpha("positive", 0.4)}, transparent 50%)`,
          `radial-gradient(circle at 75% 75%, ${chartAlpha("warning", 0.4)}, transparent 50%)`,
        ].join(", "),
      }}
    />
  )
}
