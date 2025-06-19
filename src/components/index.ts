// ======================
// ATOMIC DESIGNS EXPORTS
// ======================

// ATOMS - Basic building blocks
export { Button } from './atoms/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/Button/Button';
export { Input } from './atoms/Input/Input';
export type { InputProps } from './atoms/Input/Input';
export { Label } from './atoms/Label/Label';
export type { LabelProps } from './atoms/Label/Label';
export { Badge } from './atoms/Badge/Badge';
export type { BadgeProps } from './atoms/Badge/Badge';
export { Icon } from './atoms/Icons';
export type { IconName, IconProps } from './atoms/Icons';
// Export all individual icons for direct usage
export {
  Add,
  Aeroplane,
  Airtel,
  AlertCriticalFill,
  AlertCritical,
  AlertInformationalFill,
  AlertInformational,
  ArrowBottomLeft,
  ArrowDownRight,
  ArrowDown,
  ArrowTopLeft,
  ArrowTopRight,
  ArrowUp,
  Bell,
  Bsnl,
  BulkActions,
  CalendarClock,
  Calendar,
  Cheap,
  CheckAlt,
  CheckFill,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  CloseFilled,
  Comment,
  Copy,
  CrossIcon,
  Cross,
  CursorPointer,
  DataStack,
  Delete,
  Division,
  DocumentReuse,
  Document,
  Download,
  Drag,
  Edit,
  Excel,
  Expand,
  ExportFile,
  EyeInvisible,
  FileAlt,
  FileUpload,
  FileUploader,
  File,
  FillDetails,
  Filter,
  FtColour,
  FtGray,
  GoogleColour,
  GoogleGray,
  Gps,
  HamburgerMenu,
  Inbound,
  Jio,
  LightBulb,
  Link,
  Loading,
  Location,
  Lock,
  Logout,
  Mail,
  Map,
  More,
  Mtnl,
  MultipleLocation,
  MultipleTime,
  MultipleWeight,
  Navigator,
  Notification,
  Organisation,
  Outbound,
  Password,
  Pen,
  PhoneAlt,
  Phone,
  PlantAlt,
  Plant,
  Play,
  PlayFill,
  PortableTracking,
  PreviewFill,
  Preview,
  Recommended,
  Refresh,
  Remove,
  Road,
  Rocket,
  RoundTrip,
  RupeeCoin,
  Save,
  Search,
  Send,
  Settings,
  ShakeHand,
  Share,
  Ship,
  Sim,
  Sort,
  Star,
  Subtract,
  Success,
  Tata,
  TemperatureCold,
  TemperatureDefault,
  TemperatureHot,
  ThreeDotMenu,
  Time,
  Train,
  User as UserIcon,
  Vehicle,
  Vodafone,
  Warehouse,
  Weight,
  iconMap
} from './atoms/Icons';
export { Typography, TypographyExample, TypographyShowcase } from './atoms/Typography/Typography';
export type { TypographyProps, TypographyVariant, TypographySize, TypographyWeight, TypographyColor } from './atoms/Typography/Typography';
export { Colors } from './atoms/Colors/Colors';
export { Checkbox } from './atoms/Checkbox/Checkbox';
export type { CheckboxProps } from './atoms/Checkbox/Checkbox';
export { Switch } from './atoms/Switch/Switch';
export type { SwitchProps } from './atoms/Switch/Switch';
export { RadioGroup, RadioGroupItem } from './atoms/RadioGroup/RadioGroup';
export type { RadioGroupProps, RadioOption } from './atoms/RadioGroup/RadioGroup';
export { ReadOnly } from './atoms/ReadOnly/ReadOnly';
export type { ReadOnlyProps } from './atoms/ReadOnly/ReadOnly';
export { Logo, FTLogo, TataMotorsLogo } from './atoms/Logos';
export type { LogoName } from './atoms/Logos';

// MOLECULES - Simple combinations of atoms
export { RadioSelector } from './molecules/RadioSelector/RadioSelector';
export type { RadioSelectorProps } from './molecules/RadioSelector/RadioSelector';
export { DatePicker, DatePickerField } from './molecules/DatePicker/DatePicker';
export type { DatePickerProps, DatePickerFieldProps } from './molecules/DatePicker/DatePicker';
export { Dropdown } from './molecules/Dropdown/Dropdown';
export type { DropdownProps, DropdownOption } from './molecules/Dropdown/Dropdown';
export { SegmentedTabs } from './molecules/SegmentedTabs/SegmentedTabs';
export type { SegmentedTabsProps, SegmentedTabItem } from './molecules/SegmentedTabs/SegmentedTabs';
export { ProgressBar } from './molecules/ProgressBar';
export type { ProgressBarProps } from './molecules/ProgressBar';
export { Steps, StepsItem } from './molecules/Steps/Steps';
export type { StepsProps, StepsItemProps, Step } from './molecules/Steps/Steps';

// ORGANISMS - Complex combinations and complete UI sections
export { AppHeader } from './organisms/AppHeader/AppHeader';
export type { CompanyInfo } from '../types/company';
export type { AppHeaderProps, User } from './organisms/AppHeader/AppHeader';
export { Footer } from './organisms/Footer/Footer';
export type { FooterProps } from './organisms/Footer/Footer';
export { UserProfile } from './organisms/UserProfile/UserProfile';
export type { UserProfileProps } from './organisms/UserProfile/UserProfile';
export { Collapsible } from './organisms/Collapsible/Collapsible';
export type { CollapsibleProps } from './organisms/Collapsible/Collapsible';
export { QuickFilters } from './organisms/QuickFilters/QuickFilters';
export type { 
  QuickFiltersProps, 
  QuickFilter, 
  FilterOption, 
  FilterType, 
  FilterState 
} from './organisms/QuickFilters/QuickFilters';
export { Tabs, TabItem } from './organisms/Tabs/Tabs';
export type { TabsProps, TabItemProps, Tab } from './organisms/Tabs/Tabs';
export { UploadZone } from './organisms/UploadZone';
export type { UploadZoneProps } from './organisms/UploadZone';
export { FileCard } from './organisms/FileCard';
export type { FileCardProps, FileStats } from './organisms/FileCard';
export { FileThumbnail } from './organisms/FileThumbnail';
export type { FileThumbnailProps } from './organisms/FileThumbnail';
export { FileTypeIcon } from './organisms/FileTypeIcon';
export type { FileTypeIconProps } from './organisms/FileTypeIcon';
export { 
  Table, 
  TableCellText, 
  TableCellItem, 
  TableCell, 
  TableHeaderItem 
} from './organisms/Table';
export type { 
  TableProps, 
  TableColumn, 
  TableRow, 
  SortDirection, 
  ColumnType,
  TableCellTextProps,
  CellTextType,
  TableCellItemProps,
  TableCellProps,
  CellBackgroundColor,
  CellLineVariant,
  TableHeaderItemProps,
  HeaderItemType,
  HeaderColorVariant
} from './organisms/Table';

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