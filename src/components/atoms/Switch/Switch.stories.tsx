import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Switch, SwitchInput, SwitchLabel, SwitchHelper, SwitchError } from './index';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component with exact Figma specifications. Supports different sizes and states.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'with-helper', label: 'Helper Text', story: 'ExplorerBase', args: { contentType: 'helper' } },
            { id: 'icon-only', label: 'Icon Only', story: 'ExplorerBase', args: { contentType: 'icon-only' } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'off', label: 'Off', story: 'ExplorerBase', args: { checked: false, disabled: false, errorText: undefined } },
            { id: 'on', label: 'On', story: 'ExplorerBase', args: { checked: true, disabled: false, errorText: undefined } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { errorText: 'This setting is required' } },
          ],
        },
      ],
      defaultRowId: 'content',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the switch'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [checked, setChecked] = React.useState(Boolean(args.checked));
    const size = args.size ?? 'md';
    const disabled = Boolean(args.disabled);
    const contentType = args.contentType ?? 'default';
    const errorText = args.errorText;
    const syncKey = JSON.stringify({ size, disabled, checked: Boolean(args.checked), contentType, errorText });

    return (
      <div key={syncKey}>
        <Switch size={size} disabled={disabled}>
          <SwitchInput checked={checked} disabled={disabled} onChange={(e) => setChecked(e.target.checked)} />
          {contentType !== 'icon-only' ? <SwitchLabel>{contentType === 'helper' ? 'Notifications' : 'Enable notifications'}</SwitchLabel> : null}
          {contentType === 'helper' ? <SwitchHelper>Receive system alerts</SwitchHelper> : null}
          {errorText ? <SwitchError>{errorText}</SwitchError> : null}
        </Switch>
      </div>
    );
  },
};

function DefaultComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Switch size="md">
      <SwitchInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <SwitchLabel>Enable notifications</SwitchLabel>
    </Switch>
  );
}

export const Default: Story = {
  render: () => <DefaultComponent />,
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <Switch size="md">
        <SwitchInput />
        <SwitchLabel>Basic switch</SwitchLabel>
      </Switch>
      <Switch size="md">
        <SwitchInput defaultChecked />
        <SwitchLabel>With helper text</SwitchLabel>
        <SwitchHelper>Additional context for this setting</SwitchHelper>
      </Switch>
      <Switch size="md">
        <SwitchInput />
      </Switch>
    </div>
  ),

  parameters: { docsOnly: true },
}