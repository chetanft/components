"use client"

import { ChartPage } from "@/components/chart-page"

const scatterChartVariants = [
  {
    id: "basic",
    name: "Scatter Chart – Basic",
    description: "Basic scatter plot for displaying correlation between two variables",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Dataset A',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
        { x: 20, y: 30 },
        { x: 25, y: 28 },
        { x: 30, y: 35 },
        { x: 35, y: 40 },
      ],
    },
  ],
}

<ScatterChart
  title="Basic Scatter Plot"
  data={data}
  height={300}
/>`,
  },
  {
    id: "multiple",
    name: "Scatter Chart – Multiple Datasets",
    description: "Scatter plot with multiple datasets for comparison",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Product A',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 28 },
        { x: 20, y: 35 },
        { x: 25, y: 32 },
        { x: 30, y: 40 },
      ],
    },
    {
      label: 'Product B',
      data: [
        { x: 12, y: 15 },
        { x: 18, y: 22 },
        { x: 22, y: 28 },
        { x: 28, y: 35 },
        { x: 32, y: 42 },
      ],
    },
    {
      label: 'Product C',
      data: [
        { x: 8, y: 25 },
        { x: 14, y: 30 },
        { x: 19, y: 38 },
        { x: 24, y: 45 },
        { x: 29, y: 50 },
      ],
    },
  ],
}

<ScatterChart
  title="Multi-Dataset Comparison"
  data={data}
  height={300}
/>`,
  },
  {
    id: "custom-points",
    name: "Scatter Chart – Custom Point Sizes",
    description: "Scatter plot with custom point radius for emphasis",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Large Points',
      data: [
        { x: 10, y: 20 },
        { x: 20, y: 35 },
        { x: 30, y: 28 },
        { x: 40, y: 45 },
        { x: 50, y: 38 },
      ],
      pointRadius: 10,
      pointHoverRadius: 14,
    },
  ],
}

<ScatterChart
  title="Large Point Scatter"
  data={data}
  height={300}
/>`,
  },
  {
    id: "custom-colors",
    name: "Scatter Chart – Custom Colors",
    description: "Scatter plot with custom color palette",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Sales',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 25 },
        { x: 20, y: 30 },
        { x: 25, y: 28 },
        { x: 30, y: 35 },
      ],
    },
    {
      label: 'Revenue',
      data: [
        { x: 12, y: 18 },
        { x: 18, y: 24 },
        { x: 22, y: 32 },
        { x: 28, y: 30 },
        { x: 32, y: 38 },
      ],
    },
  ],
}

<ScatterChart
  title="Custom Colors"
  data={data}
  height={300}
  defaultColors={chartPalette('default').slice(0, 2)}
/>`,
  },
  {
    id: "status-colors",
    name: "Scatter Chart – Status Colors",
    description: "Scatter plot using FT Design System status colors",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Healthy',
      data: [
        { x: 10, y: 80 },
        { x: 15, y: 85 },
        { x: 20, y: 90 },
        { x: 25, y: 88 },
      ],
      backgroundColor: chartColor('positive'),
      borderColor: chartColor('positive'),
    },
    {
      label: 'Warning',
      data: [
        { x: 30, y: 55 },
        { x: 35, y: 60 },
        { x: 40, y: 52 },
      ],
      backgroundColor: chartColor('warning'),
      borderColor: chartColor('warning'),
    },
    {
      label: 'Critical',
      data: [
        { x: 45, y: 25 },
        { x: 50, y: 20 },
        { x: 55, y: 15 },
      ],
      backgroundColor: chartColor('critical'),
      borderColor: chartColor('critical'),
    },
  ],
}

<ScatterChart
  title="System Health Status"
  data={data}
  height={300}
/>`,
  },
  {
    id: "cluster",
    name: "Scatter Chart – Cluster Visualization",
    description: "Scatter plot showing data clusters",
    code: `import { ScatterChart } from "ft-design-system"

const data = {
  datasets: [
    {
      label: 'Cluster A',
      data: [
        { x: 10, y: 12 }, { x: 12, y: 14 }, { x: 11, y: 11 },
        { x: 13, y: 15 }, { x: 14, y: 13 }, { x: 12, y: 12 },
      ],
      backgroundColor: chartAlpha('primary-700', 0.6),
      borderColor: chartColor('primary-700'),
    },
    {
      label: 'Cluster B',
      data: [
        { x: 30, y: 32 }, { x: 32, y: 34 }, { x: 31, y: 31 },
        { x: 33, y: 35 }, { x: 34, y: 33 }, { x: 32, y: 32 },
      ],
      backgroundColor: chartAlpha('neutral-dark', 0.6),
      borderColor: chartColor('neutral-dark'),
    },
    {
      label: 'Cluster C',
      data: [
        { x: 50, y: 15 }, { x: 52, y: 17 }, { x: 51, y: 14 },
        { x: 53, y: 18 }, { x: 54, y: 16 }, { x: 52, y: 15 },
      ],
      backgroundColor: chartAlpha('critical', 0.6),
      borderColor: chartColor('critical'),
    },
  ],
}

<ScatterChart
  title="Customer Segments"
  data={data}
  height={300}
/>`,
  },
]

export default function ScatterChartsPage() {
  return <ChartPage title="Scatter Charts" description="Display correlations and distributions between two variables with scatter plots. Ideal for identifying patterns, clusters, and outliers in data." variants={scatterChartVariants} />
}
