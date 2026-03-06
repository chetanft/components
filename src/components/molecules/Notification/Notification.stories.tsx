import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NotificationProvider, useNotification } from './Notification';
import { Button } from '../../atoms/Button/Button';

const meta = {
  title: 'Molecules/Notification',
  component: NotificationProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'NotificationProvider renders toast-style alerts and exposes hooks for adding contextual notifications.',
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
      baseStory: 'ExplorerBase',
      behavior: 'top-overlay' as const,
      previewMode: 'positioned' as const,
      positionedPreview: {
        enabled: true,
        placement: 'top-right' as const,
        width: 400,
      },
      rows: [
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Interactive Demo', story: 'ExplorerBase', args: { mode: 'interactive' } },
          ],
        },
        {
          id: 'variants',
          label: 'Type',
          scenarios: [
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { mode: 'single', type: 'success' } },
            { id: 'info', label: 'Info', story: 'ExplorerBase', args: { mode: 'single', type: 'info' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { mode: 'single', type: 'warning' } },
            { id: 'danger', label: 'Danger', story: 'ExplorerBase', args: { mode: 'single', type: 'danger' } },
          ],
        },
        {
          id: 'behavior',
          label: 'Behavior',
          scenarios: [
            { id: 'closable', label: 'Closable', story: 'ExplorerBase', args: { mode: 'single', type: 'info', closable: true } },
            { id: 'with-icon', label: 'With Icon', story: 'ExplorerBase', args: { mode: 'single', type: 'warning', icon: 'triangle-alert', closable: true } },
            { id: 'auto-dismiss', label: 'Auto Dismiss', story: 'ExplorerBase', args: { mode: 'auto-dismiss', type: 'info' } },
          ],
        },
      ],
      defaultRowId: 'default',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationProvider>;

export default meta;
type Story = StoryObj<typeof NotificationProvider>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const mode = args.mode ?? 'interactive';
    const type = args.type ?? 'info';
    const closable = Boolean(args.closable);
    const icon = args.icon;

    const Interactive = () => {
      const { addNotification, clearAll } = useNotification();
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => addNotification({ type: 'success', message: 'Success notification', description: 'Notifications support optional descriptions and icons.' })}>Success</Button>
            <Button variant="secondary" onClick={() => addNotification({ type: 'info', message: 'Info notification' })}>Info</Button>
            <Button variant="secondary" onClick={() => addNotification({ type: 'warning', message: 'Warning notification' })}>Warning</Button>
            <Button variant="destructive" onClick={() => addNotification({ type: 'danger', message: 'Danger notification', closable: true })}>Danger</Button>
          </div>
          <Button variant="ghost" onClick={clearAll}>Clear Notifications</Button>
        </div>
      );
    };

    const Single = () => {
      const { addNotification } = useNotification();
      React.useEffect(() => {
        addNotification({
          type,
          message: `${type[0].toUpperCase()}${type.slice(1)} notification`,
          description: mode === 'auto-dismiss' ? 'This notification will dismiss after 4.5 seconds.' : `This is a ${type} notification example.`,
          closable,
          icon,
        });
      }, [addNotification, type, closable, icon, mode]);
      return mode === 'auto-dismiss' ? (
        <Button
          onClick={() =>
            addNotification({
              type,
              message: `${type[0].toUpperCase()}${type.slice(1)} notification`,
              description: 'This notification will dismiss after 4.5 seconds.',
            })
          }
        >
          Trigger auto dismiss
        </Button>
      ) : <div className="h-20" />;
    };

    return (
      <NotificationProvider>
        {mode === 'interactive' ? <Interactive /> : <Single />}
      </NotificationProvider>
    );
  },
};

const NotificationDemo = () => {
  const { addNotification, clearAll } = useNotification();

  const triggerNotification = (
    type: 'success' | 'info' | 'warning' | 'danger',
    closable?: boolean
  ) => {
    addNotification({
      type,
      message: `${type[0].toUpperCase()}${type.slice(1)} notification`,
      description: 'Notifications support optional descriptions and icons.',
      icon: type === 'info' ? 'alert-informational' : type === 'success' ? 'success' : 'triangle-alert',
      closable,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => triggerNotification('success')}>Success</Button>
        <Button variant="secondary" onClick={() => triggerNotification('info')}>
          Info
        </Button>
        <Button variant="secondary" onClick={() => triggerNotification('warning')}>
          Warning
        </Button>
        <Button variant="destructive" onClick={() => triggerNotification('danger', true)}>
          Danger (Closable)
        </Button>
      </div>
      <Button variant="ghost" onClick={clearAll}>
        Clear Notifications
      </Button>
    </div>
  );
};

const NotificationStory = () => (
  <NotificationProvider>
    <NotificationDemo />
  </NotificationProvider>
);

export const Default: Story = {
  render: () => <NotificationStory />,
};

/** All notification type variants displayed together. */
export const DocsVariants: Story = {
  render: () => {
    const VariantsContent = () => {
      const { addNotification } = useNotification();

      React.useEffect(() => {
        (['success', 'info', 'warning', 'danger'] as const).forEach((type) => {
          addNotification({
            type,
            message: `${type[0].toUpperCase()}${type.slice(1)} notification`,
            description: `This is a ${type} notification example.`,
            closable: true,
          });
        });
      }, []);

      return (
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => addNotification({ type: 'success', message: 'Success', closable: true })}>
            Success
          </Button>
          <Button variant="secondary" onClick={() => addNotification({ type: 'info', message: 'Info', closable: true })}>
            Info
          </Button>
          <Button variant="secondary" onClick={() => addNotification({ type: 'warning', message: 'Warning', closable: true })}>
            Warning
          </Button>
          <Button variant="destructive" onClick={() => addNotification({ type: 'danger', message: 'Danger', closable: true })}>
            Danger
          </Button>
        </div>
      );
    };

    return (
      <NotificationProvider>
        <VariantsContent />
      </NotificationProvider>
    );
  },

  parameters: { docsOnly: true },
}