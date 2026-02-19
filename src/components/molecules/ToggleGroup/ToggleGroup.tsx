import React from 'react';
import { cn } from '../../../lib/utils';
import { Toggle } from '../../atoms/Toggle';
import type { ToggleProps } from '../../atoms/Toggle';
import { Slot, type ComposableProps } from '../../../lib/slot';
import { getGlassClasses, useResolvedGlass, getGlassInnerBg, type GlassVariant } from '../../../lib/glass';

export type ToggleGroupType = 'single' | 'multiple';

export interface ToggleGroupProps extends Omit<ComposableProps<'div'>, 'onChange'> {
    type?: ToggleGroupType;
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: any) => void;
    disabled?: boolean;
    size?: ToggleProps['size'];
    variant?: ToggleProps['variant'];
    /**
     * Enable glassmorphism effect on toggle group background
     * - `true`: Standard glass effect
     * - `'subtle'`: Subtle glass effect
     * - `'prominent'`: Prominent glass effect
     */
    glass?: GlassVariant;
    children: React.ReactElement<ToggleProps> | React.ReactElement<ToggleProps>[];
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(({
    type = 'single',
    value,
    defaultValue,
    onValueChange,
    disabled = false,
    size = 'md',
    variant = 'default',
    glass,
    children,
    className,
    asChild,
    ...props
}, ref) => {
    const resolvedGlass = useResolvedGlass(glass);
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
        value ?? defaultValue ?? (type === 'multiple' ? [] : '')
    );

    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    const handleToggle = (childValue: string, pressed: boolean) => {
        let newValue: string | string[];

        if (type === 'single') {
            newValue = pressed ? childValue : '';
        } else {
            const currentValues = Array.isArray(internalValue) ? internalValue : [];
            if (pressed) {
                newValue = [...currentValues, childValue];
            } else {
                newValue = currentValues.filter(v => v !== childValue);
            }
        }

        if (value === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };

    const Comp = asChild ? Slot : 'div';

    return (
        <Comp
            ref={ref}
            className={cn("inline-flex rounded-[var(--radius-md)]", resolvedGlass ? getGlassClasses(resolvedGlass) : "bg-[var(--color-bg-primary)]", className)}
            role="group"
            {...props}
        >
            {React.Children.map(children, (child) => {
                if (!React.isValidElement<ToggleProps>(child)) return null;

                // We assume the child has a 'value' prop, even though it's not in ToggleProps interface strictly
                // In a real app we might want to extend ToggleProps or cloneElement with a wrapper
                // For now we'll assume the user passes a 'value' prop to Toggle or we use a data-value
                const childValue = (child.props as ToggleProps & { value?: string; 'data-value'?: string }).value 
                  || (child.props as ToggleProps & { value?: string; 'data-value'?: string })['data-value'] 
                  || String(child.key);

                const isPressed = type === 'single'
                    ? internalValue === childValue
                    : (Array.isArray(internalValue) && internalValue.includes(childValue));

                return React.cloneElement(child, {
                    pressed: isPressed,
                    onPressedChange: (pressed: boolean) => handleToggle(childValue, pressed),
                    disabled: disabled || child.props.disabled,
                    size: size || child.props.size,
                    variant: variant || child.props.variant,
                    className: cn(child.props.className, "first:rounded-l-[var(--radius-md)] last:rounded-r-[var(--radius-md)] rounded-none border-l-0 first:border-l"),
                } as ToggleProps);
            })}
        </Comp>
    );
});

ToggleGroup.displayName = 'ToggleGroup';
