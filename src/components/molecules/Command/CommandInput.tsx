"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface CommandInputProps
  extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {}

/**
 * CommandInput Component
 *
 * Search input for the command palette with a search icon.
 *
 * @public
 */
export const CommandInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => (
  <div
    className="flex items-center gap-[var(--spacing-x2)] border-b border-[var(--border-primary)] px-[var(--spacing-x3)]"
    data-slot="command-input-wrapper"
    // eslint-disable-next-line react/no-unknown-property
    cmdk-input-wrapper=""
  >
    <Icon
      name="search"
      size={16}
      className="shrink-0 text-[var(--secondary)]"
    />
    <CommandPrimitive.Input
      ref={ref}
      data-slot="command-input"
      className={cn(
        "flex h-[var(--spacing-x10)] w-full rounded-[var(--radius-md)]",
        "bg-transparent py-[var(--spacing-x3)]",
        "text-[length:var(--font-size-sm-rem)] text-[var(--text-primary)]",
        "placeholder:text-[var(--text-tertiary)]",
        "outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = "CommandInput";
