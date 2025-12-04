import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider, SliderTrack, SliderRange, SliderThumb, SliderLabel } from './index';

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

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
  render: () => (
    <div className="p-6">
      <Slider defaultValue={30} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={30} type="end" />
      </Slider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use SliderTrack, SliderRange, SliderThumb, and SliderLabel sub-components for flexible slider composition.',
      },
    },
  },
};

export const ComposableRange: Story = {
  render: () => (
    <div className="p-6">
      <Slider range defaultValue={[20, 80]} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={20} type="start" />
        <SliderThumb value={80} type="end" />
      </Slider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use multiple SliderThumb components for range sliders.',
      },
    },
  },
};

export const ComposableWithLabels: Story = {
  render: () => (
    <div className="p-6">
      <Slider defaultValue={50} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={50} type="end" />
        <SliderLabel value={0}>0°C</SliderLabel>
        <SliderLabel value={26}>26°C</SliderLabel>
        <SliderLabel value={37}>37°C</SliderLabel>
        <SliderLabel value={100}>100°C</SliderLabel>
      </Slider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use SliderLabel components for marks/labels on the slider track.',
      },
    },
  },
};

// Mark deprecated examples
export const Default: Story = {
  args: {
    defaultValue: 30,
    className: 'w-[300px]',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated declarative API. Use the composable API with SliderTrack, SliderRange, and SliderThumb instead.',
      },
    },
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

