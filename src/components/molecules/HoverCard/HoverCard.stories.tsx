import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HoverCard } from './HoverCard';
import { HoverCardTrigger } from './HoverCardTrigger';
import { HoverCardContent } from './HoverCardContent';
import { Button } from '../../atoms/Button/Button';
import { Avatar } from '../../atoms/Avatar';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof HoverCard> = {
    title: 'Molecules/HoverCard',
    component: HoverCard,
    argTypes: {
        openDelay: {
            control: 'number',
            description: 'Delay in milliseconds before the card opens on hover.',
        },
        closeDelay: {
            control: 'number',
            description: 'Delay in milliseconds before the card closes when hover ends.',
        },
        width: {
            control: 'number',
            description: 'Width of the hover card content area.',
        },
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Placement of the card relative to the trigger.',
        },
        children: {
            control: false,
            description: 'Composable sub-components (HoverCardTrigger, HoverCardContent).',
        },
    },
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A hover-triggered card component for displaying supplementary content. Supports composable API with HoverCardTrigger and HoverCardContent sub-components.',
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
            behavior: 'anchored' as const,
            previewMode: 'inline' as const,
            baseStory: 'ExplorerBase',
            rows: [
                {
                    id: 'content',
                    label: 'Content',
                    scenarios: [
                        { id: 'default', label: 'User Card', story: 'ExplorerBase', args: { contentType: 'user-card' } },
                    ],
                },
                {
                    id: 'placement',
                    label: 'Behavior',
                    scenarios: [
                        { id: 'top', label: 'Top', story: 'ExplorerBase', args: { placement: 'top' } },
                        { id: 'bottom', label: 'Bottom', story: 'ExplorerBase', args: { placement: 'bottom' } },
                        { id: 'left', label: 'Left', story: 'ExplorerBase', args: { placement: 'left' } },
                        { id: 'right', label: 'Right', story: 'ExplorerBase', args: { placement: 'right' } },
                    ],
                },
                {
                    id: 'state',
                    label: 'State',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
                        { id: 'disabled-trigger', label: 'Disabled Trigger', story: 'ExplorerBase', args: { contentType: 'disabled' } },
                    ],
                },
            ],
            defaultRowId: 'content',
            defaultScenarioId: 'default',
            supportsGlass: true,
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const ExplorerBase: Story = {
    render: (args: any) => {
        const contentType = args.contentType ?? 'user-card';
        const placement = args.placement ?? 'top';
        const syncKey = JSON.stringify({ contentType, placement, glass: args.glass });
        return (
            <div key={syncKey} className="p-8">
                {contentType === 'disabled' ? (
                    <HoverCard placement={placement}>
                        <HoverCardTrigger>
                            <Button variant="link" disabled>Disabled trigger</Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <div className="p-2">
                                <Typography variant="body-primary-regular">Simple text content</Typography>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                ) : (
                    <HoverCard placement={placement}>
                        <HoverCardTrigger>
                            <Button variant="link">@johndoe</Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
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
                                <div className="flex gap-4 text-[var(--secondary)]">
                                    <div className="flex items-center gap-1">
                                        <Icon name="calendar" size={14} />
                                        <Typography variant="body-secondary-regular">Joined Dec 2023</Typography>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                )}
            </div>
        );
    },
};

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
        <div className="flex gap-4 text-[var(--secondary)]">
            <div className="flex items-center gap-1">
                <Icon name="calendar" size={14} />
                <Typography variant="body-secondary-regular">Joined Dec 2023</Typography>
            </div>
        </div>
    </div>
);

export const Default: Story = {
    render: () => (
        <HoverCard>
            <HoverCardTrigger>
                <Button variant="link">@johndoe</Button>
            </HoverCardTrigger>
            <HoverCardContent>
                <UserCard />
            </HoverCardContent>
        </HoverCard>
    ),
    parameters: {
        docs: {
            source: {
                code: `<HoverCard>
  <HoverCardTrigger>
    <Button variant="link">@johndoe</Button>
  </HoverCardTrigger>
  <HoverCardContent>
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
      <div className="flex gap-4 text-[var(--secondary)]">
        <div className="flex items-center gap-1">
          <Icon name="calendar" size={14} />
          <Typography variant="body-secondary-regular">Joined Dec 2023</Typography>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
                language: 'tsx',
                type: 'code',
            },
        },
    },
};

export const DocsVariants: Story = {
    render: () => (
        <div className="flex gap-8 items-center justify-center h-64">
            <HoverCard placement="top"><HoverCardTrigger><Button variant="link">Top</Button></HoverCardTrigger><HoverCardContent><div className="p-2">Top placement</div></HoverCardContent></HoverCard>
            <HoverCard placement="bottom"><HoverCardTrigger><Button variant="link">Bottom</Button></HoverCardTrigger><HoverCardContent><div className="p-2">Bottom placement</div></HoverCardContent></HoverCard>
            <HoverCard placement="left"><HoverCardTrigger><Button variant="link">Left</Button></HoverCardTrigger><HoverCardContent><div className="p-2">Left placement</div></HoverCardContent></HoverCard>
            <HoverCard placement="right"><HoverCardTrigger><Button variant="link">Right</Button></HoverCardTrigger><HoverCardContent><div className="p-2">Right placement</div></HoverCardContent></HoverCard>
        </div>
    ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<div className="flex gap-8 items-center justify-center h-64">
  <HoverCard placement="top">
    <HoverCardTrigger><Button variant="link">Top</Button></HoverCardTrigger>
    <HoverCardContent><div className="p-2">Top placement</div></HoverCardContent>
  </HoverCard>
  <HoverCard placement="bottom">
    <HoverCardTrigger><Button variant="link">Bottom</Button></HoverCardTrigger>
    <HoverCardContent><div className="p-2">Bottom placement</div></HoverCardContent>
  </HoverCard>
  <HoverCard placement="left">
    <HoverCardTrigger><Button variant="link">Left</Button></HoverCardTrigger>
    <HoverCardContent><div className="p-2">Left placement</div></HoverCardContent>
  </HoverCard>
  <HoverCard placement="right">
    <HoverCardTrigger><Button variant="link">Right</Button></HoverCardTrigger>
    <HoverCardContent><div className="p-2">Right placement</div></HoverCardContent>
  </HoverCard>
</div>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}