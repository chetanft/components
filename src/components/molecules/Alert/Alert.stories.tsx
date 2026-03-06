import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertIcon } from './AlertIcon';
import { AlertTitle } from './AlertTitle';
import { AlertDescription } from './AlertDescription';
import { AlertAction } from './AlertAction';
import { AlertClose } from './AlertClose';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A composable alert component for displaying contextual feedback messages. Supports info, success, warning, and danger variants with optional actions and close buttons.',
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
      mode: 'both' as const,
      baseStory: 'ExplorerBase',
      behavior: 'top-overlay' as const,
      previewMode: 'positioned' as const,
      positionedPreview: {
        enabled: true,
        placement: 'top-right' as const,
        width: 520,
      },
      rows: [
        {
          id: 'type',
          label: 'Type',
          values: { type: 'variant' },
          scenarios: [
            { id: 'default', label: 'Default (Info)', story: 'ExplorerBase', args: { variant: 'info', title: 'Information', description: 'This is an informational alert.' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { variant: 'success', title: 'Success', description: 'This is a success alert.' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { variant: 'warning', title: 'Warning', description: 'This is a warning alert.' } },
            { id: 'danger', label: 'Danger', story: 'ExplorerBase', args: { variant: 'danger', title: 'Danger', description: 'This is a danger alert.' } },
          ],
        },
        {
          id: 'behavior',
          label: 'Behavior',
          scenarios: [
            { id: 'with-action', label: 'Action', story: 'ExplorerBase', args: { variant: 'success', title: 'Success', description: 'Your changes have been saved successfully.', withAction: true, actionLabel: 'View Details' } },
            { id: 'closable', label: 'Closable', story: 'ExplorerBase', args: { variant: 'warning', title: 'Warning', description: 'This alert can be dismissed.', closable: true } },
            { id: 'complete', label: 'Complete', story: 'ExplorerBase', args: { variant: 'danger', title: 'Error', description: 'Something went wrong. Please try again.', withAction: true, actionLabel: 'Retry', closable: true, actionVariant: 'destructive' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'dismissible', label: 'Dismissible', story: 'ExplorerBase', args: { variant: 'warning', title: 'Dismissible Warning', description: 'This alert can be dismissed.', closable: true } },
            { id: 'actionable', label: 'Actionable', story: 'ExplorerBase', args: { variant: 'danger', title: 'Error', description: 'An error occurred. Please try again.', withAction: true, closable: true, actionLabel: 'Retry', actionVariant: 'destructive' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      playground: {
        story: 'Default',
        controlsAllowlist: ['variant', 'radius'],
      },
    },
  },
  argTypes: {
    variant: {
        control: { type: 'select' },
        options: ['info', 'success', 'warning', 'danger'],
    },
    radius: {
        control: { type: 'select' },
        options: ['none', 'sm', 'md', 'lg'],
        description: 'Border radius of the alert',
    }
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const ExplorerBase: Story = {
    render: (args: any) => {
        const [open, setOpen] = React.useState(true);
        const variant = args.variant ?? 'info';
        const title = args.title ?? 'Information';
        const description = args.description ?? 'This is an informational alert.';
        const radius = args.radius ?? 'md';
        const syncKey = JSON.stringify({
            variant,
            title,
            description,
            radius,
            closable: Boolean(args.closable),
            withAction: Boolean(args.withAction),
            actionLabel: args.actionLabel ?? '',
            actionVariant: args.actionVariant ?? 'primary',
        });

        if (!open) {
            return (
                <div key={syncKey}>
                    <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
                        Show alert again
                    </Button>
                </div>
            );
        }

        return (
            <div key={syncKey}>
                <Alert variant={variant} radius={radius}>
                    <AlertIcon />
                    <AlertTitle>{title}</AlertTitle>
                    <AlertDescription>{description}</AlertDescription>
                    {args.withAction ? (
                        <AlertAction>
                            <Button size="sm" variant={args.actionVariant ?? 'primary'}>
                                {args.actionLabel ?? 'Action'}
                            </Button>
                        </AlertAction>
                    ) : null}
                    {args.closable ? <AlertClose onClose={() => setOpen(false)} /> : null}
                </Alert>
            </div>
        );
    },
};

// Composable API Examples (Recommended)
export const Default: Story = {
    render: () => (
        <Alert variant="info" radius="md">
            <AlertIcon />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>This is an info alert message using the composable API.</AlertDescription>
        </Alert>
    ),
};

export const WithAction: Story = {
    render: () => (
        <Alert variant="success" radius="md">
            <AlertIcon />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
            <AlertAction>
                <Button size="sm" variant="primary">View Details</Button>
            </AlertAction>
        </Alert>
    ),
};

export const Closable: Story = {
    render: () => {
        const [open, setOpen] = React.useState(true);
        if (!open) {
            return (
                <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
                    Show alert again
                </Button>
            );
        }

        return (
            <Alert variant="warning" radius="md">
                <AlertIcon />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>This alert can be dismissed.</AlertDescription>
                <AlertClose onClose={() => setOpen(false)} />
            </Alert>
        );
    },
};

export const DocsComplete: Story = {
    render: () => {
        const [open, setOpen] = React.useState(true);
        if (!open) {
            return (
                <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
                    Show alert again
                </Button>
            );
        }

        return (
            <Alert variant="danger" radius="md">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                <AlertAction>
                    <Button size="sm" variant="destructive">Retry</Button>
                </AlertAction>
                <AlertClose onClose={() => setOpen(false)} />
            </Alert>
        );
    },

  parameters: { docsOnly: true },
}