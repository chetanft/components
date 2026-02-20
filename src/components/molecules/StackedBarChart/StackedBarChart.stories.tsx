import type { Meta, StoryObj } from '@storybook/react';
import {
  StackedBarChart,
  StackedBarChartBar,
  StackedBarChartSegment,
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

// Declarative API
/** @deprecated Use composable API instead. */
export const LegacyDeclarativeDefault: Story = {
  args: {
    title: 'Ageing',
    data: sampleData,
    legend,
  },
};

// Composable API
export const Default: Story = {
  render: () => (
    <StackedBarChart title="Ageing">
      <StackedBarChartBar label="4+ hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={43} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={48} color="#ff6384" />
      </StackedBarChartBar>
      <StackedBarChartBar label="2-4 hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={25} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={35} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={36} color="#ff6384" />
      </StackedBarChartBar>
      <StackedBarChartBar label="<2 hrs">
        <StackedBarChartSegment label="Laxmi Transporters" value={27} color="#ffb3c3" />
        <StackedBarChartSegment label="Singh Transporters" value={33} color="#ff809a" />
        <StackedBarChartSegment label="Others" value={23} color="#ff6384" />
      </StackedBarChartBar>
    </StackedBarChart>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyCustomHeights: Story = {
  args: {
    ...LegacyDeclarativeDefault.args,
    barHeight: 220,
  },
};

// Custom Default Colors
const dataWithoutColors: StackedBarChartProps['data'] = [
  {
    label: 'Q1',
    segments: [
      { label: 'Product A', value: 30 },
      { label: 'Product B', value: 45 },
      { label: 'Product C', value: 25 },
    ],
  },
  {
    label: 'Q2',
    segments: [
      { label: 'Product A', value: 35 },
      { label: 'Product B', value: 40 },
      { label: 'Product C', value: 30 },
    ],
  },
];

/** @deprecated Use composable API instead. */
export const LegacyCustomDefaultColors: Story = {
  args: {
    title: 'Quarterly Sales',
    data: dataWithoutColors,
    defaultColors: ['#42bdbd', '#0828f7', '#1793e8'], // FT Design System colors
  },
  parameters: {
    docs: {
      description: {
        story: 'StackedBarChart with custom default color palette. The defaultColors prop allows you to customize the color palette used for segments that don\'t specify an explicit color, enabling brand-consistent colors across charts.',
      },
    },
  },
};

