"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { useResolvedGlass, getGlassInnerBg } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DropdownMenuLabelProps extends ComposableProps<'div'> {
  /**
   * Label content.
   */
  children: React.ReactNode;
}

/**
 * DropdownMenuLabel Component
 *
 * A composable component for group labels in a DropdownMenu.
 * Typically used within DropdownMenuGroup.
 *
 * @public
 *
 * @example
 * ```tsx
 * <DropdownMenuGroup>
 *   <DropdownMenuLabel>Group Name</DropdownMenuLabel>
 *   <DropdownMenuItem value="1">Option 1</DropdownMenuItem>
 * </DropdownMenuGroup>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled as a group header.
 */
export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const resolvedGlass = useResolvedGlass();
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          getGlassInnerBg(resolvedGlass, "bg-[var(--color-bg-primary)]", "bg-transparent"),
          "box-border content-stretch flex gap-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] items-center px-[var(--spacing-x3)] py-[var(--spacing-x2)] relative rounded-[var(--radius-md)] shrink-0 w-full",
          className
        )}
        {...props}
      >
        <p
          className="font-medium leading-[1.4] relative shrink-0 text-[var(--color-tertiary)]"
          style={{
            fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
            fontWeight: 'var(--font-weight-medium, 500)',
            fontSize: 'var(--font-size-sm-rem)',
          }}
        >
          {children}
        </p>
      </Comp>
    );
  }
);

DropdownMenuLabel.displayName = 'DropdownMenuLabel';

