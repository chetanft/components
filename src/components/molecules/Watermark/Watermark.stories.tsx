import type { Meta, StoryObj } from '@storybook/react';
import { Watermark } from './Watermark';
import { Typography } from '../../atoms/Typography';

const meta: Meta<typeof Watermark> = {
  title: 'Molecules/Watermark',
  component: Watermark,
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
      defaultRowId: 'type',
      defaultScenarioId: 'Basic',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'Basic', label: 'Basic', story: 'Basic' as const },
            { id: 'MultiLine', label: 'Multi Line', story: 'MultiLine' as const },
            { id: 'CustomStyle', label: 'Custom Style', story: 'CustomStyle' as const },
          ],
        },
      ],
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
type Story = StoryObj<typeof Watermark>;

export const Basic: Story = {
  render: (args: any) => (
    <Watermark content="FT Design System" glass={args.glass}>
      <div style={{ height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <Typography variant="title-secondary">Confidential Content</Typography>
      </div>
    </Watermark>
  ),
};

export const MultiLine: Story = {
  render: (args: any) => (
    <Watermark content={['Confidential', 'Do Not Share']} glass={args.glass}>
      <div style={{ height: 500, backgroundColor: '#fff' }} />
    </Watermark>
  ),
};

export const CustomStyle: Story = {
  render: (args: any) => (
    <Watermark
      content="Draft"
      font={{ color: 'rgba(255, 0, 0, 0.15)', fontSize: 24 }}
      rotate={-45}
      glass={args.glass}
    >
      <div style={{ height: 500, backgroundColor: '#fff' }} />
    </Watermark>
  ),
};
