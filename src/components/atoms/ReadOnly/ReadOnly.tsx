import React from 'react';
import { CheckFill } from '../Icons';
import { Label } from '../Label/Label';
import { cn } from '../../../lib/utils';

export interface ReadOnlyProps {
  /**
   * The label text
   */
  label: string;
  
  /**
   * The main value text
   */
  value: string;
  
  /**
   * Optional subtext below the main value
   */
  subtext?: string;
  
  /**
   * Layout orientation
   */
  type?: 'vertical' | 'horizontal';
  
  /**
   * Whether to show an icon
   */
  labelIcon?: boolean;
  
  /**
   * Custom icon to use instead of default check icon
   */
  icon?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const ReadOnly: React.FC<ReadOnlyProps> = ({
  label,
  value,
  subtext,
  type = 'vertical',
  labelIcon = false,
  icon,
  className = '',
}) => {
  const defaultIcon = (
    <div className="w-4 h-4 flex-shrink-0">
      <CheckFill />
    </div>
  );

  const iconElement = icon || defaultIcon;

  const valueStyles = "font-sans text-base font-normal leading-[1.4] text-[var(--primary)]";
  const subtextStyles = "font-sans text-sm font-medium leading-[1.4] text-[var(--secondary)]";

  if (type === 'horizontal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Label
          icon={labelIcon ? iconElement : undefined}
        >
          {label}:
        </Label>
        <span className={valueStyles}>{value}</span>
      </div>
    );
  }

  // Vertical layout
  if (labelIcon) {
    return (
      <div className={cn("flex gap-1", subtext ? "gap-1" : "gap-2", className)}>
        {iconElement}
        <div className="flex flex-col gap-1 flex-1">
          {/* Label and Value */}
          <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <span className={valueStyles}>{value}</span>
          </div>
          
          {/* Subtext if provided */}
          {subtext && (
            <div className="flex items-center gap-1">
              {iconElement}
              <span className={subtextStyles}>{subtext}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vertical without icon
  return (
    <div className={cn("flex flex-col gap-1", subtext ? "gap-1" : "gap-2", "w-[183px]", className)}>
      {/* Label and Value */}
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <span className={valueStyles}>{value}</span>
      </div>
      
      {/* Subtext if provided */}
      {subtext && (
        <div className="flex items-center gap-1">
          {iconElement}
          <span className={subtextStyles}>{subtext}</span>
        </div>
      )}
    </div>
  );
};

ReadOnly.displayName = 'ReadOnly'; 