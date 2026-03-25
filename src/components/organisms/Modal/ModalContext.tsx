"use client";

import React, { createContext, useContext } from 'react';

/**
 * Modal context value
 *
 * @public
 */
export interface ModalContextValue {
  /**
   * Whether to allow closing modal by clicking the backdrop
   */
  maskClosable: boolean;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Modal parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: ModalContextValue = {
  maskClosable: true,
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
  maskClosable?: boolean;
}

/**
 * Modal context provider
 *
 * @internal
 */
export function ModalContextProvider({
  children,
  maskClosable = true,
}: ModalContextProviderProps) {
  return (
    <ModalContext.Provider value={{ maskClosable }}>
      {children}
    </ModalContext.Provider>
  );
}
