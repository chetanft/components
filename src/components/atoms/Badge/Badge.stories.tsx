import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeIcon, BadgeText } from './index';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A badge component for status indicators, labels, and counts. Supports composable sub-components for flexible content.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { explorerContent: 'default' } },
            { id: 'composed', label: 'Composed', story: 'ExplorerBase', args: { explorerContent: 'composed' } },
            { id: 'text-only', label: 'Text Only', story: 'ExplorerBase', args: { explorerContent: 'text-only' } },
            { id: 'custom-icon', label: 'Custom Icon', story: 'ExplorerBase', args: { explorerContent: 'with-custom-icon' } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { variant: 'default' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { variant: 'success' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { variant: 'error' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { variant: 'warning' } },
            { id: 'info', label: 'Info', story: 'ExplorerBase', args: { variant: 'info' } },
            { id: 'neutral', label: 'Neutral', story: 'ExplorerBase', args: { variant: 'neutral' } },
            { id: 'danger', label: 'Danger', story: 'ExplorerBase', args: { variant: 'danger' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'xs', label: 'XS', story: 'ExplorerBase', args: { size: 'xs' } },
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'warning', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

type BadgeExplorerContent = 'default' | 'composed' | 'text-only' | 'with-custom-icon';

export const ExplorerBase: Story = {
  args: {
    variant: 'success',
    size: 'md',
    explorerContent: 'default' as BadgeExplorerContent,
  } as any,
  render: (args: any) => {
    const content = (args.explorerContent ?? 'default') as BadgeExplorerContent;
    const size = (args.size ?? 'md') as 'xs' | 'sm' | 'md' | 'lg';
    const variant = (args.variant ?? 'success') as any;

    if (content === 'text-only') {
      return (
        <Badge variant={variant} size={size} glass={args.glass}>
          <BadgeText>Badge</BadgeText>
        </Badge>
      );
    }

    if (content === 'with-custom-icon') {
      return (
        <Badge variant={variant} size={size} glass={args.glass}>
          <BadgeIcon icon="shield" />
          <BadgeText>Verified</BadgeText>
        </Badge>
      );
    }

    if (content === 'composed') {
      return (
        <Badge variant={variant} size={size} glass={args.glass}>
          <BadgeIcon icon="check" />
          <BadgeText>Verified</BadgeText>
        </Badge>
      );
    }

    return (
      <Badge variant={variant} size={size} glass={args.glass}>
        <BadgeText>Default</BadgeText>
      </Badge>
    );
  },
};

// Composable API Examples (Recommended)
export const Default: Story = {
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

export const DocsVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="success">
        <BadgeText>Success</BadgeText>
      </Badge>
      <Badge variant="danger">
        <BadgeText>Error</BadgeText>
      </Badge>
      <Badge variant="warning">
        <BadgeText>Warning</BadgeText>
      </Badge>
      <Badge variant="neutral">
        <BadgeText>Neutral</BadgeText>
      </Badge>
      <Badge variant="normal">
        <BadgeText>Default</BadgeText>
      </Badge>
    </div>
  ),

  parameters: { docsOnly: true },
}