"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const chartTypes = [
  { id: "line", title: "Line Chart", href: "#line-chart" },
  { id: "bar", title: "Bar Chart", href: "#bar-chart" },
  { id: "pie", title: "Pie Chart", href: "#pie-chart" },
  { id: "doughnut", title: "Doughnut Chart", href: "#doughnut-chart" },
  { id: "radar", title: "Radar Chart", href: "#radar-chart" },
  { id: "polar", title: "Polar Area Chart", href: "#polar-chart" },
  { id: "scatter", title: "Scatter Chart", href: "#scatter-chart" },
  { id: "bubble", title: "Bubble Chart", href: "#bubble-chart" },
]

export function ChartsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const scrollToChart = (href: string) => {
    const id = href.replace("#", "")
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className={cn("pb-12", className)}>
      <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
        Chart Types
      </h4>
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {chartTypes.map((chart) => (
          <button
            key={chart.id}
            onClick={() => scrollToChart(chart.href)}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-left hover:underline",
              "text-muted-foreground hover:text-foreground transition-colors"
            )}
          >
            {chart.title}
          </button>
        ))}
      </div>
    </div>
  )
}

