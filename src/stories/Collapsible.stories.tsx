import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from '../components/organisms/Collapsible/Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Collapsible Component

A flexible collapsible component with expandable content sections. Perfect for organizing information hierarchically.

## Design Specifications
- **Button**: 40×40px square with 8px border radius
- **Spacing**: 20px gaps between elements, 32px gap in expanded layout
- **Backgrounds**: Gray (#F8F8F9) or White variants
- **States**: Open/Closed with smooth transitions
- **Badges**: Optional loads, invoices, and materials counters

## Usage Guidelines
- Use for grouping related content that can be hidden/shown
- Gray background for primary sections, white for nested/secondary
- Submitted stage automatically shows badge counters
- Keep headers concise and descriptive

## Interactive Features
- Click button or header area to toggle
- Supports controlled and uncontrolled usage
- Smooth expand/collapse animations
        `,
      },
    },
  },
  argTypes: {
    header: {
      description: 'Main header text displayed in the collapsible section',
      control: { type: 'text' },
    },
    background: {
      description: 'Background color variant - gray for primary sections, white for secondary',
      control: { type: 'select' },
      options: ['gray', 'white'],
    },
    stage: {
      description: 'Component stage - submitted automatically shows badge counters',
      control: { type: 'select' },
      options: ['default', 'submitted'],
    },
    isExpanded: {
      description: 'Controls expanded/collapsed state (for controlled usage)',
      control: { type: 'boolean' },
    },
    badges: {
      description: 'Custom badge values - overrides default submitted stage badges',
      control: { type: 'object' },
    },
    children: {
      description: 'Content to display when expanded',
      control: false,
    },
    onToggle: {
      description: 'Callback fired when expand/collapse state changes',
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    header: 'Collapsible header',
    background: 'gray',
    stage: 'default',
    isExpanded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic collapsible in collapsed state with gray background.',
      },
    },
  },
};

export const BGGrayStateClosed: Story = {
  args: {
    header: 'Collapsible header',
    background: 'gray',
    stage: 'default',
    isExpanded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Gray background variant in closed state - ideal for primary content sections.',
      },
    },
  },
};

export const BGGrayStateOpen: Story = {
  args: {
    header: 'Collapsible header',
    background: 'gray',
    stage: 'default',
    isExpanded: true,
    children: (
      <div className="space-y-4">
        <p>This is the content of the collapsible section.</p>
        <p>You can put any content here when expanded.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Gray background variant in open state showing expanded content area with proper spacing.',
      },
    },
  },
};

export const BGGrayStateClosedSubmitted: Story = {
  args: {
    header: 'Update header name with key value',
    background: 'gray',
    stage: 'submitted',
    isExpanded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Submitted stage automatically displays badge counters for loads, invoices, and materials.',
      },
    },
  },
};

export const BGGrayStateOpenSubmitted: Story = {
  args: {
    header: 'Update header name with key value',
    background: 'gray',
    stage: 'submitted',
    isExpanded: true,
    children: (
      <div className="space-y-4">
        <p>This is the content of the collapsible section with submitted badges.</p>
        <p>Shows loads, invoices, and materials badges.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Expanded submitted stage showing both badge counters and content area.',
      },
    },
  },
};

export const BGWhiteStateClosed: Story = {
  args: {
    header: 'Collapsible header',
    background: 'white',
    stage: 'default',
    isExpanded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'White background variant - perfect for nested or secondary content sections.',
      },
    },
  },
};

export const BGWhiteStateOpen: Story = {
  args: {
    header: 'Collapsible header',
    background: 'white',
    stage: 'default',
    isExpanded: true,
    children: (
      <div className="space-y-4">
        <p>This is the content of the collapsible section with white background.</p>
        <p>You can put any content here when expanded.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'White background in expanded state with clean, minimal appearance.',
      },
    },
  },
};

export const BGWhiteStateClosedSubmitted: Story = {
  args: {
    header: 'Update header name with key value',
    background: 'white',
    stage: 'submitted',
    isExpanded: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'White background with submitted stage badges for secondary sections.',
      },
    },
  },
};

export const BGWhiteStateOpenSubmitted: Story = {
  args: {
    header: 'Update header name with key value',
    background: 'white',
    stage: 'submitted',
    isExpanded: true,
    children: (
      <div className="space-y-4">
        <p>This is the content with white background and submitted badges.</p>
        <p>Shows loads, invoices, and materials badges.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully expanded white background variant with submitted stage features.',
      },
    },
  },
};

export const CustomBadges: Story = {
  args: {
    header: 'Custom badge values',
    background: 'gray',
    stage: 'default',
    badges: {
      loads: 5,
      invoices: 3,
      materials: 12,
    },
    isExpanded: true,
    children: (
      <div className="space-y-4">
        <p>This example shows custom badge values.</p>
        <p>You can override the default submitted stage badges.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates custom badge values - override default counts for specific use cases.',
      },
    },
  },
}; 