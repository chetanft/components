import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Typography } from "../Typography";

// Optional theme hook that doesn't throw if no provider
const useOptionalTheme = () => {
  try {
    const { useTheme } = require("../../../contexts/ThemeContext");
    return useTheme();
  } catch (error) {
    // Fallback when ThemeProvider is not available (like in Storybook)
    return { theme: 'light' };
  }
};

interface ColorSwatchProps {
  colorName: string;
  colorVar: string;
  colorValue: string;
  textColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  colorName, 
  colorVar, 
  colorValue,
  textColor = "text-black" 
}) => {
  return (
    <div className="flex flex-col">
      <div 
        className="h-20 w-20 rounded-md mb-2 border border-gray-200"
        style={{ backgroundColor: colorValue }}
      ></div>
      <div className="space-y-1">
        <Typography variant="body-secondary-medium">{colorName}</Typography>
        <Typography variant="body-secondary-regular" className="text-gray-600">{colorVar}</Typography>
        <Typography variant="body-secondary-regular" className="font-mono">{colorValue}</Typography>
      </div>
    </div>
  );
};

interface ThemeColorSwatchProps {
  colorName: string;
  colorVar: string;
  lightValue: string;
  darkValue: string;
  nightValue: string;
}

const ThemeColorSwatch: React.FC<ThemeColorSwatchProps> = ({ 
  colorName, 
  colorVar, 
  lightValue,
  darkValue,
  nightValue
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <Typography variant="body-secondary-semibold" className="mb-3">{colorName}</Typography>
      <Typography variant="body-secondary-regular" className="text-gray-600 mb-3 font-mono">{colorVar}</Typography>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Light Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: lightValue }}
          ></div>
          <Typography variant="body-secondary-medium" className="text-gray-700">Light</Typography>
          <Typography variant="body-secondary-regular" className="font-mono text-gray-500">{lightValue}</Typography>
        </div>
        
        {/* Dark Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: darkValue }}
          ></div>
          <Typography variant="body-secondary-medium" className="text-gray-700">Dark</Typography>
          <Typography variant="body-secondary-regular" className="font-mono text-gray-500">{darkValue}</Typography>
        </div>
        
        {/* Night Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: nightValue }}
          ></div>
          <Typography variant="body-secondary-medium" className="text-gray-700">Night</Typography>
          <Typography variant="body-secondary-regular" className="font-mono text-gray-500">{nightValue}</Typography>
        </div>
      </div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  children: React.ReactNode;
}

const ColorGroup: React.FC<ColorGroupProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <Typography variant="display-primary" className="mb-4">{title}</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

// Horizontal color scale component like Base Colors
interface HorizontalColorScaleProps {
  title: string;
  colors: { shade: string; hex: string; cssVar: string }[];
  theme: 'light' | 'dark' | 'night';
}

const HorizontalColorScale: React.FC<HorizontalColorScaleProps> = ({ title, colors, theme }) => {
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
    <div className={`p-6 ${themeStyles[theme]} ${textStyles[theme]} rounded-lg border`}>
      <Typography variant="display-primary" className="mb-4">{title}</Typography>
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
            <div className="mt-1 text-center">
              <Typography variant="body-secondary-regular" className="font-mono">{color.shade}</Typography>
              <Typography variant="body-secondary-regular" className="font-mono text-[10px] opacity-70">{color.hex}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function Colors() {
  const { theme } = useOptionalTheme();
  
  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <Typography variant="title-primary" className="text-[40px]">Color System</Typography>
        <div className="flex items-center gap-4">
          <Typography variant="body-secondary-medium">Current Theme: {theme}</Typography>
          <Typography variant="body-secondary-regular" className="text-gray-500">
            Complete design system colors
          </Typography>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <Typography variant="display-primary" className="text-blue-900 mb-3">Color System Architecture</Typography>
        <div className="text-blue-800 space-y-2">
          <Typography variant="body-primary-regular"><strong>Base Colors</strong> → Foundation color scales (67 colors × 3 themes = 201 CSS variables)</Typography>
          <Typography variant="body-primary-regular"><strong>Semantic Colors</strong> → Component-friendly colors that reference base scales</Typography>
          <Typography variant="body-primary-regular"><strong>Component Usage</strong> → Components use semantic colors that adapt automatically</Typography>
        </div>
        <div className="mt-4 flex gap-4">
          <a href="?path=/story/design-system-colors-base-colors--light-mode" className="text-blue-600 hover:text-blue-800 underline">
            View Base Colors →
          </a>
          <a href="?path=/story/design-system-colors-color-system--light-mode" className="text-blue-600 hover:text-blue-800 underline">
            View Color System →
          </a>
        </div>
      </div>
      
      <section>
        <Typography variant="title-secondary" className="mb-6">Primary Colors</Typography>
        <Typography variant="body-primary-regular" className="mb-6">Main color scale used for primary UI elements and text</Typography>
        
        <HorizontalColorScale 
          title="Primary Scale" 
          colors={[
            { shade: '900', hex: '#1a2330', cssVar: '--primary-900' },
            { shade: '800', hex: '#2c3547', cssVar: '--primary-800' },
            { shade: '700', hex: '#434f64', cssVar: '--primary-700' },
            { shade: '600', hex: '#49556a', cssVar: '--primary-600' },
            { shade: '500', hex: '#5f697b', cssVar: '--primary-500' },
            { shade: '400', hex: '#6c7689', cssVar: '--primary-400' },
            { shade: '300', hex: '#838c9d', cssVar: '--primary-300' },
            { shade: '200', hex: '#9aa3b2', cssVar: '--primary-200' },
            { shade: '100', hex: '#c5cad3', cssVar: '--primary-100' },
          ]}
          theme="light"
        />
      </section>
      
      <section>
        <Typography variant="title-secondary" className="mb-6">Secondary Colors (Borders)</Typography>
        <Typography variant="body-primary-regular" className="mb-6">Used for borders, dividers, and subtle UI elements</Typography>
        
        <HorizontalColorScale 
          title="Secondary Scale" 
          colors={[
            { shade: '900', hex: '#1e1f22', cssVar: '--secondary-900' },
            { shade: '800', hex: '#303236', cssVar: '--secondary-800' },
            { shade: '700', hex: '#4a4d52', cssVar: '--secondary-700' },
            { shade: '600', hex: '#6c6f75', cssVar: '--secondary-600' },
            { shade: '500', hex: '#979ba2', cssVar: '--secondary-500' },
            { shade: '400', hex: '#b6bac0', cssVar: '--secondary-400' },
            { shade: '300', hex: '#ced1d7', cssVar: '--secondary-300' },
            { shade: '200', hex: '#ebecef', cssVar: '--secondary-200' },
            { shade: '100', hex: '#f0f1f7', cssVar: '--secondary-100' },
          ]}
          theme="light"
        />
      </section>
      
      <section>
        <Typography variant="title-secondary" className="mb-6">Semantic Colors</Typography>
        <Typography variant="body-primary-regular" className="mb-6">Status and interaction colors for components</Typography>
        
        <HorizontalColorScale 
          title="Status Colors" 
          colors={[
            { shade: 'Neutral', hex: '#1890ff', cssVar: '--neutral' },
            { shade: 'Positive', hex: '#00c637', cssVar: '--positive' },
            { shade: 'Warning', hex: '#ff6c19', cssVar: '--warning' },
            { shade: 'Critical', hex: '#ff3532', cssVar: '--critical' },
          ]}
          theme="light"
        />
      </section>
    </div>
  );
};