import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Footer, FooterButton } from './Footer';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A footer component for displaying action buttons using a composable API with FooterButton children.',
      },
    },
    explorer: {
                                                                                                                                                                                                                                                                                                                                                                                                inspector: {
                                                                                                                                                                                                  enabled: true,
                                                                                                                                                                                                  defaultMode: 'token-spacing' as const,
                                                                                                                                                                                                  spacingHints: {
                                                                                                                                                                                                    outerXToken: 'x6',
                                                                                                                                                                                                    outerYToken: 'x3',
                                                                                                                                                                                                    innerGapToken: 'x2',
                                                                                                                                                                                                  },
                                                                                                                                                                                                },
      mode: 'matrix' as const,
      behavior: 'layout' as const,
      previewMode: 'inline' as const,
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase' },
            { id: 'two-buttons', label: 'Two Buttons', story: 'ExplorerBase', args: { buttonCount: 2 } },
            { id: 'three-buttons', label: 'Three Buttons', story: 'ExplorerBase', args: { buttonCount: 3 } },
            { id: 'four-buttons', label: 'Four Buttons', story: 'ExplorerBase', args: { buttonCount: 4 } },
            { id: 'with-left-side', label: 'With Left Side', story: 'ExplorerBase', args: { withLeftSide: true } },
            { id: 'custom-buttons', label: 'Custom Buttons', story: 'ExplorerBase', args: { customButtons: true } },
          ],
        },
      ],
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const count = args.buttonCount || 1;
    return (
      <Footer>
        {args.withLeftSide && <FooterButton variant="text" leftSide>Delete</FooterButton>}
        {count >= 4 && <FooterButton variant="text">Reset</FooterButton>}
        {count >= 3 && <FooterButton variant="text">Cancel</FooterButton>}
        {count >= 2 && <FooterButton variant="secondary">{args.customButtons ? 'Preview' : 'Save Draft'}</FooterButton>}
        <FooterButton variant="primary">{args.customButtons ? 'Deploy' : 'Save'}</FooterButton>
      </Footer>
    );
  },
};

// Composable API Examples
export const DocsVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-2 px-4">Single Button</p>
        <Footer>
          <FooterButton variant="primary">Save</FooterButton>
        </Footer>
      </div>
      <div>
        <p className="text-sm font-medium mb-2 px-4">Two Buttons</p>
        <Footer>
          <FooterButton variant="secondary">Cancel</FooterButton>
          <FooterButton variant="primary">Save</FooterButton>
        </Footer>
      </div>
      <div>
        <p className="text-sm font-medium mb-2 px-4">Three Buttons</p>
        <Footer>
          <FooterButton variant="text">Cancel</FooterButton>
          <FooterButton variant="secondary">Save Draft</FooterButton>
          <FooterButton variant="primary">Publish</FooterButton>
        </Footer>
      </div>
      <div>
        <p className="text-sm font-medium mb-2 px-4">With Left-Side Button</p>
        <Footer>
          <FooterButton variant="text" leftSide>Delete</FooterButton>
          <FooterButton variant="secondary">Cancel</FooterButton>
          <FooterButton variant="primary">Save</FooterButton>
        </Footer>
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `{/* Single Button */}
<Footer>
  <FooterButton variant="primary">Save</FooterButton>
</Footer>

{/* Two Buttons */}
<Footer>
  <FooterButton variant="secondary">Cancel</FooterButton>
  <FooterButton variant="primary">Save</FooterButton>
</Footer>

{/* Three Buttons */}
<Footer>
  <FooterButton variant="text">Cancel</FooterButton>
  <FooterButton variant="secondary">Save Draft</FooterButton>
  <FooterButton variant="primary">Publish</FooterButton>
</Footer>

{/* With Left-Side Button */}
<Footer>
  <FooterButton variant="text" leftSide>Delete</FooterButton>
  <FooterButton variant="secondary">Cancel</FooterButton>
  <FooterButton variant="primary">Save</FooterButton>
</Footer>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}