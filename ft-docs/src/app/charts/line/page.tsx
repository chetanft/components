"use client"

import { ComponentPreview } from "@/components/component-preview"

const lineChartVariants = [
  {
    id: "interactive",
    name: "Line Chart – Interactive",
    description: "Interactive line chart with hover effects",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showDots={true}
/>`,
  },
  {
    id: "line-chart",
    name: "Line Chart",
    description: "Basic line chart",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
    {
      label: 'Revenue',
      data: [8, 15, 12, 20, 18, 25],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
/>`,
  },
  {
    id: "linear",
    name: "Line Chart – Linear",
    description: "Line chart with linear interpolation",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  tension={0}
/>`,
  },
  {
    id: "step",
    name: "Line Chart – Step",
    description: "Line chart with step interpolation",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  stepped={true}
/>`,
  },
  {
    id: "multiple",
    name: "Line Chart – Multiple",
    description: "Line chart with multiple datasets",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
    {
      label: 'Revenue',
      data: [8, 15, 12, 20, 18, 25],
    },
  ],
}

<LineChart
  title="Sales & Revenue"
  data={data}
  height={300}
/>`,
  },
  {
    id: "dots",
    name: "Line Chart – Dots",
    description: "Line chart with visible data points",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showDots={true}
/>`,
  },
  {
    id: "custom-dots",
    name: "Line Chart – Custom Dots",
    description: "Line chart with custom dot styling",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showDots={true}
  dotRadius={6}
/>`,
  },
  {
    id: "dots-colors",
    name: "Line Chart – Dots Colors",
    description: "Line chart with custom dot colors",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showDots={true}
  dotColors={['#ff0036']}
/>`,
  },
  {
    id: "label",
    name: "Line Chart – Label",
    description: "Line chart with data labels",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showLabel={true}
/>`,
  },
  {
    id: "custom-label",
    name: "Line Chart – Custom Label",
    description: "Line chart with custom label formatter",
    code: `import { LineChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<LineChart
  title="Sales Trend"
  data={data}
  height={300}
  showLabel={true}
  labelFormatter={(value) => \`$\\\${value}k\`}
/>`,
  },
]

export default function LineChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Line Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display trends and changes over time with line charts.
        </p>
      </div>

      <div className="space-y-12">
        {lineChartVariants.map((variant) => (
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

