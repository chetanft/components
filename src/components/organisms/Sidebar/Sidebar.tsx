"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { useSidebar } from './SidebarContext';
import type { SidebarCollapsible, SidebarSide } from './SidebarContext';

/**
 * Sidebar component props
 *
 * @public
 */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which side the sidebar is placed on */
  side?: SidebarSide;
  /** Collapsible mode */
  collapsible?: SidebarCollapsible;
  /** Apply glassmorphism effect */
  glass?: GlassVariant;
  /** Child elements */
  children?: React.ReactNode;
}

/**
 * Sidebar Component
 *
 * Main sidebar container for app navigation. Supports expand/collapse with
 * multiple modes: offcanvas (fully hidden), icon (icon-only width), or none
 * (always visible). On mobile viewports, renders as an overlay.
 *
 * @public
 */
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, side, collapsible, glass, children, ...props }, ref) => {
    const ctx = useSidebar();
    const resolvedSide = side ?? ctx.side;
    const resolvedCollapsible = collapsible ?? ctx.collapsible;
    const resolvedGlass = useResolvedGlass(glass);

    // "none" mode: always visible, no collapse
    if (resolvedCollapsible === 'none') {
      return (
        <div
          ref={ref}
          data-slot="sidebar"
          data-side={resolvedSide}
          data-collapsible="none"
          className={cn(
            'flex flex-col h-full border-[var(--border-secondary)]',
            resolvedSide === 'left' ? 'border-r' : 'border-l',
            resolvedGlass
              ? getGlassClasses(resolvedGlass)
              : 'bg-[var(--bg-secondary)]',
            className
          )}
          style={{ width: 'var(--sidebar-width)' }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Mobile: overlay mode
    if (ctx.isMobile) {
      return (
        <>
          {/* Backdrop */}
          {ctx.open && (
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => ctx.setOpen(false)}
              data-slot="sidebar-backdrop"
            />
          )}
          {/* Sliding panel */}
          <div
            ref={ref}
            data-slot="sidebar"
            data-side={resolvedSide}
            data-state={ctx.open ? 'open' : 'closed'}
            data-mobile="true"
            className={cn(
              'fixed top-0 bottom-0 z-50 flex flex-col',
              resolvedSide === 'left' ? 'left-0' : 'right-0',
              resolvedGlass
                ? getGlassClasses(resolvedGlass)
                : 'bg-[var(--bg-secondary)]',
              'shadow-[var(--shadow-xl)]',
              'transition-transform duration-300 ease-in-out',
              !ctx.open &&
                (resolvedSide === 'left'
                  ? '-translate-x-full'
                  : 'translate-x-full'),
              className
            )}
            style={{ width: 'var(--sidebar-width)' }}
            {...props}
          >
            {children}
          </div>
        </>
      );
    }

    // Desktop
    return (
      <div
        data-slot="sidebar-wrapper"
        data-side={resolvedSide}
        data-state={ctx.open ? 'open' : 'closed'}
        className="relative shrink-0 transition-[width] duration-300 ease-in-out"
        style={{
          width: ctx.open
            ? 'var(--sidebar-width)'
            : resolvedCollapsible === 'icon'
              ? 'var(--sidebar-width-collapsed)'
              : '0px',
        }}
      >
        <div
          ref={ref}
          data-slot="sidebar"
          data-side={resolvedSide}
          data-state={ctx.open ? 'open' : 'closed'}
          data-collapsible={resolvedCollapsible}
          className={cn(
            'fixed top-0 bottom-0 z-10 flex flex-col overflow-hidden border-[var(--border-secondary)]',
            resolvedSide === 'left' ? 'left-0 border-r' : 'right-0 border-l',
            resolvedGlass
              ? getGlassClasses(resolvedGlass)
              : 'bg-[var(--bg-secondary)]',
            'transition-[width] duration-300 ease-in-out',
            className
          )}
          style={{
            width: ctx.open
              ? 'var(--sidebar-width)'
              : resolvedCollapsible === 'icon'
                ? 'var(--sidebar-width-collapsed)'
                : '0px',
          }}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';
