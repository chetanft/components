import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Colors/Color System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete color system showing primary, secondary, and semantic colors organized by theme mode.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color scale component matching the format
interface ColorScaleProps {
  title: string;
  colors: { shade: string; hex: string; cssVar: string; description?: string }[];
  theme: 'light' | 'dark' | 'night';
}

const ColorScale: React.FC<ColorScaleProps> = ({ title, colors, theme }) => {
  const themeStyles = {
    light: 'bg-white',
    dark: 'bg-slate-800',
    night: 'bg-black'
  };

  const textStyles = {
    light: 'text-gray-900',
    dark: 'text-white',
    night: 'text-white'
  };

  return (
    <div className={`p-6 ${themeStyles[theme]} ${textStyles[theme]}`}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex items-center gap-1">
        {colors.map((color, index) => (
          <div key={color.shade} className="flex flex-col items-center">
            {/* Color swatch */}
            <div 
              className="w-12 h-12 border border-gray-300 flex items-center justify-center"
              style={{ backgroundColor: color.hex }}
              title={`${color.cssVar}: ${color.hex}`}
            >
              {/* Circle for certain shades like in Figma */}
              {(index === 2 || index === 4 || index === 6) && (
                <div 
                  className="w-6 h-6 rounded-full border-2"
                  style={{ 
                    backgroundColor: theme === 'light' ? 'white' : 'transparent',
                    borderColor: theme === 'light' ? color.hex : 'white'
                  }}
                />
              )}
            </div>
            {/* Shade label and hex value */}
            <div className="text-xs mt-1 text-center">
              <div className="font-mono">{color.shade}</div>
              <div className="font-mono text-[calc(var(--spacing-x2)+var(--spacing-x1)/2)] opacity-70">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>
      {colors[0].description && (
        <div className="text-xs text-gray-500 mt-3">
          {colors[0].description}
        </div>
      )}
    </div>
  );
};

// Selected colors from base color scales - only the ones actually used
const selectedColors = {
  primary: {
    light: [
      { shade: 'Primary', hex: '#434f64', cssVar: '--primary', description: 'Main primary color (primary-700)' },
    ],
    dark: [
      { shade: 'Primary', hex: '#e2e8f0', cssVar: '--primary', description: 'Main primary color (primary-700)' },
    ],
    night: [
      { shade: 'Primary', hex: '#f0f0f0', cssVar: '--primary', description: 'Main primary color (primary-700)' },
    ]
  },
  secondary: {
    light: [
      { shade: 'Secondary', hex: '#5f697b', cssVar: '--secondary', description: 'Secondary color (primary-500)' },
    ],
    dark: [
      { shade: 'Secondary', hex: '#94a3b8', cssVar: '--secondary', description: 'Secondary color (primary-500)' },
    ],
    night: [
      { shade: 'Secondary', hex: '#d0d0d0', cssVar: '--secondary', description: 'Secondary color (primary-500)' },
    ]
  },
  tertiary: {
    light: [
      { shade: 'Tertiary', hex: '#838c9d', cssVar: '--tertiary', description: 'Tertiary color (primary-300)' },
    ],
    dark: [
      { shade: 'Tertiary', hex: '#64748b', cssVar: '--tertiary', description: 'Tertiary color (tertiary-300)' },
    ],
    night: [
      { shade: 'Tertiary', hex: '#404040', cssVar: '--tertiary', description: 'Tertiary color (tertiary-300)' },
    ]
  },
  borders: {
    light: [
      { shade: 'Border Primary', hex: '#ced1d7', cssVar: '--border-primary', description: 'Primary borders (secondary-300)' },
      { shade: 'Border Secondary', hex: '#f0f1f7', cssVar: '--border-secondary', description: 'Secondary borders (secondary-100)' },
    ],
    dark: [
      { shade: 'Border Primary', hex: '#475569', cssVar: '--border-primary', description: 'Primary borders (primary-300)' },
      { shade: 'Border Secondary', hex: '#334155', cssVar: '--border-secondary', description: 'Secondary borders (primary-200)' },
    ],
    night: [
      { shade: 'Border Primary', hex: '#404040', cssVar: '--border-primary', description: 'Primary borders (secondary-300)' },
      { shade: 'Border Secondary', hex: '#303030', cssVar: '--border-secondary', description: 'Secondary borders (secondary-200)' },
    ]
  },
  backgrounds: {
    light: [
      { shade: 'BG Primary', hex: '#ffffff', cssVar: '--bg-primary', description: 'Primary background (tertiary-0)' },
      { shade: 'BG Secondary', hex: '#f8f8f9', cssVar: '--bg-secondary', description: 'Secondary background (tertiary-100)' },
    ],
    dark: [
      { shade: 'BG Primary', hex: '#1e293b', cssVar: '--bg-primary', description: 'Primary background (tertiary-0)' },
      { shade: 'BG Secondary', hex: '#0f172a', cssVar: '--bg-secondary', description: 'Secondary background (tertiary-100)' },
    ],
    night: [
      { shade: 'BG Primary', hex: '#000000', cssVar: '--bg-primary', description: 'Primary background (tertiary-0)' },
      { shade: 'BG Secondary', hex: '#1a1a1a', cssVar: '--bg-secondary', description: 'Secondary background (tertiary-100)' },
    ]
  }
};

// Semantic status colors - also selected from base colors
const statusColors = {
  light: [
    { shade: 'Neutral', hex: '#1890ff', cssVar: '--neutral', description: 'Information (neutral-500)' },
    { shade: 'Positive', hex: '#00c637', cssVar: '--positive', description: 'Success (positive-500)' },
    { shade: 'Warning', hex: '#ff6c19', cssVar: '--warning', description: 'Warning (warning-500)' },
    { shade: 'Critical', hex: '#ff3532', cssVar: '--critical', description: 'Error (danger-500)' },
  ],
  dark: [
    { shade: 'Neutral', hex: '#8fc7ff', cssVar: '--neutral', description: 'Information (neutral-500)' },
    { shade: 'Positive', hex: '#7ad889', cssVar: '--positive', description: 'Success (positive-500)' },
    { shade: 'Warning', hex: '#ffc27a', cssVar: '--warning', description: 'Warning (warning-500)' },
    { shade: 'Critical', hex: '#ff9b9b', cssVar: '--critical', description: 'Error (danger-500)' },
  ],
  night: [
    { shade: 'Neutral', hex: '#94caff', cssVar: '--neutral', description: 'Information (neutral-500)' },
    { shade: 'Positive', hex: '#87d892', cssVar: '--positive', description: 'Success (positive-500)' },
    { shade: 'Warning', hex: '#ffc991', cssVar: '--warning', description: 'Warning (warning-500)' },
    { shade: 'Critical', hex: '#ffa0a0', cssVar: '--critical', description: 'Error (danger-500)' },
  ]
};

export const LightMode: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Color System - Light Mode</h1>
          <p className="text-gray-600">Selected colors from base color scales that components actually use</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary Colors" 
            colors={selectedColors.primary.light}
            theme="light"
          />
          <ColorScale 
            title="Secondary Colors" 
            colors={selectedColors.secondary.light}
            theme="light"
          />
          <ColorScale 
            title="Tertiary Colors" 
            colors={selectedColors.tertiary.light}
            theme="light"
          />
          <ColorScale 
            title="Border Colors" 
            colors={selectedColors.borders.light}
            theme="light"
          />
          <ColorScale 
            title="Background Colors" 
            colors={selectedColors.backgrounds.light}
            theme="light"
          />
          <ColorScale 
            title="Semantic Status Colors" 
            colors={statusColors.light}
            theme="light"
          />
        </div>
        
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Selected from Base Colors</h3>
          <p className="text-blue-800 text-sm">
            These are the specific colors selected from the base color scales. Components use these via CSS variables: <code className="bg-blue-100 px-1 rounded">color: var(--primary)</code>
          </p>
        </div>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div className="p-8 bg-slate-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Color System - Dark Mode</h1>
          <p className="text-slate-300">Selected colors adapted for dark theme</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary Colors" 
            colors={selectedColors.primary.dark}
            theme="dark"
          />
          <ColorScale 
            title="Secondary Colors" 
            colors={selectedColors.secondary.dark}
            theme="dark"
          />
          <ColorScale 
            title="Tertiary Colors" 
            colors={selectedColors.tertiary.dark}
            theme="dark"
          />
          <ColorScale 
            title="Border Colors" 
            colors={selectedColors.borders.dark}
            theme="dark"
          />
          <ColorScale 
            title="Background Colors" 
            colors={selectedColors.backgrounds.dark}
            theme="dark"
          />
          <ColorScale 
            title="Semantic Status Colors" 
            colors={statusColors.dark}
            theme="dark"
          />
        </div>
        
        <div className="mt-12 p-4 bg-slate-800 border border-slate-700 rounded-lg">
          <h3 className="font-semibold text-slate-100 mb-2">Automatic Theme Switching</h3>
          <p className="text-slate-300 text-sm">
            Same CSS variables, different values. Colors automatically adapt when <code className="bg-slate-700 px-1 rounded">.dark</code> class is applied.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const NightMode: Story = {
  render: () => (
    <div className="p-8 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Color System - Night Mode</h1>
          <p className="text-gray-300">High contrast selected colors for accessibility</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary Colors" 
            colors={selectedColors.primary.night}
            theme="night"
          />
          <ColorScale 
            title="Secondary Colors" 
            colors={selectedColors.secondary.night}
            theme="night"
          />
          <ColorScale 
            title="Tertiary Colors" 
            colors={selectedColors.tertiary.night}
            theme="night"
          />
          <ColorScale 
            title="Border Colors" 
            colors={selectedColors.borders.night}
            theme="night"
          />
          <ColorScale 
            title="Background Colors" 
            colors={selectedColors.backgrounds.night}
            theme="night"
          />
          <ColorScale 
            title="Semantic Status Colors" 
            colors={statusColors.night}
            theme="night"
          />
        </div>
        
        <div className="mt-12 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-100 mb-2">Accessibility Focus</h3>
          <p className="text-gray-300 text-sm">
            Night mode provides maximum contrast ratios for users with visual impairments. True black backgrounds with pure white text.
          </p>
        </div>
      </div>
    </div>
  ),
};
