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
};

export const FT: Story = {
  args: {
    name: 'ft',
  },
};

export const TataMotors: Story = {
  args: {
    name: 'tata-motors',
  },
};

export const CustomSize: Story = {
  args: {
    name: 'ft',
    width: 150,
    height: 24,
  },
};

export const TataMotorsLarge: Story = {
  args: {
    name: 'tata-motors',
    width: 200,
    height: 40,
  },
};

export const FTWhite: Story = {
  args: {
    name: 'ft-white',
  },
};

export const MDCLabs: Story = {
  args: {
    name: 'mdc-labs',
  },
};

export const ShakthiLogistics: Story = {
  args: {
    name: 'shakthi-logistics',
  },
};

export const Gati: Story = {
  args: {
    name: 'gati',
  },
};

export const BirlaPivot: Story = {
  args: {
    name: 'birla-pivot',
  },
};

export const Diageo: Story = {
  args: {
    name: 'diageo',
  },
};

export const DiageoWhite: Story = {
  args: {
    name: 'diageo-white',
  },
};

export const JSWOne: Story = {
  args: {
    name: 'jsw-one',
  },
};

export const Shadowfax: Story = {
  args: {
    name: 'shadowfax',
  },
};

export const DocsAllLogos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
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

  parameters: { docsOnly: true },
}