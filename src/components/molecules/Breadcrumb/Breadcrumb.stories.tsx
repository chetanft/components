import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from './index';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A breadcrumb navigation component for showing the current page location within a hierarchy.',
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
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' as const },
            { id: 'with-icons', label: 'Icons', story: 'WithIcons' as const },
            { id: 'custom-separator', label: 'Custom Separator', story: 'CustomSeparator' as const },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// Composable API Examples
export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products/electronics" isCurrentPage>Electronics</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use BreadcrumbList, BreadcrumbItem, BreadcrumbLink, and BreadcrumbSeparator sub-components for flexible breadcrumb composition.',
      },
      source: {
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products">Products</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/products/electronics" isCurrentPage>Electronics</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings" icon="settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings/profile" icon="user" isCurrentPage>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Composable API allows flexible icon placement in breadcrumb links.',
      },
      source: {
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings" icon="settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings/profile" icon="user" isCurrentPage>Profile</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const CustomSeparator: Story = {
  render: () => (
    <div className="p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator icon="chevron-right" />
          <BreadcrumbItem>
            <BreadcrumbLink href="/about">About</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <span className="text-[var(--color-tertiary)]">/</span>
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/about/team" isCurrentPage>Team</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom separators can be provided using BreadcrumbSeparator with custom icon or children.',
      },
      source: {
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator icon="chevron-right" />
    <BreadcrumbItem>
      <BreadcrumbLink href="/about">About</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <span className="text-[var(--color-tertiary)]">/</span>
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/about/team" isCurrentPage>Team</BreadcrumbLink>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};
