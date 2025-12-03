"use client";

import React from 'react';
import { Icon, IconName } from '../../atoms/Icons';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BreadcrumbIconProps extends ComposableProps<'span'> {
  /**
   * Icon name from FT Design System icon library
   */
  name: IconName;
  /**
   * Icon size
   * @default 16
   */
  size?: number;
}

/**
 * BreadcrumbIcon Component
 *
 * A composable component for displaying icons in breadcrumb links.
 * Typically used within BreadcrumbLink.
 *
 * @public
 *
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">
 *         <BreadcrumbIcon name="home" />
 *         Home
 *       </BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 *
 * @remarks
 * - Wraps the HTML `<span>` element by default.
 * - Supports `asChild` prop to merge props with a custom child element.
 * - Provides consistent icon sizing for breadcrumbs.
 */
export const BreadcrumbIcon = React.forwardRef<HTMLSpanElement, BreadcrumbIconProps>(
  ({ name, size = 16, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    return (
      <Comp ref={ref} {...props}>
        <Icon name={name} size={size} />
      </Comp>
    );
  }
);

BreadcrumbIcon.displayName = 'BreadcrumbIcon';

