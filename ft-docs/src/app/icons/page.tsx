"use client"

import { Icon } from "../../../../src/components/atoms/Icons/Icon"
import type { IconName } from "../../../../src/components/atoms/Icons/Icon"
import { SiteHeader } from "@/components/site-header"
import { useState, useMemo, useEffect } from "react"

// All available icon names - manually maintained to avoid importing all icon components
const iconNames: IconName[] = [
  'add', 'add-trip', 'aeroplane', 'airtel', 'alert-critical-fill', 'alert-critical',
  'alert-informational-fill', 'alert-informational', 'arrow-bottom-left', 'arrow-down-right',
  'arrow-down', 'arrow-top-left', 'arrow-top-right', 'arrow-up', 'backward', 'bell',
  'bsnl', 'bulk-actions', 'bulk-trip', 'bundle', 'calendar-clock', 'calendar', 'cheap',
  'check-alt', 'check-fill', 'check', 'chevron-down', 'chevron-left', 'chevron-right',
  'chevron-up', 'clock', 'clock-alert', 'clock-cross', 'clock-tick', 'clock-warning', 'close-filled', 'comment', 'compress', 'consent-available', 'consent-pending', 'consent-rejected', 'control-tower', 'copy', 'cross-icon',
  'cross', 'cursor-pointer', 'dashboard', 'data-stack', 'default-icon', 'delete',
  'detention-at-destination', 'detention-at-origin', 'diversion', 'division', 'document-reuse', 'document', 'download',
  'drag', 'edit', 'eway-bill-expired', 'excel', 'expand', 'export-file', 'eye-invisible',
  'file-alt', 'file-upload', 'file-uploader', 'file', 'fill-details', 'filter', 'flame', 'forward',
  'ft-colour', 'ft-gray', 'gmail-logo', 'google-colour', 'google-drive', 'google-gray', 'gps', 'gst', 'hamburger-menu', 'hand', 'help-circle', 'home',
  'image', 'arrow-left', 'indent', 'jio', 'light-bulb', 'link', 'loading', 'locate', 'location', 'lock', 'logout',
  'long-stoppage', 'mail', 'map', 'megaphone', 'more', 'more-options', 'mtnl', 'multiple-location', 'multiple-time',
  'multiple-weight', 'my-trip', 'navigator', 'no-signal', 'notification', 'noted', 'octagon-alert-filled', 'one-drive', 'organisation', 'outbound',
  'parcel-check', 'password', 'pause', 'pause-filled', 'pen', 'phone-alt', 'phone', 'plant-alt', 'plant', 'planning', 'play-fill',
  'play', 'portable-tracking', 'preview-fill', 'preview', 'recommended', 'refresh', 'remove',
  'reports', 'road', 'rocket', 'route-deviation', 'round-trip', 'rupee-coin', 'satellite', 'save', 'search',
  'send', 'settlement', 'settings', 'shake-hand', 'share', 'shield-alert', 'ship', 'sim', 'small-truck', 'sort', 'star',
  'stop', 'streetview', 'strength-high', 'strength-low', 'strength-medium', 'strength-no-tracking', 'subtract',
  'success', 'tata', 'temperature-cold', 'temperature-default', 'temperature-hot',
  'three-dot-menu', 'time', 'timer', 'tracker', 'tracking-interrupted', 'train', 'transit-delay',
  'triangle-alert', 'trolley', 'truck', 'untracked', 'user', 'vehicle', 'vodafone', 'warehouse', 'weight', 'whatsapp',
  'contracted-bill', 'upload-document', 'part-truck-load', 'reconciliation', 'burger', 'menu'
]

// Icon style categories
const iconStyleCategories = {
  'All': iconNames,
  'Single Tone': iconNames.filter(name =>
    !name.includes('-fill') &&
    !name.includes('filled') &&
    !name.includes('colour') &&
    !name.includes('gray') &&
    !name.includes('logo') &&
    !['dashboard', 'control-tower', 'my-trip', 'reports', 'indent', 'add-trip', 'bulk-trip', 'truck', 'settlement', 'strength-high', 'strength-medium', 'strength-low', 'strength-no-tracking', 'planning', 'home', 'notification', 'route-deviation', 'diversion', 'detention-at-destination', 'tracking-interrupted', 'untracked', 'transit-delay', 'detention-at-origin', 'eway-bill-expired', 'contracted-bill', 'part-truck-load', 'upload-document', 'reconciliation', 'sim', 'lock', 'default-icon', 'long-stoppage'].includes(name)
  ),
  'Double Tone': ['dashboard', 'control-tower', 'my-trip', 'reports', 'indent', 'add-trip', 'bulk-trip', 'truck', 'settlement', 'strength-high', 'strength-medium', 'strength-low', 'strength-no-tracking', 'planning', 'home', 'notification', 'route-deviation', 'diversion', 'detention-at-destination', 'tracking-interrupted', 'untracked', 'transit-delay', 'detention-at-origin', 'eway-bill-expired', 'contracted-bill', 'part-truck-load', 'upload-document', 'reconciliation', 'sim', 'lock', 'default-icon', 'long-stoppage'],
  'Filled': iconNames.filter(name =>
    name.includes('-fill') ||
    name.includes('filled') ||
    name === 'close-filled' ||
    name === 'pause-filled' ||
    name === 'octagon-alert-filled' ||
    name === 'preview-fill' ||
    name === 'play-fill'
  ),
  'Logos': ['google-colour', 'google-gray', 'ft-colour', 'ft-gray', 'airtel', 'jio', 'vodafone', 'bsnl', 'mtnl', 'tata', 'gmail-logo', 'whatsapp', 'streetview', 'one-drive', 'google-drive']
} as const

// Legacy functional categories (for backward compatibility)
const iconCategories = {
  'All': iconNames,
  'Navigation': ['chevron-up', 'chevron-down', 'chevron-left', 'chevron-right', 'arrow-up', 'arrow-down', 'arrow-top-left', 'arrow-top-right', 'arrow-bottom-left', 'arrow-down-right', 'backward', 'forward', 'expand'],
  'Actions': ['add', 'subtract', 'edit', 'delete', 'save', 'copy', 'share', 'download', 'upload-document', 'remove', 'refresh'],
  'Status': ['check', 'check-alt', 'check-fill', 'cross', 'cross-icon', 'alert-critical', 'alert-critical-fill', 'alert-informational', 'alert-informational-fill', 'success', 'loading', 'close-filled'],
  'File & Document': ['file', 'file-alt', 'file-upload', 'file-uploader', 'document', 'document-reuse', 'excel', 'export-file', 'eway-bill-expired', 'contracted-bill'],
  'Communication': ['mail', 'phone', 'phone-alt', 'comment', 'send', 'notification', 'bell'],
  'Location & Maps': ['location', 'multiple-location', 'gps', 'map', 'navigator', 'road', 'route-deviation', 'diversion', 'detention-at-origin', 'long-stoppage', 'transit-delay', 'tracking-interrupted'],
  'Business & Logistics': ['warehouse', 'vehicle', 'truck', 'ship', 'train', 'aeroplane', 'weight', 'multiple-weight', 'time', 'multiple-time', 'organisation', 'user', 'shake-hand', 'bundle', 'bulk-trip', 'add-trip', 'round-trip', 'my-trip', 'part-truck-load'],
  'Temperature & Environment': ['temperature-cold', 'temperature-default', 'temperature-hot', 'plant', 'plant-alt', 'light-bulb'],
  'Brand': ['google-colour', 'google-gray', 'ft-colour', 'ft-gray', 'airtel', 'jio', 'vodafone', 'bsnl', 'mtnl', 'tata'],
  'UI & System': ['eye-invisible', 'password', 'lock', 'cursor-pointer', 'drag', 'more', 'three-dot-menu', 'hamburger-menu', 'burger', 'menu', 'preview', 'preview-fill', 'bulk-actions', 'filter', 'search', 'sort', 'settings', 'dashboard', 'control-tower', 'planning', 'reports', 'indent', 'data-stack', 'division'],
  'Financial & Commerce': ['rupee-coin', 'cheap', 'recommended', 'rocket', 'settlement', 'reconciliation'],
  'Utility': ['clock', 'calendar', 'calendar-clock', 'portable-tracking', 'sim', 'link', 'logout', 'home', 'star', 'play', 'play-fill', 'fill-details', 'strength-high', 'strength-low', 'strength-medium', 'strength-no-tracking', 'tracker', 'untracked', 'arrow-left', 'outbound', 'pen', 'default-icon']
} as const

type CategoryName = keyof typeof iconCategories
type StyleCategoryName = keyof typeof iconStyleCategories

export default function IconsPage() {
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>("All")
  const [iconColor, setIconColor] = useState("var(--primary)") // FT DS primary color
  const [iconSize, setIconSize] = useState(24) // var(--x6) = 24px
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [absoluteStrokeWidth, setAbsoluteStrokeWidth] = useState(false)
  const [viewMode, setViewMode] = useState<"all" | "categories" | "styles">("all")
  const [selectedStyleCategory, setSelectedStyleCategory] = useState<StyleCategoryName>("All")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<IconName | null>(null)
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false)

  const copyToClipboard = (text: string, type: "name" | "svg" | "jsx" = "name") => {
    navigator.clipboard.writeText(text)
    if (type === "name" && selectedIcon) {
      setCopiedIcon(selectedIcon)
      setTimeout(() => setCopiedIcon(null), 2000)
    }
  }

  const handleIconClick = (iconName: IconName) => {
    try {
      console.log("Icon clicked:", iconName)
      setSelectedIcon(iconName)
      setBottomSheetOpen(true)
      console.log("Bottom sheet should open")
    } catch (error) {
      console.error("Error opening icon details:", error)
    }
  }

  const getIconJSX = (iconName: IconName): string => {
    return `<Icon name="${iconName}" size={${iconSize}} color="${iconColor}" />`
  }

  const getIconImport = (iconName: IconName): string => {
    return `import { Icon } from "ft-design-system"\n\n<Icon name="${iconName}" size={${iconSize}} color="${iconColor}" />`
  }

  const downloadSVG = () => {
    if (!selectedIcon) return

    // Find the rendered icon SVG in the preview area
    const previewContainer = document.querySelector('[data-icon-preview]')
    const svgElement = previewContainer?.querySelector('svg')

    if (svgElement) {
      // Clone the SVG element
      const svgClone = svgElement.cloneNode(true) as SVGElement

      // Update attributes for standalone SVG
      svgClone.setAttribute('width', String(iconSize))
      svgClone.setAttribute('height', String(iconSize))
      svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

      // Serialize to string
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgClone)

      // Create blob and download
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedIcon}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } else {
      // Fallback: create a basic SVG
      const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Icon: ${selectedIcon} -->
  <!-- Note: This is a placeholder. The actual icon SVG should be extracted from the component. -->
</svg>`
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${selectedIcon}.svg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  const downloadPNG = () => {
    if (!selectedIcon) return

    // Find the rendered icon SVG in the preview area
    const previewContainer = document.querySelector('[data-icon-preview]')
    const svgElement = previewContainer?.querySelector('svg')

    if (svgElement) {
      // Clone the SVG element
      const svgClone = svgElement.cloneNode(true) as SVGElement
      svgClone.setAttribute('width', String(iconSize))
      svgClone.setAttribute('height', String(iconSize))

      // Serialize to string
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgClone)

      // Create blob URL from SVG
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
      const svgUrl = URL.createObjectURL(svgBlob)

      // Create image from SVG
      const img = new Image()
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = iconSize * 2 // Higher resolution
        canvas.height = iconSize * 2
        const ctx = canvas.getContext('2d')

        if (ctx) {
          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Draw image scaled up for better quality
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

          // Convert to PNG and download
          canvas.toBlob((blob) => {
            if (blob) {
              const pngUrl = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = pngUrl
              link.download = `${selectedIcon}.png`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(pngUrl)
            }
            URL.revokeObjectURL(svgUrl)
          }, 'image/png')
        }
      }

      img.onerror = () => {
        console.error('Failed to load SVG for PNG conversion')
        URL.revokeObjectURL(svgUrl)
        alert('Failed to convert icon to PNG. Please try again.')
      }

      img.src = svgUrl
    } else {
      alert('Icon preview not found. Please try again.')
    }
  }

  const filteredIcons = useMemo(() => {
    let icons: IconName[] = []

    if (viewMode === "styles") {
      const styleCategoryIcons = iconStyleCategories[selectedStyleCategory]
      if (Array.isArray(styleCategoryIcons)) {
        icons = styleCategoryIcons.filter((iconName): iconName is IconName =>
          iconNames.includes(iconName as IconName)
        ) as IconName[]
      }
    } else if (viewMode === "categories") {
      const categoryIcons = iconCategories[selectedCategory]
      if (Array.isArray(categoryIcons)) {
        icons = categoryIcons.filter((iconName): iconName is IconName =>
          iconNames.includes(iconName as IconName)
        ) as IconName[]
      }
    } else {
      icons = iconNames
    }

    if (searchQuery) {
      icons = icons.filter((iconName) =>
        iconName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return icons
  }, [searchQuery, selectedCategory, selectedStyleCategory, viewMode])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    const categoriesToCount = viewMode === "styles" ? iconStyleCategories : iconCategories
    Object.keys(categoriesToCount).forEach((cat) => {
      if (cat === 'All') {
        counts[cat] = iconNames.length
      } else {
        const categoryIcons = categoriesToCount[cat as keyof typeof categoriesToCount]
        if (Array.isArray(categoryIcons)) {
          counts[cat] = categoryIcons.filter((iconName) =>
            iconNames.includes(iconName as IconName)
          ).length
        } else {
          counts[cat] = 0
        }
      }
    })
    return counts
  }, [viewMode])

  // Keyboard support for bottom sheet - must be after filteredIcons is defined
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && bottomSheetOpen) {
        setBottomSheetOpen(false)
      }
      // Arrow key navigation
      if (bottomSheetOpen && selectedIcon) {
        if (e.key === "ArrowLeft") {
          const currentIndex = filteredIcons.indexOf(selectedIcon)
          if (currentIndex > 0) {
            setSelectedIcon(filteredIcons[currentIndex - 1])
          }
        } else if (e.key === "ArrowRight") {
          const currentIndex = filteredIcons.indexOf(selectedIcon)
          if (currentIndex < filteredIcons.length - 1) {
            setSelectedIcon(filteredIcons[currentIndex + 1])
          }
        }
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [bottomSheetOpen, selectedIcon, filteredIcons])

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (bottomSheetOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [bottomSheetOpen])

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="flex h-[calc(100vh-3.5rem)] relative">
          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar Customizer */}
          <aside className={`fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-64 border-r bg-background lg:bg-muted/30 p-6 overflow-y-auto transform transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}>
            <div className="space-y-6">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h2 className="font-semibold" style={{ fontSize: 'var(--font-size-lg-rem)' }}>
                  {/* 20px → 1.429rem (responsive) */}
                  Customizer
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIconColor("var(--primary)"); // FT DS primary color
                      setIconSize(24); // var(--x6) = 24px
                      setStrokeWidth(2);
                      setAbsoluteStrokeWidth(false);
                    }}
                    className="p-2 hover:bg-muted rounded-md transition-colors cursor-pointer"
                    type="button"
                    title="Reset to defaults"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none">
                      <path d="M1 8a7 7 0 0 1 7-7v2M15 8a7 7 0 0 1-7 7v-2M8 1v6m0 2v6" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 hover:bg-muted rounded-md"
                    type="button"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 5L5 15M5 5l10 10" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="hidden lg:flex items-center justify-between mb-4">
                  <h2 className="font-semibold" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
                    {/* 14px → 1rem (responsive) */}
                    Customizer
                  </h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIconColor("var(--primary)"); // FT DS primary color
                      setIconSize(24); // var(--x6) = 24px
                      setStrokeWidth(2);
                      setAbsoluteStrokeWidth(false);
                    }}
                    className="p-1.5 hover:bg-muted rounded-md transition-colors cursor-pointer"
                    type="button"
                    title="Reset to defaults"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none">
                      <path d="M1 8a7 7 0 0 1 7-7v2M15 8a7 7 0 0 1-7 7v-2M8 1v6m0 2v6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* Color */}
                <div className="space-y-2 mb-4">
                  <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                    {/* 12px → 0.857rem (responsive) */}
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={iconColor === "currentColor" || iconColor.startsWith("var(") ? 
                        (typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary-700').trim() || "#434f64" : "#434f64")
                        : iconColor}
                      onChange={(e) => setIconColor(e.target.value)}
                      className="h-8 w-16 rounded border cursor-pointer"
                      style={{ borderColor: 'var(--border-primary)' }}
                    />
                    <input
                      type="text"
                      value={iconColor}
                      onChange={(e) => setIconColor(e.target.value)}
                      className="flex-1 h-8 rounded-md border border-input bg-background px-2"
                      style={{ fontSize: 'var(--font-size-xs-rem)' }}
                      placeholder="currentColor"
                    />
                  </div>
                </div>

                {/* Stroke width */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                      {/* 12px → 0.857rem (responsive) */}
                      Stroke width
                    </label>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>{strokeWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4"
                    step="0.5"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Size */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                      {/* 12px → 0.857rem (responsive) */}
                      Size
                    </label>
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>{iconSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="48"
                    value={iconSize}
                    onChange={(e) => setIconSize(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Absolute Stroke width */}
                <div className="flex items-center justify-between mb-4">
                  <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                    {/* 12px → 0.857rem (responsive) */}
                    Absolute Stroke width
                  </label>
                  <button
                    onClick={() => setAbsoluteStrokeWidth(!absoluteStrokeWidth)}
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${absoluteStrokeWidth ? "bg-primary" : "bg-muted"
                      }`}
                    type="button"
                    role="switch"
                    aria-checked={absoluteStrokeWidth}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${absoluteStrokeWidth ? "translate-x-5" : "translate-x-0"
                        }`}
                    />
                  </button>
                </div>
              </div>

              {/* View Mode */}
              <div className="space-y-2">
                <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                  {/* 12px → 0.857rem (responsive) */}
                  View
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setViewMode("all")
                      setSelectedCategory("All")
                      setSelectedStyleCategory("All")
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${viewMode === "all"
                      ? "bg-primary"
                      : "bg-background border hover:bg-muted"
                      }`}
                    style={{ fontSize: 'var(--font-size-xs-rem)', ...(viewMode === "all" ? { color: 'var(--bg-primary)' } : {}) }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => {
                      setViewMode("styles")
                      setSelectedStyleCategory("All")
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${viewMode === "styles"
                      ? "bg-primary"
                      : "bg-background border hover:bg-muted"
                      }`}
                    style={{ fontSize: 'var(--font-size-xs-rem)', ...(viewMode === "styles" ? { color: 'var(--bg-primary)' } : {}) }}
                  >
                    Styles
                  </button>
                  <button
                    onClick={() => {
                      setViewMode("categories")
                      setSelectedCategory("All")
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${viewMode === "categories"
                      ? "bg-primary"
                      : "bg-background border hover:bg-muted"
                      }`}
                    style={{ fontSize: 'var(--font-size-xs-rem)', ...(viewMode === "categories" ? { color: 'var(--bg-primary)' } : {}) }}
                  >
                    Categories
                  </button>
                </div>
              </div>

              {/* Style Categories */}
              {viewMode === "styles" && (
                <div className="space-y-2">
                  <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                    {/* 12px → 0.857rem (responsive) */}
                    Style Categories
                  </label>
                  <div className="space-y-1 max-h-[400px] overflow-y-auto">
                    {Object.keys(iconStyleCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedStyleCategory(category as StyleCategoryName)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedStyleCategory === category
                          ? "bg-primary"
                          : "hover:bg-muted"
                          }`}
                        style={{ fontSize: 'var(--font-size-xs-rem)', ...(selectedStyleCategory === category ? { color: 'var(--bg-primary)' } : {}) }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category}</span>
                          <span className="text-muted-foreground">
                            {categoryCounts[category]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Functional Categories */}
              {viewMode === "categories" && (
                <div className="space-y-2">
                  <label className="font-medium text-muted-foreground" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
                    {/* 12px → 0.857rem (responsive) */}
                    Categories
                  </label>
                  <div className="space-y-1 max-h-[400px] overflow-y-auto">
                    {Object.keys(iconCategories).map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category as CategoryName)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category
                          ? "bg-primary"
                          : "hover:bg-muted"
                          }`}
                        style={{ fontSize: 'var(--font-size-xs-rem)', ...(selectedCategory === category ? { color: 'var(--bg-primary)' } : {}) }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{category}</span>
                          <span className="text-muted-foreground">
                            {categoryCounts[category]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b bg-background p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="lg:hidden p-2 hover:bg-muted rounded-md"
                      type="button"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 5h14M3 10h14M3 15h14" />
                      </svg>
                    </button>
                    <h1 className="font-bold tracking-tight" style={{ fontSize: 'var(--font-size-xl-rem)' }}>
                      {/* 24px → 1.714rem (responsive) */}
                      Icons
                    </h1>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
                    {/* 14px → 1rem (responsive) */}
                    Browse all {iconNames.length} icons from the design system
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md rounded-md border border-input bg-background px-4 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  style={{ fontSize: 'var(--font-size-sm-rem)' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 4L4 12M4 4l8 8" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Icons Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
                  {filteredIcons.map((iconName) => {
                    const isCopied = copiedIcon === iconName
                    return (
                      <div
                        key={iconName}
                        onClick={() => handleIconClick(iconName)}
                        className={`group flex cursor-pointer flex-col items-center gap-2 rounded-lg border bg-card p-4 transition-all hover:border-primary hover:shadow-md ${selectedIcon === iconName ? "border-primary ring-2 ring-primary/20" : ""
                          }`}
                        title={`Click to view: ${iconName}`}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted/50 group-hover:bg-muted transition-colors">
                          <Icon
                            name={iconName}
                            size={iconSize}
                            color={iconColor}
                          />
                        </div>
                        <div className="w-full space-y-1 text-center">
                          <div className="text-xs font-medium leading-tight break-words">
                            {iconName}
                          </div>
                          {isCopied && (
                            <div className="text-xs text-primary font-medium">Copied!</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 text-muted-foreground">
                    <Icon name="search" size={48} color="currentColor" />
                  </div>
                  <p className="text-muted-foreground">
                    No icons found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Sheet - Outside main to avoid z-index/overflow issues */}
      {bottomSheetOpen && selectedIcon && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[9999] transition-opacity"
            onClick={() => {
              console.log("Closing bottom sheet")
              setBottomSheetOpen(false)
            }}
          />

          {/* Bottom Sheet */}
          <div
            className="fixed inset-x-0 bottom-0 z-[10000] border-t border-border rounded-t-2xl shadow-2xl max-h-[90vh] flex flex-col transform transition-transform duration-300 ease-out"
            style={{
              backgroundColor: 'var(--bg-primary)',
              opacity: 1
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing" onMouseDown={(e) => {
              const startY = e.clientY
              const startHeight = window.innerHeight * 0.9
              const handleMove = (moveEvent: MouseEvent) => {
                const deltaY = moveEvent.clientY - startY
                const newHeight = Math.max(200, Math.min(window.innerHeight * 0.9, startHeight - deltaY))
                // Could implement drag to close here
              }
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove)
                document.removeEventListener('mouseup', handleUp)
              }
              document.addEventListener('mousemove', handleMove)
              document.addEventListener('mouseup', handleUp)
            }}>
              <div className="w-12 h-1.5 bg-muted rounded-full" />
            </div>

            {/* Content */}
            <div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: 'var(--bg-primary)' }}
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
                  {/* Left: Large Icon Preview */}
                  <div className="flex flex-col items-center justify-center">
                    <div
                      data-icon-preview
                      className="w-full max-w-md aspect-square flex items-center justify-center bg-muted/30 rounded-2xl mb-6 border border-border"
                    >
                      <Icon
                        name={selectedIcon}
                        size={200}
                        color={iconColor}
                        style={absoluteStrokeWidth ? { strokeWidth: `${strokeWidth}px` } : undefined}
                      />
                    </div>
                    <div className="text-center w-full">
                      <h2 className="text-3xl font-bold mb-2">{selectedIcon}</h2>
                      <p className="text-sm text-muted-foreground">
                        {viewMode === "categories" && selectedCategory !== "All"
                          ? `Category: ${selectedCategory}`
                          : "Icon from design system"}
                      </p>
                    </div>
                  </div>

                  {/* Right: Code & Actions */}
                  <div className="space-y-6">
                    {/* Header with Close */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const currentIndex = filteredIcons.indexOf(selectedIcon)
                            if (currentIndex > 0) {
                              setSelectedIcon(filteredIcons[currentIndex - 1])
                            }
                          }}
                          disabled={filteredIcons.indexOf(selectedIcon) === 0}
                          className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          type="button"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 15l-5-5 5-5" />
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            const currentIndex = filteredIcons.indexOf(selectedIcon)
                            if (currentIndex < filteredIcons.length - 1) {
                              setSelectedIcon(filteredIcons[currentIndex + 1])
                            }
                          }}
                          disabled={filteredIcons.indexOf(selectedIcon) === filteredIcons.length - 1}
                          className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          type="button"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8 5l5 5-5 5" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => setBottomSheetOpen(false)}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        type="button"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 5L5 15M5 5l10 10" />
                        </svg>
                      </button>
                    </div>

                    {/* Usage Tab */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Usage</h3>
                        <button
                          onClick={() => copyToClipboard(getIconImport(selectedIcon), "jsx")}
                          className="px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <pre className="text-sm font-mono overflow-x-auto">
                          <code>{getIconImport(selectedIcon)}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Copy Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => copyToClipboard(getIconJSX(selectedIcon), "jsx")}
                        className="flex-1 px-4 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 2h6v2h2v10H5V2zM3 4h10v10H3V4z" />
                        </svg>
                        <span>Copy JSX</span>
                      </button>
                      <button
                        onClick={() => {
                          copyToClipboard(selectedIcon, "name")
                        }}
                        className="flex-1 px-4 py-3 bg-primary rounded-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        style={{ color: 'var(--bg-primary)' }}
                      >
                        <span>Copy Name</span>
                        {copiedIcon === selectedIcon && (
                          <span className="text-xs">✓</span>
                        )}
                      </button>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={downloadSVG}
                        className="flex-1 px-4 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.21314 14L14.2435 7.96968C14.444 7.76916 14.4422 7.44227 14.2395 7.23956C14.0368 7.03686 13.7099 7.03509 13.5094 7.23562L8.57661 12.1684L8.52022 1.73294C8.51867 1.44781 8.28628 1.21542 8.00115 1.21387C7.71603 1.21233 7.48613 1.44223 7.48767 1.72736L7.54407 12.1628L2.55766 7.17643C2.35495 6.97373 2.02807 6.97196 1.82754 7.17249C1.62701 7.37301 1.62878 7.6999 1.83149 7.90261L7.92891 14H1.5C1.22386 14 1 14.2239 1 14.5C1 14.7762 1.22386 15 1.5 15H14.5C14.7761 15 15 14.7762 15 14.5C15 14.2239 14.7761 14 14.5 14H8.21314Z" fill="currentColor" />
                        </svg>
                        <span>Download SVG</span>
                      </button>
                      <button
                        onClick={downloadPNG}
                        className="flex-1 px-4 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8.21314 14L14.2435 7.96968C14.444 7.76916 14.4422 7.44227 14.2395 7.23956C14.0368 7.03686 13.7099 7.03509 13.5094 7.23562L8.57661 12.1684L8.52022 1.73294C8.51867 1.44781 8.28628 1.21542 8.00115 1.21387C7.71603 1.21233 7.48613 1.44223 7.48767 1.72736L7.54407 12.1628L2.55766 7.17643C2.35495 6.97373 2.02807 6.97196 1.82754 7.17249C1.62701 7.37301 1.62878 7.6999 1.83149 7.90261L7.92891 14H1.5C1.22386 14 1 14.2239 1 14.5C1 14.7762 1.22386 15 1.5 15H14.5C14.7761 15 15 14.7762 15 14.5C15 14.2239 14.7761 14 14.5 14H8.21314Z" fill="currentColor" />
                        </svg>
                        <span>Download PNG</span>
                      </button>
                    </div>

                    {/* Properties */}
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Size:</span>
                          <span className="ml-2 font-medium">{iconSize}px</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Color:</span>
                          <span className="ml-2 font-medium font-mono text-xs">{iconColor}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">ESC</kbd> to close
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
