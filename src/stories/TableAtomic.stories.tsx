import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Table } from '../components/organisms/Table';
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
export const TableCellVariants: Story = {
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
};

// Story for TableCellText variants
export const TableCellTextVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TableCell>
        <TableCellText type="primary">Primary Text</TableCellText>
      </TableCell>
      <TableCell>
        <TableCellText type="secondary">Secondary Text</TableCellText>
      </TableCell>
    </div>
  )
};

// Story for TableCellItem variants
export const TableCellItemVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TableCell>
        <TableCellItem text="Text Only" />
      </TableCell>
      <TableCell>
        <TableCellItem prefixIcon="search" text="With Prefix Icon" />
      </TableCell>
      <TableCell>
        <TableCellItem text="With Suffix Icon" suffixIcon="chevron-right" />
      </TableCell>
      <TableCell>
        <TableCellItem prefixIcon="user" text="With Both Icons" suffixIcon="chevron-right" />
      </TableCell>
    </div>
  )
};

// Story for TableHeaderItem variants
export const TableHeaderItemVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <table className="w-full">
        <thead>
          <tr>
            <TableHeaderItem>Default Header</TableHeaderItem>
            <TableHeaderItem sortable>Sortable Header</TableHeaderItem>
            <TableHeaderItem sortable sortDirection="asc">Sorted Ascending</TableHeaderItem>
            <TableHeaderItem sortable sortDirection="desc">Sorted Descending</TableHeaderItem>
          </tr>
        </thead>
      </table>
      
      <table className="w-full">
        <thead>
          <tr>
            <TableHeaderItem size="md">Medium Size</TableHeaderItem>
            <TableHeaderItem size="lg">Large Size</TableHeaderItem>
            <TableHeaderItem size="xl">Extra Large Size</TableHeaderItem>
          </tr>
        </thead>
      </table>
      
      <table className="w-full">
        <thead>
          <tr>
            <TableHeaderItem colorVariant="dark25">Dark Header</TableHeaderItem>
            <TableHeaderItem colorVariant="bg">BG Header</TableHeaderItem>
            <TableHeaderItem colorVariant="white">White Header</TableHeaderItem>
          </tr>
        </thead>
      </table>
    </div>
  )
};

// Story for Responsive Table
const ResponsiveTableStoryComponent = () => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  return (
    <div className="w-full max-w-4xl">
      <Table 
        columns={columns}
        data={data}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
      />
    </div>
  );
};

export const ResponsiveTableExample: Story = {
  render: () => <ResponsiveTableStoryComponent />
};

// TableCellText Stories
export const CellTextPrimary: StoryObj<typeof TableCellText> = {
  render: () => (
    <div className="space-y-4">
      <TableCellText type="primary">Primary Cell Text</TableCellText>
      <TableCellText type="secondary">Secondary Cell Text</TableCellText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text components for table cells with primary (var(--primary)) and secondary (var(--secondary)) variants. Uses Inter font, var(--font-size-md), var(--font-weight-regular).'
      }
    }
  }
};

// TableCellItem Stories
export const CellItemVariants: StoryObj<typeof TableCellItem> = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Text Only</h3>
        <TableCellItem text="Amritsar, PB" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">With Prefix Icon</h3>
        <TableCellItem 
          text="Amritsar, PB" 
          prefixIcon="check" 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">With Suffix Icon</h3>
        <TableCellItem 
          text="Amritsar, PB" 
          suffixIcon="chevron-right" 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">With Badge</h3>
        <TableCellItem 
          text="Amritsar, PB" 
          badge={<Badge variant="success" >On time</Badge>}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Complex Example</h3>
        <TableCellItem 
          text="Flight Details" 
          textType="secondary"
          prefixIcon="aeroplane"
          suffixIcon="link"
          badge={<Badge variant="warning" >+1 P</Badge>}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cell items with various combinations of text, icons, and badges. Layout uses var(--spacing-x2) gaps and center alignment.'
      }
    }
  }
};

// TableCell Stories
export const CellContainerVariants: StoryObj<typeof TableCell> = {
  render: () => (
    <table className="border-collapse">
      <tbody>
        <tr>
          <TableCell backgroundColor="white" lineVariant="single">
            <TableCellItem text="White Background" />
            <TableCellItem text="Single Line" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="bg" lineVariant="single">
            <TableCellItem text="Background Color" />
            <TableCellItem text="Single Line" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="white" lineVariant="double">
            <TableCellItem text="White Background" />
            <TableCellItem text="Double Line" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="bg" lineVariant="double">
            <TableCellItem text="Background Color" />
            <TableCellItem text="Double Line" textType="secondary" />
          </TableCell>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table cell containers with different background colors and line variants. Includes proper padding and spacing between content lines.'
      }
    }
  }
};

// TableHeaderItem Stories
export const HeaderItemVariants: StoryObj<typeof TableHeaderItem> = {
  render: () => (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          <TableHeaderItem colorVariant="dark25">
            Dark 25 Header
          </TableHeaderItem>
          <TableHeaderItem colorVariant="bg">
            BG Header
          </TableHeaderItem>
          <TableHeaderItem colorVariant="white">
            White Header
          </TableHeaderItem>
        </tr>
        <tr>
          <TableHeaderItem 
            colorVariant="dark25" 
            sortable 
            sortDirection="asc"
          >
            Sorted Asc
          </TableHeaderItem>
          <TableHeaderItem 
            colorVariant="bg" 
            sortable 
            sortDirection="desc"
          >
            Sorted Desc
          </TableHeaderItem>
          <TableHeaderItem 
            colorVariant="white" 
            sortable 
            sortDirection={null}
          >
            Unsorted
          </TableHeaderItem>
        </tr>
        <tr>
          <TableHeaderItem 
            colorVariant="dark25" 
            draggable
          >
            Draggable
          </TableHeaderItem>
          <TableHeaderItem 
            colorVariant="bg" 
            draggable 
            sortable 
            sortDirection="asc"
          >
            Drag + Sort
          </TableHeaderItem>
          <TableHeaderItem 
            type="checkbox"
            colorVariant="white"
            checkboxProps={{
              checked: false,
              onChange: () => {}
            }}
          />
        </tr>
      </thead>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header items with different color variants, sorting states, drag handles, and checkbox support. Typography is Inter var(--font-weight-semibold) var(--font-size-md).'
      }
    }
  }
};

// Complete Table Example using Atoms
export const AtomicTableExample: StoryObj = {
  render: () => (
    <div className="border border-[#CED1D7] rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <TableHeaderItem 
              type="checkbox"
              colorVariant="bg"
              checkboxProps={{
                checked: false,
                onChange: () => {}
              }}
            />
            <TableHeaderItem 
              colorVariant="bg" 
              sortable 
              sortDirection="asc"
            >
              Destination
            </TableHeaderItem>
            <TableHeaderItem colorVariant="bg">
              Status
            </TableHeaderItem>
            <TableHeaderItem 
              colorVariant="bg" 
              sortable
            >
              Actions
            </TableHeaderItem>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableCell backgroundColor="white">
              <TableCellItem 
                text="" 
                prefixIcon="check" 
              />
            </TableCell>
            <TableCell backgroundColor="white">
              <TableCellItem 
                text="Amritsar, PB" 
                suffixIcon="link" 
              />
            </TableCell>
            <TableCell backgroundColor="white">
              <TableCellItem 
                badge={<Badge variant="success" >On time</Badge>}
              />
            </TableCell>
            <TableCell backgroundColor="white">
              <TableCellItem 
                text="View Details" 
                suffixIcon="chevron-right" 
              />
            </TableCell>
          </tr>
          <tr>
            <TableCell backgroundColor="bg">
              <TableCellItem text="" />
            </TableCell>
            <TableCell backgroundColor="bg">
              <TableCellItem 
                text="Mumbai, MH" 
                prefixIcon="aeroplane"
              />
            </TableCell>
            <TableCell backgroundColor="bg">
              <TableCellItem 
                badge={<Badge variant="warning" >Delayed</Badge>}
              />
            </TableCell>
            <TableCell backgroundColor="bg">
              <TableCellItem 
                text="Reschedule" 
                textType="secondary"
              />
            </TableCell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete table example built using atomic components, demonstrating how they compose together to create complex table layouts.'
      }
    }
  }
}; 
