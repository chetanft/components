import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipTitle, TooltipDescription, TooltipArrow } from './index';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component for displaying contextual information on hover or focus. Supports titles, descriptions, arrows, and action buttons.',
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
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Basic', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'with-title', label: 'Title', story: 'ExplorerBase', args: { contentType: 'with-title' } },
            { id: 'with-arrow', label: 'Arrow', story: 'ExplorerBase', args: { contentType: 'with-arrow' } },
            { id: 'composed', label: 'Composed', story: 'ExplorerBase', args: { contentType: 'composed' } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'light', label: 'Light', story: 'ExplorerBase', args: { color: 'white' } },
            { id: 'dark', label: 'Dark', story: 'ExplorerBase', args: { color: 'dark' } },
          ],
        },
      ],
      defaultRowId: 'content',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    color: {
      control: 'select',
      options: ['white', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const color = args.color ?? 'white';
    const syncKey = JSON.stringify({ contentType, color, glass: args.glass });
    return (
      <div key={syncKey} className="p-8">
        <Tooltip placement="top" align="center" color={color}>
          <TooltipTrigger>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            {(contentType === 'with-title' || contentType === 'composed') && (
              <TooltipTitle>Tooltip Title</TooltipTitle>
            )}
            <TooltipDescription>
              {contentType === 'composed'
                ? 'A tooltip with title, description, and an arrow pointer.'
                : contentType === 'with-title'
                ? 'This tooltip has both a title and description'
                : contentType === 'with-arrow'
                ? 'This tooltip includes an arrow'
                : 'This is a basic tooltip using the composable API'}
            </TooltipDescription>
            {(contentType === 'with-arrow' || contentType === 'composed') && <TooltipArrow />}
          </TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip placement="top" align="center" color="white">
        <TooltipTrigger>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>This is a basic tooltip using the composable API</TooltipDescription>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use TooltipTrigger, TooltipContent, TooltipTitle, and TooltipDescription sub-components for flexible tooltip composition.',
      },
      source: {
        code: `<Tooltip placement="top" align="center" color="white">
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipDescription>This is a basic tooltip using the composable API</TooltipDescription>
  </TooltipContent>
</Tooltip>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithTitle: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip placement="top" align="center" color="white">
        <TooltipTrigger>
          <Button>Hover for details</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipTitle>Tooltip Title</TooltipTitle>
          <TooltipDescription>This tooltip has both a title and description</TooltipDescription>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use TooltipTitle for tooltips with headings.',
      },
      source: {
        code: `<Tooltip placement="top" align="center" color="white">
  <TooltipTrigger>
    <Button>Hover for details</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipTitle>Tooltip Title</TooltipTitle>
    <TooltipDescription>This tooltip has both a title and description</TooltipDescription>
  </TooltipContent>
</Tooltip>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithArrow: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip placement="top" align="center" color="white">
        <TooltipTrigger>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>This tooltip includes an arrow</TooltipDescription>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use TooltipArrow to add an arrow pointing to the trigger element.',
      },
      source: {
        code: `<Tooltip placement="top" align="center" color="white">
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipDescription>This tooltip includes an arrow</TooltipDescription>
    <TooltipArrow />
  </TooltipContent>
</Tooltip>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="flex gap-8 p-8">
      <Tooltip placement="top" align="center" color="white">
        <TooltipTrigger>
          <Button variant="secondary">Light</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>Light tooltip variant</TooltipDescription>
        </TooltipContent>
      </Tooltip>
      <Tooltip placement="top" align="center" color="dark">
        <TooltipTrigger>
          <Button variant="secondary">Dark</Button>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipDescription>Dark tooltip variant</TooltipDescription>
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Tooltip placement="top" align="center" color="white">
  <TooltipTrigger>
    <Button variant="secondary">Light</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipDescription>Light tooltip variant</TooltipDescription>
  </TooltipContent>
</Tooltip>
<Tooltip placement="top" align="center" color="dark">
  <TooltipTrigger>
    <Button variant="secondary">Dark</Button>
  </TooltipTrigger>
  <TooltipContent>
    <TooltipDescription>Dark tooltip variant</TooltipDescription>
  </TooltipContent>
</Tooltip>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}