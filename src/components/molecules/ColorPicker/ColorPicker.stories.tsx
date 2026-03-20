import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ColorPicker } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled color value (hex string).',
    },
    defaultValue: {
      control: 'text',
      description: 'Default color value when uncontrolled.',
    },
    defaultFormat: {
      control: 'select',
      options: ['hex', 'rgb', 'hsb'],
      description: 'Display format for the color value.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the color picker is disabled.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the color picker trigger.',
    },
    presets: {
      control: 'object',
      description: 'Custom color presets displayed in the picker grid.',
    },
    glass: {
      control: 'select',
      options: ['none', 'frost', 'subtle', 'medium', 'heavy'],
      description: 'Glass morphism variant.',
    },
    onChange: {
      control: false,
      description: 'Callback fired when a color is selected.',
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Color picker component for selecting colors with preset palettes. Text display is always enabled.',
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
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker defaultValue="#1677ff" />`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
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

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<div className="flex flex-col gap-6">
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
</div>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}