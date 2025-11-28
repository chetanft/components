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

const slideStyle = "flex items-center justify-center h-[200px] text-white text-2xl font-bold";

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
};

// Dot Positions
export const DotPositions: Story = {
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
};

// Without Infinite Loop
export const FiniteLoop: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel {...args}>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>First Slide</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Middle Slide</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Last Slide</div>
      </Carousel>
      <p className="text-sm text-[var(--color-tertiary)] mt-2">Navigation stops at first/last slide</p>
    </div>
  ),
  args: {
    infinite: false,
  },
};

// Image Gallery
export const ImageGallery: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[800px]">
      <Carousel {...args}>
        <div className="h-[400px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome to Our Platform</h2>
            <p className="text-lg opacity-80">Discover amazing features</p>
          </div>
        </div>
        <div className="h-[400px] bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Fast & Reliable</h2>
            <p className="text-lg opacity-80">Built for performance</p>
          </div>
        </div>
        <div className="h-[400px] bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-2">Get Started Today</h2>
            <p className="text-lg opacity-80">Join thousands of users</p>
          </div>
        </div>
      </Carousel>
    </div>
  ),
  args: {
    autoplay: true,
    autoplaySpeed: 4000,
    effect: 'fade',
  },
};

// Custom Dots
export const CustomDots: Story = {
  render: (args: React.ComponentProps<typeof Carousel>) => (
    <div className="max-w-[600px]">
      <Carousel
        {...args}
        customDot={({ index, active }) => (
          <span
            className={`w-3 h-3 rounded-full transition-all ${active ? 'bg-[var(--color-primary)] scale-125' : 'bg-[var(--color-border-primary)]'
              }`}
          />
        )}
      >
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-primary)' }}>Slide 1</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-positive)' }}>Slide 2</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-warning)' }}>Slide 3</div>
        <div className={slideStyle} style={{ backgroundColor: 'var(--color-critical)' }}>Slide 4</div>
      </Carousel>
    </div>
  ),
};

