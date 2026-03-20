import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Molecules/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A carousel/slider component for cycling through content. Built using FT Design System tokens.',
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
      baseStory: 'ExplorerBase',
      defaultRowId: 'type',
      defaultScenarioId: 'default',
      rows: [
        {
          id: 'type',
          label: 'Type',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: { contentType: 'default' } },
            { id: 'autoplay', label: 'Autoplay', story: 'ExplorerBase', args: { contentType: 'default', autoplay: true } },
            { id: 'fade-effect', label: 'Fade Effect', story: 'ExplorerBase', args: { contentType: 'default', effect: 'fade' } },
            { id: 'image-gallery', label: 'Image Gallery', story: 'ExplorerBase', args: { contentType: 'gallery' } },
          ],
        },
        {
          id: 'controls',
          label: 'Behavior',
          scenarios: [
            { id: 'default', label: 'Default', story: 'ExplorerBase', args: {} },
            { id: 'without-arrows', label: 'Without Arrows', story: 'ExplorerBase', args: { arrows: false } },
            { id: 'dot-positions', label: 'Dot Positions', story: 'ExplorerBase', args: { dotPosition: 'top' } },
            { id: 'custom-dots', label: 'Custom Dots', story: 'ExplorerBase', args: { contentType: 'custom-dots' } },
          ],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    effect: {
      control: 'select',
      options: ['slide', 'fade'],
      description: 'Transition effect',
    },
    dotPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Dot position',
    },
    autoplay: {
      control: 'boolean',
      description: 'Auto play slides',
    },
    dots: {
      control: 'boolean',
      description: 'Show navigation dots',
    },
    arrows: {
      control: 'boolean',
      description: 'Show prev/next arrows',
    },
    infinite: {
      control: 'boolean',
      description: 'Infinite loop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slideStyle = "flex items-center justify-center h-[200px] text-[var(--overlay-control-text)] text-2xl font-bold";

export const ExplorerBase: Story = {
  render: (args: any) => {
    const contentType = args.contentType ?? 'default';
    const arrows = args.arrows;
    const dotPosition = args.dotPosition;
    const autoplay = args.autoplay;
    const effect = args.effect;
    const syncKey = JSON.stringify({ contentType, arrows, dotPosition, autoplay, effect });
    return (
      <div key={syncKey} className="max-w-[600px]">
        {contentType === 'gallery' ? (
          <Carousel autoplay autoplaySpeed={4000} effect="fade">
            <div className="h-[300px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-center text-[var(--overlay-control-text)]">
                <h2 className="text-3xl font-bold mb-2">Welcome</h2>
                <p className="text-lg opacity-80">Discover features</p>
              </div>
            </div>
            <div className="h-[300px] bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <div className="text-center text-[var(--overlay-control-text)]">
                <h2 className="text-3xl font-bold mb-2">Fast & Reliable</h2>
                <p className="text-lg opacity-80">Built for performance</p>
              </div>
            </div>
          </Carousel>
        ) : contentType === 'custom-dots' ? (
          <Carousel
            customDot={({ index, active }) => (
              <span className={`w-3 h-3 rounded-full transition-all ${active ? 'bg-[var(--color-primary)] scale-125' : 'bg-[var(--color-border-primary)]'}`} />
            )}
          >
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
          </Carousel>
        ) : (
          <Carousel arrows={arrows} dotPosition={dotPosition} autoplay={autoplay} effect={effect}>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
            <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
          </Carousel>
        )}
      </div>
    );
  },
};

// Basic Carousel
export const Default: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel {...args}>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
      </Carousel>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</Carousel>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// With Autoplay
export const Autoplay: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel {...args}>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
      </Carousel>
    </div>
  ),
  args: {
    autoplay: true,
    autoplaySpeed: 2000,
  },
  parameters: {
    docs: {
      source: {
        code: `<Carousel autoplay autoplaySpeed={2000}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</Carousel>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Fade Effect
export const FadeEffect: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel {...args}>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
      </Carousel>
    </div>
  ),
  args: {
    effect: 'fade',
  },
  parameters: {
    docs: {
      source: {
        code: `<Carousel effect="fade">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</Carousel>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Without Arrows
export const WithoutArrows: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel {...args}>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
      </Carousel>
    </div>
  ),
  args: {
    arrows: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<Carousel arrows={false}>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
  <div>Slide 4</div>
</Carousel>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

// Dot Positions
export const DocsDotPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Top</p>
        <Carousel dotPosition="top">
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>1</div>
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>2</div>
        </Carousel>
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Bottom (Default)</p>
        <Carousel dotPosition="bottom">
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>1</div>
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>2</div>
        </Carousel>
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Left</p>
        <Carousel dotPosition="left">
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>1</div>
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>2</div>
        </Carousel>
      </div>
      <div>
        <p className="text-sm text-[var(--color-tertiary)] mb-2">Right</p>
        <Carousel dotPosition="right">
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>1</div>
          <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>2</div>
        </Carousel>
      </div>
    </div>
  ),

  parameters: {
    docsOnly: true,
    docs: {
      source: {
        code: `<Carousel dotPosition="top">
  <div>1</div>
  <div>2</div>
</Carousel>

<Carousel dotPosition="bottom">
  <div>1</div>
  <div>2</div>
</Carousel>

<Carousel dotPosition="left">
  <div>1</div>
  <div>2</div>
</Carousel>

<Carousel dotPosition="right">
  <div>1</div>
  <div>2</div>
</Carousel>`,
        language: 'tsx',
        type: 'code',
      },
    },
  },
}