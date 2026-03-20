import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Slider, SliderTrack, SliderRange, SliderThumb, SliderLabel } from './index';

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Range slider component built with FT Design System tokens. Supports single value and range modes, vertical/horizontal orientation, labels, tooltips, and custom colors.',
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
      behavior: 'inline' as const,
      previewMode: 'inline' as const,
      baseStory: 'ExplorerBase',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Single', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'range', label: 'Range', story: 'ExplorerBase', args: { contentType: 'range' } },
            { id: 'labels', label: 'Labels', story: 'ExplorerBase', args: { contentType: 'labels' } },
          ],
        },
        {
          id: 'state',
          label: 'State',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
          ],
        },
      ],
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      supportsGlass: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    range: { control: 'boolean' },
    vertical: { control: 'boolean' },
    disabled: { control: 'boolean' },
    tooltip: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const syncKey = JSON.stringify({ contentType });
    return (
      <div key={syncKey} className="p-6">
        {contentType === 'default' && (
          <Slider defaultValue={30} className="w-[300px]">
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb value={30} type="end" />
          </Slider>
        )}
        {contentType === 'range' && (
          <Slider range defaultValue={[20, 80]} className="w-[300px]">
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb value={20} type="start" />
            <SliderThumb value={80} type="end" />
          </Slider>
        )}
        {contentType === 'labels' && (
          <Slider defaultValue={50} className="w-[300px]">
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb value={50} type="end" />
            <SliderLabel value={0}>0°C</SliderLabel>
            <SliderLabel value={26}>26°C</SliderLabel>
            <SliderLabel value={37}>37°C</SliderLabel>
            <SliderLabel value={100}>100°C</SliderLabel>
          </Slider>
        )}
      </div>
    );
  },
};

// Composable API Examples (Recommended)
export const Default: Story = {
  render: () => (
    <div className="p-6">
      <Slider defaultValue={30} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={30} type="end" />
      </Slider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '✅ **Composable API**: Use SliderTrack, SliderRange, SliderThumb, and SliderLabel sub-components for flexible slider composition.',
      },
      source: {
        code: `<Slider defaultValue={30} className="w-[300px]">
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb value={30} type="end" />
</Slider>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const Range: Story = {
  render: () => (
    <div className="p-6">
      <Slider range defaultValue={[20, 80]} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={20} type="start" />
        <SliderThumb value={80} type="end" />
      </Slider>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use multiple SliderThumb components for range sliders.',
      },
      source: {
        code: `<Slider range defaultValue={[20, 80]} className="w-[300px]">
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb value={20} type="start" />
  <SliderThumb value={80} type="end" />
</Slider>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsWithLabels: Story = {
  render: () => (
    <div className="p-6">
      <Slider defaultValue={50} className="w-[300px]">
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb value={50} type="end" />
        <SliderLabel value={0}>0°C</SliderLabel>
        <SliderLabel value={26}>26°C</SliderLabel>
        <SliderLabel value={37}>37°C</SliderLabel>
        <SliderLabel value={100}>100°C</SliderLabel>
      </Slider>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Use SliderLabel components for marks/labels on the slider track.',
      },
      source: {
        code: `<Slider defaultValue={50} className="w-[300px]">
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb value={50} type="end" />
  <SliderLabel value={0}>0\u00B0C</SliderLabel>
  <SliderLabel value={26}>26\u00B0C</SliderLabel>
  <SliderLabel value={37}>37\u00B0C</SliderLabel>
  <SliderLabel value={100}>100\u00B0C</SliderLabel>
</Slider>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsVariants: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">Single Value</p>
        <Slider defaultValue={30} className="w-[300px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={30} type="end" />
        </Slider>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Range</p>
        <Slider range defaultValue={[20, 80]} className="w-[300px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={20} type="start" />
          <SliderThumb value={80} type="end" />
        </Slider>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">With Labels</p>
        <Slider defaultValue={50} className="w-[300px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={50} type="end" />
          <SliderLabel value={0}>0</SliderLabel>
          <SliderLabel value={50}>50</SliderLabel>
          <SliderLabel value={100}>100</SliderLabel>
        </Slider>
      </div>
      <div style={{ height: 220 }}>
        <p className="text-sm font-semibold mb-2">Vertical</p>
        <Slider vertical defaultValue={40} className="h-[200px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={40} type="end" />
        </Slider>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'All visual variants of the Slider component shown side-by-side: single value, range, with labels, and vertical orientation.',
      },
      source: {
        code: `{/* Single Value */}
<Slider defaultValue={30} className="w-[300px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={30} type="end" />
</Slider>

{/* Range */}
<Slider range defaultValue={[20, 80]} className="w-[300px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={20} type="start" />
  <SliderThumb value={80} type="end" />
</Slider>

{/* With Labels */}
<Slider defaultValue={50} className="w-[300px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={50} type="end" />
  <SliderLabel value={0}>0</SliderLabel>
  <SliderLabel value={50}>50</SliderLabel>
  <SliderLabel value={100}>100</SliderLabel>
</Slider>

{/* Vertical */}
<Slider vertical defaultValue={40} className="h-[200px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={40} type="end" />
</Slider>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export const DocsStates: Story = {
  render: () => (
    <div className="p-6 flex flex-col gap-10">
      <div>
        <p className="text-sm font-semibold mb-2">Default</p>
        <Slider defaultValue={50} className="w-[300px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={50} type="end" />
        </Slider>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2">Disabled</p>
        <Slider defaultValue={50} disabled className="w-[300px]">
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb value={50} type="end" />
        </Slider>
      </div>
    </div>
  ),
  parameters: {

    docsOnly: true,
    docs: {
      description: {
        story: 'Slider states: default and disabled.',
      },
      source: {
        code: `{/* Default */}
<Slider defaultValue={50} className="w-[300px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={50} type="end" />
</Slider>

{/* Disabled */}
<Slider defaultValue={50} disabled className="w-[300px]">
  <SliderTrack><SliderRange /></SliderTrack>
  <SliderThumb value={50} type="end" />
</Slider>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};
