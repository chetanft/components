import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof List> = {
    title: 'Molecules/List',
    component: List,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export const Default: Story = {
    args: {
        header: <Typography variant="body-primary-semibold">Header</Typography>,
        footer: <Typography variant="body-secondary-regular">Footer</Typography>,
        bordered: true,
        dataSource: data,
        renderItem: (item: any) => (
            <Typography variant="body-primary-regular">{item}</Typography>
        ),
    },
};

export const Small: Story = {
    args: {
        size: 'sm',
        bordered: true,
        dataSource: data,
        renderItem: (item: any) => (
            <Typography variant="body-primary-regular">{item}</Typography>
        ),
    },
};

export const Grid: Story = {
    args: {
        grid: { gutter: 16, column: 4 },
        dataSource: data,
        renderItem: (item: any) => (
            <div className="border border-[var(--color-border-secondary)] p-4 rounded-md">
                <Typography variant="body-primary-regular">{item}</Typography>
            </div>
        ),
    },
};

export const WithActions: Story = {
    args: {
        bordered: true,
        dataSource: data,
        renderItem: (item: any) => (
            <>
                <Typography variant="body-primary-regular">{item}</Typography>
                <Button variant="link" size="sm">Edit</Button>
            </>
        ),
    },
};
