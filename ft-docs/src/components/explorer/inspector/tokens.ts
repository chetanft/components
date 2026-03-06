const SPACING_TOKENS = [
  { name: "x0", px: 0 },
  { name: "x1", px: 4 },
  { name: "x2", px: 8 },
  { name: "x3", px: 12 },
  { name: "x4", px: 16 },
  { name: "x5", px: 20 },
  { name: "x6", px: 24 },
  { name: "x7", px: 28 },
  { name: "x8", px: 32 },
  { name: "x9", px: 36 },
  { name: "x10", px: 40 },
  { name: "x11", px: 44 },
  { name: "x12", px: 48 },
  { name: "x13", px: 52 },
  { name: "x14", px: 56 },
  { name: "x15", px: 60 },
  { name: "x16", px: 64 },
  { name: "x20", px: 80 },
  { name: "x24", px: 96 },
  { name: "x38", px: 152 },
] as const

export function pxToToken(px: number): string {
  if (!Number.isFinite(px)) return "0"
  const abs = Math.max(0, Math.round(px))
  let best = SPACING_TOKENS[0]
  let minDiff = Number.POSITIVE_INFINITY

  for (const token of SPACING_TOKENS) {
    const diff = Math.abs(token.px - abs)
    if (diff < minDiff) {
      minDiff = diff
      best = token
    }
  }

  if (minDiff <= 1) return best.name
  return `${abs}px`
}

