import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Steps, StepsItem } from '../components/molecules/Steps/Steps';

const meta: Meta<typeof Steps> = {
  title: 'Molecules/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Steps component for showing progress through a multi-step process.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    device: {
      control: 'select',
      options: ['desktop', 'mobile'],
      description: 'Device type variant',
    },
    currentStep: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Current active step',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Steps>;

export const Default: Story = {
  args: {
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ],
    currentStep: 1,
    device: 'desktop',
  },
};

export const TwoSteps: Story = {
  args: {
    steps: [
      { label: 'Start' },
      { label: 'Finish' },
    ],
    currentStep: 1,
    device: 'desktop',
  },
};

export const FourSteps: Story = {
  args: {
    steps: [
      { label: 'Info' },
      { label: 'Details' },
      { label: 'Review' },
      { label: 'Submit' },
    ],
    currentStep: 2,
    device: 'desktop',
  },
};

export const Mobile: Story = {
  args: {
    steps: [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ],
    currentStep: 2,
    device: 'mobile',
  },
};

// Step 1 Active
export const Step1Active: Story = {
  args: {
    steps: [
      { label: 'Getting Started' },
      { label: 'Configuration' },
      { label: 'Testing' },
      { label: 'Deployment' },
    ],
    currentStep: 1,
    device: 'desktop',
  },
};

// Step 2 Active  
export const Step2Active: Story = {
  args: {
    steps: [
      { label: 'Getting Started' },
      { label: 'Configuration' },
      { label: 'Testing' },
      { label: 'Deployment' },
    ],
    currentStep: 2,
    device: 'desktop',
  },
};

// All Complete
export const AllComplete: Story = {
  args: {
    steps: [
      { label: 'Getting Started' },
      { label: 'Configuration' },
      { label: 'Testing' },
      { label: 'Deployment' },
    ],
    currentStep: 5,
    device: 'desktop',
  },
};
