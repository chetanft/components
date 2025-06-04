import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  TableCellText, 
  TableCellItem, 
  TableCell, 
  TableHeaderItem 
} from '../components/Table';
import { Badge } from '../components/Badge/Badge';

const meta: Meta = {
  title: 'UI Components/Table/Atomic Components',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Atomic table components based on exact Figma design specifications. These are the building blocks for complex table implementations.'
      }
    }
  }
};

export default meta;

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
        story: 'Text components for table cells with primary (#434F64) and secondary (#5F697B) variants. Uses Inter font, 16px, 400 weight.'
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
          badge={<Badge variant="success" size="sm">On time</Badge>}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-2">Complex Example</h3>
        <TableCellItem 
          text="Flight Details" 
          textType="secondary"
          prefixIcon="aeroplane"
          suffixIcon="link"
          badge={<Badge variant="warning" size="sm">+1 P</Badge>}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cell items with various combinations of text, icons, and badges. Layout uses 8px gaps and center alignment.'
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
          <TableCell backgroundColor="white" borderStyle="single">
            <TableCellItem text="White Background" />
            <TableCellItem text="Single Border" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="bg" borderStyle="single">
            <TableCellItem text="Background Color" />
            <TableCellItem text="Single Border" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="white" borderStyle="double">
            <TableCellItem text="White Background" />
            <TableCellItem text="Double Border" textType="secondary" />
          </TableCell>
        </tr>
        <tr>
          <TableCell backgroundColor="bg" borderStyle="double">
            <TableCellItem text="Background Color" />
            <TableCellItem text="Double Border" textType="secondary" />
          </TableCell>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table cell containers with different background colors and border styles. Includes proper padding and 8px vertical gaps.'
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
        story: 'Header items with different color variants, sorting states, drag handles, and checkbox support. Typography is Inter 600 16px.'
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
                badge={<Badge variant="success" size="sm">On time</Badge>}
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
                badge={<Badge variant="warning" size="sm">Delayed</Badge>}
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