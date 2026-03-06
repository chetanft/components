"use client"

import * as React from "react"
import type { ExplorerInspectorConfig } from "@/types/explorer-inspector"
import type { InspectorMeasurement } from "@/components/explorer/inspector/types"

function toNumber(value: string | null): number {
  const n = Number.parseFloat(value || "0")
  return Number.isFinite(n) ? n : 0
}

function isTransparentBackground(color: string): boolean {
  if (!color) return true
  const normalized = color.replace(/\s+/g, "").toLowerCase()
  return normalized === "transparent" || normalized === "rgba(0,0,0,0)"
}

function intersectionArea(a: DOMRect, b: DOMRect): number {
  const left = Math.max(a.left, b.left)
  const top = Math.max(a.top, b.top)
  const right = Math.min(a.right, b.right)
  const bottom = Math.min(a.bottom, b.bottom)
  const w = Math.max(0, right - left)
  const h = Math.max(0, bottom - top)
  return w * h
}

function scoreCandidate(hostRect: DOMRect, el: HTMLElement): number {
  const rect = el.getBoundingClientRect()
  if (rect.width < 8 || rect.height < 8) return Number.NEGATIVE_INFINITY

  const hostArea = Math.max(1, hostRect.width * hostRect.height)
  const area = rect.width * rect.height
  const ratio = area / hostArea
  if (ratio > 0.96) return Number.NEGATIVE_INFINITY

  const visibleRatio = intersectionArea(hostRect, rect) / Math.max(1, area)
  if (visibleRatio < 0.9) return Number.NEGATIVE_INFINITY

  const style = window.getComputedStyle(el)
  if (style.display === "none" || style.visibility === "hidden") return Number.NEGATIVE_INFINITY
  if (style.position === "fixed") return Number.NEGATIVE_INFINITY
  if (style.pointerEvents === "none") return Number.NEGATIVE_INFINITY

  const hostCx = hostRect.left + hostRect.width / 2
  const hostCy = hostRect.top + hostRect.height / 2
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const centerDist = Math.hypot(cx - hostCx, cy - hostCy)
  const maxDist = Math.max(1, Math.hypot(hostRect.width / 2, hostRect.height / 2))
  const centerScore = 1 - Math.min(1, centerDist / maxDist)

  const borderWidth =
    toNumber(style.borderTopWidth) +
    toNumber(style.borderRightWidth) +
    toNumber(style.borderBottomWidth) +
    toNumber(style.borderLeftWidth)
  const padding =
    toNumber(style.paddingTop) +
    toNumber(style.paddingRight) +
    toNumber(style.paddingBottom) +
    toNumber(style.paddingLeft)
  const hasVisualSurface =
    borderWidth > 0 ||
    padding > 0 ||
    !isTransparentBackground(style.backgroundColor) ||
    style.boxShadow !== "none"

  const hasText = (el.textContent || "").trim().length > 0
  const tag = el.tagName.toLowerCase()
  const isInteractive =
    tag === "button" ||
    tag === "input" ||
    tag === "select" ||
    tag === "textarea" ||
    tag === "a" ||
    el.getAttribute("role") === "button"

  let score = 0
  if (ratio >= 0.08 && ratio <= 0.8) score += 2.4
  else if (ratio > 0.8) score -= 1.4
  else score -= 1.2 // tiny nodes, icons, inline labels

  score += centerScore
  if (hasVisualSurface) score += 1.2
  if (isInteractive) score += 0.8
  if (hasText) score += 0.5

  return score
}

function findLikelyRoot(host: HTMLElement, config?: ExplorerInspectorConfig): HTMLElement | null {
  const selectors = [config?.rootSelector, config?.anchors?.root, "[data-inspector-root]"].filter(Boolean) as string[]
  for (const selector of selectors) {
    const explicit = host.querySelector<HTMLElement>(selector)
    if (explicit) return explicit
  }

  const hostRect = host.getBoundingClientRect()
  let bestPreferred: HTMLElement | null = null
  let bestPreferredScore = Number.NEGATIVE_INFINITY
  let bestAny: HTMLElement | null = null
  let bestAnyScore = Number.NEGATIVE_INFINITY
  const candidates = host.querySelectorAll<HTMLElement>("*")

  for (const el of candidates) {
    const rect = el.getBoundingClientRect()
    const hostArea = Math.max(1, hostRect.width * hostRect.height)
    const ratio = (rect.width * rect.height) / hostArea
    const score = scoreCandidate(hostRect, el)
    if (score > bestAnyScore) {
      bestAnyScore = score
      bestAny = el
    }
    // Prefer medium/large component surfaces over tiny controls in composite stories.
    if (ratio >= 0.08 && score > bestPreferredScore) {
      bestPreferredScore = score
      bestPreferred = el
    }
  }

  if (bestPreferred) return bestPreferred
  if (bestAny) return bestAny
  return host.firstElementChild as HTMLElement | null
}

function makeMeasurement(host: HTMLElement, root: HTMLElement): InspectorMeasurement | null {
  const hostRect = host.getBoundingClientRect()
  const rootRect = root.getBoundingClientRect()
  if (rootRect.width <= 0 || rootRect.height <= 0) return null

  const style = window.getComputedStyle(root)
  const border = {
    top: toNumber(style.borderTopWidth),
    right: toNumber(style.borderRightWidth),
    bottom: toNumber(style.borderBottomWidth),
    left: toNumber(style.borderLeftWidth),
  }
  const padding = {
    top: toNumber(style.paddingTop),
    right: toNumber(style.paddingRight),
    bottom: toNumber(style.paddingBottom),
    left: toNumber(style.paddingLeft),
  }
  const gap = toNumber(style.gap)

  const outer = {
    top: rootRect.top - hostRect.top,
    right: hostRect.right - rootRect.right,
    bottom: hostRect.bottom - rootRect.bottom,
    left: rootRect.left - hostRect.left,
  }

  const contentX = rootRect.left - hostRect.left + border.left + padding.left
  const contentY = rootRect.top - hostRect.top + border.top + padding.top
  const contentWidth = Math.max(0, rootRect.width - border.left - border.right - padding.left - padding.right)
  const contentHeight = Math.max(0, rootRect.height - border.top - border.bottom - padding.top - padding.bottom)

  return {
    rootRect,
    hostRect,
    border,
    padding,
    gap,
    outer,
    content: { x: contentX, y: contentY, width: contentWidth, height: contentHeight },
  }
}

export function useInspectorMeasurements(
  hostRef: React.RefObject<HTMLDivElement>,
  config?: ExplorerInspectorConfig,
  deps: React.DependencyList = []
) {
  const [measurement, setMeasurement] = React.useState<InspectorMeasurement | null>(null)
  const [measurable, setMeasurable] = React.useState(true)

  React.useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let raf = 0
    const run = () => {
      const root = findLikelyRoot(host, config)
      if (!root) {
        setMeasurement(null)
        setMeasurable(false)
        return
      }
      setMeasurable(true)
      setMeasurement(makeMeasurement(host, root))
    }

    const schedule = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(run)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(host)

    const root = findLikelyRoot(host, config)
    if (root) observer.observe(root)

    schedule()
    window.addEventListener("resize", schedule)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("resize", schedule)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.rootSelector, config?.anchors?.root, ...deps])

  return { measurement, measurable }
}
