"use client";

import React, { createContext, useContext } from 'react';

/**
 * Sidebar collapsible mode
 *
 * @public
 */
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

/**
 * Sidebar side placement
 *
 * @public
 */
export type SidebarSide = 'left' | 'right';

/**
 * Sidebar context value
 *
 * @public
 */
export interface SidebarContextValue {
  /** Whether sidebar is expanded */
  open: boolean;
  /** Set sidebar open state */
  setOpen: (open: boolean) => void;
  /** Toggle sidebar open state */
  toggleSidebar: () => void;
  /** Whether currently on mobile viewport */
  isMobile: boolean;
  /** Which side the sidebar is on */
  side: SidebarSide;
  /** Collapsible mode */
  collapsible: SidebarCollapsible;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

/**
 * Hook to access sidebar context
 *
 * @public
 */
export function useSidebar(): SidebarContextValue {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export { SidebarContext };
