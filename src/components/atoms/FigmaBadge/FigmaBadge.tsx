"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface FigmaBadgeProps extends ComposableProps<'div'> {
  className?: string;
}

/**
 * Badge component to indicate that Figma design is not available for this component.
 * This component uses FT Design System tokens only.
 */
export const FigmaBadge: React.FC<FigmaBadgeProps> = ({ className, asChild, ...props }) => {
  const Comp = asChild ? Slot : 'div';
  
  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-[var(--spacing-x1)] px-[var(--spacing-x2)] py-[var(--spacing-x0-5)] rounded-[var(--radius-sm)]",
        "bg-[var(--warning-light)] text-[var(--warning)] border border-[var(--warning)]",
        "text-xs font-medium",
        className
      )}
      style={{
        fontFamily: 'var(--font-family-primary, "Inter", sans-serif)',
      }}
      title="Figma design not available - Component built using FT Design System tokens"
      {...props}
    >
      <span className="text-xxs-rem">⚠️</span>
      <span>Figma design not available</span>
    </Comp>
  );
};

FigmaBadge.displayName = 'FigmaBadge';
