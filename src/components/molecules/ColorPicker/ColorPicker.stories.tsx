import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Color picker component for selecting colors with preset palettes. Text display is always enabled.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'variants', label: 'With Presets', story: 'ExplorerBase', args: { contentType: 'presets' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { disabled: false } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const disabled = Boolean(args.disabled);
    const syncKey = JSON.stringify({ contentType, disabled });
    return (
      <div key={syncKey}>
        {contentType === 'presets' ? (
          <ColorPicker
            defaultValue="#42bdbd"
            disabled={disabled}
            presets={['#42bdbd', '#0828f7', '#1793e8', '#ff0036', '#ffbe07', '#000000', '#ffffff']}
          />
        ) : (
          <ColorPicker defaultValue="#1677ff" disabled={disabled} />
        )}
      </div>
    );
  },
};

export const Default: Story = {
  render: () => <ColorPicker defaultValue="#1677ff" />,
};

export const DocsVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-32 text-sm text-[var(--tertiary)]">Default</span>
        <ColorPicker defaultValue="#1677ff" />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-32 text-sm text-[var(--tertiary)]">Custom Presets</span>
        <ColorPicker
          defaultValue="#42bdbd"
          presets={[
            '#42bdbd',
            '#0828f7',
            '#1793e8',
            '#ff0036',
            '#ffbe07',
            '#000000',
            '#ffffff',
          ]}
        />
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}