"use client";

"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { Label } from '../../atoms/Label/Label';
import { Typography } from '../../atoms/Typography';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { FormLabel } from './FormLabel';
import { FormControl } from './FormControl';
import { FormHelper } from './FormHelper';
import { FormError } from './FormError';
import { FormDescription } from './FormDescription';

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

interface FormContextValue {
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

const FormContext = createContext<FormContextValue | null>(null);

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

// ============================================================================
// Form Component
// ============================================================================

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form layout direction */
  layout?: FormLayout;
  /** Label column span (1-24) for horizontal layout */
  labelCol?: number;
  /** Wrapper column span (1-24) for horizontal layout */
  wrapperCol?: number;
  /** Initial form values */
  initialValues?: Record<string, any>;
  /** Called when form is submitted with valid values */
  onFinish?: (values: Record<string, any>) => void;
  /** Called when form submission fails validation */
  onFinishFailed?: (errors: Record<string, string>) => void;
  /** Called when any field value changes */
  onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
  /** Disable all form fields */
  disabled?: boolean;
  /** Size of form controls */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
  /** Form children */
  children?: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({
    className,
    layout = 'vertical',
    labelCol = 8,
    wrapperCol = 16,
    initialValues = {},
    onFinish,
    onFinishFailed,
    onValuesChange,
    disabled = false,
    size = 'md',
    children,
    ...props
  }, ref) => {
    const [values, setValues] = useState<Record<string, any>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [fieldRules, setFieldRules] = useState<Record<string, FormRule[]>>({});

    const setFieldValue = useCallback((name: string, value: any) => {
      setValues(prev => {
        const newValues = { ...prev, [name]: value };
        onValuesChange?.({ [name]: value }, newValues);
        return newValues;
      });
    }, [onValuesChange]);

    const setFieldError = useCallback((name: string, error: string | undefined) => {
      setErrors(prev => {
        if (error === undefined) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [name]: error };
      });
    }, []);

    const setFieldTouched = useCallback((name: string, isTouched: boolean) => {
      setTouched(prev => ({ ...prev, [name]: isTouched }));
    }, []);

    const validateField = useCallback(async (name: string, rules?: FormRule[]): Promise<boolean> => {
      const fieldValue = values[name];
      const fieldRulesArray = rules || fieldRules[name] || [];

      for (const rule of fieldRulesArray) {
        // Required validation
        if (rule.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
          setFieldError(name, rule.message || 'This field is required');
          return false;
        }

        // Min length validation
        if (rule.min !== undefined && typeof fieldValue === 'string' && fieldValue.length < rule.min) {
          setFieldError(name, rule.message || `Minimum ${rule.min} characters required`);
          return false;
        }

        // Max length validation
        if (rule.max !== undefined && typeof fieldValue === 'string' && fieldValue.length > rule.max) {
          setFieldError(name, rule.message || `Maximum ${rule.max} characters allowed`);
          return false;
        }

        // Pattern validation
        if (rule.pattern && typeof fieldValue === 'string' && !rule.pattern.test(fieldValue)) {
          setFieldError(name, rule.message || 'Invalid format');
          return false;
        }

        // Custom validator
        if (rule.validator) {
          try {
            const result = await rule.validator(fieldValue, values);
            if (result !== true) {
              setFieldError(name, typeof result === 'string' ? result : rule.message || 'Validation failed');
              return false;
            }
          } catch (err) {
            setFieldError(name, rule.message || 'Validation failed');
            return false;
          }
        }
      }

      setFieldError(name, undefined);
      return true;
    }, [values, fieldRules, setFieldError]);

    const registerField = useCallback((name: string, rules?: FormRule[]) => {
      if (rules) {
        setFieldRules(prev => ({ ...prev, [name]: rules }));
      }
    }, []);

    const unregisterField = useCallback((name: string) => {
      setFieldRules(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Validate all registered fields
      const validationResults = await Promise.all(
        Object.keys(fieldRules).map(name => validateField(name))
      );

      // Mark all fields as touched
      Object.keys(fieldRules).forEach(name => setFieldTouched(name, true));

      const isValid = validationResults.every(result => result);

      if (isValid) {
        onFinish?.(values);
      } else {
        onFinishFailed?.(errors);
      }
    };

    const contextValue = useMemo<FormContextValue>(() => ({
      layout,
      labelCol,
      wrapperCol,
      values,
      errors,
      touched,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      registerField,
      unregisterField,
      disabled,
      size,
    }), [layout, labelCol, wrapperCol, values, errors, touched, setFieldValue, setFieldError, setFieldTouched, validateField, registerField, unregisterField, disabled, size]);

    return (
      <FormContext.Provider value={contextValue}>
        <form
          ref={ref}
          className={cn(
            layout === 'inline' && 'flex flex-wrap gap-[var(--spacing-x4)]',
            className
          )}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);

Form.displayName = 'Form';

// ============================================================================
// Form.Item Component
// ============================================================================

export interface FormItemProps extends Omit<ComposableProps<'div'>, 'onChange'> {
  /**
   * Form item content (for composable API)
   */
  children?: React.ReactNode;
  /** Field name for form binding */
  name?: string;
  /** Label text (for declarative API)
   * @deprecated Use FormLabel component instead
   */
  label?: React.ReactNode;
  /** Whether the field is required */
  required?: boolean;
  /** Validation rules */
  rules?: FormRule[];
  /** Help text shown below the field (for declarative API)
   * @deprecated Use FormHelper component instead
   */
  help?: React.ReactNode;
  /** Extra content shown below the field */
  extra?: React.ReactNode;
  /** Whether to show the label */
  noLabel?: boolean;
  /** Label column span override */
  labelCol?: number;
  /** Wrapper column span override */
  wrapperCol?: number;
}

/**
 * FormItem Component
 * 
 * A versatile form item component for organizing form fields.
 * Supports both composable API (recommended) and declarative API (deprecated).
 * 
 * @public
 * 
 * @example
 * ```tsx
 * // Composable API (recommended)
 * <Form>
 *   <FormItem name="email">
 *     <FormLabel mandatory>Email</FormLabel>
 *     <FormControl>
 *       <Input type="email" />
 *     </FormControl>
 *     <FormError>Invalid email</FormError>
 *     <FormHelper>We'll never share your email</FormHelper>
 *   </FormItem>
 * </Form>
 * 
 * // Declarative API (deprecated)
 * <FormItem name="email" label="Email" required>
 *   <Input type="email" />
 * </FormItem>
 * ```
 * 
 * @remarks
 * - Composable API provides maximum flexibility and control
 * - All sub-components (FormLabel, FormControl, FormError, etc.) support `asChild`
 * - Automatically handles form field binding and validation
 * - Accessible: includes ARIA attributes and proper label associations
 * - Declarative API is deprecated but still functional for backward compatibility
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({
    className,
    name,
    children,
    label,
    required,
    rules = [],
    help,
    extra,
    noLabel = false,
    labelCol: itemLabelCol,
    wrapperCol: itemWrapperCol,
    asChild,
    ...props
  }, ref) => {
    // Check if using composable API (has children with Form sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) => 
      child?.type?.displayName?.startsWith('Form')
    );
    
    // If using composable API, render composable structure
    if (hasComposableChildren) {
      // Show deprecation warning if using old props with composable API
      if (process.env.NODE_ENV !== 'production' && (label || help)) {
        console.warn(
          'FormItem: Using deprecated props (label, help) with composable API. ' +
          'Please use FormLabel, FormControl, FormError, FormHelper components instead. ' +
          'See migration guide: docs/migrations/composable-migration.md'
        );
      }
      
      const context = useContext(FormContext);
      const layout = context?.layout || 'vertical';
      const labelCol = itemLabelCol ?? context?.labelCol ?? 8;
      const wrapperCol = itemWrapperCol ?? context?.wrapperCol ?? 16;
      
      const containerClasses = cn(
        'w-full',
        layout === 'horizontal' && 'flex items-start gap-[var(--spacing-x4)]',
        layout === 'inline' && 'flex items-center gap-[var(--spacing-x2)]',
        layout === 'vertical' && 'flex flex-col gap-[var(--spacing-x2)]',
        className
      );
      
      const Comp = asChild ? Slot : 'div';
      return (
        <Comp
          ref={ref}
          className={containerClasses}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    // Otherwise use declarative API (deprecated)
    if (process.env.NODE_ENV !== 'production' && (label || help)) {
      console.warn(
        'FormItem: Declarative API (label, help props) is deprecated. ' +
        'Please migrate to composable API using FormLabel, FormControl, FormError, FormHelper components. ' +
        'See migration guide: docs/migrations/composable-migration.md'
      );
    }
    const context = useContext(FormContext);
    const layout = context?.layout || 'vertical';
    const labelCol = itemLabelCol ?? context?.labelCol ?? 8;
    const wrapperCol = itemWrapperCol ?? context?.wrapperCol ?? 16;
    
    const error = name ? context?.errors[name] : undefined;
    const touched = name ? context?.touched[name] : false;
    const fieldValue = name ? context?.values[name] : undefined;

    // Register field rules on mount
    const registerFieldFn = context?.registerField;
    const unregisterFieldFn = context?.unregisterField;

    React.useEffect(() => {
      if (name && registerFieldFn && unregisterFieldFn) {
        const allRules = required ? [{ required: true, message: `${label || name} is required` }, ...rules] : rules;
        registerFieldFn(name, allRules);
        return () => unregisterFieldFn(name);
      }
      return undefined;
    }, [name, required, rules, label, registerFieldFn, unregisterFieldFn]);

    // Validate on blur
    const handleBlur = useCallback(() => {
      if (name && context) {
        context.setFieldTouched(name, true);
        context.validateField(name);
      }
    }, [name, context]);

    // Clone children and inject form field props
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child) || !name) return child;

      const childProps: any = {
        value: fieldValue,
        onChange: (e: any) => {
          const value = e?.target?.value !== undefined ? e.target.value : e;
          context?.setFieldValue(name, value);
        },
        onBlur: handleBlur,
        disabled: context?.disabled || (child.props as any).disabled,
        'aria-invalid': error ? 'true' : 'false',
        'aria-describedby': error ? `${name}-error` : undefined,
      };

      // Handle different input types
      if ((child.props as any).type === 'checkbox') {
        childProps.checked = !!fieldValue;
        childProps.onChange = (e: any) => {
          context?.setFieldValue(name, e?.target?.checked ?? e);
        };
      }

      return React.cloneElement(child, childProps);
    });

    const showError = touched && error;

    // Layout classes
    const containerClasses = cn(
      'w-full',
      layout === 'horizontal' && 'flex items-start gap-[var(--spacing-x4)]',
      layout === 'inline' && 'flex items-center gap-[var(--spacing-x2)]',
      layout === 'vertical' && 'flex flex-col gap-[var(--spacing-x2)]',
      className
    );

    const labelClasses = cn(
      layout === 'horizontal' && `flex-shrink-0 text-right pt-[var(--spacing-x2)]`,
      layout === 'horizontal' && `w-[${(labelCol / 24) * 100}%]`,
    );

    const wrapperClasses = cn(
      'flex-1 flex flex-col gap-[var(--spacing-x1)]',
      layout === 'horizontal' && `w-[${(wrapperCol / 24) * 100}%]`,
    );

    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={containerClasses}
        {...props}
      >
        {!noLabel && label && (
          <FormLabel mandatory={required}>
            {label}
          </FormLabel>
        )}
        <FormControl>
          {enhancedChildren}
          {showError && (
            <FormError id={name ? `${name}-error` : undefined}>
              {error}
            </FormError>
          )}
          {help && !showError && (
            <FormHelper>
              {help}
            </FormHelper>
          )}
          {extra && (
            <div className="mt-[var(--spacing-x1)]">
              {extra}
            </div>
          )}
        </FormControl>
      </Comp>
    );
  }
);

FormItem.displayName = 'Form.Item';

// ============================================================================
// Form.useForm Hook
// ============================================================================

export interface FormInstance {
  getFieldValue: (name: string) => any;
  getFieldsValue: () => Record<string, any>;
  setFieldValue: (name: string, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  validateFields: () => Promise<Record<string, any>>;
  resetFields: () => void;
  submit: () => void;
}

export const useForm = (formRef?: React.RefObject<HTMLFormElement>): FormInstance => {
  const [values, setValues] = useState<Record<string, any>>({});

  return useMemo(() => ({
    getFieldValue: (name: string) => values[name],
    getFieldsValue: () => values,
    setFieldValue: (name: string, value: any) => {
      setValues(prev => ({ ...prev, [name]: value }));
    },
    setFieldsValue: (newValues: Record<string, any>) => {
      setValues(prev => ({ ...prev, ...newValues }));
    },
    validateFields: async () => {
      // Trigger form submission for validation
      if (formRef?.current) {
        formRef.current.requestSubmit();
      }
      return values;
    },
    resetFields: () => {
      setValues({});
    },
    submit: () => {
      if (formRef?.current) {
        formRef.current.requestSubmit();
      }
    },
  }), [values, formRef]);
};

// Attach Item and useForm to Form
(Form as any).Item = FormItem;
(Form as any).useForm = useForm;

export default Form;
