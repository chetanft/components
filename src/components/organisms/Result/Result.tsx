"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface ResultProps extends Omit<ComposableProps<'div'>, 'title'> {
  /** Result status */
  status?: ResultStatus;
  /**
   * Title text
   * @deprecated Use composable API with ResultTitle component (to be implemented)
   */
  title?: React.ReactNode;
  /**
   * Subtitle text
   * @deprecated Use composable API with ResultSubtitle component (to be implemented)
   */
  subTitle?: React.ReactNode;
  /**
   * Custom icon
   * @deprecated Use composable API with ResultIcon component (to be implemented)
   */
  icon?: React.ReactNode;
  /**
   * Extra content (usually action buttons)
   * @deprecated Use composable API with ResultExtra component (to be implemented)
   */
  extra?: React.ReactNode;
  /** Additional content below extra */
  children?: React.ReactNode;
  /** Glass morphism variant */
  glass?: GlassVariant;
}

/**
 * Result component - Result page display built with FT Design System tokens.
 * 
 * Uses:
 * - Success: var(--positive)
 * - Error: var(--critical)
 * - Warning: var(--warning)
 * - Info: var(--neutral)
 * - Typography: title-primary, body-primary
 * - Spacing: var(--x6), var(--x8), var(--x12)
 */
export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  ({
    status = 'info',
    title,
    subTitle,
    icon,
    extra,
    children,
    className,
    glass,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    // Status configurations
    const statusConfig: Record<ResultStatus, {
      icon: IconName;
      color: string;
      bgColor: string;
    }> = {
      success: {
        icon: 'check',
        color: 'var(--positive)',
        bgColor: 'var(--positive-light)',
      },
      error: {
        icon: 'cross',
        color: 'var(--critical)',
        bgColor: 'var(--critical-light)',
      },
      info: {
        icon: 'alert-informational',
        color: 'var(--neutral)',
        bgColor: 'var(--neutral-light)',
      },
      warning: {
        icon: 'triangle-alert',
        color: 'var(--warning)',
        bgColor: 'var(--warning-light)',
      },
      '404': {
        icon: 'search',
        color: 'var(--tertiary)',
        bgColor: 'var(--border-secondary)',
      },
      '403': {
        icon: 'lock',
        color: 'var(--critical)',
        bgColor: 'var(--critical-light)',
      },
      '500': {
        icon: 'alert-critical',
        color: 'var(--critical)',
        bgColor: 'var(--critical-light)',
      },
    };

    const config = statusConfig[status];

    // Default titles for HTTP status codes
    const defaultTitles: Partial<Record<ResultStatus, string>> = {
      '404': 'Page Not Found',
      '403': 'Access Denied',
      '500': 'Server Error',
    };

    const defaultSubTitles: Partial<Record<ResultStatus, string>> = {
      '404': 'Sorry, the page you visited does not exist.',
      '403': 'Sorry, you are not authorized to access this page.',
      '500': 'Sorry, something went wrong on the server.',
    };

    // Render icon
    const renderIcon = () => {
      if (icon) {
        return icon;
      }

      // HTTP status codes get special treatment
      if (['404', '403', '500'].includes(status)) {
        return (
          <div className="relative">
            {/* Large status code */}
            <span 
              className="text-[72px] font-bold leading-none"
              style={{ color: config.color, opacity: 0.2 }}
            >
              {status}
            </span>
            {/* Icon overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon
                  name={config.icon}
                  size={32}
                  style={{ color: config.color }}
                />
              </div>
            </div>
          </div>
        );
      }

      // Standard status icon
      return (
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: config.bgColor }}
        >
          <Icon
            name={config.icon}
            size={40}
            style={{ color: config.color }}
          />
        </div>
      );
    };

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center",
          "py-[var(--x12)] px-[var(--x8)]",
          "text-center",
          getGlassClasses(resolvedGlass, '', ''),
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="mb-[var(--x6)]">
          {renderIcon()}
        </div>

        {/* Title */}
        {(title || defaultTitles[status]) && (
          <Typography
            variant="title-secondary"
            className="text-[var(--primary)] mb-[var(--x3)]"
          >
            {title || defaultTitles[status]}
          </Typography>
        )}

        {/* Subtitle */}
        {(subTitle || defaultSubTitles[status]) && (
          <Typography
            variant="body-primary-regular"
            className="text-[var(--tertiary)] max-w-md mb-[var(--x6)]"
          >
            {subTitle || defaultSubTitles[status]}
          </Typography>
        )}

        {/* Extra content (actions) */}
        {extra && (
          <div className="flex flex-wrap items-center justify-center gap-[var(--x3)] mb-[var(--x6)]">
            {extra}
          </div>
        )}

        {/* Additional content */}
        {children && (
          <div className="w-full max-w-lg mt-[var(--x4)]">
            {children}
          </div>
        )}
      </Comp>
    );
  }
);

Result.displayName = 'Result';

