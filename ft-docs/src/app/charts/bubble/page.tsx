"use client"

import { ComponentPreview } from "@/components/component-preview"

const bubbleChartVariants = [
  {
    id: "basic",
    name: "Bubble Chart – Basic",
    description: "Basic bubble chart with x, y position and radius for size dimension",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Dataset A',
      data: [
        { x: 10, y: 20, r: 10 },
        { x: 20, y: 30, r: 15 },
        { x: 30, y: 25, r: 8 },
        { x: 40, y: 35, r: 20 },
        { x: 50, y: 40, r: 12 },
      ],
    },
  ],
}

<BubbleChart
  title="Basic Bubble Chart"
  data={data}
  height={300}
/>`,
  },
  {
    id: "multiple",
    name: "Bubble Chart – Multiple Datasets",
    description: "Bubble chart comparing multiple categories",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'North America',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 35, y: 45, r: 20 },
        { x: 50, y: 35, r: 12 },
      ],
    },
    {
      label: 'Europe',
      data: [
        { x: 25, y: 25, r: 18 },
        { x: 40, y: 40, r: 14 },
        { x: 55, y: 30, r: 10 },
      ],
    },
    {
      label: 'Asia Pacific',
      data: [
        { x: 30, y: 35, r: 22 },
        { x: 45, y: 50, r: 16 },
        { x: 60, y: 40, r: 25 },
      ],
    },
  ],
}

<BubbleChart
  title="Regional Performance"
  data={data}
  height={350}
/>`,
  },
  {
    id: "size-scaling",
    name: "Bubble Chart – Size Scaling",
    description: "Bubble chart demonstrating different size representations",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Market Size',
      data: [
        { x: 10, y: 20, r: 5 },   // Small
        { x: 25, y: 35, r: 12 },  // Medium
        { x: 40, y: 25, r: 20 },  // Large
        { x: 55, y: 45, r: 30 },  // Extra Large
        { x: 70, y: 30, r: 40 },  // Huge
      ],
    },
  ],
}

<BubbleChart
  title="Market Size Comparison"
  data={data}
  height={350}
/>`,
  },
  {
    id: "custom-colors",
    name: "Bubble Chart – Custom Colors",
    description: "Bubble chart with custom color palette",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Q1',
      data: [
        { x: 15, y: 25, r: 15 },
        { x: 30, y: 40, r: 18 },
      ],
    },
    {
      label: 'Q2',
      data: [
        { x: 20, y: 30, r: 12 },
        { x: 35, y: 45, r: 20 },
      ],
    },
    {
      label: 'Q3',
      data: [
        { x: 25, y: 35, r: 16 },
        { x: 40, y: 50, r: 22 },
      ],
    },
  ],
}

<BubbleChart
  title="Quarterly Growth"
  data={data}
  height={350}
  defaultColors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
/>`,
  },
  {
    id: "opacity",
    name: "Bubble Chart – With Opacity",
    description: "Bubble chart with semi-transparent bubbles for overlapping data",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Category A',
      data: [
        { x: 20, y: 30, r: 25 },
        { x: 35, y: 35, r: 30 },
        { x: 30, y: 40, r: 20 },
      ],
      backgroundColor: 'rgba(66, 189, 189, 0.5)',
      borderColor: '#42bdbd',
    },
    {
      label: 'Category B',
      data: [
        { x: 25, y: 32, r: 22 },
        { x: 40, y: 38, r: 28 },
        { x: 35, y: 42, r: 18 },
      ],
      backgroundColor: 'rgba(8, 40, 247, 0.5)',
      borderColor: '#0828f7',
    },
  ],
}

<BubbleChart
  title="Overlapping Analysis"
  data={data}
  height={350}
/>`,
  },
  {
    id: "status-colors",
    name: "Bubble Chart – Status Colors",
    description: "Bubble chart using FT Design System status colors",
    code: `import { BubbleChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Healthy Projects',
      data: [
        { x: 80, y: 90, r: 20 },
        { x: 85, y: 85, r: 15 },
        { x: 90, y: 95, r: 25 },
      ],
      backgroundColor: 'rgba(0, 198, 56, 0.6)',
      borderColor: '#00c638',
    },
    {
      label: 'At Risk',
      data: [
        { x: 50, y: 55, r: 18 },
        { x: 55, y: 60, r: 12 },
      ],
      backgroundColor: 'rgba(255, 108, 25, 0.6)',
      borderColor: '#ff6c19',
    },
    {
      label: 'Critical',
      data: [
        { x: 20, y: 25, r: 22 },
        { x: 25, y: 20, r: 16 },
      ],
      backgroundColor: 'rgba(255, 53, 51, 0.6)',
      borderColor: '#ff3533',
    },
  ],
}

<BubbleChart
  title="Project Health Overview"
  data={data}
  height={350}
/>`,
  },
]

export default function BubbleChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Bubble Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display three dimensions of data with bubble charts. The x and y axes show position,
          while the bubble size represents a third variable.
        </p>
      </div>

      <div className="space-y-12">
        {bubbleChartVariants.map((variant) => (
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
