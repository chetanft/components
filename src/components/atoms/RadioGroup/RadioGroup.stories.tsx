import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import { sampleOptions } from '../../../stories/constants';

const meta: Meta<typeof RadioGroup> = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button group component with support for horizontal and vertical layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the radio buttons',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    name: 'default-radio',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    size: 'md',
    orientation: 'vertical',
  },
};

export const Horizontal: Story = {
  args: {
    name: 'horizontal-radio',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' },
    ],
    defaultValue: 'yes',
    size: 'md',
    orientation: 'horizontal',
  },
};

export const Small: Story = {
  args: {
    name: 'small-radio',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    defaultValue: 'option1',
    size: 'sm',
    orientation: 'vertical',
  },
};

// Interactive Demo using sampleOptions from registry
export const InteractiveDemo: Story = {
  render: function Render() {
    const [selected, setSelected] = React.useState('option1');
    return (
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold mb-4">Interactive Radio Group</h3>
        <RadioGroup
          name="interactive-radio"
          options={sampleOptions}
          value={selected}
          onChange={(value) => setSelected(value)}
          size="md"
          orientation="vertical"
        />
        <p className="text-sm text-gray-600">Selected: {selected}</p>
      </div>
    );
  },
};
