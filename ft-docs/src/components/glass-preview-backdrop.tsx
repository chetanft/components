"use client"

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
          "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.5), transparent 50%)",
          "radial-gradient(circle at 80% 20%, rgba(59,130,246,0.5), transparent 50%)",
          "radial-gradient(circle at 25% 80%, rgba(34,197,94,0.4), transparent 50%)",
          "radial-gradient(circle at 75% 75%, rgba(245,158,11,0.4), transparent 50%)",
        ].join(", "),
      }}
    />
  )
}
