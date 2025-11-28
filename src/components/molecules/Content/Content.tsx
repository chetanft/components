import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface ContentProps {
  /**
   * Content type - only "Text" variant as shown in Figma
   */
  type?: "Text";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Content: React.FC<ContentProps> = ({ 
  type: _type = "Text",
  className = '' 
}) => {
  return (
    <div 
      className={cn(
        "content-stretch flex flex-col gap-[var(--spacing-x1)] items-start justify-center relative size-full", 
        className
      )}
      data-name="Type=Text"
    >
      <div className="content-stretch flex flex-col gap-[var(--spacing-x1)] items-start justify-center relative shrink-0 w-full">
        <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
          Text
        </Typography>
      </div>
    </div>
  );
};

Content.displayName = 'Content';
