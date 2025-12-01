"use client";

import React, { forwardRef } from 'react';
import { Dropdown, type DropdownProps, type DropdownOption } from '../Dropdown/Dropdown';

export interface SelectOption extends DropdownOption { }

export interface SelectProps extends Omit<DropdownProps, 'options'> {
    options: SelectOption[];
}

/**
 * Select component - A wrapper around Dropdown to provide a familiar API for developers.
 * Use this component for single-select dropdowns.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
    return <Dropdown ref={ref} {...props} />;
});

Select.displayName = 'Select';
