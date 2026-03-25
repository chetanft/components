"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent> {
  children?: React.ReactNode;
}

/**
 * ContextMenuSubContent Component
 *
 * The floating content panel for a sub-menu.
 * Renders in a portal with collision detection and animations.
 *
 * @public
 */
const ContextMenuSubContent = React.forwardRef<HTMLDivElement, ContextMenuSubContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.SubContent
          ref={ref}
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-secondary)] bg-[var(--bg-primary)] p-[var(--spacing-x1)] text-[var(--primary)] shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          data-slot="context-menu-sub-content"
          {...props}
        >
          {children}
        </ContextMenuPrimitive.SubContent>
      </ContextMenuPrimitive.Portal>
    );
  }
);

ContextMenuSubContent.displayName = 'ContextMenuSubContent';

export { ContextMenuSubContent };
