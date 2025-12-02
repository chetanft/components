"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { FigmaBadge } from '../../atoms/FigmaBadge';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: IconName;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: IconName | React.ReactNode;
  showFigmaBadge?: boolean;
}

/**
 * Breadcrumb component built using FT Design System tokens.
 * Figma design not available - component created based on design system specifications.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    items,
    separator,
    showFigmaBadge = true,
    className,
    ...props
  }, ref) => {
    const defaultSeparator = <Icon name="chevron-right" size={16} className="text-[var(--color-tertiary)]" />;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center", className)}
        {...props}
      >
        {showFigmaBadge && (
          <div className="mr-[var(--spacing-x4)]">
            <FigmaBadge />
          </div>
        )}
        <ol className="flex items-center gap-[var(--spacing-x2)] flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isClickable = !isLast && (item.href || item.onClick);

            return (
              <li key={index} className="flex items-center gap-[var(--spacing-x2)]">
                {index > 0 && (
                  <span className="flex items-center">
                    {separator || defaultSeparator}
                  </span>
                )}
                {isClickable ? (
                  <a
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center gap-[var(--spacing-x2)]",
                      "text-sm font-medium",
                      "text-[var(--color-primary)]",
                      "hover:text-[var(--color-neutral)]",
                      "transition-colors duration-[var(--transition-fast)]",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--color-neutral)] focus:ring-opacity-20 focus:rounded-[var(--radius-sm)]"
                    )}
                  >
                    {item.icon && <Icon name={item.icon} size={16} />}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    className={cn(
                      "flex items-center gap-[var(--spacing-x2)]",
                      "text-sm font-medium",
                      isLast ? "text-[var(--color-primary)]" : "text-[var(--color-tertiary)]"
                    )}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.icon && <Icon name={item.icon} size={16} />}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

