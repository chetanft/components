import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component for navigating through pages. Supports page size changer and quick jumper.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'number',
      description: 'Current page number'
    },
    total: {
      control: 'number',
      description: 'Total number of items'
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page'
    },
    showSizeChanger: {
      control: 'boolean',
      description: 'Whether to show page size changer'
    },
    showQuickJumper: {
      control: 'boolean',
      description: 'Whether to show quick jumper'
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default pagination
export const Default: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
  },
};

// Basic Pagination story
export function BasicPagination() {
  return (
    <div className="p-6">
      <Pagination
        current={1}
        total={100}
        pageSize={10}
      />
    </div>
  );
}

// With Size Changer story
export function WithSizeChanger() {
  return (
    <div className="p-6">
      <Pagination
        current={1}
        total={100}
        pageSize={10}
        showSizeChanger={true}
      />
    </div>
  );
}

// With Quick Jumper story
export function WithQuickJumper() {
  return (
    <div className="p-6">
      <Pagination
        current={1}
        total={100}
        pageSize={10}
        showQuickJumper={true}
      />
    </div>
  );
}

// With Both Features story
export function WithBothFeatures() {
  return (
    <div className="p-6">
      <Pagination
        current={1}
        total={100}
        pageSize={10}
        showSizeChanger={true}
        showQuickJumper={true}
      />
    </div>
  );
}

// Interactive Demo - all variants shown together and interactable
export function InteractiveDemo() {
  const [current1, setCurrent1] = React.useState(1);
  const [current2, setCurrent2] = React.useState(1);
  const [current3, setCurrent3] = React.useState(1);
  const [current4, setCurrent4] = React.useState(1);
  const [pageSize4, setPageSize4] = React.useState(10);

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-lg font-semibold mb-4">All Pagination Variants - Interactive</h3>
      <p className="text-sm text-gray-600 mb-6">Click page numbers to navigate. Current page: {current1}, {current2}, {current3}, {current4}</p>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Basic Pagination</h4>
          <Pagination
            current={current1}
            total={100}
            pageSize={10}
            onChange={(page) => setCurrent1(page)}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">With Size Changer</h4>
          <Pagination
            current={current2}
            total={100}
            pageSize={10}
            showSizeChanger={true}
            onChange={(page) => setCurrent2(page)}
            onShowSizeChange={(current, size) => {
              setCurrent2(1);
            }}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">With Quick Jumper</h4>
          <Pagination
            current={current3}
            total={100}
            pageSize={10}
            showQuickJumper={true}
            onChange={(page) => setCurrent3(page)}
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">With Both Features</h4>
          <Pagination
            current={current4}
            total={100}
            pageSize={pageSize4}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={(page, size) => {
              setCurrent4(page);
              if (size) setPageSize4(size);
            }}
            onShowSizeChange={(current, size) => {
              setCurrent4(1);
              setPageSize4(size);
            }}
          />
        </div>
      </div>
    </div>
  );
}

