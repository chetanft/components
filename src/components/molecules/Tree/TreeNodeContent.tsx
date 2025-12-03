"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useTreeContext } from './TreeContext';
import { TreeNodeIcon } from './TreeNodeIcon';

export interface TreeNodeContentProps extends ComposableProps<'div'> {
  /**
   * Node key
   */
  nodeKey: string;
  /**
   * Custom icon (optional)
   */
  icon?: React.ReactNode;
  /**
   * Content (typically node title)
   */
  children: React.ReactNode;
}

/**
 * TreeNodeContent Component
 *
 * A composable component for the content of a tree node.
 * Typically used within TreeNode.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TreeNode nodeKey="1">
 *   <TreeNodeContent nodeKey="1">
 *     Node Title
 *   </TreeNodeContent>
 * </TreeNode>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles selection and icon display.
 */
export const TreeNodeContent = React.forwardRef<HTMLDivElement, TreeNodeContentProps>(
  ({ className, nodeKey, icon, children, asChild, ...props }, ref) => {
    const { selectable, disabled } = useTreeContext();
    const isNodeDisabled = disabled;
    const isNodeSelectable = selectable;
    
    const Comp = asChild ? Slot : 'div';
    // Cast children and icon to exclude bigint which Slot doesn't accept
    const safeChildren = children as Exclude<React.ReactNode, bigint> | undefined;
    const safeIcon = icon as Exclude<React.ReactNode, bigint> | undefined;
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center flex-1 min-w-0",
          isNodeSelectable && !isNodeDisabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        <TreeNodeIcon nodeKey={nodeKey} isLeaf={false} icon={safeIcon} />
        <span className="truncate text-[var(--color-primary)]">
          {safeChildren}
        </span>
      </Comp>
    );
  }
);

TreeNodeContent.displayName = 'TreeNodeContent';

