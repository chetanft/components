import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SubText } from './SubText';

const meta = {
  title: 'Atoms/SubText',
  component: SubText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sub-text component for displaying secondary information. Can optionally include a check icon.',
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
      behavior: 'inline',
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' },
            { id: 'with-icon', label: 'WithIcon', story: 'WithIcon' },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['Yes', 'No'],
      description: 'Whether to show the check icon'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof SubText>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default sub text (no icon)
export const Default: Story = {
  args: {
    icon: 'No',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    icon: 'Yes',
  },
};

// Both variants showcase
export const DocsAllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Without Icon</h3>
        <div className="max-w-xs">
          <SubText icon="No" />
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">With Check Icon</h3>
        <div className="max-w-xs">
          <SubText icon="Yes" />
        </div>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}