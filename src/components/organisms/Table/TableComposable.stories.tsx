import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from './index';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table/Composable API',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shadcn-compatible composable Table API. Use TableHeader, TableHead, TableBody, TableRow, and TableCell for full control over table structure.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export function Default() {
  return (
    <div className="border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden">
      <Table>
        <TableHeader
          columns={[
            { key: 'name', title: 'Name' },
            { key: 'status', title: 'Status' },
            { key: 'actions', title: 'Actions' }
          ]}
        />
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>
              <Badge>Active</Badge>
            </TableCell>
            <TableCell>
              <Button variant="text" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>
              <Badge>Inactive</Badge>
            </TableCell>
            <TableCell>
              <Button variant="text" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function WithCustomCells() {
  return (
    <div className="border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden">
      <Table>
        <TableHeader
          columns={[
            { key: 'name', title: 'Name' },
            { key: 'status', title: 'Status' },
            { key: 'score', title: 'Score' }
          ]}
        />
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-sm text-[var(--secondary)]">john@example.com</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge>Active</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-semibold">95%</span>
                <div className="w-16 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)]" style={{ width: '95%' }} />
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary-500)] flex items-center justify-center text-white text-sm font-semibold">
                  JS
                </div>
                <div>
                  <div className="font-semibold">Jane Smith</div>
                  <div className="text-sm text-[var(--secondary)]">jane@example.com</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge>Pending</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="font-semibold">87%</span>
                <div className="w-16 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--primary)]" style={{ width: '87%' }} />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export function WithTableHead() {
  return (
    <div className="border border-[var(--border-primary)] rounded-[var(--radius-md)] overflow-hidden">
      <Table>
        <TableHeader
          columns={[
            { key: 'name', title: 'Name', sortable: true },
            { key: 'status', title: 'Status' }
          ]}
          sortColumn="name"
          sortDirection="asc"
        />
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell><Badge>Active</Badge></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell><Badge>Inactive</Badge></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

