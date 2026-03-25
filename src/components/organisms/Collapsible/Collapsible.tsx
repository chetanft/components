"use client";
import React, { useState } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { CollapsibleProvider } from './CollapsibleContext';

export interface CollapsibleProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'onToggle'> {
  /**
   * Collapsible content (composable API)
   */
  children?: React.ReactNode;
  /**
   * Whether the collapsible is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Background variant
   * @default 'Secondary'
   */
  bg?: 'Primary' | 'Secondary';
  /**
   * Type variant
   * @default 'Primary'
   */
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  /**
   * Controlled expanded state
   */
  isExpanded?: boolean;
  /**
   * Callback when toggle state changes
   */
  onToggle?: (isExpanded: boolean) => void;
  /**
   * Apply glassmorphism effect to the collapsible surface
   */
  glass?: GlassVariant;
  /**
   * Render as child element (slot pattern)
   */
  asChild?: boolean;
}

/**
 * Collapsible Component
 *
 * A versatile collapsible component for showing/hiding content.
 * Uses a composable API with sub-components for maximum flexibility.
 * Built on Radix UI Collapsible primitives for full accessibility.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Collapsible type="Primary" bg="Secondary">
 *   <CollapsibleTrigger>
 *     <CollapsibleHeader>
 *       <CollapsibleIcon />
 *       <CollapsibleTitle>Section Title</CollapsibleTitle>
 *       <CollapsibleExtra>
 *         <Button>Action</Button>
 *       </CollapsibleExtra>
 *     </CollapsibleHeader>
 *   </CollapsibleTrigger>
 *   <CollapsibleContent>
 *     <p>Content here</p>
 *   </CollapsibleContent>
 * </Collapsible>
 * ```
 *
 * @remarks
 * - All sub-components (CollapsibleTrigger, CollapsibleHeader, etc.) support `asChild`
 * - Supports multiple type variants: Primary, Secondary, Tertiary
 * - Accessible: includes ARIA attributes and keyboard navigation
 */
export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(({
  children,
  disabled,
  className,
  asChild: _asChild,
  bg = 'Secondary',
  type = 'Primary',
  glass,
  isExpanded: controlledIsExpanded,
  onToggle,
  ...props
}, ref) => {
  const resolvedGlass = useResolvedGlass(glass);
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);

  const isControlled = controlledIsExpanded !== undefined;
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;

  const handleOpenChange = (open: boolean) => {
    if (disabled) return;
    if (onToggle) {
      onToggle(open);
    }
    if (!isControlled) {
      setInternalIsExpanded(open);
    }
  };

  const getBorderRadius = () => {
    return type === 'Tertiary' ? 'rounded-[var(--radius-xl)]' : 'rounded-[var(--radius-md)]';
  };

  const getBackgroundStyles = () => {
    const solidBg = bg === 'Primary' ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)]';
    const solidBorder = type === 'Tertiary'
      ? (bg === 'Primary' ? 'border border-[var(--border-primary)]' : 'border border-[var(--border-secondary)]')
      : '';
    return getGlassClasses(resolvedGlass, solidBg, solidBorder);
  };

  const combinedClassName = cn(
    'flex flex-col overflow-hidden',
    getBorderRadius(),
    getBackgroundStyles(),
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return (
    <CollapsibleProvider
      value={{
        isExpanded,
        onToggle: () => handleOpenChange(!isExpanded),
        disabled,
        type,
        bg,
      }}
    >
      <CollapsiblePrimitive.Root
        ref={ref}
        data-slot="collapsible"
        open={isExpanded}
        onOpenChange={handleOpenChange}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </CollapsiblePrimitive.Root>
    </CollapsibleProvider>
  );
});

Collapsible.displayName = 'Collapsible';
