# Chart Components Implementation Plan

## Overview
Build comprehensive Chart.js components using FT Design System tokens and create a dedicated Charts showcase page.

## Phase 1: Dependencies & Setup

### 1.1 Install Required Packages
- **chart.js** (v4.x) - Core charting library
- **react-chartjs-2** (v5.x) - React wrapper for Chart.js
- **chartjs-plugin-datalabels** (optional) - For data labels on charts

### 1.2 Chart.js Configuration
- Register required Chart.js components (Line, Bar, Pie, Doughnut, Radar, PolarArea, Scatter, Bubble)
- Configure Chart.js defaults to use FT Design System colors
- Set up responsive behavior and maintain aspect ratio

## Phase 2: Design System Integration

### 2.1 Color Palette Mapping
Map FT Design System colors to Chart.js - **Main Chart Colors**:
- **Teal**: `#42bdbd` (teal-500)
- **Indigo**: `#0828f7` (indigo-500)
- **Blue**: `#1793e8` (blue-500) or `#1890ff` (neutral-500)
- **Pink**: `#ff0036` (pink-500)
- **Gold**: `#ffbe07` (gold-500)

**Supporting Colors**:
- **Text Primary**: `#434f64` (primary-700)
- **Text Secondary**: `#5f697b` (primary-500)
- **Text Muted**: `#838c9d` (primary-300)
- **Border**: `#ced1d7` (secondary-300)
- **Grid Lines**: `#e1e2e4` (tertiary-300)
- **Background**: `#ffffff` (tertiary-0) / `#f8f8f9` (tertiary-100)

### 2.2 Typography
- Font Family: Inter (system default)
- Font Sizes: 12px (axis labels), 14px (legend), 16px (title)
- Font Weights: 400 (regular), 500 (medium), 600 (semibold)

### 2.3 Spacing & Sizing
- Chart container padding: 16px (--x4)
- Chart spacing between elements: 24px (--x6)
- Border radius: 8px (--component-border-radius)

## Phase 3: Chart Component Architecture

### 3.1 Base Chart Component
Create a base wrapper component that:
- Applies FT Design System styling
- Handles responsive behavior
- Provides consistent configuration
- Exports common props (title, height, responsive, etc.)

### 3.2 Individual Chart Components
Build the following chart types:

#### 3.2.1 Line Chart (`LineChart`)
- Single/multi-line support
- Area fill option
- Point markers
- Grid lines using FT colors

#### 3.2.2 Bar Chart (`BarChart`)
- Vertical/horizontal orientation
- Stacked option
- Grouped bars
- Grid lines

#### 3.2.3 Pie Chart (`PieChart`)
- Donut option (inner radius)
- Legend positioning
- Percentage labels

#### 3.2.4 Doughnut Chart (`DoughnutChart`)
- Customizable inner radius
- Center label support
- Legend

#### 3.2.5 Radar Chart (`RadarChart`)
- Multi-dataset support
- Grid lines
- Point markers

#### 3.2.6 Polar Area Chart (`PolarAreaChart`)
- Segment colors
- Legend

#### 3.2.7 Scatter Chart (`ScatterChart`)
- Point customization
- Trend lines
- Grid

#### 3.2.8 Bubble Chart (`BubbleChart`)
- Size-based bubbles
- Color coding
- Legend

### 3.3 Component Props Structure
Each chart component should accept:
```typescript
interface BaseChartProps {
  data: ChartData;
  title?: string;
  height?: number;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  className?: string;
  options?: ChartOptions;
}
```

## Phase 4: Component Implementation

### 4.1 File Structure
```
src/components/charts/
├── index.ts                    # Export all chart components
├── BaseChart.tsx              # Base wrapper component
├── LineChart.tsx
├── BarChart.tsx
├── PieChart.tsx
├── DoughnutChart.tsx
├── RadarChart.tsx
├── PolarAreaChart.tsx
├── ScatterChart.tsx
├── BubbleChart.tsx
└── chartConfig.ts             # Chart.js default configuration
```

### 4.2 Chart Configuration
Create `chartConfig.ts` with:
- **Default colors array** using main chart palette:
  ```typescript
  const chartColors = [
    '#42bdbd', // Teal
    '#0828f7', // Indigo
    '#1793e8', // Blue
    '#ff0036', // Pink
    '#ffbe07', // Gold
  ]
  ```
- Typography settings (Inter font, FT Design System sizes)
- Grid/axis styling (using FT border colors)
- Legend configuration (using FT text colors)
- Tooltip styling (using FT background and text colors)
- Animation settings (smooth transitions)

## Phase 5: Showcase Page Implementation

### 5.1 Create Charts Page
Location: `showcase/src/pages/Charts.tsx`

Features:
- Grid layout displaying all chart types
- Each chart with title and description
- Responsive design
- Sample data for each chart type
- Code examples (optional)

### 5.2 Update Navigation
- Add "Charts" link to Header component
- Update routing in App.tsx

### 5.3 Page Layout
- Hero section with title and description
- Chart grid (2-3 columns on desktop, 1 on mobile)
- Each chart in a Card component (if available) or styled container
- Consistent spacing using FT Design System tokens

## Phase 6: Sample Data & Examples

### 6.1 Create Sample Datasets
- Sales data (Line/Bar charts)
- Category distribution (Pie/Doughnut)
- Performance metrics (Radar)
- Correlation data (Scatter)
- Multi-dimensional data (Bubble)

### 6.2 Chart Variants
Show different configurations:
- Basic charts
- Stacked charts
- Multi-dataset charts
- Custom styled charts

## Phase 7: Export & Integration

### 7.1 Export from Main Library
- Add chart components to `src/index.ts`
- Ensure proper TypeScript types
- Include in package exports

### 7.2 Documentation
- Add JSDoc comments to all components
- Document props and usage examples
- Include in Storybook (optional)

## Implementation Checklist

- [ ] Install Chart.js dependencies
- [ ] Create chart configuration file with FT Design System colors
- [ ] Build BaseChart wrapper component
- [ ] Implement LineChart component
- [ ] Implement BarChart component
- [ ] Implement PieChart component
- [ ] Implement DoughnutChart component
- [ ] Implement RadarChart component
- [ ] Implement PolarAreaChart component
- [ ] Implement ScatterChart component
- [ ] Implement BubbleChart component
- [ ] Create Charts showcase page
- [ ] Add routing for Charts page
- [ ] Update Header navigation
- [ ] Create sample datasets
- [ ] Test all chart types
- [ ] Ensure responsive behavior
- [ ] Verify FT Design System color usage
- [ ] Export components from main library

## Technical Considerations

### Chart.js Version
- Use Chart.js v4.x (latest stable)
- Use react-chartjs-2 v5.x (compatible with Chart.js v4)

### Performance
- Lazy load Chart.js if needed
- Optimize re-renders with React.memo where appropriate
- Use proper key props for chart updates

### Accessibility
- Add ARIA labels
- Ensure color contrast meets WCAG standards
- Support keyboard navigation where applicable

### Responsive Design
- Charts should scale with container
- Maintain aspect ratio or allow override
- Mobile-friendly touch interactions

## Color Scheme Details

### Main Chart Color Palette (for datasets)
1. `#42bdbd` - **Teal** (teal-500)
2. `#0828f7` - **Indigo** (indigo-500)
3. `#1793e8` - **Blue** (blue-500)
4. `#ff0036` - **Pink** (pink-500)
5. `#ffbe07` - **Gold** (gold-500)

### Extended Palette (for multi-dataset charts)
6. `#3caaaa` - Teal-600 (darker teal)
7. `#0724de` - Indigo-600 (darker indigo)
8. `#1584d1` - Blue-600 (darker blue)
9. `#e60031` - Pink-600 (darker pink)
10. `#e6a806` - Gold-600 (darker gold)

### Background Colors
- Chart background: `#ffffff` (white)
- Page background: `#f8f8f9` (tertiary-100)
- Grid lines: `#e1e2e4` (tertiary-300)
- Border: `#ced1d7` (secondary-300)

### Chart Color Variants (for transparency/opacity)
- Teal with opacity: `rgba(66, 189, 189, 0.8)` for fills
- Indigo with opacity: `rgba(8, 40, 247, 0.8)` for fills
- Blue with opacity: `rgba(23, 147, 232, 0.8)` for fills
- Pink with opacity: `rgba(255, 0, 54, 0.8)` for fills
- Gold with opacity: `rgba(255, 190, 7, 0.8)` for fills

### Text Colors
- Title: `#434f64` (primary-700)
- Labels: `#5f697b` (primary-500)
- Muted text: `#838c9d` (primary-300)

## Next Steps
1. Review and approve plan
2. Begin Phase 1: Install dependencies
3. Proceed with implementation phases sequentially

