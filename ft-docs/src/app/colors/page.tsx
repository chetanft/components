"use client"

import { designTokens } from "../../../../src/tokens/design-tokens"
import { SiteHeader } from "@/components/site-header"
import { Button } from "../../../../src/components/atoms/Button"
import { useState } from "react"
import { useViewMode } from "@/components/view-mode-context"
import { MachineSpecView } from "@/components/machine-spec-view"
import { buildColorsSpec } from "@/lib/machine-specs/colors"

// Utility functions to convert HEX to RGB and HSL
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "0, 0, 0"
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r}, ${g}, ${b}`
}

function hexToHsl(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return "0, 0%, 0%"

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h: number, s: number, l: number

  l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
      default:
        h = 0
    }
  }

  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `${h}, ${s}%, ${l}%`
}

function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const linear = [r, g, b].map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  const [lr, lg, lb] = linear;

  // Convert to XYZ (D65)
  const X = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const Y = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const Z = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // Convert to Oklab
  const l = Math.cbrt(0.8189330101 * X + 0.3618667424 * Y - 0.1288597137 * Z);
  const m = Math.cbrt(0.0329845436 * X + 0.9293118715 * Y + 0.0361456387 * Z);
  const s = Math.cbrt(0.0482003018 * X + 0.2643662691 * Y + 0.6338517070 * Z);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bOklab = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  // Convert to LCH
  const C = Math.sqrt(a * a + bOklab * bOklab);
  const H = (Math.atan2(bOklab, a) * 180) / Math.PI;
  const hue = (H + 360) % 360;

  const Lperc = Math.round(L * 100);
  const Cperc = Math.round(C * 100);
  const Hdeg = Math.round(hue);

  return `${Lperc}% ${Cperc}% ${Hdeg}deg`;
}

interface ColorSwatch {
  name: string
  hex: string
  rgb: string
  hsl: string
  oklch?: string
  cssVar?: string
  tailwindClass?: string
}

function extractColorScales(mode: 'lightMode' | 'darkMode' | 'nightMode' = 'lightMode') {
  const colors: { [key: string]: ColorSwatch[] } = {}

  // Extract base color scales from selected mode
  const baseColors = designTokens.baseColors[mode]

  // Primary scale
  colors.primary = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('primary'))
    .map(([key, value]) => {
      const shade = key.replace('primary', '')
      return {
        name: `primary-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--primary-${shade}`,
        tailwindClass: `bg-primary-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum // Descending order (900 to 100)
    })

  // Secondary scale
  colors.secondary = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('secondary'))
    .map(([key, value]) => {
      const shade = key.replace('secondary', '')
      return {
        name: `secondary-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--secondary-${shade}`,
        tailwindClass: `bg-secondary-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  // Tertiary scale
  colors.tertiary = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('tertiary'))
    .map(([key, value]) => {
      const shade = key.replace('tertiary', '') || '0'
      return {
        name: `tertiary-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--tertiary-${shade}`,
        tailwindClass: `bg-tertiary-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = a.name.includes('0') ? 0 : parseInt(a.name.split('-')[1]) || 0
      const bNum = b.name.includes('0') ? 0 : parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  // Neutral scale
  colors.neutral = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('neutral'))
    .map(([key, value]) => {
      const shade = key.replace('neutral', '')
      return {
        name: `neutral-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--neutral-${shade}`,
        tailwindClass: `bg-neutral-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  // Positive scale
  colors.positive = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('positive'))
    .map(([key, value]) => {
      const shade = key.replace('positive', '')
      return {
        name: `positive-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--positive-${shade}`,
        tailwindClass: `bg-positive-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  // Warning scale
  colors.warning = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('warning'))
    .map(([key, value]) => {
      const shade = key.replace('warning', '')
      return {
        name: `warning-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--warning-${shade}`,
        tailwindClass: `bg-warning-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  // Danger scale
  colors.danger = Object.entries(baseColors)
    .filter(([key]) => key.startsWith('danger'))
    .map(([key, value]) => {
      const shade = key.replace('danger', '')
      return {
        name: `danger-${shade}`,
        hex: value as string,
        rgb: hexToRgb(value as string),
        hsl: hexToHsl(value as string),
        oklch: hexToOklch(value as string),
        cssVar: `--danger-${shade}`,
        tailwindClass: `bg-danger-${shade}`,
      }
    })
    .sort((a, b) => {
      const aNum = parseInt(a.name.split('-')[1]) || 0
      const bNum = parseInt(b.name.split('-')[1]) || 0
      return bNum - aNum
    })

  return colors
}

const colorFamilies = [
  { name: 'primary', label: 'Primary' },
  { name: 'secondary', label: 'Secondary' },
  { name: 'tertiary', label: 'Tertiary' },
  { name: 'neutral', label: 'Neutral' },
  { name: 'positive', label: 'Positive' },
  { name: 'warning', label: 'Warning' },
  { name: 'danger', label: 'Danger' },
]

export default function ColorsPage() {
  const [selectedFormat, setSelectedFormat] = useState<'hex' | 'rgb' | 'hsl' | 'css' | 'tailwind' | 'oklch'>('hex')
  const [selectedMode, setSelectedMode] = useState<'lightMode' | 'darkMode' | 'nightMode'>('lightMode')
  const [copiedValue, setCopiedValue] = useState<string | null>(null)
  const { viewMode } = useViewMode()

  const colorScales = extractColorScales(selectedMode)

  if (viewMode === 'machine') {
    return <MachineSpecView>{buildColorsSpec()}</MachineSpecView>
  }

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedValue(value)
    setTimeout(() => setCopiedValue(null), 2000)
  }

  const getDisplayValue = (swatch: ColorSwatch): string => {
    switch (selectedFormat) {
      case 'hex':
        return swatch.hex
      case 'rgb':
        return `rgb(${swatch.rgb})`
      case 'hsl':
        return `hsl(${swatch.hsl})`
      case 'css':
        return swatch.cssVar || ''
      case 'tailwind':
        return swatch.tailwindClass || ''
      case 'oklch':
        return swatch.oklch || ''
      default:
        return swatch.hex
    }
  }

  const getContrastColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? 'var(--primary)' : 'var(--bg-primary)'
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Floating "Copied!" tooltip */}
      {copiedValue && (
        <div
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-md border border-border px-4 py-2 text-sm-rem font-medium shadow-lg"
          style={{
            backgroundColor: "var(--bg-primary)",
            color: "var(--primary)",
          }}
          role="status"
          aria-live="polite"
        >
          Copied!
        </div>
      )}
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-3xl-rem font-bold tracking-tight">Colors</h1>
            <p className="text-lg-rem text-muted-foreground">
              The complete color palette in HEX, RGB, HSL, CSS variables, and classes. Ready to copy and paste into your project.
            </p>
          </div>

          {/* Mode and Format Selectors */}
          <div className="mb-8 space-y-4">
            {/* Theme Mode Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm-rem font-semibold text-foreground">Theme:</label>
              <div className="flex flex-wrap gap-2">
                {(['lightMode', 'darkMode', 'nightMode'] as const).map((mode) => (
                  <Button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    variant={selectedMode === mode ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    {mode === 'lightMode' ? 'Light' : mode === 'darkMode' ? 'Dark' : 'Night'}
                  </Button>
                ))}
              </div>
            </div>

            {/* Format Selector */}
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-sm-rem font-semibold text-foreground">Format:</label>
              <div className="flex flex-wrap gap-2">
                {(['hex', 'rgb', 'hsl', 'css', 'tailwind', 'oklch'] as const).map((format) => (
                  <Button
                    key={format}
                    onClick={() => setSelectedFormat(format)}
                    variant={selectedFormat === format ? 'primary' : 'secondary'}
                    size="sm"
                  >
                    {format.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Color Families */}
          <div className="space-y-12">
            {colorFamilies.map((family) => {
              const swatches = colorScales[family.name as keyof typeof colorScales] || []
              return (
                <div key={family.name} className="space-y-4">
                  <h2 className="text-xl-rem font-semibold capitalize">{family.label}</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-11">
                    {swatches.map((swatch) => {
                      const displayValue = getDisplayValue(swatch)
                      const isCopied = copiedValue === displayValue
                      const shade = swatch.name.split('-')[1]
                      return (
                        <div
                          key={swatch.name}
                          className="group cursor-pointer space-y-2"
                          onClick={() => copyToClipboard(displayValue)}
                          title="Click to copy"
                        >
                          <div
                            className="relative h-24 w-full rounded-md border shadow-sm transition-transform hover:scale-105"
                            style={{ backgroundColor: swatch.hex }}
                          >
                            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md">
                              <span
                                className="text-lg-rem font-semibold"
                                style={{ color: getContrastColor(swatch.hex) }}
                              >
                                {shade}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm-rem font-medium">{swatch.name}</div>
                            <div className="font-mono text-xs-rem text-muted-foreground break-all">
                              {displayValue}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
