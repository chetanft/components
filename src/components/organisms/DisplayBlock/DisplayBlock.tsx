import React from 'react';
import { cn } from '../../../lib/utils';
import { Content } from '../../molecules/Content/Content';

export interface DisplayBlockProps {
  /**
   * Layout direction
   */
  layout?: "Horizontal" | "Vertical";
  
  /**
   * Number of blocks
   */
  blocks?: "1" | "2" | "3";
  
  /**
   * Whether to include padding
   */
  padding?: "True" | "False";
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

const Spacer = () => (
  <div className="bg-[#ffffff] h-[20px] shrink-0 w-full" />
);

export const DisplayBlock: React.FC<DisplayBlockProps> = ({ 
  layout = "Horizontal",
  blocks = "1", 
  padding = "True",
  className = '' 
}) => {
  const contentElement = <Content />;

  if (layout === "Horizontal" && blocks === "1" && padding === "False") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=1, Padding=False"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
      </div>
    );
  }

  if (layout === "Horizontal" && blocks === "2" && padding === "True") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=2, Padding=True"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Horizontal" && blocks === "2" && padding === "False") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=2, Padding=False"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Vertical" && blocks === "2" && padding === "True") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=2, Padding=True"
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Vertical" && blocks === "2" && padding === "False") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=2, Padding=False"
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Horizontal" && blocks === "3" && padding === "True") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=3, Padding=True"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Horizontal" && blocks === "3" && padding === "False") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=3, Padding=False"
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Vertical" && blocks === "3" && padding === "True") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=3, Padding=True"
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </div>
    );
  }

  if (layout === "Vertical" && blocks === "3" && padding === "False") {
    return (
      <div 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=3, Padding=False"
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
        <div className="bg-[#ffffff] h-[20px] shrink-0 w-full">
          <Spacer />
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </div>
    );
  }

  // Default: Horizontal, 1 block, with padding
  return (
    <div 
      className={cn(
        "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
        className
      )}
      data-name="Layout=Horizontal, Blocks=1, Padding=True"
    >
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
        {contentElement}
      </div>
    </div>
  );
};

DisplayBlock.displayName = 'DisplayBlock';