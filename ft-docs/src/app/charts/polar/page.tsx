"use client"

import { ComponentPreview } from "@/components/component-preview"

const polarAreaChartVariants = [
  {
    id: "basic",
    name: "Polar Area Chart – Basic",
    description: "Basic polar area chart for multi-dimensional data",
    code: `import { PolarAreaChart } from "ft-design-system"

const data = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
  datasets: [
    {
      data: [65, 75, 70, 80, 60],
    },
  ],
}

<PolarAreaChart
  title="Vehicle Performance"
  data={data}
  height={350}
/>`,
  },
  {
    id: "custom-colors",
    name: "Polar Area Chart – Custom Colors",
    description: "Polar area chart with custom color palette",
    code: `import { PolarAreaChart } from "ft-design-system"

const data = {
  labels: ['JavaScript', 'Python', 'Java', 'C++', 'Go'],
  datasets: [
    {
      data: [85, 70, 60, 45, 55],
    },
  ],
}

<PolarAreaChart
  title="Language Proficiency"
  data={data}
  height={350}
  defaultColors={['#f9ca24', '#3498db', '#e74c3c', '#9b59b6', '#1abc9c']}
/>`,
  },
  {
    id: "status-colors",
    name: "Polar Area Chart – Status Colors",
    description: "Polar area chart using FT Design System status colors",
    code: `import { PolarAreaChart } from "ft-design-system"

const data = {
  labels: ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'],
  datasets: [
    {
      data: [90, 75, 55, 35, 15],
      backgroundColor: [
        'rgba(0, 198, 56, 0.7)',
        'rgba(24, 144, 255, 0.7)',
        'rgba(255, 190, 7, 0.7)',
        'rgba(255, 108, 25, 0.7)',
        'rgba(255, 53, 51, 0.7)',
      ],
    },
  ],
}

<PolarAreaChart
  title="Performance Ratings"
  data={data}
  height={350}
/>`,
  },
  {
    id: "monochrome",
    name: "Polar Area Chart – Monochrome",
    description: "Polar area chart with monochrome color scale",
    code: `import { PolarAreaChart } from "ft-design-system"

const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [65, 80, 70, 90],
      backgroundColor: [
        'rgba(26, 35, 48, 0.7)',
        'rgba(67, 79, 100, 0.7)',
        'rgba(95, 105, 123, 0.7)',
        'rgba(131, 140, 157, 0.7)',
      ],
    },
  ],
}

<PolarAreaChart
  title="Quarterly Growth"
  data={data}
  height={350}
/>`,
  },
  {
    id: "extended",
    name: "Polar Area Chart – Extended Data",
    description: "Polar area chart with many categories",
    code: `import { PolarAreaChart } from "ft-design-system"

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [45, 60, 55, 70, 80, 40, 35],
    },
  ],
}

<PolarAreaChart
  title="Weekly Activity"
  data={data}
  height={350}
/>`,
  },
]

export default function PolarAreaChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Polar Area Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display multi-dimensional data in a radial format. Each segment extends from the center
          with length proportional to its value, making it easy to compare magnitudes across categories.
        </p>
      </div>

      <div className="space-y-12">
        {polarAreaChartVariants.map((variant) => (
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
