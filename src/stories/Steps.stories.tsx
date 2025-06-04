import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Steps, StepsItem } from '../components/Steps/Steps';

const meta: Meta<typeof Steps> = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    device: {
      control: { type: 'select' },
      options: ['desktop', 'mobile'],
    },
    currentStep: {
      control: { type: 'number' },
      min: 1,
      max: 5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default steps
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

// Desktop vs Mobile
export const DeviceVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Desktop</h3>
        <Steps
          device="desktop"
          currentStep={2}
          steps={[
            { label: 'Personal Info' },
            { label: 'Address' },
            { label: 'Payment' },
            { label: 'Confirmation' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Mobile</h3>
        <Steps
          device="mobile"
          currentStep={2}
          steps={[
            { label: 'Personal Info' },
            { label: 'Address' },
            { label: 'Payment' },
            { label: 'Confirmation' },
          ]}
        />
      </div>
    </div>
  ),
};

// Different step counts
export const StepCounts: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">2 Steps</h3>
        <Steps
          currentStep={1}
          steps={[
            { label: 'Setup' },
            { label: 'Complete' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">3 Steps</h3>
        <Steps
          currentStep={2}
          steps={[
            { label: 'Start' },
            { label: 'Progress' },
            { label: 'Finish' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">4 Steps</h3>
        <Steps
          currentStep={3}
          steps={[
            { label: 'Info' },
            { label: 'Details' },
            { label: 'Review' },
            { label: 'Submit' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">5 Steps</h3>
        <Steps
          currentStep={3}
          steps={[
            { label: 'Basic' },
            { label: 'Advanced' },
            { label: 'Settings' },
            { label: 'Review' },
            { label: 'Deploy' },
          ]}
        />
      </div>
    </div>
  ),
};

// Progress states
export const ProgressStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Step 1 Active</h3>
        <Steps
          currentStep={1}
          steps={[
            { label: 'Getting Started' },
            { label: 'Configuration' },
            { label: 'Testing' },
            { label: 'Deployment' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Step 2 Active</h3>
        <Steps
          currentStep={2}
          steps={[
            { label: 'Getting Started' },
            { label: 'Configuration' },
            { label: 'Testing' },
            { label: 'Deployment' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">Step 3 Active</h3>
        <Steps
          currentStep={3}
          steps={[
            { label: 'Getting Started' },
            { label: 'Configuration' },
            { label: 'Testing' },
            { label: 'Deployment' },
          ]}
        />
      </div>
      <div>
        <h3 className="mb-4 text-lg font-semibold">All Complete</h3>
        <Steps
          currentStep={5}
          steps={[
            { label: 'Getting Started' },
            { label: 'Configuration' },
            { label: 'Testing' },
            { label: 'Deployment' },
          ]}
        />
      </div>
    </div>
  ),
};

// Individual StepsItem component
export const StepsItemOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <StepsItem state="unselected" label="Unselected Step" device="desktop" />
        <StepsItem state="selected" label="Selected Step" device="desktop" />
      </div>
      <div className="flex gap-4">
        <StepsItem state="unselected" device="mobile" />
        <StepsItem state="selected" device="mobile" />
      </div>
    </div>
  ),
};

// With completed steps
export const WithCompletedSteps: Story = {
  args: {
    steps: [
      { label: 'Account Setup', completed: true },
      { label: 'Profile Information', completed: true },
      { label: 'Preferences' },
      { label: 'Verification' },
    ],
    currentStep: 3,
    device: 'desktop',
  },
}; 