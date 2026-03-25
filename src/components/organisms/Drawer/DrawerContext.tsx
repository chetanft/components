"use client";

import React, { createContext, useContext } from 'react';

/**
 * Drawer context value
 *
 * @public
 */
export interface DrawerContextValue {
  /**
   * Whether drawer is open
   */
  open: boolean;

  /**
   * Open the drawer
   */
  setOpen: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Drawer parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: DrawerContextValue = {
  open: false,
  setOpen: () => {},
};

/**
 * Hook to access drawer context
 *
 * @public
 */
export function useDrawerContext() {
  const context = useContext(DrawerContext);

  if (!context) {
    return defaultContext;
  }
  return context;
}

/**
 * Drawer context provider props
 *
 * @internal
 */
interface DrawerContextProviderProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Drawer context provider
 *
 * @internal
 */
export function DrawerContextProvider({
  children,
  open,
  onOpenChange,
}: DrawerContextProviderProps) {
  const setOpen = (newOpen: boolean) => {
    onOpenChange?.(newOpen);
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}
