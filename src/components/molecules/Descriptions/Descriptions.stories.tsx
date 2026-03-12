import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Descriptions, DescriptionsTitle, DescriptionsExtra, DescriptionsItem, DescriptionsLabel, DescriptionsValue } from './index';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Descriptions> = {
    title: 'Molecules/Descriptions',
    component: Descriptions,
    tags: ['autodocs'],
    argTypes: {
        bordered: {
            control: 'boolean',
            description: 'Whether to show a border around the descriptions.',
        },
        column: {
            control: 'number',
            description: 'Number of columns in the grid layout.',
        },
        layout: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Layout direction of the description items.',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of description items.',
        },
        glass: {
            control: 'select',
            options: ['none', 'frost', 'subtle', 'medium', 'heavy'],
            description: 'Glass morphism variant.',
        },
        children: {
            control: false,
            description: 'Composable sub-components (DescriptionsTitle, DescriptionsItem, etc.).',
        },
    },
    parameters: {
        docs: {
            description: {
                component: 'A composable description list component for displaying key-value pairs. Supports bordered and vertical layouts with sub-components for title, extra actions, items, labels, and values.',
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
            behavior: 'layout',
            previewMode: 'inline' as const,
            baseStory: 'ExplorerBase',
            rows: [
                {
                    id: 'type',
                    label: 'Type',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
                        { id: 'with-badge', label: 'With Badge', story: 'ExplorerBase', args: { contentType: 'with-badge' } },
                        { id: 'vertical', label: 'Vertical', story: 'ExplorerBase', args: { contentType: 'vertical' } },
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
            defaultRowId: 'type',
            defaultScenarioId: 'default',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Descriptions>;

export const ExplorerBase: Story = {
    render: (args: any) => {
        const contentType = args.contentType ?? 'default';
        const syncKey = JSON.stringify({ contentType });
        return (
            <div key={syncKey} className="p-6">
                {contentType === 'default' && (
                    <Descriptions bordered column={2}>
                        <DescriptionsTitle>User Info</DescriptionsTitle>
                        <DescriptionsExtra>
                            <Button size="sm">Edit</Button>
                        </DescriptionsExtra>
                        <DescriptionsItem>
                            <DescriptionsLabel>Product</DescriptionsLabel>
                            <DescriptionsValue>Cloud Database</DescriptionsValue>
                        </DescriptionsItem>
                        <DescriptionsItem>
                            <DescriptionsLabel>Billing Mode</DescriptionsLabel>
                            <DescriptionsValue>Prepaid</DescriptionsValue>
                        </DescriptionsItem>
                        <DescriptionsItem span={2}>
                            <DescriptionsLabel>Usage Time</DescriptionsLabel>
                            <DescriptionsValue>2019-04-24 18:00:00</DescriptionsValue>
                        </DescriptionsItem>
                    </Descriptions>
                )}
                {contentType === 'with-badge' && (
                    <Descriptions bordered column={3}>
                        <DescriptionsItem span={3}>
                            <DescriptionsLabel>Status</DescriptionsLabel>
                            <DescriptionsValue>
                                <Badge variant="success">Running</Badge>
                            </DescriptionsValue>
                        </DescriptionsItem>
                    </Descriptions>
                )}
                {contentType === 'vertical' && (
                    <Descriptions bordered layout="vertical" column={2}>
                        <DescriptionsTitle>Vertical Layout</DescriptionsTitle>
                        <DescriptionsItem>
                            <DescriptionsLabel>Product</DescriptionsLabel>
                            <DescriptionsValue>Cloud Database</DescriptionsValue>
                        </DescriptionsItem>
                        <DescriptionsItem>
                            <DescriptionsLabel>Billing</DescriptionsLabel>
                            <DescriptionsValue>Prepaid</DescriptionsValue>
                        </DescriptionsItem>
                    </Descriptions>
                )}
            </div>
        );
    },
};

// Composable API Examples (Recommended)
export const Default: Story = {
    render: () => (
        <div className="p-6">
            <Descriptions bordered column={2}>
                <DescriptionsTitle>User Info</DescriptionsTitle>
                <DescriptionsExtra>
                    <Button size="sm">Edit</Button>
                </DescriptionsExtra>
                <DescriptionsItem>
                    <DescriptionsLabel>Product</DescriptionsLabel>
                    <DescriptionsValue>Cloud Database</DescriptionsValue>
                </DescriptionsItem>
                <DescriptionsItem>
                    <DescriptionsLabel>Billing Mode</DescriptionsLabel>
                    <DescriptionsValue>Prepaid</DescriptionsValue>
                </DescriptionsItem>
                <DescriptionsItem span={2}>
                    <DescriptionsLabel>Usage Time</DescriptionsLabel>
                    <DescriptionsValue>2019-04-24 18:00:00</DescriptionsValue>
                </DescriptionsItem>
            </Descriptions>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '✅ **Composable API**: Use DescriptionsTitle, DescriptionsExtra, DescriptionsItem, DescriptionsLabel, and DescriptionsValue sub-components for flexible descriptions composition.',
            },
        },
    },
};

export const WithBadge: Story = {
    render: () => (
        <div className="p-6">
            <Descriptions bordered column={3}>
                <DescriptionsItem span={3}>
                    <DescriptionsLabel>Status</DescriptionsLabel>
                    <DescriptionsValue>
                        <Badge variant="success">Running</Badge>
                    </DescriptionsValue>
                </DescriptionsItem>
            </Descriptions>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Use DescriptionsValue to include custom content like badges.',
            },
        },
    },
};

export const DocsVariants: Story = {
    render: () => (
        <div className="flex flex-col gap-8 p-6">
            <Descriptions bordered column={2}>
                <DescriptionsTitle>Bordered (Default)</DescriptionsTitle>
                <DescriptionsItem>
                    <DescriptionsLabel>Product</DescriptionsLabel>
                    <DescriptionsValue>Cloud Database</DescriptionsValue>
                </DescriptionsItem>
                <DescriptionsItem>
                    <DescriptionsLabel>Billing</DescriptionsLabel>
                    <DescriptionsValue>Prepaid</DescriptionsValue>
                </DescriptionsItem>
            </Descriptions>
            <Descriptions column={2}>
                <DescriptionsTitle>Unbounded</DescriptionsTitle>
                <DescriptionsItem>
                    <DescriptionsLabel>Product</DescriptionsLabel>
                    <DescriptionsValue>Cloud Database</DescriptionsValue>
                </DescriptionsItem>
                <DescriptionsItem>
                    <DescriptionsLabel>Billing</DescriptionsLabel>
                    <DescriptionsValue>Prepaid</DescriptionsValue>
                </DescriptionsItem>
            </Descriptions>
            <Descriptions bordered layout="vertical" column={2}>
                <DescriptionsTitle>Vertical Layout</DescriptionsTitle>
                <DescriptionsItem>
                    <DescriptionsLabel>Product</DescriptionsLabel>
                    <DescriptionsValue>Cloud Database</DescriptionsValue>
                </DescriptionsItem>
                <DescriptionsItem>
                    <DescriptionsLabel>Billing</DescriptionsLabel>
                    <DescriptionsValue>Prepaid</DescriptionsValue>
                </DescriptionsItem>
            </Descriptions>
        </div>
    ),

  parameters: { docsOnly: true },
}