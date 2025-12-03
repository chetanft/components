"use client";

import React from 'react';
import { Typography, type TypographyColor } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PopconfirmTitleProps extends ComposableProps<'div'> {
  /**
   * Title content.
   */
  children: React.ReactNode;
}

/**
 * PopconfirmTitle Component
 *
 * A composable component for the title of a Popconfirm.
 * Typically used within PopconfirmContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with Typography component.
 */
export const PopconfirmTitle = React.forwardRef<HTMLDivElement, PopconfirmTitleProps>(
  ({ className, children, asChild, color, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    const { color: _, ...restProps } = props as any;
    return (
      <Typography variant="body-primary-medium" className={className} ref={ref} {...restProps}>
        {children}
      </Typography>
    );
  }
);

PopconfirmTitle.displayName = 'PopconfirmTitle';

