"use client"

import { ComponentPreview } from "@/components/component-preview"

const doughnutChartVariants = [
  {
    id: "basic",
    name: "Doughnut Chart – Basic",
    description: "Basic doughnut chart with default inner radius",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [55, 35, 10],
    },
  ],
}

<DoughnutChart
  title="Device Distribution"
  data={data}
  height={300}
/>`,
  },
  {
    id: "thin-ring",
    name: "Doughnut Chart – Thin Ring",
    description: "Doughnut chart with larger inner radius for thin ring appearance",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Completed', 'In Progress', 'Pending'],
  datasets: [
    {
      data: [65, 25, 10],
    },
  ],
}

<DoughnutChart
  title="Task Progress"
  data={data}
  height={300}
  innerRadius={75}
/>`,
  },
  {
    id: "thick-ring",
    name: "Doughnut Chart – Thick Ring",
    description: "Doughnut chart with smaller inner radius for thick ring appearance",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Sales', 'Marketing', 'Development', 'Support'],
  datasets: [
    {
      data: [30, 25, 28, 17],
    },
  ],
}

<DoughnutChart
  title="Budget Allocation"
  data={data}
  height={300}
  innerRadius={30}
/>`,
  },
  {
    id: "status-colors",
    name: "Doughnut Chart – Status Colors",
    description: "Doughnut chart using FT Design System status colors",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Passed', 'Warning', 'Failed'],
  datasets: [
    {
      data: [78, 15, 7],
      backgroundColor: ['#00c638', '#ff6c19', '#ff3533'],
    },
  ],
}

<DoughnutChart
  title="Test Results"
  data={data}
  height={300}
/>`,
  },
  {
    id: "monochrome",
    name: "Doughnut Chart – Monochrome",
    description: "Doughnut chart with monochrome color scale",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
  datasets: [
    {
      data: [10, 20, 35, 25, 10],
      backgroundColor: ['#1a2330', '#434f64', '#5f697b', '#838c9d', '#c5cad3'],
    },
  ],
}

<DoughnutChart
  title="Priority Distribution"
  data={data}
  height={300}
/>`,
  },
  {
    id: "custom-colors",
    name: "Doughnut Chart – Custom Colors",
    description: "Doughnut chart with custom color palette",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Product A', 'Product B', 'Product C', 'Product D'],
  datasets: [
    {
      data: [40, 30, 20, 10],
    },
  ],
}

<DoughnutChart
  title="Product Mix"
  data={data}
  height={300}
  defaultColors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24']}
/>`,
  },
  {
    id: "half-doughnut",
    name: "Doughnut Chart – Half Doughnut",
    description: "Semi-circular doughnut chart for gauge-like displays",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Used', 'Available'],
  datasets: [
    {
      data: [72, 28],
      backgroundColor: ['#42bdbd', '#e1e2e4'],
    },
  ],
}

<DoughnutChart
  title="Storage Usage"
  data={data}
  height={250}
  options={{
    circumference: 180,
    rotation: -90,
  }}
/>`,
  },
  {
    id: "extended-palette",
    name: "Doughnut Chart – Extended Palette",
    description: "Doughnut chart with many segments using extended color palette",
    code: `import { DoughnutChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      data: [12, 15, 10, 18, 14, 11, 16, 13],
      backgroundColor: [
        '#42bdbd', '#0828f7', '#1793e8', '#ff0036', '#ffbe07',
        '#3caaaa', '#0724de', '#1584d1'
      ],
    },
  ],
}

<DoughnutChart
  title="Monthly Distribution"
  data={data}
  height={300}
/>`,
  },
]

export default function DoughnutChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Doughnut Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display proportional data with a ring-style chart. Doughnut charts are similar to pie charts
          but with a hollow center, making them ideal for showing part-to-whole relationships.
        </p>
      </div>

      <div className="space-y-12">
        {doughnutChartVariants.map((variant) => (
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
