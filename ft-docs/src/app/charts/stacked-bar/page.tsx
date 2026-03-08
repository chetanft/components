"use client"

import { ChartPage } from "@/components/chart-page"

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
    <StackedBarChartSegment label="Laxmi Transporters" value={27} color={chartColor('primary-700')} />
    <StackedBarChartSegment label="Singh Transporters" value={43} color={chartColor('neutral-dark')} />
    <StackedBarChartSegment label="Others" value={48} color={chartColor('neutral')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="2-4 hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={25} color={chartColor('primary-700')} />
    <StackedBarChartSegment label="Singh Transporters" value={35} color={chartColor('neutral-dark')} />
    <StackedBarChartSegment label="Others" value={36} color={chartColor('neutral')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="<2 hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={27} color={chartColor('primary-700')} />
    <StackedBarChartSegment label="Singh Transporters" value={33} color={chartColor('neutral-dark')} />
    <StackedBarChartSegment label="Others" value={23} color={chartColor('neutral')} />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
  {
    id: "declarative",
    name: "Stacked Bar Chart – Legend Colors",
    description: "Composable API with legend-style color assignments",
    code: `import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment
} from "ft-design-system"

<StackedBarChart title="Ageing">
  <StackedBarChartBar label="4+ hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={27} color={chartColor('critical-light')} />
    <StackedBarChartSegment label="Singh Transporters" value={43} color={chartColor('critical-300')} />
    <StackedBarChartSegment label="Others" value={48} color={chartColor('critical')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="2-4 hrs">
    <StackedBarChartSegment label="Laxmi Transporters" value={25} color={chartColor('critical-light')} />
    <StackedBarChartSegment label="Singh Transporters" value={35} color={chartColor('critical-300')} />
    <StackedBarChartSegment label="Others" value={36} color={chartColor('critical')} />
  </StackedBarChartBar>
</StackedBarChart>`,
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
  defaultColors={[chartColor('primary-700'), chartColor('neutral-dark'), chartColor('neutral')]}
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
    <StackedBarChartSegment label="Completed" value={45} color={chartColor('positive')} />
    <StackedBarChartSegment label="In Progress" value={30} color={chartColor('neutral')} />
    <StackedBarChartSegment label="Pending" value={25} color={chartColor('primary-300')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="Team B">
    <StackedBarChartSegment label="Completed" value={60} color={chartColor('positive')} />
    <StackedBarChartSegment label="In Progress" value={25} color={chartColor('neutral')} />
    <StackedBarChartSegment label="Pending" value={15} color={chartColor('primary-300')} />
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
    <StackedBarChartSegment label="Done" value={15} color={chartColor('positive')} />
    <StackedBarChartSegment label="In Review" value={5} color={chartColor('neutral')} />
    <StackedBarChartSegment label="Blocked" value={2} color={chartColor('critical')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="Sprint 2">
    <StackedBarChartSegment label="Done" value={12} color={chartColor('positive')} />
    <StackedBarChartSegment label="In Review" value={8} color={chartColor('neutral')} />
    <StackedBarChartSegment label="Blocked" value={3} color={chartColor('critical')} />
  </StackedBarChartBar>
  <StackedBarChartBar label="Sprint 3">
    <StackedBarChartSegment label="Done" value={18} color={chartColor('positive')} />
    <StackedBarChartSegment label="In Review" value={4} color={chartColor('neutral')} />
    <StackedBarChartSegment label="Blocked" value={1} color={chartColor('critical')} />
  </StackedBarChartBar>
</StackedBarChart>`,
  },
]

export default function StackedBarChartsPage() {
  return <ChartPage title="Stacked Bar Chart" description="A lightweight, CSS-based stacked bar chart component. Unlike Chart.js-based charts, this component uses pure React and Tailwind CSS for rendering, making it ideal for simple stacked visualizations without additional dependencies." variants={stackedBarChartVariants} />
}
