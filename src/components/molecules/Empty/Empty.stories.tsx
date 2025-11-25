import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyPresets } from './Empty';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Empty> = {
  title: 'Molecules/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Empty state component built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'select',
      options: ['default', 'simple', 'no-data', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  args: {},
};

export const WithDescription: Story = {
  args: {
    description: 'No data available at the moment',
  },
};

export const SimpleStyle: Story = {
  args: {
    image: 'simple',
    description: 'No results found',
  },
};

export const NoDataStyle: Story = {
  args: {
    image: 'no-data',
    description: 'Start by adding some data',
  },
};

export const ErrorStyle: Story = {
  args: {
    image: 'error',
    description: 'Something went wrong',
  },
};

export const WithActions: Story = {
  render: () => (
    <Empty description="No items in your cart">
      <Button variant="primary">Start Shopping</Button>
    </Empty>
  ),
};

export const NoResultsPreset: Story = {
  render: () => (
    <Empty {...EmptyPresets.noResults}>
      <Button variant="secondary">Clear Filters</Button>
    </Empty>
  ),
};

export const NoDataPreset: Story = {
  render: () => (
    <Empty {...EmptyPresets.noData}>
      <Button variant="primary" icon="add">
        Add New Item
      </Button>
    </Empty>
  ),
};

export const ErrorPreset: Story = {
  render: () => (
    <Empty {...EmptyPresets.error}>
      <div className="flex gap-2">
        <Button variant="secondary">Go Back</Button>
        <Button variant="primary">Try Again</Button>
      </div>
    </Empty>
  ),
};

export const CustomImage: Story = {
  render: () => (
    <Empty
      image={
        <div className="w-16 h-16 rounded-full bg-[var(--neutral-light)] flex items-center justify-center">
          <span className="text-2xl">📭</span>
        </div>
      }
      description="Your inbox is empty"
    >
      <Button variant="link">Check spam folder</Button>
    </Empty>
  ),
};

