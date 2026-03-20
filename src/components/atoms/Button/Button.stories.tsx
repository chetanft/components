import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonIcon, ButtonText } from './index';


const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    explorer: {
      mode: 'matrix' as const,
      baseStory: 'ExplorerBase',
      previewMode: 'inline' as const,
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      rows: [
        {
          id: 'style',
          label: 'Style',
          values: { style: 'style' },
          scenarios: [
            { id: 'primary', label: 'Primary', args: { variant: 'primary' } },
            { id: 'secondary', label: 'Outline', args: { variant: 'secondary' } },
            { id: 'danger', label: 'Danger', args: { variant: 'destructive' } },
            { id: 'text', label: 'Text', args: { variant: 'text' } },
            { id: 'link', label: 'Link', args: { variant: 'link' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          values: { content: 'icon' },
          scenarios: [
            { id: 'leading-icon', label: 'Leading Icon', args: { icon: 'add', iconPosition: 'leading', children: 'Add Item' } },
            { id: 'trailing-icon', label: 'Trailing Icon', args: { icon: 'send', iconPosition: 'trailing', children: 'Send' } },
            { id: 'icon-only', label: 'Icon Only', args: { icon: 'edit', iconPosition: 'only', children: undefined } },
            { id: 'text-only', label: 'Label Only', args: { icon: undefined, iconPosition: 'leading', children: 'Button' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          values: { state: 'state' },
          scenarios: [
            { id: 'default-state', label: 'Default', args: { disabled: false, loading: false } },
            { id: 'disabled-state', label: 'Disabled', args: { disabled: true, loading: false } },
            { id: 'loading-state', label: 'Loading', args: { disabled: false, loading: true } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          values: { size: 'size' },
          scenarios: [
            { id: 'size-xxs', label: 'XXS', args: { size: 'xxs' } },
            { id: 'size-xs', label: 'XS', args: { size: 'xs' } },
            { id: 'size-sm', label: 'SM', args: { size: 'sm' } },
            { id: 'size-md', label: 'MD', args: { size: 'md' } },
            { id: 'size-lg', label: 'LG', args: { size: 'lg' } },
            { id: 'size-xl', label: 'XL', args: { size: 'xl' } },
            { id: 'size-xxl', label: 'XXL', args: { size: 'xxl' } },
          ],
        },
        {
          id: 'shape',
          label: 'Shape',
          values: { shape: 'shape' },
          scenarios: [
            { id: 'shape-default', label: 'Default', args: { shape: 'default' } },
            { id: 'shape-rounded', label: 'Rounded', args: { shape: 'rounded' } },
          ],
        },
      ],
      defaultRowId: 'style',
      defaultScenarioId: 'primary',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive', 'text', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    },
    icon: {
      control: { type: 'select' },
      options: ['add', 'search', 'copy', 'send', 'document', 'download', 'edit'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['leading', 'trailing', 'only'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'rounded'],
    },
    children: {
      control: { type: 'text' },
    },
    glass: {
      control: { type: 'select' },
      options: [false, true, 'subtle', 'prominent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <ButtonIcon icon="add" />
        <ButtonText>Add Item</ButtonText>
      </Button>
      <Button variant="secondary">
        <ButtonText>Save</ButtonText>
      </Button>
      <Button variant="destructive">
        <ButtonIcon icon="delete" />
        <ButtonText>Delete</ButtonText>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use ButtonIcon and ButtonText sub-components for flexible button composition.',
      },
      source: {
        code: `<Button variant="primary">
  <ButtonIcon icon="add" />
  <ButtonText>Add Item</ButtonText>
</Button>
<Button variant="secondary">
  <ButtonText>Save</ButtonText>
</Button>
<Button variant="destructive">
  <ButtonIcon icon="delete" />
  <ButtonText>Delete</ButtonText>
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsWithTrailingIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <ButtonText>Send</ButtonText>
        <ButtonIcon icon="send" />
      </Button>
      <Button variant="secondary">
        <ButtonText>Download</ButtonText>
        <ButtonIcon icon="download" />
      </Button>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Composable API allows flexible icon positioning.',
      },
      source: {
        code: `<Button variant="primary">
  <ButtonText>Send</ButtonText>
  <ButtonIcon icon="send" />
</Button>
<Button variant="secondary">
  <ButtonText>Download</ButtonText>
  <ButtonIcon icon="download" />
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsIconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="secondary">
        <ButtonIcon icon="edit" />
      </Button>
      <Button variant="primary">
        <ButtonIcon icon="add" />
      </Button>
      <Button variant="destructive">
        <ButtonIcon icon="delete" />
      </Button>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Use ButtonIcon alone for icon-only buttons.',
      },
      source: {
        code: `<Button variant="secondary">
  <ButtonIcon icon="edit" />
</Button>
<Button variant="primary">
  <ButtonIcon icon="add" />
</Button>
<Button variant="destructive">
  <ButtonIcon icon="delete" />
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsTextOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <ButtonText>Click Me</ButtonText>
      </Button>
      <Button variant="text">
        <ButtonText>Text Button</ButtonText>
      </Button>
      <Button variant="link">
        <ButtonText>Link Button</ButtonText>
      </Button>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Use ButtonText alone when you only need text content.',
      },
      source: {
        code: `<Button variant="primary">
  <ButtonText>Click Me</ButtonText>
</Button>
<Button variant="text">
  <ButtonText>Text Button</ButtonText>
</Button>
<Button variant="link">
  <ButtonText>Link Button</ButtonText>
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Shape Variants
export const DocsShapeDefault: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">
        <ButtonIcon icon="add" />
        <ButtonText>Default</ButtonText>
      </Button>
      <Button variant="secondary">
        <ButtonText>Default</ButtonText>
      </Button>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: { story: 'Default button shape (square corners with component radius).' },
      source: {
        code: `<Button variant="primary">
  <ButtonIcon icon="add" />
  <ButtonText>Default</ButtonText>
</Button>
<Button variant="secondary">
  <ButtonText>Default</ButtonText>
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsShapeRounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" shape="rounded">
        <ButtonIcon icon="add" />
        <ButtonText>Rounded</ButtonText>
      </Button>
      <Button variant="secondary" shape="rounded">
        <ButtonText>Rounded</ButtonText>
      </Button>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: { story: 'Rounded shape via `shape="rounded"`.' },
      source: {
        code: `<Button variant="primary" shape="rounded">
  <ButtonIcon icon="add" />
  <ButtonText>Rounded</ButtonText>
</Button>
<Button variant="secondary" shape="rounded">
  <ButtonText>Rounded</ButtonText>
</Button>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const ExplorerBase: Story = {
  args: {
    variant: 'primary',
    icon: 'add',
    iconPosition: 'leading',
    shape: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    children: 'Add Item',
  },
  render: (args: any) => {
    const isIconOnly = args.iconPosition === 'only' || args.shape === 'circle';
    const resolvedIcon = isIconOnly ? (args.icon ?? 'add') : args.icon;
    return (
      <div className="w-full h-[55vh] flex items-center justify-center">
        <Button
          variant={args.variant}
          size={args.size}
          icon={resolvedIcon}
          iconPosition={isIconOnly ? 'only' : args.iconPosition}
          shape={args.shape}
          disabled={args.disabled}
          loading={args.loading}
          glass={args.glass}
        >
          {isIconOnly ? undefined : args.children}
        </Button>
      </div>
    );
  },
};
