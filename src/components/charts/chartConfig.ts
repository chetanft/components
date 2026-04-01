import {
  Chart as ChartJS,
  ChartType,
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
  Plugin,
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

export function getCssNumberVar(name: string, fallback: number): number {
  const value = getCssVar(name, String(fallback));
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

// FT Design System Chart Colors - Main Palette
// Uses dedicated chart color families (teal, indigo, blue, pink) instead of
// semantic colors (primary, neutral, critical) to keep data visualization
// independent from UI theme colors.
export const chartColors = {
  get teal() { return getCssVar('--teal-500', '#42BDBD'); },
  get indigo() { return getCssVar('--indigo-500', '#0828F7'); },
  get blue() { return getCssVar('--blue-400', '#37A2EB'); },
  get pink() { return getCssVar('--pink-300', '#FF6384'); },
  get gold() { return getCssVar('--warning', '#ff6c19'); },

  // Extended palette (darker variants for secondary series)
  get tealDark() { return getCssVar('--teal-700', '#2E8484'); },
  get indigoDark() { return getCssVar('--indigo-300', '#6377FA'); },
  get blueDark() { return getCssVar('--blue-600', '#1584D1'); },
  get pinkDark() { return getCssVar('--pink-500', '#FF0036'); },
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

export function getChartGlowTokens() {
  return {
    blurSm: getCssVar('--chart-glow-blur-sm', '8px'),
    blurMd: getCssVar('--chart-glow-blur-md', '16px'),
    blurLg: getCssVar('--chart-glow-blur-lg', '24px'),
    alphaPrimary: getCssNumberVar('--chart-glow-alpha-primary', 0.32),
    alphaSecondary: getCssNumberVar('--chart-glow-alpha-secondary', 0.18),
  };
}

export function toRgba(color: string | undefined | null, alpha: number): string {
  if (!color) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  if (color.startsWith('#')) {
    const normalized = color.replace('#', '');
    const full = normalized.length === 3
      ? normalized.split('').map((part) => `${part}${part}`).join('')
      : normalized;
    if (/^[0-9a-fA-F]{6}$/.test(full)) {
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  const match = color.match(/^rgba?\(([^)]+)\)$/);
  if (match) {
    const parts = match[1].split(',').map((part) => part.trim());
    if (parts.length >= 3) {
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
    }
  }

  return color;
}

function getGlowBlur(size: string): number {
  const parsed = Number.parseFloat(size);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function createLineGlowPlugin<TType extends ChartType = 'line'>(
  id = 'ftLineGlow'
): Plugin<TType> {
  return {
    id,
    beforeDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      if (!dataset || args.index > 1) return;

      const borderColor = dataset.borderColor;
      const baseColor = typeof borderColor === 'string'
        ? borderColor
        : Array.isArray(borderColor)
          ? borderColor[0]
          : chartColors.teal;
      const glow = getChartGlowTokens();
      const ctx = chart.ctx;

      ctx.save();
      ctx.shadowColor = toRgba(baseColor, args.index === 0 ? glow.alphaPrimary : glow.alphaSecondary);
      ctx.shadowBlur = getGlowBlur(args.index === 0 ? glow.blurLg : glow.blurSm);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart) {
      chart.ctx.restore();
    },
  };
}

export function createArcGlowPlugin<TType extends ChartType = 'doughnut'>(
  id = 'ftArcGlow',
  targetDataIndex = 0
): Plugin<TType> {
  return {
    id,
    afterDatasetDraw(chart, args) {
      const meta = chart.getDatasetMeta(args.index);
      const arc = meta.data?.[targetDataIndex] as { options?: { backgroundColor?: string | string[] }; draw?: (ctx: CanvasRenderingContext2D) => void } | undefined;
      if (!arc?.draw) return;

      const backgroundColor = arc.options?.backgroundColor;
      const baseColor = typeof backgroundColor === 'string'
        ? backgroundColor
        : Array.isArray(backgroundColor)
          ? backgroundColor[0]
          : chartColors.teal;
      const glow = getChartGlowTokens();
      const ctx = chart.ctx;

      ctx.save();
      ctx.shadowColor = toRgba(baseColor, glow.alphaPrimary);
      ctx.shadowBlur = getGlowBlur(glow.blurLg);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      arc.draw(ctx);
      ctx.restore();
    },
  };
}

export function createBarGlowPlugin<TType extends ChartType = 'bar'>(
  id = 'ftBarGlow'
): Plugin<TType> {
  return {
    id,
    beforeDatasetDraw(chart, args) {
      if (args.index > 0) return;

      const dataset = chart.data.datasets[args.index];
      const backgroundColor = dataset?.backgroundColor;
      const baseColor = typeof backgroundColor === 'string'
        ? backgroundColor
        : Array.isArray(backgroundColor)
          ? backgroundColor[0]
          : chartColors.teal;
      const glow = getChartGlowTokens();
      const ctx = chart.ctx;

      ctx.save();
      ctx.shadowColor = toRgba(baseColor, glow.alphaSecondary);
      ctx.shadowBlur = getGlowBlur(glow.blurMd);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart, args) {
      if (args.index > 0) return;
      chart.ctx.restore();
    },
  };
}

export function createScatterGlowPlugin<TType extends ChartType = 'scatter'>(
  id = 'ftScatterGlow'
): Plugin<TType> {
  return {
    id,
    beforeDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      if (!(dataset as { ftGlow?: boolean } | undefined)?.ftGlow) return;

      const backgroundColor = dataset?.backgroundColor;
      const baseColor = typeof backgroundColor === 'string'
        ? backgroundColor
        : Array.isArray(backgroundColor)
          ? backgroundColor[0]
          : chartColors.teal;
      const glow = getChartGlowTokens();
      const ctx = chart.ctx;

      ctx.save();
      ctx.shadowColor = toRgba(baseColor, glow.alphaPrimary);
      ctx.shadowBlur = getGlowBlur(glow.blurLg);
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    afterDatasetDraw(chart, args) {
      const dataset = chart.data.datasets[args.index];
      if (!(dataset as { ftGlow?: boolean } | undefined)?.ftGlow) return;
      chart.ctx.restore();
    },
  };
}

export function createPolarAreaGlowPlugin<TType extends ChartType = 'polarArea'>(
  id = 'ftPolarGlow'
): Plugin<TType> {
  return {
    id,
    afterDatasetDraw(chart, args) {
      const meta = chart.getDatasetMeta(args.index);
      const glow = getChartGlowTokens();
      const ctx = chart.ctx;

      meta.data.forEach((arc) => {
        const polarArc = arc as { options?: { backgroundColor?: string | string[] }; draw?: (ctx: CanvasRenderingContext2D) => void };
        if (!polarArc.draw) return;

        const backgroundColor = polarArc.options?.backgroundColor;
        const baseColor = typeof backgroundColor === 'string'
          ? backgroundColor
          : Array.isArray(backgroundColor)
            ? backgroundColor[0]
            : chartColors.teal;

        ctx.save();
        ctx.shadowColor = toRgba(baseColor, glow.alphaSecondary);
        ctx.shadowBlur = getGlowBlur(glow.blurMd);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        polarArc.draw(ctx);
        ctx.restore();
      });
    },
  };
}

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
