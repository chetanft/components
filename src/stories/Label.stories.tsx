import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Label } from '../components/atoms/Label';
import { AlertInformational } from '../components/atoms/Icons';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Form label component with support for mandatory indicators, optional text, and suffix icons. Based on Figma design specifications.',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'mandatory', label: 'Mandatory', story: 'ExplorerBase', args: { mandatory: true } },
            { id: 'optional', label: 'Optional', story: 'ExplorerBase', args: { optional: true } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Basic', story: 'ExplorerBase', args: {} },
            { id: 'icon', label: 'With Icon', story: 'ExplorerBase', args: { suffixIcon: true } },
            { id: 'form', label: 'Form Example', story: 'ExplorerBase', args: { mandatory: true, suffixIcon: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content of the label',
    },
    mandatory: {
      control: 'boolean',
      description: 'Shows a red asterisk to indicate required field',
    },
    optional: {
      control: 'boolean',
      description: 'Shows "(Optional)" text for optional fields',
    },
    suffixIcon: {
      control: 'boolean',
      description: 'Shows an info/alert icon after the label text',
    },
    icon: {
      control: false,
      description: 'Custom icon to use instead of default alert icon',
    },
    as: {
      control: 'select',
      options: ['label', 'span', 'div'],
      description: 'HTML element to render as',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form control',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const mandatory = Boolean(args.mandatory);
    const optional = Boolean(args.optional);
    const suffixIcon = Boolean(args.suffixIcon);
    const syncKey = JSON.stringify({ mandatory, optional, suffixIcon });
    return (
      <div key={syncKey}>
        <Label mandatory={mandatory} optional={optional} suffixIcon={suffixIcon}>
          Label
        </Label>
      </div>
    );
  },
};

// Basic label (Mandatory=False, Suffix icon=False, Optional=False)
export const Default: Story = {
  args: {
    children: 'Label',
  },
};

// Interactive Demo - changeable props (per plan)
export function DocsInteractiveDemo() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    newsletter: false,
  });

  return (
    <div style={{ maxWidth: 'calc(var(--spacing-x10) * 10)', padding: 'var(--spacing-x5)' }}>
      <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--spacing-x5)' }}>
        Interactive Form
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
        <div>
          <Label htmlFor="email-input" mandatory>
            Email Address
          </Label>
          <input
            id="email-input"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: 'var(--spacing-x2) var(--spacing-x3)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              marginTop: 'var(--spacing-x1)',
            }}
          />
        </div>

        <div>
          <Label htmlFor="password-input" mandatory suffixIcon>
            Password
          </Label>
          <input
            id="password-input"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: 'var(--spacing-x2) var(--spacing-x3)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              marginTop: 'var(--spacing-x1)',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-x2)' }}>
          <input
            id="newsletter-input"
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e.target.checked }))}
          />
          <Label htmlFor="newsletter-input" optional as="span">
            Subscribe to newsletter
          </Label>
        </div>
      </div>

      <div style={{ marginTop: 'var(--spacing-x5)', padding: 'var(--spacing-x3)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
        <strong>Form Data:</strong>
        <pre style={{ fontSize: 'var(--font-size-xs)', marginTop: 'var(--spacing-x2)' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Label with suffix icon (Mandatory=False, Suffix icon=True, Optional=False)
export const DocsWithSuffixIcon: Story = {
  args: {
    children: 'Label',
    suffixIcon: true,
  },

  parameters: { docsOnly: true },
}