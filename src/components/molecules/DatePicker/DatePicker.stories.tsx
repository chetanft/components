import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import React, { useState } from 'react';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'MM/DD/YYYY',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Date',
    placeholder: 'MM/DD/YYYY',
    value: new Date().toLocaleDateString(),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date',
    placeholder: 'MM/DD/YYYY',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Date with Error',
    placeholder: 'MM/DD/YYYY',
    error: true,
  },
};

export const WithTime: Story = {
  args: {
    label: 'Date & Time',
    placeholder: 'MM/DD/YYYY HH:MM',
    showTime: true,
  },
};

export const DateRange: Story = {
  args: {
    label: 'Date Range',
    placeholder: 'Start date → End date',
    range: true,
  },
};

export const DateRangeWithValues: Story = {
  args: {
    label: 'Date Range',
    range: true,
    startValue: new Date().toLocaleDateString(),
    endValue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  },
};

export const Interactive = () => {
  const [value, setValue] = useState<string>('');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h3>Single Date Selection</h3>
      <DatePicker 
        label="Select Date"
        placeholder="MM/DD/YYYY"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
      <div>Selected date: {value || 'None'}</div>
      
      <h3 style={{ marginTop: '20px' }}>Date Range Selection</h3>
      <DateRangeInteractive />
    </div>
  );
};

const DateRangeInteractive = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  
  return (
    <div>
      <DatePicker 
        label="Select Date Range"
        range={true}
        startValue={startDate}
        endValue={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />
      <div style={{ marginTop: '10px' }}>
        Start date: {startDate || 'None'} <br />
        End date: {endDate || 'None'}
      </div>
    </div>
  );
}; 