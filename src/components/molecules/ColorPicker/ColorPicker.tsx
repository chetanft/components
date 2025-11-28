"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';

type ColorFormat = 'hex' | 'rgb' | 'hsb';

const normalizeHex = (color: string): string => {
  let hex = color.trim().replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('');
  }
  return `#${hex.padEnd(6, '0').slice(0, 6)}`;
};

const hexToRgb = (color: string): { r: number; g: number; b: number } | null => {
  const normalized = normalizeHex(color).replace('#', '');
  if (normalized.length !== 6 || Number.isNaN(Number(`0x${normalized}`))) {
    return null;
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return null;
  }
  return { r, g, b };
};

const rgbToHsb = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  const brightness = max;
  const saturation = max === 0 ? 0 : delta / max;

  let hue = 0;
  if (delta !== 0) {
    if (max === rn) {
      hue = ((gn - bn) / delta) % 6;
    } else if (max === gn) {
      hue = (bn - rn) / delta + 2;
    } else {
      hue = (rn - gn) / delta + 4;
    }
    hue *= 60;
    if (hue < 0) hue += 360;
  }

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    b: Math.round(brightness * 100),
  };
};

const formatColorValue = (color: string, format: ColorFormat): string => {
  if (format === 'hex') {
    return normalizeHex(color);
  }

  const rgb = hexToRgb(color);
  if (!rgb) {
    return normalizeHex(color);
  }

  if (format === 'rgb') {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  const hsb = rgbToHsb(rgb);
  return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
};

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  defaultFormat?: ColorFormat;
  onChange?: (value: string, hex: string) => void;
  disabled?: boolean;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value: controlledValue,
  defaultValue = '#1677ff',
  defaultFormat = 'hex',
  onChange,
  disabled,
  className,
  showText,
  size = 'md',
}) => {
  const [value, setValue] = useState(controlledValue || defaultValue);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (controlledValue) setValue(controlledValue);
  }, [controlledValue]);

  // Very basic color list for MVP
  const presets = [
    '#f5222d', '#fa8c16', '#fadb14', '#8bbb11', '#52c41a',
    '#13c2c2', '#1677ff', '#2f54eb', '#722ed1', '#eb2f96',
    '#000000', '#ffffff', '#8c8c8c'
  ];

  const handleSelect = (color: string) => {
      setValue(color);
      onChange?.(color, color);
      setOpen(false);
  };

  const displayValue = showText ? formatColorValue(value, defaultFormat) : null;

  return (
    <div className={cn("inline-flex items-center gap-2", className)} ref={containerRef}>
      <button 
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
            "relative border border-[var(--border-primary)] rounded cursor-pointer flex items-center gap-2 p-1 bg-white hover:border-[var(--primary)] transition-colors",
            disabled && "cursor-not-allowed opacity-50 bg-[var(--background-secondary)]",
            size === 'sm' && "h-6 px-1",
            size === 'md' && "h-8 px-2",
            size === 'lg' && "h-10 px-3"
        )}
      >
        <div 
            className="w-5 h-5 rounded border border-[var(--border-secondary)] shadow-sm" 
            style={{ backgroundColor: value }} 
        />
        {displayValue && (
          <span className="text-sm font-mono text-[var(--text-secondary)]">{displayValue}</span>
        )}
      </button>

      {open && (
        // Simple popover implementation - in real app would use proper positioning/portal
        <div className="absolute z-50 mt-2 top-full left-0 bg-white p-3 rounded-lg shadow-xl border border-[var(--border-primary)] min-w-[200px]">
            <div className="grid grid-cols-5 gap-2 mb-3">
                {presets.map(color => (
                    <button
                        key={color}
                        className={cn(
                            "w-6 h-6 rounded border border-transparent hover:scale-110 transition-transform",
                            value === color && "ring-2 ring-[var(--primary)] ring-offset-2"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => handleSelect(color)}
                    />
                ))}
            </div>
            <div className="pt-2 border-t border-[var(--border-secondary)]">
                 <input 
                    type="color" 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange?.(e.target.value, e.target.value);
                    }}
                    className="w-full h-8 cursor-pointer"
                 />
            </div>
            
            {/* Overlay to close */}
            <div 
                className="fixed inset-0 -z-10" 
                onClick={() => setOpen(false)}
            />
        </div>
      )}
    </div>
  );
};

ColorPicker.displayName = 'ColorPicker';
