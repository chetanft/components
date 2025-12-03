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

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('Alert sub-components must be used within an Alert component');
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

