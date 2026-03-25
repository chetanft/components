"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandEmptyProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> {}

/**
 * CommandEmpty Component
 *
 * Displayed when no results are found in the command palette.
 *
 * @public
 */
export const CommandEmpty = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  CommandEmptyProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    data-slot="command-empty"
    className={cn(
      "py-[var(--spacing-x6)] text-center text-sm text-[var(--secondary)]",
      className
    )}
    {...props}
  />
));

CommandEmpty.displayName = "CommandEmpty";
