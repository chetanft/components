import type { Meta, StoryObj } from '@storybook/react';
import { Empty, EmptyPresets } from './Empty';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Dropdown, DropdownTrigger, DropdownContent } from '../Dropdown/index';
import { DropdownMenu } from '../DropdownMenu';
import { DatePicker } from '../DatePicker/DatePicker';

const meta: Meta<typeof Empty> = {
  title: 'Molecules/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
    explorer: {
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: { image: 'default' } },
            { id: 'simple', label: 'Simple', story: 'ExplorerBase' as const, args: { image: 'simple' } },
            { id: 'no-data', label: 'No Data', story: 'ExplorerBase' as const, args: { image: 'no-data' } },
            { id: 'error', label: 'Error', story: 'ExplorerBase' as const, args: { image: 'error' } },
          ],
        },
        {
          id: 'content',
          label: 'Content',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: {} },
            { id: 'with-description', label: 'With Description', story: 'ExplorerBase' as const, args: { description: 'No data available at the moment' } },
            { id: 'with-actions', label: 'With Actions', story: 'ExplorerBase' as const, args: { withActions: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'select',
      options: ['default', 'simple', 'no-data', 'error'],
      description: 'Image variant type or custom React node',
    },
    description: {
      control: 'text',
      description: 'Description text or React node to display',
    },
    children: {
      control: false,
      description: 'Action buttons or content below description',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const image = args.image ?? 'default';
    const description = args.description;
    const withActions = args.withActions;
    const syncKey = JSON.stringify({ image, description, withActions });
    return (
      <div key={syncKey}>
        <Empty image={image} description={description}>
          {withActions && <Button variant="primary">Start Shopping</Button>}
        </Empty>
      </div>
    );
  },
};

export const Default: Story = {
  args: {},
};

export const DocsWithDescription: Story = {
  args: {
    description: 'No data available at the moment',
  },

  parameters: { docsOnly: true },
}