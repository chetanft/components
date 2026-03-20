import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeSelect } from './TreeSelect';
import { TreeNode } from '../Tree/TreeNode';

const meta = {
  title: 'Molecules/TreeSelect',
  component: TreeSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'TreeSelect lets users select options from hierarchical data structures with optional search and multi-select.',
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
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Single Select', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'multi-check', label: 'Multi Check', story: 'ExplorerBase', args: { contentType: 'multi-check' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'error', label: 'Error', story: 'ExplorerBase', args: { error: 'Please select at least one team' } },
            { id: 'disabled', label: 'Disabled', story: 'ExplorerBase', args: { disabled: true } },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple nodes',
    },
    treeCheckable: {
      control: 'boolean',
      description: 'Show checkboxes next to nodes',
    },
    showSearch: {
      control: 'boolean',
      description: 'Enable search input inside dropdown',
    },
  },
  args: {
    placeholder: 'Choose a team',
    showSearch: true,
  },
} satisfies Meta<typeof TreeSelect>;

export default meta;
type Story = StoryObj<typeof TreeSelect>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const disabled = Boolean(args.disabled);
    const error = args.error;
    const syncKey = JSON.stringify({ contentType, disabled, error });
    return (
      <div key={syncKey}>
        {contentType === 'multi-check' ? (
          <TreeSelect placeholder="Choose teams" multiple treeCheckable showSearch disabled={disabled} error={error}>
            <TreeNode nodeKey="design" title="Design">
              <TreeNode nodeKey="design-ui" title="UI Team" />
              <TreeNode nodeKey="design-brand" title="Brand Team" />
            </TreeNode>
            <TreeNode nodeKey="engineering" title="Engineering">
              <TreeNode nodeKey="fe" title="Frontend" />
              <TreeNode nodeKey="be" title="Backend" />
            </TreeNode>
          </TreeSelect>
        ) : (
          <TreeSelect label="Select organization unit" placeholder="Choose a team" showSearch disabled={disabled} error={error}>
            <TreeNode nodeKey="design" title="Design">
              <TreeNode nodeKey="design-ui" title="UI Team" />
              <TreeNode nodeKey="design-brand" title="Brand Team" />
            </TreeNode>
            <TreeNode nodeKey="engineering" title="Engineering">
              <TreeNode nodeKey="fe" title="Frontend">
                <TreeNode nodeKey="fe-platform" title="Platform" />
                <TreeNode nodeKey="fe-experience" title="Experience" />
              </TreeNode>
              <TreeNode nodeKey="be" title="Backend" />
            </TreeNode>
          </TreeSelect>
        )}
      </div>
    );
  },
};

export const Default: Story = {
  render: () => (
    <TreeSelect
      label="Select organization unit"
      placeholder="Choose a team"
      showSearch={true}
      helperText="Use search to quickly filter nodes"
    >
      <TreeNode nodeKey="design" title="Design">
        <TreeNode nodeKey="design-ui" title="UI Team" />
        <TreeNode nodeKey="design-brand" title="Brand Team" />
      </TreeNode>
      <TreeNode nodeKey="engineering" title="Engineering">
        <TreeNode nodeKey="fe" title="Frontend">
          <TreeNode nodeKey="fe-platform" title="Platform" />
          <TreeNode nodeKey="fe-experience" title="Experience" />
        </TreeNode>
        <TreeNode nodeKey="be" title="Backend" />
      </TreeNode>
      <TreeNode nodeKey="product" title="Product">
        <TreeNode nodeKey="product-discovery" title="Discovery" />
        <TreeNode nodeKey="product-research" title="Research" />
      </TreeNode>
    </TreeSelect>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TreeSelect
  label="Select organization unit"
  placeholder="Choose a team"
  showSearch={true}
  helperText="Use search to quickly filter nodes"
>
  <TreeNode nodeKey="design" title="Design">
    <TreeNode nodeKey="design-ui" title="UI Team" />
    <TreeNode nodeKey="design-brand" title="Brand Team" />
  </TreeNode>
  <TreeNode nodeKey="engineering" title="Engineering">
    <TreeNode nodeKey="fe" title="Frontend">
      <TreeNode nodeKey="fe-platform" title="Platform" />
      <TreeNode nodeKey="fe-experience" title="Experience" />
    </TreeNode>
    <TreeNode nodeKey="be" title="Backend" />
  </TreeNode>
  <TreeNode nodeKey="product" title="Product">
    <TreeNode nodeKey="product-discovery" title="Discovery" />
    <TreeNode nodeKey="product-research" title="Research" />
  </TreeNode>
</TreeSelect>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10" style={{ minHeight: 400 }}>
      <div>
        <p className="text-sm font-semibold mb-2">Single Select</p>
        <TreeSelect placeholder="Choose a team" showSearch>
          <TreeNode nodeKey="design" title="Design">
            <TreeNode nodeKey="design-ui" title="UI Team" />
            <TreeNode nodeKey="design-brand" title="Brand Team" />
          </TreeNode>
          <TreeNode nodeKey="engineering" title="Engineering">
            <TreeNode nodeKey="fe" title="Frontend" />
            <TreeNode nodeKey="be" title="Backend" />
          </TreeNode>
        </TreeSelect>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Multiple Select with Checkboxes</p>
        <TreeSelect placeholder="Choose teams" multiple treeCheckable showSearch>
          <TreeNode nodeKey="design2" title="Design">
            <TreeNode nodeKey="design-ui2" title="UI Team" />
            <TreeNode nodeKey="design-brand2" title="Brand Team" />
          </TreeNode>
          <TreeNode nodeKey="engineering2" title="Engineering">
            <TreeNode nodeKey="fe2" title="Frontend" />
            <TreeNode nodeKey="be2" title="Backend" />
          </TreeNode>
        </TreeSelect>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'All visual variants of the TreeSelect component shown side-by-side: single select and multiple select with checkboxes.',
      },
      source: {
        code: `{/* Single Select */}
<TreeSelect placeholder="Choose a team" showSearch>
  <TreeNode nodeKey="design" title="Design">
    <TreeNode nodeKey="design-ui" title="UI Team" />
    <TreeNode nodeKey="design-brand" title="Brand Team" />
  </TreeNode>
  <TreeNode nodeKey="engineering" title="Engineering">
    <TreeNode nodeKey="fe" title="Frontend" />
    <TreeNode nodeKey="be" title="Backend" />
  </TreeNode>
</TreeSelect>

{/* Multiple Select with Checkboxes */}
<TreeSelect placeholder="Choose teams" multiple treeCheckable showSearch>
  <TreeNode nodeKey="design2" title="Design">
    <TreeNode nodeKey="design-ui2" title="UI Team" />
    <TreeNode nodeKey="design-brand2" title="Brand Team" />
  </TreeNode>
  <TreeNode nodeKey="engineering2" title="Engineering">
    <TreeNode nodeKey="fe2" title="Frontend" />
    <TreeNode nodeKey="be2" title="Backend" />
  </TreeNode>
</TreeSelect>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsStates: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10" style={{ minHeight: 300 }}>
      <div>
        <p className="text-sm font-semibold mb-2">Default</p>
        <TreeSelect placeholder="Choose a team">
          <TreeNode nodeKey="s-design" title="Design">
            <TreeNode nodeKey="s-design-ui" title="UI Team" />
          </TreeNode>
        </TreeSelect>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Disabled</p>
        <TreeSelect placeholder="Choose a team" disabled>
          <TreeNode nodeKey="s-design2" title="Design">
            <TreeNode nodeKey="s-design-ui2" title="UI Team" />
          </TreeNode>
        </TreeSelect>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Error</p>
        <TreeSelect placeholder="Select teams" error="Please choose at least one team">
          <TreeNode nodeKey="s-design3" title="Design">
            <TreeNode nodeKey="s-design-ui3" title="UI Team" />
          </TreeNode>
        </TreeSelect>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'TreeSelect states: default, disabled, and error.',
      },
      source: {
        code: `{/* Default */}
<TreeSelect placeholder="Choose a team">
  <TreeNode nodeKey="s-design" title="Design">
    <TreeNode nodeKey="s-design-ui" title="UI Team" />
  </TreeNode>
</TreeSelect>

{/* Disabled */}
<TreeSelect placeholder="Choose a team" disabled>
  <TreeNode nodeKey="s-design2" title="Design">
    <TreeNode nodeKey="s-design-ui2" title="UI Team" />
  </TreeNode>
</TreeSelect>

{/* Error */}
<TreeSelect placeholder="Select teams" error="Please choose at least one team">
  <TreeNode nodeKey="s-design3" title="Design">
    <TreeNode nodeKey="s-design-ui3" title="UI Team" />
  </TreeNode>
</TreeSelect>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsMultiCheck: Story = {
  render: () => (
    <TreeSelect placeholder="Choose teams" multiple treeCheckable showSearch helperText="Select one or more teams">
      <TreeNode nodeKey="design-m" title="Design">
        <TreeNode nodeKey="design-ui-m" title="UI Team" />
        <TreeNode nodeKey="design-brand-m" title="Brand Team" />
      </TreeNode>
      <TreeNode nodeKey="engineering-m" title="Engineering">
        <TreeNode nodeKey="fe-m" title="Frontend" />
        <TreeNode nodeKey="be-m" title="Backend" />
      </TreeNode>
    </TreeSelect>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<TreeSelect placeholder="Choose teams" multiple treeCheckable showSearch helperText="Select one or more teams">
  <TreeNode nodeKey="design-m" title="Design">
    <TreeNode nodeKey="design-ui-m" title="UI Team" />
    <TreeNode nodeKey="design-brand-m" title="Brand Team" />
  </TreeNode>
  <TreeNode nodeKey="engineering-m" title="Engineering">
    <TreeNode nodeKey="fe-m" title="Frontend" />
    <TreeNode nodeKey="be-m" title="Backend" />
  </TreeNode>
</TreeSelect>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}