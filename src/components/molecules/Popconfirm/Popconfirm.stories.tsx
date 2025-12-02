import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popconfirm } from './Popconfirm';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Popconfirm> = {
    title: 'Molecules/Popconfirm',
    component: Popconfirm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onConfirm: { action: 'confirmed' },
        onCancel: { action: 'cancelled' },
    },
};

export default meta;
type Story = StoryObj<typeof Popconfirm>;

export const Default: Story = {
    args: {
        title: 'Delete this task?',
        description: 'Are you sure to delete this task?',
        okText: 'Yes',
        cancelText: 'No',
        children: <Button variant="destructive">Delete</Button>,
    },
};

export const WithIcon: Story = {
    args: {
        title: 'Are you sure?',
        description: 'This action cannot be undone.',
        icon: 'alert-critical',
        okText: 'Confirm',
        okType: 'danger',
        children: <Button>Click me</Button>,
    },
};

export const Placement: Story = {
    render: (args: React.ComponentProps<typeof Popconfirm>) => (
        <div className="flex gap-4 items-center justify-center h-64">
            <Popconfirm {...args} placement="top" title="Top">
                <Button>Top</Button>
            </Popconfirm>
            <Popconfirm {...args} placement="bottom" title="Bottom">
                <Button>Bottom</Button>
            </Popconfirm>
            <Popconfirm {...args} placement="left" title="Left">
                <Button>Left</Button>
            </Popconfirm>
            <Popconfirm {...args} placement="right" title="Right">
                <Button>Right</Button>
            </Popconfirm>
        </div>
    ),
};
