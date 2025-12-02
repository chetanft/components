"use client";

import React, { forwardRef } from 'react';
import { Dropdown, type DropdownProps, type DropdownOption } from '../Dropdown/Dropdown';

/**
 * Select option type (extends DropdownOption)
 * 
 * @public
 */
export interface SelectOption extends DropdownOption { }

/**
 * Select component props
 * 
 * @public
 * 
 * @example
 * ```tsx
 * const options = [
 *   { value: 'option1', label: 'Option 1' },
 *   { value: 'option2', label: 'Option 2' },
 *   { value: 'option3', label: 'Option 3', disabled: true }
 * ];
 * 
 * <Select
 *   options={options}
 *   placeholder="Choose an option"
 *   onChange={(value) => console.log(value)}
 * />
 * ```
 */
export interface SelectProps extends Omit<DropdownProps, 'options'> {
    /**
     * Array of select options
     * @required
     */
    options: SelectOption[];
}

/**
 * Select Component
 * 
 * A single-select dropdown component built on top of Dropdown.
 * Provides a familiar API for developers coming from other design systems.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * import { Select } from 'ft-design-system';
 * 
 * function MyForm() {
 *   const [value, setValue] = useState('');
 * 
 *   return (
 *     <Select
 *       options={[
 *         { value: '1', label: 'Option 1' },
 *         { value: '2', label: 'Option 2' }
 *       ]}
 *       value={value}
 *       onChange={setValue}
 *       placeholder="Select an option"
 *     />
 *   );
 * }
 * ```
 * 
 * @remarks
 * - Wrapper around Dropdown component for single-select use cases
 * - Supports all Dropdown props except `options` (which is required)
 * - Accessible: includes keyboard navigation and ARIA attributes
 * - Use `ft-design-system/ai` import for AI-protected version
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
    return <Dropdown ref={ref} {...props} />;
});

Select.displayName = 'Select';
