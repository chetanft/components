"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SidebarContext } from './SidebarContext';
import type { SidebarCollapsible, SidebarSide } from './SidebarContext';

const STORAGE_KEY = 'ft-sidebar-state';

/**
 * SidebarProvider component props
 *
 * @public
 */
export interface SidebarProviderProps {
  /** Child elements */
  children: React.ReactNode;
  /** Default open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Which side the sidebar is placed on */
  side?: SidebarSide;
  /** Collapsible mode */
  collapsible?: SidebarCollapsible;
}

/**
 * SidebarProvider Component
 *
 * Manages sidebar open/collapsed state with localStorage persistence.
 * Provides context to all sidebar sub-components.
 *
 * @public
 */
export const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      children,
      defaultOpen = true,
      open: controlledOpen,
      onOpenChange,
      side = 'left',
      collapsible = 'offcanvas',
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);

    // Read initial state from localStorage if uncontrolled
    const [internalOpen, setInternalOpen] = useState(() => {
      if (typeof window === 'undefined') return defaultOpen;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored === 'true';
      } catch {
        // localStorage unavailable
      }
      return defaultOpen;
    });

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = useCallback(
      (value: boolean) => {
        if (isControlled) {
          onOpenChange?.(value);
        } else {
          setInternalOpen(value);
          onOpenChange?.(value);
          try {
            localStorage.setItem(STORAGE_KEY, String(value));
          } catch {
            // localStorage unavailable
          }
        }
      },
      [isControlled, onOpenChange]
    );

    const toggleSidebar = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);

    // Mobile detection
    useEffect(() => {
      if (typeof window === 'undefined') return;

      // ft-consistency-ignore: breakpoint threshold for mobile detection (not a CSS token)
      const mql = window.matchMedia('(max-width: 767px)');
      const handleChange = () => setIsMobile(mql.matches);
      handleChange();
      mql.addEventListener('change', handleChange);
      return () => mql.removeEventListener('change', handleChange);
    }, []);

    const contextValue = useMemo(
      () => ({ open, setOpen, toggleSidebar, isMobile, side, collapsible }),
      [open, setOpen, toggleSidebar, isMobile, side, collapsible]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="sidebar-provider"
          data-sidebar-open={open}
          data-sidebar-side={side}
          data-sidebar-collapsible={collapsible}
          data-sidebar-mobile={isMobile}
          className="flex min-h-svh w-full"
          style={
            {
              '--sidebar-width': '16rem',
              '--sidebar-width-collapsed': '3rem',
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  }
);

SidebarProvider.displayName = 'SidebarProvider';
