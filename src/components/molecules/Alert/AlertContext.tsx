"use client";

import React, { createContext, useContext } from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg';

export interface AlertContextType {
  variant: AlertVariant;
  radius?: AlertRadius;
  banner?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of an Alert parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const defaultContext: AlertContextType = {
  variant: 'info',
  radius: 'md',
  banner: false,
  closable: false,
  onClose: undefined,
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  
  if (!context) {
    return defaultContext;
  }
  return context;
};

export interface AlertProviderProps {
  value: AlertContextType;
  children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ value, children }) => {
  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

