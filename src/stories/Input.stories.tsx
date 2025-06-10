import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/atoms/Input/Input';
import { Mail, User, Phone } from '../components/atoms/Icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic input
export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

// Mandatory input
export const Mandatory: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    labelMandatory: true,
  },
};

// Optional input
export const Optional: Story = {
  args: {
    label: 'Middle Name',
    placeholder: 'Enter your middle name',
    labelOptional: true,
  },
};

// With suffix icon
export const WithSuffixIcon: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    type: 'tel',
    labelSuffixIcon: true,
  },
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    label: 'Contact Email',
    placeholder: 'Enter contact email',
    type: 'email',
    labelSuffixIcon: true,
    labelIcon: <Mail />,
  },
};

// Mandatory with custom icon
export const MandatoryWithIcon: Story = {
  args: {
    label: 'User Information',
    placeholder: 'Enter user details',
    labelMandatory: true,
    labelSuffixIcon: true,
    labelIcon: <User />,
  },
};

// Optional with custom icon
export const OptionalWithIcon: Story = {
  args: {
    label: 'Alternative Contact',
    placeholder: 'Enter alternative contact',
    type: 'tel',
    labelOptional: true,
    labelSuffixIcon: true,
    labelIcon: <Phone />,
  },
};

// All sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
      <Input label="Extra Large" size="xl" placeholder="XL input" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default" placeholder="Default state" />
      <Input label="Error" placeholder="Error state" error="This field is required" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
    </div>
  ),
}; 