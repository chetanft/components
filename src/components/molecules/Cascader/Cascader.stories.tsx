import type { Meta, StoryObj } from '@storybook/react';
import { Cascader, CascaderOption } from './Cascader';


const meta: Meta<typeof Cascader> = {
  title: 'Molecules/Cascader',
  component: Cascader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A cascading selector component for selecting from hierarchical data.',
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
      behavior: 'anchored' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'size',
          label: 'Size',
          scenarios: [
            { id: 'xxs', label: 'XXS', story: 'ExplorerBase', args: { size: 'xxs' } },
            { id: 'xs', label: 'XS', story: 'ExplorerBase', args: { size: 'xs' } },
            { id: 'sm', label: 'SM', story: 'ExplorerBase', args: { size: 'sm' } },
            { id: 'md', label: 'MD', story: 'ExplorerBase', args: { size: 'md' } },
            { id: 'lg', label: 'LG', story: 'ExplorerBase', args: { size: 'lg' } },
            { id: 'xl', label: 'XL', story: 'ExplorerBase', args: { size: 'xl' } },
            { id: 'xxl', label: 'XXL', story: 'ExplorerBase', args: { size: 'xxl' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { disabled: false } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'size',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Component size',
    },
    expandTrigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'How to expand child options',
    },
    showSearch: {
      control: 'boolean',
      description: 'Enable search',
    },
    allowClear: {
      control: 'boolean',
      description: 'Allow clearing selection',
    },
    changeOnSelect: {
      control: 'boolean',
      description: 'Change value on any level select',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the cascader',
    },
    label: { table: { disable: true } },
    error: { table: { disable: true } },
    helperText: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Cascader>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const size = args.size ?? 'md';
    const disabled = Boolean(args.disabled);
    const syncKey = JSON.stringify({ size, disabled, glass: args.glass });
    return (
      <div key={syncKey}>
        <Cascader label="Select Location" placeholder="Select a location" size={size} disabled={disabled} glass={args.glass}>
          <CascaderOption value="usa" label="United States">
            <CascaderOption value="california" label="California">
              <CascaderOption value="san-francisco" label="San Francisco" />
              <CascaderOption value="los-angeles" label="Los Angeles" />
            </CascaderOption>
            <CascaderOption value="new-york" label="New York">
              <CascaderOption value="new-york-city" label="New York City" />
            </CascaderOption>
          </CascaderOption>
          <CascaderOption value="canada" label="Canada">
            <CascaderOption value="ontario" label="Ontario">
              <CascaderOption value="toronto" label="Toronto" />
            </CascaderOption>
          </CascaderOption>
        </Cascader>
      </div>
    );
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium">Extra Small</p>
        <Cascader size="xs" placeholder="XS Cascader">
          <CascaderOption value="usa" label="United States">
            <CascaderOption value="california" label="California" />
          </CascaderOption>
        </Cascader>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Small</p>
        <Cascader size="sm" placeholder="SM Cascader">
          <CascaderOption value="usa" label="United States">
            <CascaderOption value="california" label="California" />
          </CascaderOption>
        </Cascader>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Medium (Default)</p>
        <Cascader size="md" placeholder="MD Cascader">
          <CascaderOption value="usa" label="United States">
            <CascaderOption value="california" label="California" />
          </CascaderOption>
        </Cascader>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Large</p>
        <Cascader size="lg" placeholder="LG Cascader">
          <CascaderOption value="usa" label="United States">
            <CascaderOption value="california" label="California" />
          </CascaderOption>
        </Cascader>
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Cascader size="xs" placeholder="XS Cascader">
  <CascaderOption value="usa" label="United States">
    <CascaderOption value="california" label="California" />
  </CascaderOption>
</Cascader>

<Cascader size="sm" placeholder="SM Cascader">
  <CascaderOption value="usa" label="United States">
    <CascaderOption value="california" label="California" />
  </CascaderOption>
</Cascader>

<Cascader size="md" placeholder="MD Cascader">
  <CascaderOption value="usa" label="United States">
    <CascaderOption value="california" label="California" />
  </CascaderOption>
</Cascader>

<Cascader size="lg" placeholder="LG Cascader">
  <CascaderOption value="usa" label="United States">
    <CascaderOption value="california" label="California" />
  </CascaderOption>
</Cascader>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}