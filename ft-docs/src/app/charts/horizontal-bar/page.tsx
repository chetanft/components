"use client"

import { ChartPage } from "@/components/chart-page"

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
      backgroundColor: [chartColor('warning'), chartColor('primary-100'), chartColor('warning-dark'), chartColor('primary-700'), chartColor('primary-500')],
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
      backgroundColor: [chartColor('positive'), chartColor('neutral'), chartColor('warning'), chartColor('positive')],
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
      backgroundColor: chartColor('positive'),
    },
    {
      label: 'In Progress',
      data: [25, 22, 32, 18],
      backgroundColor: chartColor('neutral'),
    },
    {
      label: 'Pending',
      data: [30, 40, 40, 30],
      backgroundColor: chartColor('primary-300'),
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
  return <ChartPage title="Horizontal Bar Charts" description="Display categorical data with horizontal bars. Ideal for rankings, comparisons, and data with long category labels." variants={horizontalBarChartVariants} />
}
