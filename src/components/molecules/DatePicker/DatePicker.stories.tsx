import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Date picker component for selecting single dates or date ranges. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
    explorer: {
      mode: 'matrix' as const,
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' },
            { id: 'range', label: 'Range', story: 'Default', args: { range: true } },
            { id: 'custom-quick', label: 'Custom Quick Select', story: 'Default', args: { range: true, quickSelectOptions: [{ label: 'Last 7 days', value: 'last-7-days' }, { label: 'Last 30 days', value: 'last-30-days' }] } },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'xxs', label: 'XXS', story: 'Default', args: { size: 'xxs' } },
            { id: 'xs', label: 'XS', story: 'Default', args: { size: 'xs' } },
            { id: 'sm', label: 'SM', story: 'Default', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'Default', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'Default', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'Default', args: { size: 'xl' } },
            { id: 'xxl', label: 'XXL', story: 'Default', args: { size: 'xxl' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' },
            { id: 'value', label: 'With Value', story: 'Default', args: { value: '15/01/2024' } },
            { id: 'error', label: 'Error', story: 'Default', args: { error: true } },
            { id: 'disabled', label: 'Disabled', story: 'Default', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Size of the date picker',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    placeholder: 'DD/MM/YYYY',
  },
};

/** All size variants displayed side-by-side. */
export const DocsVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-12 text-sm text-[var(--tertiary)]">{size.toUpperCase()}</span>
          <DatePicker placeholder="DD/MM/YYYY" size={size} />
        </div>
      ))}
      <div className="flex items-center gap-3">
        <span className="w-12 text-sm text-[var(--tertiary)]">Range</span>
        <DatePicker placeholder="DD/MM/YYYY" range />
      </div>
    </div>
  ),

  parameters: { docsOnly: true },
}