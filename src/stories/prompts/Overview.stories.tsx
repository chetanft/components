import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const PromptsOverview = () => {
  const platforms = [
    {
      name: 'Lovable.dev',
      description: 'AI-powered web development platform',
      color: 'bg-blue-500',
      prompts: ['Setup', 'Dashboard', 'E-commerce', 'Forms'],
      features: ['Rapid prototyping', 'Full-stack apps', 'Real-time preview', 'Deployment ready']
    },
    {
      name: 'Bolt.new',
      description: 'Full-stack development environment',
      color: 'bg-green-500',
      prompts: ['Project Setup', 'Web Application', 'SaaS Platform', 'Mobile-First'],
      features: ['Complete environments', 'Backend integration', 'Database setup', 'API development']
    },
    {
      name: 'Cursor AI',
      description: 'AI-powered code editor',
      color: 'bg-purple-500',
      prompts: ['Project Setup', 'Code Refactoring', 'App Architecture', 'Testing Strategy'],
      features: ['Code completion', 'Refactoring tools', 'Architecture guidance', 'Testing automation']
    },
    {
      name: 'Augment Code',
      description: 'Professional development assistant',
      color: 'bg-orange-500',
      prompts: ['Project Setup', 'Component Development', 'Performance Optimization', 'Accessibility'],
      features: ['Best practices', 'Performance focus', 'Accessibility compliance', 'Code quality']
    },
    {
      name: 'General',
      description: 'Universal prompts for any AI tool',
      color: 'bg-gray-500',
      prompts: ['Quick Start', 'Dashboard', 'E-commerce', 'Forms', 'Migration', 'Testing'],
      features: ['Platform agnostic', 'Comprehensive coverage', 'Flexible usage', 'Easy customization']
    }
  ];

  const designSystemFeatures = [
    {
      category: 'Form Controls',
      components: ['Button', 'Input', 'Checkbox', 'RadioGroup', 'Switch', 'DatePicker', 'Dropdown'],
      icon: '📝'
    },
    {
      category: 'Data Display',
      components: ['Table', 'Badge', 'Typography', 'ProgressBar'],
      icon: '📊'
    },
    {
      category: 'Navigation',
      components: ['Tabs', 'Collapsible'],
      icon: '🧭'
    },
    {
      category: 'File Handling',
      components: ['FileCard', 'FileThumbnail', 'UploadZone'],
      icon: '📁'
    },
    {
      category: 'Icons',
      components: ['190+ professionally designed icons'],
      icon: '🎨'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Prompts for FT Design System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Ready-to-use prompts for building applications with the FT Design System across different AI platforms.
          Copy, customize, and paste these prompts to accelerate your development workflow.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🚀 Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">1. Choose Your Platform</h3>
            <p className="text-gray-600 text-sm">
              Select the AI tool you're using from the sidebar navigation.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">2. Copy the Prompt</h3>
            <p className="text-gray-600 text-sm">
              Click the "Copy Prompt" button for the type of application you want to build.
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">3. Customize & Paste</h3>
            <p className="text-gray-600 text-sm">
              Modify the prompt for your specific needs and paste it into your AI tool.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI Platform Support</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => (
            <div key={platform.name} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 rounded-full ${platform.color} mr-3`}></div>
                <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Available Prompts:</h4>
                <div className="flex flex-wrap gap-1">
                  {platform.prompts.map((prompt) => (
                    <span key={prompt} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {platform.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design System Components */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🧩 FT Design System Components</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designSystemFeatures.map((feature) => (
            <div key={feature.category} className="bg-white border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{feature.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{feature.category}</h3>
              </div>
              <ul className="space-y-2">
                {feature.components.map((component) => (
                  <li key={component} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                    {component}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Examples */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Common Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏢 Business Applications</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">Admin Dashboards:</span>
                User management, analytics, data tables
              </li>
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">CRM Systems:</span>
                Contact forms, lead tracking, reporting
              </li>
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">SaaS Platforms:</span>
                Settings pages, billing, user onboarding
              </li>
            </ul>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🛒 E-commerce & Consumer</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">Online Stores:</span>
                Product catalogs, shopping carts, checkout
              </li>
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">Marketplaces:</span>
                Vendor dashboards, product listings, reviews
              </li>
              <li className="flex items-start">
                <span className="font-medium text-gray-900 mr-2">Booking Systems:</span>
                Calendars, reservations, payment forms
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Installation</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
          npm install ft-design-system
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Import Styles</h3>
            <div className="bg-gray-900 text-gray-300 p-3 rounded text-sm font-mono">
              import 'ft-design-system/dist/styles.css';
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Import Components</h3>
            <div className="bg-gray-900 text-gray-300 p-3 rounded text-sm font-mono">
              import &#123; Button, Input &#125; from 'ft-design-system';
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-4">💡 Pro Tips</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• Start with the General prompts if you're unsure which platform to use</li>
            <li>• Customize the prompts by adding your specific requirements</li>
            <li>• Combine multiple prompts for complex applications</li>
          </ul>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• Include the entire prompt with code examples for best results</li>
            <li>• Mention TypeScript if you want type-safe implementations</li>
            <li>• Specify responsive design requirements for mobile support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof PromptsOverview> = {
  title: 'AI Prompts/Overview',
  component: PromptsOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Overview of all available AI prompts for the FT Design System.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {}; 