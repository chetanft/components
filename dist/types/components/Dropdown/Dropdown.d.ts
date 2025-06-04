import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const dropdownFieldVariants: (props?: ({
    size?: "xl" | "l" | "m" | null | undefined;
    state?: "default" | "filled" | "disabled" | "hover" | "prefilled" | "focused" | "typing" | null | undefined;
    type?: "success" | "normal" | "warning" | "error" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
export interface DropdownFieldProps extends VariantProps<typeof dropdownFieldVariants> {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    open?: boolean;
    className?: string;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
export declare const DropdownField: React.ForwardRefExoticComponent<DropdownFieldProps & React.RefAttributes<HTMLDivElement>>;
export interface LabelProps {
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}
export declare const Label: React.FC<LabelProps>;
export interface CaptionProps {
    children: React.ReactNode;
    type?: "default" | "error" | "warning" | "success";
    className?: string;
}
export declare const Caption: React.FC<CaptionProps>;
export interface DropdownProps extends Omit<DropdownFieldProps, 'size'> {
    label?: string;
    labelPosition?: "top" | "left" | "none";
    required?: boolean;
    size?: "xl" | "l" | "m";
    caption?: string;
    showCaption?: boolean;
    className?: string;
    options?: Array<{
        value: string;
        label: string;
    }>;
    onSelect?: (value: string) => void;
}
export declare const Dropdown: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map