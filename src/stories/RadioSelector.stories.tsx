import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioSelector } from '../components/molecules/RadioSelector';

const meta: Meta<typeof RadioSelector> = {
  title: 'Molecules/RadioSelector',
  component: RadioSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio selector component with card-style options featuring headers and descriptions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioSelector>;

export const Default: Story = {
  args: {
    name: 'default-selector',
    options: [
      {
        value: 'option1',
        header: 'Option 1',
        description: 'Description for option 1',
      },
      {
        value: 'option2',
        header: 'Option 2',
        description: 'Description for option 2',
      },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    name: 'selected-selector',
    defaultValue: 'option1',
    options: [
      {
        value: 'option1',
        header: 'Selected Option',
        description: 'This option is pre-selected',
      },
      {
        value: 'option2',
        header: 'Another Option',
        description: 'Choose this option instead',
      },
    ],
  },
};

export const ThreeOptions: Story = {
  args: {
    name: 'three-options',
    options: [
      {
        value: 'basic',
        header: 'Basic Plan',
        description: 'For small teams getting started',
      },
      {
        value: 'pro',
        header: 'Pro Plan',
        description: 'For growing businesses',
      },
      {
        value: 'enterprise',
        header: 'Enterprise Plan',
        description: 'For large organizations',
      },
    ],
  },
};

export const PlanSelector: Story = {
  args: {
    name: 'plan-selector',
    defaultValue: 'pro',
    options: [
      {
        value: 'basic',
        header: 'Basic Plan',
        description: 'Perfect for getting started',
      },
      {
        value: 'pro',
        header: 'Pro Plan',
        description: 'For growing teams',
      },
      {
        value: 'enterprise',
        header: 'Enterprise Plan',
        description: 'Full-featured solution',
      },
    ],
  },
};
