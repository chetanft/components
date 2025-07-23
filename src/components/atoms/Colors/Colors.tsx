import React, { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { ThemeSwitch } from "../../molecules/ThemeSwitch/ThemeSwitch";
import { useTheme } from "../../../contexts/ThemeContext";

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
        className="h-24 w-24 rounded-md mb-2 border border-gray-200"
        style={{ backgroundColor: colorValue }}
      ></div>
      <div className="space-y-1">
        <p className="font-semibold text-sm">{colorName}</p>
        <p className="text-xs text-gray-600">{colorVar}</p>
        <p className="text-xs font-medium">{colorValue}</p>
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
    <div className="mb-12">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
};

export function Colors() {
  const { theme } = useTheme();
  
  return (
    <div className="w-full space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-light">Colors</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Current Theme: {theme}</span>
          <ThemeSwitch />
        </div>
      </div>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Live Theme Colors</h2>
        <p className="mb-6">These colors adapt automatically based on the selected theme above.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <div 
              className="h-24 w-24 rounded-md mb-2 border border-gray-200 bg-[var(--primary)]"
            ></div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Primary</p>
              <p className="text-xs text-gray-600">var(--primary)</p>
              <p className="text-xs font-medium">Adapts to theme</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div 
              className="h-24 w-24 rounded-md mb-2 border border-gray-200 bg-[var(--secondary)]"
            ></div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Secondary</p>
              <p className="text-xs text-gray-600">var(--secondary)</p>
              <p className="text-xs font-medium">Adapts to theme</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div 
              className="h-24 w-24 rounded-md mb-2 border border-gray-200 bg-[var(--tertiary)]"
            ></div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Tertiary</p>
              <p className="text-xs text-gray-600">var(--tertiary)</p>
              <p className="text-xs font-medium">Adapts to theme</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div 
              className="h-24 w-24 rounded-md mb-2 border border-gray-200 bg-[var(--border-primary)]"
            ></div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Border Primary</p>
              <p className="text-xs text-gray-600">var(--border-primary)</p>
              <p className="text-xs font-medium">Adapts to theme</p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div 
              className="h-24 w-24 rounded-md mb-2 border border-gray-200 bg-[var(--bg-secondary)]"
            ></div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">BG Secondary</p>
              <p className="text-xs text-gray-600">var(--bg-secondary)</p>
              <p className="text-xs font-medium">Adapts to theme</p>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Base Colors</h2>
        <p className="mb-6">These are the foundational colors used throughout the design system.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ColorSwatch 
            colorName="BG/Primary" 
            colorVar="--bg-primary" 
            colorValue="#ffffff" 
          />
          <ColorSwatch 
            colorName="Primary" 
            colorVar="--primary" 
            colorValue="#434f64" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Secondary" 
            colorVar="--secondary" 
            colorValue="#5f697b" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Tertiary" 
            colorVar="--tertiary" 
            colorValue="#838c9d" 
          />
          <ColorSwatch 
            colorName="Border/Primary" 
            colorVar="--border-primary" 
            colorValue="#ced1d7" 
          />
          <ColorSwatch 
            colorName="Border/Secondary" 
            colorVar="--border-secondary" 
            colorValue="#f0f1f7" 
          />
          <ColorSwatch 
            colorName="BG/Secondary" 
            colorVar="--bg-secondary" 
            colorValue="#f8f8f9" 
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Semantic Colors</h2>
        
        <ColorGroup title="Critical">
          <ColorSwatch 
            colorName="Critical Dark" 
            colorVar="--critical-dark" 
            colorValue="#b80100" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Critical" 
            colorVar="--critical" 
            colorValue="#ff3533" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Critical Light" 
            colorVar="--critical-light" 
            colorValue="#ffeaea" 
          />
        </ColorGroup>
        
        <ColorGroup title="Warning">
          <ColorSwatch 
            colorName="Warning Dark" 
            colorVar="--warning-dark" 
            colorValue="#dd6a00" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Warning" 
            colorVar="--warning" 
            colorValue="#ff6c19" 
          />
          <ColorSwatch 
            colorName="Warning Light" 
            colorVar="--warning-light" 
            colorValue="#ffebdc" 
          />
        </ColorGroup>
        
        <ColorGroup title="Positive">
          <ColorSwatch 
            colorName="Positive Dark" 
            colorVar="--positive-dark" 
            colorValue="#00763d" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Positive" 
            colorVar="--positive" 
            colorValue="#00c638" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Positive Light" 
            colorVar="--positive-light" 
            colorValue="#dfffe8" 
          />
        </ColorGroup>
        
        <ColorGroup title="Primary">
          <ColorSwatch 
            colorName="Primary Dark" 
            colorVar="--primary-dark" 
            colorValue="#1d2a38" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Primary" 
            colorVar="--primary" 
            colorValue="#434f64" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Primary Light" 
            colorVar="--primary-light" 
            colorValue="#ced1d7" 
          />
        </ColorGroup>
        
        <ColorGroup title="Neutral/Accent">
          <ColorSwatch 
            colorName="Neutral Dark" 
            colorVar="--neutral-dark" 
            colorValue="#006ed3" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Neutral" 
            colorVar="--neutral" 
            colorValue="#1890ff" 
            textColor="text-white"
          />
          <ColorSwatch 
            colorName="Neutral Light" 
            colorVar="--neutral-light" 
            colorValue="#ecf6ff" 
          />
        </ColorGroup>
      </section>
      
      {/* NEW: Theme Demonstration */}
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Multi-Theme Support</h2>
        <p className="mb-6">Our design system now supports Light, Dark, and Night modes. All colors automatically adapt based on the current theme.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Theme-Aware Components</h3>
          <p className="text-sm text-gray-600 mb-4">
            All components automatically adapt their colors based on the active theme. 
            Switch between Light, Dark, and Night modes to see the color system in action.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg">
              <h4 className="font-medium text-[var(--primary)] mb-2">Light Theme</h4>
              <p className="text-[var(--secondary)] text-sm">Clean, bright interface perfect for daytime use.</p>
            </div>
            
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg">
              <h4 className="font-medium text-[var(--primary)] mb-2">Dark Theme</h4>
              <p className="text-[var(--secondary)] text-sm">Comfortable viewing for low-light environments.</p>
            </div>
            
            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg">
              <h4 className="font-medium text-[var(--primary)] mb-2">Night Theme</h4>
              <p className="text-[var(--secondary)] text-sm">Deep contrast for extended night-time use.</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-lg">
            <h4 className="font-medium text-[var(--primary)] mb-2">CSS Variables in Action</h4>
            <p className="text-[var(--secondary)] text-sm mb-3">These components use CSS variables that automatically update when themes change:</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div><code>var(--primary)</code> - Main text</div>
              <div><code>var(--secondary)</code> - Muted text</div>
              <div><code>var(--bg-primary)</code> - Card backgrounds</div>
              <div><code>var(--border-primary)</code> - Borders</div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-[24px] font-semibold mb-6">Button Colors</h2>
        <p className="mb-6">These are the specific colors used for button variants in different states.</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-4">Primary Button</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">State</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Variable</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-bg</td>
                  <td className="py-3 px-4">var(--dark-100) / #434f64</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-text</td>
                  <td className="py-3 px-4">var(--white) / #ffffff</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-hover-bg</td>
                  <td className="py-3 px-4">#374151</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-active-bg</td>
                  <td className="py-3 px-4">#1f2937</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-danger-bg</td>
                  <td className="py-3 px-4">var(--critical) / #ff3533</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-danger-text</td>
                  <td className="py-3 px-4">var(--white) / #ffffff</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-danger-hover-bg</td>
                  <td className="py-3 px-4">var(--critical-dark) / #b80100</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Danger Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-primary-danger-active-bg</td>
                  <td className="py-3 px-4">#7f1d1d</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-4">Secondary Button</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">State</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Variable</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-bg</td>
                  <td className="py-3 px-4">var(--bg) / #f8f8f9</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-text</td>
                  <td className="py-3 px-4">var(--dark-100) / #434f64</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-hover-bg</td>
                  <td className="py-3 px-4">var(--divider) / #f0f1f7</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-active-bg</td>
                  <td className="py-3 px-4">var(--box-border) / #ced1d7</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-danger-bg</td>
                  <td className="py-3 px-4">var(--critical-light) / #ffeaea</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-danger-text</td>
                  <td className="py-3 px-4">var(--critical) / #ff3533</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-danger-hover-bg</td>
                  <td className="py-3 px-4">#fecaca</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Danger Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-secondary-danger-active-bg</td>
                  <td className="py-3 px-4">#fca5a5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold mb-4">Text Button</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">State</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Variable</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-bg</td>
                  <td className="py-3 px-4">transparent</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-text</td>
                  <td className="py-3 px-4">var(--dark-100) / #434f64</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-hover-bg</td>
                  <td className="py-3 px-4">var(--bg) / #f8f8f9</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-active-bg</td>
                  <td className="py-3 px-4">var(--divider) / #f0f1f7</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-danger-bg</td>
                  <td className="py-3 px-4">transparent</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-danger-text</td>
                  <td className="py-3 px-4">var(--critical) / #ff3533</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-danger-hover-bg</td>
                  <td className="py-3 px-4">var(--critical-light) / #ffeaea</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Danger Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-text-danger-active-bg</td>
                  <td className="py-3 px-4">#fecaca</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Link Button</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">State</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Variable</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-bg</td>
                  <td className="py-3 px-4">transparent</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Normal (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-text</td>
                  <td className="py-3 px-4">var(--dark-100) / #434f64</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-hover-decoration</td>
                  <td className="py-3 px-4">underline</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-active-text</td>
                  <td className="py-3 px-4">var(--dark-50) / #5f697b</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Background)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-danger-bg</td>
                  <td className="py-3 px-4">transparent</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger (Text)</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-danger-text</td>
                  <td className="py-3 px-4">var(--critical) / #ff3533</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Danger Hover</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-danger-hover-decoration</td>
                  <td className="py-3 px-4">underline</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Danger Active</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-link-danger-active-text</td>
                  <td className="py-3 px-4">var(--critical-dark) / #b80100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8">
          <h3 className="text-lg font-semibold mb-4">Button States</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold">State</th>
                  <th className="text-left py-3 px-4 font-semibold">Color Variable</th>
                  <th className="text-left py-3 px-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">Focus Ring</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-focus-ring</td>
                  <td className="py-3 px-4">var(--dark-100) / #434f64</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Disabled Opacity</td>
                  <td className="py-3 px-4 font-mono text-xs">--button-disabled-opacity</td>
                  <td className="py-3 px-4">0.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
} 