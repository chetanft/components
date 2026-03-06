import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Illustration } from './Illustration';

const meta: Meta<typeof Illustration> = {
  title: 'Atoms/Illustration',
  component: Illustration,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Illustration component for displaying images with various sizes and styling options.',
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
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'overview', label: 'Overview', story: 'ExplorerBase', args: { variant: 'overview' } },
            { id: 'insights', label: 'Insights', story: 'ExplorerBase', args: { variant: 'insights' } },
            { id: 'workspace', label: 'Workspace', story: 'ExplorerBase', args: { variant: 'workspace' } },
            { id: 'reports', label: 'Reports', story: 'ExplorerBase', args: { variant: 'reports' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
          ],
        },
        {
          id: 'gallery',
          label: 'Content',
          scenarios: [
            { id: 'single', label: 'Single Preview', story: 'ExplorerBase' },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'overview',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['overview', 'insights', 'workspace', 'reports'],
      description: 'Predefined illustration variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the illustration',
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Border radius style',
    },
    background: {
      control: 'select',
      options: ['transparent', 'subtle'],
      description: 'Background style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Illustration>;

export const ExplorerBase: Story = {
  args: {
    variant: 'overview',
    size: 'lg',
  },
};

export const Default: Story = {
  args: {
    variant: 'overview',
    size: 'md',
  },
};

export const DocsOverview: Story = {
  args: {
    variant: 'overview',
    size: 'lg',
  },

  parameters: { docsOnly: true },
}