"use client";

import React, { useContext, useState, useCallback, useMemo } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Slot, type ComposableProps } from '../../../lib/slot';
import {
  FormContext,
  type FormContextValue,
  type FormFieldState,
  type FormLayout,
  type FormRule,
} from './FormContext';

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
  /**
   * Apply glassmorphism effect to the form surface
   */
  glass?: GlassVariant;
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
    glass,
    children,
    ...props
  }, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
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
            resolvedGlass && getGlassClasses(resolvedGlass, 'bg-[var(--bg-primary)]', 'border border-[var(--border-secondary)]'),
            resolvedGlass && 'rounded-[var(--radius-md)] p-[var(--spacing-x4)]',
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

export { useFormContext, useFormField } from './FormContext';
export type { FormLayout, FormRule, FormFieldState } from './FormContext';

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
  /** Whether the field is required */
  required?: boolean;
  /** Validation rules */
  rules?: FormRule[];
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
 * Uses composable API with sub-components for maximum flexibility.
 *
 * @public
 *
 * @example
 * ```tsx
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
 * ```
 *
 * @remarks
 * - All sub-components (FormLabel, FormControl, FormError, etc.) support `asChild`
 * - Automatically handles form field binding and validation
 * - Accessible: includes ARIA attributes and proper label associations
 */
export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({
    className,
    name,
    children,
    required,
    rules = [],
    extra: _extra,
    noLabel: _noLabel = false,
    labelCol: itemLabelCol,
    wrapperCol: itemWrapperCol,
    asChild,
    ...props
  }, ref) => {
    const context = useContext(FormContext);
    const layout = context?.layout || 'vertical';
    const _labelCol = itemLabelCol ?? context?.labelCol ?? 8;
    const _wrapperCol = itemWrapperCol ?? context?.wrapperCol ?? 16;

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
type FormWithSubcomponents = typeof Form & {
  Item: typeof FormItem;
  useForm: typeof useForm;
};
(Form as FormWithSubcomponents).Item = FormItem;
(Form as FormWithSubcomponents).useForm = useForm;

export default Form;
