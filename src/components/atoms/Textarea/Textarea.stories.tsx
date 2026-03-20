import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea, TextareaLabel, TextareaField, TextareaHelper, TextareaError } from './index';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A textarea component using composable API with TextareaLabel, TextareaField, TextareaHelper, and TextareaError sub-components.',
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
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'xxs', label: 'XXS', story: 'ExplorerBase', args: { size: 'xxs' } },
            { id: 'xs', label: 'XS', story: 'ExplorerBase', args: { size: 'xs' } },
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'xxl', label: 'XXL', story: 'ExplorerBase', args: { size: 'xxl' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { textareaState: 'default' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { textareaState: 'error' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { textareaState: 'disabled' } },
          ],
        },
      ],
      defaultRowId: 'size',
      defaultScenarioId: 'md',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the textarea'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled'
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const size = args.size ?? 'md';
    const textareaState = args.textareaState ?? 'default';
    const disabled = textareaState === 'disabled';

    return (
      <Textarea size={size} disabled={disabled}>
        <TextareaLabel>
          {textareaState === 'error' ? 'Textarea with error' : disabled ? 'Disabled textarea' : 'Description'}
        </TextareaLabel>
        <TextareaField
          placeholder={disabled ? 'Cannot type here' : `Textarea ${String(size).toUpperCase()}`}
          rows={4}
          disabled={disabled}
        />
        {textareaState === 'error' ? <TextareaError>This field has an error</TextareaError> : null}
        {textareaState === 'default' && args.helperText ? <TextareaHelper>{args.helperText}</TextareaHelper> : null}
      </Textarea>
    );
  },
};

// Default textarea using composable API
export const Default: Story = {
  render: () => (
    <Textarea size="md">
      <TextareaLabel>Description</TextareaLabel>
      <TextareaField placeholder="Enter your description here..." rows={4} />
    </Textarea>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Textarea size="md">
  <TextareaLabel>Description</TextareaLabel>
  <TextareaField placeholder="Enter your description here..." rows={4} />
</Textarea>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsStates: Story = {
  render: () => (
    <div className="p-6 space-y-4" style={{ maxWidth: 400 }}>
      <Textarea size="md">
        <TextareaLabel>Default</TextareaLabel>
        <TextareaField placeholder="Type here..." />
      </Textarea>
      <Textarea size="md">
        <TextareaLabel>With helper</TextareaLabel>
        <TextareaField placeholder="Type here..." />
        <TextareaHelper>Helper text</TextareaHelper>
      </Textarea>
      <Textarea size="md">
        <TextareaLabel>Error</TextareaLabel>
        <TextareaField placeholder="Type here..." />
        <TextareaError>This field has an error</TextareaError>
      </Textarea>
      <Textarea size="md" disabled>
        <TextareaLabel>Disabled</TextareaLabel>
        <TextareaField placeholder="Cannot type here" disabled />
      </Textarea>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Textarea size="md">
  <TextareaLabel>Default</TextareaLabel>
  <TextareaField placeholder="Type here..." />
</Textarea>

<Textarea size="md">
  <TextareaLabel>With helper</TextareaLabel>
  <TextareaField placeholder="Type here..." />
  <TextareaHelper>Helper text</TextareaHelper>
</Textarea>

<Textarea size="md">
  <TextareaLabel>Error</TextareaLabel>
  <TextareaField placeholder="Type here..." />
  <TextareaError>This field has an error</TextareaError>
</Textarea>

<Textarea size="md" disabled>
  <TextareaLabel>Disabled</TextareaLabel>
  <TextareaField placeholder="Cannot type here" disabled />
</Textarea>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}