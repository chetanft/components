"use client"

import { ComponentPreview } from "@/components/component-preview"

const dualAxesChartVariants = [
  {
    id: "basic",
    name: "Dual Axes Chart – Basic",
    description: "Bar and line combination chart with two Y-axes",
    code: `import { DualAxesChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      type: 'bar',
      label: 'Revenue ($K)',
      data: [120, 150, 180, 160, 200, 220],
      yAxisID: 'y',
      backgroundColor: '#42bdbd',
    },
    {
      type: 'line',
      label: 'Growth (%)',
      data: [5, 8, 12, 10, 15, 18],
      yAxisID: 'y1',
      borderColor: '#ff0036',
      backgroundColor: '#ff0036',
    },
  ],
}

<DualAxesChart
  title="Revenue vs Growth Rate"
  data={data}
  height={350}
/>`,
  },
  {
    id: "multiple-bars",
    name: "Dual Axes Chart – Multiple Bars with Line",
    description: "Multiple bar datasets with a line overlay",
    code: `import { DualAxesChart } from "ft-design-system"

const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      type: 'bar',
      label: 'Product A',
      data: [80, 95, 110, 130],
      yAxisID: 'y',
      backgroundColor: '#42bdbd',
    },
    {
      type: 'bar',
      label: 'Product B',
      data: [60, 75, 85, 100],
      yAxisID: 'y',
      backgroundColor: '#0828f7',
    },
    {
      type: 'line',
      label: 'Target',
      data: [90, 100, 110, 120],
      yAxisID: 'y1',
      borderColor: '#ff0036',
      borderDash: [5, 5],
      pointRadius: 0,
    },
  ],
}

<DualAxesChart
  title="Product Performance vs Target"
  data={data}
  height={350}
/>`,
  },
  {
    id: "sales-conversion",
    name: "Dual Axes Chart – Sales & Conversion",
    description: "Sales volume with conversion rate overlay",
    code: `import { DualAxesChart } from "ft-design-system"

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      type: 'bar',
      label: 'Visitors',
      data: [1200, 1500, 1300, 1800, 2000, 2500, 1800],
      yAxisID: 'y',
      backgroundColor: '#1793e8',
    },
    {
      type: 'line',
      label: 'Conversion Rate (%)',
      data: [3.2, 3.8, 3.5, 4.2, 4.5, 5.0, 4.8],
      yAxisID: 'y1',
      borderColor: '#00c638',
      backgroundColor: '#00c638',
      tension: 0.4,
    },
  ],
}

<DualAxesChart
  title="Traffic & Conversion Analysis"
  data={data}
  height={350}
/>`,
  },
  {
    id: "cost-efficiency",
    name: "Dual Axes Chart – Cost & Efficiency",
    description: "Cost bars with efficiency line",
    code: `import { DualAxesChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      type: 'bar',
      label: 'Operating Cost ($K)',
      data: [85, 82, 78, 75, 72, 68],
      yAxisID: 'y',
      backgroundColor: '#ff6c19',
    },
    {
      type: 'line',
      label: 'Efficiency Score',
      data: [72, 75, 78, 82, 85, 90],
      yAxisID: 'y1',
      borderColor: '#00c638',
      backgroundColor: '#00c638',
    },
  ],
}

<DualAxesChart
  title="Cost Reduction & Efficiency Gains"
  data={data}
  height={350}
/>`,
  },
]

export default function DualAxesChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Dual Axes Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Combine different chart types with two Y-axes to compare metrics with different scales.
          Ideal for showing relationships between volume and rate metrics.
        </p>
      </div>

      <div className="space-y-12">
        {dualAxesChartVariants.map((variant) => (
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
