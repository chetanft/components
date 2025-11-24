"use client"

import { ComponentPreview } from "@/components/component-preview"

const pieChartVariants = [
  {
    id: "pie-chart",
    name: "Pie Chart",
    description: "Basic pie chart",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
/>`,
  },
  {
    id: "separator-none",
    name: "Pie Chart – Separator None",
    description: "Pie chart without separators between segments",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  separatorWidth={0}
/>`,
  },
  {
    id: "label",
    name: "Pie Chart – Label",
    description: "Pie chart with data labels",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  showLabels={true}
/>`,
  },
  {
    id: "custom-label",
    name: "Pie Chart – Custom Label",
    description: "Pie chart with custom label formatter",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  showLabels={true}
  labelFormatter={(label, value, total) => \`\\\${label}: \\\${Math.round((value / total) * 100)}%\`}
/>`,
  },
  {
    id: "label-list",
    name: "Pie Chart – Label List",
    description: "Pie chart with label list display",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  showLabels={true}
  showLegend={true}
/>`,
  },
  {
    id: "legend",
    name: "Pie Chart – Legend",
    description: "Pie chart with legend displayed",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  showLegend={true}
/>`,
  },
  {
    id: "donut",
    name: "Pie Chart – Donut",
    description: "Pie chart with hollow center (donut style)",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  donut={true}
/>`,
  },
  {
    id: "donut-active",
    name: "Pie Chart – Donut Active",
    description: "Donut chart with active segment highlighting",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  donut={true}
  donutActive={true}
/>`,
  },
  {
    id: "donut-with-text",
    name: "Pie Chart – Donut with Text",
    description: "Donut chart with center text",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  donut={true}
  donutText="Total"
/>`,
  },
  {
    id: "stacked",
    name: "Pie Chart – Stacked",
    description: "Stacked pie chart",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  stacked={true}
/>`,
  },
  {
    id: "interactive",
    name: "Pie Chart – Interactive",
    description: "Interactive pie chart with hover effects",
    code: `import { PieChart } from "ft-design-system"

const data = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
}

<PieChart
  title="Device Usage"
  data={data}
  height={300}
  options={{
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  }}
/>`,
  },
]

export default function PieChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Pie Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Show proportions and percentages with pie charts.
        </p>
      </div>

      <div className="space-y-12">
        {pieChartVariants.map((variant) => (
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

