import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Steps from './Steps';
import { StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription } from './index';

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

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    steps: stepsData,
    currentStep: 1,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyVertical: Story = {
  args: {
    steps: stepsData,
    currentStep: 2,
    direction: 'vertical',
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDotStyle: Story = {
    args: {
        steps: stepsData,
        currentStep: 2,
        type: 'dot',
    },
};

/** @deprecated Use composable API instead. */
export const LegacyVerticalDot: Story = {
    args: {
        steps: stepsData,
        currentStep: 2,
        direction: 'vertical',
        type: 'dot',
    },
};

export const Default: Story = {
  render: () => (
    <Steps currentStep={1} direction="horizontal" type="default">
      <StepsList>
        <StepItem value={1}>
          <StepIcon />
          <StepContent>
            <StepTitle>Login</StepTitle>
            <StepDescription>Enter credentials</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={2}>
          <StepIcon />
          <StepContent>
            <StepTitle>Verification</StepTitle>
            <StepDescription>Check email</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={3}>
          <StepIcon />
          <StepContent>
            <StepTitle>Complete</StepTitle>
            <StepDescription>Success</StepDescription>
          </StepContent>
        </StepItem>
      </StepsList>
    </Steps>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Steps currentStep={2} direction="vertical" type="default">
      <StepsList>
        <StepItem value={1}>
          <StepIcon />
          <StepContent>
            <StepTitle>Login</StepTitle>
            <StepDescription>Enter credentials</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={2}>
          <StepIcon />
          <StepContent>
            <StepTitle>Verification</StepTitle>
            <StepDescription>Check email</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={3}>
          <StepIcon />
          <StepContent>
            <StepTitle>Complete</StepTitle>
            <StepDescription>Success</StepDescription>
          </StepContent>
        </StepItem>
      </StepsList>
    </Steps>
  ),
};

export const DotStyle: Story = {
  render: () => (
    <Steps currentStep={2} direction="horizontal" type="dot">
      <StepsList>
        <StepItem value={1}>
          <StepIcon />
          <StepContent>
            <StepTitle>Login</StepTitle>
            <StepDescription>Enter credentials</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={2}>
          <StepIcon />
          <StepContent>
            <StepTitle>Verification</StepTitle>
            <StepDescription>Check email</StepDescription>
          </StepContent>
        </StepItem>
        <StepItem value={3}>
          <StepIcon />
          <StepContent>
            <StepTitle>Complete</StepTitle>
            <StepDescription>Success</StepDescription>
          </StepContent>
        </StepItem>
      </StepsList>
    </Steps>
  ),
};
