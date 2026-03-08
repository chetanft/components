"use client"

import { ChartPage } from "@/components/chart-page"

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
      backgroundColor: [chartColor('positive'), chartColor('warning'), chartColor('critical')],
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
      backgroundColor: [chartColor('primary-900'), chartColor('primary-700'), chartColor('primary-500'), chartColor('primary-300'), chartColor('primary-100')],
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
  defaultColors={chartPalette('default').slice(0, 4)}
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
      backgroundColor: [chartColor('primary-700'), chartColor('border-secondary')],
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
        chartColor('primary-700'), chartColor('neutral-dark'), chartColor('neutral'), chartColor('critical'), chartColor('warning'),
        chartColor('primary-500'), chartColor('neutral-900'), chartColor('neutral-dark')
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
  return <ChartPage title="Doughnut Charts" description="Display proportional data with a ring-style chart. Doughnut charts are similar to pie charts but with a hollow center, making them ideal for showing part-to-whole relationships." variants={doughnutChartVariants} />
}
