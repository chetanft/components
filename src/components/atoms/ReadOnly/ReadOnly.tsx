import React from 'react';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';
import { Typography } from '../Typography';

export interface ReadOnlyProps extends ComposableProps<'div'> {
  /**
   * Layout type
   */
  type?: "Vertical" | "Horizontal";
  
  /**
   * Whether to show label icon
   */
  labelIcon?: boolean;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Value text
   */
  value?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ReadOnly: React.FC<ReadOnlyProps> = ({ 
  type = "Vertical",
  labelIcon = false,
  label = "Label",
  value = "Text",
  className = '',
  asChild,
  ...props
}) => {
  const isHorizontal = type === "Horizontal";
  const isVertical = type === "Vertical";
  const Comp = asChild ? Slot : 'div';

  // Horizontal without label icon
  if (isHorizontal && !labelIcon) {
    return (
      <Comp 
        className={cn(
          "content-stretch flex gap-[var(--spacing-x2)] items-center relative w-[5.125rem]", 
          className
        )}
        {...props}
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
          <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
            {label}:
          </Typography>
        </div>
        <div className="content-stretch flex flex-1 flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
            {value}
          </Typography>
        </div>
      </Comp>
    );
  }

  // Horizontal with label icon
  if (isHorizontal && labelIcon) {
    return (
      <Comp 
        className={cn(
          "content-stretch flex gap-[var(--spacing-x2)] items-center relative w-[6.375rem]", 
          className
        )}
        {...props}
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0">
          <div className="relative shrink-0 size-[var(--spacing-x4)]" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="var(--secondary)" />
          </div>
          <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
            <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
              {label}:
            </Typography>
          </div>
        </div>
        <div className="content-stretch flex flex-1 flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
            {value}
          </Typography>
        </div>
      </Comp>
    );
  }

  // Vertical with label icon
  if (isVertical && labelIcon) {
    return (
      <Comp 
        className={cn(
          "content-stretch flex gap-[var(--x2,8px)] items-start relative w-[11.4375rem]", 
          className
        )}
        {...props}
      >
        <div className="box-border content-stretch flex gap-[0.625rem] items-center pb-0 pt-[0.125rem] px-0 relative shrink-0">
          <div className="relative shrink-0 size-[var(--spacing-x4)]" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="var(--secondary)" />
          </div>
        </div>
        <div className="content-stretch flex flex-1 flex-col gap-[var(--x2,8px)] items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
            <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
              {label}
            </Typography>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-full" data-name="Text">
            <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
              {value}
            </Typography>
          </div>
        </div>
      </Comp>
    );
  }

  // Vertical without label icon
  return (
    <Comp 
      className={cn(
        "content-stretch flex flex-col gap-[var(--x2,8px)] items-start relative w-[11.4375rem]", 
        className
      )}
      {...props}
    >
      <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
        <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
          {label}
        </Typography>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-[11.4375rem]" data-name="Text">
        <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
          {value}
        </Typography>
      </div>
    </Comp>
  );
};

ReadOnly.displayName = 'ReadOnly';