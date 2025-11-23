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
  labelIcon?: "False" | "True";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ReadOnly: React.FC<ReadOnlyProps> = ({ 
  type = "Vertical",
  labelIcon = "False", 
  className = '' 
}) => {
  const textElement = <Typography variant="body-primary-regular" color="primary">Text</Typography>;

  if (type === "Horizontal" && labelIcon === "False") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative size-full w-[82px]", 
          className
        )}
        data-name="Type=Horizontal, Label icon=False"
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
          <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
            Label:
          </Typography>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="relative shrink-0 whitespace-nowrap">
            {textElement}
          </div>
        </div>
      </div>
    );
  }

  if (type === "Vertical" && labelIcon === "True") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[var(--x2,8px)] items-start relative size-full w-[183px]", 
          className
        )}
        data-name="Type=Vertical, Label icon=True"
      >
        <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">
          <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="#5f697b" />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x2,8px)] items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
            <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
              Label
            </Typography>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-full" data-name="Text">
            <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
              Text
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  if (type === "Horizontal" && labelIcon === "True") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative size-full w-[102px]", 
          className
        )}
        data-name="Type=Horizontal, Label icon=True"
      >
        <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px] flex items-center justify-center" data-name="Check- fill">
            <Icon name="check-fill" size={16} color="#5f697b" />
          </div>
          <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
            <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
              Label:
            </Typography>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-start justify-center min-h-px min-w-px relative shrink-0" data-name="Text">
          <div className="relative shrink-0 whitespace-nowrap">
            {textElement}
          </div>
        </div>
      </div>
    );
  }

  // Default: Vertical without label icon
  return (
    <div 
      className={cn(
        "content-stretch flex flex-col gap-[var(--x2,8px)] items-start relative size-full w-[183px]", 
        className
      )}
      data-name="Type=Vertical, Label icon=False"
    >
      <div className="content-stretch flex gap-[var(--x1,4px)] items-center relative shrink-0" data-name="Label">
        <Typography variant="body-secondary-medium" color="secondary" className="relative shrink-0 whitespace-nowrap">
          Label
        </Typography>
      </div>
      <div className="content-stretch flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-[183px]" data-name="Text">
        <div className="relative shrink-0 whitespace-nowrap">
          {textElement}
        </div>
      </div>
    </div>
  );
};

ReadOnly.displayName = 'ReadOnly';