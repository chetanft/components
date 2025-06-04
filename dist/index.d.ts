import * as React from 'react';
import React__default from 'react';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';

declare const designTokens: {
    readonly colors: {
        readonly dark: {
            readonly 100: "#434f64";
            readonly 50: "#5f697b";
            readonly 25: "#838c9d";
        };
        readonly border: "#ced1d7";
        readonly divider: "#f0f1f7";
        readonly background: "#f8f8f9";
        readonly white: "#ffffff";
        readonly critical: {
            readonly default: "#ff3533";
            readonly dark: "#b80100";
            readonly light: "#ffeaea";
        };
        readonly warning: {
            readonly default: "#ff6c19";
            readonly dark: "#dd6a00";
            readonly light: "#ffebdc";
        };
        readonly positive: {
            readonly default: "#00c638";
            readonly dark: "#00763d";
            readonly light: "#dfffe8";
        };
        readonly neutral: {
            readonly default: "#1890ff";
            readonly dark: "#006ed3";
            readonly light: "#ecf6ff";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly primary: "Inter";
            readonly secondary: "Inter";
        };
        readonly fontWeight: {
            readonly regular: "400";
            readonly medium: "500";
            readonly semibold: "600";
        };
        readonly fontSize: {
            readonly desktop: {
                readonly sm: "14px";
                readonly md: "16px";
                readonly lg: "20px";
                readonly xl: "24px";
                readonly xxl: "28px";
            };
            readonly tablet: {
                readonly sm: "12px";
                readonly md: "14px";
                readonly lg: "18px";
                readonly xl: "21px";
                readonly xxl: "26px";
            };
        };
    };
    readonly spacing: {
        readonly desktop: {
            readonly x0: "0px";
            readonly x1: "4px";
            readonly x2: "8px";
            readonly x3: "12px";
            readonly x4: "16px";
            readonly x5: "20px";
            readonly x6: "24px";
            readonly x7: "28px";
            readonly x8: "32px";
            readonly x9: "36px";
            readonly x10: "40px";
            readonly x11: "44px";
            readonly x12: "48px";
            readonly x13: "52px";
            readonly x14: "56px";
            readonly x15: "60px";
            readonly x16: "64px";
        };
        readonly tablet: {
            readonly x0: "0px";
            readonly x1: "0px";
            readonly x2: "4px";
            readonly x3: "8px";
            readonly x4: "12px";
            readonly x5: "16px";
            readonly x6: "20px";
            readonly x7: "24px";
            readonly x8: "28px";
            readonly x9: "32px";
            readonly x10: "36px";
            readonly x11: "40px";
            readonly x12: "44px";
            readonly x13: "48px";
            readonly x14: "52px";
            readonly x15: "56px";
            readonly x16: "60px";
        };
        readonly card: {
            readonly padding: {
                readonly none: "0px";
                readonly default: "20px";
                readonly tablet: "16px";
            };
            readonly border: {
                readonly none: "0px";
                readonly default: "1px";
            };
        };
    };
    readonly borderRadius: {
        readonly none: "0px";
        readonly sm: "4px";
        readonly md: "8px";
        readonly lg: "16px";
        readonly full: "100px";
    };
    readonly breakpoints: {
        readonly desktop: {
            readonly margins: "20px";
            readonly gutters: "20px";
        };
        readonly tablet: {
            readonly margins: "16px";
            readonly gutters: "16px";
        };
    };
};
declare const cssVariables: string;

declare const iconMap: {
    add: React.FC<{}>;
    aeroplane: React.FC<{}>;
    airtel: React.FC<{}>;
    'alert-critical-fill': React.FC<{}>;
    'alert-critical': React.FC<{}>;
    'alert-informational-fill': React.FC<{}>;
    'alert-informational': React.FC<{}>;
    'arrow-bottom-left': React.FC<{}>;
    'arrow-down-right': React.FC<{}>;
    'arrow-down': React.FC<{}>;
    'arrow-top-left': React.FC<{}>;
    'arrow-top-right': React.FC<{}>;
    'arrow-up': React.FC<{}>;
    bell: React.FC<{}>;
    bsnl: React.FC<{}>;
    'bulk-actions': React.FC<{}>;
    'calendar-clock': React.FC<{}>;
    calendar: React.FC<{}>;
    cheap: React.FC<{}>;
    'check-alt': React.FC<{}>;
    'check-fill': React.FC<{}>;
    check: React.FC<{}>;
    'chevron-down': React.FC<{}>;
    'chevron-left': React.FC<{}>;
    'chevron-right': React.FC<{}>;
    'chevron-up': React.FC<{}>;
    clock: React.FC<{}>;
    'close-filled': React.FC<{}>;
    comment: React.FC<{}>;
    copy: React.FC<{}>;
    'cross-icon': React.FC<{}>;
    cross: React.FC<{}>;
    'cursor-pointer': React.FC<{}>;
    'data-stack': React.FC<{}>;
    delete: React.FC<{}>;
    division: React.FC<{}>;
    'document-reuse': React.FC<{}>;
    document: React.FC<{}>;
    download: React.FC<{}>;
    drag: React.FC<{}>;
    edit: React.FC<{}>;
    excel: React.FC<{}>;
    expand: React.FC<{}>;
    'export-file': React.FC<{}>;
    'eye-invisible': React.FC<{}>;
    'file-alt': React.FC<{}>;
    'file-upload': React.FC<{}>;
    'file-uploader': React.FC<{}>;
    file: React.FC<{}>;
    'fill-details': React.FC<{}>;
    filter: React.FC<{}>;
    'ft-colour': React.FC<{}>;
    'ft-gray': React.FC<{}>;
    'google-colour': React.FC<{}>;
    'google-gray': React.FC<{}>;
    gps: React.FC<{}>;
    'hamburger-menu': React.FC<{}>;
    inbound: React.FC<{}>;
    jio: React.FC<{}>;
    'light-bulb': React.FC<{}>;
    link: React.FC<{}>;
    loading: React.FC<{}>;
    location: React.FC<{}>;
    lock: React.FC<{}>;
    logout: React.FC<{}>;
    mail: React.FC<{}>;
    map: React.FC<{}>;
    more: React.FC<{}>;
    mtnl: React.FC<{}>;
    'multiple-location': React.FC<{}>;
    'multiple-time': React.FC<{}>;
    'multiple-weight': React.FC<{}>;
    navigator: React.FC<{}>;
    notification: React.FC<{}>;
    organisation: React.FC<{}>;
    outbound: React.FC<{}>;
    password: React.FC<{}>;
    pen: React.FC<{}>;
    'phone-alt': React.FC<{}>;
    phone: React.FC<{}>;
    'plant-alt': React.FC<{}>;
    plant: React.FC<{}>;
    'portable-tracking': React.FC<{}>;
    'preview-fill': React.FC<{}>;
    preview: React.FC<{}>;
    recommended: React.FC<{}>;
    refresh: React.FC<{}>;
    remove: React.FC<{}>;
    road: React.FC<{}>;
    rocket: React.FC<{}>;
    'round-trip': React.FC<{}>;
    'rupee-coin': React.FC<{}>;
    save: React.FC<{}>;
    search: React.FC<{}>;
    send: React.FC<{}>;
    settings: React.FC<{}>;
    'shake-hand': React.FC<{}>;
    share: React.FC<{}>;
    ship: React.FC<{}>;
    sim: React.FC<{}>;
    sort: React.FC<{}>;
    star: React.FC<{}>;
    subtract: React.FC<{}>;
    success: React.FC<{}>;
    tata: React.FC<{}>;
    'temperature-cold': React.FC<{}>;
    'temperature-default': React.FC<{}>;
    'temperature-hot': React.FC<{}>;
    'three-dot-menu': React.FC<{}>;
    time: React.FC<{}>;
    train: React.FC<{}>;
    user: React.FC<{}>;
    vehicle: React.FC<{}>;
    vodafone: React.FC<{}>;
    warehouse: React.FC<{}>;
    weight: React.FC<{}>;
};

type IconName = keyof typeof iconMap;
interface IconProps {
    name: IconName;
    size?: number | string;
    color?: string;
    className?: string;
    style?: React__default.CSSProperties;
}
declare const Icon: React__default.FC<IconProps>;

interface BadgeProps extends React__default.HTMLAttributes<HTMLDivElement> {
    variant?: 'normal' | 'danger' | 'success' | 'warning' | 'neutral';
    size?: 'sm' | 'md';
    icon?: IconName;
    children: React__default.ReactNode;
}
declare const Badge: React__default.ForwardRefExoticComponent<BadgeProps & React__default.RefAttributes<HTMLDivElement>>;

type ButtonVariant = "primary" | "secondary" | "destructive" | "link";
type ButtonSize = "sm" | "md" | "lg";
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    showIcon?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    indeterminate?: boolean;
    size?: 'sm' | 'md';
    variant?: 'on-light' | 'on-dark';
}
declare const Checkbox: React__default.ForwardRefExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

type ChickletVariant = 'rounded' | 'rectangular';
type ChickletState = 'default' | 'hover';
interface ChickletProps {
    /** The text content of the chicklet */
    label: string;
    /** Whether the chicklet has rounded corners (pill) or rectangular corners */
    variant?: ChickletVariant;
    /** Whether to show the close (cross) icon */
    showClose?: boolean;
    /** Callback when the close icon is clicked */
    onClose?: () => void;
    /** Callback when the chicklet is clicked */
    onClick?: () => void;
    /** Whether the chicklet is disabled */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}
declare const Chicklet: React__default.ForwardRefExoticComponent<ChickletProps & React__default.RefAttributes<HTMLDivElement>>;

declare const datePickerFieldVariants: (props?: ({
    size?: "xl" | "l" | "m" | null | undefined;
    state?: "default" | "filled" | "disabled" | "hover" | "prefilled" | "focused" | "typing" | null | undefined;
    type?: "success" | "normal" | "warning" | "error" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface DatePickerFieldProps extends VariantProps<typeof datePickerFieldVariants> {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    showTime?: boolean;
    className?: string;
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const DatePickerField: React__default.ForwardRefExoticComponent<DatePickerFieldProps & React__default.RefAttributes<HTMLInputElement>>;
interface LabelProps {
    children: React__default.ReactNode;
    required?: boolean;
    className?: string;
}
declare const Label: React__default.FC<LabelProps>;
interface DatePickerProps extends Omit<DatePickerFieldProps, 'size'> {
    label?: string;
    labelPosition?: "top" | "left" | "none";
    required?: boolean;
    size?: "xl" | "l" | "m";
    showTime?: boolean;
    className?: string;
}
declare const DatePicker: React__default.ForwardRefExoticComponent<DatePickerProps & React__default.RefAttributes<HTMLInputElement>>;

declare const dropdownFieldVariants: (props?: ({
    size?: "xl" | "l" | "m" | null | undefined;
    state?: "default" | "filled" | "disabled" | "hover" | "prefilled" | "focused" | "typing" | null | undefined;
    type?: "success" | "normal" | "warning" | "error" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface DropdownFieldProps extends VariantProps<typeof dropdownFieldVariants> {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    open?: boolean;
    className?: string;
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
declare const DropdownField: React__default.ForwardRefExoticComponent<DropdownFieldProps & React__default.RefAttributes<HTMLDivElement>>;
interface CaptionProps {
    children: React__default.ReactNode;
    type?: "default" | "error" | "warning" | "success";
    className?: string;
}
declare const Caption: React__default.FC<CaptionProps>;
interface DropdownProps extends Omit<DropdownFieldProps, 'size'> {
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
declare const Dropdown: React__default.ForwardRefExoticComponent<DropdownProps & React__default.RefAttributes<HTMLDivElement>>;

interface InputProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leadingIcon?: IconName;
    trailingIcon?: IconName;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'filled';
}
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface RadioGroupProps {
    name: string;
    value?: string;
    defaultValue?: string;
    options?: RadioOption[];
    onChange?: (value: string) => void;
    className?: string;
    size?: 'sm' | 'md';
    orientation?: 'horizontal' | 'vertical';
    children?: React__default.ReactNode;
}
declare const RadioGroup: React__default.FC<RadioGroupProps>;
declare const RadioGroupItem: ({ children, ...props }: {
    children?: React__default.ReactNode;
    [key: string]: any;
}) => react_jsx_runtime.JSX.Element;

interface SwitchProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    size?: 'sm' | 'md';
}
declare const Switch: React__default.ForwardRefExoticComponent<SwitchProps & React__default.RefAttributes<HTMLInputElement>>;

type TabType = 'primary' | 'secondary' | 'tertiary';
interface Tab {
    label: string;
    badge?: boolean;
    badgeCount?: string | number;
    notification?: boolean;
    icon?: boolean;
}
interface TabsProps {
    tabs: Tab[];
    activeTab?: number;
    onTabChange?: (index: number) => void;
    type?: TabType;
    showLine?: boolean;
    className?: string;
}
declare const Tabs: React__default.ForwardRefExoticComponent<TabsProps & React__default.RefAttributes<HTMLDivElement>>;

type SortDirection = 'asc' | 'desc' | null;
type ColumnType = 'text' | 'number' | 'date' | 'actions';
type TableVariant = 'primary' | 'secondary';
interface TableColumn<T = any> {
    key: string;
    title: string;
    type?: ColumnType;
    sortable?: boolean;
    width?: string;
    render?: (value: any, row: T, index: number) => React__default.ReactNode;
}
interface TableRow {
    id: string | number;
    [key: string]: any;
}
interface TableProps<T extends TableRow = TableRow> {
    columns: TableColumn<T>[];
    data: T[];
    variant?: TableVariant;
    selectable?: boolean;
    selectedRows?: (string | number)[];
    onSelectionChange?: (selectedRows: (string | number)[]) => void;
    onSort?: (column: string, direction: SortDirection) => void;
    sortColumn?: string;
    sortDirection?: SortDirection;
    pagination?: {
        currentPage: number;
        totalPages: number;
        pageSize: number;
        totalItems: number;
        onPageChange: (page: number) => void;
    };
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}
declare const Table: {
    <T extends TableRow = TableRow>({ columns, data, variant, selectable, selectedRows, onSelectionChange, onSort, sortColumn, sortDirection, pagination, loading, emptyMessage, className }: TableProps<T>): react_jsx_runtime.JSX.Element | null;
    displayName: string;
};

type CellTextType = 'primary' | 'secondary';
interface TableCellTextProps {
    type?: CellTextType;
    children: React__default.ReactNode;
    className?: string;
}
declare const TableCellText: React__default.FC<TableCellTextProps>;

interface TableCellItemProps {
    text?: string;
    textType?: CellTextType;
    prefixIcon?: IconName;
    suffixIcon?: IconName;
    badge?: React__default.ReactNode;
    className?: string;
}
declare const TableCellItem: React__default.FC<TableCellItemProps>;

type CellBackgroundColor = 'white' | 'bg';
type CellBorderStyle = 'single' | 'double';
interface TableCellProps {
    backgroundColor?: CellBackgroundColor;
    borderStyle?: CellBorderStyle;
    children: React__default.ReactNode;
    className?: string;
}
declare const TableCell: React__default.FC<TableCellProps>;

type HeaderItemType = 'text' | 'checkbox';
type HeaderColorVariant = 'dark25' | 'bg' | 'white';
interface TableHeaderItemProps {
    type?: HeaderItemType;
    colorVariant?: HeaderColorVariant;
    sortable?: boolean;
    draggable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    checkboxProps?: {
        checked?: boolean;
        indeterminate?: boolean;
        onChange?: () => void;
    };
    children?: React__default.ReactNode;
    onClick?: () => void;
    className?: string;
}
declare const TableHeaderItem: React__default.FC<TableHeaderItemProps>;

interface TypographyExampleProps {
    title: string;
    details: React__default.ReactNode;
    usage: string;
    token: string;
    className?: string;
    children: React__default.ReactNode;
}
declare function TypographyExample({ title, details, usage, token, className, children }: TypographyExampleProps): react_jsx_runtime.JSX.Element;
declare function Typography(): react_jsx_runtime.JSX.Element;

declare function Colors(): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

declare const globalStyles = "./styles/globals.css";

export { Badge, Button, Caption, Checkbox, Chicklet, ChickletProps, ChickletState, ChickletVariant, Colors, ColumnType, DatePicker, DatePickerField, Dropdown, DropdownField, Icon, Input, Label, RadioGroup, RadioGroupItem, SortDirection, Switch, Table, TableCell, TableCellItem, TableCellItemProps, TableCellProps, TableCellText, TableCellTextProps, TableColumn, TableHeaderItem, TableHeaderItemProps, TableProps, TableRow, TableVariant, Tabs, Typography, TypographyExample, cn, cssVariables, designTokens, globalStyles };
