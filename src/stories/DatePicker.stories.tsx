import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker, DatePickerField } from '../components/DatePicker/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xl', 'l', 'm'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'filled', 'disabled', 'prefilled', 'hover', 'focused', 'typing'],
    },
    type: {
      control: { type: 'select' },
      options: ['normal', 'error', 'warning', 'success'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['top', 'left', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default date picker
export const Default: Story = {
  args: {
    label: 'Date',
    placeholder: 'Select date',
  },
};

// With time picker
export const WithTimePicker: Story = {
  args: {
    label: 'Date & Time',
    placeholder: 'Select date and time',
    showTime: true,
  },
};

// With caption
export const WithCaption: Story = {
  args: {
    label: 'Birth Date',
    placeholder: 'Select your birth date',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Event Date',
    required: true,
    placeholder: 'Select event date',
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Extra Large (XL)"
        size="xl"
        placeholder="XL Date Picker"
      />
      <DatePicker
        label="Large (L)"
        size="l"
        placeholder="L Date Picker"
      />
      <DatePicker
        label="Medium (M)"
        size="m"
        placeholder="M Date Picker"
      />
    </div>
  ),
};

// Different types
export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Normal"
        type="normal"
        placeholder="Normal date picker"
      />
      <DatePicker
        label="Error"
        type="error"
        placeholder="Error date picker"
      />
      <DatePicker
        label="Warning"
        type="warning"
        placeholder="Warning date picker"
      />
      <DatePicker
        label="Success"
        type="success"
        placeholder="Success date picker"
      />
    </div>
  ),
};

// Label positions
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Top Label"
        labelPosition="top"
        placeholder="Top label position"
      />
      <DatePicker
        label="Left Label"
        labelPosition="left"
        placeholder="Left label position"
      />
      <DatePicker
        labelPosition="none"
        placeholder="No label"
      />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Default State"
        state="default"
        placeholder="Default state"
      />
      <DatePicker
        label="Filled State"
        state="filled"
        value="2024-01-15"
      />
      <DatePicker
        label="Disabled State"
        state="disabled"
        disabled
        placeholder="Disabled date picker"
      />
      <DatePicker
        label="Pre-filled State"
        state="prefilled"
        value="2024-12-25"
      />
    </div>
  ),
};

// With time picker variants
export const TimePickerVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePicker
        label="Date Only"
        placeholder="Select date only"
        showTime={false}
      />
      <DatePicker
        label="Date & Time"
        placeholder="Select date and time"
        showTime={true}
      />
    </div>
  ),
};

// DatePicker Field only
export const DatePickerFieldOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <DatePickerField
        size="xl"
        placeholder="Just the field component"
      />
      <DatePickerField
        size="l"
        type="error"
        placeholder="Error field"
      />
      <DatePickerField
        size="m"
        state="disabled"
        disabled
        placeholder="Disabled field"
      />
      <DatePickerField
        size="xl"
        showTime={true}
        placeholder="With time picker"
      />
    </div>
  ),
};

// Form examples
export const FormExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Event Registration Form</h3>
        <div className="space-y-4">
          <DatePicker
            label="Event Date"
            required
            placeholder="Select event date"
            type="normal"
          />
          <DatePicker
            label="Registration Deadline"
            placeholder="Select deadline"
            type="warning"
          />
          <DatePicker
            label="Start Time"
            placeholder="Select start time"
            showTime
          />
        </div>
      </div>
      
      <div>
        <h3 className="mb-4 text-lg font-semibold">Booking Form</h3>
        <div className="grid grid-cols-2 gap-4">
          <DatePicker
            label="Check-in Date"
            placeholder="Select check-in"
            size="l"
          />
          <DatePicker
            label="Check-out Date"
            placeholder="Select check-out"
            size="l"
          />
        </div>
      </div>
    </div>
  ),
}; 