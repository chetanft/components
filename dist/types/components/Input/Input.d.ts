import React from 'react';
import { IconName } from '../Icons';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leadingIcon?: IconName;
    trailingIcon?: IconName;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled';
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map