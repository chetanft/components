import type { Meta, StoryObj } from '@storybook/react';
import { BackTop } from './BackTop';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof BackTop> = {
  title: 'Molecules/BackTop',
  component: BackTop,
  tags: ['autodocs'],
  argTypes: {
    visibilityHeight: {
      control: 'number',
      description: 'Scroll height threshold before the button appears.',
    },
    glass: {
      control: 'select',
      options: ['none', 'frost', 'subtle', 'medium', 'heavy'],
      description: 'Glass morphism variant.',
    },
    onClick: {
      control: false,
      description: 'Click handler called when the back-to-top button is clicked.',
    },
    children: {
      control: false,
      description: 'Custom content to render inside the button.',
    },
  },
  parameters: {
    layout: 'padded',
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
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'Basic' as const },
            { id: 'custom-content', label: 'CustomContent', story: 'CustomContent' as const },
          ],
        },
      ],
      defaultRowId: 'type' as const,
      defaultScenarioId: 'basic' as const,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackTop>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '300vh', padding: '20px' }}>
      <Typography variant="display-primary" as="h3">Scroll down to see the BackTop button</Typography>
      <Typography>Current scroll position is monitored.</Typography>
      <BackTop />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div style={{ height: '300vh', padding: '20px' }}>
      <Typography variant="display-primary" as="h3">Scroll down (Custom Button)</Typography>
      <BackTop visibilityHeight={100}>
        <Button
          variant="primary"
          size="md"
        >
          UP
        </Button>
      </BackTop>
    </div>
  ),
};

