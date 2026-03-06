"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface ResultProps extends Omit<ComposableProps<'div'>, 'title'> {
  /** Result status */
  status?: ResultStatus;
  /** Additional content below extra */
  children?: React.ReactNode;
  /** Glass morphism variant */
  glass?: GlassVariant;
}

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

/** Renders the default status icon for a given status */
export function ResultStatusIcon({ status = 'info' }: { status?: ResultStatus }) {
  const config = statusConfig[status];

  if (['404', '403', '500'].includes(status)) {
    return (
      <div className="relative">
        <span
          className="text-5xl-rem font-bold leading-none"
          style={{ color: config.color, opacity: 0.2 }}
        >
          {status}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
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
}

/**
 * Result component - Result page display built with FT Design System tokens.
 *
 * Composable API:
 * ```tsx
 * <Result status="success">
 *   <ResultIcon><CustomIcon /></ResultIcon>
 *   <ResultTitle>Success!</ResultTitle>
 *   <ResultSubtitle>Your operation completed.</ResultSubtitle>
 *   <ResultExtra><Button>OK</Button></ResultExtra>
 * </Result>
 * ```
 */
export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  ({
    status = 'info',
    children,
    className,
    glass,
    asChild,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center",
          "py-[var(--spacing-x12)] px-[var(--spacing-x8)]",
          "text-center",
          getGlassClasses(resolvedGlass, '', ''),
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Result.displayName = 'Result';
