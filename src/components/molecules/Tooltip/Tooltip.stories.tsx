import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipTitle, TooltipDescription, TooltipArrow } from './index';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

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
    },
  },
};

// Legacy Declarative API Examples

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    children: 'This is a basic tooltip',
    placement: 'top',
    align: 'center',
    color: 'white',
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ **Deprecated**: This uses the deprecated children prop directly. Use the composable API with TooltipTrigger and TooltipContent instead.',
      },
    },
  },
};

/** @deprecated Use composable API instead. */
export const LegacyPlacements: Story = {
  render: () => (
    <div className="p-8">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Tooltip children="Top left" placement="top" align="start" color="white" />
        <Tooltip children="Top center" placement="top" align="center" color="white" />
        <Tooltip children="Top right" placement="top" align="end" color="white" />
        <Tooltip children="Bottom" placement="bottom" align="center" color="white" />
        <Tooltip children="Left" placement="left" align="center" color="white" />
        <Tooltip children="Right" placement="right" align="center" color="white" />
      </div>
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyWithHeading: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip heading="Tooltip Heading" children="This is a tooltip with a heading" placement="top" align="center" color="white" />
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyWithCloseButton: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip heading="Tooltip Heading" children="This is a tooltip with a close button" showClose={true} placement="top" align="center" color="white" />
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyWithActions: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip heading="Tooltip Heading" children="This is a tooltip with action buttons" primaryActionText="Learn more" secondaryActionText="Skip" placement="top" align="center" color="white" />
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyDarkTheme: Story = {
  render: () => (
    <div className="p-8">
      <Tooltip heading="Dark Tooltip" children="This is a tooltip with dark theme" showClose={true} primaryActionText="Learn more" secondaryActionText="Skip" placement="top" align="center" color="dark" />
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyInteractiveDemo: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <h3 className="text-lg font-semibold mb-4">All Tooltip Variants - Interactive</h3>
      <p className="text-sm text-gray-600 mb-6">Hover or focus on the elements below to see tooltips appear.</p>

      <div className="flex flex-wrap gap-4 items-center justify-center">
        <Tooltip children="Top left tooltip" placement="top" align="start" color="white" />
        <Tooltip children="Top center tooltip" placement="top" align="center" color="white" />
        <Tooltip children="Top right tooltip" placement="top" align="end" color="white" />
        <Tooltip children="Bottom tooltip" placement="bottom" align="center" color="white" />
        <Tooltip children="Left tooltip" placement="left" align="center" color="white" />
        <Tooltip children="Right tooltip" placement="right" align="center" color="white" />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">With Heading</h4>
          <Tooltip heading="Tooltip Heading" children="This is a tooltip with a heading" placement="top" align="center" color="white" />
        </div>

        <div>
          <h4 className="font-medium mb-2">With Close Button</h4>
          <Tooltip heading="Tooltip Heading" children="This is a tooltip with a close button" showClose={true} placement="top" align="center" color="white" />
        </div>

        <div>
          <h4 className="font-medium mb-2">With Actions</h4>
          <Tooltip heading="Tooltip Heading" children="This is a tooltip with action buttons" primaryActionText="Learn more" secondaryActionText="Skip" placement="top" align="center" color="white" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Dark Theme</h4>
          <Tooltip heading="Dark Tooltip" children="This is a tooltip with dark theme" showClose={true} primaryActionText="Learn more" secondaryActionText="Skip" placement="top" align="center" color="dark" />
        </div>
      </div>
    </div>
  ),
};
