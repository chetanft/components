import React from 'react';
import { cn } from '../../../lib/utils';

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
  type = "Text",
  className = '' 
}) => {
  return (
    <div 
      className={cn(
        "content-stretch flex flex-col gap-[4px] items-start justify-center relative size-full", 
        className
      )}
      data-name="Type=Text"
    >
      <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
        <div className="font-normal leading-[0] relative shrink-0 text-[16px] text-[#434f64] whitespace-nowrap">
          <p className="leading-[1.4]">Text</p>
        </div>
      </div>
    </div>
  );
};

Content.displayName = 'Content';