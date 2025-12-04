import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List, ListHeader, ListBody, ListFooter, ListItem, ListItemIcon, ListItemContent, ListItemTitle, ListItemDescription, ListItemAction } from './index';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';

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

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListHeader>
                    <Typography variant="body-primary-semibold">List Header</Typography>
                </ListHeader>
                <ListBody>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item 1</ListItemTitle>
                            <ListItemDescription>Description for item 1</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item 2</ListItemTitle>
                            <ListItemDescription>Description for item 2</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                </ListBody>
                <ListFooter>
                    <Typography variant="body-secondary-regular">Footer</Typography>
                </ListFooter>
            </List>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '✅ **Composable API**: Use ListHeader, ListBody, ListFooter, ListItem, and ListItemContent sub-components for flexible list composition.',
            },
        },
    },
};

export const ComposableWithIcons: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListBody>
                    <ListItem>
                        <ListItemIcon>
                            <Icon name="check" size={16} />
                        </ListItemIcon>
                        <ListItemContent>
                            <ListItemTitle>Completed Task</ListItemTitle>
                            <ListItemDescription>This task is done</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Icon name="alert" size={16} />
                        </ListItemIcon>
                        <ListItemContent>
                            <ListItemTitle>Pending Task</ListItemTitle>
                            <ListItemDescription>This task needs attention</ListItemDescription>
                        </ListItemContent>
                    </ListItem>
                </ListBody>
            </List>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Use ListItemIcon for icons in list items.',
            },
        },
    },
};

export const ComposableWithActions: Story = {
    render: () => (
        <div className="p-6">
            <List bordered>
                <ListBody>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Item with Action</ListItemTitle>
                            <ListItemDescription>This item has an action button</ListItemDescription>
                        </ListItemContent>
                        <ListItemAction>
                            <Button size="sm" variant="link">Edit</Button>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemContent>
                            <ListItemTitle>Another Item</ListItemTitle>
                            <ListItemDescription>Another item with action</ListItemDescription>
                        </ListItemContent>
                        <ListItemAction>
                            <Button size="sm" variant="link">Delete</Button>
                        </ListItemAction>
                    </ListItem>
                </ListBody>
            </List>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Use ListItemAction for action buttons in list items.',
            },
        },
    },
};

// Mark deprecated examples
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
    parameters: {
        docs: {
            description: {
                story: '⚠️ **Deprecated**: This uses the deprecated `dataSource` and `renderItem` props. Use the composable API with ListHeader, ListBody, ListItem, and ListItemContent instead.',
            },
        },
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
