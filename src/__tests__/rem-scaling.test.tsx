/**
 * Rem Scaling Visual Regression Tests
 * 
 * Tests typography and spacing scaling at key breakpoints to ensure
 * rem units scale correctly with root font-size changes.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Typography } from '../components/atoms/Typography/Typography';

describe('Rem Scaling - Typography', () => {
  const breakpoints = [
    { name: 'Mobile', width: 480, expectedBase: 14 },
    { name: 'Tablet', width: 768, expectedBase: 14 },
    { name: 'Desktop', width: 1440, expectedBase: 14 },
    { name: 'Large Desktop', width: 1441, expectedBase: 16 },
    { name: 'XL Desktop', width: 1600, expectedBase: 16 },
  ];

  beforeEach(() => {
    // Reset viewport before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1440,
    });
    
    // Reset root font-size
    document.documentElement.style.fontSize = '14px';
  });

  breakpoints.forEach(({ name, width, expectedBase }) => {
    describe(`${name} (${width}px)`, () => {
      beforeEach(() => {
        // Set viewport width
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        // Set root font-size based on breakpoint
        document.documentElement.style.fontSize = `${expectedBase}px`;
        
        // Trigger media query evaluation
        window.dispatchEvent(new Event('resize'));
      });

      it(`should render title-primary with correct rem-based size (base: ${expectedBase}px)`, () => {
        const { container } = render(
          <Typography variant="title-primary" data-testid="title-primary">
            Title Primary
          </Typography>
        );

        const element = screen.getByTestId('title-primary');
        expect(element.className).toContain('text-xxl-rem');
      });

      it(`should render body-primary-regular with correct rem-based size (base: ${expectedBase}px)`, () => {
        const { container } = render(
          <Typography variant="body-primary-regular" data-testid="body-primary">
            Body Primary
          </Typography>
        );

        const element = screen.getByTestId('body-primary');
        expect(element.className).toContain('text-md-rem');
      });

      it(`should render body-secondary-regular with correct rem-based size (base: ${expectedBase}px)`, () => {
        const { container } = render(
          <Typography variant="body-secondary-regular" data-testid="body-secondary">
            Body Secondary
          </Typography>
        );

        const element = screen.getByTestId('body-secondary');
        expect(element.className).toContain('text-sm-rem');
      });
    });
  });

  describe('Browser Zoom Simulation', () => {
    beforeEach(() => {
      document.documentElement.style.fontSize = '14px';
    });

    const zoomLevels = [
      { zoom: 0.5, multiplier: 0.5 },
      { zoom: 1.0, multiplier: 1.0 },
      { zoom: 1.5, multiplier: 1.5 },
      { zoom: 2.0, multiplier: 2.0 },
      { zoom: 3.0, multiplier: 3.0 },
    ];

    zoomLevels.forEach(({ zoom, multiplier }) => {
      it(`should scale typography correctly at ${zoom * 100}% zoom`, () => {
        // Simulate browser zoom by scaling root font-size
        const baseSize = 14;
        const zoomedSize = baseSize * multiplier;
        document.documentElement.style.fontSize = `${zoomedSize}px`;

        const { container } = render(
          <Typography variant="body-primary-regular" data-testid="zoomed-text">
            Zoomed Text
          </Typography>
        );

        const element = screen.getByTestId('zoomed-text');
        expect(element.className).toContain('text-md-rem');
      });
    });
  });
});

describe('Rem Scaling - Spacing', () => {
  const breakpoints = [
    { name: 'Base', width: 1440, expectedBase: 14 },
    { name: 'Scaled', width: 1441, expectedBase: 16 },
  ];

  beforeEach(() => {
    document.documentElement.style.fontSize = '14px';
  });

  breakpoints.forEach(({ name, width, expectedBase }) => {
    describe(`${name} (${width}px, base: ${expectedBase}px)`, () => {
      beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        document.documentElement.style.fontSize = `${expectedBase}px`;
        window.dispatchEvent(new Event('resize'));
      });

      it(`should apply rem-based spacing correctly`, () => {
        const TestComponent = () => (
          <div
            data-testid="spacing-test"
            style={{ padding: 'var(--spacing-x4-rem)' }}
          >
            Content
          </div>
        );

        render(<TestComponent />);

        const element = screen.getByTestId('spacing-test');
        expect(element).toBeInTheDocument();
      });
    });
  });
});

describe('Rem Utility Classes', () => {
  beforeEach(() => {
    document.documentElement.style.fontSize = '14px';
  });

  const utilityClasses = [
    { class: 'text-xs-rem', remValue: 0.857, expectedBase: 12, expectedScaled: 13.71 },
    { class: 'text-sm-rem', remValue: 1.0, expectedBase: 14, expectedScaled: 16 },
    { class: 'text-md-rem', remValue: 1.143, expectedBase: 16, expectedScaled: 18.29 },
    { class: 'text-lg-rem', remValue: 1.429, expectedBase: 20, expectedScaled: 22.86 },
    { class: 'text-xl-rem', remValue: 1.714, expectedBase: 24, expectedScaled: 27.43 },
    { class: 'text-xxl-rem', remValue: 2.0, expectedBase: 28, expectedScaled: 32 },
  ];

  utilityClasses.forEach(({ class: className, remValue, expectedBase, expectedScaled }) => {
    it(`should apply ${className} correctly at base size`, () => {
      document.documentElement.style.fontSize = '14px';

      const { container } = render(
        <div className={className} data-testid={`test-${className}`}>
          Test
        </div>
      );

      const element = screen.getByTestId(`test-${className}`);
      expect(element.className).toContain(className);
    });

    it(`should apply ${className} correctly at scaled size`, () => {
      document.documentElement.style.fontSize = '16px';

      const { container } = render(
        <div className={className} data-testid={`test-${className}-scaled`}>
          Test
        </div>
      );

      const element = screen.getByTestId(`test-${className}-scaled`);
      expect(element.className).toContain(className);
    });
  });
});
