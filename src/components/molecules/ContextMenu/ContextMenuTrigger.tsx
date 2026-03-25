"use client";

import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { cn } from '../../../lib/utils';

export interface ContextMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Trigger> {
  children?: React.ReactNode;
}

/**
 * ContextMenuTrigger Component
 *
 * The area that opens the context menu on right-click.
 *
 * @public
 */
const ContextMenuTrigger = React.forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ContextMenuPrimitive.Trigger
        ref={ref}
        className={cn(className)}
        data-slot="context-menu-trigger"
        {...props}
      >
        {children}
      </ContextMenuPrimitive.Trigger>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export { ContextMenuTrigger };
