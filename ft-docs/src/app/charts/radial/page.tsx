"use client"

import { ComponentPreview } from "@/components/component-preview"

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
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Radial Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display progress and single value metrics with radial charts.
        </p>
      </div>

      <div className="space-y-12">
        {radialChartVariants.map((variant) => (
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

