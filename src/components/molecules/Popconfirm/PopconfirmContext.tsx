"use client";

import React, { createContext, useContext } from 'react';
import type { IconName } from '../../atoms/Icons';

export type PopconfirmPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopconfirmContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  placement: PopconfirmPlacement;
  icon?: IconName;
  onConfirm?: () => void;
  onCancel?: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PopconfirmContext = createContext<PopconfirmContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Popconfirm parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (): PopconfirmContextType => ({
  open: false,
  setOpen: () => {},
  disabled: false,
  placement: 'top',
  icon: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  containerRef: { current: null },
});

export const usePopconfirmContext = () => {
  const context = useContext(PopconfirmContext);
  
  if (!context) {
    return createDefaultContext();
  }
  return context;
};

export interface PopconfirmProviderProps {
  value: PopconfirmContextType;
  children: React.ReactNode;
}

export const PopconfirmProvider: React.FC<PopconfirmProviderProps> = ({ value, children }) => {
  return (
    <PopconfirmContext.Provider value={value}>
      {children}
    </PopconfirmContext.Provider>
  );
};

