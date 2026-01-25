import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker } from './ColorPicker';

describe('ColorPicker Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<ColorPicker />);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('renders with default value', () => {
      render(<ColorPicker defaultValue="#1677ff" />);
      const colorSwatch = screen.getByRole('button').querySelector('div[style*="background-color"]');
      expect(colorSwatch).toHaveStyle({ backgroundColor: '#1677ff' });
    });

    it('renders default presets when opened', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Check for default preset colors
      const presetButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('div[style*="background-color"]') && 
        btn !== button
      );
      expect(presetButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Presets', () => {
    it('renders custom presets when provided', async () => {
      const user = userEvent.setup();
      const customPresets = ['#42bdbd', '#0828f7', '#1793e8'];
      render(<ColorPicker presets={customPresets} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Check that custom preset colors are rendered
      const presetButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('div[style*="background-color"]') && 
        btn !== button
      );
      expect(presetButtons.length).toBe(customPresets.length);
    });

    it('uses default presets when presets prop is not provided', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Default presets should be rendered (13 colors)
      const presetButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('div[style*="background-color"]') && 
        btn !== button
      );
      expect(presetButtons.length).toBe(13);
    });

    it('allows selecting custom preset color', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      const customPresets = ['#42bdbd', '#0828f7'];
      render(<ColorPicker presets={customPresets} onChange={handleChange} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Find and click a preset button
      const presetButtons = screen.getAllByRole('button').filter(btn => 
        btn.querySelector('div[style*="background-color"]') && 
        btn !== button
      );
      
      if (presetButtons.length > 0) {
        await user.click(presetButtons[0]);
        expect(handleChange).toHaveBeenCalled();
      }
    });
  });

  describe('Interactions', () => {
    it('opens popover when button is clicked', async () => {
      const user = userEvent.setup();
      render(<ColorPicker />);
      const button = screen.getByRole('button');
      
      await user.click(button);
      
      // Popover should be visible (contains color input)
      const colorInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      expect(colorInput).toBeInTheDocument();
      expect(colorInput.type).toBe('color');
    });

    it('calls onChange when color is selected', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(<ColorPicker onChange={handleChange} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const colorInput = screen.getByRole('textbox', { hidden: true }) as HTMLInputElement;
      await user.type(colorInput, '#ff0000');
      
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
