"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { useCollapsibleContext } from './CollapsibleContext';

export interface CollapsibleIconProps extends ComposableProps<'div'> {
  /**
   * Custom icon component (optional)
   */
  children?: React.ReactNode;
}

/**
 * CollapsibleIcon Component
 *
 * A composable component for the expand/collapse icon in a Collapsible.
 * Automatically shows the correct icon based on expand state and type.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible>
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleIcon />
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<div>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically displays appropriate icon based on state and type.
 * - For Primary type, shows a button with add/subtract icon.
 * - For Secondary/Tertiary types, shows chevron icons.
 */
export const CollapsibleIcon = React.forwardRef<HTMLDivElement, CollapsibleIconProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { isExpanded, type, showArrow = true } = useCollapsibleContext();
    
    if (!showArrow) return null;
    
    const Comp = asChild ? Slot : 'div';
    
    if (type === 'Primary') {
      const icon = isExpanded ? 'subtract' : 'add';
      return (
        <Comp
          ref={ref}
          className={cn("shrink-0", className)}
          {...props}
        >
          {children || (
            <Button
              variant="secondary"
              size="md"
              icon={icon}
              iconPosition="only"
              className="!w-[var(--spacing-x10)] !h-[var(--spacing-x10)] !p-0 flex items-center justify-center rounded-lg shrink-0 border border-[var(--border-primary)] pointer-events-none"
            />
          )}
        </Comp>
      );
    }
    
    if (type === 'Tertiary') {
      const icon = isExpanded ? 'chevron-up' : 'chevron-right';
      return (
        <Comp
          ref={ref}
          className={cn("flex justify-center items-start text-[var(--primary)] shrink-0", className)}
          {...props}
        >
          {children || <Icon name={icon} size={16} />}
        </Comp>
      );
    }
    
    if (type === 'Secondary') {
      const icon = isExpanded ? 'chevron-down' : 'chevron-right';
      return (
        <Comp
          ref={ref}
          className={cn("flex justify-center items-start text-[var(--primary)] shrink-0 order-last", className)}
          {...props}
        >
          {children || <Icon name={icon} size={16} />}
        </Comp>
      );
    }
    
    return null;
  }
);

CollapsibleIcon.displayName = 'CollapsibleIcon';

