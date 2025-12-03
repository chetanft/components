"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface AvatarFallbackProps extends ComposableProps<'span'> {
  /**
   * Fallback content (typically initials or icon)
   */
  children?: React.ReactNode;
}

/**
 * AvatarFallback Component
 *
 * A composable component for displaying fallback content in an Avatar when image fails to load.
 * Typically used within Avatar.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Avatar size="md">
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically shown when AvatarImage fails to load.
 */
export const AvatarFallback = React.forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp
        ref={ref}
        className={cn("flex items-center justify-center font-medium", className)}
        {...props}
      >
        {children || (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        )}
      </Comp>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';

