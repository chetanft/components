import type { Meta, StoryObj } from '@storybook/react';
import { Row, Col } from './Grid';

const meta: Meta<typeof Row> = {
  title: 'Organisms/Grid',
  component: Row,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '🆕 NEW: 24-column Grid system (Row/Col) built with FT Design System tokens.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Row>;

// Helper component for visualization
const ColBox = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="bg-[var(--neutral)] text-white text-center py-4 rounded" style={style}>
    {children}
  </div>
);

const ColBoxLight = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[var(--neutral-light)] text-[var(--neutral)] text-center py-4 rounded">
    {children}
  </div>
);

export const BasicGrid: Story = {
  render: () => (
    <div className="space-y-4">
      <Row gutter={16}>
        <Col span={24}>
          <ColBox>col-24</ColBox>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}><ColBox>col-12</ColBox></Col>
        <Col span={12}><ColBoxLight>col-12</ColBoxLight></Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}><ColBox>col-8</ColBox></Col>
        <Col span={8}><ColBoxLight>col-8</ColBoxLight></Col>
        <Col span={8}><ColBox>col-8</ColBox></Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBoxLight>col-6</ColBoxLight></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBoxLight>col-6</ColBoxLight></Col>
      </Row>
    </div>
  ),
};

export const Gutter: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-[var(--tertiary)]">Horizontal gutter: var(--spacing-x4)</p>
      <Row gutter={16}>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
      </Row>
      
      <p className="text-sm text-[var(--tertiary)] mt-4">Horizontal & Vertical gutter: [16, 24]</p>
      <Row gutter={[16, 24]}>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
      </Row>
    </div>
  ),
};

export const Offset: Story = {
  render: () => (
    <div className="space-y-4">
      <Row>
        <Col span={8}><ColBox>col-8</ColBox></Col>
        <Col span={8} offset={8}><ColBox>col-8 offset-8</ColBox></Col>
      </Row>
      <Row>
        <Col span={6} offset={6}><ColBox>col-6 offset-6</ColBox></Col>
        <Col span={6} offset={6}><ColBox>col-6 offset-6</ColBox></Col>
      </Row>
      <Row>
        <Col span={12} offset={6}><ColBox>col-12 offset-6</ColBox></Col>
      </Row>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-[var(--tertiary)]">Align: top</p>
      <Row align="top" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 80 }}>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Align: middle</p>
      <Row align="middle" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 80 }}>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Align: bottom</p>
      <Row align="bottom" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
        <Col span={4}><ColBox style={{ height: 80 }}>col-4</ColBox></Col>
      </Row>
    </div>
  ),
};

export const Justify: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-[var(--tertiary)]">Justify: start</p>
      <Row justify="start" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Justify: center</p>
      <Row justify="center" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Justify: end</p>
      <Row justify="end" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Justify: space-between</p>
      <Row justify="space-between" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)]">Justify: space-around</p>
      <Row justify="space-around" className="bg-[var(--bg-secondary)] p-4">
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
        <Col span={4}><ColBox>col-4</ColBox></Col>
      </Row>
    </div>
  ),
};

export const FlexLayout: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-[var(--tertiary)]">Percentage columns</p>
      <Row>
        <Col flex={2}><ColBox>2 / 5</ColBox></Col>
        <Col flex={3}><ColBoxLight>3 / 5</ColBoxLight></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)] mt-4">Fixed + Fill</p>
      <Row>
        <Col flex="calc(var(--spacing-x10) * 2.5)"><ColBox>calc(var(--spacing-x10) * 2.5)</ColBox></Col>
        <Col flex="auto"><ColBoxLight>Fill Rest</ColBoxLight></Col>
      </Row>

      <p className="text-sm text-[var(--tertiary)] mt-4">Fixed + Fill + Fixed</p>
      <Row>
        <Col flex="calc(var(--spacing-x10) * 2.5)"><ColBox>calc(var(--spacing-x10) * 2.5)</ColBox></Col>
        <Col flex="auto"><ColBoxLight>Fill Rest</ColBoxLight></Col>
        <Col flex="calc(var(--spacing-x10) * 2.5)"><ColBox>calc(var(--spacing-x10) * 2.5)</ColBox></Col>
      </Row>
    </div>
  ),
};

