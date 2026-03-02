"use client"

import { ChartPage } from "@/components/chart-page"

const areaChartVariants = [
  {
    id: "area-chart",
    name: "Area Chart",
    description: "Basic area chart with filled area",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
/>`,
  },
  {
    id: "interactive",
    name: "Area Chart – Interactive",
    description: "Area chart with interactive tooltips and hover effects",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  showDots={true}
/>`,
  },
  {
    id: "last-6-months",
    name: "Area Chart (Last 6 months)",
    description: "Area chart showing last 6 months of data",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors - Last 6 months"
  data={data}
  height={300}
/>`,
  },
  {
    id: "linear",
    name: "Area Chart – Linear",
    description: "Area chart with linear interpolation (no curves)",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  tension={0}
/>`,
  },
  {
    id: "step",
    name: "Area Chart – Step",
    description: "Area chart with step interpolation",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  stepped={true}
/>`,
  },
  {
    id: "legend",
    name: "Area Chart – Legend",
    description: "Area chart with legend displayed",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Desktop',
      data: [120, 190, 150, 250, 220, 300],
    },
    {
      label: 'Mobile',
      data: [80, 120, 100, 180, 150, 200],
    },
  ],
}

<AreaChart
  title="Device Usage"
  data={data}
  height={300}
  showLegend={true}
/>`,
  },
  {
    id: "stacked",
    name: "Area Chart – Stacked",
    description: "Stacked area chart showing cumulative values",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Product A',
      data: [30, 40, 50, 35, 45, 60],
    },
    {
      label: 'Product B',
      data: [20, 30, 25, 35, 30, 40],
    },
  ],
}

<AreaChart
  title="Product Sales"
  data={data}
  height={300}
/>`,
  },
  {
    id: "stacked-expanded",
    name: "Area Chart – Stacked Expanded",
    description: "Stacked area chart with expanded view",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Product A',
      data: [30, 40, 50, 35, 45, 60],
    },
    {
      label: 'Product B',
      data: [20, 30, 25, 35, 30, 40],
    },
  ],
}

<AreaChart
  title="Product Sales"
  data={data}
  height={350}
  options={{
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }}
/>`,
  },
  {
    id: "icons",
    name: "Area Chart – Icons",
    description: "Area chart with icon indicators",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  showDots={true}
/>`,
  },
  {
    id: "gradient",
    name: "Area Chart – Gradient",
    description: "Area chart with gradient fill",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  gradient={true}
/>`,
  },
  {
    id: "axes",
    name: "Area Chart – Axes",
    description: "Area chart with custom axes configuration",
    code: `import { AreaChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
}

<AreaChart
  title="Total Visitors"
  data={data}
  height={300}
  options={{
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }}
/>`,
  },
]

export default function AreaChartsPage() {
  return <ChartPage title="Area Charts" description="Display trends with filled areas underneath the line." variants={areaChartVariants} />
}
