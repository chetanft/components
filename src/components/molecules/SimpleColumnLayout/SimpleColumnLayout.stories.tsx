import type { Meta, StoryObj } from '@storybook/react';
import { SimpleColumnLayout } from './SimpleColumnLayout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../organisms/Table';

const meta: Meta<typeof SimpleColumnLayout> = {
  title: 'Molecules/SimpleColumnLayout',
  component: SimpleColumnLayout,
  tags: ['autodocs'],
  args: {
    glass: true,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Simple two-column layout component for displaying label-value pairs.',
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
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  argTypes: {
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleColumnLayout>;

export const Default: Story = {
  render: () => (
    <div>
      <p className="text-sm text-[var(--tertiary)] mb-4">
        SimpleColumnLayout is deprecated. Use Table directly instead:
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

