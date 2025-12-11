import type { Meta, StoryObj } from '@storybook/react';
import { RadarChart } from '../components/charts/RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Components/Charts/RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Radar chart component for comparing multiple variables across different categories. Supports multiple datasets, custom grid types, and label formatting.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Chart title'
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels'
    },
    showDots: {
      control: 'boolean',
      description: 'Show data point markers'
    },
    linesOnly: {
      control: 'boolean',
      description: 'Show only lines without fill'
    },
    gridType: {
      control: 'select',
      options: ['default', 'circle', 'none', 'filled'],
      description: 'Grid display type'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

const basicData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 75, 95, 80, 70],
    },
  ],
};

// Basic Radar Chart
export const Basic: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
  },
};

// With Dots
export const WithDots: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    showDots: true,
  },
};

// Lines Only
export const LinesOnly: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    linesOnly: true,
  },
};

// Custom Label Formatter
export const CustomLabel: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    labelFormatter: (label: string) => label.toUpperCase(),
  },
};

// Grid Custom
export const GridCustom: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    gridType: 'default',
  },
};

// Grid None
export const GridNone: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    gridType: 'none',
  },
};

// Grid Circle
export const GridCircle: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    gridType: 'circle',
  },
};

// Grid Circle No Lines
export const GridCircleNoLines: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    gridType: 'circle',
    linesOnly: true,
  },
};

// Grid Filled
export const GridFilled: Story = {
  args: {
    title: 'Product Performance',
    data: basicData,
    height: 400,
    gridType: 'filled',
  },
};

// Multiple Datasets
export const Multiple: Story = {
  args: {
    title: 'Product Comparison',
    data: {
      labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
      datasets: [
        {
          label: 'Product A',
          data: [85, 90, 75, 95, 80, 70],
        },
        {
          label: 'Product B',
          data: [70, 85, 80, 88, 75, 85],
        },
      ],
    },
    height: 400,
  },
};

// With Legend
export const WithLegend: Story = {
  args: {
    title: 'Product Comparison',
    data: {
      labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Design'],
      datasets: [
        {
          label: 'Product A',
          data: [85, 90, 75, 95, 80, 70],
        },
        {
          label: 'Product B',
          data: [70, 85, 80, 88, 75, 85],
        },
      ],
    },
    height: 400,
    showLegend: true,
  },
};
















