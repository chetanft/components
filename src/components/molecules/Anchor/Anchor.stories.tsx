import type { Meta, StoryObj } from '@storybook/react';
import { Anchor, AnchorLink } from './Anchor';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Anchor> = {
  title: 'Molecules/Anchor',
  component: Anchor,
  tags: ['autodocs'],
  args: {
    glass: true,
  },
  parameters: {
    layout: 'padded',
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
            { id: 'default', label: 'Vertical', story: 'ExplorerBase' as const, args: { direction: 'vertical' } },
            { id: 'horizontal', label: 'Horizontal', story: 'ExplorerBase' as const, args: { direction: 'horizontal' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' as const, args: {} },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  argTypes: {
    glass: {
      control: 'select',
      options: [false, true, 'subtle', 'prominent'],
      description: 'Glass style variant',
    },
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

export const ExplorerBase: Story = {
  render: (args: any) => {
    const direction = args.direction ?? 'vertical';
    const syncKey = JSON.stringify({ direction, glass: args.glass });
    return (
      <div key={syncKey}>
        <Anchor glass={args.glass} direction={direction}>
          <AnchorLink href="#section-1" title="Section 1" />
          <AnchorLink href="#section-2" title="Section 2" />
          <AnchorLink href="#section-3" title="Section 3" />
        </Anchor>
      </div>
    );
  },
};

export const Default: Story = {
  render: (args: any) => (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <DemoSection id="part-1" title="Part 1" />
        <DemoSection id="part-2" title="Part 2" />
        <DemoSection id="part-3" title="Part 3" />
      </div>
      <div style={{ width: '200px', marginLeft: '20px' }}>
        <Anchor glass={args.glass}>
          <AnchorLink href="#part-1" title="Part 1" />
          <AnchorLink href="#part-2" title="Part 2" />
          <AnchorLink href="#part-3" title="Part 3" />
        </Anchor>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Anchor glass>
  <AnchorLink href="#part-1" title="Part 1" />
  <AnchorLink href="#part-2" title="Part 2" />
  <AnchorLink href="#part-3" title="Part 3" />
</Anchor>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: (args: any) => (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="title-secondary" as="h4">Vertical (default)</Typography>
        <Anchor glass={args.glass}>
          <AnchorLink href="#v-1" title="Section 1" />
          <AnchorLink href="#v-2" title="Section 2" />
          <AnchorLink href="#v-3" title="Section 3" />
        </Anchor>
      </div>
      <div>
        <Typography variant="title-secondary" as="h4">Horizontal</Typography>
        <Anchor glass={args.glass} direction="horizontal">
          <AnchorLink href="#h-1" title="Horizontal 1" />
          <AnchorLink href="#h-2" title="Horizontal 2" />
          <AnchorLink href="#h-3" title="Horizontal 3" />
        </Anchor>
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `{/* Vertical (default) */}
<Anchor glass>
  <AnchorLink href="#v-1" title="Section 1" />
  <AnchorLink href="#v-2" title="Section 2" />
  <AnchorLink href="#v-3" title="Section 3" />
</Anchor>

{/* Horizontal */}
<Anchor glass direction="horizontal">
  <AnchorLink href="#h-1" title="Horizontal 1" />
  <AnchorLink href="#h-2" title="Horizontal 2" />
  <AnchorLink href="#h-3" title="Horizontal 3" />
</Anchor>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}