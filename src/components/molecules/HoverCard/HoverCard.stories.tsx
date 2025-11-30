import type { Meta, StoryObj } from '@storybook/react';
import { HoverCard } from './HoverCard';
import { Button } from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof HoverCard> = {
    title: 'Molecules/HoverCard',
    component: HoverCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

const UserCard = () => (
    <div className="flex flex-col gap-4">
        <div className="flex gap-4">
            <Avatar size="md" />
            <div className="flex flex-col">
                <Typography variant="body-primary-semibold">John Doe</Typography>
                <Typography variant="body-secondary-regular">@johndoe</Typography>
            </div>
        </div>
        <Typography variant="body-primary-regular">
            Software Engineer at FT. Passionate about UI/UX and Design Systems.
        </Typography>
        <div className="flex gap-4 text-[var(--color-secondary)]">
            <div className="flex items-center gap-1">
                <Icon name="calendar" size={14} />
                <Typography variant="body-secondary-regular">Joined Dec 2023</Typography>
            </div>
        </div>
    </div>
);

export const Default: Story = {
    args: {
        children: <Button variant="link">@johndoe</Button>,
        content: <UserCard />,
    },
};

export const Placement: Story = {
    render: (args) => (
        <div className="flex gap-8 items-center justify-center h-64">
            <HoverCard {...args} placement="top" content={<div className="p-2">Top Content</div>}>
                <Button>Top</Button>
            </HoverCard>
            <HoverCard {...args} placement="bottom" content={<div className="p-2">Bottom Content</div>}>
                <Button>Bottom</Button>
            </HoverCard>
            <HoverCard {...args} placement="left" content={<div className="p-2">Left Content</div>}>
                <Button>Left</Button>
            </HoverCard>
            <HoverCard {...args} placement="right" content={<div className="p-2">Right Content</div>}>
                <Button>Right</Button>
            </HoverCard>
        </div>
    ),
};
