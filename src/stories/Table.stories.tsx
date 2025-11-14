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

// Sample data
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    createdAt: new Date('2023-01-15'),
    orders: 1234
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    createdAt: new Date('2023-02-20'),
    orders: 856
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Editor',
    status: 'Inactive',
    createdAt: new Date('2023-01-10'),
    orders: 423
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Pending',
    createdAt: new Date('2023-03-05'),
    orders: 789
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
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
            size="sm"
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
          badge={<Badge variant={variant} size="sm">{value}</Badge>}
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
    className={`inline-flex size-8 items-center justify-center rounded-full border border-[var(--border_primary,#ced1d7)] bg-[var(--bg_primary,#ffffff)] transition-colors ${
      selected
        ? 'text-[var(--primary,#434f64)]'
        : 'text-[var(--tertiary,#838c9d)]'
    }`}
  >
    <Icon name="star" size={14} />
  </button>
);

const rowActionButtons = () => (
  <>
    <Button
      variant="secondary"
      size="sm"
      className="size-8 rounded-full !p-0"
      aria-label="More options"
    >
      <Icon name="more" size={14} />
    </Button>
    <Button
      variant="secondary"
      size="sm"
      className="size-8 rounded-full !p-0"
      aria-label="Go to details"
    >
      <Icon name="chevron-right" size={14} />
    </Button>
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
    const [currentPage, setCurrentPage] = useState(1);
    const data = args.data ?? extendedUsers;
    const pageSize = 5;
    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    return (
      <Table
        {...args}
        data={data}
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        pagination={{
          currentPage,
          totalPages,
          pageSize,
          totalItems,
          onPageChange: setCurrentPage,
        }}
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

export const FigmaVariants: Story = {
  render: () => {
    const [selectedRowsPrimary, setSelectedRowsPrimary] = useState<(string | number)[]>(['2', '4']);
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
                size="sm"
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
              badge={<Badge variant={variant} size="sm">{value}</Badge>}
            />
          );
        }
      }
    ];

    return (
      <div className="p-8 bg-white space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Table Variants - Exact Figma Implementation</h2>
          <p className="text-gray-600 mb-8">
            Primary and Secondary table variants matching the exact Figma specifications with proper alternating row colors, 
            header styles, and atomic cell components.
          </p>
        </div>

        {/* Primary Variant */}
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

        {/* Secondary Variant */}
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

        {/* Design Specifications */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-4">Figma Design Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Primary Variant</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Header: Dark background (#838C9D) with white text</li>
                <li>• Row pattern: White (#FFFFFF) → Gray (#F8F8F9) alternating</li>
                <li>• Cell padding: 32px vertical, 20px right, 8px left</li>
                <li>• Border: Single line (#CED1D7) between rows</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Secondary Variant</h5>
              <ul className="space-y-1 text-gray-600">
                <li>• Header: Light background (#F8F8F9) with dark text</li>
                <li>• Row pattern: All white (#FFFFFF) backgrounds</li>
                <li>• Cell padding: 32px vertical, 20px right, 8px left</li>
                <li>• Border: Single line (#CED1D7) between rows</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}; 