import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TypographyShowcase } from '../components/atoms/Typography/Typography';

const meta: Meta<typeof TypographyShowcase> = {
  title: 'Design System/Typography Documentation',
  component: TypographyShowcase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '📚 **Documentation Only** - This is the legacy typography showcase for reference. For actual development, use the reusable Typography component found in **Atoms → Typography (Reusable)**.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographyDocumentation: Story = {
  name: '📚 Typography Documentation (Legacy)',
  render: () => (
    <div>
      <div style={{ 
        background: '#fef3c7', 
        border: '1px solid #f59e0b', 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '24px',
        color: '#92400e'
      }}>
        <strong>⚠️ For Development:</strong> Use the reusable Typography component in <strong>Atoms → Typography (Reusable)</strong> instead of this documentation showcase.
      </div>
      <TypographyShowcase />
    </div>
  ),
}; 