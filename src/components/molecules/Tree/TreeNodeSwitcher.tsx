"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { useTreeContext } from './TreeContext';
import type { TreeNodeData } from './Tree';

export interface TreeNodeSwitcherProps {
  /**
   * Node key
   */
  nodeKey: string;
  /**
   * Whether this is a leaf node
   */
  isLeaf: boolean;
  /**
   * Custom switcher content (optional)
   */
  children?: React.ReactNode;
}

/**
 * TreeNodeSwitcher Component
 *
 * A composable component for the expand/collapse switcher of a tree node.
 * Typically used within TreeNode.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TreeNode nodeKey="1" title="Node">
 *   <TreeNodeSwitcher nodeKey="1" isLeaf={false} />
 * </TreeNode>
 * ```
 *
 * @remarks
 * - Automatically handles expand/collapse state.
 * - Shows chevron icon for expandable nodes, dot for leaf nodes.
 */
export const TreeNodeSwitcher: React.FC<TreeNodeSwitcherProps> = ({ nodeKey, isLeaf, children }) => {
  const {
    expandedKeys,
    showLine,
    disabled,
    switcherIcon,
    toggleExpanded,
  } = useTreeContext();
  
  const isExpanded = expandedKeys.has(nodeKey);
  const isDisabled = disabled;
  
  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLeaf && !isDisabled) {
      const node: TreeNodeData = { key: nodeKey, title: '' };
      toggleExpanded(nodeKey, node);
    }
  };
  
  if (children) {
    return <>{children}</>;
  }
  
  if (isLeaf) {
    return showLine ? (
      <span className="w-[var(--spacing-x6)] h-[var(--spacing-x6)] flex items-center justify-center">
        <span className="w-[calc((var(--spacing-x2)+var(--spacing-x1))/2)] h-[calc((var(--spacing-x2)+var(--spacing-x1))/2)] rounded-full bg-[var(--color-border-primary)]" />
      </span>
    ) : (
      <span className="w-[var(--spacing-x6)]" />
    );
  }
  
  const iconElement = switcherIcon
    ? typeof switcherIcon === 'function'
      ? switcherIcon({ expanded: isExpanded })
      : switcherIcon
    : (
      <Icon
        name={isExpanded ? 'chevron-down' : 'chevron-right'}
        size={16}
        className="text-[var(--color-tertiary)] transition-transform"
      />
    );
  
  return (
    <button
      type="button"
      onClick={handleExpand}
      className={cn(
        "w-[var(--spacing-x6)] h-[var(--spacing-x6)] flex items-center justify-center",
        "hover:bg-[var(--color-bg-secondary)] rounded transition-colors",
        isDisabled && "cursor-not-allowed opacity-50"
      )}
      disabled={isDisabled}
      aria-expanded={isExpanded}
    >
      {iconElement}
    </button>
  );
};

TreeNodeSwitcher.displayName = 'TreeNodeSwitcher';

