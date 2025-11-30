import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { useState } from 'react';

const meta: Meta<typeof Calendar> = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A standalone calendar component for date display and selection. Built using FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['month', 'year', 'decade'],
      description: 'Display mode',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Full screen mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// Basic Calendar
export const Default: Story = {
  args: {},
};

// Controlled Calendar
const ControlledComponent = (args: any) => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="space-y-4">
      <Calendar
        {...args}
        value={date}
        onSelect={setDate}
      />
      <p className="text-sm text-[var(--color-tertiary)]">
        Selected: {date.toLocaleDateString()}
      </p>
    </div>
  );
};

export const Controlled: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => <ControlledComponent {...args} />,
};

// Year Mode
export const YearMode: Story = {
  args: {
    mode: 'year',
  },
};

// Decade Mode
export const DecadeMode: Story = {
  args: {
    mode: 'decade',
  },
};

// Fullscreen Calendar
export const Fullscreen: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => (
    <div className="h-[600px]">
      <Calendar
        {...args}
        fullscreen={true}
        dateCellRender={(date) => {
          // Example: Show some events on certain days
          const day = date.getDate();
          if (day === 15) {
            return (
              <div className="text-[var(--color-primary)] text-xs">
                Meeting
              </div>
            );
          }
          if (day === 20) {
            return (
              <div className="text-[var(--color-positive)] text-xs">
                Birthday
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  ),
};

// With Disabled Dates
export const DisabledDates: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => {
    const today = new Date();
    return (
      <Calendar
        {...args}
        disabledDate={(date) => {
          // Disable weekends
          const day = date.getDay();
          return day === 0 || day === 6;
        }}
      />
    );
  },
};

// With Valid Range
export const ValidRange: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    return (
      <div className="space-y-4">
        <Calendar
          {...args}
          validRange={[minDate, maxDate]}
        />
        <p className="text-sm text-[var(--color-tertiary)]">
          Valid range: {minDate.toLocaleDateString()} - {maxDate.toLocaleDateString()}
        </p>
      </div>
    );
  },
};

// Custom Header
export const CustomHeader: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => (
    <Calendar
      {...args}
      headerRender={({ value, type, onChange, onTypeChange }) => (
        <div className="flex items-center justify-between p-4 bg-[var(--color-bg-secondary)] rounded-t-lg">
          <button
            onClick={() => {
              const newDate = new Date(value);
              newDate.setMonth(newDate.getMonth() - 1);
              onChange(newDate);
            }}
            className="px-3 py-1 bg-[var(--color-primary)] text-[var(--overlay-control-text)] rounded"
          >
            Prev
          </button>
          <span className="font-bold text-[var(--color-primary)]">
            {value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => {
              const newDate = new Date(value);
              newDate.setMonth(newDate.getMonth() + 1);
              onChange(newDate);
            }}
            className="px-3 py-1 bg-[var(--color-primary)] text-[var(--overlay-control-text)] rounded"
          >
            Next
          </button>
        </div>
      )}
    />
  ),
};

// Event Calendar
export const EventCalendar: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => {
    const events: Record<string, string[]> = {
      '5': ['Team Standup'],
      '10': ['Project Review', 'Client Call'],
      '15': ['Sprint Planning'],
      '20': ['Demo Day'],
      '25': ['Retrospective'],
    };

    return (
      <div className="h-[500px]">
        <Calendar
          {...args}
          fullscreen={true}
          dateCellRender={(date) => {
            const dayEvents = events[date.getDate().toString()];
            if (!dayEvents) return null;

            return (
              <div className="space-y-1">
                {dayEvents.map((event, i) => (
                  <div
                    key={i}
                    className="text-xs px-1 py-0.5 rounded bg-[var(--color-primary-light)] text-[var(--color-primary)] truncate"
                  >
                    {event}
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>
    );
  },
};

// Month Selection with Events
export const MonthSelectionWithSummary: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => {
    const monthEvents: Record<number, number> = {
      0: 5,
      1: 3,
      2: 8,
      3: 2,
      4: 10,
      5: 4,
      6: 6,
      7: 1,
      8: 7,
      9: 9,
      10: 3,
      11: 12,
    };

    return (
      <Calendar
        {...args}
        mode="year"
        fullscreen={true}
        monthCellRender={(date) => {
          const count = monthEvents[date.getMonth()];
          return (
            <div className="text-xs text-[var(--color-tertiary)]">
              {count} events
            </div>
          );
        }}
      />
    );
  },
};

// Panel Change Callback
const PanelChangeCallbackComponent = (args: any) => {
  const [log, setLog] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <Calendar
        {...args}
        onPanelChange={(date, mode) => {
          setLog(prev => [
            `Changed to ${mode} view: ${date.toLocaleDateString()}`,
            ...prev.slice(0, 4),
          ]);
        }}
      />
      <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg">
        <h4 className="font-medium mb-2">Panel Change Log:</h4>
        {log.length > 0 ? (
          <ul className="text-sm text-[var(--color-tertiary)] space-y-1">
            {log.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-[var(--color-tertiary)]">
            Navigate the calendar to see panel changes
          </p>
        )}
      </div>
    </div>
  );
};

export const PanelChangeCallback: Story = {
  render: (args: React.ComponentProps<typeof Calendar>) => <PanelChangeCallbackComponent {...args} />,
};
