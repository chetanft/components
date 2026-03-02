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
    explorer: {
      mode: 'matrix' as const,
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'format',
          label: 'Format',
          scenarios: [
            { id: 'default', label: 'Default (24h)', story: 'ExplorerBase', args: { format: '24h' } },
            { id: '12hour', label: '12-Hour', story: 'ExplorerBase', args: { format: '12h' } },
            { id: 'no-seconds', label: 'Without Seconds', story: 'ExplorerBase', args: { format: 'no-seconds' } },
            { id: '12h-no-seconds', label: '12h No Seconds', story: 'ExplorerBase', args: { format: '12h-no-seconds' } },
          ],
        },
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
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { error: 'Please select a valid time' } },
            { id: 'warning', label: 'Warning', story: 'ExplorerBase', args: { warning: 'Time is outside business hours' } },
            { id: 'success', label: 'Success', story: 'ExplorerBase', args: { success: 'Time is available' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
        {
          id: 'behavior',
          label: 'Behavior',
          scenarios: [
            { id: 'controlled', label: 'Controlled', story: 'ExplorerBase', args: { contentType: 'controlled' } },
            { id: 'with-step', label: 'Step Interval', story: 'ExplorerBase', args: { contentType: 'with-step' } },
            { id: 'disabled-hours', label: 'Disabled Hours', story: 'ExplorerBase', args: { contentType: 'disabled-hours' } },
            { id: 'labels', label: 'Labels', story: 'ExplorerBase', args: { contentType: 'label-variants' } },
            { id: 'form', label: 'Form', story: 'ExplorerBase', args: { contentType: 'form' } },
          ],
        },
      ],
      defaultRowId: 'format',
      defaultScenarioId: 'default',
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType;
    const format = args.format ?? '24h';
    const size = args.size ?? 'md';
    const disabled = Boolean(args.disabled);
    const error = args.error;
    const warning = args.warning;
    const success = args.success;
    const use12Hours = format === '12h' || format === '12h-no-seconds';
    const showSecond = format !== 'no-seconds' && format !== '12h-no-seconds';
    const sharedPickerProps = {
      size,
      use12Hours,
      showSecond,
      disabled,
      error,
      warning,
      success,
    } as const;
    const [time, setTime] = useState('14:30:00');
    const syncKey = JSON.stringify({ contentType, format, size, disabled, error, warning, success });

    if (contentType === 'controlled') {
      return (
        <div key={syncKey} className="space-y-4">
          <TimePicker
            label="Controlled Time"
            value={time}
            onChange={setTime}
            {...sharedPickerProps}
          />
          <p className="text-sm text-[var(--color-tertiary)]">Selected: {time || 'None'}</p>
        </div>
      );
    }

    if (contentType === 'with-step') {
      return (
        <div key={syncKey}>
          <TimePicker
            label="Minute step: 15"
            minuteStep={15}
            placeholder="Minutes in steps of 15"
            {...sharedPickerProps}
          />
        </div>
      );
    }

    if (contentType === 'label-variants') {
      return (
        <div key={syncKey}>
          <TimePicker
            label="Required Field"
            labelMandatory
            placeholder="Select time"
            {...sharedPickerProps}
          />
        </div>
      );
    }

    if (contentType === 'form') {
      return (
        <div key={syncKey} className="space-y-4 max-w-md">
          <h3 className="text-lg font-medium text-[var(--color-primary)]">Schedule Meeting</h3>
          <div className="grid grid-cols-2 gap-4">
            <TimePicker
              label="Start Time"
              labelMandatory
              value="09:00:00"
              {...sharedPickerProps}
              showSecond={false}
            />
            <TimePicker
              label="End Time"
              labelMandatory
              value="17:00:00"
              {...sharedPickerProps}
              showSecond={false}
            />
          </div>
        </div>
      );
    }

    if (contentType === 'disabled-hours') {
      return (
        <div key={syncKey}>
          <TimePicker
            label="Business Hours Only"
            helperText="Only hours 9-17 are available"
            disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23]}
            placeholder="Select business hour"
            {...sharedPickerProps}
          />
        </div>
      );
    }

    return (
      <div key={syncKey}>
        <TimePicker
          label="Select Time"
          placeholder="Select time"
          {...sharedPickerProps}
        />
      </div>
    );
  },
};

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
  render: (args: React.ComponentProps<typeof TimePicker>) => <ControlledTimePickerStory {...args} />,
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
export const DocsSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <TimePicker size="xs" label="Extra Small - 1rem (14px)" placeholder="XS" />
        <p className="text-sm text-muted-foreground ml-2">Font: 1rem (14px)</p>
      </div>
      <div className="space-y-2">
        <TimePicker size="sm" label="Small - 1rem (14px)" placeholder="SM" />
        <p className="text-sm text-muted-foreground ml-2">Font: 1rem (14px)</p>
      </div>
      <div className="space-y-2">
        <TimePicker size="md" label="Medium (Default) - 1.143rem (16px)" placeholder="MD" />
        <p className="text-sm text-muted-foreground ml-2">Font: 1.143rem (16px)</p>
      </div>
      <div className="space-y-2">
        <TimePicker size="lg" label="Large - 1.429rem (20px)" placeholder="LG" />
        <p className="text-sm text-muted-foreground ml-2">Font: 1.429rem (20px)</p>
      </div>
      <div className="space-y-2">
        <TimePicker size="xl" label="Extra Large - 1.714rem (24px)" placeholder="XL" />
        <p className="text-sm text-muted-foreground ml-2">Font: 1.714rem (24px)</p>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}
