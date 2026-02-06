"use client"

import { ComponentPreview } from "@/components/component-preview"

const gaugeChartVariants = [
  {
    id: "basic",
    name: "Gauge Chart – Basic",
    description: "Basic gauge chart showing a value from 0-100",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="CPU Usage"
  value={72}
  height={250}
/>`,
  },
  {
    id: "custom-range",
    name: "Gauge Chart – Custom Range",
    description: "Gauge chart with custom min/max range",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Temperature"
  value={28}
  min={0}
  max={50}
  height={250}
/>`,
  },
  {
    id: "low-value",
    name: "Gauge Chart – Low Value",
    description: "Gauge chart displaying a low percentage",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Error Rate"
  value={15}
  height={250}
  color="#00c638"
/>`,
  },
  {
    id: "high-value",
    name: "Gauge Chart – High Value",
    description: "Gauge chart displaying a high percentage",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Memory Usage"
  value={92}
  height={250}
  color="#ff3533"
/>`,
  },
  {
    id: "status-positive",
    name: "Gauge Chart – Positive Status",
    description: "Gauge chart with positive (green) color",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Uptime"
  value={99.9}
  min={0}
  max={100}
  height={250}
  color="#00c638"
  backgroundColor="#deffe7"
/>`,
  },
  {
    id: "status-warning",
    name: "Gauge Chart – Warning Status",
    description: "Gauge chart with warning (orange) color",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Disk Space"
  value={75}
  height={250}
  color="#ff6c19"
  backgroundColor="#ffedbc"
/>`,
  },
  {
    id: "status-critical",
    name: "Gauge Chart – Critical Status",
    description: "Gauge chart with critical (red) color",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="System Load"
  value={95}
  height={250}
  color="#ff3533"
  backgroundColor="#ffeafa"
/>`,
  },
  {
    id: "custom-colors",
    name: "Gauge Chart – Custom Colors",
    description: "Gauge chart with custom foreground and background colors",
    code: `import { GaugeChart } from "ft-design-system"

<GaugeChart
  title="Progress"
  value={68}
  height={250}
  color="#0828f7"
  backgroundColor="#ecf6ff"
/>`,
  },
]

export default function GaugeChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Gauge Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display single metrics in a speedometer-style visualization. Gauge charts are ideal
          for showing KPIs, percentages, and progress toward a goal.
        </p>
      </div>

      <div className="space-y-12">
        {gaugeChartVariants.map((variant) => (
          <div key={variant.id} id={variant.id} className="scroll-mt-20 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{variant.name}</h2>
              <p className="text-sm text-muted-foreground">{variant.description}</p>
            </div>
            <ComponentPreview code={variant.code} />
          </div>
        ))}
      </div>
    </div>
  )
}
