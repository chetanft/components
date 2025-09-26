import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';

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
  const textElement = <p className="leading-[1.4]">Text</p>;

  if (type === "Horizontal" && labelIcon === "False") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative size-full", 
          className
        )}
        data-name="Type=Horizontal, Label icon=False"
      >
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
            <p className="leading-[1.4]">Label:</p>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
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
          "content-stretch flex gap-[8px] items-start relative size-full", 
          className
        )}
        data-name="Type=Vertical, Label icon=True"
      >
        <div className="box-border content-stretch flex gap-[10px] items-center pb-0 pt-[2px] px-0 relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
              <p className="leading-[1.4]">Label</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
            <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
              <p className="leading-[1.4]">Text</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "Horizontal" && labelIcon === "True") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[8px] items-center relative size-full", 
          className
        )}
        data-name="Type=Horizontal, Label icon=True"
      >
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <div className="relative shrink-0 size-[16px]">
            <Icon name="check-fill" size={16} className="text-[#5f697b]" />
          </div>
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
              <p className="leading-[1.4]">Label:</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
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
        "content-stretch flex flex-col gap-[8px] items-start relative size-full", 
        className
      )}
      data-name="Type=Vertical, Label icon=False"
    >
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <div className="font-medium leading-[0] relative shrink-0 text-[14px] text-[#5f697b] whitespace-nowrap">
          <p className="leading-[1.4]">Label</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-[183px]">
        <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
          {textElement}
        </div>
      </div>
    </div>
  );
};

ReadOnly.displayName = 'ReadOnly';