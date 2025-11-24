"use client"

import { ComponentPreview } from "@/components/component-preview"

const radarChartVariants = [
  {
    id: "radar-chart",
    name: "Radar Chart",
    description: "Basic radar chart",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
/>`,
  },
  {
    id: "dots",
    name: "Radar Chart – Dots",
    description: "Radar chart with visible data points",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  showDots={true}
/>`,
  },
  {
    id: "lines-only",
    name: "Radar Chart – Lines Only",
    description: "Radar chart showing only lines without fill",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  linesOnly={true}
/>`,
  },
  {
    id: "custom-label",
    name: "Radar Chart – Custom Label",
    description: "Radar chart with custom label formatter",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  labelFormatter={(label) => label.toUpperCase()}
/>`,
  },
  {
    id: "grid-custom",
    name: "Radar Chart – Grid Custom",
    description: "Radar chart with custom grid styling",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="default"
/>`,
  },
  {
    id: "grid-none",
    name: "Radar Chart – Grid None",
    description: "Radar chart without grid lines",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="none"
/>`,
  },
  {
    id: "grid-circle",
    name: "Radar Chart – Grid Circle",
    description: "Radar chart with circular grid",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="circle"
/>`,
  },
  {
    id: "grid-circle-no-lines",
    name: "Radar Chart – Grid Circle, No Lines",
    description: "Radar chart with circular grid but no radial lines",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="circle"
  linesOnly={true}
/>`,
  },
  {
    id: "grid-circle-filled",
    name: "Radar Chart – Grid Circle Filled",
    description: "Radar chart with filled circular grid",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="filled"
/>`,
  },
  {
    id: "grid-filled",
    name: "Radar Chart – Grid Filled",
    description: "Radar chart with filled grid areas",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
}

<RadarChart
  title="Product Performance"
  data={data}
  height={400}
  gridType="filled"
/>`,
  },
  {
    id: "multiple",
    name: "Radar Chart – Multiple",
    description: "Radar chart comparing multiple datasets",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
    {
      label: 'Product B',
      data: [70, 85, 80, 88, 75, 85],
    },
  ],
}

<RadarChart
  title="Product Comparison"
  data={data}
  height={400}
/>`,
  },
  {
    id: "legend",
    name: "Radar Chart – Legend",
    description: "Radar chart with legend displayed",
    code: `import { RadarChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
    {
      label: 'Product B',
      data: [70, 85, 80, 88, 75, 85],
    },
  ],
}

<RadarChart
  title="Product Comparison"
  data={data}
  height={400}
  showLegend={true}
/>`,
  },
]

export default function RadarChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Radar Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Compare multiple variables across different categories.
        </p>
      </div>

      <div className="space-y-12">
        {radarChartVariants.map((variant) => (
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

