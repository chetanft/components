import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from './TimePicker';
import { useState } from 'react';
import type { ComponentProps } from 'react';

const meta: Meta<typeof TimePicker> = {
  title: 'Molecules/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A time picker component for selecting hours, minutes, and seconds. Built using FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Component size',
    },
    use12Hours: {
      control: 'boolean',
      description: 'Use 12-hour format with AM/PM',
    },
    showSecond: {
      control: 'boolean',
      description: 'Show seconds selector',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the time picker',
    },
    allowClear: {
      control: 'boolean',
      description: 'Allow clearing the selected time',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimePicker>;
type TimePickerStoryProps = ComponentProps<typeof TimePicker>;

const ControlledTimePickerStory = (props: TimePickerStoryProps) => {
  const [time, setTime] = useState('14:30:00');

  return (
    <div className="space-y-4">
      <TimePicker
        {...props}
        value={time}
        onChange={setTime}
      />
      <p className="text-sm text-[var(--color-tertiary)]">Selected time: {time || 'None'}</p>
    </div>
  );
};

const FormIntegrationStory = () => {
  const [startTime, setStartTime] = useState('09:00:00');
  const [endTime, setEndTime] = useState('17:00:00');

  return (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-medium text-[var(--color-primary)]">Schedule Meeting</h3>
      <div className="grid grid-cols-2 gap-4">
        <TimePicker
          label="Start Time"
          labelMandatory
          value={startTime}
          onChange={setStartTime}
          showSecond={false}
        />
        <TimePicker
          label="End Time"
          labelMandatory
          value={endTime}
          onChange={setEndTime}
          showSecond={false}
        />
      </div>
      <p className="text-sm text-[var(--color-secondary)]">
        Meeting duration: {startTime && endTime ?
          `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}` :
          'Select times'}
      </p>
    </div>
  );
};

// Basic TimePicker
export const Default: Story = {
  args: {
    label: 'Select Time',
    placeholder: 'Select time',
  },
};

// Controlled TimePicker
export const Controlled: Story = {
  render: (args) => <ControlledTimePickerStory {...args} />,
  args: {
    label: 'Controlled Time',
  },
};

// 12-Hour Format
export const TwelveHourFormat: Story = {
  args: {
    label: 'Time (12-hour)',
    use12Hours: true,
    placeholder: 'Select time',
  },
};

// Without Seconds
export const WithoutSeconds: Story = {
  args: {
    label: 'Time (Hours & Minutes)',
    showSecond: false,
    placeholder: 'HH:mm',
  },
};

// 12-Hour Without Seconds
export const TwelveHourWithoutSeconds: Story = {
  args: {
    label: 'Time (12-hour, no seconds)',
    use12Hours: true,
    showSecond: false,
    placeholder: 'Select time',
  },
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker size="xs" label="Extra Small" placeholder="XS" />
      <TimePicker size="sm" label="Small" placeholder="SM" />
      <TimePicker size="md" label="Medium (Default)" placeholder="MD" />
      <TimePicker size="lg" label="Large" placeholder="LG" />
      <TimePicker size="xl" label="Extra Large" placeholder="XL" />
    </div>
  ),
};

// With Step
export const WithStep: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker
        label="Hour step: 2"
        hourStep={2}
        placeholder="Hours in steps of 2"
      />
      <TimePicker
        label="Minute step: 15"
        minuteStep={15}
        placeholder="Minutes in steps of 15"
      />
      <TimePicker
        label="Second step: 10"
        secondStep={10}
        placeholder="Seconds in steps of 10"
      />
    </div>
  ),
};

// With States
export const WithStates: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker label="Normal" placeholder="Select time" />
      <TimePicker label="With Error" error="Please select a valid time" placeholder="Select time" />
      <TimePicker label="With Warning" warning="Time is outside business hours" placeholder="Select time" />
      <TimePicker label="With Success" success="Time is available" placeholder="Select time" />
      <TimePicker label="Disabled" disabled placeholder="Select time" />
    </div>
  ),
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Meeting Time',
    helperText: 'Select a time between 9 AM and 5 PM',
    placeholder: 'Select time',
  },
};

// Disabled Hours
export const DisabledHours: Story = {
  args: {
    label: 'Business Hours Only',
    helperText: 'Only hours 9-17 are available',
    disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23],
    placeholder: 'Select business hour',
  },
};

// With Label Variants
export const LabelVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <TimePicker label="Required Field" labelMandatory placeholder="Select time" />
      <TimePicker label="Optional Field" labelOptional placeholder="Select time" />
      <TimePicker label="With Info Icon" labelSuffixIcon placeholder="Select time" />
    </div>
  ),
};

// Pre-filled Value
export const PrefilledValue: Story = {
  args: {
    label: 'Pre-filled Time',
    defaultValue: '09:30:00',
  },
};

// Without Clear Button
export const WithoutClear: Story = {
  args: {
    label: 'No Clear Button',
    allowClear: false,
    defaultValue: '14:00:00',
  },
};

// Form Integration Example
export const FormIntegration: Story = {
  render: () => <FormIntegrationStory />,
};
