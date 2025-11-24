import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../components/charts/LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Line chart component for displaying trends and changes over time. Supports multiple datasets, custom dots, and various interpolation modes.'
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
    dotRadius: {
      control: 'number',
      description: 'Radius of data points'
    },
    showLabel: {
      control: 'boolean',
      description: 'Show data labels'
    }
  }
};

export default meta;
type Story = StoryObj<typeof LineChart>;

const basicData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 15, 25, 22, 30],
    },
  ],
};

// Basic Line Chart
export const Basic: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
  },
};

// Interactive with Dots
export const Interactive: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showDots: true,
  },
};

// Multiple Datasets
export const Multiple: Story = {
  args: {
    title: 'Sales & Revenue',
    data: {
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
      ],
    },
    height: 300,
  },
};

// Linear Interpolation
export const Linear: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    tension: 0,
  },
};

// Step Interpolation
export const Step: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    stepped: true,
  },
};

// With Dots
export const WithDots: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showDots: true,
  },
};

// Custom Dots
export const CustomDots: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showDots: true,
    dotRadius: 6,
  },
};

// Custom Dot Colors
export const CustomDotColors: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showDots: true,
    dotColors: ['#ff0036'],
  },
};

// With Labels
export const WithLabels: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showLabel: true,
  },
};

// Custom Label Formatter
export const CustomLabel: Story = {
  args: {
    title: 'Sales Trend',
    data: basicData,
    height: 300,
    showLabel: true,
    labelFormatter: (value) => `$${value}k`,
  },
};

