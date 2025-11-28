import type { Meta, StoryObj } from '@storybook/react';
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
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationProvider>;

export default meta;
type Story = StoryObj<typeof NotificationProvider>;

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

export const Playground: Story = {
  render: () => <NotificationStory />,
};

export const AutoDismiss: Story = {
  render: () => (
    <NotificationProvider>
      <AutoDismissContent />
    </NotificationProvider>
  ),
};

const AutoDismissContent = () => {
  const { addNotification } = useNotification();

  return (
    <Button
      onClick={() =>
        addNotification({
          type: 'info',
          message: 'Auto dismiss notification',
          description: 'This notification will dismiss after 4.5 seconds.',
        })
      }
    >
      Trigger auto dismiss
    </Button>
  );
};
