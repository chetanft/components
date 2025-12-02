import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyPresets } from './Empty';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Dropdown } from '../Dropdown/Dropdown';
import { DatePicker } from '../DatePicker/DatePicker';

const meta: Meta<typeof Empty> = {
  title: 'Molecules/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'select',
      options: ['default', 'simple', 'no-data', 'error'],
      description: 'Image variant type or custom React node',
    },
    description: {
      control: 'text',
      description: 'Description text or React node to display',
    },
    children: {
      control: false,
      description: 'Action buttons or content below description',
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

/**
 * JourneysEmptyState - Complete empty state example with filters and actions
 * 
 * This variant demonstrates a real-world empty state implementation using only
 * FT Design System components and tokens:
 * 
 * - Typography: title-secondary, body-primary-regular, body-primary-semibold, body-secondary-regular
 * - Dropdown: Location and journey type filters
 * - DatePicker: Date range selection
 * - Button: Primary action button with icon
 * - Spacing: var(--x3), var(--x5), var(--x6), var(--x8) tokens
 * - Colors: var(--primary), var(--tertiary) via Typography color props
 * 
 * This serves as a reference implementation for building complex empty states
 * that match Figma designs while using only FT Design System components.
 */
export const JourneysEmptyState: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center gap-[var(--x6,24px)] w-full max-w-4xl mx-auto py-[var(--x8,32px)] px-[var(--x4,16px)]">
      {/* Title and Description */}
      <div className="flex flex-col gap-[var(--x5,20px)] items-center text-center">
        <Typography variant="title-secondary" color="primary">
          No journeys found for 12 Aug – 13 Aug, 2024
        </Typography>
        <Typography variant="body-primary-regular" color="primary" className="max-w-2xl">
          There are no{' '}
          <Typography variant="body-primary-semibold" color="primary" as="span">
            outbound journeys
          </Typography>
          {' '}created from{' '}
          <Typography variant="body-primary-semibold" color="primary" as="span">
            MDC Labs, Amritsar
          </Typography>
          {' '}during this time period.
        </Typography>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col gap-[var(--x3,12px)] items-center w-full">
        <div className="flex gap-[var(--x3,12px)] items-center flex-nowrap justify-center w-full overflow-x-auto">
          <Dropdown
            options={[
              { value: 'mdc-labs-amritsar', label: 'MDC Labs, Amritsar' }
            ]}
            value="mdc-labs-amritsar"
            size="md"
            className="w-[236px] flex-shrink-0"
          />
          <DatePicker
            range
            startValue="2024-08-12"
            endValue="2024-08-13"
            size="m"
            className="flex-shrink-0"
          />
          <Dropdown
            options={[
              { value: 'outbound-source', label: 'Outbound - Source' }
            ]}
            value="outbound-source"
            size="md"
            className="w-[191px] flex-shrink-0"
          />
        </div>
      </div>

      {/* Or Separator */}
      <Typography variant="body-secondary-regular" color="tertiary">
        Or
      </Typography>

      {/* Action Button */}
      <Button variant="primary" icon="add" iconPosition="leading" size="md">
        Add Journey
      </Button>
    </div>
  ),
};

