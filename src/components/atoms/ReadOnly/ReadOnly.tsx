import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';
import { Typography } from '../Typography';

export interface ReadOnlyProps {
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
  className = '' 
}) => {
  const isHorizontal = type === "Horizontal";
  const isVertical = type === "Vertical";

  // Horizontal without label icon
  if (isHorizontal && !labelIcon) {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative w-[82px]", 
          className
        )}
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
          <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
            {label}:
          </Typography>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
            {value}
          </Typography>
        </div>
      </div>
    );
  }

  // Horizontal with label icon
  if (isHorizontal && labelIcon) {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative w-[102px]", 
          className
        )}
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="#5f697b" />
          </div>
          <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
            <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
              {label}:
            </Typography>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
            {value}
          </Typography>
        </div>
      </div>
    );
  }

  // Vertical with label icon
  if (isVertical && labelIcon) {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[var(--x2,8px)] items-start relative w-[183px]", 
          className
        )}
      >
        <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">
          <div className="relative shrink-0 size-[16px]" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="#5f697b" />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x2,8px)] items-start min-h-px min-w-px relative shrink-0">
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
      </div>
    );
  }

  // Vertical without label icon
  return (
    <div 
      className={cn(
        "content-stretch flex flex-col gap-[var(--x2,8px)] items-start relative w-[183px]", 
        className
      )}
    >
      <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
        <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
          {label}
        </Typography>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-[183px]" data-name="Text">
        <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
          {value}
        </Typography>
      </div>
    </div>
  );
};

ReadOnly.displayName = 'ReadOnly';