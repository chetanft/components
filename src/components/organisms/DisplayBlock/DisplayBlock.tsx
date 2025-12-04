import React from 'react';
import { cn } from '../../../lib/utils';
import { Content } from '../../molecules/Content/Content';
import { Spacer } from '../../atoms/Spacer';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface DisplayBlockProps extends ComposableProps<'div'> {
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

export const DisplayBlock: React.FC<DisplayBlockProps> = ({ 
  layout = "Horizontal",
  blocks = "1", 
  padding = "True",
  className = '',
  asChild,
  ...props
}) => {
  const contentElement = <Content />;
  const Comp = asChild ? Slot : 'div';

  if (layout === "Horizontal" && blocks === "1" && padding === "False") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=1, Padding=False"
        {...props}
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
      </Comp>
    );
  }

  if (layout === "Horizontal" && blocks === "2" && padding === "True") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=2, Padding=True"
        {...props}
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--spacing-x1)] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </Comp>
    );
  }

  if (layout === "Horizontal" && blocks === "2" && padding === "False") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=2, Padding=False"
        {...props}
      >
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          {contentElement}
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
          <Content />
        </div>
      </Comp>
    );
  }

  if (layout === "Vertical" && blocks === "2" && padding === "True") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=2, Padding=True"
        {...props}
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </Comp>
    );
  }

  if (layout === "Vertical" && blocks === "2" && padding === "False") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=2, Padding=False"
        {...props}
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </Comp>
    );
  }

  if (layout === "Horizontal" && blocks === "3" && padding === "True") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=3, Padding=True"
        {...props}
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
      </Comp>
    );
  }

  if (layout === "Horizontal" && blocks === "3" && padding === "False") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex gap-[20px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Horizontal, Blocks=3, Padding=False"
        {...props}
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
      </Comp>
    );
  }

  if (layout === "Vertical" && blocks === "3" && padding === "True") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[20px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=3, Padding=True"
        {...props}
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </Comp>
    );
  }

  if (layout === "Vertical" && blocks === "3" && padding === "False") {
    return (
      <Comp 
        className={cn(
          "box-border content-stretch flex flex-col gap-[0px] items-start px-[0px] py-0 relative size-full", 
          className
        )}
        data-name="Layout=Vertical, Blocks=3, Padding=False"
        {...props}
      >
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          {contentElement}
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
        <Spacer size="x5" className="bg-[var(--color-bg-primary)]" />
        <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
          <Content />
        </div>
      </Comp>
    );
  }

  // Default: Horizontal, 1 block, with padding
  return (
    <Comp 
      className={cn(
        "box-border content-stretch flex gap-[20px] items-start px-[20px] py-0 relative size-full", 
        className
      )}
      data-name="Layout=Horizontal, Blocks=1, Padding=True"
      {...props}
    >
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px relative shrink-0">
        {contentElement}
      </div>
    </Comp>
  );
};

DisplayBlock.displayName = 'DisplayBlock';
