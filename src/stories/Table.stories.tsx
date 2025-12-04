import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { 
  Table, 
  TableCellText, 
  TableCellItem, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableCaption, 
  TableFooter 
} from '../components/organisms/Table';
import type { TableColumn, TableRowData, SortDirection } from '../components/organisms/Table';
import { Badge } from '../components/atoms/Badge/Badge';
import { Button } from '../components/atoms/Button/Button';
import { Icon, type IconName } from '../components/atoms/Icons';
import { Typography } from '../components/atoms/Typography';

// Sample data interface
interface User extends TableRowData {
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
    header: 'Name',
    type: 'text',
    sortable: true
  },
  {
    key: 'email',
    header: 'Email',
    type: 'text',
    sortable: true
  },
  {
    key: 'role',
    header: 'Role',
    type: 'text',
    sortable: true
  },
  {
    key: 'createdAt',
    header: 'Created',
    type: 'date',
    sortable: true
  },
  {
    key: 'orders',
    header: 'Orders',
    type: 'number',
    sortable: true
  }
];

// Columns with atomic component rendering
const atomicColumns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'User',
    type: 'text',
    sortable: true,
    render: (value) => (
      <TableCellItem
        text={String(value)}
        textType="primary"
        leadingIcon="user"
      />
    )
  },
  {
    key: 'email',
    header: 'Contact',
    type: 'text',
    sortable: true,
    render: (value) => (
      <TableCellItem
        text={String(value)}
        textType="secondary"
        trailingIcon="link"
      />
    )
  },
  {
    key: 'role',
    header: 'Role',
    type: 'text',
    sortable: true,
    render: (value) => (
      <TableCellItem
        badge={
          <Badge
            variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
          >
            {String(value)}
          </Badge>
        }
      />
    )
  },
  {
    key: 'status',
    header: 'Status',
    render: (value) => {
      const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
      return (
        <TableCellItem
          badge={<Badge variant={variant}>{String(value)}</Badge>}
        />
      );
    }
  },
  {
    key: 'orders',
    header: 'Orders',
    type: 'number',
    sortable: true,
    render: (value) => (
      <TableCellItem
        text={typeof value === 'number' ? value.toLocaleString() : String(value)}
        textType="primary"
      />
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    type: 'actions',
    width: 'calc(var(--spacing-x10)*3)',
    render: () => (
      <TableCellItem
        badge={
          <div className="flex items-center gap-[var(--spacing-x2)]">
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
    className={`inline-flex items-center justify-center transition-colors ${selected
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
      className="rounded-full"
      aria-label="More options"
    />
    <Button
      variant="secondary"
      size="sm"
      icon="chevron-right"
      iconPosition="only"
      className="rounded-full"
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
const WithSelectionStoryComponent = (args: React.ComponentProps<UserTable>) => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  return (
    <Table
      {...args}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
  );
};

export const WithSelection: Story = {
  render: (args: React.ComponentProps<UserTable>) => <WithSelectionStoryComponent {...args} />,
  args: {
    columns: basicColumns,
    data: sampleUsers,
    selectable: true
  }
};

// Sortable table story
const WithSortingStoryComponent = (args: React.ComponentProps<UserTable>) => {
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
};

export const WithSorting: Story = {
  render: (args: React.ComponentProps<UserTable>) => <WithSortingStoryComponent {...args} />,
  args: {
    columns: basicColumns,
    data: sampleUsers
  }
};

// Advanced table with atomic components
const WithAtomicComponentsStoryComponent = (args: React.ComponentProps<UserTable>) => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  return (
    <Table
      {...args}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
  );
};

export const WithAtomicComponents: Story = {
  render: (args: React.ComponentProps<UserTable>) => <WithAtomicComponentsStoryComponent {...args} />,
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

const WithAccessoryAndActionsStoryComponent = (args: React.ComponentProps<UserTable>) => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  return (
    <Table
      {...args}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
  );
};

export const WithAccessoryAndActions: Story = {
  render: (args: React.ComponentProps<UserTable>) => <WithAccessoryAndActionsStoryComponent {...args} />,
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
      header: 'Name',
      type: 'text',
      sortable: true,
      render: (value) => (
        <TableCellText type="primary">
          {String(value)}
        </TableCellText>
      )
    },
    {
      key: 'email',
      header: 'Email',
      type: 'text',
      sortable: true,
      render: (value) => (
        <TableCellText type="secondary">
          {String(value)}
        </TableCellText>
      )
    },
    {
      key: 'role',
      header: 'Role',
      type: 'text',
      render: (value) => (
        <TableCellItem
          badge={
            <Badge
              variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
            >
              {String(value)}
            </Badge>
          }
        />
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => {
        const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
        return (
          <TableCellItem
            badge={<Badge variant={variant}>{String(value)}</Badge>}
          />
        );
      }
    }
  ];

  return (
    <div className="p-8 bg-[var(--color-bg-primary)]">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)]">Primary Variant</h3>
          <p className="text-sm text-[var(--color-tertiary)] mt-1">
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
        <div className="text-sm text-[var(--color-tertiary)]">
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
      header: 'Name',
      type: 'text',
      sortable: true,
      render: (value) => (
        <TableCellText type="primary">
          {String(value)}
        </TableCellText>
      )
    },
    {
      key: 'email',
      header: 'Email',
      type: 'text',
      sortable: true,
      render: (value) => (
        <TableCellText type="secondary">
          {String(value)}
        </TableCellText>
      )
    },
    {
      key: 'role',
      header: 'Role',
      type: 'text',
      render: (value) => (
        <TableCellItem
          badge={
            <Badge
              variant={value === 'Admin' ? 'danger' : value === 'Editor' ? 'warning' : 'normal'}
            >
              {String(value)}
            </Badge>
          }
        />
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => {
        const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'neutral';
        return (
          <TableCellItem
            badge={<Badge variant={variant}>{String(value)}</Badge>}
          />
        );
      }
    }
  ];

  return (
    <div className="p-8 bg-[var(--color-bg-primary)]">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary)]">Secondary Variant</h3>
          <p className="text-sm text-[var(--color-tertiary)] mt-1">
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
        <div className="text-sm text-[var(--color-tertiary)]">
          Selected rows: {selectedRowsSecondary.length} of {sampleUsers.slice(0, 6).length}
        </div>
      </div>
    </div>
  );
}

// Journey Table Data Interface (based on Figma design)
interface JourneyRow extends TableRowData {
  id: string;
  feedUniqueId: string;
  journeyId?: string;
  from: {
    location: string;
    badge?: string;
    company: string;
  };
  to: {
    location: string;
    badge?: string;
    company: string;
  };
  vehicleInfo: {
    number: string;
    transporter: string;
    hasAvatar?: boolean;
  };
  tripInfo: {
    type: 'SIM' | 'GPS' | 'Fastag';
    simNumber: string;
    status: 'active' | 'warning' | 'critical';
  };
  status: {
    state: 'On Road' | 'At Drop' | 'At Pickup';
    location: string;
  };
  sla: {
    status: 'On time' | 'Delayed by 13 hr';
    eta: string;
  };
  alerts?: {
    type: 'Long Stoppage' | 'Route Deviation' | 'Transit Delay';
    timestamp: string;
  };
}

// Sample journey data matching Figma design
const journeyData: JourneyRow[] = [
  {
    id: '1',
    feedUniqueId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      badge: '+1 P',
      company: 'MDC Labs ltd'
    },
    to: {
      location: 'Mumbai, Mahara...',
      badge: '+3 D',
      company: 'Maa kaali Distributors'
    },
    vehicleInfo: {
      number: 'PB09 HH 6439',
      transporter: 'Yonex Transporter',
      hasAvatar: false
    },
    tripInfo: {
      type: 'SIM',
      simNumber: '84973-47593',
      status: 'active'
    },
    status: {
      state: 'On Road',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'On time',
      eta: 'ETA: 12:30 pm, 12 Aug'
    }
  },
  {
    id: '2',
    feedUniqueId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      badge: '+1 P',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telan..',
      badge: '+2 D',
      company: 'Jai Sri Ram'
    },
    vehicleInfo: {
      number: 'KA12 AS 3421',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: true
    },
    tripInfo: {
      type: 'SIM',
      simNumber: '84973-47593',
      status: 'active'
    },
    status: {
      state: 'At Drop',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'On time',
      eta: 'ETA: 12:30 pm, 12 Aug'
    }
  },
  {
    id: '3',
    feedUniqueId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: {
      number: 'KA12 AS 3422',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: true
    },
    tripInfo: {
      type: 'GPS',
      simNumber: '84973-47593',
      status: 'active'
    },
    status: {
      state: 'At Pickup',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'Delayed by 13 hr',
      eta: 'ETA: 12:30 pm, 12 Aug'
    },
    alerts: {
      type: 'Long Stoppage',
      timestamp: '1 hour ago'
    }
  },
  {
    id: '4',
    feedUniqueId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: {
      number: 'KA12 AS 3423',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: false
    },
    tripInfo: {
      type: 'Fastag',
      simNumber: '84973-47593',
      status: 'critical'
    },
    status: {
      state: 'At Drop',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'Delayed by 13 hr',
      eta: 'ETA: 12:30 pm, 12 Aug'
    },
    alerts: {
      type: 'Route Deviation',
      timestamp: '1 hour ago'
    }
  },
  {
    id: '5',
    feedUniqueId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: {
      number: 'KA12 AS 3424',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: true
    },
    tripInfo: {
      type: 'GPS',
      simNumber: '84973-47593',
      status: 'warning'
    },
    status: {
      state: 'On Road',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'On time',
      eta: 'at 12:30 pm, 12 Aug'
    }
  },
  {
    id: '6',
    feedUniqueId: 'JRN-WER3444456665234',
    journeyId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: {
      number: 'KA12 AS 3424',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: true
    },
    tripInfo: {
      type: 'GPS',
      simNumber: '84973-47593',
      status: 'warning'
    },
    status: {
      state: 'On Road',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'Delayed by 13 hr',
      eta: 'ETA: 12:30 pm, 12 Aug'
    },
    alerts: {
      type: 'Transit Delay',
      timestamp: '1 hour ago'
    }
  },
  {
    id: '7',
    feedUniqueId: 'JRN-WER3444456665234',
    journeyId: '324673-9488478-8484',
    from: {
      location: 'Amritsar, Punjab',
      company: 'MDC Labs LTD'
    },
    to: {
      location: 'Secunderabad, Telangana',
      company: 'Sai Traders'
    },
    vehicleInfo: {
      number: 'KA12 AS 3423',
      transporter: 'Laal Kamal Transporter',
      hasAvatar: false
    },
    tripInfo: {
      type: 'Fastag',
      simNumber: '84973-47593',
      status: 'critical'
    },
    status: {
      state: 'On Road',
      location: 'Ambala, Haryana'
    },
    sla: {
      status: 'Delayed by 13 hr',
      eta: 'ETA: 12:30 pm, 12 Aug'
    },
    alerts: {
      type: 'Transit Delay',
      timestamp: '1 hour ago'
    }
  }
];

// Journey Table Component
function JourneyTableComponent() {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const journeyColumns: TableColumn<JourneyRow>[] = [
      {
        key: 'feedUniqueId',
        header: 'Feed Unique ID',
        render: (value, row) => (
          <div className="flex flex-col gap-[8px] items-start">
            <TableCellText type="primary" className="overflow-hidden text-ellipsis whitespace-nowrap w-[177px]">
              {row.journeyId || row.feedUniqueId}
            </TableCellText>
            {row.journeyId && (
              <TableCellText type="secondary" className="overflow-hidden text-ellipsis whitespace-nowrap w-[177px]">
                {row.feedUniqueId}
              </TableCellText>
            )}
            {!row.journeyId && (
              <button
                className="text-[var(--neutral,#1890ff)] text-[16px] font-medium leading-[1.4] cursor-pointer hover:opacity-80 text-left self-start"
                style={{ fontFamily: 'var(--font-family-primary, "Inter", sans-serif)' }}
              >
                View ID's
              </button>
            )}
          </div>
        )
      },
      {
        key: 'from',
        header: 'From',
        render: (value, row) => (
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[4px] items-center">
              <TableCellText type="primary" className="overflow-hidden text-ellipsis whitespace-nowrap">
                {row.from.location}
              </TableCellText>
              {row.from.badge && (
                <Badge
                  variant="default"
                  size="sm"
                  className="bg-[var(--border-secondary,#f0f1f7)] border border-[var(--border-primary,#ced1d7)] px-[8px] py-[2px]"
                >
                  {row.from.badge}
                </Badge>
              )}
            </div>
            <TableCellText type="secondary" className="whitespace-pre-wrap">
              {row.from.company}
            </TableCellText>
          </div>
        )
      },
      {
        key: 'to',
        header: 'To',
        render: (value, row) => (
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[4px] items-center">
              <TableCellText type="primary" className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {row.to.location}
              </TableCellText>
              {row.to.badge && (
                <Badge
                  variant="default"
                  size="sm"
                  className="bg-[var(--border-secondary,#f0f1f7)] border border-[var(--border-primary,#ced1d7)] px-[8px] py-[2px]"
                >
                  {row.to.badge}
                </Badge>
              )}
            </div>
            <TableCellText type="secondary" className="overflow-hidden text-ellipsis whitespace-nowrap">
              {row.to.company}
            </TableCellText>
          </div>
        )
      },
      {
        key: 'vehicleInfo',
        header: 'Vehicle Info',
        render: (value, row) => (
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px] items-center">
              <TableCellText type="primary">
                {row.vehicleInfo.number}
              </TableCellText>
              {row.vehicleInfo.hasAvatar && (
                <div className="relative size-[30px] shrink-0">
                  <div className="absolute inset-0 bg-[var(--border-secondary,#f0f1f7)] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="vehicle" size={16} color="var(--secondary,#5f697b)" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-[1px] items-center">
              <TableCellText type="secondary" className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {row.vehicleInfo.transporter}
              </TableCellText>
              <Icon name="chevron-right" size={16} color="var(--primary,#434f64)" />
            </div>
          </div>
        )
      },
      {
        key: 'tripInfo',
        header: 'Trip Info',
        render: (value, row) => {
          const tripIconMap: Record<string, IconName> = {
            'SIM': 'sim',
            'GPS': 'gps',
            'Fastag': 'gps' // Using gps as placeholder - Fastag icon may need to be added
          };
          
          const statusBadgeMap: Record<string, { bg: string; icon: IconName; iconColor: string }> = {
            'active': { bg: 'bg-[var(--positive-light,#dfffe8)]', icon: 'check', iconColor: 'var(--positive-dark,#00763d)' },
            'warning': { bg: 'bg-[var(--warning-light,#ffebdc)]', icon: 'alert-critical', iconColor: 'var(--warning,#ff6c19)' },
            'critical': { bg: 'bg-[var(--critical-light,#ffeaea)]', icon: 'alert-critical', iconColor: 'var(--critical,#ff3533)' }
          };

          const statusBadge = statusBadgeMap[row.tripInfo.status];

          return (
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <Icon name={tripIconMap[row.tripInfo.type] as IconName} size={14} color="var(--primary,#434f64)" />
                <TableCellText type="primary">
                  {row.tripInfo.type}
                </TableCellText>
              </div>
              <div className="flex gap-[8px] items-center">
                <div className="flex gap-[8px] items-center">
                  <Icon name="sim" size={16} color="var(--tertiary,#838c9d)" />
                  <TableCellText type="secondary">
                    {row.tripInfo.simNumber}
                  </TableCellText>
                </div>
                <div className={`${statusBadge.bg} flex items-center justify-center p-[4px] rounded-[16px]`}>
                  <Icon name={statusBadge.icon as IconName} size={14} color={statusBadge.iconColor} />
                </div>
              </div>
            </div>
          );
        }
      },
      {
        key: 'status',
        header: 'Status',
        render: (value, row) => {
          const statusIconMap: Record<string, IconName> = {
            'On Road': 'road',
            'At Drop': 'location',
            'At Pickup': 'location'
          };

          return (
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <Icon name={statusIconMap[row.status.state] as IconName} size={14} color="var(--primary,#434f64)" />
                <TableCellText type="primary">
                  {row.status.state}
                </TableCellText>
              </div>
              <div className="flex gap-[8px] items-center">
                <Icon name="location" size={14} color="var(--tertiary,#838c9d)" />
                <TableCellText type="secondary" className="w-[140px] whitespace-pre-wrap">
                  {row.status.location}
                </TableCellText>
              </div>
            </div>
          );
        }
      },
      {
        key: 'sla',
        header: 'SLA',
        render: (value, row) => {
          const isOnTime = row.sla.status === 'On time';
          const statusColor = isOnTime ? 'var(--positive,#00c638)' : 'var(--critical,#ff3533)';
          const gap = isOnTime ? 'gap-[6px]' : 'gap-[5px]';

          return (
            <div className={`flex flex-col ${gap} leading-[1.4]`}>
              <Typography
                variant="body-secondary-semibold"
                style={{ color: statusColor, fontSize: 'var(--font-size-sm-rem)' }}
              >
                {row.sla.status}
              </Typography>
              <TableCellText type="secondary" className="w-[200px] whitespace-pre-wrap">
                {row.sla.eta}
              </TableCellText>
            </div>
          );
        }
      },
      {
        key: 'alerts',
        header: 'Alerts',
        render: (value, row) => {
          if (!row.alerts) {
            return <div className="flex-1 h-[52px]" />;
          }

          const alertBadgeMap: Record<string, { bg: string; textColor: string }> = {
            'Long Stoppage': { bg: 'bg-[var(--critical-light,#ffeaea)]', textColor: 'var(--critical,#ff3533)' },
            'Route Deviation': { bg: 'bg-[var(--critical-light,#ffeaea)]', textColor: 'var(--critical,#ff3533)' },
            'Transit Delay': { bg: 'bg-[var(--critical-light,#ffeaea)]', textColor: 'var(--critical,#ff3533)' }
          };

          const alertBadge = alertBadgeMap[row.alerts.type];

          return (
            <div className="flex flex-col gap-[8px] items-start">
              <Badge
                variant="error"
                size="sm"
                className={`${alertBadge.bg} px-[8px] py-[2px] w-fit self-start`}
                style={{ color: alertBadge.textColor }}
              >
                {row.alerts.type}
              </Badge>
              <TableCellText type="secondary" className="w-[140px] whitespace-pre-wrap">
                {row.alerts.timestamp}
              </TableCellText>
            </div>
          );
        }
      },
      {
        key: 'actions',
        header: 'Actions',
        type: 'actions',
        render: () => (
          <div className="flex gap-[12px] items-center">
            <Button
              variant="secondary"
              size="sm"
              icon="add"
              iconPosition="only"
              className="rounded-full size-[40px] border border-[var(--border-primary,#ced1d7)]"
            />
            <Button
              variant="secondary"
              size="sm"
              icon="chevron-right"
              iconPosition="only"
              className="rounded-full size-[40px] border border-[var(--border-primary,#ced1d7)]"
            />
          </div>
        )
      }
    ];

    return (
      <div className="p-8 bg-[var(--bg-primary)]">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-[var(--primary)]">Journey Table</h3>
            <p className="text-sm text-[var(--tertiary)] mt-1">
              Comprehensive journey tracking table with vehicle info, trip status, SLA monitoring, and alerts.
            </p>
          </div>
          <div className="overflow-x-auto -mx-8 px-8">
            <div className="min-w-[1400px]">
              <Table
                variant="primary"
                columns={journeyColumns}
                data={journeyData}
                selectable
                selectedRows={selectedRows}
                onSelectionChange={setSelectedRows}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export const JourneyTable: Story = {
  render: () => <JourneyTableComponent />
};

// Secondary header variant story
export const SecondaryVariant: Story = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with secondary header variant - light gray header background with dark text, and all white cell backgrounds (no alternating rows).'
      }
    }
  }
};

// Column reordering story
const WithColumnReorderStoryComponent = (args: React.ComponentProps<UserTable>) => {
  const [columns, setColumns] = useState<TableColumn<User>[]>(basicColumns);
  
  return (
    <Table
      {...args}
      columns={columns}
      reorderable={true}
      onColumnReorder={(newColumns) => setColumns(newColumns)}
    />
  );
};

export const WithColumnReorder: Story = {
  render: (args: React.ComponentProps<UserTable>) => <WithColumnReorderStoryComponent {...args} />,
  args: {
    columns: basicColumns,
    data: sampleUsers,
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with column reordering enabled. Drag column headers to reorder columns. The column order is maintained via the onColumnReorder callback.'
      }
    }
  }
};

// Secondary variant with column reordering
const SecondaryWithReorderStoryComponent = (args: React.ComponentProps<UserTable>) => {
  const [columns, setColumns] = useState<TableColumn<User>[]>(basicColumns);
  
  return (
    <Table
      {...args}
      columns={columns}
      variant="secondary"
      reorderable={true}
      onColumnReorder={(newColumns) => setColumns(newColumns)}
    />
  );
};

export const SecondaryVariantWithReorder: Story = {
  render: (args: React.ComponentProps<UserTable>) => <SecondaryWithReorderStoryComponent {...args} />,
  args: {
    columns: basicColumns,
    data: sampleUsers,
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary header variant table with column reordering enabled. Combines the light header style with drag-to-reorder functionality.'
      }
    }
  }
};

// Composable API Examples (Recommended)
export const ComposableBasic: Story = {
  render: () => (
    <div className="p-6">
      <Table>
        <TableCaption>Employee Directory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead sortable>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane.smith@example.com</TableCell>
            <TableCell>User</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob.johnson@example.com</TableCell>
            <TableCell>Editor</TableCell>
            <TableCell>
              <Badge variant="danger">Inactive</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use TableHeader, TableBody, TableRow, TableHead, and TableCell sub-components for flexible table composition. This provides maximum control and follows LEGO-style composition patterns.',
      },
    },
  },
};

function ComposableWithSortingComponent() {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              sortable 
              sortDirection={sortColumn === 'name' ? sortDirection : null}
              onSort={() => handleSort('name')}
            >
              Name
            </TableHead>
            <TableHead 
              sortable 
              sortDirection={sortColumn === 'email' ? sortDirection : null}
              onSort={() => handleSort('email')}
            >
              Email
            </TableHead>
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

export const ComposableWithSorting: Story = {
  render: () => <ComposableWithSortingComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Composable API allows full control over sorting behavior using TableHead with sortable prop.',
      },
    },
  },
};

export const ComposableWithFooter: Story = {
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
            <TableCell colSpan={2} className="text-right font-semibold">
              Total:
            </TableCell>
            <TableCell className="font-semibold">$150.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use TableFooter for summary rows or totals.',
      },
    },
  },
};
