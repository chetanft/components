import type { Meta, StoryObj } from '@storybook/react';
import {
  StackedBarChart,
  type StackedBarChartProps,
} from './StackedBarChart';

const meta: Meta<typeof StackedBarChart> = {
  title: 'Molecules/StackedBarChart',
  component: StackedBarChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof StackedBarChart>;

const sampleData: StackedBarChartProps['data'] = [
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
  {
    label: '<2 hrs',
    segments: [
      { label: 'Laxmi Transporters', value: 27 },
      { label: 'Singh Transporters', value: 33 },
      { label: 'Others', value: 23 },
    ],
  },
];

const legend = [
  { label: 'Laxmi Transporters', color: '#ffb3c3' },
  { label: 'Singh Transporters', color: '#ff809a' },
  { label: 'Others', color: '#ff6384' },
];

export const Default: Story = {
  args: {
    title: 'Ageing',
    data: sampleData,
    legend,
  },
};

export const CustomHeights: Story = {
  args: {
    ...Default.args,
    barHeight: 220,
  },
};

