import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioSelector } from '../components/molecules/RadioSelector';
import { AlertInformationalFill } from '../components/atoms/Icons';

const meta: Meta<typeof RadioSelector> = {
  title: 'Components/RadioSelector',
  component: RadioSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioSelector>;

// Base options for stories
const baseOptions = [
  {
    value: 'option1',
    header: 'Radio selector header',
    description: 'Radio selector description',
  },
  {
    value: 'option2',
    header: 'Radio selector header',
    description: 'Radio selector description',
  },
];

// Basic usage - With Radio Button, No Description
export const BasicWithRadio: Story = {
  args: {
    name: 'basic-radio',
    options: baseOptions.map(({ description, ...option }) => option),
  },
};

// With Radio Button and Description
export const WithRadioAndDescription: Story = {
  args: {
    name: 'radio-description',
    options: baseOptions,
  },
};

// With Radio, Description, and Icon
export const WithRadioDescriptionIcon: Story = {
  args: {
    name: 'radio-description-icon',
    options: baseOptions.map(option => ({
      ...option,
      icon: <AlertInformationalFill />,
    })),
  },
};

// Without Radio Button, With Icon
export const WithoutRadioWithIcon: Story = {
  args: {
    name: 'no-radio-icon',
    options: baseOptions.map(option => ({
      ...option,
      hideRadio: true,
      icon: <AlertInformationalFill />,
    })),
  },
};

// States demonstration
export const States: Story = {
  args: {
    name: 'states-demo',
    defaultValue: 'selected',
    options: [
      {
        value: 'default',
        header: 'Default state',
        description: 'Radio selector description',
      },
      {
        value: 'selected',
        header: 'Selected state',
        description: 'Radio selector description',
      },
      {
        value: 'disabled',
        header: 'Disabled state',
        description: 'Radio selector description',
        disabled: true,
      },
    ],
  },
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <RadioSelector
        name="variant-1"
        options={[{
          value: '1',
          header: 'Radio selector header',
        }]}
      />
      
      <RadioSelector
        name="variant-2"
        options={[{
          value: '1',
          header: 'Radio selector header',
          description: 'Radio selector description',
        }]}
      />
      
      <RadioSelector
        name="variant-3"
        options={[{
          value: '1',
          header: 'Radio selector header',
          description: 'Radio selector description',
          icon: <AlertInformationalFill />,
        }]}
      />
      
      <RadioSelector
        name="variant-4"
        options={[{
          value: '1',
          header: 'Radio selector header',
          icon: <AlertInformationalFill />,
          hideRadio: true,
        }]}
      />
    </div>
  ),
}; 