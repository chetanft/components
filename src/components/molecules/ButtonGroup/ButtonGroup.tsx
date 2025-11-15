"use client";

import React from 'react';
import { Button, type ButtonProps } from '../../atoms/Button/Button';
import { cn } from '../../../lib/utils';

export interface ButtonGroupItem
  extends Omit<ButtonProps, 'children' | 'id'> {
  /**
   * Unique identifier for list rendering
   */
  id?: string | number;
  /**
   * Button label/content from Figma
   */
  label: React.ReactNode;
}

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Collection of buttons to render from left ➝ right
   */
  buttons: ButtonGroupItem[];
  /**
   * Stretch buttons to equal widths (matches stacked button rows in Figma)
   */
  equalWidth?: boolean;
  /**
   * Allow wrapping when ButtonGroup is wider than container
   */
  wrap?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      buttons,
      equalWidth = false,
      wrap = false,
      className,
      ...props
    },
    ref
  ) => {
    if (!buttons?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-[var(--x2,8px)]',
          wrap ? 'flex-wrap' : 'flex-nowrap',
          equalWidth && 'w-full',
          className
        )}
        {...props}
      >
        {buttons.map(
          ({ id, label, className: buttonClassName, ...buttonProps }, index) => (
            <Button
              key={id ?? index}
              className={cn(equalWidth && 'flex-1', buttonClassName)}
              {...buttonProps}
            >
              {label}
            </Button>
          )
        )}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;

