import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '../components/charts/PieChart';

const meta: Meta<typeof PieChart> = {
  title: 'Components/Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Pie chart component for showing proportions and percentages. Supports donut style, custom labels, and legends.'
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
    separatorWidth: {
      control: 'number',
      description: 'Width of separators between segments'
    },
    showLabels: {
      control: 'boolean',
      description: 'Show data labels'
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend'
    },
    donut: {
      control: 'boolean',
      description: 'Display as donut chart'
    },
    donutActive: {
      control: 'boolean',
      description: 'Enable active segment highlighting for donut'
    },
    donutText: {
      control: 'text',
      description: 'Text to display in donut center'
    },
    stacked: {
      control: 'boolean',
      description: 'Display as stacked pie chart'
    }
  }
};

export default meta;
type Story = StoryObj<typeof PieChart>;

const basicData = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      data: [45, 35, 20],
    },
  ],
};

// Basic Pie Chart
export const Basic: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
  },
};

// Without Separators
export const SeparatorNone: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    separatorWidth: 0,
  },
};

// With Labels
export const WithLabels: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    showLabels: true,
  },
};

// Custom Label Formatter
export const CustomLabel: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    showLabels: true,
    labelFormatter: (label, value, total) => `${label}: ${Math.round((value / total) * 100)}%`,
  },
};

// With Label List
export const LabelList: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    showLabels: true,
    showLegend: true,
  },
};

// With Legend
export const WithLegend: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    showLegend: true,
  },
};

// Donut Style
export const Donut: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    donut: true,
  },
};

// Donut Active
export const DonutActive: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    donut: true,
    donutActive: true,
  },
};

// Donut with Text
export const DonutWithText: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    donut: true,
    donutText: 'Total',
  },
};

// Stacked
export const Stacked: Story = {
  args: {
    title: 'Device Usage',
    data: basicData,
    height: 300,
    stacked: true,
  },
};

// Interactive
export const Interactive: Story = {
  args: {
    title: 'Device Usage',
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
};







