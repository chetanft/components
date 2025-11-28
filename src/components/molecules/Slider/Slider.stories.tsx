import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Range slider component built with FT Design System tokens. Supports single value and range modes, vertical/horizontal orientation, marks, tooltips, and custom colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    range: { control: 'boolean' },
    vertical: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 30,
    className: 'w-[300px]',
  },
};

export const Range: Story = {
  args: {
    range: true,
    defaultValue: [20, 80],
    className: 'w-[300px]',
  },
};

export const WithMarks: Story = {
  args: {
    defaultValue: 50,
    marks: [
      { value: 0, label: '0°C' },
      { value: 26, label: '26°C' },
      { value: 37, label: '37°C' },
      { value: 100, label: '100°C' },
    ],
    className: 'w-[300px]',
  },
};

export const WithStep: Story = {
  args: {
    defaultValue: 50,
    step: 10,
    marks: true,
    className: 'w-[300px]',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
    className: 'w-[300px]',
  },
};

export const CustomColors: Story = {
  args: {
    defaultValue: 70,
    trackColor: 'var(--positive)',
    className: 'w-[300px]',
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
    defaultValue: 40,
    className: 'h-[200px]',
  },
};

export const VerticalRange: Story = {
  args: {
    vertical: true,
    range: true,
    defaultValue: [20, 60],
    className: 'h-[200px]',
  },
};

export function Controlled() {
  const [value, setValue] = useState(50);
  return (
    <div className="flex flex-col gap-4 items-center w-[300px]">
      <Slider value={value} onChange={(v) => setValue(v as number)} />
      <p className="text-sm text-[var(--secondary)]">
        Value: {value}
      </p>
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return (
    <div className="flex flex-col gap-4 items-center w-[300px]">
      <Slider 
        range 
        value={value} 
        onChange={(v) => setValue(v as [number, number])} 
      />
      <p className="text-sm text-[var(--secondary)]">
        Range: {value[0]} - {value[1]}
      </p>
    </div>
  );
}

