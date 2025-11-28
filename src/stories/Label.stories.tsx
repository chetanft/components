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

// Basic label (Mandatory=False, Suffix icon=False, Optional=False)
export const Default: Story = {
  args: {
    children: 'Label',
  },
};

// Interactive Demo - changeable props (per plan)
export function InteractiveDemo() {
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
export const WithSuffixIcon: Story = {
  args: {
    children: 'Label',
    suffixIcon: true,
  },
};

// Optional label (Mandatory=False, Suffix icon=False, Optional=True)
export const Optional: Story = {
  args: {
    children: 'Label',
    optional: true,
  },
};

// Optional with icon (Mandatory=False, Suffix icon=True, Optional=True)
export const OptionalWithIcon: Story = {
  args: {
    children: 'Label',
    optional: true,
    suffixIcon: true,
  },
};

// Mandatory label (Mandatory=True, Suffix icon=False, Optional=False)
export const Mandatory: Story = {
  args: {
    children: 'Label',
    mandatory: true,
  },
};

// Mandatory with icon (Mandatory=True, Suffix icon=True, Optional=False)
export const MandatoryWithIcon: Story = {
  args: {
    children: 'Label',
    mandatory: true,
    suffixIcon: true,
  },
};

// Custom icon example
export const CustomIcon: Story = {
  args: {
    children: 'Custom Icon Label',
    suffixIcon: true,
    icon: <AlertInformational />,
  },
};

// Long label text
export const LongText: Story = {
  args: {
    children: 'This is a very long label text that might wrap to multiple lines',
    mandatory: true,
    suffixIcon: true,
  },
};

// Form field example
export const FormField: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)', minWidth: 'calc(var(--spacing-x10) * 7.5)' }}>
      <Label htmlFor="email" mandatory>
        Email Address
      </Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        style={{
          padding: 'var(--spacing-x2) var(--spacing-x3)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: 'var(--font-size-sm)',
        }}
      />
    </div>
  ),
};

// Form with multiple field types
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x6)', minWidth: 'calc(var(--spacing-x10) * 10)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
        <Label htmlFor="name" mandatory>
          Full Name
        </Label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          style={{
            padding: 'var(--spacing-x2) var(--spacing-x3)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-sm)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
        <Label htmlFor="phone" suffixIcon>
          Phone Number
        </Label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          style={{
            padding: 'var(--spacing-x2) var(--spacing-x3)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-sm)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
        <Label htmlFor="company" optional>
          Company Name
        </Label>
        <input
          id="company"
          type="text"
          placeholder="Enter your company name"
          style={{
            padding: 'var(--spacing-x2) var(--spacing-x3)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-sm)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x2)' }}>
        <Label htmlFor="bio" optional suffixIcon>
          Bio
        </Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself"
          rows={3}
          style={{
            padding: 'var(--spacing-x2) var(--spacing-x3)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-sm)',
            resize: 'vertical',
          }}
        />
      </div>
    </div>
  ),
};

// All variations showcase
export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x5)', padding: 'var(--spacing-x5)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-x5)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            Basic Label
          </h3>
          <Label>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            With Suffix Icon
          </h3>
          <Label suffixIcon>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            Optional
          </h3>
          <Label optional>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            Optional with Icon
          </h3>
          <Label optional suffixIcon>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            Mandatory
          </h3>
          <Label mandatory>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)', color: 'var(--primary)' }}>
            Mandatory with Icon
          </h3>
          <Label mandatory suffixIcon>Label</Label>
        </div>
      </div>
    </div>
  ),
};


// Different HTML elements
export const AsElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x4)' }}>
      <div>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)' }}>
          As Label Element (default)
        </h3>
        <Label mandatory>Form Label</Label>
      </div>

      <div>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)' }}>
          As Span Element
        </h3>
        <Label as="span" suffixIcon>Inline Label</Label>
      </div>

      <div>
        <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-x2)' }}>
          As Div Element
        </h3>
        <Label as="div" optional>Block Label</Label>
      </div>
    </div>
  ),
}; 