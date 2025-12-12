"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

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
  
  /**
   * Close the drawer
   */
  onClose?: () => void;
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Drawer parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: DrawerContextValue = {
  open: false,
  setOpen: () => {},
  onClose: undefined,
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
  onClose?: () => void;
}

/**
 * Drawer context provider
 * 
 * @internal
 */
export function DrawerContextProvider({
  children,
  open: controlledOpen,
  onOpenChange,
  onClose
}: DrawerContextProviderProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = onOpenChange !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = useCallback((newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      onClose?.();
    }
  }, [isControlled, onOpenChange, onClose]);
  
  return (
    <DrawerContext.Provider value={{ open, setOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
}

