import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Descriptions, DescriptionsTitle, DescriptionsExtra, DescriptionsItem, DescriptionsLabel, DescriptionsValue } from './index';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Descriptions> = {
    title: 'Molecules/Descriptions',
    component: Descriptions,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Descriptions>;

const items = [
    { label: 'Product', children: 'Cloud Database' },
    { label: 'Billing Mode', children: 'Prepaid' },
    { label: 'Automatic Renewal', children: 'YES' },
    { label: 'Order time', children: '2018-04-24 18:00:00' },
    { label: 'Usage Time', children: '2019-04-24 18:00:00', span: 2 },
    { label: 'Status', children: <Badge variant="success">Running</Badge>, span: 3 },
    { label: 'Negotiated Amount', children: '$80.00' },
    { label: 'Discount', children: '$20.00' },
    { label: 'Official Receipts', children: '$60.00' },
    { label: 'Config Info', children: 'Data disk type: MongoDB\nDatabase version: 3.4\nPackage: dds.mongo.mid\nStorage space: 10 GB\nReplication factor: 3\nRegion: East China 1', span: 3 },
];

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
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

export const ComposableWithBadge: Story = {
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

// Mark deprecated examples
export const Default: Story = {
    args: {
        title: 'User Info',
        items: items,
    },
    parameters: {
        docs: {
            description: {
                story: '⚠️ **Deprecated**: This uses the deprecated `items` array prop. Use the composable API with DescriptionsItem, DescriptionsLabel, and DescriptionsValue instead.',
            },
        },
    },
};

export const Bordered: Story = {
    args: {
        title: 'User Info',
        bordered: true,
        items: items,
    },
};

export const Vertical: Story = {
    args: {
        title: 'User Info',
        layout: 'vertical',
        items: items,
    },
};
