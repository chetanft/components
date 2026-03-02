import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const sizingScale = [
  {
    size: 'xxs',
    height: 'var(--spacing-x4)',
    fontSize: 'Typography: Body XS',
    padding: 'calc(var(--spacing-x1) + var(--spacing-x1)/2) × calc(var(--spacing-x1)/2)',
    icon: 'var(--spacing-x3)',
    radius: 'var(--radius-sm)',
  },
  {
    size: 'xs',
    height: 'var(--spacing-x6)',
    fontSize: 'Typography: Body XS',
    padding: 'var(--spacing-x2) × calc(var(--spacing-x1)/2)',
    icon: 'var(--spacing-x3)',
    radius: 'var(--radius-sm)',
  },
  {
    size: 'sm',
    height: 'var(--spacing-x8)',
    fontSize: 'Typography: Body SM',
    padding: 'var(--spacing-x3) × var(--spacing-x2)',
    icon: 'var(--spacing-x4)',
    radius: 'var(--radius-md)',
  },
  {
    size: 'md (Default)',
    height: 'var(--spacing-x10)',
    fontSize: 'Typography: Body MD',
    padding: 'var(--spacing-x4) × var(--spacing-x3)',
    icon: 'var(--spacing-x5)',
    radius: 'var(--radius-md)',
    highlight: true,
  },
  {
    size: 'lg',
    height: 'var(--spacing-x12)',
    fontSize: 'Typography: Body LG',
    padding: 'var(--spacing-x5) × var(--spacing-x3)',
    icon: 'var(--spacing-x6)',
    radius: 'var(--radius-md)',
  },
  {
    size: 'xl',
    height: 'var(--spacing-x14)',
    fontSize: 'Typography: Display SM',
    padding: 'var(--spacing-x6) × var(--spacing-x4)',
    icon: 'var(--spacing-x6)',
    radius: 'var(--radius-md)',
  },
  {
    size: 'xxl',
    height: 'var(--spacing-x16)',
    fontSize: 'Typography: Display MD',
    padding: 'var(--spacing-x7) × var(--spacing-x5)',
    icon: 'var(--spacing-x6)',
    radius: 'var(--radius-md)',
  },
];

const colorGroups = [
  {
    title: 'Primary Colors',
    swatches: [
      { token: 'var(--color-primary)', label: 'Primary' },
      { token: 'var(--color-secondary)', label: 'Primary Dark' },
      { token: 'var(--color-tertiary)', label: 'Primary Light' },
    ],
  },
  {
    title: 'Semantic Colors',
    swatches: [
      { token: 'var(--color-positive)', label: 'Success' },
      { token: 'var(--color-warning)', label: 'Warning' },
      { token: 'var(--color-critical)', label: 'Error' },
      { token: 'var(--color-neutral)', label: 'Info' },
    ],
  },
  {
    title: 'Neutral Colors',
    swatches: [
      { token: 'var(--color-primary)', label: 'Text Primary' },
      { token: 'var(--color-tertiary)', label: 'Text Secondary' },
      { token: 'var(--color-border-primary)', label: 'Border' },
      { token: 'var(--color-bg-secondary)', label: 'Background' },
    ],
  },
];

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
              {sizingScale.map((row) => (
                <tr key={row.size} className={row.highlight ? 'bg-green-50' : undefined}>
                  <td className="border border-blue-300 px-4 py-2 font-medium">{row.size}</td>
                  <td className={`border border-blue-300 px-4 py-2 ${row.highlight ? 'font-bold' : ''}`}>{row.height}</td>
                  <td className="border border-blue-300 px-4 py-2">{row.fontSize}</td>
                  <td className="border border-blue-300 px-4 py-2">{row.padding}</td>
                  <td className="border border-blue-300 px-4 py-2">{row.icon}</td>
                  <td className="border border-blue-300 px-4 py-2">{row.radius}</td>
                </tr>
              ))}
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
            <li>• Create custom heights that fall outside the spacing token scale</li>
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
        {colorGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-lg font-semibold mb-3">{group.title}</h3>
            <div className="space-y-2">
              {group.swatches.map((swatch) => (
                <div key={swatch.label} className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded border" style={{ backgroundColor: swatch.token }} />
                  <span className="font-mono text-sm">{swatch.token}</span>
                  <span className="text-sm text-gray-600">{swatch.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
              <p className="text-red-700 text-sm">Button var(--spacing-x10), Input var(--spacing-x9), Dropdown custom blend (not on the spacing scale)</p>
            </div>
            <div>
              <p className="text-green-800 font-medium mb-1">✅ Correct:</p>
              <p className="text-green-700 text-sm">All components var(--spacing-x10) (md size)</p>
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
              <li>□ Touch targets respect a var(--spacing-x11) minimum</li>
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
    docsOnly: true,
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
