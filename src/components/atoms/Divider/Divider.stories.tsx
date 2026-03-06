import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { type: 'primary', dashed: false, direction: 'horizontal', withLabel: false } },
            { id: 'dashed', label: 'Dashed', story: 'ExplorerBase', args: { dashed: true, direction: 'horizontal', withLabel: false } },
            { id: 'vertical', label: 'Vertical', story: 'ExplorerBase', args: { direction: 'vertical', withLabel: false } },
            { id: 'with-label', label: 'With Label', story: 'ExplorerBase', args: { type: 'with-label', withLabel: true } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'primary', label: 'Primary', story: 'ExplorerBase', args: { type: 'primary' } },
            { id: 'secondary', label: 'Secondary', story: 'ExplorerBase', args: { type: 'secondary' } },
            { id: 'tertiary', label: 'Tertiary', story: 'ExplorerBase', args: { type: 'tertiary' } },
          ],
        },
      ],
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'with-label'],
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    dashed: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    if (args.direction === 'vertical') {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Text
          <Divider direction="vertical" />
          Link
          <Divider direction="vertical" />
          Action
        </div>
      );
    }
    return (
      <div className="space-y-4 w-full">
        <div className="text-sm text-[var(--primary)]">Content above divider</div>
        <Divider
          type={args.withLabel ? 'with-label' : (args.type ?? 'primary')}
          dashed={Boolean(args.dashed)}
          label={args.withLabel ? 'Label' : undefined}
        />
        <div className="text-sm text-[var(--primary)]">Content below divider</div>
      </div>
    );
  },
};

export const Default: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <div className="text-sm text-[var(--primary)]">Content above divider</div>
      <Divider type="primary" />
      <div className="text-sm text-[var(--primary)]">Content below divider</div>
    </div>
  ),
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <div>
        <p className="text-sm font-medium mb-2">Primary</p>
        <Divider type="primary" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Secondary</p>
        <Divider type="secondary" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Tertiary</p>
        <Divider type="tertiary" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">With Label</p>
        <Divider type="with-label" label="Label" />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Dashed</p>
        <Divider dashed />
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Vertical</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Text<Divider direction="vertical" />Link<Divider direction="vertical" />Action
        </div>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}