import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';

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

// Basic tooltip
export const Basic: Story = {
  args: {
    children: 'This is a basic tooltip',
    placement: 'top',
    align: 'center',
    color: 'white',
  },
};

// With heading
export const WithHeading: Story = {
  args: {
    heading: 'Tooltip Heading',
    children: 'This is a tooltip with a heading',
    placement: 'top',
    align: 'center',
    color: 'white',
  },
};

// With close button
export const WithCloseButton: Story = {
  args: {
    heading: 'Tooltip Heading',
    children: 'This is a tooltip with a close button',
    showClose: true,
    placement: 'top',
    align: 'center',
    color: 'white',
  },
};

// With actions
export const WithActions: Story = {
  args: {
    heading: 'Tooltip Heading',
    children: 'This is a tooltip with action buttons',
    primaryActionText: 'Learn more',
    secondaryActionText: 'Skip',
    placement: 'top',
    align: 'center',
    color: 'white',
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {
    heading: 'Dark Tooltip',
    children: 'This is a tooltip with dark theme',
    showClose: true,
    primaryActionText: 'Learn more',
    secondaryActionText: 'Skip',
    placement: 'top',
    align: 'center',
    color: 'dark',
  },
};

// Different placements
export const TopLeft: Story = {
  args: {
    children: 'Top left tooltip',
    placement: 'top',
    align: 'start',
    color: 'white',
  },
};

export const TopRight: Story = {
  args: {
    children: 'Top right tooltip',
    placement: 'top',
    align: 'end',
    color: 'white',
  },
};

export const Bottom: Story = {
  args: {
    children: 'Bottom tooltip',
    placement: 'bottom',
    align: 'center',
    color: 'white',
  },
};

export const Left: Story = {
  args: {
    children: 'Left tooltip',
    placement: 'left',
    align: 'center',
    color: 'white',
  },
};

export const Right: Story = {
  args: {
    children: 'Right tooltip',
    placement: 'right',
    align: 'center',
    color: 'white',
  },
}; 