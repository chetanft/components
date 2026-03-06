import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import {
  PaginationList,
  PaginationItem,
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
        component: 'A pagination component for navigating through pages. Uses composable sub-components: PaginationList, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationSizeChanger, PaginationQuickJumper.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: { contentType: 'default' } },
            { id: 'with-size-changer', label: 'Size Changer', story: 'ExplorerBase' as const, args: { contentType: 'with-size-changer' } },
            { id: 'with-quick-jumper', label: 'Quick Jumper', story: 'ExplorerBase' as const, args: { contentType: 'with-quick-jumper' } },
          ],
        },
        {
          id: 'style',
          label: 'Style',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: { variant: 'default' } },
            { id: 'compact', label: 'Compact', story: 'ExplorerBase' as const, args: { variant: 'compact' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
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
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Pagination variant style'
    }
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const [current, setCurrent] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const totalPages = Math.ceil(100 / pageSize);
    const syncKey = JSON.stringify({ contentType });

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
      <div key={syncKey} className="p-6">
        <Pagination
          current={current}
          total={100}
          pageSize={pageSize}
          onChange={(page) => setCurrent(page)}
          onShowSizeChange={contentType === 'with-size-changer' ? (cur, size) => { setCurrent(1); setPageSize(size); } : undefined}
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
          {contentType === 'with-size-changer' && <PaginationSizeChanger options={[10, 20, 50, 100]} />}
          {contentType === 'with-quick-jumper' && <PaginationQuickJumper label="Go to:" buttonText="Go" />}
        </Pagination>
      </div>
    );
  },
};

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

export const DocsWithSizeChanger: Story = {
  render: () => <WithSizeChangerComponent />,
  parameters: {

    docsOnly: true,
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

export const DocsWithQuickJumper: Story = {
  render: () => <WithQuickJumperComponent />,
  parameters: {

    docsOnly: true,
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

// Variants: showing default and compact side-by-side
function VariantsComponent() {
  const [current1, setCurrent1] = React.useState(3);
  const [current2, setCurrent2] = React.useState(3);

  return (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">Default Variant</p>
        <Pagination current={current1} total={100} pageSize={10} onChange={(page) => setCurrent1(page)}>
          <PaginationList>
            <PaginationPrevious />
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page} page={page} />
            ))}
            <PaginationEllipsis />
            <PaginationItem page={10} />
            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Compact Variant</p>
        <Pagination current={current2} total={100} pageSize={10} variant="compact" onChange={(page) => setCurrent2(page)}>
          <PaginationList>
            <PaginationPrevious />
            <PaginationItem page={current2} />
            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Size Changer & Quick Jumper</p>
        <Pagination current={1} total={200} pageSize={10}>
          <PaginationList>
            <PaginationPrevious />
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page} page={page} />
            ))}
            <PaginationEllipsis />
            <PaginationItem page={20} />
            <PaginationNext />
          </PaginationList>
          <PaginationSizeChanger options={[10, 20, 50]} />
          <PaginationQuickJumper label="Go to:" buttonText="Go" />
        </Pagination>
      </div>
    </div>
  );
}

export const DocsVariants: Story = {
  render: () => <VariantsComponent />,
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'All visual variants of the Pagination component shown side-by-side: default, compact, and with size changer and quick jumper.',
      },
    },
  },
};

function StatesComponent() {
  return (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">First Page (Previous disabled)</p>
        <Pagination current={1} total={100} pageSize={10}>
          <PaginationList>
            <PaginationPrevious />
            {[1, 2, 3, 4, 5].map((page) => (
              <PaginationItem key={page} page={page} />
            ))}
            <PaginationEllipsis />
            <PaginationItem page={10} />
            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Last Page (Next disabled)</p>
        <Pagination current={10} total={100} pageSize={10}>
          <PaginationList>
            <PaginationPrevious />
            <PaginationItem page={1} />
            <PaginationEllipsis />
            {[6, 7, 8, 9, 10].map((page) => (
              <PaginationItem key={page} page={page} />
            ))}
            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Single Page</p>
        <Pagination current={1} total={5} pageSize={10}>
          <PaginationList>
            <PaginationPrevious />
            <PaginationItem page={1} />
            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
    </div>
  );
}

export const DocsStates: Story = {
  render: () => <StatesComponent />,
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Pagination states: first page (previous disabled), last page (next disabled), and single page.',
      },
    },
  },
};
