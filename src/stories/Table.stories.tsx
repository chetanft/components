import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from '../components/organisms/Table';
import type { SortDirection } from '../components/organisms/Table';
import { Badge } from '../components/atoms/Badge/Badge';

const meta: Meta<typeof Table> = {
  title: 'UI Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composable table examples with sortable headers, caption/footer patterns, and common states.',
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
      baseStory: 'ExplorerBase',
      behavior: 'layout',
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { tableType: 'default' } },
            { id: 'with-sorting', label: 'Sortable', story: 'ExplorerBase', args: { tableType: 'sorting' } },
            { id: 'with-footer', label: 'With Footer', story: 'ExplorerBase', args: { tableType: 'footer' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { tableState: 'default' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const tableType = args.tableType ?? 'default';
    if (tableType === 'sorting') {
      return <SortableExample />;
    }
    if (tableType === 'footer') {
      return (
        <div className="p-6">
          <Table>
            <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Quantity</TableHead><TableHead>Price</TableHead></TableRow></TableHeader>
            <TableBody><TableRow><TableCell>Widget A</TableCell><TableCell>10</TableCell><TableCell>$100.00</TableCell></TableRow><TableRow><TableCell>Widget B</TableCell><TableCell>5</TableCell><TableCell>$50.00</TableCell></TableRow></TableBody>
            <TableFooter><TableRow><TableCell colSpan={2} className="text-right font-semibold">Total:</TableCell><TableCell className="font-semibold">$150.00</TableCell></TableRow></TableFooter>
          </Table>
        </div>
      );
    }
    return (
      <div className="p-6">
        <Table>
          <TableCaption>Employee Directory</TableCaption>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            <TableRow><TableCell>John Doe</TableCell><TableCell>john.doe@example.com</TableCell><TableCell>Admin</TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow>
            <TableRow><TableCell>Jane Smith</TableCell><TableCell>jane.smith@example.com</TableCell><TableCell>User</TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow>
            <TableRow><TableCell>Bob Johnson</TableCell><TableCell>bob.johnson@example.com</TableCell><TableCell>Editor</TableCell><TableCell><Badge variant="danger">Inactive</Badge></TableCell></TableRow>
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Table>
        <TableCaption>Employee Directory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell><Badge variant="success">Active</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane.smith@example.com</TableCell>
            <TableCell>User</TableCell>
            <TableCell><Badge variant="success">Active</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob.johnson@example.com</TableCell>
            <TableCell>Editor</TableCell>
            <TableCell><Badge variant="danger">Inactive</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

function SortableExample() {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else setSortDirection('asc');
      return;
    }

    setSortColumn(column);
    setSortDirection('asc');
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection={sortColumn === 'name' ? sortDirection : null} onSort={() => handleSort('name')}>Name</TableHead>
            <TableHead sortable sortDirection={sortColumn === 'email' ? sortDirection : null} onSort={() => handleSort('email')}>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane.smith@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export const WithSorting: Story = {
  render: () => <SortableExample />,
};

export const DocsWithFooter: Story = {
  render: () => (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Widget A</TableCell>
            <TableCell>10</TableCell>
            <TableCell>$100.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Widget B</TableCell>
            <TableCell>5</TableCell>
            <TableCell>$50.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right font-semibold">Total:</TableCell>
            <TableCell className="font-semibold">$150.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),

  parameters: { docsOnly: true },
}