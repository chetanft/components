"use client";

import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface PopconfirmDescriptionProps extends ComposableProps<'div'> {
  /**
   * Description content.
   */
  children: React.ReactNode;
}

/**
 * PopconfirmDescription Component
 *
 * A composable component for the description of a Popconfirm.
 * Typically used within PopconfirmContent.
 *
 * @public
 *
 * @example
 * ```tsx
 * <PopconfirmContent>
 *   <PopconfirmTitle>Are you sure?</PopconfirmTitle>
 *   <PopconfirmDescription>This action cannot be undone.</PopconfirmDescription>
 * </PopconfirmContent>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled with Typography component.
 */
export const PopconfirmDescription = React.forwardRef<HTMLDivElement, PopconfirmDescriptionProps>(
  ({ className, children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={className} {...props}>
          {children}
        </Slot>
      );
    }
    
    return (
      <Typography variant="body-secondary-regular" className={className} ref={ref} {...props}>
        {children}
      </Typography>
    );
  }
);

PopconfirmDescription.displayName = 'PopconfirmDescription';

