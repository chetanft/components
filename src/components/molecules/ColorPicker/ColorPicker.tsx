"use client";

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { createPortal } from 'react-dom';

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  defaultFormat?: 'hex' | 'rgb' | 'hsb';
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
        {showText && <span className="text-sm font-mono text-[var(--text-secondary)]">{value}</span>}
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

