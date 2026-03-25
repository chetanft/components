"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandGroupProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> {}

/**
 * CommandGroup Component
 *
 * Groups command items with an optional heading.
 *
 * @public
 */
export const CommandGroup = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  CommandGroupProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    data-slot="command-group"
    className={cn(
      "overflow-hidden p-[var(--spacing-x1)]",
      "[&_[cmdk-group-heading]]:px-[var(--spacing-x2)] [&_[cmdk-group-heading]]:py-[var(--spacing-x1-5)]",
      "[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:text-[var(--secondary)]",
      className
    )}
    {...props}
  />
));

CommandGroup.displayName = "CommandGroup";
