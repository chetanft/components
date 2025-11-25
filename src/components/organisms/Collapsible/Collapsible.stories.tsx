import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'Organisms/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A collapsible component that can expand and collapse content. Supports different types and backgrounds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'Header text'
    },
    isExpanded: {
      control: 'boolean',
      description: 'Whether the collapsible is expanded'
    },
    type: {
      control: { type: 'select' },
      options: ['Primary', 'Secondary', 'Tertiary'],
      description: 'Collapsible type'
    },
    bg: {
      control: { type: 'select' },
      options: ['Primary', 'Secondary'],
      description: 'Background variant'
    },
    badges: {
      control: 'boolean',
      description: 'Whether to show badges'
    }
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default collapsible
export const Default: Story = {
  args: {
    header: 'Collapsible Header',
    children: 'Collapsible content goes here',
    type: 'Primary',
    bg: 'Secondary',
  },
};

// Primary Type story
export function PrimaryType() {
  return (
    <div className="p-6 space-y-4">
      <Collapsible
        header="Primary Collapsible"
        type="Primary"
        bg="Secondary"
      >
        <p>This is a primary type collapsible with secondary background.</p>
      </Collapsible>
    </div>
  );
}

// Secondary Type story
export function SecondaryType() {
  return (
    <div className="p-6 space-y-4">
      <Collapsible
        header="Secondary Collapsible"
        type="Secondary"
        bg="Secondary"
      >
        <p>This is a secondary type collapsible.</p>
      </Collapsible>
    </div>
  );
}

// Tertiary Type story
export function TertiaryType() {
  return (
    <div className="p-6 space-y-4">
      <Collapsible
        header="Tertiary Collapsible"
        type="Tertiary"
        bg="Secondary"
      >
        <p>This is a tertiary type collapsible.</p>
      </Collapsible>
    </div>
  );
}

// With Badges story
export function WithBadges() {
  return (
    <div className="p-6 space-y-4">
      <Collapsible
        header="Collapsible with Badges"
        type="Primary"
        bg="Secondary"
        badges={true}
      >
        <p>This collapsible shows badges.</p>
      </Collapsible>
    </div>
  );
}

// Interactive Demo - all variants shown together and interactable
export function InteractiveDemo() {
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [expanded4, setExpanded4] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Collapsible Variants - Interactive</h3>
      <p className="text-sm text-gray-600 mb-6">Click headers to expand/collapse content.</p>
      
      <div className="space-y-4">
        <Collapsible
          header="Primary Type Collapsible"
          type="Primary"
          bg="Secondary"
          isExpanded={expanded1}
          onToggle={(isExpanded) => setExpanded1(isExpanded)}
        >
          <p>This is a primary type collapsible. Click the header to expand or collapse.</p>
        </Collapsible>

        <Collapsible
          header="Secondary Type Collapsible"
          type="Secondary"
          bg="Secondary"
          isExpanded={expanded2}
          onToggle={(isExpanded) => setExpanded2(isExpanded)}
        >
          <p>This is a secondary type collapsible with different styling.</p>
        </Collapsible>

        <Collapsible
          header="Tertiary Type Collapsible"
          type="Tertiary"
          bg="Secondary"
          isExpanded={expanded3}
          onToggle={(isExpanded) => setExpanded3(isExpanded)}
        >
          <p>This is a tertiary type collapsible with border styling.</p>
        </Collapsible>

        <Collapsible
          header="Collapsible with Badges"
          type="Primary"
          bg="Secondary"
          badges={true}
          isExpanded={expanded4}
          onToggle={(isExpanded) => setExpanded4(isExpanded)}
        >
          <p>This collapsible shows badges in the header.</p>
        </Collapsible>
      </div>
    </div>
  );
}

