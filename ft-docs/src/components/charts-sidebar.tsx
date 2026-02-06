"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const chartCategories = [
  {
    id: "area",
    title: "Area Charts",
    href: "/charts/area",
    variants: [
      { title: "Area Chart", href: "/charts/area#area-chart" },
      { title: "Interactive", href: "/charts/area#interactive" },
      { title: "Last 6 months", href: "/charts/area#last-6-months" },
      { title: "Linear", href: "/charts/area#linear" },
      { title: "Step", href: "/charts/area#step" },
      { title: "Legend", href: "/charts/area#legend" },
      { title: "Stacked", href: "/charts/area#stacked" },
      { title: "Stacked Expanded", href: "/charts/area#stacked-expanded" },
      { title: "Icons", href: "/charts/area#icons" },
      { title: "Gradient", href: "/charts/area#gradient" },
      { title: "Axes", href: "/charts/area#axes" },
    ],
  },
  {
    id: "bar",
    title: "Bar Charts",
    href: "/charts/bar",
    variants: [
      { title: "Basic", href: "/charts/bar#basic" },
      { title: "Horizontal", href: "/charts/bar#horizontal" },
      { title: "Multiple Datasets", href: "/charts/bar#multiple" },
      { title: "Stacked", href: "/charts/bar#stacked" },
      { title: "Stacked Horizontal", href: "/charts/bar#stacked-horizontal" },
      { title: "Rounded", href: "/charts/bar#rounded" },
      { title: "Thin Bars", href: "/charts/bar#thin-bars" },
      { title: "Thick Bars", href: "/charts/bar#thick-bars" },
      { title: "Outlined", href: "/charts/bar#outlined" },
      { title: "Status Colors", href: "/charts/bar#status-colors" },
      { title: "Monochrome", href: "/charts/bar#monochrome" },
      { title: "Neutral Scale", href: "/charts/bar#neutral-scale" },
      { title: "Positive Scale", href: "/charts/bar#positive-scale" },
      { title: "Warning Scale", href: "/charts/bar#warning-scale" },
      { title: "Danger Scale", href: "/charts/bar#danger-scale" },
      { title: "Extended Palette", href: "/charts/bar#extended-palette" },
      { title: "Custom Colors", href: "/charts/bar#custom-colors" },
      { title: "Negative Values", href: "/charts/bar#negative-values" },
      { title: "Progress Style", href: "/charts/bar#progress-style" },
      { title: "With Target Line", href: "/charts/bar#with-target" },
      { title: "Comparison", href: "/charts/bar#comparison" },
      { title: "Minimalist", href: "/charts/bar#minimalist" },
      { title: "Stacked Status", href: "/charts/bar#stacked-status" },
    ],
  },
  {
    id: "line",
    title: "Line Charts",
    href: "/charts/line",
    variants: [
      { title: "Interactive", href: "/charts/line#interactive" },
      { title: "Line Chart", href: "/charts/line#line-chart" },
      { title: "Linear", href: "/charts/line#linear" },
      { title: "Step", href: "/charts/line#step" },
      { title: "Multiple", href: "/charts/line#multiple" },
      { title: "Dots", href: "/charts/line#dots" },
      { title: "Custom Dots", href: "/charts/line#custom-dots" },
      { title: "Dots Colors", href: "/charts/line#dots-colors" },
      { title: "Label", href: "/charts/line#label" },
      { title: "Custom Label", href: "/charts/line#custom-label" },
    ],
  },
  {
    id: "pie",
    title: "Pie Charts",
    href: "/charts/pie",
    variants: [
      { title: "Pie Chart", href: "/charts/pie#pie-chart" },
      { title: "Separator None", href: "/charts/pie#separator-none" },
      { title: "Label", href: "/charts/pie#label" },
      { title: "Custom Label", href: "/charts/pie#custom-label" },
      { title: "Label List", href: "/charts/pie#label-list" },
      { title: "Legend", href: "/charts/pie#legend" },
      { title: "Donut", href: "/charts/pie#donut" },
      { title: "Donut Active", href: "/charts/pie#donut-active" },
      { title: "Donut with Text", href: "/charts/pie#donut-with-text" },
      { title: "Stacked", href: "/charts/pie#stacked" },
      { title: "Interactive", href: "/charts/pie#interactive" },
    ],
  },
  {
    id: "radar",
    title: "Radar Charts",
    href: "/charts/radar",
    variants: [
      { title: "Radar Chart", href: "/charts/radar#radar-chart" },
      { title: "Dots", href: "/charts/radar#dots" },
      { title: "Lines Only", href: "/charts/radar#lines-only" },
      { title: "Custom Label", href: "/charts/radar#custom-label" },
      { title: "Grid Custom", href: "/charts/radar#grid-custom" },
      { title: "Grid None", href: "/charts/radar#grid-none" },
      { title: "Grid Circle", href: "/charts/radar#grid-circle" },
      { title: "Grid Circle No Lines", href: "/charts/radar#grid-circle-no-lines" },
      { title: "Grid Circle Filled", href: "/charts/radar#grid-circle-filled" },
      { title: "Grid Filled", href: "/charts/radar#grid-filled" },
      { title: "Multiple", href: "/charts/radar#multiple" },
      { title: "Legend", href: "/charts/radar#legend" },
    ],
  },
  {
    id: "radial",
    title: "Radial Charts",
    href: "/charts/radial",
    variants: [
      { title: "Radial Chart", href: "/charts/radial#radial-chart" },
      { title: "Label", href: "/charts/radial#label" },
      { title: "Grid", href: "/charts/radial#grid" },
      { title: "Text", href: "/charts/radial#text" },
      { title: "Shape", href: "/charts/radial#shape" },
      { title: "Stacked", href: "/charts/radial#stacked" },
    ],
  },
  {
    id: "scatter",
    title: "Scatter Charts",
    href: "/charts/scatter",
    variants: [
      { title: "Basic", href: "/charts/scatter#basic" },
      { title: "Multiple Datasets", href: "/charts/scatter#multiple" },
      { title: "Custom Points", href: "/charts/scatter#custom-points" },
      { title: "Custom Colors", href: "/charts/scatter#custom-colors" },
      { title: "Status Colors", href: "/charts/scatter#status-colors" },
      { title: "Cluster", href: "/charts/scatter#cluster" },
    ],
  },
  {
    id: "bubble",
    title: "Bubble Charts",
    href: "/charts/bubble",
    variants: [
      { title: "Basic", href: "/charts/bubble#basic" },
      { title: "Multiple Datasets", href: "/charts/bubble#multiple" },
      { title: "Size Scaling", href: "/charts/bubble#size-scaling" },
      { title: "Custom Colors", href: "/charts/bubble#custom-colors" },
      { title: "With Opacity", href: "/charts/bubble#opacity" },
      { title: "Status Colors", href: "/charts/bubble#status-colors" },
    ],
  },
  {
    id: "doughnut",
    title: "Doughnut Charts",
    href: "/charts/doughnut",
    variants: [
      { title: "Basic", href: "/charts/doughnut#basic" },
      { title: "Thin Ring", href: "/charts/doughnut#thin-ring" },
      { title: "Thick Ring", href: "/charts/doughnut#thick-ring" },
      { title: "Status Colors", href: "/charts/doughnut#status-colors" },
      { title: "Monochrome", href: "/charts/doughnut#monochrome" },
      { title: "Custom Colors", href: "/charts/doughnut#custom-colors" },
      { title: "Half Doughnut", href: "/charts/doughnut#half-doughnut" },
      { title: "Extended Palette", href: "/charts/doughnut#extended-palette" },
    ],
  },
  {
    id: "polar",
    title: "Polar Area Charts",
    href: "/charts/polar",
    variants: [
      { title: "Basic", href: "/charts/polar#basic" },
      { title: "Custom Colors", href: "/charts/polar#custom-colors" },
      { title: "Status Colors", href: "/charts/polar#status-colors" },
      { title: "Monochrome", href: "/charts/polar#monochrome" },
      { title: "Extended Data", href: "/charts/polar#extended" },
    ],
  },
  {
    id: "gauge",
    title: "Gauge Charts",
    href: "/charts/gauge",
    variants: [
      { title: "Basic", href: "/charts/gauge#basic" },
      { title: "Custom Range", href: "/charts/gauge#custom-range" },
      { title: "Low Value", href: "/charts/gauge#low-value" },
      { title: "High Value", href: "/charts/gauge#high-value" },
      { title: "Positive Status", href: "/charts/gauge#status-positive" },
      { title: "Warning Status", href: "/charts/gauge#status-warning" },
      { title: "Critical Status", href: "/charts/gauge#status-critical" },
      { title: "Custom Colors", href: "/charts/gauge#custom-colors" },
    ],
  },
  {
    id: "bullet",
    title: "Bullet Charts",
    href: "/charts/bullet",
    variants: [
      { title: "Basic", href: "/charts/bullet#basic" },
      { title: "Exceeds Target", href: "/charts/bullet#exceeds-target" },
      { title: "Below Target", href: "/charts/bullet#below-target" },
      { title: "High Ranges", href: "/charts/bullet#high-ranges" },
      { title: "Multiple Metrics", href: "/charts/bullet#multiple" },
    ],
  },
  {
    id: "waterfall",
    title: "Waterfall Charts",
    href: "/charts/waterfall",
    variants: [
      { title: "Basic", href: "/charts/waterfall#basic" },
      { title: "Financial Flow", href: "/charts/waterfall#financial" },
      { title: "Positive Flow", href: "/charts/waterfall#positive-flow" },
      { title: "Negative Flow", href: "/charts/waterfall#negative-flow" },
      { title: "Budget Analysis", href: "/charts/waterfall#budget" },
    ],
  },
  {
    id: "dual-axes",
    title: "Dual Axes Charts",
    href: "/charts/dual-axes",
    variants: [
      { title: "Basic", href: "/charts/dual-axes#basic" },
      { title: "Multiple Bars", href: "/charts/dual-axes#multiple-bars" },
      { title: "Sales & Conversion", href: "/charts/dual-axes#sales-conversion" },
      { title: "Cost & Efficiency", href: "/charts/dual-axes#cost-efficiency" },
    ],
  },
  {
    id: "horizontal-bar",
    title: "Horizontal Bar Charts",
    href: "/charts/horizontal-bar",
    variants: [
      { title: "Basic", href: "/charts/horizontal-bar#basic" },
      { title: "Ranking", href: "/charts/horizontal-bar#ranking" },
      { title: "Progress Bars", href: "/charts/horizontal-bar#progress" },
      { title: "Stacked", href: "/charts/horizontal-bar#stacked" },
      { title: "Multiple Datasets", href: "/charts/horizontal-bar#multiple" },
    ],
  },
  {
    id: "stacked-bar",
    title: "Stacked Bar (CSS)",
    href: "/charts/stacked-bar",
    variants: [
      { title: "Composable API", href: "/charts/stacked-bar#composable" },
      { title: "Declarative API", href: "/charts/stacked-bar#declarative" },
      { title: "Custom Colors", href: "/charts/stacked-bar#custom-colors" },
      { title: "Custom Height", href: "/charts/stacked-bar#custom-height" },
      { title: "Status Colors", href: "/charts/stacked-bar#status-colors" },
    ],
  },
]

export function ChartsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash : ""))

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash)
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <div className={cn("pb-12", className)}>
      {chartCategories.map((category) => {
        const isCategoryActive = pathname === category.href || pathname.startsWith(category.href + "/")
        return (
          <div key={category.id} className="mb-4">
            <Link
              href={category.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm font-semibold hover:underline",
                isCategoryActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.title}
            </Link>
            {isCategoryActive && category.variants && category.variants.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {category.variants.map((variant, index) => {
                  const variantId = variant.href.split("#")[1] || ""
                  const isVariantActive = hash === `#${variantId}`
                  return (
                    <Link
                      key={index}
                      href={variant.href}
                      onClick={() => {
                        setTimeout(() => setHash(window.location.hash), 0)
                      }}
                      className={cn(
                        "group flex w-full items-center rounded-md border border-transparent px-2 py-0.5 text-xs hover:underline",
                        isVariantActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground/70 hover:text-foreground"
                      )}
                    >
                      {variant.title}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
