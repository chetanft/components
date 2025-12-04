import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from '../components/charts/AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Area chart component with filled areas underneath the line. Supports multiple datasets, gradients, and various interpolation modes.'
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
    fill: {
      control: 'boolean',
      description: 'Fill area under the line'
    },
    stepped: {
      control: 'boolean',
      description: 'Use step interpolation'
    },
    tension: {
      control: 'number',
      description: 'Line tension (0-1)'
    },
    showDots: {
      control: 'boolean',
      description: 'Show data point markers'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend'
    },
    gradient: {
      control: 'boolean',
      description: 'Use gradient fill'
    }
  }
};

export default meta;
type Story = StoryObj<typeof AreaChart>;

const basicData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [120, 190, 150, 250, 220, 300],
    },
  ],
};

// Basic Area Chart
export const Basic: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
  },
};

// Interactive with Dots
export const Interactive: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
    showDots: true,
  },
};

// Linear Interpolation
export const Linear: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
    tension: 0,
  },
};

// Step Interpolation
export const Step: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
    stepped: true,
  },
};

// With Legend
export const WithLegend: Story = {
  args: {
    title: 'Device Usage',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Desktop',
          data: [120, 190, 150, 250, 220, 300],
        },
        {
          label: 'Mobile',
          data: [80, 120, 100, 180, 150, 200],
        },
      ],
    },
    height: 300,
    showLegend: true,
  },
};

// Stacked
export const Stacked: Story = {
  args: {
    title: 'Product Sales',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product A',
          data: [30, 40, 50, 35, 45, 60],
        },
        {
          label: 'Product B',
          data: [20, 30, 25, 35, 30, 40],
        },
      ],
    },
    height: 300,
  },
};

// Stacked Expanded
export const StackedExpanded: Story = {
  args: {
    title: 'Product Sales',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Product A',
          data: [30, 40, 50, 35, 45, 60],
        },
        {
          label: 'Product B',
          data: [20, 30, 25, 35, 30, 40],
        },
      ],
    },
    height: 350,
    options: {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  },
};

// With Gradient
export const Gradient: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
    gradient: true,
  },
};

// With Custom Axes
export const WithAxes: Story = {
  args: {
    title: 'Total Visitors',
    data: basicData,
    height: 300,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  },
};















