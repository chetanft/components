import type { Meta, StoryObj } from '@storybook/react';
import { Rate, RateItem, RateIcon } from './index';
import { useState } from 'react';
import type { ComponentProps } from 'react';

const meta: Meta<typeof Rate> = {
  title: 'Molecules/Rate',
  component: Rate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '🆕 NEW: Star rating component built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: { type: 'number', min: 1, max: 10 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    allowHalf: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rate>;
type RateStoryProps = ComponentProps<typeof Rate>;

const ControlledRateStory = (props: RateStoryProps) => {
  const [value, setValue] = useState(3);

  return (
    <div className="flex flex-col gap-4 items-center">
      <Rate {...props} value={value} onChange={setValue} />
      <p className="text-sm text-[var(--secondary)]">
        Current rating: {value} stars
      </p>
    </div>
  );
};

/** @deprecated Use composable API instead. */
export const LegacyDefault: Story = {
  args: {
    defaultValue: 3,
  },
};

/** @deprecated Use composable API instead. */
export const LegacySizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="w-16 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Small
        </span>
        <Rate size="sm" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Medium
        </span>
        <Rate size="md" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          Large
        </span>
        <Rate size="lg" defaultValue={3} />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-[var(--tertiary)]" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
          {/* 14px → 1rem (responsive) */}
          XLarge
        </span>
        <Rate size="xl" defaultValue={3} />
      </div>
    </div>
  ),
};

/** @deprecated Use composable API instead. */
export const LegacyHalfStars: Story = {
  args: {
    allowHalf: true,
    defaultValue: 2.5,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyWithTooltips: Story = {
  args: {
    tooltips: ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'],
    defaultValue: 3,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyDisabled: Story = {
  args: {
    disabled: true,
    defaultValue: 4,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 4.5,
    allowHalf: true,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyCustomCount: Story = {
  args: {
    count: 10,
    defaultValue: 7,
  },
};

/** @deprecated Use composable API instead. */
export const LegacyControlled: Story = {
  render: (args: React.ComponentProps<typeof Rate>) => <ControlledRateStory {...args} />,
};

// Composable API Examples
function ComposableBasicComponent() {
  const [value, setValue] = useState(3);
  return (
    <Rate value={value} onChange={setValue} count={5} size="md">
      {Array.from({ length: 5 }, (_, i) => (
        <RateItem key={i} index={i}>
          <RateIcon index={i} />
        </RateItem>
      ))}
    </Rate>
  );
}

export const Default: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithHalfStarsComponent() {
  const [value, setValue] = useState(2.5);
  return (
    <Rate value={value} onChange={setValue} count={5} size="md" allowHalf>
      {Array.from({ length: 5 }, (_, i) => (
        <RateItem key={i} index={i}>
          <RateIcon index={i} />
        </RateItem>
      ))}
    </Rate>
  );
}

export const WithHalfStars: Story = {
  render: () => <ComposableWithHalfStarsComponent />,
};

function ComposableWithTooltipsComponent() {
  const [value, setValue] = useState(3);
  const tooltips = ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'];
  return (
    <Rate value={value} onChange={setValue} count={5} size="md" tooltips={tooltips}>
      {Array.from({ length: 5 }, (_, i) => (
        <RateItem key={i} index={i}>
          <RateIcon index={i} />
        </RateItem>
      ))}
    </Rate>
  );
}

export const WithTooltips: Story = {
  render: () => <ComposableWithTooltipsComponent />,
};

function ComposableCustomCharacterComponent() {
  const [value, setValue] = useState(4);
  return (
    <Rate value={value} onChange={setValue} count={5} size="lg">
      {Array.from({ length: 5 }, (_, i) => (
        <RateItem key={i} index={i}>
          <RateIcon index={i} />
        </RateItem>
      ))}
    </Rate>
  );
}

export const CustomCharacter: Story = {
  render: () => <ComposableCustomCharacterComponent />,
};

export const Disabled: Story = {
  render: () => (
    <Rate value={4} count={5} size="md" disabled>
      {Array.from({ length: 5 }, (_, i) => (
        <RateItem key={i} index={i}>
          <RateIcon index={i} />
        </RateItem>
      ))}
    </Rate>
  ),
};
