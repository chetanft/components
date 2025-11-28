import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedTabs } from '../components/molecules/SegmentedTabs';

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Molecules/SegmentedTabs',
  component: SegmentedTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Segmented tabs component for switching between related views.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedTabs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
    ],
    defaultValue: 'tab1',
  },
};

export const TwoTabs: Story = {
  args: {
    items: [
      { label: 'First', value: 'first' },
      { label: 'Second', value: 'second' },
    ],
    defaultValue: 'first',
  },
};

export const FourTabs: Story = {
  args: {
    items: [
      { label: 'Tab 1', value: 'tab1' },
      { label: 'Tab 2', value: 'tab2' },
      { label: 'Tab 3', value: 'tab3' },
      { label: 'Tab 4', value: 'tab4' },
    ],
    defaultValue: 'tab1',
  },
};
