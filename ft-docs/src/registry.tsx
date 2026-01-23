"use client"

import * as React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
    AppHeader,
    Avatar,
    AvatarGroup,
    Badge,
    Ribbon,
    Button,
    ButtonGroup,
    Card,
    CardMeta,
    Checkbox,
    Chicklet,
    Collapsible,
    Collapse,
    DataEntryTable,
    DatePicker,
    Divider,
    Dropdown,
    DropdownMenu,
    DropdownMenuItem,
    FileCard,
    FileThumbnail,
    FileTypeIcon,
    FileValidationCard,
    Footer,
    Icon,
    Illustration,
    Input,
    Label,
    Logo,
    NavigationLauncher,
    NavigationPopover,
    ProgressBar,
    Loader,
    ProgressList,
    QuickFilters,
    RadioGroup,
    RadioSelector,
    ReadOnly,
    SegmentedTabs,
    SimpleColumnLayout,
    Spacer,
    StackedBarChart,
    Statistic,
    Steps,
    StepItem,
    SubText,
    Switch,
    Table,
    Tabs,
    Text,
    Tooltip,
    Typography,
    Upload,
    UploadButton,
    UploadItem,
    UploadThumbnail,
    UploadZone,
    UserProfile,
    UserProfileDropdown,
    Textarea,
    Skeleton,
    Alert,
    Breadcrumb,
    Pagination,
    NotificationProvider,
    Modal,
    Drawer,
    GridDrawer,
    // Charts
    AreaChart,
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart,
    RadarChart,
    PolarAreaChart,
    ScatterChart,
    BubbleChart,
    RadialChart,
    HorizontalBarChart,
    DualAxesChart,
    GaugeChart,
    WaterfallChart,
    BulletChart,
    // Phase 1 Components
    Spin,
    Empty,
    InputNumber,
    Slider,
    Rate,
    message,
    TimePicker,
    Result,
    Row,
    Col,
    Form,
    FormItem,
    useForm,
    // Phase 2 Components
    Timeline,
    Tree,
    TreeSelect,
    Cascader,
    Carousel,
    Image,
    Calendar,
    // Phase 3 Components
    Anchor,
    Affix,
    BackTop,
    FloatButton,
    FloatButtonGroup,
    Tour,
    Watermark,
    Mentions,
    Transfer,
    ColorPicker,
    // Additional Components
    Popconfirm,
    Toggle,
    ToggleGroup,
    List,
    HoverCard,
    Descriptions,
} from "../../src"

export { UserProfile } from "../../src"

// Export components directly for use in ft-docs
// These are re-exported from the main src/components index
export {
    Button,
    Icon,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipTitle,
    TooltipDescription,
    TooltipArrow,
    Input,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    CollapsibleHeader,
    CollapsibleTitle,
    CollapsibleIcon,
    SegmentedTabs,
    SegmentedTabItem,
} from "../../src"

import { Plus as PlusIcon, ArrowRight as ArrowRightIcon, Pencil as PencilIcon } from "lucide-react"

// Sample data for component examples
const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const sampleOptionsWithDisabled = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra Large', disabled: true },
];

const sampleButtons = [
  { id: 'ghost', label: 'Button', variant: 'text', icon: 'add', iconPosition: 'leading' },
  { id: 'outline', label: 'Button', variant: 'secondary', icon: 'add', iconPosition: 'leading' },
  { id: 'filled', label: 'Button', variant: 'primary', icon: 'add', iconPosition: 'leading' },
];

const baseOptions = [
  {
    value: 'option1',
    header: 'Radio selector header',
    description: 'Radio selector description',
  },
  {
    value: 'option2',
    header: 'Radio selector header',
    description: 'Radio selector description',
  },
];

// Sample steps for Steps component
const sampleSteps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
  { label: 'Step 3' },
];

// Sample image URL for FileThumbnail
const sampleImageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';

// Sample rows for SimpleColumnLayout
const sampleRows = [
  {
    left: { title: 'Label', subtitle: 'Value' },
    right: { title: 'Label', subtitle: 'Value', align: 'end' as const },
  },
  {
    left: { title: 'Label', subtitle: 'Value' },
    right: { title: 'Label', subtitle: 'Value', align: 'end' as const },
  },
];

// Sample items for SegmentedTabs
const sampleTabItems = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
];

// Sample items for ProgressList
const sampleProgressItems = [
  {
    id: '1',
    title: 'Step 1',
    description: 'First step description',
    state: 'completed' as const,
    pointType: 'icon' as const,
    lineType: 'solid' as const,
    icon: 'check',
  },
  {
    id: '2',
    title: 'Step 2',
    description: 'Second step description',
    state: 'current' as const,
    pointType: 'primary' as const,
    lineType: 'solid' as const,
  },
  {
    id: '3',
    title: 'Step 3',
    description: 'Third step description',
    state: 'upcoming' as const,
    pointType: 'label' as const,
    lineType: 'dashed' as const,
    pointLabel: 'END',
  },
];

// Sample tree data
const sampleTreeData = [
  {
    key: '0-0',
    title: 'Parent 1',
    children: [
      { key: '0-0-0', title: 'Child 1' },
      { key: '0-0-1', title: 'Child 2' },
    ],
  },
  {
    key: '0-1',
    title: 'Parent 2',
    children: [
      { key: '0-1-0', title: 'Child 3' },
    ],
  },
];

// Sample cascader options
const sampleCascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
];

// Sample timeline items
const sampleTimelineItems = [
  { children: 'Create a services site 2015-09-01' },
  { children: 'Solve initial network problems 2015-09-01' },
  { children: 'Technical testing 2015-09-01', color: 'success' },
  { children: 'Network problems being solved 2015-09-01', color: 'danger' },
];

// Sample transfer data
const sampleTransferData = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

export const registry: Record<string, React.ComponentType<any> | any> = {
    // React and hooks
    React,
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
    // Existing Components
    AppHeader,
    Avatar,
    AvatarGroup,
    Badge,
    Ribbon,
    Button,
    ButtonGroup,
    Card,
    CardMeta,
    Checkbox,
    Chicklet,
    Collapsible,
    Collapse,
    DataEntryTable,
    DatePicker,
    Divider,
    Dropdown,
    DropdownMenu,
    DropdownMenuItem,
    FileCard,
    FileThumbnail,
    FileTypeIcon,
    FileValidationCard,
    Footer,
    Icon,
    Illustration,
    Input,
    Label,
    Logo,
    Logos: Logo, // Alias for Logo component
    NavigationLauncher,
    NavigationPopover,
    ProgressBar,
    Loader,
    ProgressList,
    QuickFilters,
    RadioGroup,
    RadioSelector,
    ReadOnly,
    SegmentedTabs,
    SimpleColumnLayout,
    Spacer,
    StackedBarChart,
    Statistic,
    Steps,
    StepItem,
    SubText,
    Switch,
    Table,
    Tabs,
    Text,
    Tooltip,
    Typography,
    Upload,
    UploadButton,
    UploadItem,
    UploadThumbnail,
    UploadZone,
    UserProfile,
    UserProfileDropdown,
    Textarea,
    Skeleton,
    Alert,
    Breadcrumb,
    Pagination,
    NotificationProvider,
    Modal,
    Drawer,
    GridDrawer,
    // Charts
    AreaChart,
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart,
    RadarChart,
    PolarAreaChart,
    ScatterChart,
    BubbleChart,
    RadialChart,
    HorizontalBarChart,
    DualAxesChart,
    GaugeChart,
    WaterfallChart,
    BulletChart,
    // Phase 1 - NEW Components
    Spin,
    Empty,
    InputNumber,
    Slider,
    Rate,
    message,
    TimePicker,
    Result,
    Row,
    Col,
    Form,
    FormItem,
    useForm,
    // Phase 2 - NEW Components
    Timeline,
    Tree,
    TreeSelect,
    Cascader,
    Carousel,
    Image,
    Calendar,
    // Phase 3 - NEW Components
    Anchor,
    Affix,
    BackTop,
    FloatButton,
    FloatButtonGroup,
    Tour,
    Watermark,
    Mentions,
    Transfer,
    ColorPicker,
    // Additional Components
    Popconfirm,
    Toggle,
    ToggleGroup,
    List,
    HoverCard,
    Descriptions,
    // Icons
    PlusIcon,
    ArrowRightIcon,
    PencilIcon,
    // Sample data
    sampleOptions,
    sampleOptionsWithDisabled,
    sampleButtons,
    baseOptions,
    sampleSteps,
    sampleImageUrl,
    sampleRows,
    sampleTabItems,
    sampleProgressItems,
    sampleTreeData,
    sampleCascaderOptions,
    sampleTimelineItems,
    sampleTransferData,
}
