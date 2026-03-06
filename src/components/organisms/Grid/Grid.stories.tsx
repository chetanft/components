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
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic Grid', story: 'ExplorerBase', args: { contentType: 'basic' } },
            { id: 'gutter', label: 'Gutter', story: 'ExplorerBase', args: { contentType: 'gutter' } },
            { id: 'offset', label: 'Offset', story: 'ExplorerBase', args: { contentType: 'offset' } },
            { id: 'flex', label: 'Flex Layout', story: 'ExplorerBase', args: { contentType: 'flex' } },
          ],
        },
        {
          id: 'alignment',
          label: 'Layout',
          scenarios: [
            { id: 'align', label: 'Vertical Align', story: 'ExplorerBase', args: { contentType: 'alignment' } },
            { id: 'justify', label: 'Justify', story: 'ExplorerBase', args: { contentType: 'justify' } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'basic',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Row>;

// Helper component for visualization
const ColBox = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div className="bg-[var(--neutral)] text-[var(--overlay-control-text)] text-center py-4 rounded" style={style}>
    {children}
  </div>
);

const ColBoxLight = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[var(--neutral-light)] text-[var(--neutral)] text-center py-4 rounded">
    {children}
  </div>
);

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'basic';
    const syncKey = JSON.stringify({ contentType });
    return (
      <div key={syncKey}>
        {contentType === 'basic' && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={24}><ColBox>col-24</ColBox></Col>
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
          </div>
        )}
        {contentType === 'gutter' && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={6}><ColBox>col-6</ColBox></Col>
              <Col span={6}><ColBox>col-6</ColBox></Col>
              <Col span={6}><ColBox>col-6</ColBox></Col>
              <Col span={6}><ColBox>col-6</ColBox></Col>
            </Row>
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
        )}
        {contentType === 'offset' && (
          <div className="space-y-4">
            <Row>
              <Col span={8}><ColBox>col-8</ColBox></Col>
              <Col span={8} offset={8}><ColBox>col-8 offset-8</ColBox></Col>
            </Row>
            <Row>
              <Col span={6} offset={6}><ColBox>col-6 offset-6</ColBox></Col>
              <Col span={6} offset={6}><ColBox>col-6 offset-6</ColBox></Col>
            </Row>
          </div>
        )}
        {contentType === 'flex' && (
          <div className="space-y-4">
            <Row>
              <Col flex={2}><ColBox>2 / 5</ColBox></Col>
              <Col flex={3}><ColBoxLight>3 / 5</ColBoxLight></Col>
            </Row>
            <Row>
              <Col flex="100px"><ColBox>100px</ColBox></Col>
              <Col flex="auto"><ColBoxLight>Fill Rest</ColBoxLight></Col>
            </Row>
          </div>
        )}
        {contentType === 'alignment' && (
          <div className="space-y-4">
            <Row align="top" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
            </Row>
            <Row align="middle" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
            </Row>
            <Row align="bottom" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox style={{ height: 100 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 50 }}>col-4</ColBox></Col>
              <Col span={4}><ColBox style={{ height: 120 }}>col-4</ColBox></Col>
            </Row>
          </div>
        )}
        {contentType === 'justify' && (
          <div className="space-y-4">
            <Row justify="start" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox>col-4</ColBox></Col>
              <Col span={4}><ColBox>col-4</ColBox></Col>
            </Row>
            <Row justify="center" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox>col-4</ColBox></Col>
              <Col span={4}><ColBox>col-4</ColBox></Col>
            </Row>
            <Row justify="space-between" className="bg-[var(--bg-secondary)] p-4">
              <Col span={4}><ColBox>col-4</ColBox></Col>
              <Col span={4}><ColBox>col-4</ColBox></Col>
            </Row>
          </div>
        )}
      </div>
    );
  },
};

export const DocsBasicGrid: Story = {
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

  parameters: { docsOnly: true },
}