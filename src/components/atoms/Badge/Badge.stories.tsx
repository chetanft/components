import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Ribbon } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['normal', 'danger', 'success', 'warning', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'normal',
  },
};

export const Normal: Story = {
  args: {
    children: 'Normal',
    variant: 'normal',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Neutral',
    variant: 'neutral',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="normal">Normal</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
};

export const NotificationDot: Story = {
    render: () => (
        <Badge dot>
            <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
        </Badge>
    )
};

export const NotificationCount: Story = {
    render: () => (
        <div className="flex gap-4">
            <Badge count={5}>
                <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
            </Badge>
            <Badge count={99} overflowCount={10}>
                <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
            </Badge>
        </div>
    )
};

export const Status: Story = {
    render: () => (
        <div className="flex flex-col gap-2">
            <Badge status="success" text="Success" />
            <Badge status="error" text="Error" />
            <Badge status="default" text="Default" />
            <Badge status="processing" text="Processing" />
            <Badge status="warning" text="Warning" />
        </div>
    )
};

export const WithRibbon: Story = {
    render: () => (
        <Ribbon text="Hippies">
            <div style={{ width: 300, height: 100, border: '1px solid #eee', padding: 10 }}>
                Card content
            </div>
        </Ribbon>
    )
};
