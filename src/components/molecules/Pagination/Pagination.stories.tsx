import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import {
  PaginationList,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationSizeChanger,
  PaginationQuickJumper,
} from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A pagination component for navigating through pages. Supports both composable sub-component API (recommended) and declarative props API (legacy). Composable sub-components: PaginationList, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationSizeChanger, PaginationQuickJumper.',
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
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Pagination variant style'
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Composable stories (recommended API)
// ---------------------------------------------------------------------------

// Default composable pagination with Previous, page items, ellipsis, and Next
function DefaultComponent() {
  const [current, setCurrent] = React.useState(1);
  const totalPages = 10;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <Pagination current={current} total={100} pageSize={10} onChange={(page) => setCurrent(page)}>
        <PaginationList>
          <PaginationPrevious />
          {getPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem key={page} page={page} />
            )
          )}
          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultComponent />,
  parameters: {
    docs: {
      source: {
        code: `<Pagination current={1} total={100} pageSize={10} onChange={handleChange}>
  <PaginationList>
    <PaginationPrevious />
    <PaginationItem page={1} />
    <PaginationItem page={2} />
    <PaginationItem page={3} />
    <PaginationItem page={4} />
    <PaginationItem page={5} />
    <PaginationEllipsis />
    <PaginationItem page={10} />
    <PaginationNext />
  </PaginationList>
</Pagination>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Composable pagination with PaginationSizeChanger
function WithSizeChangerComponent() {
  const [current, setCurrent] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const totalPages = Math.ceil(100 / pageSize);

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <Pagination
        current={current}
        total={100}
        pageSize={pageSize}
        onChange={(page) => setCurrent(page)}
        onShowSizeChange={(cur, size) => {
          setCurrent(1);
          setPageSize(size);
        }}
      >
        <PaginationList>
          <PaginationPrevious />
          {getPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem key={page} page={page} />
            )
          )}
          <PaginationNext />
        </PaginationList>
        <PaginationSizeChanger options={[10, 20, 50, 100]} />
      </Pagination>
    </div>
  );
}

export const WithSizeChanger: Story = {
  render: () => <WithSizeChangerComponent />,
  parameters: {
    docs: {
      source: {
        code: `<Pagination current={1} total={100} pageSize={pageSize} onChange={handleChange} onShowSizeChange={handleSizeChange}>
  <PaginationList>
    <PaginationPrevious />
    <PaginationItem page={1} />
    <PaginationItem page={2} />
    <PaginationEllipsis />
    <PaginationItem page={10} />
    <PaginationNext />
  </PaginationList>
  <PaginationSizeChanger options={[10, 20, 50, 100]} />
</Pagination>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Composable pagination with PaginationQuickJumper
function WithQuickJumperComponent() {
  const [current, setCurrent] = React.useState(1);
  const totalPages = 10;

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="p-6">
      <Pagination current={current} total={100} pageSize={10} onChange={(page) => setCurrent(page)}>
        <PaginationList>
          <PaginationPrevious />
          {getPageNumbers().map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationEllipsis key={`ellipsis-${index}`} />
            ) : (
              <PaginationItem key={page} page={page} />
            )
          )}
          <PaginationNext />
        </PaginationList>
        <PaginationQuickJumper label="Go to:" buttonText="Go" />
      </Pagination>
    </div>
  );
}

export const WithQuickJumper: Story = {
  render: () => <WithQuickJumperComponent />,
  parameters: {
    docs: {
      source: {
        code: `<Pagination current={1} total={100} pageSize={10} onChange={handleChange}>
  <PaginationList>
    <PaginationPrevious />
    <PaginationItem page={1} />
    <PaginationEllipsis />
    <PaginationItem page={10} />
    <PaginationNext />
  </PaginationList>
  <PaginationQuickJumper label="Go to:" buttonText="Go" />
</Pagination>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Legacy declarative stories (deprecated -- prefer composable API above)
// ---------------------------------------------------------------------------

/**
 * @deprecated Use the composable `Default` story instead.
 * This story uses the declarative props API which is deprecated.
 */
export const LegacyDefault: Story = {
  args: {
    current: 1,
    total: 100,
    pageSize: 10,
  },
};

/**
 * @deprecated Use the composable `Default` story instead.
 * This story uses the declarative props API which is deprecated.
 */
export function LegacyBasicPagination() {
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

/**
 * @deprecated Use the composable `WithSizeChanger` story instead.
 * This story uses the declarative `showSizeChanger` prop which is deprecated.
 */
export function LegacyWithSizeChanger() {
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

/**
 * @deprecated Use the composable `WithQuickJumper` story instead.
 * This story uses the declarative `showQuickJumper` prop which is deprecated.
 */
export function LegacyWithQuickJumper() {
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

/**
 * @deprecated Use the composable API with both PaginationSizeChanger and PaginationQuickJumper instead.
 * This story uses the declarative `showSizeChanger` and `showQuickJumper` props which are deprecated.
 */
export function LegacyWithBothFeatures() {
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

/**
 * @deprecated Use the composable API with `variant="compact"` instead.
 * This story uses the declarative props API which is deprecated.
 */
function LegacyCompactVariantComponent() {
  const [current, setCurrent] = React.useState(1);

  return (
    <div className="p-6">
      <Pagination
        current={current}
        total={100}
        pageSize={10}
        variant="compact"
        onChange={(page) => setCurrent(page)}
      />
    </div>
  );
}

export const LegacyCompactVariant: Story = {
  render: () => <LegacyCompactVariantComponent />,
  parameters: {
    docs: {
      source: {
        code: `<Pagination
  current={1}
  total={100}
  pageSize={10}
  variant="compact"
  onChange={(page) => handlePageChange(page)}
/>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

/**
 * @deprecated Use the composable API instead.
 * This story uses the declarative props API which is deprecated.
 */
export function LegacyInteractiveDemo() {
  const [current1, setCurrent1] = React.useState(1);
  const [current2, setCurrent2] = React.useState(1);
  const [current3, setCurrent3] = React.useState(1);
  const [current4, setCurrent4] = React.useState(1);
  const [pageSize2, setPageSize2] = React.useState(10);
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
            pageSize={pageSize2}
            showSizeChanger={true}
            onChange={(page) => setCurrent2(page)}
            onShowSizeChange={(currentPage, size) => {
              setCurrent2(currentPage);
              setPageSize2(size);
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
            onShowSizeChange={(currentPage, size) => {
              setCurrent4(currentPage);
              setPageSize4(size);
            }}
          />
        </div>
      </div>
    </div>
  );
}
