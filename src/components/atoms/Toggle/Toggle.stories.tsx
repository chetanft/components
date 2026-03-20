import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof Toggle> = {
    title: 'Atoms/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A toggle button that can be pressed or unpressed. Supports text, icons, and outline variants.',
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
            rows: [
                {
                    id: 'type',
                    label: 'Type',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase' },
                        { id: 'with-icon', label: 'With Icon', story: 'ExplorerBase', args: { icon: 'check', children: 'With Icon' } },
                        { id: 'icon-only', label: 'Icon Only', story: 'ExplorerBase', args: { icon: 'star', children: undefined } },
                        { id: 'outline', label: 'Outline', story: 'ExplorerBase', args: { variant: 'outline', children: 'Outline' } },
                    ],
                },
                {
                    id: 'state',
                    label: 'State',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase' },
                        { id: 'pressed', label: 'Pressed', story: 'ExplorerBase', args: { defaultPressed: true, children: 'Pressed' } },
                        { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true, children: 'Disabled' } },
                    ],
                },
            ],
            defaultRowId: 'type',
            defaultScenarioId: 'default',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const ExplorerBase: Story = {
    args: {
        children: 'Toggle Me',
    },
};

export const Default: Story = {
    args: {
        children: 'Toggle Me',
    },
};

export const DocsVariants: Story = {
    render: () => (
        <div className="flex gap-4">
            <Toggle>Default</Toggle>
            <Toggle variant="outline">Outline</Toggle>
            <Toggle icon="check">With Icon</Toggle>
            <Toggle icon="star" aria-label="Star" />
        </div>
    ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Toggle>Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle icon="check">With Icon</Toggle>
<Toggle icon="star" aria-label="Star" />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}