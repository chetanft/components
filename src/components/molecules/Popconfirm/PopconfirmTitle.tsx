"use client";

import React from 'react';
import { Typography } from '../../atoms/Typography';
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
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    return (
      <Typography variant="body-primary-medium" className={className} ref={ref} {...props}>
        {children}
      </Typography>
    );
  }
);

PopconfirmTitle.displayName = 'PopconfirmTitle';

