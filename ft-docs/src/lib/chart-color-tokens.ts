import { designTokens } from "../../../src/tokens/design-tokens"

const lightBase = designTokens.baseColors.lightMode

const tokenFallbacks: Record<string, string> = {
  primary: designTokens.colors.primary,
  secondary: designTokens.colors.secondary,
  tertiary: designTokens.colors.tertiary,
  "border-primary": designTokens.colors.border.primary,
  "border-secondary": designTokens.colors.border.secondary,
  "bg-primary": designTokens.colors.bg.primary,
  "bg-secondary": designTokens.colors.bg.secondary,
  neutral: lightBase.neutral500,
  "neutral-dark": lightBase.neutral700,
  "neutral-light": lightBase.neutral100,
  positive: lightBase.positive500,
  "positive-dark": lightBase.positive700,
  "positive-light": lightBase.positive100,
  warning: lightBase.warning500,
  "warning-dark": lightBase.warning700,
  "warning-light": lightBase.warning100,
  critical: lightBase.danger500,
  "critical-dark": lightBase.danger700,
  "critical-light": lightBase.danger100,
  "critical-300": lightBase.danger300,
  white: designTokens.colors.white,
  black: lightBase.tertiary900,
  "primary-900": lightBase.primary900,
  "primary-700": lightBase.primary700,
  "primary-500": lightBase.primary500,
  "primary-300": lightBase.primary300,
  "primary-100": lightBase.primary100,
  "neutral-900": lightBase.neutral900,
  "neutral-700": lightBase.neutral700,
  "neutral-500": lightBase.neutral500,
  "neutral-300": lightBase.neutral300,
  "neutral-100": lightBase.neutral100,
  "positive-900": lightBase.positive900,
  "positive-700": lightBase.positive700,
  "positive-500": lightBase.positive500,
  "positive-300": lightBase.positive300,
  "positive-100": lightBase.positive100,
  "warning-900": lightBase.warning900,
  "warning-700": lightBase.warning700,
  "warning-500": lightBase.warning500,
  "warning-300": lightBase.warning300,
  "warning-100": lightBase.warning100,
  "danger-900": lightBase.danger900,
  "danger-700": lightBase.danger700,
  "danger-500": lightBase.danger500,
  "danger-300": lightBase.danger300,
  "danger-100": lightBase.danger100,
}

function normalizeTokenName(token: string) {
  return token.replace(/^--/, "")
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.trim().replace(/^#/, "")
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return hex
  }
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function chartColor(token: string) {
  const normalized = normalizeTokenName(token)
  if (typeof window !== "undefined") {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${normalized}`)
      .trim()
    if (resolved) {
      return resolved
    }
  }
  return tokenFallbacks[normalized] || lightBase.primary700
}

export function chartAlpha(token: string, alpha: number) {
  return hexToRgba(chartColor(token), alpha)
}

export function chartPalette(name: string): string[] {
  switch (name) {
    case "default":
      return [
        chartColor("primary-700"),
        chartColor("neutral"),
        chartColor("positive"),
        chartColor("warning"),
        chartColor("critical"),
      ]
    case "extended":
      return [
        ...chartPalette("default"),
        chartColor("primary-500"),
        chartColor("neutral-dark"),
        chartColor("positive-dark"),
        chartColor("warning-dark"),
        chartColor("critical-dark"),
      ]
    case "status":
      return [
        chartColor("positive"),
        chartColor("neutral"),
        chartColor("warning"),
        chartColor("critical"),
      ]
    case "primary-scale":
      return [
        chartColor("primary-900"),
        chartColor("primary-700"),
        chartColor("primary-500"),
        chartColor("primary-300"),
        chartColor("primary-100"),
      ]
    case "neutral-scale":
      return [
        chartColor("neutral-900"),
        chartColor("neutral-700"),
        chartColor("neutral-500"),
        chartColor("neutral-300"),
        chartColor("neutral-100"),
      ]
    case "positive-scale":
      return [
        chartColor("positive-900"),
        chartColor("positive-700"),
        chartColor("positive-500"),
        chartColor("positive-300"),
        chartColor("positive-100"),
      ]
    case "warning-scale":
      return [
        chartColor("warning-900"),
        chartColor("warning-700"),
        chartColor("warning-500"),
        chartColor("warning-300"),
        chartColor("warning-100"),
      ]
    case "danger-scale":
      return [
        chartColor("danger-900"),
        chartColor("danger-700"),
        chartColor("danger-500"),
        chartColor("danger-300"),
        chartColor("danger-100"),
      ]
    default:
      return chartPalette("default")
  }
}
