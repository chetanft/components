"use client";

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '../../../lib/utils';
import { Command } from './Command';
import type { CommandProps } from './Command';

export interface CommandDialogProps extends CommandProps {
  /** Whether the dialog is open */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Children to render inside the command palette */
  children?: React.ReactNode;
}

/**
 * CommandDialog Component
 *
 * Wraps the Command component inside a Radix Dialog for use
 * as a Cmd+K style command palette overlay.
 *
 * @public
 *
 * @example
 * ```tsx
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Type a command or search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </CommandDialog>
 * ```
 */
export const CommandDialog = ({
  children,
  open,
  onOpenChange,
  className,
  ...props
}: CommandDialogProps) => (
  <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
      />
      <DialogPrimitive.Content
        data-slot="command-dialog"
        className={cn(
          "fixed left-[50%] top-[25%] z-50 w-full max-w-lg translate-x-[-50%]",
          "rounded-[var(--radius-lg)]",
          "border border-[var(--border-primary)]",
          "bg-[var(--bg-primary)]",
          "shadow-[var(--shadow-xl)]",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "overflow-hidden p-0"
        )}
      >
        <Command
          className={cn(
            "[&_[cmdk-group-heading]]:px-[var(--spacing-x2)] [&_[cmdk-group-heading]]:font-medium",
            "[&_[cmdk-group-heading]]:text-[var(--secondary)]",
            "[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0",
            "[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5",
            "[&_[cmdk-input]]:h-12",
            "[&_[cmdk-item]]:px-[var(--spacing-x2)] [&_[cmdk-item]]:py-[var(--spacing-x3)]",
            "[&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
            className
          )}
          {...props}
        >
          {children}
        </Command>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>
);

CommandDialog.displayName = "CommandDialog";
