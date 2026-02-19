"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTreeContext } from './TreeContext';
import { TreeNodeSwitcher } from './TreeNodeSwitcher';
import { TreeNodeCheckbox } from './TreeNodeCheckbox';
import { TreeNodeIcon } from './TreeNodeIcon';
import { TreeNodeContent } from './TreeNodeContent';
import { TreeNodeChildren } from './TreeNodeChildren';
import type { TreeNodeData } from './TreeTypes';
import { getGlassInnerBg, type GlassVariant } from '../../../lib/glass';

export interface TreeNodeProps extends Omit<ComposableProps<'div'>, 'title'> {
  /**
   * Node key (unique identifier)
   */
  nodeKey: string;
  /**
   * Node title/content
   */
  title: React.ReactNode;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
  /**
   * Node level (for indentation)
   * @default 0
   */
  level?: number;
  /**
   * Whether this node is a leaf (has no children)
   */
  isLeaf?: boolean;
  /**
   * Whether this node is disabled
   */
  disabled?: boolean;
  /**
   * Whether this node is selectable
   */
  selectable?: boolean;
  /**
   * Whether this node is checkable
   */
  checkable?: boolean;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

/**
 * TreeNode Component
 *
 * A composable component for individual tree nodes.
 * Typically used within Tree.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Tree>
 *   <TreeNode nodeKey="1" title="Node 1">
 *     <TreeNode nodeKey="1-1" title="Child 1" />
 *   </TreeNode>
 * </Tree>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles expand/collapse, selection, and checking.
 */
export const TreeNode = React.forwardRef<HTMLDivElement, TreeNodeProps>(
  ({ className, nodeKey, title, children, level = 0, isLeaf, disabled, selectable, checkable, icon, asChild, ...props }, ref) => {
    const {
      expandedKeys,
      selectedKeys,
      checkedKeys,
      checkable: treeCheckable,
      selectable: treeSelectable,
      showLine,
      blockNode,
      glass: contextGlass,
      toggleExpanded: _toggleExpanded,
      toggleSelected,
      toggleChecked: _toggleChecked,
    } = useTreeContext();
    
    const node: TreeNodeData = {
      key: nodeKey,
      title,
      children: children ? [] : undefined,
      disabled,
      selectable,
      checkable,
      isLeaf,
      icon: icon as any,
    };
    
    const isExpanded = expandedKeys.has(nodeKey);
    const isSelected = selectedKeys.has(nodeKey);
    const _isChecked = checkedKeys.has(nodeKey);
    const hasChildren = !!children;
    const isNodeLeaf = isLeaf || !hasChildren;
    const isNodeDisabled = disabled;
    const isNodeCheckable = treeCheckable && checkable !== false;
    const isNodeSelectable = treeSelectable && selectable !== false;
    
    const handleSelect = () => {
      if (isNodeSelectable && !isNodeDisabled) {
        toggleSelected(nodeKey, node);
      }
    };
    
    const Comp = asChild ? Slot : 'div';
    return (
      <div className="tree-node">
        <Comp
          ref={ref}
          className={cn(
            "flex items-center py-[var(--spacing-x1)] px-[var(--spacing-x1)]",
            "rounded transition-colors",
            isSelected && cn(getGlassInnerBg(contextGlass, "bg-[var(--color-primary-light)]", "bg-white/15 dark:bg-white/15"), "text-[var(--color-primary)]"),
            !isSelected && !isNodeDisabled && (contextGlass ? "hover:bg-white/10 dark:hover:bg-white/10" : "hover:bg-[var(--color-bg-secondary)]"),
            isNodeDisabled && "opacity-50 cursor-not-allowed",
            blockNode && "w-full",
            className
          )}
          style={{ paddingLeft: `calc(${level} * var(--spacing-x6))` }}
          onClick={handleSelect}
          {...props}
        >
          <TreeNodeSwitcher nodeKey={nodeKey} isLeaf={isNodeLeaf} />
          {isNodeCheckable && <TreeNodeCheckbox nodeKey={nodeKey} />}
          <TreeNodeContent nodeKey={nodeKey} icon={icon}>
            {title}
          </TreeNodeContent>
        </Comp>
        {hasChildren && isExpanded && (
          <TreeNodeChildren level={level + 1} showLine={showLine}>
            {children}
          </TreeNodeChildren>
        )}
      </div>
    );
  }
);

TreeNode.displayName = 'TreeNode';
