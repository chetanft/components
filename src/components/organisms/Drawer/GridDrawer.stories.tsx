import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridDrawer } from './GridDrawer';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof GridDrawer> = {
  title: 'Organisms/GridDrawer',
  component: GridDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A drawer component using a 24-column grid system with responsive margins and gaps. Available in 16, 12, and 7 column widths from the right side.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the drawer is open'
    },
    title: {
      control: 'text',
      description: 'Drawer title'
    },
    size: {
      control: 'select',
      options: [16, 12, 7],
      description: 'Number of columns the drawer spans (16, 12, or 7)'
    },
    closable: {
      control: 'boolean',
      description: 'Whether the drawer can be closed'
    },
    maskClosable: {
      control: 'boolean',
      description: 'Whether clicking outside closes the drawer'
    }
  },
} satisfies Meta<typeof GridDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default drawer
export const Default: Story = {
  args: {
    open: true,
    title: 'Grid Drawer Title',
    size: 16,
    closable: true,
    maskClosable: true,
    children: 'Drawer content goes here',
  },
};

// 16 Column Drawer
export function Size16Columns() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open 16 Column Drawer</Button>
      <GridDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="16 Column Drawer"
        size={16}
      >
        <div className="space-y-4">
          <p>This drawer spans 16 columns out of 24 (66.67% width).</p>
          <p>On desktop (&gt;1440px): 20px margins and 20px gaps</p>
          <p>On tablet (&lt;1440px): 16px margins and 16px gaps</p>
          <p>On mobile: Full width with 16px margins</p>
        </div>
      </GridDrawer>
    </div>
  );
}

// 12 Column Drawer
export function Size12Columns() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open 12 Column Drawer</Button>
      <GridDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="12 Column Drawer"
        size={12}
      >
        <div className="space-y-4">
          <p>This drawer spans 12 columns out of 24 (50% width).</p>
          <p>On desktop (&gt;1440px): 20px margins and 20px gaps</p>
          <p>On tablet (&lt;1440px): 16px margins and 16px gaps</p>
          <p>On mobile: Full width with 16px margins</p>
        </div>
      </GridDrawer>
    </div>
  );
}

// 7 Column Drawer
export function Size7Columns() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open 7 Column Drawer</Button>
      <GridDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="7 Column Drawer"
        size={7}
      >
        <div className="space-y-4">
          <p>This drawer spans 7 columns out of 24 (29.17% width).</p>
          <p>On desktop (&gt;1440px): 20px margins and 20px gaps</p>
          <p>On tablet (&lt;1440px): 16px margins and 16px gaps</p>
          <p>On mobile: Full width with 16px margins</p>
        </div>
      </GridDrawer>
    </div>
  );
}

// All Sizes Comparison
export function AllSizes() {
  const [open16, setOpen16] = React.useState(false);
  const [open12, setOpen12] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Grid Drawer Sizes</h3>
      <p className="text-sm text-gray-600 mb-6">Compare the three available drawer sizes.</p>
      
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setOpen16(true)}>16 Columns (66.67%)</Button>
        <Button onClick={() => setOpen12(true)}>12 Columns (50%)</Button>
        <Button onClick={() => setOpen7(true)}>7 Columns (29.17%)</Button>
      </div>

      <GridDrawer
        open={open16}
        onClose={() => setOpen16(false)}
        title="16 Column Drawer"
        size={16}
      >
        <div className="space-y-4">
          <p className="font-semibold">16 Columns - Largest Size</p>
          <p>This drawer spans 16 columns out of 24, taking up 66.67% of the available width.</p>
          <p>Perfect for detailed forms, settings panels, or content-heavy drawers.</p>
        </div>
      </GridDrawer>

      <GridDrawer
        open={open12}
        onClose={() => setOpen12(false)}
        title="12 Column Drawer"
        size={12}
      >
        <div className="space-y-4">
          <p className="font-semibold">12 Columns - Medium Size</p>
          <p>This drawer spans 12 columns out of 24, taking up 50% of the available width.</p>
          <p>Great for standard content, filters, or navigation drawers.</p>
        </div>
      </GridDrawer>

      <GridDrawer
        open={open7}
        onClose={() => setOpen7(false)}
        title="7 Column Drawer"
        size={7}
      >
        <div className="space-y-4">
          <p className="font-semibold">7 Columns - Compact Size</p>
          <p>This drawer spans 7 columns out of 24, taking up 29.17% of the available width.</p>
          <p>Ideal for quick actions, notifications, or minimal content.</p>
        </div>
      </GridDrawer>
    </div>
  );
}

// Without Title
export function WithoutTitle() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Drawer without Title</Button>
      <GridDrawer
        open={open}
        onClose={() => setOpen(false)}
        size={16}
        closable={true}
      >
        <div className="space-y-4">
          <p>This drawer has no title but still has a close button.</p>
        </div>
      </GridDrawer>
    </div>
  );
}

// Not Closable
export function NotClosable() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open Non-Closable Drawer</Button>
      <GridDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Non-Closable Drawer"
        size={16}
        closable={false}
        maskClosable={true}
      >
        <div className="space-y-4">
          <p>This drawer cannot be closed with the X button, but you can still close it by clicking outside.</p>
          <Button onClick={() => setOpen(false)}>Close via Button</Button>
        </div>
      </GridDrawer>
    </div>
  );
}

