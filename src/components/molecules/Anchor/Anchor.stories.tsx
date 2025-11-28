import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from './Anchor';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Anchor> = {
  title: 'Molecules/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

const DemoSection = ({ id, title }: { id: string; title: string }) => (
  <div id={id} style={{ height: '400px', padding: '20px', border: '1px solid #eee', marginBottom: '20px' }}>
    <Typography variant="display-primary" as="h3">{title}</Typography>
    <Typography>Content for {title}...</Typography>
  </div>
);

export const Basic: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <DemoSection id="part-1" title="Part 1" />
        <DemoSection id="part-2" title="Part 2" />
        <DemoSection id="part-3" title="Part 3" />
      </div>
      <div style={{ width: '200px', marginLeft: '20px' }}>
        <Anchor
          items={[
            {
              href: '#part-1',
              title: 'Part 1',
            },
            {
              href: '#part-2',
              title: 'Part 2',
            },
            {
              href: '#part-3',
              title: 'Part 3',
            },
          ]}
        />
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div>
      <div style={{ marginBottom: '20px', position: 'sticky', top: 0, zIndex: 100, background: 'white', padding: '10px 0' }}>
        <Anchor
          direction="horizontal"
          items={[
            { href: '#h-1', title: 'Horizontal 1' },
            { href: '#h-2', title: 'Horizontal 2' },
            { href: '#h-3', title: 'Horizontal 3' },
          ]}
        />
      </div>
      <div>
        <DemoSection id="h-1" title="Horizontal 1" />
        <DemoSection id="h-2" title="Horizontal 2" />
        <DemoSection id="h-3" title="Horizontal 3" />
      </div>
    </div>
  ),
};

