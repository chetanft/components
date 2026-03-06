import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    glass: true,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Button group component for grouping related actions together.',
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
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'equal-width', label: 'Equal Width', story: 'ExplorerBase', args: { contentType: 'equal-width' } },
            { id: 'with-icons', label: 'With Icons', story: 'ExplorerBase', args: { contentType: 'with-icons' } },
            { id: 'wrapped', label: 'Wrapped', story: 'ExplorerBase', args: { contentType: 'wrapped' } },
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
      supportsGlass: true,
    },
  },
  argTypes: {
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const syncKey = JSON.stringify({ contentType, glass: args.glass });
    return (
      <div key={syncKey}>
        {contentType === 'default' && (
          <ButtonGroup glass={args.glass}>
            <ButtonGroupItem><Button variant="text">Text</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary">Secondary</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="primary">Primary</Button></ButtonGroupItem>
          </ButtonGroup>
        )}
        {contentType === 'equal-width' && (
          <ButtonGroup equalWidth glass={args.glass}>
            <ButtonGroupItem><Button variant="text" className="w-full">Cancel</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" className="w-full">Save Draft</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="primary" className="w-full">Submit</Button></ButtonGroupItem>
          </ButtonGroup>
        )}
        {contentType === 'with-icons' && (
          <ButtonGroup glass={args.glass}>
            <ButtonGroupItem><Button variant="primary" icon="add" iconPosition="leading">Add</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" icon="edit" iconPosition="leading">Edit</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="destructive" icon="delete" iconPosition="leading">Delete</Button></ButtonGroupItem>
          </ButtonGroup>
        )}
        {contentType === 'wrapped' && (
          <ButtonGroup wrap className="max-w-md" glass={args.glass}>
            <ButtonGroupItem><Button variant="secondary" size="sm">Option 1</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" size="sm">Option 2</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" size="sm">Option 3</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" size="sm">Option 4</Button></ButtonGroupItem>
            <ButtonGroupItem><Button variant="secondary" size="sm">Option 5</Button></ButtonGroupItem>
          </ButtonGroup>
        )}
      </div>
    );
  },
};

// Composable API Examples
export const Default: Story = {
  render: (args: any) => (
    <ButtonGroup glass={args.glass}>
      <ButtonGroupItem>
        <Button variant="text">Text</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary">Secondary</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="primary">Primary</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),
};

export const DocsEqualWidth: Story = {
  render: (args: any) => (
    <ButtonGroup equalWidth glass={args.glass}>
      <ButtonGroupItem>
        <Button variant="text" className="w-full">Cancel</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="secondary" className="w-full">Save Draft</Button>
      </ButtonGroupItem>
      <ButtonGroupItem>
        <Button variant="primary" className="w-full">Submit</Button>
      </ButtonGroupItem>
    </ButtonGroup>
  ),

  parameters: { docsOnly: true },
}