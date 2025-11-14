// ======================
// ATOMIC DESIGNS EXPORTS
// ======================

// ATOMS - Basic building blocks
export * from './atoms/Avatar';
export * from './atoms/Badge';
export * from './atoms/Button/Button';
export * from './atoms/Checkbox';
export * from './atoms/Colors';
export * from './atoms/Divider';
// Import and re-export Icon component and IconName type explicitly
import { Icon } from './atoms/Icons/Icon';
import type { IconName } from './atoms/Icons/types';
export { Icon };
export type { IconName };
export * from './atoms/Input';
export * from './atoms/Label';
export * from './atoms/Logos';
export * from './atoms/RadioGroup';
export * from './atoms/ReadOnly';
export * from './atoms/Switch';
export * from './atoms/Typography';

// MOLECULES - Simple combinations of atoms
export * from './molecules/Chicklet';
export * from './molecules/ButtonGroup';
export * from './molecules/DatePicker';
export * from './molecules/StackedBarChart';
export * from './molecules/SimpleColumnLayout';
export * from './molecules/Dropdown';
export * from './molecules/ProgressBar';
export * from './molecules/ProgressList';
export * from './molecules/RadioSelector';
export * from './molecules/SegmentedTabs';
export * from './molecules/Steps';
export * from './molecules/Tooltip';

// ORGANISMS - Complex combinations and complete UI sections
export * from './organisms/AppHeader';
export * from './organisms/Card';
export * from './organisms/Collapsible';
export * from './organisms/FileCard';
export * from './organisms/FileThumbnail';
export * from './organisms/FileTypeIcon';
export * from './organisms/Footer';
export * from './organisms/QuickFilters';
export * from './organisms/Table';
export * from './organisms/Tabs';
export * from './organisms/UploadZone';
export * from './organisms/UserProfile';

// ======================
// BACKWARD COMPATIBILITY
// ======================
// Keep original exports for backward compatibility
// These will be deprecated in future versions

// Core components (now atoms)
export { Button as ButtonLegacy } from './atoms/Button/Button';
export { Input as InputLegacy } from './atoms/Input/Input';
export { Badge as BadgeLegacy } from './atoms/Badge/Badge';

// ======================
// UTILITY EXPORTS
// ======================
// Re-export commonly used utilities
export { cn } from '../lib/utils'; 

// Theme System
export { ThemeProvider, useTheme } from '../contexts/ThemeContext';
export { ThemeSwitch } from './molecules/ThemeSwitch';
export type { Theme, ThemeContextType, ThemeProviderProps } from '../contexts/ThemeContext';
export type { ThemeSwitchProps } from './molecules/ThemeSwitch'; 