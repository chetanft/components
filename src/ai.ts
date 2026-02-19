/**
 * FT DESIGN SYSTEM - AI-PROTECTED COMPONENTS
 * 
 * This module exports AI-protected versions of commonly used components.
 * These automatically filter out problematic AI-generated classes.
 * 
 * Recommended for use with AI coding assistants like:
 * - Cursor AI
 * - GitHub Copilot
 * - v0.dev
 * - Bolt.new
 * - Lovable
 * 
 * Usage:
 * import { Button, Input, Table } from 'ft-design-system/ai';
 * 
 * @module ft-design-system/ai
 */

import { withAIProtection } from './lib/ai-utils';

// ======================
// ATOMS - Import and wrap
// ======================
import { Button as CoreButton } from './components/atoms/Button/Button';
import { Input as CoreInput } from './components/atoms/Input/Input';
import { Badge as CoreBadge } from './components/atoms/Badge/Badge';
import { Checkbox as CoreCheckbox } from './components/atoms/Checkbox/Checkbox';
import { Switch as CoreSwitch } from './components/atoms/Switch/Switch';
import { RadioGroup as CoreRadioGroup } from './components/atoms/RadioGroup/RadioGroup';
import { Typography as CoreTypography } from './components/atoms/Typography/Typography';
import { Statistic as CoreStatistic } from './components/atoms/Statistic/Statistic';
import { Text as CoreText } from './components/atoms/Text/Text';
import { SubText as CoreSubText } from './components/atoms/SubText/SubText';
import { Spacer as CoreSpacer } from './components/atoms/Spacer/Spacer';
import { Divider as CoreDivider } from './components/atoms/Divider/Divider';
import { Textarea as CoreTextarea } from './components/atoms/Textarea';
import { Toggle as CoreToggle } from './components/atoms/Toggle';
import { Skeleton as CoreSkeleton } from './components/atoms/Skeleton';
import { Spin as CoreSpin } from './components/atoms/Spin';
import { Label as CoreLabel } from './components/atoms/Label';

// ======================
// MOLECULES - Import and wrap
// ======================
import { DatePicker as CoreDatePicker } from './components/molecules/DatePicker/DatePicker';
import { Dropdown as CoreDropdown } from './components/molecules/Dropdown/Dropdown';
import { DropdownMenu as CoreDropdownMenu } from './components/molecules/DropdownMenu';
// Note: Select has complex types, export from components instead
import { ProgressBar as CoreProgressBar } from './components/molecules/ProgressBar/ProgressBar';
import { SegmentedTabs as CoreSegmentedTabs } from './components/molecules/SegmentedTabs/SegmentedTabs';
import { Steps as CoreSteps } from './components/molecules/Steps/Steps';
import { RadioSelector as CoreRadioSelector } from './components/molecules/RadioSelector/RadioSelector';
import { ButtonGroup as CoreButtonGroup } from './components/molecules/ButtonGroup/ButtonGroup';
import { Alert as CoreAlert } from './components/molecules/Alert';
import { Breadcrumb as CoreBreadcrumb } from './components/molecules/Breadcrumb';
import { Pagination as CorePagination } from './components/molecules/Pagination';
import { Tooltip as CoreTooltip } from './components/molecules/Tooltip';
import { Slider as CoreSlider } from './components/molecules/Slider';
import { TimePicker as CoreTimePicker } from './components/molecules/TimePicker';
import { Cascader as CoreCascader } from './components/molecules/Cascader';

// ======================
// ORGANISMS - Import and wrap
// ======================
import { Table as CoreTable } from './components/organisms/Table';
import { Tabs as CoreTabs } from './components/organisms/Tabs';
import { AppHeader as CoreAppHeader } from './components/organisms/AppHeader';
import { Footer as CoreFooter } from './components/organisms/Footer';
import { UserProfile as CoreUserProfile } from './components/organisms/UserProfile';
import { UserProfileDropdown as CoreUserProfileDropdown } from './components/organisms/UserProfileDropdown';
import { Collapsible as CoreCollapsible } from './components/organisms/Collapsible';
import { QuickFilters as CoreQuickFilters } from './components/organisms/QuickFilters';
import { UploadZone as CoreUploadZone } from './components/organisms/UploadZone';
import { Upload as CoreUpload } from './components/organisms/Upload';
import { FileCard as CoreFileCard } from './components/organisms/FileCard';
import { Card as CoreCard } from './components/organisms/Card';
import { Modal as CoreModal } from './components/organisms/Modal';
import { Drawer as CoreDrawer } from './components/organisms/Drawer';
import { Form as CoreForm } from './components/organisms/Form';
import { PageHeader as CorePageHeader } from './components/organisms/PageHeader';

// ======================
// CHARTS - Import and wrap
// ======================
import { BarChart as CoreBarChart } from './components/charts/BarChart';
import { LineChart as CoreLineChart } from './components/charts/LineChart';
import { PieChart as CorePieChart } from './components/charts/PieChart';
import { AreaChart as CoreAreaChart } from './components/charts/AreaChart';

// ======================
// Export AI-Protected Components
// ======================

// Atoms
export const Button = withAIProtection(CoreButton);
export const Input = withAIProtection(CoreInput);
export const Badge = withAIProtection(CoreBadge);
export const Checkbox = withAIProtection(CoreCheckbox);
export const Switch = withAIProtection(CoreSwitch);
export const RadioGroup = withAIProtection(CoreRadioGroup);
export const Typography = withAIProtection(CoreTypography);
export const Statistic = withAIProtection(CoreStatistic);
export const Text = withAIProtection(CoreText);
export const SubText = withAIProtection(CoreSubText);
export const Spacer = withAIProtection(CoreSpacer);
export const Divider = withAIProtection(CoreDivider);
export const Textarea = withAIProtection(CoreTextarea);
export const Toggle = withAIProtection(CoreToggle);
export const Skeleton = withAIProtection(CoreSkeleton);
export const Spin = withAIProtection(CoreSpin);
export const Label = withAIProtection(CoreLabel);

// Molecules
export const DatePicker = withAIProtection(CoreDatePicker);
export const Dropdown = withAIProtection(CoreDropdown);
export const DropdownMenu = withAIProtection(CoreDropdownMenu);
// Export Select directly (complex component with sub-components)
export { Select } from './components/molecules/Select';
export const ProgressBar = withAIProtection(CoreProgressBar);
export const SegmentedTabs = withAIProtection(CoreSegmentedTabs);
export const Steps = withAIProtection(CoreSteps);
export const RadioSelector = withAIProtection(CoreRadioSelector);
export const ButtonGroup = withAIProtection(CoreButtonGroup);
export const Alert = withAIProtection(CoreAlert);
export const Breadcrumb = withAIProtection(CoreBreadcrumb);
export const Pagination = withAIProtection(CorePagination);
export const Tooltip = withAIProtection(CoreTooltip);
export const Slider = withAIProtection(CoreSlider);
export const TimePicker = withAIProtection(CoreTimePicker);
export const Cascader = withAIProtection(CoreCascader);

// Organisms
export const Table = withAIProtection(CoreTable);
export const Tabs = withAIProtection(CoreTabs);
export const AppHeader = withAIProtection(CoreAppHeader);
export const Footer = withAIProtection(CoreFooter);
export const UserProfile = withAIProtection(CoreUserProfile);
export const UserProfileDropdown = withAIProtection(CoreUserProfileDropdown);
export const Collapsible = withAIProtection(CoreCollapsible);
export const QuickFilters = withAIProtection(CoreQuickFilters);
export const UploadZone = withAIProtection(CoreUploadZone);
export const Upload = withAIProtection(CoreUpload);
export const FileCard = withAIProtection(CoreFileCard);
export const Card = withAIProtection(CoreCard);
export const Modal = withAIProtection(CoreModal);
export const Drawer = withAIProtection(CoreDrawer);
export const Form = withAIProtection(CoreForm);
export const PageHeader = withAIProtection(CorePageHeader);

// Charts
export const BarChart = withAIProtection(CoreBarChart);
export const LineChart = withAIProtection(CoreLineChart);
export const PieChart = withAIProtection(CorePieChart);
export const AreaChart = withAIProtection(CoreAreaChart);

// ======================
// Non-Component Exports (no wrapping needed)
// ======================
export { Icon, iconMap } from './components/atoms/Icons';
export type { IconName } from './components/atoms/Icons';
export { Logo } from './components/atoms/Logos';
export { FTProvider, useFTTheme } from './components/FTProvider';
export type { FTProviderProps } from './components/FTProvider';
export { ThemeProvider, useTheme } from './contexts/ThemeContext';
export { GlassProvider, useGlass } from './contexts/GlassContext';
export { ThemeSwitch } from './components/molecules/ThemeSwitch';

// ======================
// Utilities
// ======================
export { cn } from './lib/utils';
export { designTokens, cssVariables } from './tokens/design-tokens';
export * from './lib/ai-utils';

// ======================
// Type Exports
// ======================
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/atoms/Button/Button';
export type { InputProps } from './components/atoms/Input/Input';
export type { BadgeProps } from './components/atoms/Badge/Badge';
export type { CheckboxProps } from './components/atoms/Checkbox/Checkbox';
export type { SwitchProps } from './components/atoms/Switch/Switch';
export type { TableProps, TableColumn } from './components/organisms/Table';
export type { TabsProps } from './components/organisms/Tabs';
export type { CardProps } from './components/organisms/Card';
export type { ModalProps } from './components/organisms/Modal';
export type { FormProps } from './components/organisms/Form';
