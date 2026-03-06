import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Steps from './Steps';
import { StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription } from './index';

const meta: Meta<typeof Steps> = {
  title: 'Molecules/Steps',
  component: Steps,
  parameters: {
    docs: {
      description: {
        component: 'Step indicator component supporting horizontal and vertical directions, default and dot styles. Use composable sub-components (StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription) for flexible composition.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { direction: 'horizontal', type: 'default' } },
            { id: 'vertical', label: 'Vertical', story: 'ExplorerBase', args: { direction: 'vertical', type: 'default' } },
            { id: 'dot-style', label: 'Dot Style', story: 'ExplorerBase', args: { direction: 'horizontal', type: 'dot' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const direction = args.direction ?? 'horizontal';
    const type = args.type ?? 'default';
    const syncKey = JSON.stringify({ direction, type });
    return (
      <div key={syncKey}>
        <Steps currentStep={1} direction={direction} type={type}>
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
      </div>
    );
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

export const DocsVertical: Story = {
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

  parameters: { docsOnly: true },
}