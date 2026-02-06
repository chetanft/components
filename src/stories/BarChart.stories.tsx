import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from '../components/charts/BarChart';
import {
  extendedColors,
  statusColorsArray,
  monochromeColors,
  neutralScaleColors,
  positiveScaleColors,
  warningScaleColors,
  dangerScaleColors,
} from '../components/charts/chartConfig';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bar chart component for displaying categorical data comparisons. Supports vertical and horizontal orientations, multiple datasets, stacking, and various styling options using FT Design System tokens.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Chart title',
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels',
    },
    horizontal: {
      control: 'boolean',
      description: 'Display bars horizontally',
    },
    defaultColors: {
      control: 'object',
      description: 'Custom color palette for datasets',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarChart>;

// Sample data
const basicData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
};

const multipleData = {
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
};

const stackedData = {
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
};

// ===========================================
// BASIC VARIANTS
// ===========================================

export const Basic: Story = {
  args: {
    title: 'Monthly Sales',
    data: basicData,
    height: 300,
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Monthly Sales (Horizontal)',
    data: basicData,
    height: 300,
    horizontal: true,
  },
};

export const MultipleDatasets: Story = {
  args: {
    title: 'Sales, Revenue & Profit',
    data: multipleData,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Grouped bar chart with multiple datasets displayed side-by-side.',
      },
    },
  },
};

export const Stacked: Story = {
  args: {
    title: 'Quarterly Product Sales (Stacked)',
    data: stackedData,
    height: 300,
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stacked bar chart where datasets are stacked on top of each other.',
      },
    },
  },
};

export const StackedHorizontal: Story = {
  args: {
    title: 'Quarterly Product Sales (Stacked Horizontal)',
    data: stackedData,
    height: 300,
    horizontal: true,
    options: {
      indexAxis: 'y',
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal stacked bar chart.',
      },
    },
  },
};

// ===========================================
// STYLE VARIANTS
// ===========================================

export const Rounded: Story = {
  args: {
    title: 'Rounded Bars',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [12, 19, 15, 25, 22, 30],
          borderRadius: 8,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar chart with rounded corners using FT Design System border radius (md: 8px).',
      },
    },
  },
};

export const FullyRounded: Story = {
  args: {
    title: 'Fully Rounded Bars',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [12, 19, 15, 25, 22, 30],
          borderRadius: 12,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar chart with fully rounded corners using FT Design System border radius (lg: 12px).',
      },
    },
  },
};

export const ThinBars: Story = {
  args: {
    title: 'Thin Bars',
    data: basicData,
    height: 300,
    options: {
      barThickness: 16,
      maxBarThickness: 20,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar chart with thin/slim bars for compact visualizations.',
      },
    },
  },
};

export const ThickBars: Story = {
  args: {
    title: 'Thick Bars',
    data: basicData,
    height: 300,
    options: {
      barThickness: 48,
      maxBarThickness: 56,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar chart with thick/wide bars for emphasis.',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Bars',
    data: {
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
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Bar chart with outlined/ghost bars (border only, transparent fill).',
      },
    },
  },
};

export const OutlinedMultiple: Story = {
  args: {
    title: 'Outlined Multiple Datasets',
    data: {
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
        {
          label: 'Revenue',
          data: [8, 15, 12, 20, 18, 25],
          backgroundColor: 'transparent',
          borderColor: '#0828f7',
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
};

// ===========================================
// COLOR VARIANTS (FT Design Tokens)
// ===========================================

export const StatusColors: Story = {
  args: {
    title: 'Status Colors',
    data: {
      labels: ['Success', 'Warning', 'Error', 'Info'],
      datasets: [
        {
          label: 'Status Metrics',
          data: [85, 60, 25, 70],
          backgroundColor: statusColorsArray,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System semantic status colors: positive (#00c638), warning (#ff6c19), critical (#ff3533), neutral (#1890ff).',
      },
    },
  },
};

export const Monochrome: Story = {
  args: {
    title: 'Monochrome Scale',
    data: {
      labels: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
      datasets: [
        {
          label: 'Priority Levels',
          data: [95, 75, 55, 35, 15],
          backgroundColor: monochromeColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System primary (gray) monochrome scale from primary900 to primary100.',
      },
    },
  },
};

export const NeutralScale: Story = {
  args: {
    title: 'Neutral (Blue) Scale',
    data: {
      labels: ['Level 5', 'Level 4', 'Level 3', 'Level 2', 'Level 1'],
      datasets: [
        {
          label: 'Engagement Levels',
          data: [90, 72, 58, 40, 22],
          backgroundColor: neutralScaleColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System neutral (blue) scale colors from neutral900 to neutral100.',
      },
    },
  },
};

export const PositiveScale: Story = {
  args: {
    title: 'Positive (Green) Scale',
    data: {
      labels: ['Excellent', 'Good', 'Average', 'Fair', 'Poor'],
      datasets: [
        {
          label: 'Performance',
          data: [95, 78, 55, 32, 12],
          backgroundColor: positiveScaleColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System positive (green) scale colors.',
      },
    },
  },
};

export const WarningScale: Story = {
  args: {
    title: 'Warning (Orange) Scale',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low', 'Minimal'],
      datasets: [
        {
          label: 'Risk Levels',
          data: [88, 68, 48, 28, 10],
          backgroundColor: warningScaleColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System warning (orange) scale colors.',
      },
    },
  },
};

export const DangerScale: Story = {
  args: {
    title: 'Danger (Red) Scale',
    data: {
      labels: ['Severe', 'Major', 'Moderate', 'Minor', 'Trivial'],
      datasets: [
        {
          label: 'Issue Severity',
          data: [92, 70, 50, 30, 8],
          backgroundColor: dangerScaleColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System danger (red) scale colors.',
      },
    },
  },
};

export const ExtendedPalette: Story = {
  args: {
    title: 'Extended Color Palette (10 Colors)',
    data: {
      labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      datasets: [
        {
          label: 'Categories',
          data: [45, 38, 52, 28, 65, 42, 55, 33, 48, 60],
          backgroundColor: extendedColors,
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart using FT Design System extended 10-color palette (5 main + 5 dark variants).',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    title: 'Custom Color Palette',
    data: multipleData,
    height: 300,
    defaultColors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart with custom color palette via defaultColors prop. Useful for brand-specific colors.',
      },
    },
  },
};

// ===========================================
// FEATURE VARIANTS
// ===========================================

export const WithDataLabels: Story = {
  args: {
    title: 'Bar Chart with Data Labels',
    data: basicData,
    height: 300,
    options: {
      plugins: {
        tooltip: {
          enabled: true,
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart with data labels displayed on each bar. Note: Requires chartjs-plugin-datalabels for full support.',
      },
    },
  },
};

export const NegativeValues: Story = {
  args: {
    title: 'Positive & Negative Values',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Profit/Loss',
          data: [15, -8, 22, -12, 30, -5],
          backgroundColor: [
            '#00c638',
            '#ff3533',
            '#00c638',
            '#ff3533',
            '#00c638',
            '#ff3533',
          ],
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart supporting negative values with conditional coloring (green for positive, red for negative).',
      },
    },
  },
};

export const NegativeValuesStacked: Story = {
  args: {
    title: 'Stacked with Negative Values',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Income',
          data: [50, 60, 45, 70],
          backgroundColor: '#00c638',
        },
        {
          label: 'Expenses',
          data: [-30, -45, -35, -40],
          backgroundColor: '#ff3533',
        },
      ],
    },
    height: 300,
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stacked bar chart with positive and negative datasets.',
      },
    },
  },
};

export const ProgressStyle: Story = {
  args: {
    title: 'Progress Style (Percentage)',
    data: {
      labels: ['Completed', 'In Progress', 'Pending', 'Blocked'],
      datasets: [
        {
          label: 'Task Status',
          data: [75, 45, 60, 20],
          backgroundColor: ['#00c638', '#1890ff', '#ff6c19', '#ff3533'],
          borderRadius: 4,
        },
      ],
    },
    height: 250,
    horizontal: true,
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          max: 100,
          ticks: {
            callback: (value: string | number) => `${value}%`,
          },
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal bar chart styled as progress bars with percentage scale (0-100%).',
      },
    },
  },
};

export const WithTargetLine: Story = {
  args: {
    title: 'Sales with Target Line',
    data: {
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
          type: 'line' as const,
          borderColor: '#ff0036',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bar chart with a dashed target/threshold line overlay using mixed chart type.',
      },
    },
  },
};

export const ComparisonBars: Story = {
  args: {
    title: 'Year-over-Year Comparison',
    data: {
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
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Grouped bar chart for comparing data across different time periods.',
      },
    },
  },
};

// ===========================================
// COMBINED VARIANTS
// ===========================================

export const StackedRounded: Story = {
  args: {
    title: 'Stacked Rounded Bars',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Product A',
          data: [30, 45, 35, 50],
          borderRadius: 8,
        },
        {
          label: 'Product B',
          data: [25, 35, 40, 30],
          borderRadius: 0,
        },
        {
          label: 'Product C',
          data: [20, 25, 30, 35],
          borderRadius: {
            topLeft: 8,
            topRight: 8,
            bottomLeft: 0,
            bottomRight: 0,
          },
        },
      ],
    },
    height: 300,
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Stacked bar chart with rounded corners on top bars only.',
      },
    },
  },
};

export const HorizontalStatusProgress: Story = {
  args: {
    title: 'Task Completion by Team',
    data: {
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
    },
    height: 300,
    horizontal: true,
    options: {
      indexAxis: 'y',
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal stacked bar chart showing task completion status by team using status colors.',
      },
    },
  },
};

export const MinimalistThin: Story = {
  args: {
    title: 'Minimalist Design',
    data: basicData,
    height: 250,
    options: {
      barThickness: 12,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          grid: {
            color: '#f0f1f7',
          },
          border: { display: false },
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimalist bar chart with thin bars and reduced visual elements.',
      },
    },
  },
};
