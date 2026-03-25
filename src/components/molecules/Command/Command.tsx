"use client";

import React, { forwardRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { cn } from '../../../lib/utils';

export interface CommandProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive> {}

/**
 * Command Component
 *
 * A command palette / search interface built on cmdk.
 * Can be used standalone or inside a CommandDialog for a Cmd+K palette.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 * ```
 */
export const Command = forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandProps
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    data-slot="command"
    className={cn(
      "flex h-full w-full flex-col overflow-hidden",
      "rounded-[var(--radius-lg)]",
      "bg-[var(--bg-primary)] text-[var(--text-primary)]",
      className
    )}
    {...props}
  />
));

Command.displayName = "Command";

export default Command;
