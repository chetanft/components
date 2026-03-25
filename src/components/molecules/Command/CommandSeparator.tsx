"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> {}

/**
 * CommandSeparator Component
 *
 * A visual separator between command groups.
 *
 * @public
 */
export const CommandSeparator = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  CommandSeparatorProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    data-slot="command-separator"
    className={cn(
      "-mx-[var(--spacing-x1)] h-px bg-[var(--border-primary)]",
      className
    )}
    {...props}
  />
));

CommandSeparator.displayName = "CommandSeparator";
