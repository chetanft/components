import type { Meta, StoryObj } from '@storybook/react';
import { FloatButton, FloatButtonGroup } from './FloatButton';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof FloatButton> = {
  title: 'Molecules/FloatButton',
  component: FloatButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Visual style of the float button.',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of the float button.',
    },
    href: {
      control: 'text',
      description: 'URL to navigate to, renders the button as a link.',
    },
    target: {
      control: 'text',
      description: 'Link target attribute (e.g. _blank).',
    },
    badge: {
      control: 'object',
      description: 'Badge configuration with count, dot, and color options.',
    },
    glass: {
      control: 'select',
      options: ['none', 'frost', 'subtle', 'medium', 'heavy'],
      description: 'Glass morphism variant.',
    },
    icon: {
      control: false,
      description: 'Icon element to display inside the button.',
    },
    description: {
      control: false,
      description: 'Description text rendered below the icon.',
    },
    tooltip: {
      control: false,
      description: 'Tooltip content shown on hover.',
    },
    onClick: {
      control: false,
      description: 'Click handler for the float button.',
    },
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'Basic' as const },
            { id: 'with-type', label: 'WithType', story: 'WithType' as const },
            { id: 'group', label: 'Group', story: 'Group' as const },
          ],
        },
      ],
      defaultRowId: 'type' as const,
      defaultScenarioId: 'basic' as const,
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatButton>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButton
        style={{ position: 'absolute', right: 24, bottom: 24 }}
        icon={<Icon name="add" />}
        onClick={() => console.log('clicked')}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FloatButton
  icon={<Icon name="add" />}
  onClick={() => console.log('clicked')}
/>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const WithType: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButton
        type="primary"
        style={{ position: 'absolute', right: 24, bottom: 24 }}
        icon={<Icon name="check" />}
      />
      <FloatButton
        style={{ position: 'absolute', right: 80, bottom: 24 }}
        icon={<Icon name="help-circle" />}
        shape="square"
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<>
  <FloatButton
    type="primary"
    icon={<Icon name="check" />}
  />
  <FloatButton
    icon={<Icon name="help-circle" />}
    shape="square"
  />
</>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative', border: '1px solid #eee' }}>
      <FloatButtonGroup trigger="click" type="primary" style={{ position: 'absolute', right: 24, bottom: 24 }}>
        <FloatButton icon={<Icon name="user" />} />
        <FloatButton icon={<Icon name="settings" />} />
      </FloatButtonGroup>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<FloatButtonGroup trigger="click" type="primary">
  <FloatButton icon={<Icon name="user" />} />
  <FloatButton icon={<Icon name="settings" />} />
</FloatButtonGroup>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

