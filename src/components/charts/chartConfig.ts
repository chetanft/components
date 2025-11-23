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

// FT Design System Chart Colors - Main Palette
export const chartColors = {
  teal: '#42bdbd',
  indigo: '#0828f7',
  blue: '#1793e8',
  pink: '#ff0036',
  gold: '#ffbe07',
  
  // Extended palette (darker variants)
  tealDark: '#3caaaa',
  indigoDark: '#0724de',
  blueDark: '#1584d1',
  pinkDark: '#e60031',
  goldDark: '#e6a806',
};

// Default color array for datasets (cycles through main colors)
export const defaultColors = [
  chartColors.teal,
  chartColors.indigo,
  chartColors.blue,
  chartColors.pink,
  chartColors.gold,
];

// Extended color array for multi-dataset charts
export const extendedColors = [
  ...defaultColors,
  chartColors.tealDark,
  chartColors.indigoDark,
  chartColors.blueDark,
  chartColors.pinkDark,
  chartColors.goldDark,
];

// FT Design System colors for chart styling
export const ftChartColors = {
  text: {
    primary: '#434f64',
    secondary: '#5f697b',
    muted: '#838c9d',
  },
  border: {
    primary: '#ced1d7',
    secondary: '#f0f1f7',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8f8f9',
  },
  grid: '#e1e2e4',
};

// Default Chart.js configuration using FT Design System
export const defaultChartOptions = {
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

export default ChartJS;

