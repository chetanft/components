"use client";

import React, { createContext, useContext, useId } from 'react';
import type { ComponentSize } from '../../../lib/utils';

export interface TextareaContextType {
  textareaId: string;
  size: ComponentSize;
  disabled?: boolean;
  hasError?: boolean;
  errorId?: string;
  helperId?: string;
}

const TextareaContext = createContext<TextareaContextType | undefined>(undefined);

/**
 * Default values for when sub-components are used outside of a Textarea parent.
 * This provides resilience against displayName detection failures in bundled code.
 */
const createDefaultContext = (fallbackId: string): TextareaContextType => ({
  textareaId: fallbackId,
  size: 'md',
  disabled: false,
  hasError: false,
  errorId: undefined,
  helperId: undefined,
});

export const useTextareaContext = () => {
  const context = useContext(TextareaContext);
  const fallbackId = useId();
  
  if (!context) {
    return createDefaultContext(`textarea-${fallbackId}`);
  }
  return context;
};

export interface TextareaProviderProps {
  value: TextareaContextType;
  children: React.ReactNode;
}

export const TextareaProvider: React.FC<TextareaProviderProps> = ({ value, children }) => {
  return (
    <TextareaContext.Provider value={value}>
      {children}
    </TextareaContext.Provider>
  );
};

