export { Dropdown, dropdownFieldVariants } from './Dropdown';
export type { DropdownProps, DropdownOption } from './Dropdown';

export { DropdownProvider, useDropdownContext } from './DropdownContext';
export type { DropdownContextType } from './DropdownContext';

export { DropdownTrigger } from './DropdownTrigger';
export type { DropdownTriggerProps } from './DropdownTrigger';

export { DropdownContent } from './DropdownContent';
export type { DropdownContentProps } from './DropdownContent';

// Styles (for advanced customization)
export {
    dropdownFieldVariants as dropdownVariants,
    sizeStylesMap,
    getDropdownSizeStyles,
} from './Dropdown.styles';
export type { DropdownFieldVariantProps } from './Dropdown.styles';

// Hooks (for custom dropdown implementations)
export {
    useDropdownPosition,
    useDropdownPortal,
    useClickOutside,
} from './useDropdown';
export type { DropdownPosition, UseDropdownPositionOptions } from './useDropdown';
