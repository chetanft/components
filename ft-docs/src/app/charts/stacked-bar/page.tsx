"use client"

import { ComponentPreview } from "@/components/component-preview"

const stackedBarChartVariants = [
  {
    id: "composable",
    name: "Stacked Bar Chart – Composable API",
    description: "Recommended composable API for building stacked bar charts",
    code: `import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment
} from "ft-design-system"

<StackedBarChart title="Ageing Analysis">
  <StackedBarChartBar label="4+ hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#42bdbd" />
    <StackedBarChartSegment label="Singh Transporters" value={43} color="#0828f7" />
    <StackedBarChartSegment label="Others" value={48} color="#1793e8" />
  </StackedBarChartBar>
  <StackedBarChartBar label="2-4 hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={25} color="#42bdbd" />
    <StackedBarChartSegment label="Singh Transporters" value={35} color="#0828f7" />
    <StackedBarChartSegment label="Others" value={36} color="#1793e8" />
  </StackedBarChartBar>
  <StackedBarChartBar label="<2 hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#42bdbd" />
    <StackedBarChartSegment label="Singh Transporters" value={33} color="#0828f7" />
    <StackedBarChartSegment label="Others" value={23} color="#1793e8" />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
  {
    id: "declarative",
    name: "Stacked Bar Chart – Declarative API",
    description: "Declarative data-driven API (deprecated, use composable API instead)",
    code: `import { StackedBarChart } from "ft-design-system"

const data = [
  {
    label: '4+ hrs',
    segments: [
      { label: 'Laxmi Transporters', value: 27 },
      { label: 'Singh Transporters', value: 43 },
      { label: 'Others', value: 48 },
    ],
  },
  {
    label: '2-4 hrs',
    segments: [
      { label: 'Laxmi Transporters', value: 25 },
      { label: 'Singh Transporters', value: 35 },
      { label: 'Others', value: 36 },
    ],
  },
]

const legend = [
  { label: 'Laxmi Transporters', color: '#ffb3c3' },
  { label: 'Singh Transporters', color: '#ff809a' },
  { label: 'Others', color: '#ff6384' },
]

<StackedBarChart
  title="Ageing"
  data={data}
  legend={legend}
/>`,
  },
  {
    id: "custom-colors",
    name: "Stacked Bar Chart – Custom Colors",
    description: "Using FT Design System colors with custom palette",
    code: `import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment
} from "ft-design-system"

<StackedBarChart
  title="Quarterly Sales"
  defaultColors={['#42bdbd', '#0828f7', '#1793e8']}
>
  <StackedBarChartBar label="Q1">
    <StackedBarChartSegment label="Product A" value={30} />
    <StackedBarChartSegment label="Product B" value={45} />
    <StackedBarChartSegment label="Product C" value={25} />
  </StackedBarChartBar>
  <StackedBarChartBar label="Q2">
    <StackedBarChartSegment label="Product A" value={35} />
    <StackedBarChartSegment label="Product B" value={40} />
    <StackedBarChartSegment label="Product C" value={30} />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
  {
    id: "custom-height",
    name: "Stacked Bar Chart – Custom Height",
    description: "Stacked bar chart with custom bar height",
    code: `import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment
} from "ft-design-system"

<StackedBarChart title="Team Performance" barHeight={220}>
  <StackedBarChartBar label="Team A">
    <StackedBarChartSegment label="Completed" value={45} color="#00c638" />
    <StackedBarChartSegment label="In Progress" value={30} color="#1890ff" />
    <StackedBarChartSegment label="Pending" value={25} color="#838c9d" />
  </StackedBarChartBar>
  <StackedBarChartBar label="Team B">
    <StackedBarChartSegment label="Completed" value={60} color="#00c638" />
    <StackedBarChartSegment label="In Progress" value={25} color="#1890ff" />
    <StackedBarChartSegment label="Pending" value={15} color="#838c9d" />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
  {
    id: "status-colors",
    name: "Stacked Bar Chart – Status Colors",
    description: "Using FT Design System status colors for semantic meaning",
    code: `import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment
} from "ft-design-system"

<StackedBarChart title="Project Status">
  <StackedBarChartBar label="Sprint 1">
    <StackedBarChartSegment label="Done" value={15} color="#00c638" />
    <StackedBarChartSegment label="In Review" value={5} color="#1890ff" />
    <StackedBarChartSegment label="Blocked" value={2} color="#ff3533" />
  </StackedBarChartBar>
  <StackedBarChartBar label="Sprint 2">
    <StackedBarChartSegment label="Done" value={12} color="#00c638" />
    <StackedBarChartSegment label="In Review" value={8} color="#1890ff" />
    <StackedBarChartSegment label="Blocked" value={3} color="#ff3533" />
  </StackedBarChartBar>
  <StackedBarChartBar label="Sprint 3">
    <StackedBarChartSegment label="Done" value={18} color="#00c638" />
    <StackedBarChartSegment label="In Review" value={4} color="#1890ff" />
    <StackedBarChartSegment label="Blocked" value={1} color="#ff3533" />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
]

export default function StackedBarChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Stacked Bar Chart
        </h1>
        <p className="text-lg text-muted-foreground">
          A lightweight, CSS-based stacked bar chart component. Unlike Chart.js-based charts,
          this component uses pure React and Tailwind CSS for rendering, making it ideal for
          simple stacked visualizations without additional dependencies.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This is a CSS-based component from the molecules folder.
            For Chart.js-based stacked bars with more features, use the BarChart component
            with <code className="bg-blue-100 px-1 rounded">stacked=&#123;true&#125;</code>.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {stackedBarChartVariants.map((variant) => (
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
