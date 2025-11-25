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
    <div style={{ maxWidth: '400px', padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
        Interactive Form
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              padding: '8px 12px',
              border: '1px solid #CED1D7',
              borderRadius: '4px',
              fontSize: '14px',
              marginTop: '4px',
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
              padding: '8px 12px',
              border: '1px solid #CED1D7',
              borderRadius: '4px',
              fontSize: '14px',
              marginTop: '4px',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

      <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Form Data:</strong>
        <pre style={{ fontSize: '12px', marginTop: '8px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '300px' }}>
      <Label htmlFor="email" mandatory>
        Email Address
      </Label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        style={{
          padding: '8px 12px',
          border: '1px solid #CED1D7',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      />
    </div>
  ),
};

// Form with multiple field types
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label htmlFor="name" mandatory>
          Full Name
        </Label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          style={{
            padding: '8px 12px',
            border: '1px solid #CED1D7',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label htmlFor="phone" suffixIcon>
          Phone Number
        </Label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          style={{
            padding: '8px 12px',
            border: '1px solid #CED1D7',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label htmlFor="company" optional>
          Company Name
        </Label>
        <input
          id="company"
          type="text"
          placeholder="Enter your company name"
          style={{
            padding: '8px 12px',
            border: '1px solid #CED1D7',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label htmlFor="bio" optional suffixIcon>
          Bio
        </Label>
        <textarea
          id="bio"
          placeholder="Tell us about yourself"
          rows={3}
          style={{
            padding: '8px 12px',
            border: '1px solid #CED1D7',
            borderRadius: '4px',
            fontSize: '14px',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        Label Variations (Based on Figma Design)
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
            Basic Label
          </h3>
          <Label>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
            With Suffix Icon
          </h3>
          <Label suffixIcon>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
            Optional
          </h3>
          <Label optional>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
            Optional with Icon
          </h3>
          <Label optional suffixIcon>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
            Mandatory
          </h3>
          <Label mandatory>Label</Label>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#434F64' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          As Label Element (default)
        </h3>
        <Label mandatory>Form Label</Label>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          As Span Element
        </h3>
        <Label as="span" suffixIcon>Inline Label</Label>
      </div>

      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          As Div Element
        </h3>
        <Label as="div" optional>Block Label</Label>
      </div>
    </div>
  ),
}; 