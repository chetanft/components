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
