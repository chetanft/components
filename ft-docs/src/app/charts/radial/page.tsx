"use client"

import { ChartPage } from "@/components/chart-page"

const radialChartVariants = [
  {
    id: "radial-chart",
    name: "Radial Chart",
    description: "Basic radial/progress chart",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
}

<RadialChart
  title="Completion"
  data={data}
  height={300}
  value={75}
  maxValue={100}
/>`,
  },
  {
    id: "label",
    name: "Radial Chart – Label",
    description: "Radial chart with percentage label",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
}

<RadialChart
  title="Completion"
  data={data}
  height={300}
  value={75}
  maxValue={100}
  showLabel={true}
/>`,
  },
  {
    id: "grid",
    name: "Radial Chart – Grid",
    description: "Radial chart with grid lines",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
}

<RadialChart
  title="Completion"
  data={data}
  height={300}
  value={75}
  maxValue={100}
  showGrid={true}
/>`,
  },
  {
    id: "text",
    name: "Radial Chart – Text",
    description: "Radial chart with custom text label",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
}

<RadialChart
  title="Completion"
  data={data}
  height={300}
  value={75}
  maxValue={100}
  showLabel={true}
  labelFormatter={(value, max) => \`\\\${value}/\\\${max}\`}
/>`,
  },
  {
    id: "shape",
    name: "Radial Chart – Shape",
    description: "Radial chart with custom shape",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
}

<RadialChart
  title="Completion"
  data={data}
  height={300}
  value={75}
  maxValue={100}
  shape="circle"
/>`,
  },
  {
    id: "stacked",
    name: "Radial Chart – Stacked",
    description: "Radial chart with stacked segments",
    code: `import { RadialChart } from "ft-design-system"

const data = {
  labels: ['Progress'],
  datasets: [
    {
      data: [30, 25, 20],
    },
  ],
}

<RadialChart
  title="Multi-segment Progress"
  data={data}
  height={300}
  stacked={true}
/>`,
  },
]

export default function RadialChartsPage() {
  return <ChartPage title="Radial Charts" description="Display progress and single value metrics with radial charts." variants={radialChartVariants} />
}

