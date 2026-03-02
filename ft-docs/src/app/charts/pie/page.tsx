"use client"

import { ChartPage } from "@/components/chart-page"

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
  return <ChartPage title="Pie Charts" description="Show proportions and percentages with pie charts." variants={pieChartVariants} />
}

