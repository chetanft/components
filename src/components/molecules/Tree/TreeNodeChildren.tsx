"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface TreeNodeChildrenProps extends ComposableProps<'div'> {
  /**
   * Child nodes (typically TreeNode components)
   */
  children: React.ReactNode;
  /**
   * Node level (for indentation)
   */
  level: number;
  /**
   * Show connecting lines
   */
  showLine?: boolean;
}

/**
 * TreeNodeChildren Component
 *
 * A composable component for child nodes of a tree node.
 * Typically used within TreeNode.
 *
 * @public
 *
 * @example
 * ```tsx
 * <TreeNode nodeKey="1" title="Parent">
 *   <TreeNodeChildren level={1}>
 *     <TreeNode nodeKey="1-1" title="Child" />
 *   </TreeNodeChildren>
 * </TreeNode>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically handles indentation and connecting lines.
 */
export const TreeNodeChildren = React.forwardRef<HTMLDivElement, TreeNodeChildrenProps>(
  ({ className, children, level, showLine, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          showLine && "border-l border-[var(--color-border-secondary)] ml-[calc(var(--spacing-x3)-1px)]",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

TreeNodeChildren.displayName = 'TreeNodeChildren';

