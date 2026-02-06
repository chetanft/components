"use client"

import { ComponentPreview } from "@/components/component-preview"

const barChartVariants = [
  {
    id: "basic",
    name: "Bar Chart – Basic",
    description: "Basic vertical bar chart with single dataset",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<BarChart
  title="Monthly Sales"
  data={data}
  height={300}
/>`,
  },
  {
    id: "horizontal",
    name: "Bar Chart – Horizontal",
    description: "Horizontal bar chart orientation",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<BarChart
  title="Monthly Sales"
  data={data}
  height={300}
  horizontal={true}
/>`,
  },
  {
    id: "multiple",
    name: "Bar Chart – Multiple Datasets",
    description: "Grouped bar chart with multiple datasets side-by-side",
    code: `import { BarChart } from "ft-design-system"

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
    {
      label: 'Profit',
      data: [4, 8, 6, 12, 10, 15],
    },
  ],
}

<BarChart
  title="Sales, Revenue & Profit"
  data={data}
  height={300}
/>`,
  },
  {
    id: "stacked",
    name: "Bar Chart – Stacked",
    description: "Stacked bar chart with datasets stacked on top of each other",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Product A',
      data: [30, 45, 35, 50],
    },
    {
      label: 'Product B',
      data: [25, 35, 40, 30],
    },
    {
      label: 'Product C',
      data: [20, 25, 30, 35],
    },
  ],
}

<BarChart
  title="Quarterly Product Sales"
  data={data}
  height={300}
  stacked={true}
/>`,
  },
  {
    id: "stacked-horizontal",
    name: "Bar Chart – Stacked Horizontal",
    description: "Horizontal stacked bar chart",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Product A',
      data: [30, 45, 35, 50],
    },
    {
      label: 'Product B',
      data: [25, 35, 40, 30],
    },
    {
      label: 'Product C',
      data: [20, 25, 30, 35],
    },
  ],
}

<BarChart
  title="Quarterly Product Sales"
  data={data}
  height={300}
  horizontal={true}
  stacked={true}
/>`,
  },
  {
    id: "rounded",
    name: "Bar Chart – Rounded",
    description: "Bar chart with rounded corners using FT Design System border radius",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
      borderRadius: 8,
    },
  ],
}

<BarChart
  title="Rounded Bars"
  data={data}
  height={300}
  borderRadius={8}
/>`,
  },
  {
    id: "thin-bars",
    name: "Bar Chart – Thin Bars",
    description: "Bar chart with thin/slim bars for compact visualizations",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<BarChart
  title="Thin Bars"
  data={data}
  height={300}
  barThickness={16}
  maxBarThickness={20}
/>`,
  },
  {
    id: "thick-bars",
    name: "Bar Chart – Thick Bars",
    description: "Bar chart with thick/wide bars for emphasis",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<BarChart
  title="Thick Bars"
  data={data}
  height={300}
  barThickness={48}
  maxBarThickness={56}
/>`,
  },
  {
    id: "outlined",
    name: "Bar Chart – Outlined",
    description: "Bar chart with outlined/ghost style bars (border only)",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: 'transparent',
      borderColor: '#42bdbd',
      borderWidth: 2,
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Outlined Bars"
  data={data}
  height={300}
/>`,
  },
  {
    id: "status-colors",
    name: "Bar Chart – Status Colors",
    description: "Bar chart using FT Design System semantic status colors",
    code: `import { BarChart, statusColorsArray } from "ft-design-system"

const data = {
  labels: ['Success', 'Warning', 'Error', 'Info'],
  datasets: [
    {
      label: 'Status Metrics',
      data: [85, 60, 25, 70],
      backgroundColor: ['#00c638', '#ff6c19', '#ff3533', '#1890ff'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Status Colors"
  data={data}
  height={300}
/>`,
  },
  {
    id: "monochrome",
    name: "Bar Chart – Monochrome",
    description: "Bar chart using FT Design System monochrome (gray) scale",
    code: `import { BarChart, monochromeColors } from "ft-design-system"

const data = {
  labels: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
  datasets: [
    {
      label: 'Priority Levels',
      data: [95, 75, 55, 35, 15],
      backgroundColor: ['#1a2330', '#434f64', '#5f697b', '#838c9d', '#c5cad3'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Monochrome Scale"
  data={data}
  height={300}
/>`,
  },
  {
    id: "neutral-scale",
    name: "Bar Chart – Neutral Scale",
    description: "Bar chart using FT Design System neutral (blue) scale",
    code: `import { BarChart, neutralScaleColors } from "ft-design-system"

const data = {
  labels: ['Level 5', 'Level 4', 'Level 3', 'Level 2', 'Level 1'],
  datasets: [
    {
      label: 'Engagement Levels',
      data: [90, 72, 58, 40, 22],
      backgroundColor: ['#002966', '#006dd3', '#1890ff', '#80c1ff', '#ecf6ff'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Neutral (Blue) Scale"
  data={data}
  height={300}
/>`,
  },
  {
    id: "positive-scale",
    name: "Bar Chart – Positive Scale",
    description: "Bar chart using FT Design System positive (green) scale",
    code: `import { BarChart, positiveScaleColors } from "ft-design-system"

const data = {
  labels: ['Excellent', 'Good', 'Average', 'Fair', 'Poor'],
  datasets: [
    {
      label: 'Performance',
      data: [95, 78, 55, 32, 12],
      backgroundColor: ['#004d26', '#00753d', '#00c637', '#4dff88', '#deffe7'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Positive (Green) Scale"
  data={data}
  height={300}
/>`,
  },
  {
    id: "warning-scale",
    name: "Bar Chart – Warning Scale",
    description: "Bar chart using FT Design System warning (orange) scale",
    code: `import { BarChart, warningScaleColors } from "ft-design-system"

const data = {
  labels: ['Critical', 'High', 'Medium', 'Low', 'Minimal'],
  datasets: [
    {
      label: 'Risk Levels',
      data: [88, 68, 48, 28, 10],
      backgroundColor: ['#7a2f00', '#dd6a00', '#ff6c19', '#ffb366', '#ffedbc'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Warning (Orange) Scale"
  data={data}
  height={300}
/>`,
  },
  {
    id: "danger-scale",
    name: "Bar Chart – Danger Scale",
    description: "Bar chart using FT Design System danger (red) scale",
    code: `import { BarChart, dangerScaleColors } from "ft-design-system"

const data = {
  labels: ['Severe', 'Major', 'Moderate', 'Minor', 'Trivial'],
  datasets: [
    {
      label: 'Issue Severity',
      data: [92, 70, 50, 30, 8],
      backgroundColor: ['#800000', '#b70100', '#ff3532', '#ff9999', '#ffeafa'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Danger (Red) Scale"
  data={data}
  height={300}
/>`,
  },
  {
    id: "extended-palette",
    name: "Bar Chart – Extended Palette",
    description: "Bar chart using FT Design System extended 10-color palette",
    code: `import { BarChart, extendedColors } from "ft-design-system"

const data = {
  labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  datasets: [
    {
      label: 'Categories',
      data: [45, 38, 52, 28, 65, 42, 55, 33, 48, 60],
      backgroundColor: [
        '#42bdbd', '#0828f7', '#1793e8', '#ff0036', '#ffbe07',
        '#3caaaa', '#0724de', '#1584d1', '#e60031', '#e6a806'
      ],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Extended Color Palette"
  data={data}
  height={300}
/>`,
  },
  {
    id: "custom-colors",
    name: "Bar Chart – Custom Colors",
    description: "Bar chart with custom color palette via defaultColors prop",
    code: `import { BarChart } from "ft-design-system"

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
    {
      label: 'Profit',
      data: [4, 8, 6, 12, 10, 15],
    },
  ],
}

<BarChart
  title="Custom Colors"
  data={data}
  height={300}
  defaultColors={['#ff6b6b', '#4ecdc4', '#45b7d1']}
/>`,
  },
  {
    id: "negative-values",
    name: "Bar Chart – Negative Values",
    description: "Bar chart supporting positive and negative values with conditional coloring",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Profit/Loss',
      data: [15, -8, 22, -12, 30, -5],
      backgroundColor: ['#00c638', '#ff3533', '#00c638', '#ff3533', '#00c638', '#ff3533'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Positive & Negative Values"
  data={data}
  height={300}
/>`,
  },
  {
    id: "progress-style",
    name: "Bar Chart – Progress Style",
    description: "Horizontal bar chart styled as progress bars with percentage scale",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Completed', 'In Progress', 'Pending', 'Blocked'],
  datasets: [
    {
      label: 'Task Status',
      data: [75, 45, 60, 20],
      backgroundColor: ['#00c638', '#1890ff', '#ff6c19', '#ff3533'],
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Task Progress"
  data={data}
  height={250}
  horizontal={true}
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
    id: "with-target",
    name: "Bar Chart – With Target Line",
    description: "Bar chart with a dashed target/threshold line overlay",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Actual Sales',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: '#42bdbd',
      borderRadius: 4,
    },
    {
      label: 'Target',
      data: [20, 20, 20, 20, 20, 20],
      type: 'line',
      borderColor: '#ff0036',
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: 0,
      fill: false,
    },
  ],
}

<BarChart
  title="Sales with Target"
  data={data}
  height={300}
/>`,
  },
  {
    id: "comparison",
    name: "Bar Chart – Comparison",
    description: "Grouped bar chart for comparing data across time periods",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: '2024',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: '#42bdbd',
      borderRadius: 4,
    },
    {
      label: '2023',
      data: [10, 15, 12, 20, 18, 25],
      backgroundColor: '#0828f7',
      borderRadius: 4,
    },
  ],
}

<BarChart
  title="Year-over-Year Comparison"
  data={data}
  height={300}
/>`,
  },
  {
    id: "minimalist",
    name: "Bar Chart – Minimalist",
    description: "Minimalist bar chart with thin bars and reduced visual elements",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
}

<BarChart
  title="Minimalist Design"
  data={data}
  height={250}
  barThickness={12}
  options={{
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
      },
      y: {
        grid: { color: '#f0f1f7' },
        border: { display: false },
      },
    },
  }}
/>`,
  },
  {
    id: "stacked-status",
    name: "Bar Chart – Stacked Status",
    description: "Horizontal stacked bar chart showing task status by team",
    code: `import { BarChart } from "ft-design-system"

const data = {
  labels: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta'],
  datasets: [
    {
      label: 'Completed',
      data: [45, 60, 35, 70],
      backgroundColor: '#00c638',
    },
    {
      label: 'In Progress',
      data: [25, 20, 30, 15],
      backgroundColor: '#1890ff',
    },
    {
      label: 'Pending',
      data: [30, 20, 35, 15],
      backgroundColor: '#838c9d',
    },
  ],
}

<BarChart
  title="Task Status by Team"
  data={data}
  height={300}
  horizontal={true}
  stacked={true}
/>`,
  },
]

export default function BarChartsPage() {
  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Bar Charts
        </h1>
        <p className="text-lg text-muted-foreground">
          Display categorical data comparisons with bar charts. Supports vertical and horizontal orientations,
          stacking, multiple datasets, and various styling options using FT Design System tokens.
        </p>
      </div>

      <div className="space-y-12">
        {barChartVariants.map((variant) => (
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
