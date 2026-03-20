import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, CollapsibleTrigger, CollapsibleHeader, CollapsibleTitle, CollapsibleExtra, CollapsibleContent, CollapsibleIcon } from './index';
import { Button } from '../../atoms/Button/Button';

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
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'primary', label: 'Primary', story: 'ExplorerBase', args: { type: 'Primary' } },
            { id: 'secondary', label: 'Secondary', story: 'ExplorerBase', args: { type: 'Secondary' } },
            { id: 'tertiary', label: 'Tertiary', story: 'ExplorerBase', args: { type: 'Tertiary' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'collapsed', label: 'Collapsed', story: 'ExplorerBase', args: { isExpanded: false, withExtra: false } },
            { id: 'expanded', label: 'Expanded', story: 'ExplorerBase', args: { isExpanded: true, withExtra: false } },
            { id: 'with-extra', label: 'Extra', story: 'ExplorerBase', args: { withExtra: true } },
            { id: 'multiple', label: 'Controlled', story: 'ExplorerBase', args: { title: 'Controlled Example', controlledLabel: true } },
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
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => (
    <Collapsible type={args.type ?? 'Primary'} bg={args.bg ?? 'Secondary'} isExpanded={args.isExpanded}>
      <CollapsibleTrigger>
        <CollapsibleHeader>
          <CollapsibleIcon />
          <CollapsibleTitle>{args.title ?? (args.isExpanded ? 'Expanded' : 'Composable Collapsible')}</CollapsibleTitle>
          {args.withExtra ? (
            <CollapsibleExtra>
              <Button size="sm" variant="secondary">{args.controlledLabel ? 'Action' : 'Edit'}</Button>
            </CollapsibleExtra>
          ) : null}
        </CollapsibleHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>
          {args.controlledLabel
            ? 'Controlled/cross-row preview-safe representation.'
            : 'This is a basic composable collapsible using sub-components.'}
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <Collapsible type="Primary" bg="Secondary">
      <CollapsibleTrigger>
        <CollapsibleHeader>
          <CollapsibleIcon />
          <CollapsibleTitle>Composable Collapsible</CollapsibleTitle>
        </CollapsibleHeader>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>This is a basic composable collapsible using sub-components.</p>
      </CollapsibleContent>
    </Collapsible>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Collapsible type="Primary" bg="Secondary">
  <CollapsibleTrigger>
    <CollapsibleHeader>
      <CollapsibleIcon />
      <CollapsibleTitle>Composable Collapsible</CollapsibleTitle>
    </CollapsibleHeader>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <p>This is a basic composable collapsible using sub-components.</p>
  </CollapsibleContent>
</Collapsible>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Collapsible type="Primary" bg="Secondary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Primary Type</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Primary collapsible content.</p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible type="Secondary" bg="Secondary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Secondary Type</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Secondary collapsible content.</p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible type="Tertiary" bg="Secondary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Tertiary Type</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Tertiary collapsible content.</p>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible type="Primary" bg="Primary">
        <CollapsibleTrigger>
          <CollapsibleHeader>
            <CollapsibleIcon />
            <CollapsibleTitle>Primary Background</CollapsibleTitle>
          </CollapsibleHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>Collapsible with primary background variant.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<div className="space-y-4">
  <Collapsible type="Primary" bg="Secondary">
    <CollapsibleTrigger>
      <CollapsibleHeader>
        <CollapsibleIcon />
        <CollapsibleTitle>Primary Type</CollapsibleTitle>
      </CollapsibleHeader>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Primary collapsible content.</p>
    </CollapsibleContent>
  </Collapsible>
  <Collapsible type="Secondary" bg="Secondary">
    <CollapsibleTrigger>
      <CollapsibleHeader>
        <CollapsibleIcon />
        <CollapsibleTitle>Secondary Type</CollapsibleTitle>
      </CollapsibleHeader>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Secondary collapsible content.</p>
    </CollapsibleContent>
  </Collapsible>
  <Collapsible type="Tertiary" bg="Secondary">
    <CollapsibleTrigger>
      <CollapsibleHeader>
        <CollapsibleIcon />
        <CollapsibleTitle>Tertiary Type</CollapsibleTitle>
      </CollapsibleHeader>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Tertiary collapsible content.</p>
    </CollapsibleContent>
  </Collapsible>
  <Collapsible type="Primary" bg="Primary">
    <CollapsibleTrigger>
      <CollapsibleHeader>
        <CollapsibleIcon />
        <CollapsibleTitle>Primary Background</CollapsibleTitle>
      </CollapsibleHeader>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Collapsible with primary background variant.</p>
    </CollapsibleContent>
  </Collapsible>
</div>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}