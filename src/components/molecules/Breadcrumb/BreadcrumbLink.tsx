"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { Icon, IconName } from '../../atoms/Icons';

export interface BreadcrumbLinkProps extends ComposableProps<'a'> {
  /**
   * The link text.
   */
  children: React.ReactNode;
  /**
   * Link URL
   */
  href?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Icon to display before the link text
   */
  icon?: IconName;
  /**
   * Whether this is the current page (last item)
   * @default false
   */
  isCurrentPage?: boolean;
}

/**
 * BreadcrumbLink Component
 *
 * A composable component for breadcrumb links.
 * Automatically styled based on whether it's the current page.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/" icon="home">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<a>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Automatically styled based on current page state.
 * - Accessible: includes proper ARIA attributes.
 */
export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, children, href, onClick, icon, isCurrentPage = false, asChild, ...props }, ref) => {
    const isClickable = !isCurrentPage && (href || onClick);
    
    const linkStyles = cn(
      "flex items-center gap-[var(--spacing-x2)]",
      "text-sm font-medium",
      isCurrentPage
        ? "text-[var(--color-primary)]"
        : "text-[var(--color-primary)] hover:text-[var(--color-neutral)]",
      "transition-colors duration-[var(--transition-fast)]",
      isClickable && "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20 focus:rounded-[var(--radius-sm)]",
      className
    );
    
    if (asChild) {
      return (
        <Slot ref={ref} href={href} onClick={onClick} className={linkStyles} aria-current={isCurrentPage ? 'page' : undefined} {...props}>
          {icon && <Icon name={icon} size={16} />}
          <span>{children}</span>
        </Slot>
      );
    }
    
    if (isClickable) {
      return (
        <a
          ref={ref}
          href={href}
          onClick={onClick}
          className={linkStyles}
          {...props}
        >
          {icon && <Icon name={icon} size={16} />}
          <span>{children}</span>
        </a>
      );
    }
    
    return (
      <span
        ref={ref as any}
        className={cn(linkStyles, "text-[var(--color-tertiary)]")}
        aria-current={isCurrentPage ? 'page' : undefined}
        {...props}
      >
        {icon && <Icon name={icon} size={16} />}
        <span>{children}</span>
      </span>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

