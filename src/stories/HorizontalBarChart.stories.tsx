import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalBarChart } from '../components/charts/HorizontalBarChart';
import {
  extendedColors,
  statusColorsArray,
  monochromeColors,
  neutralScaleColors,
  positiveScaleColors,
} from '../components/charts/chartConfig';

const meta: Meta<typeof HorizontalBarChart> = {
  title: 'Components/Charts/HorizontalBarChart',
  component: HorizontalBarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Horizontal bar chart component optimized for categorical comparisons and rankings. Ideal for leaderboards, progress indicators, and data with long category labels. Uses FT Design System tokens.',
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
    defaultColors: {
      control: 'object',
      description: 'Custom color palette for datasets',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HorizontalBarChart>;

// Sample data
const basicData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
};

const rankingData = {
  labels: [
    'United States',
    'China',
    'Japan',
    'Germany',
    'United Kingdom',
    'India',
    'France',
    'Italy',
  ],
  datasets: [
    {
      label: 'GDP (Trillion USD)',
      data: [25.5, 18.3, 4.2, 4.1, 3.2, 3.1, 2.8, 2.1],
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

export const Ranking: Story = {
  args: {
    title: 'Top Countries by GDP',
    data: rankingData,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bar chart ideal for ranking/leaderboard displays.',
      },
    },
  },
};

export const MultipleDatasets: Story = {
  args: {
    title: 'Sales & Revenue by Region',
    data: {
      labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'],
      datasets: [
        {
          label: 'Sales',
          data: [45, 38, 52, 28, 18],
        },
        {
          label: 'Revenue',
          data: [38, 32, 45, 22, 15],
        },
      ],
    },
    height: 350,
  },
};

export const Stacked: Story = {
  args: {
    title: 'Product Mix by Region',
    data: {
      labels: ['North America', 'Europe', 'Asia Pacific', 'Latin America'],
      datasets: [
        {
          label: 'Product A',
          data: [30, 25, 40, 20],
        },
        {
          label: 'Product B',
          data: [25, 30, 35, 25],
        },
        {
          label: 'Product C',
          data: [20, 25, 30, 15],
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
        story: 'Horizontal stacked bar chart for showing composition.',
      },
    },
  },
};

// ===========================================
// STYLE VARIANTS
// ===========================================

export const Rounded: Story = {
  args: {
    title: 'Rounded Horizontal Bars',
    data: {
      labels: ['Category A', 'Category B', 'Category C', 'Category D'],
      datasets: [
        {
          label: 'Value',
          data: [75, 58, 42, 30],
          borderRadius: 8,
        },
      ],
    },
    height: 250,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bar chart with rounded corners (FT Design System md radius: 8px).',
      },
    },
  },
};

export const ThinBars: Story = {
  args: {
    title: 'Thin Horizontal Bars',
    data: rankingData,
    height: 350,
    options: {
      barThickness: 12,
      maxBarThickness: 16,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact horizontal bar chart with thin bars.',
      },
    },
  },
};

export const ThickBars: Story = {
  args: {
    title: 'Thick Horizontal Bars',
    data: {
      labels: ['Item A', 'Item B', 'Item C'],
      datasets: [
        {
          label: 'Value',
          data: [65, 48, 35],
        },
      ],
    },
    height: 250,
    options: {
      barThickness: 48,
      maxBarThickness: 56,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bar chart with thick bars for emphasis.',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Horizontal Bars',
    data: {
      labels: ['Alpha', 'Beta', 'Gamma', 'Delta'],
      datasets: [
        {
          label: 'Score',
          data: [88, 72, 65, 45],
          backgroundColor: 'transparent',
          borderColor: '#42bdbd',
          borderWidth: 2,
          borderRadius: 4,
        },
      ],
    },
    height: 250,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bar chart with outlined/ghost style bars.',
      },
    },
  },
};

// ===========================================
// COLOR VARIANTS (FT Design Tokens)
// ===========================================

export const StatusColors: Story = {
  args: {
    title: 'System Health Status',
    data: {
      labels: ['Online Services', 'Warning Items', 'Critical Issues', 'Informational'],
      datasets: [
        {
          label: 'Count',
          data: [45, 12, 5, 23],
          backgroundColor: statusColorsArray,
          borderRadius: 4,
        },
      ],
    },
    height: 250,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bars using FT Design System status colors for semantic meaning.',
      },
    },
  },
};

export const Monochrome: Story = {
  args: {
    title: 'Priority Distribution',
    data: {
      labels: ['Critical', 'High', 'Medium', 'Low', 'Minimal'],
      datasets: [
        {
          label: 'Tasks',
          data: [8, 15, 28, 35, 14],
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
        story: 'Horizontal bars using FT Design System monochrome (gray) scale.',
      },
    },
  },
};

export const NeutralScale: Story = {
  args: {
    title: 'Engagement Levels',
    data: {
      labels: ['Very Active', 'Active', 'Moderate', 'Low', 'Inactive'],
      datasets: [
        {
          label: 'Users',
          data: [1200, 2800, 4500, 2100, 800],
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
        story: 'Horizontal bars using FT Design System neutral (blue) scale.',
      },
    },
  },
};

export const PositiveScale: Story = {
  args: {
    title: 'Performance Ratings',
    data: {
      labels: ['Exceptional', 'Exceeds', 'Meets', 'Below', 'Needs Improvement'],
      datasets: [
        {
          label: 'Employees',
          data: [25, 85, 180, 45, 15],
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
        story: 'Horizontal bars using FT Design System positive (green) scale.',
      },
    },
  },
};

export const ExtendedPalette: Story = {
  args: {
    title: 'Top 10 Products',
    data: {
      labels: [
        'Product A', 'Product B', 'Product C', 'Product D', 'Product E',
        'Product F', 'Product G', 'Product H', 'Product I', 'Product J',
      ],
      datasets: [
        {
          label: 'Units Sold',
          data: [1250, 980, 875, 720, 650, 580, 520, 450, 380, 310],
          backgroundColor: extendedColors,
          borderRadius: 4,
        },
      ],
    },
    height: 450,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bars using FT Design System extended 10-color palette.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    title: 'Custom Brand Colors',
    data: {
      labels: ['Region A', 'Region B', 'Region C', 'Region D'],
      datasets: [
        {
          label: 'Sales',
          data: [45, 38, 52, 28],
        },
        {
          label: 'Target',
          data: [50, 40, 50, 30],
        },
      ],
    },
    height: 300,
    defaultColors: ['#ff6b6b', '#4ecdc4'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bar chart with custom colors via defaultColors prop.',
      },
    },
  },
};

// ===========================================
// FEATURE VARIANTS
// ===========================================

export const ProgressBars: Story = {
  args: {
    title: 'Project Completion',
    data: {
      labels: ['Project Alpha', 'Project Beta', 'Project Gamma', 'Project Delta'],
      datasets: [
        {
          label: 'Completion %',
          data: [85, 65, 45, 92],
          backgroundColor: ['#00c638', '#1890ff', '#ff6c19', '#00c638'],
          borderRadius: 4,
        },
      ],
    },
    height: 250,
    options: {
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
        story: 'Horizontal bars styled as progress indicators with 0-100% scale.',
      },
    },
  },
};

export const ProgressWithTarget: Story = {
  args: {
    title: 'Sales vs Target',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Actual',
          data: [75, 88, 62, 95],
          backgroundColor: '#42bdbd',
          borderRadius: 4,
        },
        {
          label: 'Target',
          data: [80, 80, 80, 80],
          type: 'line' as const,
          borderColor: '#ff0036',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0,
          fill: false,
        },
      ],
    },
    height: 250,
    options: {
      scales: {
        x: {
          max: 100,
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bars with a vertical target line overlay.',
      },
    },
  },
};

export const NegativeValues: Story = {
  args: {
    title: 'Net Promoter Score by Product',
    data: {
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      datasets: [
        {
          label: 'NPS',
          data: [45, -15, 72, -28, 35],
          backgroundColor: ['#00c638', '#ff3533', '#00c638', '#ff3533', '#00c638'],
          borderRadius: 4,
        },
      ],
    },
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal bars supporting negative values with conditional coloring.',
      },
    },
  },
};

export const Leaderboard: Story = {
  args: {
    title: 'Sales Leaderboard',
    data: {
      labels: [
        'Alice Johnson',
        'Bob Smith',
        'Carol Williams',
        'David Brown',
        'Eve Davis',
      ],
      datasets: [
        {
          label: 'Sales ($K)',
          data: [125, 98, 87, 72, 65],
          backgroundColor: ['#ffbe07', '#c5cad3', '#cd7f32', '#42bdbd', '#42bdbd'],
          borderRadius: 4,
        },
      ],
    },
    height: 300,
    options: {
      barThickness: 28,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Leaderboard-style horizontal bars with gold/silver/bronze highlighting.',
      },
    },
  },
};

// ===========================================
// COMBINED VARIANTS
// ===========================================

export const StackedProgress: Story = {
  args: {
    title: 'Task Status by Team',
    data: {
      labels: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'],
      datasets: [
        {
          label: 'Completed',
          data: [45, 38, 28, 52, 40],
          backgroundColor: '#00c638',
        },
        {
          label: 'In Progress',
          data: [25, 22, 32, 18, 25],
          backgroundColor: '#1890ff',
        },
        {
          label: 'Pending',
          data: [30, 40, 40, 30, 35],
          backgroundColor: '#838c9d',
        },
      ],
    },
    height: 350,
    options: {
      scales: {
        x: {
          stacked: true,
          max: 100,
          ticks: {
            callback: (value: string | number) => `${value}%`,
          },
        },
        y: { stacked: true },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Stacked horizontal bars showing task completion status by team.',
      },
    },
  },
};

export const MinimalistRanking: Story = {
  args: {
    title: 'Top Performers',
    data: {
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      datasets: [
        {
          label: 'Score',
          data: [92, 85, 78, 72, 65],
          backgroundColor: '#42bdbd',
          borderRadius: 6,
        },
      ],
    },
    height: 280,
    options: {
      barThickness: 16,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
        },
        y: {
          grid: { display: false },
          border: { display: false },
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimalist horizontal bar chart with reduced visual elements.',
      },
    },
  },
};

export const CompactDense: Story = {
  args: {
    title: 'Feature Usage (Last 30 Days)',
    data: {
      labels: [
        'Dashboard', 'Reports', 'Analytics', 'Settings', 'Users',
        'Billing', 'API', 'Integrations', 'Notifications', 'Help',
      ],
      datasets: [
        {
          label: 'Views',
          data: [4500, 3200, 2800, 1500, 1200, 980, 850, 720, 650, 420],
          borderRadius: 2,
        },
      ],
    },
    height: 400,
    options: {
      barThickness: 14,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact horizontal bar chart for displaying many categories.',
      },
    },
  },
};
