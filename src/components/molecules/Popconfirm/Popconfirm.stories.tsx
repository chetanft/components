import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Popconfirm } from './Popconfirm';
import { PopconfirmTrigger } from './PopconfirmTrigger';
import { PopconfirmContent } from './PopconfirmContent';
import { PopconfirmTitle } from './PopconfirmTitle';
import { PopconfirmDescription } from './PopconfirmDescription';
import { PopconfirmActions } from './PopconfirmActions';
import { PopconfirmIcon } from './PopconfirmIcon';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Popconfirm> = {
    title: 'Molecules/Popconfirm',
    component: Popconfirm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A confirmation popover component that requires user confirmation before proceeding with an action. Supports composable API with PopconfirmTrigger, PopconfirmContent, PopconfirmTitle, PopconfirmDescription, PopconfirmActions, and PopconfirmIcon sub-components.',
            },
        },
        explorer: {
            mode: 'matrix' as const,
            baseStory: 'ExplorerBase',
            behavior: 'anchored' as const,
            previewMode: 'inline' as const,
            rows: [
                {
                    id: 'type',
                    label: 'Type',
                    scenarios: [
                        { id: 'default', label: 'Default', story: 'ExplorerBase', args: { confirmType: 'default' } },
                        { id: 'with-icon', label: 'Icon', story: 'ExplorerBase', args: { withIcon: true, triggerLabel: 'Click me' } },
                    ],
                },
                {
                    id: 'placement',
                    label: 'Placement',
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
                        { id: 'danger', label: 'Danger', story: 'ExplorerBase', args: { confirmType: 'danger', withIcon: true, triggerLabel: 'Danger Confirm' } },
                        { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { confirmType: 'warning', triggerLabel: 'Warning Confirm' } },
                        { id: 'disabled-trigger', label: 'Disabled', story: 'ExplorerBase', args: { disabledTrigger: true, triggerLabel: 'Disabled Trigger' } },
                    ],
                },
            ],
            defaultRowId: 'type',
            defaultScenarioId: 'default',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        onConfirm: { action: 'confirmed' },
        onCancel: { action: 'cancelled' },
    },
};

export default meta;
type Story = StoryObj<typeof Popconfirm>;

export const ExplorerBase: Story = {
    render: (args: any) => (
        <Popconfirm placement={args.placement ?? 'top'}>
            <PopconfirmTrigger>
                <Button
                    variant={args.confirmType === 'danger' ? 'destructive' : args.confirmType === 'warning' ? 'secondary' : 'primary'}
                    disabled={Boolean(args.disabledTrigger)}
                >
                    {args.triggerLabel ?? 'Delete'}
                </Button>
            </PopconfirmTrigger>
            <PopconfirmContent>
                {args.withIcon ? <PopconfirmIcon /> : null}
                <PopconfirmTitle>
                    {args.confirmType === 'warning' ? 'Discard changes?' : args.disabledTrigger ? 'Submit form?' : 'Delete this task?'}
                </PopconfirmTitle>
                <PopconfirmDescription>
                    {args.confirmType === 'warning'
                        ? 'Unsaved changes will be lost.'
                        : args.disabledTrigger
                          ? 'Please review your entries before submitting.'
                          : 'Are you sure to delete this task?'}
                </PopconfirmDescription>
                <PopconfirmActions />
            </PopconfirmContent>
        </Popconfirm>
    ),
};

export const Default: Story = {
    render: () => (
        <Popconfirm placement="top">
            <PopconfirmTrigger>
                <Button variant="destructive">Delete</Button>
            </PopconfirmTrigger>
            <PopconfirmContent>
                <PopconfirmTitle>Delete this task?</PopconfirmTitle>
                <PopconfirmDescription>Are you sure to delete this task?</PopconfirmDescription>
                <PopconfirmActions />
            </PopconfirmContent>
        </Popconfirm>
    ),
};

export const DocsWithIcon: Story = {
    render: () => (
        <Popconfirm placement="top">
            <PopconfirmTrigger>
                <Button>Click me</Button>
            </PopconfirmTrigger>
            <PopconfirmContent>
                <PopconfirmIcon />
                <PopconfirmTitle>Are you sure?</PopconfirmTitle>
                <PopconfirmDescription>This action cannot be undone.</PopconfirmDescription>
                <PopconfirmActions />
            </PopconfirmContent>
        </Popconfirm>
    ),

  parameters: { docsOnly: true },
}