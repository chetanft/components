"use client";

import React, { forwardRef } from 'react';
import { cn } from '../../../lib/utils';

export interface CommandShortcutProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

/**
 * CommandShortcut Component
 *
 * Displays a keyboard shortcut hint alongside a command item.
 *
 * @public
 *
 * @example
 * ```tsx
 * <CommandItem>
 *   Profile
 *   <CommandShortcut>Ctrl+P</CommandShortcut>
 * </CommandItem>
 * ```
 */
export const CommandShortcut = forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-[var(--text-tertiary)]",
        className
      )}
      {...props}
    />
  )
);

CommandShortcut.displayName = "CommandShortcut";
