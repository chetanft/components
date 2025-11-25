# FT Design System vs Ant Design - Implementation Plan

## 🏷️ Legend
- ✅ = Exists in FT Design System
- 🆕 = **NEW** - To be built using FT Design System tokens
- ⚡ = Variant to be added to existing component

---

## 1. Component Implementation Plan

### 1.1 General Components

| Component | FT Status | FT Variants | Action Required |
|-----------|-----------|-------------|-----------------|
| **Button** | ✅ | primary, secondary, tertiary, destructive, text, link | ⚡ Add: ghost, dashed variants |
| **Icon** | ✅ | 190+ custom icons | ✅ Complete |
| **Typography** | ✅ | 11 variants | ⚡ Add: Paragraph, Link components |

### 1.2 Layout Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **Divider** | ✅ | ⚡ Add: vertical, dashed, text-inside variants |
| **Grid** | 🆕 **NEW** | Build Row/Col with 24-column system |
| **Layout** | ✅ Partial | ⚡ Add: Sider component |
| **Space** | ✅ (Spacer) | ✅ Complete |
| **Flex** | 🆕 **NEW** | Build Flex container component |

### 1.3 Navigation Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **Anchor** | 🆕 **NEW** | Build anchor navigation |
| **Breadcrumb** | ✅ | ⚡ Add: dropdown items, custom separators |
| **Dropdown** | ✅ | ✅ Complete (has search) |
| **Menu** | ✅ (NavigationPopover) | ⚡ Add: inline, collapsed, themes |
| **Pagination** | ✅ | ⚡ Add: size changer, quick jumper |
| **Steps** | ✅ | ⚡ Add: vertical, dot, navigation types |
| **BackTop** | 🆕 **NEW** | Build scroll-to-top button |

### 1.4 Data Entry Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **AutoComplete** | 🆕 **NEW** | Build autocomplete input |
| **Cascader** | 🆕 **NEW** | Build cascading select |
| **Checkbox** | ✅ | ✅ Complete |
| **ColorPicker** | 🆕 **NEW** | Build color picker |
| **DatePicker** | ✅ | ⚡ Add: week, month, quarter, year, range modes |
| **Form** | 🆕 **NEW** | Build form with validation |
| **Input** | ✅ | ⚡ Add: addon, allowClear |
| **InputNumber** | 🆕 **NEW** | Build numeric input |
| **Mentions** | 🆕 **NEW** | Build @mentions input |
| **Radio** | ✅ | ⚡ Add: button style variant |
| **Rate** | 🆕 **NEW** | Build star rating |
| **Select** | ✅ (Dropdown) | ✅ Complete |
| **Slider** | 🆕 **NEW** | Build range slider |
| **Switch** | ✅ | ⚡ Add: loading state, children content |
| **TimePicker** | 🆕 **NEW** | Build time picker |
| **Transfer** | 🆕 **NEW** | Build transfer list |
| **TreeSelect** | 🆕 **NEW** | Build tree select |
| **Upload** | ✅ | ✅ Complete |

### 1.5 Data Display Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **Avatar** | ✅ | ⚡ Add: square shape, group |
| **Badge** | ✅ | ⚡ Add: count, dot, ribbon |
| **Calendar** | 🆕 **NEW** | Build standalone calendar |
| **Card** | ✅ | ⚡ Add: size variants, actions, extra |
| **Carousel** | 🆕 **NEW** | Build content carousel |
| **Collapse** | ✅ (Collapsible) | ⚡ Add: accordion, ghost modes |
| **Descriptions** | 🆕 **NEW** | Build description list |
| **Empty** | 🆕 **NEW** | Build empty state |
| **Image** | 🆕 **NEW** | Build image with preview |
| **List** | 🆕 **NEW** | Build list component |
| **Popover** | ✅ | ✅ Complete |
| **QRCode** | 🆕 **NEW** | Build QR generator |
| **Segmented** | ✅ | ⚡ Add: block mode |
| **Statistic** | ✅ | ⚡ Add: countdown |
| **Table** | ✅ | ⚡ Add: expandable, tree data, virtual |
| **Tabs** | ✅ | ⚡ Add: card type, editable |
| **Tag** | ✅ (Chicklet) | ⚡ Add: closable, bordered |
| **Timeline** | 🆕 **NEW** | Build timeline |
| **Tooltip** | ✅ | ✅ Complete |
| **Tour** | 🆕 **NEW** | Build user tour |
| **Tree** | 🆕 **NEW** | Build tree view |

### 1.6 Feedback Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **Alert** | ✅ | ⚡ Add: banner, action slot |
| **Drawer** | ✅ | ✅ Complete |
| **Message** | 🆕 **NEW** | Build global message |
| **Modal** | ✅ | ⚡ Add: confirm modal |
| **Notification** | ✅ | ⚡ Add: placement options |
| **Popconfirm** | 🆕 **NEW** | Build confirmation popover |
| **Progress** | ✅ (ProgressBar) | ⚡ Add: circle, dashboard |
| **Result** | 🆕 **NEW** | Build result page |
| **Skeleton** | ✅ | ⚡ Add: avatar, complex layouts |
| **Spin** | 🆕 **NEW** | Build loading spinner |
| **Watermark** | 🆕 **NEW** | Build watermark |

### 1.7 Other Components

| Component | FT Status | Action Required |
|-----------|-----------|-----------------|
| **Affix** | 🆕 **NEW** | Build sticky positioning |
| **ConfigProvider** | ✅ (ThemeProvider) | ✅ Complete |
| **FloatButton** | 🆕 **NEW** | Build floating action button |
| **Splitter** | 🆕 **NEW** | Build resizable panels |

---

## 2. 🆕 NEW Charts to Build

| Chart Type | Priority | Implementation Notes |
|------------|----------|---------------------|
| **Horizontal Bar** | 🆕 High | Extend BarChart with orientation prop |
| **Gauge** | 🆕 High | Use Chart.js doughnut with custom rendering |
| **Funnel** | 🆕 Medium | Custom SVG-based implementation |
| **Heatmap** | 🆕 Medium | Matrix-based color visualization |
| **Treemap** | 🆕 Medium | Hierarchical rectangles |
| **Waterfall** | 🆕 Medium | Cumulative bar chart variant |
| **Dual Axes** | 🆕 Medium | Multiple Y-axes support |
| **Sankey** | 🆕 Low | Flow diagram |
| **Sunburst** | 🆕 Low | Hierarchical pie |
| **Box Plot** | 🆕 Low | Statistical distribution |

---

## 3. 🆕 NEW Design Tokens to Add

### 3.1 Motion/Animation Tokens
```css
:root {
  /* Motion Duration - Using FT spacing scale pattern */
  --motion-duration-fast: 150ms;
  --motion-duration-normal: 200ms;
  --motion-duration-slow: 300ms;
  --motion-duration-slower: 450ms;
  
  /* Motion Easing - Following FT design principles */
  --motion-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --motion-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --motion-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --motion-ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 3.2 Z-Index Tokens
```css
:root {
  /* Z-Index Scale - Consistent layering */
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
  --z-index-toast: 1080;
  --z-index-max: 9999;
}
```

### 3.3 Additional Shadow Tokens
```css
:root {
  /* Extended shadows for new components */
  --shadow-xs: 0 1px 2px 0 rgba(67, 79, 100, 0.03);
  --shadow-inner: inset 0 2px 4px 0 rgba(67, 79, 100, 0.06);
  --shadow-outline: 0 0 0 3px rgba(67, 79, 100, 0.1);
  --shadow-modal: 0 25px 50px -12px rgba(67, 79, 100, 0.25);
}
```

---

## 4. Implementation Architecture

### 4.1 Component File Structure
```
src/components/
├── atoms/
│   ├── Spin/                    🆕 NEW
│   │   ├── Spin.tsx
│   │   ├── Spin.stories.tsx
│   │   └── index.ts
│   └── ... existing atoms
│
├── molecules/
│   ├── AutoComplete/            🆕 NEW
│   ├── BackTop/                 🆕 NEW
│   ├── ColorPicker/             🆕 NEW
│   ├── Empty/                   🆕 NEW
│   ├── InputNumber/             🆕 NEW
│   ├── Message/                 🆕 NEW
│   ├── Popconfirm/              🆕 NEW
│   ├── Rate/                    🆕 NEW
│   ├── Slider/                  🆕 NEW
│   ├── TimePicker/              🆕 NEW
│   └── ... existing molecules
│
├── organisms/
│   ├── Affix/                   🆕 NEW
│   ├── Anchor/                  🆕 NEW
│   ├── Calendar/                🆕 NEW
│   ├── Carousel/                🆕 NEW
│   ├── Cascader/                🆕 NEW
│   ├── Descriptions/            🆕 NEW
│   ├── FloatButton/             🆕 NEW
│   ├── Form/                    🆕 NEW
│   ├── Grid/                    🆕 NEW
│   ├── Image/                   🆕 NEW
│   ├── List/                    🆕 NEW
│   ├── Mentions/                🆕 NEW
│   ├── QRCode/                  🆕 NEW
│   ├── Result/                  🆕 NEW
│   ├── Splitter/                🆕 NEW
│   ├── Timeline/                🆕 NEW
│   ├── Tour/                    🆕 NEW
│   ├── Transfer/                🆕 NEW
│   ├── Tree/                    🆕 NEW
│   ├── TreeSelect/              🆕 NEW
│   ├── Watermark/               🆕 NEW
│   └── ... existing organisms
│
├── charts/
│   ├── GaugeChart.tsx           🆕 NEW
│   ├── FunnelChart.tsx          🆕 NEW
│   ├── HeatmapChart.tsx         🆕 NEW
│   ├── TreemapChart.tsx         🆕 NEW
│   ├── WaterfallChart.tsx       🆕 NEW
│   ├── SankeyChart.tsx          🆕 NEW
│   └── ... existing charts
```

---

## 5. Component Implementation Specifications

### 5.1 🆕 Spin Component (Loading Spinner)

```typescript
// src/components/atoms/Spin/Spin.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../Icons';

export type SpinSize = 'sm' | 'md' | 'lg';

export interface SpinProps {
  size?: SpinSize;
  tip?: string;
  spinning?: boolean;
  delay?: number;
  indicator?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

// Uses FT Design System tokens:
// - Colors: var(--primary), var(--neutral)
// - Spacing: var(--x2), var(--x4)
// - Animation: var(--motion-duration-normal)
```

### 5.2 🆕 Empty Component

```typescript
// src/components/molecules/Empty/Empty.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export interface EmptyProps {
  description?: React.ReactNode;
  image?: React.ReactNode | 'default' | 'simple';
  imageStyle?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
}

// Uses FT Design System tokens:
// - Colors: var(--tertiary), var(--border-primary)
// - Typography: body-secondary variants
// - Spacing: var(--x4), var(--x6)
```

### 5.3 🆕 InputNumber Component

```typescript
// src/components/molecules/InputNumber/InputNumber.tsx
import React from 'react';
import { cn, ComponentSize } from '../../../lib/utils';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';

export interface InputNumberProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  size?: ComponentSize;
  disabled?: boolean;
  controls?: boolean;
  stringMode?: boolean;
  onChange?: (value: number | null) => void;
  className?: string;
}

// Uses FT Design System tokens:
// - Extends Input atom styling
// - Button atoms for increment/decrement
// - Colors: var(--primary), var(--border-primary)
```

### 5.4 🆕 Slider Component

```typescript
// src/components/molecules/Slider/Slider.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

export interface SliderProps {
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  min?: number;
  max?: number;
  step?: number;
  range?: boolean;
  vertical?: boolean;
  disabled?: boolean;
  marks?: Record<number, React.ReactNode>;
  tooltip?: { open?: boolean; formatter?: (value?: number) => React.ReactNode };
  onChange?: (value: number | [number, number]) => void;
  className?: string;
}

// Uses FT Design System tokens:
// - Track: var(--border-secondary) background
// - Fill: var(--primary) or var(--neutral)
// - Handle: var(--bg-primary) with shadow
// - Border radius: var(--radius-full)
```

### 5.5 🆕 Rate Component

```typescript
// src/components/molecules/Rate/Rate.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

export interface RateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  allowHalf?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  character?: React.ReactNode;
  tooltips?: string[];
  onChange?: (value: number) => void;
  className?: string;
}

// Uses FT Design System tokens:
// - Active color: var(--warning) (gold/yellow)
// - Inactive color: var(--border-primary)
// - Hover: var(--warning-light)
```

### 5.6 🆕 TimePicker Component

```typescript
// src/components/molecules/TimePicker/TimePicker.tsx
import React from 'react';
import { cn, ComponentSize } from '../../../lib/utils';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';

export interface TimePickerProps {
  value?: Date | string;
  defaultValue?: Date | string;
  format?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  use12Hours?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (time: Date | null, timeString: string) => void;
  className?: string;
}

// Uses FT Design System tokens:
// - Extends DatePicker styling patterns
// - Colors: var(--primary), var(--neutral)
// - Spacing: var(--x2), var(--x4)
```

### 5.7 🆕 Grid Component (Row/Col)

```typescript
// src/components/organisms/Grid/Grid.tsx
import React from 'react';
import { cn } from '../../../lib/utils';

export interface RowProps {
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  wrap?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ColProps {
  span?: number; // 1-24
  offset?: number;
  push?: number;
  pull?: number;
  order?: number;
  flex?: string | number;
  xs?: number | { span?: number; offset?: number };
  sm?: number | { span?: number; offset?: number };
  md?: number | { span?: number; offset?: number };
  lg?: number | { span?: number; offset?: number };
  xl?: number | { span?: number; offset?: number };
  xxl?: number | { span?: number; offset?: number };
  children?: React.ReactNode;
  className?: string;
}

// Uses FT Design System tokens:
// - Spacing: var(--x1) to var(--x12) for gutters
// - Breakpoints aligned with FT responsive system
```

### 5.8 🆕 Form Component

```typescript
// src/components/organisms/Form/Form.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Label } from '../../atoms/Label';
import { Typography } from '../../atoms/Typography';

export interface FormProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: { span?: number; offset?: number };
  wrapperCol?: { span?: number; offset?: number };
  colon?: boolean;
  disabled?: boolean;
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: any) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface FormItemProps {
  name?: string;
  label?: React.ReactNode;
  rules?: Array<{
    required?: boolean;
    message?: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    validator?: (rule: any, value: any) => Promise<void>;
  }>;
  help?: React.ReactNode;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  children?: React.ReactNode;
  className?: string;
}

// Uses FT Design System tokens:
// - Label atom for form labels
// - Colors: var(--critical) for errors, var(--positive) for success
// - Spacing: var(--x2), var(--x4), var(--x6)
// - Typography: body-secondary variants
```

### 5.9 🆕 Message Component

```typescript
// src/components/molecules/Message/Message.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon, IconName } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';

export type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';

export interface MessageConfig {
  content: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  key?: string | number;
  onClose?: () => void;
  className?: string;
}

// API: message.info(), message.success(), message.warning(), message.error()

// Uses FT Design System tokens:
// - Background: var(--bg-primary)
// - Border: var(--border-primary)
// - Shadow: var(--shadow-lg)
// - Colors: info=var(--neutral), success=var(--positive), 
//   warning=var(--warning), error=var(--critical)
// - Z-index: var(--z-index-toast)
```

### 5.10 🆕 Result Component

```typescript
// src/components/organisms/Result/Result.tsx
import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button/Button';

export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface ResultProps {
  status?: ResultStatus;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

// Uses FT Design System tokens:
// - Success: var(--positive)
// - Error: var(--critical)
// - Warning: var(--warning)
// - Info: var(--neutral)
// - Typography: title-primary, body-primary
// - Spacing: var(--x6), var(--x8), var(--x12)
```

---

## 6. Variant Additions to Existing Components

### 6.1 Button - Add ghost, dashed variants
```typescript
// Add to Button.tsx variantStyles:
ghost: cn(
  "bg-transparent text-[var(--button-primary-bg)] border border-[var(--button-primary-bg)]",
  "hover:bg-[var(--button-primary-bg)] hover:text-[var(--button-primary-text)]"
),
dashed: cn(
  "bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-dashed border-[var(--button-secondary-border)]",
  "hover:border-[var(--primary)] hover:text-[var(--primary)]"
),
```

### 6.2 Divider - Add vertical, dashed, text variants
```typescript
// Add orientation and type props:
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed';
  children?: React.ReactNode; // Text inside divider
  textPosition?: 'left' | 'center' | 'right';
}
```

### 6.3 Progress - Add circle, dashboard variants
```typescript
// Add type prop:
export interface ProgressProps {
  type?: 'line' | 'circle' | 'dashboard';
  percent: number;
  strokeWidth?: number;
  strokeColor?: string;
  trailColor?: string;
  showInfo?: boolean;
  format?: (percent: number) => React.ReactNode;
  steps?: number;
}
```

### 6.4 Steps - Add vertical, dot, navigation variants
```typescript
// Add type and direction props:
export interface StepsProps {
  direction?: 'horizontal' | 'vertical';
  type?: 'default' | 'navigation' | 'inline';
  progressDot?: boolean | ((iconDot: any, info: any) => React.ReactNode);
}
```

---

## 7. Implementation Priority & Timeline

### Phase 1: Critical Components (Immediate) 🔴

| Component | Complexity | Est. Time |
|-----------|------------|-----------|
| 🆕 Spin | Low | 2 hours |
| 🆕 Empty | Low | 2 hours |
| 🆕 InputNumber | Medium | 4 hours |
| 🆕 Slider | Medium | 6 hours |
| 🆕 Message | Medium | 4 hours |
| 🆕 Form | High | 8 hours |
| 🆕 Grid (Row/Col) | Medium | 4 hours |
| ⚡ Button ghost/dashed | Low | 1 hour |
| ⚡ Progress circle | Medium | 4 hours |

**Total Phase 1: ~35 hours**

### Phase 2: Important Components (Week 2-3) 🟡

| Component | Complexity | Est. Time |
|-----------|------------|-----------|
| 🆕 TimePicker | High | 8 hours |
| 🆕 Rate | Low | 3 hours |
| 🆕 Result | Low | 2 hours |
| 🆕 Popconfirm | Low | 3 hours |
| 🆕 Timeline | Medium | 4 hours |
| 🆕 List | Medium | 4 hours |
| 🆕 Calendar | High | 8 hours |
| 🆕 Carousel | Medium | 6 hours |
| 🆕 Image | Medium | 4 hours |
| ⚡ Steps vertical/dot | Medium | 3 hours |
| ⚡ Divider variants | Low | 2 hours |

**Total Phase 2: ~47 hours**

### Phase 3: Advanced Components (Week 4+) 🟢

| Component | Complexity | Est. Time |
|-----------|------------|-----------|
| 🆕 Tree | High | 10 hours |
| 🆕 TreeSelect | High | 8 hours |
| 🆕 Cascader | High | 8 hours |
| 🆕 Transfer | Medium | 6 hours |
| 🆕 AutoComplete | Medium | 4 hours |
| 🆕 Mentions | Medium | 5 hours |
| 🆕 Tour | Medium | 6 hours |
| 🆕 Anchor | Medium | 4 hours |
| 🆕 Affix | Low | 3 hours |
| 🆕 FloatButton | Low | 3 hours |
| 🆕 Watermark | Medium | 4 hours |
| 🆕 QRCode | Low | 3 hours |
| 🆕 ColorPicker | High | 8 hours |
| 🆕 Splitter | Medium | 5 hours |

**Total Phase 3: ~77 hours**

### Phase 4: Charts (Ongoing) 📊

| Chart | Complexity | Est. Time |
|-------|------------|-----------|
| 🆕 Gauge | Medium | 6 hours |
| 🆕 Funnel | Medium | 6 hours |
| 🆕 Heatmap | High | 8 hours |
| 🆕 Waterfall | Medium | 5 hours |
| 🆕 Treemap | High | 8 hours |
| 🆕 Dual Axes | Medium | 4 hours |

**Total Phase 4: ~37 hours**

---

## 8. Summary Statistics

### Components to Build

| Category | New Components | Variant Additions | Total Work Items |
|----------|---------------|-------------------|------------------|
| General | 0 | 3 | 3 |
| Layout | 2 | 1 | 3 |
| Navigation | 2 | 4 | 6 |
| Data Entry | 12 | 4 | 16 |
| Data Display | 12 | 8 | 20 |
| Feedback | 6 | 4 | 10 |
| Other | 4 | 0 | 4 |
| **Total** | **38** | **24** | **62** |

### Charts to Build

| Priority | Count |
|----------|-------|
| High | 2 |
| Medium | 5 |
| Low | 3 |
| **Total** | **10** |

### Design Tokens to Add

| Category | Items |
|----------|-------|
| Motion/Animation | 8 tokens |
| Z-Index | 9 tokens |
| Shadows | 4 tokens |
| **Total** | **21 tokens** |

---

## 9. Development Guidelines

### Using FT Design System Tokens

All new components MUST use FT Design System tokens:

```typescript
// ✅ CORRECT - Use CSS variables
const styles = {
  backgroundColor: 'var(--bg-primary)',
  borderColor: 'var(--border-primary)',
  color: 'var(--primary)',
  borderRadius: 'var(--radius-md)',
  padding: 'var(--x4)',
};

// ❌ INCORRECT - Hardcoded values
const badStyles = {
  backgroundColor: '#ffffff',
  borderColor: '#ced1d7',
  color: '#434f64',
};
```

### Component Patterns

1. **Use existing atoms/molecules** when possible
2. **Forward refs** for all components
3. **TypeScript strict** mode
4. **Storybook stories** for each component
5. **Unit tests** for core functionality
6. **Theme support** (Light/Dark/Night)

---

**Document Generated**: 2024
**FT Design System Version**: 4.2.3+
**Total New Components**: 38
**Total Variant Additions**: 24
**Total New Charts**: 10
**Total New Tokens**: 21

