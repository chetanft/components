import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Colors/Base Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Foundation color scales (9-10 shades per family) that all semantic colors reference. These are the building blocks of the entire color system.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Color scale component matching Figma layout
interface ColorScaleProps {
  title: string;
  colors: { shade: string; hex: string; cssVar: string }[];
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
              <div className="font-mono text-[10px] opacity-70">{color.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Base color data
const baseColorFamilies = {
  primary: [
    { shade: '900', hex: '#1a2330', cssVar: '--primary-900' },
    { shade: '800', hex: '#2c3547', cssVar: '--primary-800' },
    { shade: '700', hex: '#434f64', cssVar: '--primary-700' },
    { shade: '600', hex: '#49556a', cssVar: '--primary-600' },
    { shade: '500', hex: '#5f697b', cssVar: '--primary-500' },
    { shade: '400', hex: '#6c7689', cssVar: '--primary-400' },
    { shade: '300', hex: '#838c9d', cssVar: '--primary-300' },
    { shade: '200', hex: '#9aa3b2', cssVar: '--primary-200' },
    { shade: '100', hex: '#c5cad3', cssVar: '--primary-100' },
  ],
  secondary: [
    { shade: '900', hex: '#1e1f22', cssVar: '--secondary-900' },
    { shade: '800', hex: '#303236', cssVar: '--secondary-800' },
    { shade: '700', hex: '#4a4d52', cssVar: '--secondary-700' },
    { shade: '600', hex: '#6c6f75', cssVar: '--secondary-600' },
    { shade: '500', hex: '#979ba2', cssVar: '--secondary-500' },
    { shade: '400', hex: '#b6bac0', cssVar: '--secondary-400' },
    { shade: '300', hex: '#ced1d7', cssVar: '--secondary-300' },
    { shade: '200', hex: '#ebecef', cssVar: '--secondary-200' },
    { shade: '100', hex: '#f0f1f7', cssVar: '--secondary-100' },
  ],
  tertiary: [
    { shade: '900', hex: '#121314', cssVar: '--tertiary-900' },
    { shade: '800', hex: '#1c1d1f', cssVar: '--tertiary-800' },
    { shade: '700', hex: '#2a2b2e', cssVar: '--tertiary-700' },
    { shade: '600', hex: '#3a3c3f', cssVar: '--tertiary-600' },
    { shade: '500', hex: '#57595d', cssVar: '--tertiary-500' },
    { shade: '400', hex: '#a9aaae', cssVar: '--tertiary-400' },
    { shade: '300', hex: '#e1e2e4', cssVar: '--tertiary-300' },
    { shade: '200', hex: '#f4f4f6', cssVar: '--tertiary-200' },
    { shade: '100', hex: '#f8f8f9', cssVar: '--tertiary-100' },
    { shade: '0', hex: '#ffffff', cssVar: '--tertiary-0' },
  ]
};

// Dark mode colors
const darkModeColors = {
  primary: [
    { shade: '900', hex: '#f8fafc', cssVar: '--primary-900' },
    { shade: '800', hex: '#f1f5f9', cssVar: '--primary-800' },
    { shade: '700', hex: '#e2e8f0', cssVar: '--primary-700' },
    { shade: '600', hex: '#cbd5e1', cssVar: '--primary-600' },
    { shade: '500', hex: '#94a3b8', cssVar: '--primary-500' },
    { shade: '400', hex: '#64748b', cssVar: '--primary-400' },
    { shade: '300', hex: '#475569', cssVar: '--primary-300' },
    { shade: '200', hex: '#334155', cssVar: '--primary-200' },
    { shade: '100', hex: '#1e293b', cssVar: '--primary-100' },
  ],
  secondary: [
    { shade: '900', hex: '#f9fafb', cssVar: '--secondary-900' },
    { shade: '800', hex: '#f3f4f6', cssVar: '--secondary-800' },
    { shade: '700', hex: '#e5e7eb', cssVar: '--secondary-700' },
    { shade: '600', hex: '#d1d5db', cssVar: '--secondary-600' },
    { shade: '500', hex: '#9ca3af', cssVar: '--secondary-500' },
    { shade: '400', hex: '#6b7280', cssVar: '--secondary-400' },
    { shade: '300', hex: '#475569', cssVar: '--secondary-300' },
    { shade: '200', hex: '#334155', cssVar: '--secondary-200' },
    { shade: '100', hex: '#1f2937', cssVar: '--secondary-100' },
  ],
  tertiary: [
    { shade: '900', hex: '#ffffff', cssVar: '--tertiary-900' },
    { shade: '800', hex: '#f9fafb', cssVar: '--tertiary-800' },
    { shade: '700', hex: '#f3f4f6', cssVar: '--tertiary-700' },
    { shade: '600', hex: '#e5e7eb', cssVar: '--tertiary-600' },
    { shade: '500', hex: '#d1d5db', cssVar: '--tertiary-500' },
    { shade: '400', hex: '#9ca3af', cssVar: '--tertiary-400' },
    { shade: '300', hex: '#64748b', cssVar: '--tertiary-300' },
    { shade: '200', hex: '#334155', cssVar: '--tertiary-200' },
    { shade: '100', hex: '#0f172a', cssVar: '--tertiary-100' },
    { shade: '0', hex: '#1e293b', cssVar: '--tertiary-0' },
  ]
};

// Night mode colors  
const nightModeColors = {
  primary: [
    { shade: '900', hex: '#ffffff', cssVar: '--primary-900' },
    { shade: '800', hex: '#f5f5f5', cssVar: '--primary-800' },
    { shade: '700', hex: '#f0f0f0', cssVar: '--primary-700' },
    { shade: '600', hex: '#e0e0e0', cssVar: '--primary-600' },
    { shade: '500', hex: '#d0d0d0', cssVar: '--primary-500' },
    { shade: '400', hex: '#a0a0a0', cssVar: '--primary-400' },
    { shade: '300', hex: '#808080', cssVar: '--primary-300' },
    { shade: '200', hex: '#404040', cssVar: '--primary-200' },
    { shade: '100', hex: '#202020', cssVar: '--primary-100' },
  ],
  secondary: [
    { shade: '900', hex: '#ffffff', cssVar: '--secondary-900' },
    { shade: '800', hex: '#f5f5f5', cssVar: '--secondary-800' },
    { shade: '700', hex: '#e0e0e0', cssVar: '--secondary-700' },
    { shade: '600', hex: '#c0c0c0', cssVar: '--secondary-600' },
    { shade: '500', hex: '#a0a0a0', cssVar: '--secondary-500' },
    { shade: '400', hex: '#808080', cssVar: '--secondary-400' },
    { shade: '300', hex: '#404040', cssVar: '--secondary-300' },
    { shade: '200', hex: '#303030', cssVar: '--secondary-200' },
    { shade: '100', hex: '#202020', cssVar: '--secondary-100' },
  ],
  tertiary: [
    { shade: '900', hex: '#ffffff', cssVar: '--tertiary-900' },
    { shade: '800', hex: '#f5f5f5', cssVar: '--tertiary-800' },
    { shade: '700', hex: '#e0e0e0', cssVar: '--tertiary-700' },
    { shade: '600', hex: '#c0c0c0', cssVar: '--tertiary-600' },
    { shade: '500', hex: '#a0a0a0', cssVar: '--tertiary-500' },
    { shade: '400', hex: '#808080', cssVar: '--tertiary-400' },
    { shade: '300', hex: '#404040', cssVar: '--tertiary-300' },
    { shade: '200', hex: '#303030', cssVar: '--tertiary-200' },
    { shade: '100', hex: '#1a1a1a', cssVar: '--tertiary-100' },
    { shade: '0', hex: '#000000', cssVar: '--tertiary-0' },
  ]
};

export const LightMode: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Base Colors - Light Mode</h1>
          <p className="text-gray-600">Foundation color scales that all semantic colors reference</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary" 
            colors={baseColorFamilies.primary}
            theme="light"
          />
          <ColorScale 
            title="Secondary (Borders)" 
            colors={baseColorFamilies.secondary}
            theme="light"
          />
          <ColorScale 
            title="Tertiary (Backgrounds)" 
            colors={baseColorFamilies.tertiary}
            theme="light"
          />
        </div>
        
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Usage</h3>
          <p className="text-blue-800 text-sm">
            These base colors are the foundation. Semantic colors like <code className="bg-blue-100 px-1 rounded">--primary</code> reference these scales using <code className="bg-blue-100 px-1 rounded">var(--primary-700)</code>
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
          <h1 className="text-3xl font-bold text-white mb-2">Base Colors - Dark Mode</h1>
          <p className="text-slate-300">Foundation color scales adapted for dark theme</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary" 
            colors={darkModeColors.primary}
            theme="dark"
          />
          <ColorScale 
            title="Secondary (Borders)" 
            colors={darkModeColors.secondary}
            theme="dark"
          />
          <ColorScale 
            title="Tertiary (Backgrounds)" 
            colors={darkModeColors.tertiary}
            theme="dark"
          />
        </div>
        
        <div className="mt-12 p-4 bg-slate-800 border border-slate-700 rounded-lg">
          <h3 className="font-semibold text-slate-100 mb-2">Dark Mode Adaptation</h3>
          <p className="text-slate-300 text-sm">
            Same CSS variables, different values. <code className="bg-slate-700 px-1 rounded">--primary-900</code> becomes light (#f8fafc) for text readability.
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
          <h1 className="text-3xl font-bold text-white mb-2">Base Colors - Night Mode</h1>
          <p className="text-gray-300">High contrast foundation colors for accessibility</p>
        </div>
        
        <div className="space-y-6">
          <ColorScale 
            title="Primary" 
            colors={nightModeColors.primary}
            theme="night"
          />
          <ColorScale 
            title="Secondary (Borders)" 
            colors={nightModeColors.secondary}
            theme="night"
          />
          <ColorScale 
            title="Tertiary (Backgrounds)" 
            colors={nightModeColors.tertiary}
            theme="night"
          />
        </div>
        
        <div className="mt-12 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-100 mb-2">High Contrast Mode</h3>
          <p className="text-gray-300 text-sm">
            Maximum contrast for accessibility. True black backgrounds with pure white text elements.
          </p>
        </div>
      </div>
    </div>
  ),
};
