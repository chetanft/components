import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface ContentProps extends ComposableProps<'div'> {
  /**
   * Content type - only "Text" variant as shown in Figma
   */
  type?: "Text";
  
  /** Glass morphism variant */
  glass?: GlassVariant;
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const Content: React.FC<ContentProps> = ({
  type: _type = "Text",
  glass,
  className = '',
  asChild,
  ...props
}) => {
  const resolvedGlass = useResolvedGlass(glass);
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp 
      className={cn(
        "content-stretch flex flex-col gap-[var(--spacing-x1)] items-start justify-center relative size-full",
        getGlassClasses(resolvedGlass, '', ''),
        className
      )}
      data-name="Type=Text"
      {...props}
    >
      <div className="content-stretch flex flex-col gap-[var(--spacing-x1)] items-start justify-center relative shrink-0 w-full">
        <Typography variant="body-primary-regular" color="primary" className="relative shrink-0 whitespace-nowrap">
          Text
        </Typography>
      </div>
    </Comp>
  );
};

Content.displayName = 'Content';
