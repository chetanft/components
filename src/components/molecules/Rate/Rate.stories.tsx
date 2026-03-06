import type { Meta, StoryObj } from '@storybook/react';
import { Rate, RateItem, RateIcon } from './index';
import { useState } from 'react';
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
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'half', label: 'Half Stars', story: 'ExplorerBase', args: { contentType: 'half' } },
            { id: 'tooltips', label: 'With Tooltips', story: 'ExplorerBase', args: { contentType: 'tooltips' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { disabled: false } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const disabled = Boolean(args.disabled);
    const [value, setValue] = useState(contentType === 'half' ? 2.5 : 3);
    const syncKey = JSON.stringify({ contentType, disabled });
    const tooltips = contentType === 'tooltips' ? ['Terrible', 'Bad', 'Normal', 'Good', 'Excellent'] : undefined;
    return (
      <div key={syncKey}>
        <Rate
          value={value}
          onChange={disabled ? undefined : setValue}
          count={5}
          size="md"
          disabled={disabled}
          allowHalf={contentType === 'half'}
          tooltips={tooltips}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <RateItem key={i} index={i}>
              <RateIcon index={i} />
            </RateItem>
          ))}
        </Rate>
      </div>
    );
  },
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

/** All size variants displayed side-by-side. */
export const DocsVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-16 text-sm text-[var(--tertiary)]">{size.toUpperCase()}</span>
          <Rate value={3} count={5} size={size}>
            {Array.from({ length: 5 }, (_, i) => (
              <RateItem key={i} index={i}>
                <RateIcon index={i} />
              </RateItem>
            ))}
          </Rate>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <span className="w-16 text-sm text-[var(--tertiary)]">Half</span>
        <Rate value={2.5} count={5} size="md" allowHalf>
          {Array.from({ length: 5 }, (_, i) => (
            <RateItem key={i} index={i}>
              <RateIcon index={i} />
            </RateItem>
          ))}
        </Rate>
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}