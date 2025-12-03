"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface CardMetaProps extends ComposableProps<'div'> {
  /**
   * Avatar or icon displayed before the title
   */
  avatar?: React.ReactNode;
  /**
   * Title text or element
   */
  title?: React.ReactNode;
  /**
   * Description text or element
   */
  description?: React.ReactNode;
}

/**
 * CardMeta Component
 *
 * A composable component for displaying meta information in a Card.
 * Typically contains an avatar, title, and description.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardMeta
 *       avatar={<Avatar />}
 *       title="John Doe"
 *       description="Software Engineer"
 *     />
 *   </CardHeader>
 * </Card>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides proper spacing between avatar, title, and description.
 */
export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>(
  ({ className, avatar, title, description, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn("flex gap-[var(--spacing-x4)] items-start", className)}
        {...props}
      >
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex flex-col gap-[var(--spacing-x1)] w-full">
          {title && (
            <div className="text-base font-semibold text-[var(--primary)] leading-tight">{title}</div>
          )}
          {description && (
            <div className="text-sm text-[var(--secondary)]">{description}</div>
          )}
        </div>
      </Comp>
    );
  }
);

CardMeta.displayName = 'CardMeta';

