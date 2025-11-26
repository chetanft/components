import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table, TableColumn, TableRow, SortDirection, TableCellText, TableCellItem } from '../components/organisms/Table';
import { Badge } from '../components/atoms/Badge/Badge';
import { Button } from '../components/atoms/Button/Button';
import { Icon } from '../components/atoms/Icons';
import { FileTypeIcon } from '../components/organisms/FileTypeIcon';
import { Chicklet } from '../components/molecules/Chicklet';

// Sample data interface
interface User extends TableRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: Date;
  orders: number;
}

// Sample data with multi-line content
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe\n1234567890',
    email: 'john.doe@example.com\nAdditional info',
    role: 'Admin',
    status: 'Active',
    createdAt: new Date('2023-01-15'),
    orders: 1234
  },
  {
    id: '2',
    name: 'Jane Smith\n0987654321',
    email: 'jane.smith@example.com\nSecondary contact',
    role: 'User',
    status: 'Active',
    createdAt: new Date('2023-02-20'),
    orders: 856
  },
  {
    id: '3',
    name: 'Bob Johnson\n5551234567',
    email: 'bob.johnson@example.com\nWork email',
    role: 'Editor',
    status: 'Inactive',
    createdAt: new Date('2023-01-10'),
    orders: 423
  },
  {
    id: '4',
    name: 'Alice Brown\n9998887777',
    email: 'alice.brown@example.com\nPersonal email',
    role: 'User',
    status: 'Pending',
    createdAt: new Date('2023-03-05'),
    orders: 789
  },
  {
    id: '5',
    name: 'Charlie Wilson\n3334445555',
    email: 'charlie.wilson@example.com\nBusiness contact',
    role: 'Admin',
    status: 'Active',
    createdAt: new Date('2023-02-14'),
    orders: 1567
  }
];

type UserTable = typeof Table<User>;

const meta: Meta<UserTable> = {
  title: 'UI Components/Table',
  component: Table as UserTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive table component built with atomic components, featuring sorting, selection, pagination, and custom cell rendering capabilities based on exact Figma specifications.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<UserTable>;

// Base columns definition
const basicColumns: TableColumn<User>[] = [
  {
    key: 'name',
    title: 'Name',
    type: 'text',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    type: 'text',
    sortable: true
  },
  {
    key: 'role',
    title: 'Role',
    type: 'text',
    sortable: true
  },
  {
    key: 'createdAt',
    title: 'Created',
    type: 'date',
    sortable: true
  },
  {
    key: 'orders',
    title: 'Orders',
    type: 'number',
    sortable: true
  }
];

// Columns with atomic component rendering
const atomicColumns: TableColumn<User>[] = [
  {
    key: 'name',
    title: 'User',
    type: 'text',
    sortable: true,
    render: (value, row) => (
      <TableCellItem
        text={value}
        textType="primary"
        prefixIcon="user"
      />
    )
  },
  {
    key: 'email',
    title: 'Contact',
    type: 'text',
    sortable: true,
    render: (value) => (
      <TableCellItem
        text={value}
        textType="secondary"
        suffixIcon="link"
      />
    )
  },
  {
    key: 'role',
    title: 'Role',
    type: 'text',
    sortable: true,
    render: (value) => (
      <TableCellItem
        badge={
          <Badge 
            variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
          >
            {value}
          </Badge>
        }
      />
    )
  },
  {
    key: 'status',
    title: 'Status',
    render: (value) => {
      const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
      return (
        <TableCellItem
          badge={<Badge variant={variant}>{value}</Badge>}
        />
      );
    }
  },
  {
    key: 'orders',
    title: 'Orders',
    type: 'number',
    sortable: true,
    render: (value) => (
      <TableCellItem
        text={value.toLocaleString()}
        textType="primary"
      />
    )
  },
  {
    key: 'actions',
    title: 'Actions',
    type: 'actions',
    width: '120px',
    render: (_, row) => (
      <TableCellItem
        badge={
          <div className="flex items-center gap-[8px]">
            <Button variant="secondary" size="sm" className="rounded-full">
              <Icon name="edit" size={14} />
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              <Icon name="more" size={14} />
            </Button>
          </div>
        }
      />
    )
  }
];

const extendedUsers: User[] = Array.from({ length: 12 }, (_, index) => {
  const template = sampleUsers[index % sampleUsers.length];
  return {
    ...template,
    id: `${index + 1}`,
    name: `${template.name} ${index + 1}`,
  };
});

const starAccessoryButton = (_row: User, selected: boolean) => (
  <button
    type="button"
    aria-label="Toggle favorite"
    className={`inline-flex items-center justify-center transition-colors ${
      selected
        ? 'text-[var(--warning)]'
        : 'text-[var(--tertiary)]'
    }`}
  >
    <Icon name="star" size={16} />
  </button>
);

const rowActionButtons = () => (
  <>
    <Button
      variant="secondary"
      size="sm"
      icon="more"
      iconPosition="only"
      aria-label="More options"
    />
    <Button
      variant="secondary"
      size="sm"
      icon="chevron-right"
      iconPosition="only"
      aria-label="Go to details"
    />
  </>
);

// Basic table story
export const Default: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers
  }
};

// Selectable table story
export const WithSelection: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    
    return (
      <Table
        {...args}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    );
  },
  args: {
    columns: basicColumns,
    data: sampleUsers,
    selectable: true
  }
};

// Sortable table story
export const WithSorting: Story = {
  render: (args) => {
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [data, setData] = useState(sampleUsers);
    
    const handleSort = (column: string, direction: SortDirection) => {
      setSortColumn(column);
      setSortDirection(direction);
      
      if (!direction) {
        setData(sampleUsers);
        return;
      }
      
      const sortedData = [...sampleUsers].sort((a, b) => {
        const aValue = a[column as keyof User];
        const bValue = b[column as keyof User];
        
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      
      setData(sortedData);
    };
    
    return (
      <Table
        {...args}
        data={data}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    );
  },
  args: {
    columns: basicColumns,
    data: sampleUsers
  }
};

// Advanced table with atomic components
export const WithAtomicComponents: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    
    return (
      <Table
        {...args}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    );
  },
  args: {
    columns: atomicColumns,
    data: sampleUsers,
    selectable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Table showcasing the new atomic components (TableCellText, TableCellItem) for consistent styling and flexible layouts matching Figma specifications.'
      }
    }
  }
};

export const WithAccessoryAndActions: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

    return (
      <Table
        {...args}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    );
  },
  args: {
    columns: basicColumns,
    data: extendedUsers,
    selectable: true,
    rowAccessory: starAccessoryButton,
    rowActions: rowActionButtons,
    rowActionsLabel: 'Actions',
  },
};

// VariantsPrimary story - separate preview for primary variant
export function VariantsPrimary() {
  const [selectedRowsPrimary, setSelectedRowsPrimary] = useState<(string | number)[]>(['2', '4']);

    const figmaColumns: TableColumn<User>[] = [
      {
        key: 'name',
        title: 'Name',
        type: 'text',
        sortable: true,
        render: (value) => (
          <TableCellText type="primary">
            {value}
          </TableCellText>
        )
      },
      {
        key: 'email',
        title: 'Email',
        type: 'text',
        sortable: true,
        render: (value) => (
          <TableCellText type="secondary">
            {value}
          </TableCellText>
        )
      },
      {
        key: 'role',
        title: 'Role',
        type: 'text',
        render: (value) => (
          <TableCellItem
            badge={
              <Badge 
                variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
              >
                {value}
              </Badge>
            }
          />
        )
      },
      {
        key: 'status',
        title: 'Status',
        render: (value) => {
          const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
          return (
            <TableCellItem
              badge={<Badge variant={variant}>{value}</Badge>}
            />
          );
        }
      }
    ];

    return (
      <div className="p-8 bg-white">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Primary Variant</h3>
            <p className="text-sm text-gray-600 mt-1">
              Dark header (#838C9D) with alternating row backgrounds: white → gray → white → gray...
            </p>
          </div>
          <Table
            variant="primary"
            columns={figmaColumns}
            data={sampleUsers.slice(0, 6)}
            selectable
            selectedRows={selectedRowsPrimary}
            onSelectionChange={setSelectedRowsPrimary}
            className="max-w-5xl"
          />
          <div className="text-sm text-gray-500">
            Selected rows: {selectedRowsPrimary.length} of {sampleUsers.slice(0, 6).length}
          </div>
        </div>
      </div>
    );
}

// VariantsSecondary story - separate preview for secondary variant
export function VariantsSecondary() {
  const [selectedRowsSecondary, setSelectedRowsSecondary] = useState<(string | number)[]>(['1']);

    const figmaColumns: TableColumn<User>[] = [
      {
        key: 'name',
        title: 'Name',
        type: 'text',
        sortable: true,
        render: (value) => (
          <TableCellText type="primary">
            {value}
          </TableCellText>
        )
      },
      {
        key: 'email',
        title: 'Email',
        type: 'text',
        sortable: true,
        render: (value) => (
          <TableCellText type="secondary">
            {value}
          </TableCellText>
        )
      },
      {
        key: 'role',
        title: 'Role',
        type: 'text',
        render: (value) => (
          <TableCellItem
            badge={
              <Badge 
                variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
              >
                {value}
              </Badge>
            }
          />
        )
      },
      {
        key: 'status',
        title: 'Status',
        render: (value) => {
          const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
          return (
            <TableCellItem
              badge={<Badge variant={variant}>{value}</Badge>}
            />
          );
        }
      }
    ];

    return (
      <div className="p-8 bg-white">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Secondary Variant</h3>
            <p className="text-sm text-gray-600 mt-1">
              Light header (#F8F8F9) with all white row backgrounds for a cleaner, minimal appearance.
            </p>
          </div>
          <Table
            variant="secondary"
            columns={figmaColumns}
            data={sampleUsers.slice(0, 6)}
            selectable
            selectedRows={selectedRowsSecondary}
            onSelectionChange={setSelectedRowsSecondary}
            className="max-w-5xl"
          />
          <div className="text-sm text-gray-500">
            Selected rows: {selectedRowsSecondary.length} of {sampleUsers.slice(0, 6).length}
          </div>
        </div>
      </div>
    );
} 