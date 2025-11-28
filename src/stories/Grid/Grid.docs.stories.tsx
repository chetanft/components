import type { Meta } from '@storybook/react';
import React from 'react';
import { Row, Col } from '../components/organisms/Grid/Grid';

const meta: Meta = {
  title: 'Design System/Grid System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# FT Design System - Grid System

The FT Grid system provides a flexible 24-column layout with responsive breakpoints and token-based spacing.

## Container & Max Widths

Use \`var(--container-max-width)\` for content containers:
- Automatically adapts to viewport size
- Based on responsive breakpoints
- Ensures consistent content width across devices

## Grid Columns

The 24-column grid system allows flexible layouts:
- \`span={n}\` - Number of columns to span (1-24)
- \`offset={n}\` - Number of columns to offset from left
- \`order={n}\` - Flex order for reordering

## Responsive Breakpoints

| Breakpoint | Token | Min Width | Typical Usage |
|------------|-------|-----------|---------------|
| xs | var(--breakpoint-xs) | 0px | Mobile phones |
| sm | var(--breakpoint-sm) | 640px | Large phones |
| md | var(--breakpoint-md) | 768px | Tablets |
| lg | var(--breakpoint-lg) | 1024px | Small laptops |
| xl | var(--breakpoint-xl) | 1280px | Desktops |
| xxl | var(--breakpoint-xxl) | 1536px | Large screens |

## Spacing & Gutters

Grid gutters use spacing tokens:
- \`gutter={16}\` → \`var(--spacing-x4)\` (16px)
- \`gutter={[16, 24]}\` → horizontal: \`var(--spacing-x4)\`, vertical: \`var(--spacing-x6)\`

## Flex Layout

Use \`flex\` prop for advanced layouts:
- \`flex="100px"\` - Fixed width
- \`flex="auto"\` - Fill remaining space
- \`flex={2}\` - Flex grow ratio
        `,
      },
    },
  },
};

export default meta;

// Helper component for grid demos
const GridBox = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[var(--neutral-light)] border border-[var(--border-primary)] rounded-[var(--radius-sm)] p-4 text-center text-[var(--primary)] ${className}`}>
    {children}
  </div>
);

export const ContainerDemo = () => (
  <div className="min-h-screen bg-[var(--bg-secondary)] p-4">
    <div
      className="mx-auto bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--radius-lg)] p-6"
      style={{ maxWidth: 'var(--container-max-width)' }}
    >
      <h2 className="text-xl font-semibold mb-4 text-[var(--primary)]">Container with Max Width</h2>
      <p className="text-[var(--secondary)]">
        This container uses <code className="bg-[var(--bg-secondary)] px-2 py-1 rounded text-sm">var(--container-max-width)</code> for responsive width.
      </p>
    </div>
  </div>
);

export const BasicGridDemo = () => (
  <div className="p-6 bg-[var(--bg-secondary)] min-h-screen">
    <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">24-Column Grid System</h2>

    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3 text-[var(--primary)]">Equal Columns</h3>
        <Row gutter={16}>
          <Col span={6}><GridBox>span=6</GridBox></Col>
          <Col span={6}><GridBox>span=6</GridBox></Col>
          <Col span={6}><GridBox>span=6</GridBox></Col>
          <Col span={6}><GridBox>span=6</GridBox></Col>
        </Row>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-[var(--primary)]">Unequal Columns</h3>
        <Row gutter={16}>
          <Col span={8}><GridBox>span=8</GridBox></Col>
          <Col span={8}><GridBox>span=8</GridBox></Col>
          <Col span={8}><GridBox>span=8</GridBox></Col>
        </Row>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-[var(--primary)]">Offset Columns</h3>
        <Row gutter={16}>
          <Col span={8}><GridBox>span=8</GridBox></Col>
          <Col span={8} offset={8}><GridBox>span=8, offset=8</GridBox></Col>
        </Row>
      </div>
    </div>
  </div>
);

export const FlexGridDemo = () => (
  <div className="p-6 bg-[var(--bg-secondary)] min-h-screen">
    <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">Flex Layout Examples</h2>

    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3 text-[var(--primary)]">Fixed + Fill</h3>
        <Row gutter={16}>
          <Col flex="calc(var(--spacing-x10) * 2.5)"><GridBox>200px fixed</GridBox></Col>
          <Col flex="auto"><GridBox>Fill remaining space</GridBox></Col>
        </Row>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-[var(--primary)]">Ratio Layout</h3>
        <Row gutter={16}>
          <Col flex={1}><GridBox>1/3</GridBox></Col>
          <Col flex={2}><GridBox>2/3</GridBox></Col>
        </Row>
      </div>
    </div>
  </div>
);

export const ResponsiveDemo = () => (
  <div className="p-6 bg-[var(--bg-secondary)] min-h-screen">
    <h2 className="text-xl font-semibold mb-6 text-[var(--primary)]">Responsive Design</h2>

    <div className="space-y-4">
      <p className="text-[var(--secondary)]">
        Resize your browser to see how the grid adapts. The container uses responsive breakpoints automatically.
      </p>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <GridBox>Responsive Column</GridBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <GridBox>Responsive Column</GridBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <GridBox>Responsive Column</GridBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <GridBox>Responsive Column</GridBox>
        </Col>
      </Row>
    </div>

    <div className="mt-8 p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[var(--radius-md)]">
      <h3 className="text-lg font-medium mb-2 text-[var(--primary)]">Responsive Breakpoints</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
        <div><strong>xs:</strong> &lt; 640px</div>
        <div><strong>sm:</strong> ≥ 640px</div>
        <div><strong>md:</strong> ≥ 768px</div>
        <div><strong>lg:</strong> ≥ 1024px</div>
        <div><strong>xl:</strong> ≥ 1280px</div>
        <div><strong>xxl:</strong> ≥ 1536px</div>
      </div>
    </div>
  </div>
);
