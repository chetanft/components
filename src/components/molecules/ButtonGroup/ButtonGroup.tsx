"use client";

import React from 'react';
import { Button, type ButtonProps } from '../../atoms/Button/Button';
import { cn } from '../../../lib/utils';

export interface ButtonGroupItem {
  id?: string;
  label: React.ReactNode;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  icon?: ButtonProps['icon'];
  iconPosition?: ButtonProps['iconPosition'];
  loading?: ButtonProps['loading'];
  disabled?: ButtonProps['disabled'];
  className?: string;
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  'aria-label'?: string;
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  buttons: ButtonGroupItem[];
  equalWidth?: boolean;
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
        {buttons.map((button, index) => {
          const { id, label, className: buttonClassName, ...buttonProps } = button;
          return (
            <Button
              key={id ?? index}
              className={cn(equalWidth && 'flex-1', buttonClassName)}
              {...buttonProps}
            >
              {label}
            </Button>
          );
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
