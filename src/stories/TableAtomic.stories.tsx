import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '../components/organisms/Table';
import type { TableColumn } from '../components/organisms/Table';
import { TableCell } from '../components/organisms/Table/TableCell';
import { TableCellText } from '../components/organisms/Table/TableCellText';
import { TableCellItem } from '../components/organisms/Table/TableCellItem';
import { Badge } from '../components/atoms/Badge/Badge';
import { TableHeaderItem } from '../components/organisms/Table/TableHeaderItem';

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table/Atomic Components',
  component: Table,
  parameters: {
    docsOnly: true,
    layout: 'centered',
    docs: {
      description: {
        component: 'Individual atomic components that make up the Table component.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', type: 'number' },
  { key: 'location', title: 'Location' },
];

const data = [
  { id: 1, name: 'John Doe', age: 30, location: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, location: 'San Francisco' },
  { id: 3, name: 'Bob Johnson', age: 40, location: 'Chicago' },
];

// Story for TableCell variants
export const DocsTableCellVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Background Colors</h3>
          <div className="flex gap-4">
            <TableCell backgroundColor="white">
              <TableCellText type="primary">White Background</TableCellText>
            </TableCell>
            <TableCell backgroundColor="bg">
              <TableCellText type="primary">BG Background</TableCellText>
            </TableCell>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Line Variants</h3>
          <div className="flex gap-4">
            <TableCell lineVariant="single">
              <TableCellText type="primary">Single Line</TableCellText>
            </TableCell>
            <TableCell lineVariant="double">
              <TableCellText type="primary">Double Line</TableCellText>
              <TableCellText type="secondary">Second Line of Text</TableCellText>
            </TableCell>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Sizes</h3>
          <div className="flex gap-4">
            <TableCell size="md">
              <TableCellText type="primary">Medium Size</TableCellText>
            </TableCell>
            <TableCell size="lg">
              <TableCellText type="primary">Large Size</TableCellText>
            </TableCell>
            <TableCell size="xl">
              <TableCellText type="primary">Extra Large Size</TableCellText>
            </TableCell>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">States</h3>
          <div className="flex gap-4">
            <TableCell state="default">
              <TableCellText type="primary">Default State</TableCellText>
            </TableCell>
            <TableCell state="hover">
              <TableCellText type="primary">Hover State</TableCellText>
            </TableCell>
            <TableCell state="selected">
              <TableCellText type="primary">Selected State</TableCellText>
            </TableCell>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Combined Variants (from Figma)</h3>
          <div className="grid grid-cols-3 gap-4">
            <TableCell backgroundColor="white" lineVariant="double" size="xl" state="default">
              <TableCellText type="primary">White, Double, XL, Default</TableCellText>
              <TableCellText type="secondary">Second line of text</TableCellText>
            </TableCell>
            <TableCell backgroundColor="white" lineVariant="double" size="xl" state="hover">
              <TableCellText type="primary">White, Double, XL, Hover</TableCellText>
              <TableCellText type="secondary">Second line of text</TableCellText>
            </TableCell>
            <TableCell backgroundColor="white" lineVariant="double" size="xl" state="selected">
              <TableCellText type="primary">White, Double, XL, Selected</TableCellText>
              <TableCellText type="secondary">Second line of text</TableCellText>
            </TableCell>
            
            <TableCell backgroundColor="bg" lineVariant="single" size="lg" state="default">
              <TableCellText type="primary">BG, Single, LG, Default</TableCellText>
            </TableCell>
            <TableCell backgroundColor="bg" lineVariant="single" size="lg" state="hover">
              <TableCellText type="primary">BG, Single, LG, Hover</TableCellText>
            </TableCell>
            <TableCell backgroundColor="bg" lineVariant="single" size="lg" state="selected">
              <TableCellText type="primary">BG, Single, LG, Selected</TableCellText>
            </TableCell>
            
            <TableCell backgroundColor="white" lineVariant="single" size="md" state="default">
              <TableCellText type="primary">White, Single, MD, Default</TableCellText>
            </TableCell>
            <TableCell backgroundColor="white" lineVariant="single" size="md" state="hover">
              <TableCellText type="primary">White, Single, MD, Hover</TableCellText>
            </TableCell>
            <TableCell backgroundColor="white" lineVariant="single" size="md" state="selected">
              <TableCellText type="primary">White, Single, MD, Selected</TableCellText>
            </TableCell>
          </div>
        </div>
      </div>
    );
  }
,
  parameters: { docsOnly: true },
}