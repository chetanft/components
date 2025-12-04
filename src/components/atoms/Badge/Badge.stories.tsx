import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Ribbon, BadgeIcon, BadgeText } from './index';

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

export function Sizes() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <Badge variant="normal" size="xs">XS - 0.714rem (10px)</Badge>
        <p className="text-sm text-muted-foreground">Font: 0.714rem (10px)</p>
      </div>
      <div className="flex flex-col gap-2">
        <Badge variant="normal" size="sm">SM - 0.857rem (12px)</Badge>
        <p className="text-sm text-muted-foreground">Font: 0.857rem (12px)</p>
      </div>
      <div className="flex flex-col gap-2">
        <Badge variant="normal" size="md">MD - 1rem (14px)</Badge>
        <p className="text-sm text-muted-foreground">Font: 1rem (14px)</p>
      </div>
      <div className="flex flex-col gap-2">
        <Badge variant="normal" size="lg">LG - 1.143rem (16px)</Badge>
        <p className="text-sm text-muted-foreground">Font: 1.143rem (16px)</p>
      </div>
    </div>
  );
}

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <BadgeIcon icon="check" />
        <BadgeText>Active</BadgeText>
      </Badge>
      <Badge variant="danger">
        <BadgeIcon icon="alert" />
        <BadgeText>Error</BadgeText>
      </Badge>
      <Badge variant="warning">
        <BadgeIcon icon="warning" />
        <BadgeText>Warning</BadgeText>
      </Badge>
      <Badge variant="neutral">
        <BadgeIcon icon="info" />
        <BadgeText>Info</BadgeText>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use BadgeIcon and BadgeText sub-components for flexible badge composition.',
      },
    },
  },
};

export const ComposableWithCustomIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <BadgeIcon icon="check" />
        <BadgeText>Verified</BadgeText>
      </Badge>
      <Badge variant="danger">
        <BadgeIcon icon="x" />
        <BadgeText>Rejected</BadgeText>
      </Badge>
      <Badge variant="normal">
        <BadgeText>No Icon</BadgeText>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Composable API allows flexible icon and text combinations.',
      },
    },
  },
};

export const ComposableTextOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <BadgeText>Success</BadgeText>
      </Badge>
      <Badge variant="danger">
        <BadgeText>Danger</BadgeText>
      </Badge>
      <Badge variant="warning">
        <BadgeText>Warning</BadgeText>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use BadgeText alone when you only need text content.',
      },
    },
  },
};
