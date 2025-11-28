"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../lib/utils';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography';
import { Icon } from '../../atoms/Icons';

export interface TourStepProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  cover?: React.ReactNode;
  target?: () => HTMLElement | null; // Function to get target element
  onClose?: () => void;
  nextButtonProps?: { children?: React.ReactNode; onClick?: () => void };
  prevButtonProps?: { children?: React.ReactNode; onClick?: () => void };
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
  steps: TourStepProps[];
  open?: boolean;
  defaultCurrent?: number;
  current?: number;
  onClose?: () => void;
  onChange?: (current: number) => void;
  onFinish?: () => void;
  mask?: boolean;
  type?: 'default' | 'primary'; // Style of tour
  zIndex?: number;
  className?: string;
}

export const Tour: React.FC<TourProps> = ({
  steps,
  open = false,
  defaultCurrent = 0,
  current: controlledCurrent,
  onClose,
  onChange,
  onFinish,
  mask = true,
  zIndex = 1000,
  className,
}) => {
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const current = controlledCurrent !== undefined ? controlledCurrent : internalCurrent;
  const [position, setPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const step = steps[current];

  // Calculate position based on target
  useEffect(() => {
    if (open && step && step.target) {
      const targetEl = step.target();
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        // Simple positioning logic - needs refinement for placements
        // Current implementation: Just highlights the element, centers popover relative to it?
        // Actually for simplicity, we'll implement a basic centered overlay or relative positioning
        // Let's do absolute positioning on page for simplicity in this version
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        setPosition({
          top: rect.top + scrollY,
          left: rect.left + scrollX,
          width: rect.width,
          height: rect.height
        });

        // Scroll into view
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // Fallback to center screen if no target
        setPosition(null);
      }
    }
  }, [open, step]);

  const handleNext = () => {
    if (current < steps.length - 1) {
      const next = current + 1;
      setInternalCurrent(next);
      onChange?.(next);
    } else {
      onFinish?.();
      onClose?.();
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      const prev = current - 1;
      setInternalCurrent(prev);
      onChange?.(prev);
    }
  };

  if (!open || !step) return null;

  // Render Portal
  return createPortal(
    <div className="fixed inset-0 z-[1000]" style={{ zIndex }}>
      {/* Mask */}
      {mask && (
        <div className="absolute inset-0 bg-black/50 transition-all duration-300">
          {/* Cutout logic is complex, simulating with just overlay for now or SVG masking */}
          {/* For high fidelity, we'd use SVG mask. Here simple overlay */}
        </div>
      )}

      {/* Highlight Target (Simple simulation using box-shadow or transparent hole) */}
      {position && (
        <div
          className="absolute transition-all duration-300 pointer-events-none border-2 border-[var(--primary)] rounded-md shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
          style={{
            top: position.top - 4, // Padding
            left: position.left - 4,
            width: position.width + 8,
            height: position.height + 8,
            zIndex: zIndex + 1
          }}
        />
      )}

      {/* Popover */}
      <div
        className={cn(
          "absolute bg-white p-4 rounded-lg shadow-xl w-[300px] z-[1002] animate-in fade-in zoom-in-95 duration-200",
          className
        )}
        style={{
          // Position near the target
          top: position ? position.top + position.height + 12 : '50%',
          left: position ? position.left : '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)'
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <Typography variant="body-primary-semibold" className="m-0 text-base">{step.title}</Typography>
          <button onClick={onClose} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <Icon name="cross" size={16} />
          </button>
        </div>

        {step.description && (
          <div className="mb-4 text-sm text-[var(--text-secondary)]">
            {step.description}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-1 text-xs text-[var(--text-tertiary)]">
            {steps.map((_, idx) => (
              <span key={idx} className={cn("w-2 h-2 rounded-full", idx === current ? "bg-[var(--primary)]" : "bg-[var(--neutral-200)]")} />
            ))}
          </div>
          <div className="flex gap-2">
            {current > 0 && (
              <Button size="xs" variant="secondary" onClick={handlePrev}>Previous</Button>
            )}
            <Button size="xs" variant="primary" onClick={handleNext}>
              {current === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>

        {/* Arrow pointer - skipped for simplicity */}
      </div>
    </div>,
    document.body
  );
};

Tour.displayName = 'Tour';
