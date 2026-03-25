"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandListProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> {}

/**
 * CommandList Component
 *
 * Scrollable results list for the command palette.
 *
 * @public
 */
export const CommandList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  CommandListProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    data-slot="command-list"
    className={cn(
      "max-h-[var(--spacing-x20,18.75rem)] overflow-y-auto overflow-x-hidden",
      "p-[var(--spacing-x1)]",
      className
    )}
    {...props}
  />
));

CommandList.displayName = "CommandList";
