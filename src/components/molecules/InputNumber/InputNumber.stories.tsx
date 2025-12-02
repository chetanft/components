import type { Meta, StoryObj } from '@storybook/react';
import { InputNumber } from './InputNumber';
import { useState } from 'react';

const meta: Meta<typeof InputNumber> = {
  title: 'Molecules/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Numeric input with increment/decrement controls built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    controlsPosition: {
      control: 'select',
      options: ['right', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
    controls: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Default: Story = {
  args: {
    defaultValue: 0,
    placeholder: 'Enter number',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-[var(--tertiary)]">XXS</span>
          <InputNumber size="xxs" defaultValue={10} />
        </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 0.857rem (12px)</p>
      </div>
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">XS</span>
        <InputNumber size="xs" defaultValue={10} />
      </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 1rem (14px)</p>
      </div>
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">SM</span>
        <InputNumber size="sm" defaultValue={10} />
      </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 1rem (14px)</p>
      </div>
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">MD</span>
        <InputNumber size="md" defaultValue={10} />
      </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 1.143rem (16px)</p>
      </div>
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">LG</span>
        <InputNumber size="lg" defaultValue={10} />
      </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 1.429rem (20px)</p>
      </div>
      <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">XL</span>
        <InputNumber size="xl" defaultValue={10} />
        </div>
        <p className="text-sm text-muted-foreground ml-20">Font: 1.714rem (24px)</p>
      </div>
    </div>
  ),
};

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
  },
};

export const WithStep: Story = {
  args: {
    step: 10,
    defaultValue: 0,
    min: 0,
    max: 100,
  },
};

export const WithPrecision: Story = {
  args: {
    precision: 2,
    step: 0.1,
    defaultValue: 0.00,
  },
};

export const ControlsBoth: Story = {
  args: {
    controlsPosition: 'both',
    defaultValue: 50,
  },
};

export const WithPrefixSuffix: Story = {
  args: {
    prefix: '$',
    suffix: 'USD',
    defaultValue: 100,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 25,
  },
};

export const Error: Story = {
  args: {
    error: true,
    defaultValue: -5,
  },
};

export const NoControls: Story = {
  args: {
    controls: false,
    defaultValue: 42,
  },
};

export const WithFormatter: Story = {
  args: {
    defaultValue: 1000,
    formatter: (value?: number) =>
      typeof value === 'number'
        ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : '',
    parser: (displayValue: string) => parseFloat(displayValue.replace(/,/g, '')),
  },
};

const ControlledInputNumberStory = () => {
  const [value, setValue] = useState<number | null>(25);
  return (
    <div className="flex flex-col gap-4 items-center">
      <InputNumber value={value} onChange={setValue} min={0} max={100} />
      <p className="text-sm text-[var(--secondary)]">
        Current value: {value ?? 'null'}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledInputNumberStory />,
};
