import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Reusable text component with exact Figma specifications. Perfect for AI tools, development, and design documentation. Use this for all text rendering needs.'
      }
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'style',
      defaultScenarioId: 'title-primary',
      rows: [
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'title-primary', label: 'Title Primary', story: 'ExplorerBase', args: { variant: 'title-primary' } },
            { id: 'title-secondary', label: 'Title Secondary', story: 'ExplorerBase', args: { variant: 'title-secondary' } },
            { id: 'display-primary', label: 'Display Primary', story: 'ExplorerBase', args: { variant: 'display-primary' } },
            { id: 'button', label: 'Button', story: 'ExplorerBase', args: { variant: 'button' } },
            { id: 'body-primary-semibold', label: 'Body Primary Semibold', story: 'ExplorerBase', args: { variant: 'body-primary-semibold' } },
            { id: 'body-primary-medium', label: 'Body Primary Medium', story: 'ExplorerBase', args: { variant: 'body-primary-medium' } },
            { id: 'body-primary-regular', label: 'Body Primary Regular', story: 'ExplorerBase', args: { variant: 'body-primary-regular' } },
            { id: 'body-primary-italic', label: 'Body Primary Italic', story: 'ExplorerBase', args: { variant: 'body-primary-italic' } },
            { id: 'body-secondary-semibold', label: 'Body Secondary Semibold', story: 'ExplorerBase', args: { variant: 'body-secondary-semibold' } },
            { id: 'body-secondary-medium', label: 'Body Secondary Medium', story: 'ExplorerBase', args: { variant: 'body-secondary-medium' } },
            { id: 'body-secondary-regular', label: 'Body Secondary Regular', story: 'ExplorerBase', args: { variant: 'body-secondary-regular' } },
          ],
        },
        {
          id: 'tone',
          label: 'Tone',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { color: 'primary' } },
            { id: 'secondary', label: 'Secondary', story: 'ExplorerBase', args: { color: 'secondary' } },
            { id: 'muted', label: 'Muted', story: 'ExplorerBase', args: { color: 'muted' } },
            { id: 'danger', label: 'Danger', story: 'ExplorerBase', args: { color: 'danger' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { color: 'success' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { color: 'warning' } },
          ],
        },
      ],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'title-primary',
        'title-secondary',
        'display-primary',
        'button',
        'body-primary-semibold',
        'body-primary-medium',
        'body-primary-italic',
        'body-primary-regular',
        'body-secondary-semibold',
        'body-secondary-medium',
        'body-secondary-regular'
      ],
      description: 'Typography variant based on Figma design system. Font sizes use rem units (14px = 1rem base).'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'danger', 'success', 'warning'],
      description: 'Text color semantic variants'
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body-primary-regular',
    color: 'primary',
  },
  render: (args: any) => {
    const variant = args.variant ?? 'body-primary-regular';
    const color = args.color ?? 'primary';
    return (
      <Typography variant={variant} color={color}>
        {args.children}
      </Typography>
    );
  },
};

// Default interactive story for controls
export const Default: Story = {
  args: {
    children: 'Interactive Typography Component',
    variant: 'body-primary-regular',
  },
};

export const DocsVariants: Story = {
  args: {
    children: 'Typography Variants',
  },
  render: () => (
    <div className="space-y-3">
      <Typography variant="title-primary">Title Primary — 2rem (28px)</Typography>
      <Typography variant="title-secondary">Title Secondary — 1.714rem (24px)</Typography>
      <Typography variant="display-primary">Display Primary — 1.429rem (20px)</Typography>
      <Typography variant="body-primary-semibold">Body Primary Semibold — 1.143rem (16px)</Typography>
      <Typography variant="body-primary-medium">Body Primary Medium — 1.143rem (16px)</Typography>
      <Typography variant="body-primary-regular">Body Primary Regular — 1.143rem (16px)</Typography>
      <Typography variant="body-primary-italic">Body Primary Italic — 1.143rem (16px)</Typography>
      <Typography variant="body-secondary-semibold">Body Secondary Semibold — 1rem (14px)</Typography>
      <Typography variant="body-secondary-medium">Body Secondary Medium — 1rem (14px)</Typography>
      <Typography variant="body-secondary-regular">Body Secondary Regular — 1rem (14px)</Typography>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Typography variant="title-primary">Title Primary</Typography>
<Typography variant="title-secondary">Title Secondary</Typography>
<Typography variant="display-primary">Display Primary</Typography>
<Typography variant="body-primary-semibold">Body Primary Semibold</Typography>
<Typography variant="body-primary-medium">Body Primary Medium</Typography>
<Typography variant="body-primary-regular">Body Primary Regular</Typography>
<Typography variant="body-primary-italic">Body Primary Italic</Typography>
<Typography variant="body-secondary-semibold">Body Secondary Semibold</Typography>
<Typography variant="body-secondary-medium">Body Secondary Medium</Typography>
<Typography variant="body-secondary-regular">Body Secondary Regular</Typography>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}
