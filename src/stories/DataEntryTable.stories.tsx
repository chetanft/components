import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  DataEntryTable,
  DataEntryTableHeader,
  DataEntryTableHeaderRow,
  DataEntryTableHeaderCell,
  DataEntryTableBody,
  DataEntryTableRow,
  DataEntryTableRowCell,
  DataEntryTableRowCheckbox,
} from '../components/organisms/DataEntryTable';

const meta: Meta<typeof DataEntryTable> = {
  title: 'Stories/DataEntryTable',
  component: DataEntryTable,
  parameters: {
    docsOnly: true,
    layout: 'padded',
    docs: {
      description: {
        component: 'Composable data entry table for editable rows with selectable mode and mixed cell types.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Whether rows are selectable.',
    },
    resizable: {
      control: 'boolean',
      description: 'Whether columns are resizable.',
    },
    showContextMenu: {
      control: 'boolean',
      description: 'Whether to show context menu on hover.',
    },
    selectedRows: {
      control: 'object',
      description: 'Selected row IDs (controlled).',
    },
    cellErrors: {
      control: 'object',
      description: 'Cell errors by row ID and column key.',
    },
    glass: {
      control: 'select',
      options: [undefined, true, 'subtle', 'prominent'],
      description: 'Glass morphism variant.',
    },
    children: {
      control: false,
      description: 'Table content (composable API).',
    },
    onCellChange: {
      control: false,
      description: 'Callback when cell value changes.',
    },
    onRowAdd: {
      control: false,
      description: 'Callback when row is added.',
    },
    onRowDelete: {
      control: false,
      description: 'Callback when row is deleted.',
    },
    onSelectionChange: {
      control: false,
      description: 'Callback when selection changes.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataEntryTable>;

function BasicTable() {
  const [rows, setRows] = useState([
    { id: 1, origin: 'Bangalore', destination: 'Chennai', vehicleType: '12ft', quantity: '50' },
    { id: 2, origin: 'Mumbai', destination: 'Pune', vehicleType: 'container-12ft', quantity: '75' },
  ]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, [columnKey]: value } : row)));
  };

  return (
    <DataEntryTable onCellChange={handleCellChange}>
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="origin" width="178px">Origin</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="destination" width="178px">Destination</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="vehicleType" width="178px">Vehicle Type</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="quantity" width="178px">Total Quantity</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCell columnKey="origin" rowId={row.id} type="input" value={row.origin} placeholder="eg. Bangalore" />
            <DataEntryTableRowCell columnKey="destination" rowId={row.id} type="input" value={row.destination} placeholder="eg. Chennai" />
            <DataEntryTableRowCell
              columnKey="vehicleType"
              rowId={row.id}
              type="dropdown"
              value={row.vehicleType}
              options={[
                { value: '12ft', label: '12 FT' },
                { value: '14ft', label: '14 FT' },
                { value: 'container-12ft', label: 'Container 12 FT' },
              ]}
            />
            <DataEntryTableRowCell columnKey="quantity" rowId={row.id} type="amount-input" value={row.quantity} currencySymbol="₹" unit="TON" />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const Default: Story = {
  render: () => <BasicTable />,
};

function SelectableTable() {
  const [rows, setRows] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([1]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, [columnKey]: value } : row)));
  };

  return (
    <DataEntryTable selectable selectedRows={selectedRows} onSelectionChange={setSelectedRows} onCellChange={handleCellChange}>
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="select" width="50px">Select</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="name" width="200px">Name</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="email" width="250px">Email</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCheckbox rowId={row.id} />
            <DataEntryTableRowCell columnKey="name" rowId={row.id} type="input" value={row.name} />
            <DataEntryTableRowCell columnKey="email" rowId={row.id} type="input" value={row.email} />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const DocsVariants: Story = {
  render: () => <SelectableTable />,

  parameters: { docsOnly: true },
}