import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Input } from '../../atoms/Input';

const meta: Meta<typeof Drawer> = {
    title: 'Organisms/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A panel that slides in from the edge of the screen. Built using FT Design System tokens with support for multiple placements and customizable dimensions.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['left', 'right', 'top', 'bottom'],
            description: 'Position from which the drawer slides in',
        },
        width: {
            control: 'text',
            description: 'Width of the drawer (for left/right placements)',
        },
        height: {
            control: 'text',
            description: 'Height of the drawer (for top/bottom placements)',
        },
        closable: {
            control: 'boolean',
            description: 'Whether to show close button',
        },
        maskClosable: {
            control: 'boolean',
            description: 'Whether clicking mask closes the drawer',
        },
        showFigmaBadge: {
            control: 'boolean',
            description: 'Whether to show Figma badge',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DefaultDrawerStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="body-primary-regular">
                    This is the drawer content. You can place any content here.
                </Typography>
                <div className="mt-4">
                    <Typography variant="body-secondary-medium" className="mb-2">
                        Example Form
                    </Typography>
                    <Input placeholder="Enter your name" className="mb-3" />
                    <Input placeholder="Enter your email" className="mb-3" />
                    <div className="flex gap-2 mt-4">
                        <Button variant="primary">Submit</Button>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

// Basic Drawer (Right)
export const Default: Story = {
    render: (args) => <DefaultDrawerStory {...args} />,
    args: {
        title: 'Drawer Title',
        placement: 'right',
        width: 400,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const LeftPlacementStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Left Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="display-primary" className="mb-4">
                    Navigation Menu
                </Typography>
                <div className="space-y-2">
                    {['Dashboard', 'Projects', 'Team', 'Settings', 'Help'].map((item) => (
                        <div
                            key={item}
                            className="p-3 rounded-md hover:bg-[var(--color-bg-secondary)] cursor-pointer transition-colors"
                        >
                            <Typography variant="body-primary-medium">{item}</Typography>
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

// Left Placement
export const LeftPlacement: Story = {
    render: (args) => <LeftPlacementStory {...args} />,
    args: {
        title: 'Menu',
        placement: 'left',
        width: 300,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const TopPlacementStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Top Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <div className="text-center">
                    <Typography variant="display-primary" className="mb-2">
                        Announcement
                    </Typography>
                    <Typography variant="body-primary-regular">
                        This is an important announcement that slides in from the top.
                    </Typography>
                </div>
            </Drawer>
        </div>
    );
};

// Top Placement
export const TopPlacement: Story = {
    render: (args) => <TopPlacementStory {...args} />,
    args: {
        title: 'Notification',
        placement: 'top',
        height: 200,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const BottomPlacementStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Bottom Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="display-primary" className="mb-4">
                    Quick Actions
                </Typography>
                <div className="grid grid-cols-3 gap-3">
                    {['Action 1', 'Action 2', 'Action 3', 'Action 4', 'Action 5', 'Action 6'].map((action) => (
                        <Button key={action} variant="secondary" className="w-full">
                            {action}
                        </Button>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

// Bottom Placement
export const BottomPlacement: Story = {
    render: (args) => <BottomPlacementStory {...args} />,
    args: {
        title: 'Actions',
        placement: 'bottom',
        height: 300,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const LargeDrawerStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Large Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="display-primary" className="mb-4">
                    Detailed Information
                </Typography>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((section) => (
                        <div key={section}>
                            <Typography variant="body-primary-semibold" className="mb-2">
                                Section {section}
                            </Typography>
                            <Typography variant="body-secondary-regular">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris.
                            </Typography>
                        </div>
                    ))}
                </div>
            </Drawer>
        </div>
    );
};

// Large Drawer
export const LargeDrawer: Story = {
    render: (args) => <LargeDrawerStory {...args} />,
    args: {
        title: 'Details',
        placement: 'right',
        width: 600,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const NoTitleStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Drawer (No Title)
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="body-primary-regular">
                    This drawer has no title, only a close button.
                </Typography>
            </Drawer>
        </div>
    );
};

// No Title
export const NoTitle: Story = {
    render: (args) => <NoTitleStory {...args} />,
    args: {
        placement: 'right',
        width: 400,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};

const NotClosableStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Open Non-Closable Drawer
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <Typography variant="body-primary-regular" className="mb-4">
                    This drawer cannot be closed by clicking the mask or pressing ESC.
                    You must use the button below.
                </Typography>
                <Button variant="primary" onClick={() => setOpen(false)}>
                    Close Drawer
                </Button>
            </Drawer>
        </div>
    );
};

// Not Closable
export const NotClosable: Story = {
    render: (args) => <NotClosableStory {...args} />,
    args: {
        title: 'Important',
        placement: 'right',
        width: 400,
        closable: false,
        maskClosable: false,
        showFigmaBadge: true,
    },
};

const FormExampleStory = (args: React.ComponentProps<typeof Drawer>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button variant="primary" onClick={() => setOpen(true)}>
                Create New Item
            </Button>
            <Drawer {...args} open={open} onClose={() => setOpen(false)}>
                <div className="space-y-4">
                    <div>
                        <Typography variant="body-secondary-medium" className="mb-2">
                            Name
                        </Typography>
                        <Input placeholder="Enter name" />
                    </div>
                    <div>
                        <Typography variant="body-secondary-medium" className="mb-2">
                            Email
                        </Typography>
                        <Input type="email" placeholder="Enter email" />
                    </div>
                    <div>
                        <Typography variant="body-secondary-medium" className="mb-2">
                            Description
                        </Typography>
                        <Input placeholder="Enter description" />
                    </div>
                    <div className="flex gap-2 pt-4">
                        <Button variant="primary" className="flex-1">
                            Create
                        </Button>
                        <Button variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

// Form Example
export const FormExample: Story = {
    render: (args) => <FormExampleStory {...args} />,
    args: {
        title: 'Create New Item',
        placement: 'right',
        width: 450,
        closable: true,
        maskClosable: true,
        showFigmaBadge: true,
    },
};
