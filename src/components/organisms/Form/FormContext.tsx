"use client";

import _React, { createContext, useContext } from 'react';

// ============================================================================
// Form Context & Types
// ============================================================================

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export interface FormRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
  validator?: (value: any, formValues: Record<string, any>) => boolean | string | Promise<boolean | string>;
}

export interface FormFieldState {
  value: any;
  error?: string;
  touched: boolean;
  validating: boolean;
}

export interface FormContextValue {
  layout: FormLayout;
  labelCol?: number;
  wrapperCol?: number;
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldError: (name: string, error: string | undefined) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  validateField: (name: string, rules?: FormRule[]) => Promise<boolean>;
  registerField: (name: string, rules?: FormRule[]) => void;
  unregisterField: (name: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context;
};

export const useFormField = (name: string) => {
  const context = useContext(FormContext);
  if (!context) {
    return {
      value: undefined,
      error: undefined,
      touched: false,
      onChange: () => {},
      onBlur: () => {},
    };
  }

  return {
    value: context.values[name],
    error: context.errors[name],
    touched: context.touched[name] || false,
    onChange: (value: any) => context.setFieldValue(name, value),
    onBlur: () => context.setFieldTouched(name, true),
  };
};
