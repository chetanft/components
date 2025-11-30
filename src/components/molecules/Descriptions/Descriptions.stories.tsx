import type { Meta, StoryObj } from '@storybook/react';
import { Descriptions } from './Descriptions';
import { Badge } from '../../atoms/Badge';

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

export const Default: Story = {
    args: {
        title: 'User Info',
        items: items,
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
