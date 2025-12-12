"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * Modal context value
 * 
 * @public
 */
export interface ModalContextValue {
  /**
   * Whether modal is open
   */
  open: boolean;
  
  /**
   * Open the modal
   */
  setOpen: (open: boolean) => void;
  
  /**
   * Close the modal
   */
  onClose?: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Modal parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: ModalContextValue = {
  open: false,
  setOpen: () => {},
  onClose: undefined,
};

/**
 * Hook to access modal context
 * 
 * @public
 */
export function useModalContext() {
  const context = useContext(ModalContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
}

/**
 * Modal context provider props
 * 
 * @internal
 */
interface ModalContextProviderProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

/**
 * Modal context provider
 * 
 * @internal
 */
export function ModalContextProvider({
  children,
  open: controlledOpen,
  onOpenChange,
  onClose
}: ModalContextProviderProps) {
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
    <ModalContext.Provider value={{ open, setOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
}

