import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DataEntryTable } from '../components/organisms/DataEntryTable';
import type { DataEntryColumn } from '../components/organisms/DataEntryTable';

const meta: Meta<typeof DataEntryTable> = {
  title: 'Organisms/DataEntryTable',
  component: DataEntryTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataEntryTable>;

interface SampleRow {
  id: string | number;
  origin?: string;
  destination?: string;
  vehicleType?: string;
  materialType?: string;
  totalQuantity?: string | number;
  unit?: string;
  rate?: string | number;
}

const sampleColumns: DataEntryColumn[] = [
  {
    key: 'origin',
    title: 'Origin',
    cellType: 'input',
    placeholder: 'eg. Bangalore',
    width: '178px',
  },
  {
    key: 'destination',
    title: 'Destination',
    cellType: 'input',
    placeholder: 'eg. Chennai',
    width: '178px',
  },
  {
    key: 'vehicleType',
    title: 'Vehicle type',
    cellType: 'dropdown',
    placeholder: 'eg. 12 FT',
    options: [
      { value: '12ft', label: '12 FT' },
      { value: '14ft', label: '14 FT' },
      { value: 'container-12ft', label: 'Container 12 FT' },
      { value: 'container-14ft', label: 'Container 14 FT' },
    ],
    width: '178px',
  },
  {
    key: 'materialType',
    title: 'Material type',
    cellType: 'dropdown',
    placeholder: 'eg. White cement',
    options: [
      { value: 'steel', label: 'Steel' },
      { value: 'glass', label: 'Glass' },
      { value: 'cement', label: 'Cement' },
      { value: 'white-cement', label: 'White cement' },
    ],
    width: '178px',
  },
  {
    key: 'totalQuantity',
    title: 'Total Quantity',
    cellType: 'amount-input',
    placeholder: 'eg. 50',
    currencySymbol: '₹',
    unit: 'TON',
    width: '178px',
  },
  {
    key: 'rate',
    title: 'Add Rate',
    cellType: 'action',
    actions: [
      {
        label: '+ Add',
        icon: 'plus',
        onClick: () => console.log('Add clicked'),
        variant: 'text',
      },
    ],
    width: '158px',
  },
];

const sampleData: SampleRow[] = [
  {
    id: 1,
    origin: 'Bangalore',
    destination: 'Chennai',
    vehicleType: '12ft',
    materialType: 'white-cement',
    totalQuantity: '50',
    unit: 'TON',
  },
  {
    id: 2,
    origin: 'Mumbai',
    destination: 'Chennai',
    vehicleType: 'container-12ft',
    materialType: 'cement',
    totalQuantity: '75',
    unit: 'TON',
  },
];

// Component wrapper for Default story with state management
const DefaultStoryComponent = (args: React.ComponentProps<typeof DataEntryTable>) => {
  const [data, setData] = useState<SampleRow[]>(sampleData);
  
  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId 
          ? { ...row, [columnKey]: value }
          : row
      )
    );
    args.onCellChange?.(rowId, columnKey, value);
  };

  return (
    <DataEntryTable
      {...args}
      data={data}
      onCellChange={handleCellChange}
    />
  );
};

export const Default: Story = {
  render: (args: React.ComponentProps<typeof DataEntryTable>) => <DefaultStoryComponent {...args} />,
  args: {
    columns: sampleColumns,
    data: sampleData,
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

export const WithReadOnlyCells: Story = {
  args: {
    columns: [
      {
        key: 'origin',
        title: 'Origin',
        cellType: 'read-only',
        width: '178px',
      },
      {
        key: 'destination',
        title: 'Destination',
        cellType: 'read-only',
        width: '178px',
      },
      {
        key: 'vehicleType',
        title: 'Vehicle type',
        cellType: 'read-only',
        width: '178px',
      },
      {
        key: 'materialType',
        title: 'Material type',
        cellType: 'read-only',
        width: '178px',
      },
      {
        key: 'totalQuantity',
        title: 'Total Quantity',
        cellType: 'read-only',
        width: '178px',
      },
      {
        key: 'rate',
        title: 'Add Rate',
        cellType: 'action',
        actions: [
          {
            label: '+ Add',
            icon: 'plus',
            onClick: () => console.log('Add clicked'),
            variant: 'text',
          },
        ],
        width: '158px',
      },
    ],
    data: [
      {
        id: 1,
        origin: 'Bangalore',
        destination: 'Chennai',
        vehicleType: 'eg. 12 FT',
        materialType: 'eg. White cement',
        totalQuantity: 'eg. 50',
        unit: 'TON',
      },
      {
        id: 2,
        origin: 'Mumbai',
        destination: 'Chennai',
        vehicleType: 'eg. 12 FT',
        materialType: 'eg. White cement',
        totalQuantity: 'eg. 50',
        unit: 'TON',
      },
    ],
  },
};

export const WithErrors: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    cellErrors: {
      1: {
        totalQuantity: 'Invalid amount',
      },
    },
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

// Component wrapper for WithSelection story with state management
const WithSelectionStoryComponent = (args: React.ComponentProps<typeof DataEntryTable>) => {
  const [data, setData] = useState<SampleRow[]>(sampleData);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([1]);
  
  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setData(prevData => 
      prevData.map(row => 
        row.id === rowId 
          ? { ...row, [columnKey]: value }
          : row
      )
    );
    args.onCellChange?.(rowId, columnKey, value);
  };

  const handleSelectionChange = (newSelectedRows: (string | number)[]) => {
    setSelectedRows(newSelectedRows);
    args.onSelectionChange?.(newSelectedRows);
  };

  return (
    <DataEntryTable
      {...args}
      data={data}
      selectedRows={selectedRows}
      onCellChange={handleCellChange}
      onSelectionChange={handleSelectionChange}
    />
  );
};

export const WithSelection: Story = {
  render: (args: React.ComponentProps<typeof DataEntryTable>) => <WithSelectionStoryComponent {...args} />,
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
    selectedRows: [1],
    onSelectionChange: (selectedRows: (string | number)[]) => {
      console.log('Selection changed:', selectedRows);
    },
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

export const WithColumnResize: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    resizable: true,
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

export const WithContextMenu: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    showContextMenu: true,
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

export const AllCellTypes: Story = {
  args: {
    columns: [
      {
        key: 'text',
        title: 'Text Input',
        cellType: 'input',
        placeholder: 'Enter text',
        width: '152px',
      },
      {
        key: 'amount',
        title: 'Amount',
        cellType: 'amount-input',
        placeholder: '0',
        currencySymbol: '₹',
        unit: 'kgs',
        width: '152px',
      },
      {
        key: 'dropdown',
        title: 'Dropdown',
        cellType: 'dropdown',
        placeholder: 'Select option',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ],
        width: '152px',
      },
      {
        key: 'date',
        title: 'Date & Time',
        cellType: 'date-time',
        placeholder: 'Select date',
        width: '152px',
      },
      {
        key: 'readonly',
        title: 'Read Only',
        cellType: 'read-only',
        width: '152px',
      },
      {
        key: 'actions',
        title: 'Actions',
        cellType: 'action',
        actions: [
          {
            label: '+ Add',
            icon: 'plus',
            onClick: () => console.log('Add'),
            variant: 'text',
          },
          {
            label: 'Delete',
            icon: 'delete',
            onClick: () => console.log('Delete'),
            variant: 'destructive',
          },
        ],
        width: '176px',
      },
    ],
    data: [
      {
        id: 1,
        text: 'Sample text',
        amount: '1000',
        dropdown: 'option1',
        date: '2024-01-01',
        readonly: 'Read-only value',
      },
      {
        id: 2,
        text: '',
        amount: '',
        dropdown: '',
        date: '',
        readonly: 'Another value',
      },
    ],
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

export const EmptyState: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    onCellChange: (rowId: string | number, columnKey: string, value: string | number) => {
      console.log('Cell changed:', { rowId, columnKey, value });
    },
  },
};

