import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DataEntryTable, DataEntryTableHeader, DataEntryTableHeaderRow, DataEntryTableHeaderCell, DataEntryTableBody, DataEntryTableRow, DataEntryTableRowCell, DataEntryTableRowCheckbox } from './index';
import { Button } from '../../atoms/Button/Button';
import { Dropdown } from '../../molecules/Dropdown/Dropdown';

const meta: Meta<typeof DataEntryTable> = {
  title: 'Organisms/DataEntryTable',
  component: DataEntryTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A composable component for editable data entry tables. Supports both composable API (recommended) and declarative API (deprecated).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
    },
    resizable: {
      control: 'boolean',
    },
    showContextMenu: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataEntryTable>;

// Declarative API Examples
export const DeclarativeBasic: Story = {
  args: {
    columns: [
      { key: 'name', title: 'Name', cellType: 'input', placeholder: 'Enter name' },
      { key: 'email', title: 'Email', cellType: 'input', placeholder: 'Enter email' },
      { key: 'role', title: 'Role', cellType: 'dropdown', options: [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
      ]},
    ],
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    ],
  },
};

// Composable API Examples
function ComposableBasicComponent() {
  const [rows, setRows] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  ]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [columnKey]: value } : row
    ));
  };

  return (
    <DataEntryTable onCellChange={handleCellChange}>
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="name" width="200px">Name</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="email" width="250px">Email</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="role" width="150px">Role</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCell 
              columnKey="name" 
              rowId={row.id}
              type="input" 
              value={row.name}
              placeholder="Enter name"
            />
            <DataEntryTableRowCell 
              columnKey="email" 
              rowId={row.id}
              type="input" 
              value={row.email}
              placeholder="Enter email"
            />
            <DataEntryTableRowCell 
              columnKey="role" 
              rowId={row.id}
              type="dropdown" 
              value={row.role}
              options={[
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
              ]}
            />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const ComposableBasic: Story = {
  render: () => <ComposableBasicComponent />,
};

function ComposableWithSelectionComponent() {
  const [rows, setRows] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ]);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [columnKey]: value } : row
    ));
  };

  return (
    <DataEntryTable 
      selectable
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      onCellChange={handleCellChange}
    >
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="checkbox" width="50px">Select</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="name" width="200px">Name</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="email" width="250px">Email</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCheckbox rowId={row.id} />
            <DataEntryTableRowCell 
              columnKey="name" 
              rowId={row.id}
              type="input" 
              value={row.name}
              placeholder="Enter name"
            />
            <DataEntryTableRowCell 
              columnKey="email" 
              rowId={row.id}
              type="input" 
              value={row.email}
              placeholder="Enter email"
            />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const ComposableWithSelection: Story = {
  render: () => <ComposableWithSelectionComponent />,
};

function ComposableWithActionsComponent() {
  const [rows, setRows] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [columnKey]: value } : row
    ));
  };

  const handleDelete = (rowId: string | number) => {
    setRows(rows.filter(row => row.id !== rowId));
  };

  return (
    <DataEntryTable 
      showContextMenu
      onCellChange={handleCellChange}
      onRowDelete={handleDelete}
    >
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="name" width="200px">Name</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="email" width="250px">Email</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="actions" width="100px">Actions</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCell 
              columnKey="name" 
              rowId={row.id}
              type="input" 
              value={row.name}
              placeholder="Enter name"
            />
            <DataEntryTableRowCell 
              columnKey="email" 
              rowId={row.id}
              type="input" 
              value={row.email}
              placeholder="Enter email"
            />
            <DataEntryTableRowCell 
              columnKey="actions" 
              rowId={row.id}
              type="action"
              actions={[
                {
                  label: 'Delete',
                  onClick: () => handleDelete(row.id),
                  variant: 'destructive',
                }
              ]}
            />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const ComposableWithActions: Story = {
  render: () => <ComposableWithActionsComponent />,
};

function ComposableWithMultipleCellTypesComponent() {
  const [rows, setRows] = useState([
    { id: 1, name: 'Product A', price: 100, quantity: 5, category: 'electronics' },
    { id: 2, name: 'Product B', price: 200, quantity: 3, category: 'clothing' },
  ]);

  const handleCellChange = (rowId: string | number, columnKey: string, value: string | number) => {
    setRows(rows.map(row => 
      row.id === rowId ? { ...row, [columnKey]: value } : row
    ));
  };

  return (
    <DataEntryTable onCellChange={handleCellChange}>
      <DataEntryTableHeader>
        <DataEntryTableHeaderRow>
          <DataEntryTableHeaderCell key="name" width="200px">Product Name</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="price" width="150px">Price</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="quantity" width="120px">Quantity</DataEntryTableHeaderCell>
          <DataEntryTableHeaderCell key="category" width="150px">Category</DataEntryTableHeaderCell>
        </DataEntryTableHeaderRow>
      </DataEntryTableHeader>
      <DataEntryTableBody>
        {rows.map((row) => (
          <DataEntryTableRow key={row.id} rowId={row.id}>
            <DataEntryTableRowCell 
              columnKey="name" 
              rowId={row.id}
              type="input" 
              value={row.name}
              placeholder="Enter product name"
            />
            <DataEntryTableRowCell 
              columnKey="price" 
              rowId={row.id}
              type="amount-input" 
              value={row.price}
              currencySymbol="$"
            />
            <DataEntryTableRowCell 
              columnKey="quantity" 
              rowId={row.id}
              type="input" 
              value={row.quantity}
            />
            <DataEntryTableRowCell 
              columnKey="category" 
              rowId={row.id}
              type="dropdown" 
              value={row.category}
              options={[
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'food', label: 'Food' },
              ]}
            />
          </DataEntryTableRow>
        ))}
      </DataEntryTableBody>
    </DataEntryTable>
  );
}

export const ComposableWithMultipleCellTypes: Story = {
  render: () => <ComposableWithMultipleCellTypesComponent />,
};

