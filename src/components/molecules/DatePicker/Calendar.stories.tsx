import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import React, { useState } from 'react';

const meta = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date(),
  },
};

export const DateRange: Story = {
  args: {
    range: true,
    value: [
      new Date(), 
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ] as [Date, Date],
  },
};

export const WithMinMaxDates: Story = {
  args: {
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
};

export const WithActionsButtons: Story = {
  args: {
    range: true,
    onCancel: () => console.log('Cancelled'),
    onApply: () => console.log('Applied'),
  },
};

export const Interactive = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Single Date Selection</h3>
      <Calendar 
        value={selectedDate} 
        onChange={(date) => setSelectedDate(date as Date)} 
      />
      <div className="mt-2">
        Selected date: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
      </div>
    </div>
  );
};

export const InteractiveRange = () => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  
  const handleChange = (value: Date | [Date, Date]) => {
    if (Array.isArray(value)) {
      setDateRange(value);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Date Range Selection</h3>
      <Calendar 
        range 
        value={dateRange} 
        onChange={handleChange}
        onCancel={() => console.log('Cancelled')}
        onApply={() => console.log('Applied')}
      />
      <div className="mt-2">
        Start date: {dateRange ? dateRange[0].toLocaleDateString() : 'None'}<br />
        End date: {dateRange ? dateRange[1].toLocaleDateString() : 'None'}
      </div>
    </div>
  );
}; 