import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";

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
        <p className="font-medium text-sm">{colorName}</p>
        <p className="text-xs text-gray-600">{colorVar}</p>
        <p className="text-xs font-mono">{colorValue}</p>
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
      <h4 className="font-semibold text-sm mb-3">{colorName}</h4>
      <p className="text-xs text-gray-600 mb-3 font-mono">{colorVar}</p>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Light Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: lightValue }}
          ></div>
          <p className="text-xs font-medium text-gray-700">Light</p>
          <p className="text-xs font-mono text-gray-500">{lightValue}</p>
        </div>
        
        {/* Dark Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: darkValue }}
          ></div>
          <p className="text-xs font-medium text-gray-700">Dark</p>
          <p className="text-xs font-mono text-gray-500">{darkValue}</p>
        </div>
        
        {/* Night Mode */}
        <div className="text-center">
          <div 
            className="h-16 w-16 rounded-md mb-2 border border-gray-200 mx-auto"
            style={{ backgroundColor: nightValue }}
          ></div>
          <p className="text-xs font-medium text-gray-700">Night</p>
          <p className="text-xs font-mono text-gray-500">{nightValue}</p>
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
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export function Colors() {
  const { theme } = useOptionalTheme();
  
  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-light">Colors</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Current Theme: {theme}</span>
          <p className="text-sm text-gray-500">
            All theme colors are shown below
          </p>
        </div>
      </div>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">All Theme Colors</h2>
        <p className="mb-6">Complete color palette showing Light, Dark, and Night mode variations for all color tokens.</p>
        
        <ColorGroup title="Base Colors">
          <ThemeColorSwatch 
            colorName="Primary"
            colorVar="--primary" 
            lightValue="#434f64"
            darkValue="#e2e8f0"
            nightValue="#f0f0f0"
          />
          <ThemeColorSwatch 
            colorName="Secondary"
            colorVar="--secondary" 
            lightValue="#5e687a"
            darkValue="#94a3b8"
            nightValue="#d0d0d0"
          />
          <ThemeColorSwatch 
            colorName="Tertiary"
            colorVar="--tertiary" 
            lightValue="#838c9d"
            darkValue="#64748b"
            nightValue="#a0a0a0"
          />
        </ColorGroup>
        
        <ColorGroup title="Background Colors">
          <ThemeColorSwatch 
            colorName="BG Primary"
            colorVar="--bg-primary" 
            lightValue="#ffffff"
            darkValue="#1e293b"
            nightValue="#000000"
          />
          <ThemeColorSwatch 
            colorName="BG Secondary"
            colorVar="--bg-secondary" 
            lightValue="#f8f8f9"
            darkValue="#0f172a"
            nightValue="#1a1a1a"
          />
        </ColorGroup>
        
        <ColorGroup title="Border Colors">
          <ThemeColorSwatch 
            colorName="Border Primary"
            colorVar="--border-primary" 
            lightValue="#ced1d7"
            darkValue="#475569"
            nightValue="#404040"
          />
          <ThemeColorSwatch 
            colorName="Border Secondary"
            colorVar="--border-secondary" 
            lightValue="#f0f1f7"
            darkValue="#334155"
            nightValue="#202020"
          />
        </ColorGroup>
        
        <ColorGroup title="Semantic Colors">
          <ThemeColorSwatch 
            colorName="Critical"
            colorVar="--critical" 
            lightValue="#ff3532"
            darkValue="#ff4d4f"
            nightValue="#ff6666"
          />
          <ThemeColorSwatch 
            colorName="Warning"
            colorVar="--warning" 
            lightValue="#ff6c19"
            darkValue="#ff7b33"
            nightValue="#ff8c4d"
          />
          <ThemeColorSwatch 
            colorName="Positive"
            colorVar="--positive" 
            lightValue="#00c637"
            darkValue="#00e64d"
            nightValue="#33ff77"
          />
          <ThemeColorSwatch 
            colorName="Neutral"
            colorVar="--neutral" 
            lightValue="#1890ff"
            darkValue="#4da6ff"
            nightValue="#66b3ff"
          />
        </ColorGroup>
        
        <ColorGroup title="Semantic Color Variants">
          <ThemeColorSwatch 
            colorName="Critical Dark"
            colorVar="--critical-dark" 
            lightValue="#b70100"
            darkValue="#b70100"
            nightValue="#b70100"
          />
          <ThemeColorSwatch 
            colorName="Critical Light"
            colorVar="--critical-light" 
            lightValue="#ffe9e9"
            darkValue="#ffe9e9"
            nightValue="#ffe9e9"
          />
          <ThemeColorSwatch 
            colorName="Warning Dark"
            colorVar="--warning-dark" 
            lightValue="#dd6a00"
            darkValue="#dd6a00"
            nightValue="#dd6a00"
          />
          <ThemeColorSwatch 
            colorName="Warning Light"
            colorVar="--warning-light" 
            lightValue="#ffebdc"
            darkValue="#ffebdc"
            nightValue="#ffebdc"
          />
          <ThemeColorSwatch 
            colorName="Positive Dark"
            colorVar="--positive-dark" 
            lightValue="#00753d"
            darkValue="#00753d"
            nightValue="#00753d"
          />
          <ThemeColorSwatch 
            colorName="Positive Light"
            colorVar="--positive-light" 
            lightValue="#deffe7"
            darkValue="#deffe7"
            nightValue="#deffe7"
          />
          <ThemeColorSwatch 
            colorName="Neutral Dark"
            colorVar="--neutral-dark" 
            lightValue="#006dd3"
            darkValue="#006dd3"
            nightValue="#006dd3"
          />
          <ThemeColorSwatch 
            colorName="Neutral Light"
            colorVar="--neutral-light" 
            lightValue="#ecf6ff"
            darkValue="#ecf6ff"
            nightValue="#ecf6ff"
          />
        </ColorGroup>
        
        <ColorGroup title="Badge Colors">
          <ThemeColorSwatch 
            colorName="Badge Normal"
            colorVar="--badge-normal-bg" 
            lightValue="#f0f1f7"
            darkValue="#334155"
            nightValue="#404040"
          />
          <ThemeColorSwatch 
            colorName="Badge Danger"
            colorVar="--badge-danger-bg" 
            lightValue="#ffeaea"
            darkValue="#7f1d1d"
            nightValue="#991b1b"
          />
          <ThemeColorSwatch 
            colorName="Badge Success"
            colorVar="--badge-success-bg" 
            lightValue="#dfffe8"
            darkValue="#14532d"
            nightValue="#166534"
          />
          <ThemeColorSwatch 
            colorName="Badge Warning"
            colorVar="--badge-warning-bg" 
            lightValue="#ffebdc"
            darkValue="#92400e"
            nightValue="#a16207"
          />
          <ThemeColorSwatch 
            colorName="Badge Neutral"
            colorVar="--badge-neutral-bg" 
            lightValue="#ecf6ff"
            darkValue="#1e3a8a"
            nightValue="#1e40af"
          />
        </ColorGroup>
        
        <ColorGroup title="Button Colors">
          <ThemeColorSwatch 
            colorName="Button Primary BG"
            colorVar="--button-primary-bg" 
            lightValue="#434f64"
            darkValue="#475569"
            nightValue="#334155"
          />
          <ThemeColorSwatch 
            colorName="Button Secondary BG"
            colorVar="--button-secondary-bg" 
            lightValue="#f8f8f9"
            darkValue="#374151"
            nightValue="#1f2937"
          />
          <ThemeColorSwatch 
            colorName="Button Destructive BG"
            colorVar="--button-destructive-bg" 
            lightValue="#ff3533"
            darkValue="#dc2626"
            nightValue="#b91c1c"
          />
        </ColorGroup>
        
        <ColorGroup title="Form Colors">
          <ThemeColorSwatch 
            colorName="Surface"
            colorVar="--surface" 
            lightValue="#ffffff"
            darkValue="#334155"
            nightValue="#1e293b"
          />
          <ThemeColorSwatch 
            colorName="Input Text"
            colorVar="--input" 
            lightValue="#000000"
            darkValue="#f1f5f9"
            nightValue="#e2e8f0"
          />
          <ThemeColorSwatch 
            colorName="Border"
            colorVar="--border" 
            lightValue="#d1d5db"
            darkValue="#4b5563"
            nightValue="#374151"
          />
          <ThemeColorSwatch 
            colorName="Placeholder"
            colorVar="--placeholder" 
            lightValue="#9ca3af"
            darkValue="#9ca3af"
            nightValue="#6b7280"
          />
        </ColorGroup>
      </section>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Live Theme Preview</h2>
        <p className="mb-6">These components automatically adapt based on the current theme selected in the Storybook toolbar.</p>
        
        <div className="bg-[var(--bg-primary)] p-6 rounded-lg shadow-sm border border-[var(--border-primary)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--primary)]">Current Theme: {theme}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg">
              <h4 className="font-medium text-[var(--primary)] mb-2">Primary Text</h4>
              <p className="text-[var(--secondary)] text-sm">Secondary text color adapts to theme</p>
              <p className="text-[var(--tertiary)] text-xs mt-1">Tertiary text for muted content</p>
            </div>
            
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg">
              <div className="flex gap-2 mb-3">
                <div className="h-4 w-4 rounded bg-[var(--critical)]"></div>
                <div className="h-4 w-4 rounded bg-[var(--warning)]"></div>
                <div className="h-4 w-4 rounded bg-[var(--positive)]"></div>
                <div className="h-4 w-4 rounded bg-[var(--neutral)]"></div>
              </div>
              <p className="text-[var(--secondary)] text-sm">Semantic colors</p>
            </div>
            
            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg">
              <div className="space-y-2">
                <div className="h-2 bg-[var(--border-primary)] rounded"></div>
                <div className="h-2 bg-[var(--border-secondary)] rounded"></div>
                <div className="h-2 bg-[var(--primary)] rounded w-2/3"></div>
              </div>
              <p className="text-[var(--secondary)] text-sm mt-2">Adaptive borders & backgrounds</p>
            </div>
          </div>
          
          <div className="bg-[var(--bg-secondary)] p-4 rounded-lg border border-[var(--border-secondary)]">
            <h4 className="font-medium text-[var(--primary)] mb-2">CSS Variables in Use</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
              <div className="text-[var(--secondary)]">var(--primary)</div>
              <div className="text-[var(--secondary)]">var(--secondary)</div>
              <div className="text-[var(--secondary)]">var(--bg-primary)</div>
              <div className="text-[var(--secondary)]">var(--border-primary)</div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Static Color Reference</h2>
        <p className="mb-6">These are the base colors that don't change between themes - used for brand identity and fixed design elements.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ColorSwatch 
            colorName="Brand Primary" 
            colorVar="--ft-primary" 
            colorValue="#434f64" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Brand Accent" 
            colorVar="--ft-accent" 
            colorValue="#1890ff" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Pure White" 
            colorVar="--white" 
            colorValue="#ffffff" 
          />
          <ColorSwatch 
            colorName="Pure Black" 
            colorVar="--black" 
            colorValue="#000000" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Critical Base" 
            colorVar="--critical-base" 
            colorValue="#ff3533" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Warning Base" 
            colorVar="--warning-base" 
            colorValue="#ff6c19" 
          />
          <ColorSwatch 
            colorName="Positive Base" 
            colorVar="--positive-base" 
            colorValue="#00c638" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Neutral Base" 
            colorVar="--neutral-base" 
            colorValue="#1890ff" 
            textColor="text-white"
          />
        </div>
      </section>
    </div>
  );
} 