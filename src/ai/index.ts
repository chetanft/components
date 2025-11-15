/**
 * AI-ENHANCED FT DESIGN SYSTEM COMPONENTS
 * 
 * This module provides AI-protected versions of all FT Design System components.
 * These components automatically filter out problematic AI-generated props.
 * 
 * Usage:
 * import { Button, Input, Table } from 'ft-design-system/ai';
 */

import { withAIProtection } from '../lib/ai-utils';

// Import core components
import { Button as CoreButton } from '../components/atoms/Button/Button';
import { Input as CoreInput } from '../components/atoms/Input/Input';
import { Badge as CoreBadge } from '../components/atoms/Badge/Badge';
import { Checkbox as CoreCheckbox } from '../components/atoms/Checkbox/Checkbox';
import { Switch as CoreSwitch } from '../components/atoms/Switch/Switch';
import { RadioGroup as CoreRadioGroup, RadioGroupItem as CoreRadioGroupItem } from '../components/atoms/RadioGroup/RadioGroup';
import { Typography as CoreTypography } from '../components/atoms/Typography/Typography';
import { Statistic as CoreStatistic } from '../components/atoms/Statistic/Statistic';
import { Text as CoreText } from '../components/atoms/Text/Text';
import { SubText as CoreSubText } from '../components/atoms/SubText/SubText';

// Molecules
import { DatePicker as CoreDatePicker } from '../components/molecules/DatePicker/DatePicker';
import { Dropdown as CoreDropdown } from '../components/molecules/Dropdown/Dropdown';
import { ProgressBar as CoreProgressBar } from '../components/molecules/ProgressBar/ProgressBar';
import { SegmentedTabs as CoreSegmentedTabs } from '../components/molecules/SegmentedTabs/SegmentedTabs';
import { Steps as CoreSteps } from '../components/molecules/Steps/Steps';
import { RadioSelector as CoreRadioSelector } from '../components/molecules/RadioSelector/RadioSelector';
import { ButtonGroup as CoreButtonGroup } from '../components/molecules/ButtonGroup/ButtonGroup';

// Organisms
import { Table as CoreTable } from '../components/organisms/Table/Table';
import { Tabs as CoreTabs } from '../components/organisms/Tabs/Tabs';
import { AppHeader as CoreAppHeader } from '../components/organisms/AppHeader/AppHeader';
import { Footer as CoreFooter } from '../components/organisms/Footer/Footer';
import { UserProfile as CoreUserProfile } from '../components/organisms/UserProfile/UserProfile';
import { Collapsible as CoreCollapsible } from '../components/organisms/Collapsible/Collapsible';
import { QuickFilters as CoreQuickFilters } from '../components/organisms/QuickFilters/QuickFilters';
import { UploadZone as CoreUploadZone } from '../components/organisms/UploadZone/UploadZone';
import { FileCard as CoreFileCard } from '../components/organisms/FileCard/FileCard';
import { FileThumbnail as CoreFileThumbnail } from '../components/organisms/FileThumbnail/FileThumbnail';
import { FileTypeIcon as CoreFileTypeIcon } from '../components/organisms/FileTypeIcon/FileTypeIcon';
import { Card as CoreCard } from '../components/organisms/Card/Card';
import { DisplayBlock as CoreDisplayBlock } from '../components/organisms/DisplayBlock/DisplayBlock';
import { NavigationMenu as CoreNavigationMenu } from '../components/organisms/NavigationMenu/NavigationMenu';

// ======================
// AI-PROTECTED ATOMS
// ======================

export const Button = withAIProtection(CoreButton);
export const Input = withAIProtection(CoreInput);
export const Badge = withAIProtection(CoreBadge);
export const Checkbox = withAIProtection(CoreCheckbox);
export const Switch = withAIProtection(CoreSwitch);
export const RadioGroup = withAIProtection(CoreRadioGroup);
export const RadioGroupItem = withAIProtection(CoreRadioGroupItem);
export const Typography = withAIProtection(CoreTypography);
export const Statistic = withAIProtection(CoreStatistic);
export const Text = withAIProtection(CoreText);
export const SubText = withAIProtection(CoreSubText);

// ======================
// AI-PROTECTED MOLECULES
// ======================

export const DatePicker = withAIProtection(CoreDatePicker);
export const Dropdown = withAIProtection(CoreDropdown);
export const ProgressBar = withAIProtection(CoreProgressBar);
export const SegmentedTabs = withAIProtection(CoreSegmentedTabs);
export const Steps = withAIProtection(CoreSteps);
export const RadioSelector = withAIProtection(CoreRadioSelector);
export const ButtonGroup = withAIProtection(CoreButtonGroup);

// ======================
// AI-PROTECTED ORGANISMS
// ======================

export const Table = withAIProtection(CoreTable);
export const Tabs = withAIProtection(CoreTabs);
export const AppHeader = withAIProtection(CoreAppHeader);
export const Footer = withAIProtection(CoreFooter);
export const UserProfile = withAIProtection(CoreUserProfile);
export const Collapsible = withAIProtection(CoreCollapsible);
export const QuickFilters = withAIProtection(CoreQuickFilters);
export const UploadZone = withAIProtection(CoreUploadZone);
export const FileCard = withAIProtection(CoreFileCard);
export const FileThumbnail = withAIProtection(CoreFileThumbnail);
export const FileTypeIcon = withAIProtection(CoreFileTypeIcon);
export const Card = withAIProtection(CoreCard);
export const DisplayBlock = withAIProtection(CoreDisplayBlock);
export const NavigationMenu = withAIProtection(CoreNavigationMenu);

// ======================
// AI UTILITIES
// ======================

export {
  filterAIClasses,
  filterAIStyles,
  cnSafe,
  withAIProtection,
  detectDesignSystemConflicts,
  debugDesignSystemConflicts,
  validateFTDesignSystem,
  runAIDevelopmentChecks
} from '../lib/ai-utils';

// ======================
// TYPE EXPORTS
// ======================

// Re-export all types from core components
export type { ButtonProps, ButtonVariant, ButtonSize } from '../components/atoms/Button/Button';
export type { InputProps } from '../components/atoms/Input/Input';
export type { BadgeProps } from '../components/atoms/Badge/Badge';
export type { CheckboxProps } from '../components/atoms/Checkbox/Checkbox';
export type { SwitchProps } from '../components/atoms/Switch/Switch';
export type { RadioGroupProps, RadioOption } from '../components/atoms/RadioGroup/RadioGroup';
export type { StatisticProps } from '../components/atoms/Statistic/Statistic';
export type { TextProps } from '../components/atoms/Text/Text';
export type { SubTextProps } from '../components/atoms/SubText/SubText';

export type { DatePickerProps } from '../components/molecules/DatePicker/DatePicker';
export type { DropdownProps, DropdownOption } from '../components/molecules/Dropdown/Dropdown';
export type { ProgressBarProps } from '../components/molecules/ProgressBar/ProgressBar';
export type { SegmentedTabsProps, SegmentedTabItem } from '../components/molecules/SegmentedTabs/SegmentedTabs';
export type { StepsProps, Step } from '../components/molecules/Steps/Steps';
export type { RadioSelectorProps } from '../components/molecules/RadioSelector/RadioSelector';
export type { ButtonGroupProps, ButtonGroupItem } from '../components/molecules/ButtonGroup/ButtonGroup';

export type { TableProps, TableColumn, TableRow } from '../components/organisms/Table/Table';
export type { TabsProps, Tab } from '../components/organisms/Tabs/Tabs';
export type { AppHeaderProps, User } from '../components/organisms/AppHeader/AppHeader';
export type { FooterProps } from '../components/organisms/Footer/Footer';
export type { UserProfileProps } from '../components/organisms/UserProfile/UserProfile';
export type { CollapsibleProps } from '../components/organisms/Collapsible/Collapsible';
export type { QuickFiltersProps, QuickFilter } from '../components/organisms/QuickFilters/QuickFilters';
export type { UploadZoneProps } from '../components/organisms/UploadZone/UploadZone';
export type { FileCardProps } from '../components/organisms/FileCard/FileCard';
export type { FileThumbnailProps } from '../components/organisms/FileThumbnail/FileThumbnail';
export type { FileTypeIconProps } from '../components/organisms/FileTypeIcon/FileTypeIcon';
export type { CardProps } from '../components/organisms/Card/Card';
export type { DisplayBlockProps } from '../components/organisms/DisplayBlock/DisplayBlock';
export type { NavigationMenuProps } from '../components/organisms/NavigationMenu/NavigationMenu'; 