"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { BreadcrumbList } from './BreadcrumbList';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

export interface BreadcrumbItemType {
  label: string;
  href?: string;
  icon?: IconName;
  onClick?: () => void;
}

export interface BreadcrumbProps extends Omit<ComposableProps<'nav'>, 'onChange'> {
  /**
   * Breadcrumb content (for composable API)
   */
  children?: React.ReactNode;
  /**
   * Breadcrumb items array (for declarative API)
   * @deprecated Use BreadcrumbList, BreadcrumbItem, and BreadcrumbLink components instead
   */
  items?: BreadcrumbItemType[];
  /**
   * Separator icon or element (for declarative API)
   * @deprecated Use BreadcrumbSeparator component instead
   */
  separator?: IconName | React.ReactNode;
  /**
   * Apply glassmorphism effect to the breadcrumb bar
   */
  glass?: GlassVariant;
}

/**
 * Breadcrumb Component
 * 
 * A versatile breadcrumb component for navigation hierarchy.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/about" isCurrentPage>About</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * 
 * // Declarative API (deprecated)
 * <Breadcrumb items={[{label: 'Home', href: '/'}]} />
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (BreadcrumbList, BreadcrumbItem, BreadcrumbLink, etc.) support `asChild`
 * - Accessible: includes ARIA attributes and proper navigation semantics
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    children,
    items,
    separator,
    glass,
    className,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    // Check if using composable API (has children with Breadcrumb sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Breadcrumb')
    );
    
    // If using composable API, render composable structure
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && items && items.length > 0) {
              }
      
      const Comp = asChild ? Slot : 'nav';
      return (
        <Comp
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            resolvedGlass && getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', 'border border-[var(--border-secondary)]'),
            resolvedGlass && 'rounded-[var(--radius-md)] px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
            "flex items-center",
            className
          )}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && items && items.length > 0) {
          }
    
    const _defaultSeparator = <Icon name="chevron-right" size={16} className="text-[var(--color-tertiary)]" />;
    
    const Comp = asChild ? Slot : 'nav';
    return (
      <Comp
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(
          resolvedGlass && getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', 'border border-[var(--border-secondary)]'),
          resolvedGlass && 'rounded-[var(--radius-md)] px-[var(--spacing-x3)] py-[var(--spacing-x2)]',
          "flex items-center",
          className
        )}
        {...props}
      >
        <BreadcrumbList>
          {items?.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <BreadcrumbItem>
                    <BreadcrumbSeparator icon={typeof separator === 'string' ? separator as IconName : undefined}>
                      {typeof separator !== 'string' ? separator : undefined}
                    </BreadcrumbSeparator>
                  </BreadcrumbItem>
                )}
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    onClick={item.onClick}
                    icon={item.icon}
                    isCurrentPage={isLast}
                  >
                    {item.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Comp>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

