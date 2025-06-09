import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';
import { FTLogo } from './FTLogo';
import { TataMotorsLogo } from './TataMotorsLogo';

const meta: Meta<typeof Logo> = {
  title: 'Atoms/Logos',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['ft', 'tata-motors'],
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

export const AllLogos: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>FT Logo</h3>
        <FTLogo />
      </div>
      <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#666' }}>Tata Motors Logo</h3>
        <TataMotorsLogo />
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  args: {
    name: 'ft',
    width: 100,
    height: 50,
  },
}; 