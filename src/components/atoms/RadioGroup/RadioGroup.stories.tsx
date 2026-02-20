import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupLabel, RadioItem, RadioItemInput, RadioItemLabel, RadioGroupHelper, RadioGroupError } from './index';
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

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
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

/** @deprecated Use composable API instead. */
export const LegacyHorizontal: Story = {
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

/** @deprecated Use composable API instead. */
export const LegacySmall: Story = {
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
const InteractiveDemoComponent = () => {
  const [selected, setSelected] = React.useState('option1');
  return (
    <div className="p-6 space-y-4">
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
};

/** @deprecated Use composable API instead. */
export const LegacyInteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = React.useState('option1');
  return (
    <RadioGroup name="composable-basic" value={value} onValueChange={setValue} size="md" orientation="vertical">
      <RadioGroupLabel>Select an option</RadioGroupLabel>
      <RadioItem value="option1">
        <RadioItemInput />
        <RadioItemLabel>Option 1</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option2">
        <RadioItemInput />
        <RadioItemLabel>Option 2</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option3">
        <RadioItemInput />
        <RadioItemLabel>Option 3</RadioItemLabel>
      </RadioItem>
    </RadioGroup>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableHorizontalComponent() {
  const [value, setValue] = React.useState('yes');
  return (
    <RadioGroup name="composable-horizontal" value={value} onValueChange={setValue} size="md" orientation="horizontal">
      <RadioItem value="yes">
        <RadioItemInput />
        <RadioItemLabel>Yes</RadioItemLabel>
      </RadioItem>
      <RadioItem value="no">
        <RadioItemInput />
        <RadioItemLabel>No</RadioItemLabel>
      </RadioItem>
      <RadioItem value="maybe">
        <RadioItemInput />
        <RadioItemLabel>Maybe</RadioItemLabel>
      </RadioItem>
    </RadioGroup>
  );
}

export const Horizontal: Story = {
  render: () => <ComposableHorizontalComponent />,
};

function ComposableWithHelperComponent() {
  const [value, setValue] = React.useState('option1');
  return (
    <RadioGroup name="composable-helper" value={value} onValueChange={setValue} size="md" orientation="vertical">
      <RadioGroupLabel>Choose your plan</RadioGroupLabel>
      <RadioItem value="option1">
        <RadioItemInput />
        <RadioItemLabel>Basic Plan</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option2">
        <RadioItemInput />
        <RadioItemLabel>Premium Plan</RadioItemLabel>
      </RadioItem>
      <RadioGroupHelper>Select the plan that best fits your needs</RadioGroupHelper>
    </RadioGroup>
  );
}

export const WithHelper: Story = {
  render: () => <ComposableWithHelperComponent />,
};

function ComposableWithErrorComponent() {
  const [value, setValue] = React.useState('');
  return (
    <RadioGroup name="composable-error" value={value} onValueChange={setValue} size="md" orientation="vertical" error>
      <RadioGroupLabel>Select an option</RadioGroupLabel>
      <RadioItem value="option1">
        <RadioItemInput />
        <RadioItemLabel>Option 1</RadioItemLabel>
      </RadioItem>
      <RadioItem value="option2">
        <RadioItemInput />
        <RadioItemLabel>Option 2</RadioItemLabel>
      </RadioItem>
      <RadioGroupError>Please select an option</RadioGroupError>
    </RadioGroup>
  );
}

export const WithError: Story = {
  render: () => <ComposableWithErrorComponent />,
};
