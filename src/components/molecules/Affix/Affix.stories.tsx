import type { Meta, StoryObj } from '@storybook/react';
import { Affix } from './Affix';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Affix> = {
  title: 'Molecules/Affix',
  component: Affix,
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
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'basic', label: 'Basic', story: 'Basic' as const },
            { id: 'bottom', label: 'Bottom', story: 'Bottom' as const },
          ],
        },
      ],
      defaultRowId: 'type' as const,
      defaultScenarioId: 'basic' as const,
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
type Story = StoryObj<typeof Affix>;

export const Basic: Story = {
  render: (args: any) => (
    <div style={{ height: '200vh' }}>
      <div style={{ paddingTop: '100px', paddingLeft: '20px' }}>
        <Affix offsetTop={10} glass={args.glass}>
          <Button variant="primary">Affix Top (10px)</Button>
        </Affix>
        <br />
        <Button>Normal Button</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Affix offsetTop={10} glass>
  <Button variant="primary">Affix Top (10px)</Button>
</Affix>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const Bottom: Story = {
    render: (args: any) => (
      <div style={{ height: '200vh' }}>
        <div style={{ paddingTop: '100px', paddingLeft: '20px' }}>
          <Affix offsetBottom={10} glass={args.glass}>
            <Button variant="primary">Affix Bottom (10px)</Button>
          </Affix>
        </div>
      </div>
    ),
    parameters: {
      docs: {
        source: {
          code: `<Affix offsetBottom={10} glass>
  <Button variant="primary">Affix Bottom (10px)</Button>
</Affix>`,
          language: 'tsx',
          type: 'code',
        },
      },
    },
  };
