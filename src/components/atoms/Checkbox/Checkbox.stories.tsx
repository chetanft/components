import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxInput, CheckboxLabel, CheckboxHelper, CheckboxError } from './index';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible checkbox component with support for labels, descriptions, error states, and indeterminate state.',
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { label: 'Accept terms and conditions' } },
            { id: 'helper', label: 'Helper Text', story: 'ExplorerBase', args: { label: 'Newsletter subscription', helperText: 'Receive weekly updates about new features and products' } },
            { id: 'indeterminate', label: 'Indeterminate', story: 'ExplorerBase', args: { label: 'Select all items', indeterminate: true } },
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
            { id: 'unchecked', label: 'Unchecked', story: 'ExplorerBase', args: { checked: false, disabled: false } },
            { id: 'checked', label: 'Checked', story: 'ExplorerBase', args: { checked: true, disabled: false } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { errorText: 'This field is required' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'content',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size of the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state'
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const [checked, setChecked] = React.useState(Boolean(args.checked));
    const syncKey = JSON.stringify({
      checked: Boolean(args.checked),
      disabled: Boolean(args.disabled),
      indeterminate: Boolean(args.indeterminate),
      size: args.size ?? 'md',
      label: args.label ?? '',
      helperText: args.helperText ?? '',
      errorText: args.errorText ?? '',
    });

    return (
      <div key={syncKey}>
        <Checkbox size={args.size ?? 'md'} disabled={Boolean(args.disabled)}>
          <CheckboxInput
            checked={checked}
            disabled={Boolean(args.disabled)}
            indeterminate={Boolean(args.indeterminate)}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
          <CheckboxLabel>{args.label ?? 'Accept terms and conditions'}</CheckboxLabel>
          {args.helperText ? <CheckboxHelper>{args.helperText}</CheckboxHelper> : null}
          {args.errorText ? <CheckboxError>{args.errorText}</CheckboxError> : null}
        </Checkbox>
      </div>
    );
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md">
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
    </Checkbox>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithHelperComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md">
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Newsletter subscription</CheckboxLabel>
      <CheckboxHelper>Receive weekly updates about new features and products</CheckboxHelper>
    </Checkbox>
  );
}

export const WithHelper: Story = {
  render: () => <ComposableWithHelperComponent />,
};

function ComposableWithErrorComponent() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox size="md">
      <CheckboxInput checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <CheckboxLabel>Required field</CheckboxLabel>
      <CheckboxError>This field must be checked to continue</CheckboxError>
    </Checkbox>
  );
}

export const WithError: Story = {
  render: () => <ComposableWithErrorComponent />,
};

function ComposableIndeterminateComponent() {
  const [checked, setChecked] = React.useState(false);
  const [indeterminate, setIndeterminate] = React.useState(true);
  return (
    <Checkbox size="md">
      <CheckboxInput
        checked={checked}
        indeterminate={indeterminate}
        onChange={(e) => {
          setChecked(e.target.checked);
          setIndeterminate(false);
        }}
      />
      <CheckboxLabel>Select all items</CheckboxLabel>
    </Checkbox>
  );
}

export const Indeterminate: Story = {
  render: () => <ComposableIndeterminateComponent />,
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-3 p-4">
      <Checkbox size="md">
        <CheckboxInput />
        <CheckboxLabel>Default unchecked</CheckboxLabel>
      </Checkbox>
      <Checkbox size="md">
        <CheckboxInput defaultChecked />
        <CheckboxLabel>Checked</CheckboxLabel>
      </Checkbox>
      <Checkbox size="md">
        <CheckboxInput indeterminate />
        <CheckboxLabel>Indeterminate</CheckboxLabel>
      </Checkbox>
      <Checkbox size="md">
        <CheckboxInput defaultChecked />
        <CheckboxLabel>With helper</CheckboxLabel>
        <CheckboxHelper>Additional context for this option</CheckboxHelper>
      </Checkbox>
    </div>
  ),

  parameters: { docsOnly: true },
}