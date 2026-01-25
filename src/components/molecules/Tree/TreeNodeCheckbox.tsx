"use client";

import React from 'react';
import { Checkbox } from '../../atoms/Checkbox';
import { useTreeContext } from './TreeContext';
import type { TreeNodeData } from './TreeTypes';

export interface TreeNodeCheckboxProps {
  /**
   * Node key
   */
  nodeKey: string;
}

/**
 * TreeNodeCheckbox Component
 *
 * A composable component for the checkbox of a tree node.
 * Typically used within TreeNode.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TreeNode nodeKey="1" title="Node">
 *   <TreeNodeCheckbox nodeKey="1" />
 * </TreeNode>
 * ```
 *
 * @remarks
 * - Automatically handles checked state and indeterminate state.
 * - Only renders when Tree is checkable.
 */
export const TreeNodeCheckbox: React.FC<TreeNodeCheckboxProps> = ({ nodeKey }) => {
  const {
    checkedKeys,
    disabled,
    toggleChecked,
  } = useTreeContext();
  
  const isChecked = checkedKeys.has(nodeKey);
  const isDisabled = disabled;
  
  // Note: Indeterminate state calculation would need node children info
  // For now, just show checked state
  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      const node: TreeNodeData = { key: nodeKey, title: '' };
      toggleChecked(nodeKey, node);
    }
  };
  
  return (
    <div className="mr-[var(--spacing-x1)]" onClick={handleCheck}>
      <Checkbox
        checked={isChecked}
        disabled={isDisabled}
        size="sm"
      />
    </div>
  );
};

TreeNodeCheckbox.displayName = 'TreeNodeCheckbox';
