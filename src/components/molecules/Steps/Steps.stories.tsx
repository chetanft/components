import type { Meta, StoryObj } from '@storybook/react';
import Steps from './Steps';

const meta: Meta<typeof Steps> = {
  title: 'Molecules/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    type: {
        control: { type: 'select' },
        options: ['default', 'dot', 'navigation'],
    }
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

const stepsData = [
    { label: 'Login', description: 'Enter credentials' },
    { label: 'Verification', description: 'Check email' },
    { label: 'Complete', description: 'Success' },
];

export const Default: Story = {
  args: {
    steps: stepsData,
    currentStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    steps: stepsData,
    currentStep: 2,
    direction: 'vertical',
  },
};

export const DotStyle: Story = {
    args: {
        steps: stepsData,
        currentStep: 2,
        type: 'dot',
    },
};

export const VerticalDot: Story = {
    args: {
        steps: stepsData,
        currentStep: 2,
        direction: 'vertical',
        type: 'dot',
    },
};
