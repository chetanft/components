"use client";
import React, { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { CollapsibleProvider } from './CollapsibleContext';
import { CollapsibleTrigger } from './CollapsibleTrigger';
import { CollapsibleHeader } from './CollapsibleHeader';
import { CollapsibleTitle } from './CollapsibleTitle';
import { CollapsibleExtra } from './CollapsibleExtra';
import { CollapsibleContent } from './CollapsibleContent';
import { CollapsibleIcon } from './CollapsibleIcon';

export interface CollapsibleProps extends Omit<ComposableProps<'div'>, 'onChange' | 'onToggle'> {
  /**
   * Collapsible content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Header content (for declarative API)
   * @deprecated Use CollapsibleTrigger with CollapsibleHeader and CollapsibleTitle instead
   */
  header?: React.ReactNode;
  /**
   * Extra content (for declarative API)
   * @deprecated Use CollapsibleExtra component instead
   */
  extra?: React.ReactNode;
  /**
   * Show arrow icon
   * @default true
   */
  showArrow?: boolean;
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
   * Legacy prop (unused)
   * @deprecated
   */
  badges?: boolean;
}

/**
 * Collapsible Component
 * 
 * A versatile collapsible component for showing/hiding content.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
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
 * 
 * // Declarative API (deprecated)
 * <Collapsible header="Title" extra={<Button>Action</Button>}>
 *   Content here
 * </Collapsible>
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (CollapsibleTrigger, CollapsibleHeader, etc.) support `asChild`
 * - Supports multiple type variants: Primary, Secondary, Tertiary
 * - Accessible: includes ARIA attributes and keyboard navigation
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  extra,
  showArrow = true,
  disabled,
  className,
  asChild,
  badges: _badges,
  bg = 'Secondary',
  type = 'Primary',
  isExpanded: controlledIsExpanded,
  onToggle,
  ...props
}) => {
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isExpanded;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

  // Check if using composable API (has children with Collapsible sub-components)
  const hasComposableChildren = React.Children.toArray(children).some((child: any) =>
    child?.type?.displayName?.startsWith('Collapsible')
  );

  // If using composable API, wrap with context provider
  if (hasComposableChildren) {
    // Show deprecation warning if using old props with composable API
    if (process.env.NODE_ENV !== 'production' && (header || extra)) {
      console.warn(
        'Collapsible: Using deprecated props (header, extra) with composable API. ' +
        'Please use CollapsibleTrigger, CollapsibleHeader, CollapsibleTitle, CollapsibleExtra components instead. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }

    const getBorderRadius = () => {
      return type === 'Tertiary' ? 'rounded-[var(--spacing-x4)]' : 'rounded-[var(--spacing-x2)]';
    };

    const getBackgroundStyles = () => {
      const baseStyles = [];
      if (bg === 'Primary') {
        baseStyles.push('bg-[var(--bg-primary)]');
        if (type === 'Tertiary') {
          baseStyles.push('border border-[var(--border-primary)]');
        }
      } else {
        baseStyles.push('bg-[var(--bg-secondary)]');
        if (type === 'Tertiary') {
          baseStyles.push('border border-[var(--border-secondary)]');
        }
      }
      return baseStyles;
    };

    const combinedClassName = cn(
      'flex flex-col overflow-hidden',
      getBorderRadius(),
      ...getBackgroundStyles(),
      disabled && "opacity-50 cursor-not-allowed",
      className
    );

    const wrappedChildren = asChild ? (
      <Slot
        ref={undefined}
        className={combinedClassName}
        {...(props as any)}
      >
        {children}
      </Slot>
    ) : (
      <div
        className={combinedClassName}
        {...props}
      >
        {children}
      </div>
    );

    return (
      <CollapsibleProvider
        value={{
          isExpanded,
          onToggle: handleToggle,
          disabled,
          type,
          bg,
          showArrow,
        }}
      >
        {wrappedChildren}
      </CollapsibleProvider>
    );
  }

  // Otherwise use declarative API (deprecated)
  if (process.env.NODE_ENV !== 'production' && (header || extra)) {
    console.warn(
      'Collapsible: Declarative API (header, extra props) is deprecated. ' +
      'Please migrate to composable API using CollapsibleTrigger, CollapsibleHeader, CollapsibleTitle, CollapsibleExtra components. ' +
      'See migration guide: docs/migrations/composable-migration.md'
    );
  }

  // Reuse existing legacy rendering logic or map to simpler one?
  // For compatibility, let's keep the structure but support "accordion" logic via context if we add it later
  // Currently this component is standalone.

  // I'll keep the existing "Primary/Secondary/Tertiary" styling logic but ensure children rendering works

  // Background colors and styling based on variant
  const getBackgroundStyles = () => {
    const baseStyles = [];

    if (bg === 'Primary') {
      baseStyles.push('bg-[var(--bg-primary)]');
      if (type === 'Tertiary') {
        baseStyles.push('border border-[var(--border-primary)]');
      }
    } else {
      baseStyles.push('bg-[var(--bg-secondary)]');
      if (type === 'Tertiary') {
        baseStyles.push('border border-[var(--border-secondary)]');
      }
    }

    return baseStyles;
  };

  const getBorderRadius = () => {
    return type === 'Tertiary' ? 'rounded-[var(--spacing-x4)]' : 'rounded-[var(--spacing-x2)]';
  };

  const combinedClassName = cn(
    'flex flex-col overflow-hidden',
    getBorderRadius(),
    ...getBackgroundStyles(),
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      <CollapsibleTrigger>
        <CollapsibleHeader>
          <CollapsibleIcon />
          {header && <CollapsibleTitle>{header}</CollapsibleTitle>}
          {extra && <CollapsibleExtra>{extra}</CollapsibleExtra>}
          {type === 'Secondary' && showArrow && (
            <div className="text-[var(--primary)]">
              {isExpanded ? <Icon name="chevron-up" size={16} /> : <Icon name="chevron-down" size={16} />}
            </div>
          )}
        </CollapsibleHeader>
      </CollapsibleTrigger>
      {isExpanded && (
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      )}
    </>
  );

  const wrappedContent = asChild ? (
    <Slot
      ref={undefined}
      className={combinedClassName}
      {...(props as any)}
    >
      {content}
    </Slot>
  ) : (
    <div
      className={combinedClassName}
      {...props}
    >
      {content}
    </div>
  );

  return (
    <CollapsibleProvider
      value={{
        isExpanded,
        onToggle: handleToggle,
        disabled,
        type,
        bg,
        showArrow,
      }}
    >
      {wrappedContent}
    </CollapsibleProvider>
  );
};
