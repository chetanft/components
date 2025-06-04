import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const datePickerFieldVariants: (props?: ({
    size?: "xl" | "l" | "m" | null | undefined;
    state?: "default" | "filled" | "disabled" | "hover" | "prefilled" | "focused" | "typing" | null | undefined;
    type?: "success" | "normal" | "warning" | "error" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface DatePickerFieldProps extends VariantProps<typeof datePickerFieldVariants> {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    showTime?: boolean;
    className?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare const DatePickerField: React.ForwardRefExoticComponent<DatePickerFieldProps & React.RefAttributes<HTMLInputElement>>;
export interface LabelProps {
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}
export declare const Label: React.FC<LabelProps>;
export interface DatePickerProps extends Omit<DatePickerFieldProps, 'size'> {
    label?: string;
    labelPosition?: "top" | "left" | "none";
    required?: boolean;
    size?: "xl" | "l" | "m";
    showTime?: boolean;
    className?: string;
}
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map