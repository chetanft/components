import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tree, TreeNode } from './index';
import { TreeNodeContent } from './TreeNodeContent';
import { TreeNodeIcon } from './TreeNodeIcon';
import { TreeNodeSwitcher } from './TreeNodeSwitcher';
import { TreeNodeCheckbox } from './TreeNodeCheckbox';
import { Icon } from '../../atoms/Icons';

const meta: Meta<typeof Tree> = {
  title: 'Molecules/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tree component for displaying hierarchical data with expand/collapse, selection, and checkbox support. Built using FT Design System tokens.',
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
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'with-icons', label: 'Icons', story: 'ExplorerBase', args: { contentType: 'with-icons' } },
            { id: 'with-checkboxes', label: 'Checkboxes', story: 'ExplorerBase', args: { contentType: 'with-checkboxes' } },
            { id: 'directory-tree', label: 'Directory', story: 'ExplorerBase', args: { contentType: 'directory' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'with-selection', label: 'Selection', story: 'ExplorerBase', args: { contentType: 'with-selection' } },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checkable: {
      control: 'boolean',
      description: 'Show checkboxes',
    },
    selectable: {
      control: 'boolean',
      description: 'Allow node selection',
    },
    showLine: {
      control: 'boolean',
      description: 'Show connecting lines',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show node icons',
    },
    defaultExpandAll: {
      control: 'boolean',
      description: 'Expand all nodes by default',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tree',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const syncKey = JSON.stringify({ contentType, glass: args.glass });
    return (
      <div key={syncKey}>
        {contentType === 'with-icons' ? (
          <Tree defaultExpandAll showIcon>
            <TreeNode nodeKey="src" title="src" icon={<Icon name="document" size={16} />}>
              <TreeNode nodeKey="components" title="components" icon={<Icon name="document" size={16} />}>
                <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
                <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
              </TreeNode>
              <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
            </TreeNode>
          </Tree>
        ) : contentType === 'with-checkboxes' ? (
          <Tree checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={setCheckedKeys}>
            <TreeNode nodeKey="0-0" title="Parent 0">
              <TreeNode nodeKey="0-0-0" title="Child 0-0" isLeaf />
              <TreeNode nodeKey="0-0-1" title="Child 0-1" isLeaf />
            </TreeNode>
            <TreeNode nodeKey="0-1" title="Parent 1">
              <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
            </TreeNode>
          </Tree>
        ) : contentType === 'directory' ? (
          <Tree defaultExpandAll showIcon showLine>
            <TreeNode nodeKey="src" title="src" icon={<Icon name="document" size={16} />}>
              <TreeNode nodeKey="components" title="components" icon={<Icon name="document" size={16} />}>
                <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
                <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
              </TreeNode>
              <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
            </TreeNode>
            <TreeNode nodeKey="package.json" title="package.json" isLeaf icon={<Icon name="file" size={16} />} />
          </Tree>
        ) : contentType === 'with-selection' ? (
          <Tree selectable defaultExpandAll selectedKeys={selectedKeys} onSelect={setSelectedKeys}>
            <TreeNode nodeKey="0-0" title="Parent 0">
              <TreeNode nodeKey="0-0-0" title="Child 0-0" isLeaf />
              <TreeNode nodeKey="0-0-1" title="Child 0-1" isLeaf />
            </TreeNode>
            <TreeNode nodeKey="0-1" title="Parent 1">
              <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
            </TreeNode>
          </Tree>
        ) : (
          <Tree defaultExpandAll>
            <TreeNode nodeKey="0-0" title="Parent 0">
              <TreeNode nodeKey="0-0-0" title="Child 0-0">
                <TreeNode nodeKey="0-0-0-0" title="Leaf 0-0-0" isLeaf />
                <TreeNode nodeKey="0-0-0-1" title="Leaf 0-0-1" isLeaf />
              </TreeNode>
              <TreeNode nodeKey="0-0-1" title="Child 0-1">
                <TreeNode nodeKey="0-0-1-0" title="Leaf 0-1-0" isLeaf />
              </TreeNode>
            </TreeNode>
            <TreeNode nodeKey="0-1" title="Parent 1">
              <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
              <TreeNode nodeKey="0-1-1" title="Child 1-1" isLeaf />
            </TreeNode>
          </Tree>
        )}
      </div>
    );
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">Default</p>
        <Tree defaultExpandAll>
          <TreeNode nodeKey="v-0" title="Parent">
            <TreeNode nodeKey="v-0-0" title="Child A" isLeaf />
            <TreeNode nodeKey="v-0-1" title="Child B" isLeaf />
          </TreeNode>
        </Tree>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Lines</p>
        <Tree defaultExpandAll showLine>
          <TreeNode nodeKey="vl-0" title="Parent">
            <TreeNode nodeKey="vl-0-0" title="Child A" isLeaf />
            <TreeNode nodeKey="vl-0-1" title="Child B" isLeaf />
          </TreeNode>
        </Tree>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Icons</p>
        <Tree defaultExpandAll showIcon>
          <TreeNode nodeKey="vi-0" title="Folder" icon={<Icon name="document" size={16} />}>
            <TreeNode nodeKey="vi-0-0" title="File A" isLeaf icon={<Icon name="file" size={16} />} />
            <TreeNode nodeKey="vi-0-1" title="File B" isLeaf icon={<Icon name="file" size={16} />} />
          </TreeNode>
        </Tree>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Checkboxes</p>
        <Tree defaultExpandAll checkable>
          <TreeNode nodeKey="vc-0" title="Parent">
            <TreeNode nodeKey="vc-0-0" title="Child A" isLeaf />
            <TreeNode nodeKey="vc-0-1" title="Child B" isLeaf />
          </TreeNode>
        </Tree>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Selectable</p>
        <Tree defaultExpandAll selectable>
          <TreeNode nodeKey="vs-0" title="Parent">
            <TreeNode nodeKey="vs-0-0" title="Child A" isLeaf />
            <TreeNode nodeKey="vs-0-1" title="Child B" isLeaf />
          </TreeNode>
        </Tree>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'All visual variants of the Tree component shown side-by-side: default, with lines, icons, checkboxes, and selectable.',
      },
      source: {
        code: `{/* Default */}
<Tree defaultExpandAll>
  <TreeNode nodeKey="v-0" title="Parent">
    <TreeNode nodeKey="v-0-0" title="Child A" isLeaf />
    <TreeNode nodeKey="v-0-1" title="Child B" isLeaf />
  </TreeNode>
</Tree>

{/* With Lines */}
<Tree defaultExpandAll showLine>
  <TreeNode nodeKey="vl-0" title="Parent">
    <TreeNode nodeKey="vl-0-0" title="Child A" isLeaf />
    <TreeNode nodeKey="vl-0-1" title="Child B" isLeaf />
  </TreeNode>
</Tree>

{/* With Icons */}
<Tree defaultExpandAll showIcon>
  <TreeNode nodeKey="vi-0" title="Folder" icon={<Icon name="document" size={16} />}>
    <TreeNode nodeKey="vi-0-0" title="File A" isLeaf icon={<Icon name="file" size={16} />} />
    <TreeNode nodeKey="vi-0-1" title="File B" isLeaf icon={<Icon name="file" size={16} />} />
  </TreeNode>
</Tree>

{/* With Checkboxes */}
<Tree defaultExpandAll checkable>
  <TreeNode nodeKey="vc-0" title="Parent">
    <TreeNode nodeKey="vc-0-0" title="Child A" isLeaf />
    <TreeNode nodeKey="vc-0-1" title="Child B" isLeaf />
  </TreeNode>
</Tree>

{/* Selectable */}
<Tree defaultExpandAll selectable>
  <TreeNode nodeKey="vs-0" title="Parent">
    <TreeNode nodeKey="vs-0-0" title="Child A" isLeaf />
    <TreeNode nodeKey="vs-0-1" title="Child B" isLeaf />
  </TreeNode>
</Tree>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsStates: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">Disabled Tree</p>
        <Tree defaultExpandAll disabled>
          <TreeNode nodeKey="sd-0" title="Disabled Parent">
            <TreeNode nodeKey="sd-0-0" title="Disabled Child A" isLeaf />
            <TreeNode nodeKey="sd-0-1" title="Disabled Child B" isLeaf />
          </TreeNode>
        </Tree>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Mixed Disabled Nodes</p>
        <Tree defaultExpandAll checkable>
          <TreeNode nodeKey="sm-0" title="Enabled Parent">
            <TreeNode nodeKey="sm-0-0" title="Enabled Node" isLeaf />
            <TreeNode nodeKey="sm-0-1" title="Disabled Node" isLeaf disabled />
            <TreeNode nodeKey="sm-0-2" title="Enabled Node" isLeaf />
          </TreeNode>
          <TreeNode nodeKey="sm-1" title="Disabled Parent" disabled>
            <TreeNode nodeKey="sm-1-0" title="Child Node" isLeaf />
          </TreeNode>
        </Tree>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Tree states: fully disabled tree and mixed disabled nodes.',
      },
      source: {
        code: `{/* Disabled Tree */}
<Tree defaultExpandAll disabled>
  <TreeNode nodeKey="sd-0" title="Disabled Parent">
    <TreeNode nodeKey="sd-0-0" title="Disabled Child A" isLeaf />
    <TreeNode nodeKey="sd-0-1" title="Disabled Child B" isLeaf />
  </TreeNode>
</Tree>

{/* Mixed Disabled Nodes */}
<Tree defaultExpandAll checkable>
  <TreeNode nodeKey="sm-0" title="Enabled Parent">
    <TreeNode nodeKey="sm-0-0" title="Enabled Node" isLeaf />
    <TreeNode nodeKey="sm-0-1" title="Disabled Node" isLeaf disabled />
    <TreeNode nodeKey="sm-0-2" title="Enabled Node" isLeaf />
  </TreeNode>
  <TreeNode nodeKey="sm-1" title="Disabled Parent" disabled>
    <TreeNode nodeKey="sm-1-0" title="Child Node" isLeaf />
  </TreeNode>
</Tree>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Composable API Examples
export const Default: Story = {
  render: () => (
    <Tree defaultExpandAll>
      <TreeNode nodeKey="0-0" title="Parent 0">
        <TreeNode nodeKey="0-0-0" title="Child 0-0">
          <TreeNode nodeKey="0-0-0-0" title="Leaf 0-0-0" isLeaf />
          <TreeNode nodeKey="0-0-0-1" title="Leaf 0-0-1" isLeaf />
        </TreeNode>
        <TreeNode nodeKey="0-0-1" title="Child 0-1">
          <TreeNode nodeKey="0-0-1-0" title="Leaf 0-1-0" isLeaf />
        </TreeNode>
      </TreeNode>
      <TreeNode nodeKey="0-1" title="Parent 1">
        <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
        <TreeNode nodeKey="0-1-1" title="Child 1-1" isLeaf />
      </TreeNode>
    </Tree>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tree defaultExpandAll>
  <TreeNode nodeKey="0-0" title="Parent 0">
    <TreeNode nodeKey="0-0-0" title="Child 0-0">
      <TreeNode nodeKey="0-0-0-0" title="Leaf 0-0-0" isLeaf />
      <TreeNode nodeKey="0-0-0-1" title="Leaf 0-0-1" isLeaf />
    </TreeNode>
    <TreeNode nodeKey="0-0-1" title="Child 0-1">
      <TreeNode nodeKey="0-0-1-0" title="Leaf 0-1-0" isLeaf />
    </TreeNode>
  </TreeNode>
  <TreeNode nodeKey="0-1" title="Parent 1">
    <TreeNode nodeKey="0-1-0" title="Child 1-0" isLeaf />
    <TreeNode nodeKey="0-1-1" title="Child 1-1" isLeaf />
  </TreeNode>
</Tree>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsWithIcons: Story = {
  render: () => (
    <Tree defaultExpandAll showIcon>
      <TreeNode
        nodeKey="src"
        title="src"
        icon={<Icon name="document" size={16} />}
      >
        <TreeNode
          nodeKey="components"
          title="components"
          icon={<Icon name="document" size={16} />}
        >
          <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
          <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
        </TreeNode>
        <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
      </TreeNode>
      <TreeNode nodeKey="package.json" title="package.json" isLeaf icon={<Icon name="file" size={16} />} />
    </Tree>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Tree defaultExpandAll showIcon>
  <TreeNode nodeKey="src" title="src" icon={<Icon name="document" size={16} />}>
    <TreeNode nodeKey="components" title="components" icon={<Icon name="document" size={16} />}>
      <TreeNode nodeKey="Button.tsx" title="Button.tsx" isLeaf icon={<Icon name="file" size={16} />} />
      <TreeNode nodeKey="Input.tsx" title="Input.tsx" isLeaf icon={<Icon name="file" size={16} />} />
    </TreeNode>
    <TreeNode nodeKey="index.ts" title="index.ts" isLeaf icon={<Icon name="file" size={16} />} />
  </TreeNode>
  <TreeNode nodeKey="package.json" title="package.json" isLeaf icon={<Icon name="file" size={16} />} />
</Tree>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}