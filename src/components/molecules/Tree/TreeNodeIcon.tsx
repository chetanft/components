"use client";

import React from 'react';
import { Icon, type IconName } from '../../atoms/Icons';
import { useTreeContext } from './TreeContext';

export interface TreeNodeIconProps {
  /**
   * Node key
   */
  nodeKey: string;
  /**
   * Whether this is a leaf node
   */
  isLeaf: boolean;
  /**
   * Custom icon (optional)
   */
  icon?: React.ReactNode;
  /**
   * Custom icon content (optional)
   */
  children?: React.ReactNode;
}

/**
 * TreeNodeIcon Component
 *
 * A composable component for the icon of a tree node.
 * Typically used within TreeNodeContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TreeNodeContent nodeKey="1">
 *   <TreeNodeIcon nodeKey="1" isLeaf={false} />
 *   Node Title
 * </TreeNodeContent>
 * ```
 *
 * @remarks
 * - Automatically shows appropriate icon based on node state.
 * - Supports custom icons via icon prop.
 */
export const TreeNodeIcon: React.FC<TreeNodeIconProps> = ({ nodeKey, isLeaf, icon, children }) => {
  const {
    expandedKeys,
    showIcon,
    icon: treeIcon,
  } = useTreeContext();
  
  if (!showIcon) return null;
  
  if (children) {
    return <span className="mr-[var(--spacing-x1)]">{children}</span>;
  }
  
  const isExpanded = expandedKeys.has(nodeKey);
  
  let iconElement: React.ReactNode;
  
  if (icon) {
    iconElement = icon;
  } else if (treeIcon) {
    if (typeof treeIcon === 'function') {
      iconElement = treeIcon({ expanded: isExpanded, isLeaf });
    } else {
      iconElement = <Icon name={treeIcon} size={16} className="text-[var(--color-secondary)]" />;
    }
  } else {
    iconElement = (
      <Icon
        name={isLeaf ? 'file' : 'bundle'}
        size={16}
        className="text-[var(--color-secondary)]"
      />
    );
  }
  
  return (
    <span className="mr-[var(--spacing-x1)]">
      {iconElement}
    </span>
  );
};

TreeNodeIcon.displayName = 'TreeNodeIcon';

