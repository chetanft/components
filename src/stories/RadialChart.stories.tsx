import type { Meta, StoryObj } from '@storybook/react';
import { RadialChart } from '../components/charts/RadialChart';

const meta: Meta<typeof RadialChart> = {
  title: 'Components/Charts/RadialChart',
  component: RadialChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Radial chart component for displaying progress and single value metrics. Supports labels, custom formatting, and stacked segments.'
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
    value: {
      control: 'number',
      description: 'Current value'
    },
    maxValue: {
      control: 'number',
      description: 'Maximum value'
    },
    showLabel: {
      control: 'boolean',
      description: 'Show center label'
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines'
    },
    shape: {
      control: 'select',
      options: ['circle', 'round'],
      description: 'Chart shape'
    },
    stacked: {
      control: 'boolean',
      description: 'Display as stacked chart'
    }
  }
};

export default meta;
type Story = StoryObj<typeof RadialChart>;

const basicData = {
  labels: ['Progress'],
  datasets: [
    {
      data: [75],
    },
  ],
};

// Basic Radial Chart
export const Basic: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
    showLabel: true,
  },
};

// Custom Label Formatter
export const CustomLabel: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
    showLabel: true,
    labelFormatter: (value: number, max: number) => `${value}/${max}`,
  },
};

// With Grid
export const WithGrid: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
    showGrid: true,
  },
};

// With Text
export const WithText: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
    showLabel: true,
  },
};

// Different Shape
export const DifferentShape: Story = {
  args: {
    title: 'Progress',
    data: basicData,
    height: 300,
    value: 75,
    maxValue: 100,
    shape: 'circle',
  },
};

// Stacked
export const Stacked: Story = {
  args: {
    title: 'Progress',
    data: {
      labels: ['Progress'],
      datasets: [
        {
          data: [30, 25, 20, 25],
        },
      ],
    },
    height: 300,
    stacked: true,
  },
};














