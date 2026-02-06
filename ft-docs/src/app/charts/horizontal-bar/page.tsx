"use client"

import { ComponentPreview } from "@/components/component-preview"

const horizontalBarChartVariants = [
  {
    id: "basic",
    name: "Horizontal Bar Chart – Basic",
    description: "Basic horizontal bar chart for categorical comparisons",
    code: `import { HorizontalBarChart } from "ft-design-system"

const data = {
  labels: ['United States', 'China', 'Japan', 'Germany', 'India'],
  datasets: [
    {
      label: 'GDP (Trillion USD)',
      data: [25.5, 18.3, 4.2, 4.1, 3.5],
    },
  ],
}

<HorizontalBarChart
  title="Top 5 Economies"
  data={data}
  height={300}
/>`,
  },
  {
    id: "ranking",
    name: "Horizontal Bar Chart – Ranking",
    description: "Leaderboard-style ranking with horizontal bars",
    code: `import { HorizontalBarChart } from "ft-design-system"

const data = {
  labels: ['Alice', 'Bob', 'Carol', 'David', 'Eve'],
  datasets: [
    {
      label: 'Sales ($K)',
      data: [125, 98, 87, 72, 65],
      backgroundColor: ['#ffbe07', '#c5cad3', '#cd7f32', '#42bdbd', '#42bdbd'],
    },
  ],
}

<HorizontalBarChart
  title="Sales Leaderboard"
  data={data}
  height={300}
/>`,
  },
  {
    id: "progress",
    name: "Horizontal Bar Chart – Progress Bars",
    description: "Progress-style horizontal bars with percentage scale",
    code: `import { HorizontalBarChart } from "ft-design-system"

const data = {
  labels: ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'],
  datasets: [
    {
      label: 'Completion',
      data: [85, 65, 45, 92],
      backgroundColor: ['#00c638', '#1890ff', '#ff6c19', '#00c638'],
      borderRadius: 4,
    },
  ],
}

<HorizontalBarChart
  title="Project Progress"
  data={data}
  height={250}
  options={{
    scales: {
      x: {
        max: 100,
        ticks: {
          callback: (value) => value + '%',
        },
      },
    },
  }}
/>`,
  },
  {
    id: "stacked",
    name: "Horizontal Bar Chart – Stacked",
    description: "Stacked horizontal bars for composition analysis",
    code: `import { HorizontalBarChart } from "ft-design-system"

const data = {
  labels: ['Engineering', 'Design', 'Marketing', 'Sales'],
  datasets: [
    {
      label: 'Completed',
      data: [45, 38, 28, 52],
      backgroundColor: '#00c638',
    },
    {
      label: 'In Progress',
      data: [25, 22, 32, 18],
      backgroundColor: '#1890ff',
    },
    {
      label: 'Pending',
      data: [30, 40, 40, 30],
      backgroundColor: '#838c9d',
    },
  ],
}

<HorizontalBarChart
  title="Task Status by Team"
  data={data}
  height={300}
  options={{
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  }}
/>`,
  },
  {
    id: "multiple",
    name: "Horizontal Bar Chart – Multiple Datasets",
    description: "Grouped horizontal bars for comparison",
    code: `import { HorizontalBarChart } from "ft-design-system"

const data = {
  labels: ['North', 'South', 'East', 'West'],
  datasets: [
    {
      label: '2023',
      data: [45, 38, 52, 28],
    },
    {
      label: '2024',
      data: [55, 42, 60, 35],
    },
  ],
}

<HorizontalBarChart
  title="Regional Sales Comparison"
  data={data}
  height={300}
/>`,
  },
]

export default function HorizontalBarChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Horizontal Bar Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display categorical data with horizontal bars. Ideal for rankings, comparisons,
          and data with long category labels.
        </p>
      </div>

      <div className="space-y-12">
        {horizontalBarChartVariants.map((variant) => (
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
