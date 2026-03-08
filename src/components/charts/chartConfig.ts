import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Legend,
  Tooltip,
  Title
);

/**
 * Resolve a CSS custom property to its computed value at runtime.
 * Falls back to the provided fallback string when running outside a browser
 * (e.g. SSR / tests) or when the variable is not defined.
 */
export function getCssVar(name: string, fallback: string): string {
  if (typeof document === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

// FT Design System Chart Colors - Main Palette
// Uses getters for theme reactivity.
export const chartColors = {
  get teal() { return getCssVar('--primary-700', '#434f64'); },
  get indigo() { return getCssVar('--neutral-dark', '#006dd3'); },
  get blue() { return getCssVar('--neutral', '#1890ff'); },
  get pink() { return getCssVar('--critical', '#ff3532'); },
  get gold() { return getCssVar('--warning', '#ff6c19'); },

  // Extended palette (darker variants)
  get tealDark() { return getCssVar('--primary-500', '#5f697b'); },
  get indigoDark() { return getCssVar('--neutral-900', '#002966'); },
  get blueDark() { return getCssVar('--neutral-dark', '#006dd3'); },
  get pinkDark() { return getCssVar('--critical-dark', '#b70100'); },
  get goldDark() { return getCssVar('--warning-dark', '#dd6a00'); },
};

// Default color array for datasets (cycles through main colors)
// Function so colors resolve fresh per render.
export function getDefaultColors(): string[] {
  return [
    chartColors.teal,
    chartColors.indigo,
    chartColors.blue,
    chartColors.pink,
    chartColors.gold,
  ];
}
/** @deprecated Use getDefaultColors() for theme-reactive colors */
export const defaultColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    const arr = getDefaultColors();
    return Reflect.get(arr, prop, receiver);
  },
});

// Extended color array for multi-dataset charts
export function getExtendedColors(): string[] {
  return [
    ...getDefaultColors(),
    chartColors.tealDark,
    chartColors.indigoDark,
    chartColors.blueDark,
    chartColors.pinkDark,
    chartColors.goldDark,
  ];
}
/** @deprecated Use getExtendedColors() for theme-reactive colors */
export const extendedColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    const arr = getExtendedColors();
    return Reflect.get(arr, prop, receiver);
  },
});

// Status colors for semantic data visualization
export const statusColors = {
  get positive() { return getCssVar('--positive', '#00c638'); },
  get warning() { return getCssVar('--warning', '#ff6c19'); },
  get critical() { return getCssVar('--critical', '#ff3533'); },
  get neutral() { return getCssVar('--neutral', '#1890ff'); },
};

export function getStatusColorsArray(): string[] {
  return [
    statusColors.positive,
    statusColors.warning,
    statusColors.critical,
    statusColors.neutral,
  ];
}
export const statusColorsArray = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getStatusColorsArray(), prop, receiver);
  },
});

// Monochrome color scales (primary grays)
export function getMonochromeColors(): string[] {
  return [
    getCssVar('--primary-900', '#1a2330'),
    getCssVar('--primary', '#434f64'),
    getCssVar('--secondary', '#5f697b'),
    getCssVar('--tertiary', '#838c9d'),
    getCssVar('--primary-100', '#c5cad3'),
  ];
}
export const monochromeColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getMonochromeColors(), prop, receiver);
  },
});

// Neutral (blue) scale colors
export function getNeutralScaleColors(): string[] {
  return [
    getCssVar('--neutral-900', '#002966'),
    getCssVar('--neutral-dark', '#006dd3'),
    getCssVar('--neutral', '#1890ff'),
    getCssVar('--neutral-300', '#80c1ff'),
    getCssVar('--neutral-light', '#ecf6ff'),
  ];
}
export const neutralScaleColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getNeutralScaleColors(), prop, receiver);
  },
});

// Positive (green) scale colors
export function getPositiveScaleColors(): string[] {
  return [
    getCssVar('--positive-900', '#004d26'),
    getCssVar('--positive-dark', '#00753d'),
    getCssVar('--positive', '#00c637'),
    getCssVar('--positive-300', '#4dff88'),
    getCssVar('--positive-light', '#deffe7'),
  ];
}
export const positiveScaleColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getPositiveScaleColors(), prop, receiver);
  },
});

// Warning (orange) scale colors
export function getWarningScaleColors(): string[] {
  return [
    getCssVar('--warning-900', '#7a2f00'),
    getCssVar('--warning-dark', '#dd6a00'),
    getCssVar('--warning', '#ff6c19'),
    getCssVar('--warning-300', '#ffb366'),
    getCssVar('--warning-light', '#ffedbc'),
  ];
}
export const warningScaleColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getWarningScaleColors(), prop, receiver);
  },
});

// Danger (red) scale colors
export function getDangerScaleColors(): string[] {
  return [
    getCssVar('--danger-900', '#800000'),
    getCssVar('--critical-dark', '#b70100'),
    getCssVar('--critical', '#ff3532'),
    getCssVar('--danger-300', '#ff9999'),
    getCssVar('--critical-light', '#ffeafa'),
  ];
}
export const dangerScaleColors = new Proxy([] as string[], {
  get(target, prop, receiver) {
    return Reflect.get(getDangerScaleColors(), prop, receiver);
  },
});

// FT Design System colors for chart styling
// Uses getter functions so CSS variables are resolved fresh on each access,
// enabling proper theme reactivity (dark/night mode switches).
export const ftChartColors = {
  get text() {
    return {
      primary: getCssVar('--primary', '#434f64'),
      secondary: getCssVar('--secondary', '#5f697b'),
      muted: getCssVar('--tertiary', '#838c9d'),
    };
  },
  get border() {
    return {
      primary: getCssVar('--border-primary', '#ced1d7'),
      secondary: getCssVar('--border-secondary', '#f0f1f7'),
    };
  },
  get background() {
    return {
      primary: getCssVar('--bg-primary', '#ffffff'),
      secondary: getCssVar('--bg-secondary', '#f8f8f9'),
    };
  },
  get grid() {
    return getCssVar('--border-secondary', '#e1e2e4');
  },
};

// Default Chart.js configuration using FT Design System
// Function so colors are resolved fresh each call (theme-reactive).
export function getDefaultChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 14,
            weight: 400,
          },
          color: ftChartColors.text.primary,
          padding: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: ftChartColors.background.primary,
        titleColor: ftChartColors.text.primary,
        bodyColor: ftChartColors.text.secondary,
        borderColor: ftChartColors.border.primary,
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 14,
          weight: 600,
        },
        bodyFont: {
          family: 'Inter, system-ui, sans-serif',
          size: 14,
          weight: 400,
        },
        boxPadding: 6,
      },
      title: {
        display: false,
        font: {
          family: 'Inter, system-ui, sans-serif',
          size: 16,
          weight: 600,
        },
        color: ftChartColors.text.primary,
        padding: {
          top: 0,
          bottom: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: ftChartColors.grid,
          drawBorder: false,
        },
        ticks: {
          color: ftChartColors.text.secondary,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 400,
          },
          padding: 8,
        },
        border: {
          color: ftChartColors.border.primary,
        },
      },
      y: {
        grid: {
          color: ftChartColors.grid,
          drawBorder: false,
        },
        ticks: {
          color: ftChartColors.text.secondary,
          font: {
            family: 'Inter, system-ui, sans-serif',
            size: 12,
            weight: 400,
          },
          padding: 8,
        },
        border: {
          color: ftChartColors.border.primary,
        },
      },
    },
  };
}

// Backward-compatible alias — evaluated lazily via getter so each
// property access produces a fresh options object with current theme colors.
export const defaultChartOptions = new Proxy({} as ReturnType<typeof getDefaultChartOptions>, {
  get(_target, prop, receiver) {
    return Reflect.get(getDefaultChartOptions(), prop, receiver);
  },
});

export default ChartJS;
