import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons/Icon';
import { Typography } from '../Typography';

export interface SubTextProps {
  /**
   * Whether to show the check icon
   */
  icon?: "Yes" | "No";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const SubText: React.FC<SubTextProps> = ({ 
  icon = "No", 
  className = '' 
}) => {
  if (icon === "Yes") {
    return (
      <div 
        className={cn(
          "content-stretch flex gap-[var(--spacing-x2)] items-center relative size-full",
          className
        )}
        data-name="Icon=Yes"
      >
        <div className="relative shrink-0 size-[var(--spacing-x4)]">
          <Icon name="check-fill" size={16} className="text-[var(--secondary)]" />
        </div>
        <Typography 
          variant="body-secondary-regular" 
          color="secondary"
          className="flex-1 min-h-px min-w-px relative shrink-0 whitespace-pre-wrap"
        >
          Sub text
        </Typography>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "content-stretch flex gap-[var(--spacing-x2-5)] items-center justify-center relative size-full",
        className
      )}
      data-name="Icon=No"
    >
      <Typography 
        variant="body-secondary-regular" 
        color="secondary"
        className="flex-1 min-h-px min-w-px relative shrink-0 whitespace-pre-wrap"
      >
        Sub text
      </Typography>
    </div>
  );
};

SubText.displayName = 'SubText';