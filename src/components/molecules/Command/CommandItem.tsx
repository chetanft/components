"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandItemProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {}

/**
 * CommandItem Component
 *
 * An individual selectable item in the command palette.
 * Highlights on hover and keyboard selection.
 *
 * @public
 */
export const CommandItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandItemProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    data-slot="command-item"
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-[var(--spacing-x2)]",
      "rounded-[var(--radius-md)] px-[var(--spacing-x2)] py-[var(--spacing-x1-5)]",
      "text-[length:var(--font-size-sm-rem)] text-[var(--text-primary)] outline-none",
      "data-[selected=true]:bg-[var(--bg-secondary)] data-[selected=true]:text-[var(--text-primary)]",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));

CommandItem.displayName = "CommandItem";
