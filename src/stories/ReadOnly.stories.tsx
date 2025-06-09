import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ReadOnly } from '../components/atoms/ReadOnly';
import { User, Mail, Phone } from '../components/atoms/Icons';

const meta: Meta<typeof ReadOnly> = {
  title: 'Atoms/ReadOnly',
  component: ReadOnly,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A read-only field display component for showing label-value pairs in different layouts. Based on Figma design specifications.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text',
    },
    value: {
      control: 'text',
      description: 'The main value text',
    },
    subtext: {
      control: 'text',
      description: 'Optional subtext below the main value',
    },
    type: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    labelIcon: {
      control: 'boolean',
      description: 'Whether to show an icon',
    },
    icon: {
      control: false,
      description: 'Custom icon to use instead of default check icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReadOnly>;

// Type=Vertical, Subtext=False, Label Icon=False
export const VerticalBasic: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'vertical',
    labelIcon: false,
  },
};

// Type=Vertical, Subtext=False, Label Icon=True
export const VerticalWithIcon: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'vertical',
    labelIcon: true,
  },
};

// Type=Vertical, Subtext=True, Label Icon=False
export const VerticalWithSubtext: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    subtext: 'Sub text',
    type: 'vertical',
    labelIcon: false,
  },
};

// Type=Vertical, Subtext=True, Label Icon=True
export const VerticalWithIconAndSubtext: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    subtext: 'Sub text',
    type: 'vertical',
    labelIcon: true,
  },
};

// Type=Horizontal, Subtext=False, Label Icon=False
export const HorizontalBasic: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'horizontal',
    labelIcon: false,
  },
};

// Type=Horizontal, Subtext=False, Label Icon=True
export const HorizontalWithIcon: Story = {
  args: {
    label: 'Label',
    value: 'Text',
    type: 'horizontal',
    labelIcon: true,
  },
};

// Custom icon example
export const CustomIcon: Story = {
  args: {
    label: 'User Info',
    value: 'John Doe',
    type: 'vertical',
    labelIcon: true,
    icon: <User />,
  },
};

// Real-world examples
export const UserProfile: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        User Profile Information
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <ReadOnly
          label="Full Name"
          value="John Smith"
          type="vertical"
          labelIcon={true}
          icon={<User />}
        />
        
        <ReadOnly
          label="Email"
          value="john.smith@company.com"
          type="vertical"
          labelIcon={true}
          icon={<Mail />}
        />
        
        <ReadOnly
          label="Phone"
          value="+1 (555) 123-4567"
          subtext="Primary contact"
          type="vertical"
          labelIcon={true}
          icon={<Phone />}
        />
        
        <ReadOnly
          label="Department"
          value="Engineering"
          subtext="Software Development"
          type="vertical"
          labelIcon={false}
        />
      </div>
    </div>
  ),
};

// Horizontal layout examples
export const HorizontalLayout: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        Horizontal Layout Examples
      </h3>
      
      <ReadOnly
        label="Status"
        value="Active"
        type="horizontal"
        labelIcon={false}
      />
      
      <ReadOnly
        label="Priority"
        value="High"
        type="horizontal"
        labelIcon={true}
      />
      
      <ReadOnly
        label="Assigned to"
        value="Sarah Wilson"
        type="horizontal"
        labelIcon={true}
        icon={<User />}
      />
    </div>
  ),
};

// Form summary example
export const FormSummary: Story = {
  render: () => (
    <div style={{ maxWidth: '500px', padding: '20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
        Order Summary
      </h3>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px',
        padding: '16px',
        border: '1px solid #CED1D7',
        borderRadius: '8px',
        backgroundColor: '#F8F8F9'
      }}>
        <ReadOnly
          label="Order ID"
          value="#ORD-2024-001"
          type="horizontal"
          labelIcon={true}
        />
        
        <ReadOnly
          label="Customer"
          value="Acme Corporation"
          subtext="Premium account"
          type="vertical"
          labelIcon={true}
          icon={<User />}
        />
        
        <ReadOnly
          label="Delivery Date"
          value="March 15, 2024"
          type="horizontal"
          labelIcon={false}
        />
        
        <ReadOnly
          label="Total Amount"
          value="$1,250.00"
          subtext="Including taxes"
          type="vertical"
          labelIcon={true}
        />
      </div>
    </div>
  ),
};

// All variations showcase
export const AllVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
        ReadOnly Component Variations (Based on Figma Design)
      </h2>
      
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px', color: '#434F64' }}>
          Vertical Layouts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              Basic
            </h4>
            <ReadOnly label="Label" value="Text" type="vertical" />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              With Icon
            </h4>
            <ReadOnly label="Label" value="Text" type="vertical" labelIcon={true} />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              With Subtext
            </h4>
            <ReadOnly label="Label" value="Text" subtext="Sub text" type="vertical" />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              Icon + Subtext
            </h4>
            <ReadOnly label="Label" value="Text" subtext="Sub text" type="vertical" labelIcon={true} />
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px', color: '#434F64' }}>
          Horizontal Layouts
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              Basic
            </h4>
            <ReadOnly label="Label" value="Text" type="horizontal" />
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#5F697B' }}>
              With Icon
            </h4>
            <ReadOnly label="Label" value="Text" type="horizontal" labelIcon={true} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Long content example
export const LongContent: Story = {
  args: {
    label: 'Description',
    value: 'This is a very long text value that demonstrates how the component handles longer content and text wrapping within the layout constraints.',
    subtext: 'Additional information that provides context',
    type: 'vertical',
    labelIcon: true,
  },
};

// Compact horizontal list
export const CompactList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
        System Information
      </h3>
      
      {[
        { label: 'Version', value: '2.1.4' },
        { label: 'Environment', value: 'Production' },
        { label: 'Last Updated', value: '2 hours ago' },
        { label: 'Status', value: 'Operational' },
      ].map((item, index) => (
        <ReadOnly
          key={index}
          label={item.label}
          value={item.value}
          type="horizontal"
          labelIcon={false}
        />
      ))}
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selectedUser] = React.useState({
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      phone: '+1 (415) 555-0123',
    });

    return (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
          Employee Details
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '20px',
          padding: '20px',
          border: '1px solid #CED1D7',
          borderRadius: '8px',
          backgroundColor: '#FFFFFF'
        }}>
          <ReadOnly
            label="Full Name"
            value={selectedUser.name}
            type="vertical"
            labelIcon={true}
            icon={<User />}
          />
          
          <ReadOnly
            label="Email Address"
            value={selectedUser.email}
            type="vertical"
            labelIcon={true}
            icon={<Mail />}
          />
          
          <ReadOnly
            label="Job Title"
            value={selectedUser.role}
            subtext={selectedUser.department}
            type="vertical"
            labelIcon={false}
          />
          
          <ReadOnly
            label="Office Location"
            value={selectedUser.location}
            type="vertical"
            labelIcon={false}
          />
          
          <div style={{ gridColumn: 'span 2' }}>
            <ReadOnly
              label="Phone Number"
              value={selectedUser.phone}
              subtext="Work phone"
              type="horizontal"
              labelIcon={true}
              icon={<Phone />}
            />
          </div>
        </div>
      </div>
    );
  },
}; 