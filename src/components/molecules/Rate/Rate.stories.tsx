import type { Meta, StoryObj } from '@storybook/react';
import { Rate } from './Rate';
import { useState } from 'react';

const meta: Meta<typeof Rate> = {
  title: 'Molecules/Rate',
  component: Rate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Star rating component built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 10 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    allowHalf: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">Small</span>
        <Rate size="sm" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">Medium</span>
        <Rate size="md" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">Large</span>
        <Rate size="lg" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">XLarge</span>
        <Rate size="xl" defaultValue={3} />
      </div>
    </div>
  ),
};

export const HalfStars: Story = {
  args: {
    allowHalf: true,
    defaultValue: 2.5,
  },
};

export const WithTooltips: Story = {
  args: {
    tooltips: ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'],
    defaultValue: 3,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 4,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 4.5,
    allowHalf: true,
  },
};

export const CustomCount: Story = {
  args: {
    count: 10,
    defaultValue: 7,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div className="flex flex-col gap-4 items-center">
        <Rate value={value} onChange={setValue} />
        <p className="text-sm text-[var(--secondary)]">
          Current rating: {value} stars
        </p>
      </div>
    );
  },
};

