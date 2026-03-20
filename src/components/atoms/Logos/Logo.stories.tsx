import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo component for displaying company logos.',
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
          id: 'brand',
          label: 'Brand',
          scenarios: [
            { id: 'default', label: 'Default (FT)', story: 'Default' },
            { id: 'ft-white', label: 'FT White', story: 'FTWhite' },
            { id: 'tata-motors', label: 'Tata Motors', story: 'TataMotors' },
          ],
        },
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'default', label: 'Default', story: 'Default' },
            { id: 'custom', label: 'Custom Size', story: 'CustomSize' },
            { id: 'large', label: 'Large', story: 'TataMotorsLarge' },
          ],
        },
      ],
      defaultRowId: 'brand',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'ft',
        'ft-white',
        'tata-motors',
        'mdc-labs',
        'shakthi-logistics',
        'gati',
        'birla-pivot',
        'diageo',
        'diageo-white',
        'jsw-one',
        'shadowfax'
      ],
      description: 'Logo name to display',
    },
    width: {
      control: 'number',
      description: 'Width of the logo',
    },
    height: {
      control: 'number',
      description: 'Height of the logo',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    name: 'ft',
  },
  parameters: {
    docs: { source: { code: '<Logo name="ft" />', language: 'tsx', type: 'code' } },
  },
};

export const FT: Story = {
  args: {
    name: 'ft',
  },
  parameters: {
    docs: { source: { code: '<Logo name="ft" />', language: 'tsx', type: 'code' } },
  },
};

export const TataMotors: Story = {
  args: {
    name: 'tata-motors',
  },
  parameters: {
    docs: { source: { code: '<Logo name="tata-motors" />', language: 'tsx', type: 'code' } },
  },
};

export const CustomSize: Story = {
  args: {
    name: 'ft',
    width: 150,
    height: 24,
  },
  parameters: {
    docs: { source: { code: '<Logo name="ft" width={150} height={24} />', language: 'tsx', type: 'code' } },
  },
};

export const TataMotorsLarge: Story = {
  args: {
    name: 'tata-motors',
    width: 200,
    height: 40,
  },
  parameters: {
    docs: { source: { code: '<Logo name="tata-motors" width={200} height={40} />', language: 'tsx', type: 'code' } },
  },
};

export const FTWhite: Story = {
  args: {
    name: 'ft-white',
  },
  parameters: {
    docs: { source: { code: '<Logo name="ft-white" />', language: 'tsx', type: 'code' } },
  },
};

export const MDCLabs: Story = {
  args: {
    name: 'mdc-labs',
  },
  parameters: {
    docs: { source: { code: '<Logo name="mdc-labs" />', language: 'tsx', type: 'code' } },
  },
};

export const ShakthiLogistics: Story = {
  args: {
    name: 'shakthi-logistics',
  },
  parameters: {
    docs: { source: { code: '<Logo name="shakthi-logistics" />', language: 'tsx', type: 'code' } },
  },
};

export const Gati: Story = {
  args: {
    name: 'gati',
  },
  parameters: {
    docs: { source: { code: '<Logo name="gati" />', language: 'tsx', type: 'code' } },
  },
};

export const BirlaPivot: Story = {
  args: {
    name: 'birla-pivot',
  },
  parameters: {
    docs: { source: { code: '<Logo name="birla-pivot" />', language: 'tsx', type: 'code' } },
  },
};

export const Diageo: Story = {
  args: {
    name: 'diageo',
  },
  parameters: {
    docs: { source: { code: '<Logo name="diageo" />', language: 'tsx', type: 'code' } },
  },
};

export const DiageoWhite: Story = {
  args: {
    name: 'diageo-white',
  },
  parameters: {
    docs: { source: { code: '<Logo name="diageo-white" />', language: 'tsx', type: 'code' } },
  },
};

export const JSWOne: Story = {
  args: {
    name: 'jsw-one',
  },
  parameters: {
    docs: { source: { code: '<Logo name="jsw-one" />', language: 'tsx', type: 'code' } },
  },
};

export const Shadowfax: Story = {
  args: {
    name: 'shadowfax',
  },
  parameters: {
    docs: { source: { code: '<Logo name="shadowfax" />', language: 'tsx', type: 'code' } },
  },
};

export const DocsAllLogos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-x6)', padding: 'var(--spacing-x5)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-x4)', alignItems: 'center' }}>
        <Logo name="ft" />
        <Logo name="ft-white" />
        <Logo name="tata-motors" />
        <Logo name="mdc-labs" />
        <Logo name="shakthi-logistics" />
        <Logo name="gati" />
        <Logo name="birla-pivot" />
        <Logo name="diageo" />
        <Logo name="diageo-white" />
        <Logo name="jsw-one" />
        <Logo name="shadowfax" />
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-x4)', alignItems: 'center' }}>
  <Logo name="ft" />
  <Logo name="ft-white" />
  <Logo name="tata-motors" />
  <Logo name="mdc-labs" />
  <Logo name="shakthi-logistics" />
  <Logo name="gati" />
  <Logo name="birla-pivot" />
  <Logo name="diageo" />
  <Logo name="diageo-white" />
  <Logo name="jsw-one" />
  <Logo name="shadowfax" />
</div>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}