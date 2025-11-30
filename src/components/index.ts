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
export * from './atoms/Illustration';
export * from './atoms/Spacer';
export * from './atoms/Statistic/Statistic';
// Import and re-export Icon component and IconName type explicitly
import { Icon } from './atoms/Icons/Icon';
import type { IconName } from './atoms/Icons/types';
export { Icon };
export type { IconName };
export { iconMap } from './atoms/Icons/iconMap';
export * from './atoms/Input';
export * from './atoms/Label';
export * from './atoms/Logos';
export * from './atoms/RadioGroup';
export * from './atoms/ReadOnly';
export * from './atoms/Switch';
export * from './atoms/Text/Text';
export * from './atoms/SubText/SubText';
export * from './atoms/Typography';
export * from './atoms/Textarea';
export * from './atoms/Skeleton';
export * from './atoms/FigmaBadge';
export * from './atoms/Spin'; // 🆕 NEW
export * from './atoms/Toggle';

// MOLECULES - Simple combinations of atoms
export * from './molecules/Chicklet';
export * from './molecules/ButtonGroup';
export * from './molecules/DatePicker';
// export * from './molecules/StackedBarChart'; // Removed duplicate export
export * from './molecules/SimpleColumnLayout';
export * from './molecules/Dropdown';
export * from './molecules/DropdownMenu';
export * from './molecules/FileValidationCard';
export * from './molecules/ProgressBar';
export * from './molecules/Loader';
export * from './molecules/ProgressList';
export * from './molecules/RadioSelector';
export * from './molecules/SegmentedTabs';
export * from './molecules/Steps';
export * from './molecules/Tooltip';
export * from './molecules/UploadButton';
export * from './molecules/UploadItem';
export * from './molecules/UploadThumbnail';
export * from './molecules/Alert';
export * from './molecules/Breadcrumb';
export * from './molecules/Pagination';
export * from './molecules/Notification';
// 🆕 NEW Components (Phase 1)
export * from './molecules/Empty';
export * from './molecules/InputNumber';
export * from './molecules/Slider';
export * from './molecules/Rate';
export * from './molecules/Message';
export * from './molecules/TimePicker';
// 🆕 NEW Components (Phase 2)
export * from './molecules/Timeline';
export * from './molecules/Tree';
export * from './molecules/TreeSelect';
export * from './molecules/Cascader';
export * from './molecules/Carousel';
export * from './molecules/Image';
export * from './molecules/Calendar';
// 🆕 NEW Components (Phase 3)
export * from './molecules/Anchor';
export * from './molecules/Affix';
export * from './molecules/BackTop';
export * from './molecules/FloatButton';
export * from './molecules/Tour';
export * from './molecules/Watermark';
export * from './molecules/Mentions';
export * from './molecules/Transfer';
export * from './molecules/ColorPicker';
export * from './molecules/Popconfirm';
export * from './molecules/ToggleGroup';
export * from './molecules/List';
export * from './molecules/HoverCard';
export * from './molecules/Descriptions';


// CHARTS - Chart.js components with FT Design System styling
export * from './charts';

// ORGANISMS - Complex combinations and complete UI sections
export * from './organisms/AppHeader';
export * from './organisms/Card';
export * from './organisms/Collapsible';
export * from './organisms/FileCard';
export * from './organisms/FileThumbnail';
export * from './organisms/FileTypeIcon';
export * from './organisms/Footer';
export * from './organisms/NavigationPopover';
export * from './organisms/NavigationPopover/NavigationLauncher';
export * from './organisms/QuickFilters';
export * from './organisms/Table';
export * from './organisms/Tabs';
export * from './organisms/Upload';
export * from './organisms/UploadZone';
export * from './organisms/UserProfile';
export * from './organisms/UserProfileDropdown';
export * from './organisms/Modal';
export * from './organisms/Drawer';
export * from './organisms/PageHeader';
// 🆕 NEW Components
export * from './organisms/Result';
export * from './organisms/Grid';
export * from './organisms/Form';

// TEMPLATES - Page level scaffolds
export * from './templates';

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