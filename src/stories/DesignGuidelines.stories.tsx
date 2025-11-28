import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const DesignGuidelinesPage = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-8">
    <div className="border-b pb-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        FT Design System - Design Guidelines
      </h1>
      <p className="text-lg text-gray-600">
        Essential guidelines for designers creating components that integrate seamlessly with the FT Design System. 
        Following these rules ensures visual consistency, proper sizing, and optimal developer experience.
      </p>
    </div>

    {/* Core Design Principles */}
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Core Design Principles</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">1. Unified Component Sizing</h3>
        <p className="text-blue-800 mb-4">All interactive components must follow our standardized size system:</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-blue-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Size</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Height</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Font Size</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Padding (H×V)</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Icon Size</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-semibold">Border Radius</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">xxs</td>
                <td className="border border-blue-300 px-4 py-2">16px</td>
                <td className="border border-blue-300 px-4 py-2">12px</td>
                <td className="border border-blue-300 px-4 py-2">6px × 2px</td>
                <td className="border border-blue-300 px-4 py-2">12px</td>
                <td className="border border-blue-300 px-4 py-2">4px</td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">xs</td>
                <td className="border border-blue-300 px-4 py-2">24px</td>
                <td className="border border-blue-300 px-4 py-2">12px</td>
                <td className="border border-blue-300 px-4 py-2">8px × 2px</td>
                <td className="border border-blue-300 px-4 py-2">12px</td>
                <td className="border border-blue-300 px-4 py-2">4px</td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">sm</td>
                <td className="border border-blue-300 px-4 py-2">32px</td>
                <td className="border border-blue-300 px-4 py-2">14px</td>
                <td className="border border-blue-300 px-4 py-2">12px × 8px</td>
                <td className="border border-blue-300 px-4 py-2">16px</td>
                <td className="border border-blue-300 px-4 py-2">8px</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-blue-300 px-4 py-2 font-medium">md (Default)</td>
                <td className="border border-blue-300 px-4 py-2 font-bold">40px</td>
                <td className="border border-blue-300 px-4 py-2">16px</td>
                <td className="border border-blue-300 px-4 py-2">16px × 12px</td>
                <td className="border border-blue-300 px-4 py-2">20px</td>
                <td className="border border-blue-300 px-4 py-2">8px</td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">lg</td>
                <td className="border border-blue-300 px-4 py-2">48px</td>
                <td className="border border-blue-300 px-4 py-2">20px</td>
                <td className="border border-blue-300 px-4 py-2">20px × 12px</td>
                <td className="border border-blue-300 px-4 py-2">24px</td>
                <td className="border border-blue-300 px-4 py-2">8px</td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">xl</td>
                <td className="border border-blue-300 px-4 py-2">56px</td>
                <td className="border border-blue-300 px-4 py-2">24px</td>
                <td className="border border-blue-300 px-4 py-2">24px × 16px</td>
                <td className="border border-blue-300 px-4 py-2">24px</td>
                <td className="border border-blue-300 px-4 py-2">8px</td>
              </tr>
              <tr>
                <td className="border border-blue-300 px-4 py-2 font-medium">xxl</td>
                <td className="border border-blue-300 px-4 py-2">64px</td>
                <td className="border border-blue-300 px-4 py-2">28px</td>
                <td className="border border-blue-300 px-4 py-2">28px × 20px</td>
                <td className="border border-blue-300 px-4 py-2">24px</td>
                <td className="border border-blue-300 px-4 py-2">8px</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-green-900 mb-2">✅ DO:</h4>
          <ul className="text-green-800 space-y-1">
            <li>• Use the exact heights specified above</li>
            <li>• Maintain consistent padding ratios</li>
            <li>• Apply uniform border radius within size categories</li>
            <li>• Use standardized icon sizes</li>
            <li>• Follow the color system hierarchy</li>
          </ul>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-red-900 mb-2">❌ DON&apos;T:</h4>
          <ul className="text-red-800 space-y-1">
            <li>• Create custom heights (38px, 42px, etc.)</li>
            <li>• Mix different padding styles within the same size</li>
            <li>• Use arbitrary border radius values</li>
            <li>• Scale icons independently from component size</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Color System */}
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🎨 Color System</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Primary Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#434f64'}}></div>
              <span className="font-mono text-sm">#434f64</span>
              <span className="text-sm text-gray-600">Primary</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#363f52'}}></div>
              <span className="font-mono text-sm">#363f52</span>
              <span className="text-sm text-gray-600">Primary Dark</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#5a6b7d'}}></div>
              <span className="font-mono text-sm">#5a6b7d</span>
              <span className="text-sm text-gray-600">Primary Light</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Semantic Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#10b981'}}></div>
              <span className="font-mono text-sm">#10b981</span>
              <span className="text-sm text-gray-600">Success</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#f59e0b'}}></div>
              <span className="font-mono text-sm">#f59e0b</span>
              <span className="text-sm text-gray-600">Warning</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#ef4444'}}></div>
              <span className="font-mono text-sm">#ef4444</span>
              <span className="text-sm text-gray-600">Error</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded" style={{backgroundColor: '#3b82f6'}}></div>
              <span className="font-mono text-sm">#3b82f6</span>
              <span className="text-sm text-gray-600">Info</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Neutral Colors</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border" style={{backgroundColor: '#1f2937'}}></div>
              <span className="font-mono text-sm">#1f2937</span>
              <span className="text-sm text-gray-600">Text Primary</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border" style={{backgroundColor: '#6b7280'}}></div>
              <span className="font-mono text-sm">#6b7280</span>
              <span className="text-sm text-gray-600">Text Secondary</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border" style={{backgroundColor: '#d1d5db'}}></div>
              <span className="font-mono text-sm">#d1d5db</span>
              <span className="text-sm text-gray-600">Border</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded border" style={{backgroundColor: '#f9fafb'}}></div>
              <span className="font-mono text-sm">#f9fafb</span>
              <span className="text-sm text-gray-600">Background</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Common Mistakes */}
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">🔍 Common Mistakes to Avoid</h2>
      
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Size Inconsistencies</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-red-800 font-medium mb-1">❌ Wrong:</p>
              <p className="text-red-700 text-sm">Button 40px, Input 36px, Dropdown 38px</p>
            </div>
            <div>
              <p className="text-green-800 font-medium mb-1">✅ Correct:</p>
              <p className="text-green-700 text-sm">All components 40px (md size)</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Color Deviations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-red-800 font-medium mb-1">❌ Wrong:</p>
              <p className="text-red-700 text-sm">#1890ff for primary actions</p>
            </div>
            <div>
              <p className="text-green-800 font-medium mb-1">✅ Correct:</p>
              <p className="text-green-700 text-sm">#434f64 (brand primary color)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Design Checklist */}
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Design Checklist</h2>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800 mb-4 font-medium">Before finalizing any component design:</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Visual Consistency</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>□ Heights match the unified size system</li>
              <li>□ Padding follows the standardized ratios</li>
              <li>□ Colors use the defined palette</li>
              <li>□ Typography uses system fonts and sizes</li>
              <li>□ Icons are properly sized and aligned</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Functionality</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>□ All interactive states are designed</li>
              <li>□ Focus states are clearly visible</li>
              <li>□ Error states are intuitive</li>
              <li>□ Loading states are smooth</li>
              <li>□ Disabled states are obvious</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Accessibility</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>□ Color contrast meets WCAG AA standards</li>
              <li>□ Focus indicators are visible</li>
              <li>□ Touch targets are minimum 44px</li>
              <li>□ Text is readable at all sizes</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Technical Readiness</h3>
            <ul className="space-y-1 text-sm text-yellow-800">
              <li>□ Components are properly named</li>
              <li>□ Variants are clearly organized</li>
              <li>□ Properties are well-defined</li>
              <li>□ Measurements are exact</li>
              <li>□ Handoff specs are complete</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <section className="border-t pt-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-2">📞 Support & Resources</h2>
        <p className="text-blue-800 mb-4">
          For questions about these guidelines or the FT Design System:
        </p>
        <ul className="space-y-2 text-blue-700">
          <li>• <strong>Complete Guidelines:</strong> See DESIGN_GUIDELINES.md in the repository</li>
          <li>• <strong>Component Library:</strong> Browse all components in this Storybook</li>
          <li>• <strong>Unified Design System:</strong> See UNIFIED_DESIGN_SYSTEM.md for technical details</li>
        </ul>
        <div className="mt-4 p-4 bg-blue-100 rounded border border-blue-300">
          <p className="text-blue-900 font-medium">
            💡 <strong>Remember:</strong> These guidelines ensure that every component integrates seamlessly with the FT Design System, 
            providing a consistent user experience and optimal developer workflow.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta = {
  title: 'Design System/Design Guidelines',
  component: DesignGuidelinesPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => <DesignGuidelinesPage />,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Guidelines: Story = {
  render: () => <DesignGuidelinesPage />,
}; 
