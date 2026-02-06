"use client"

import { ComponentPreview } from "@/components/component-preview"

const waterfallChartVariants = [
  {
    id: "basic",
    name: "Waterfall Chart – Basic",
    description: "Basic waterfall chart showing incremental changes",
    code: `import { WaterfallChart } from "ft-design-system"

const data = [
  { label: 'Start', value: 100 },
  { label: 'Sales', value: 50 },
  { label: 'Expenses', value: -30 },
  { label: 'Taxes', value: -15 },
  { label: 'End', value: 0 },
]

<WaterfallChart
  title="Profit Analysis"
  data={data}
  height={300}
/>`,
  },
  {
    id: "financial",
    name: "Waterfall Chart – Financial Flow",
    description: "Waterfall chart showing financial statement breakdown",
    code: `import { WaterfallChart } from "ft-design-system"

const data = [
  { label: 'Revenue', value: 500 },
  { label: 'COGS', value: -200 },
  { label: 'Gross Profit', value: 0 },
  { label: 'Operating Exp', value: -120 },
  { label: 'Other Income', value: 30 },
  { label: 'Net Income', value: 0 },
]

<WaterfallChart
  title="Income Statement"
  data={data}
  height={350}
/>`,
  },
  {
    id: "positive-flow",
    name: "Waterfall Chart – Positive Flow",
    description: "Waterfall chart with mostly positive values",
    code: `import { WaterfallChart } from "ft-design-system"

const data = [
  { label: 'Q1', value: 100 },
  { label: 'Q2', value: 45 },
  { label: 'Q3', value: 60 },
  { label: 'Q4', value: 80 },
]

<WaterfallChart
  title="Quarterly Growth"
  data={data}
  height={300}
/>`,
  },
  {
    id: "negative-flow",
    name: "Waterfall Chart – Negative Flow",
    description: "Waterfall chart showing decline",
    code: `import { WaterfallChart } from "ft-design-system"

const data = [
  { label: 'Initial', value: 200 },
  { label: 'Loss 1', value: -40 },
  { label: 'Loss 2', value: -35 },
  { label: 'Loss 3', value: -25 },
  { label: 'Recovery', value: 20 },
]

<WaterfallChart
  title="Value Decline Analysis"
  data={data}
  height={300}
/>`,
  },
  {
    id: "budget",
    name: "Waterfall Chart – Budget Analysis",
    description: "Waterfall chart for budget variance analysis",
    code: `import { WaterfallChart } from "ft-design-system"

const data = [
  { label: 'Budget', value: 1000 },
  { label: 'Marketing', value: -150 },
  { label: 'Development', value: -300 },
  { label: 'Operations', value: -200 },
  { label: 'HR', value: -100 },
  { label: 'Savings', value: 50 },
  { label: 'Remaining', value: 0 },
]

<WaterfallChart
  title="Budget Allocation"
  data={data}
  height={350}
/>`,
  },
]

export default function WaterfallChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Waterfall Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Visualize cumulative effect of sequential positive and negative values.
          Waterfall charts are ideal for financial analysis, budget breakdowns, and showing
          how an initial value is affected by a series of changes.
        </p>
      </div>

      <div className="space-y-12">
        {waterfallChartVariants.map((variant) => (
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
