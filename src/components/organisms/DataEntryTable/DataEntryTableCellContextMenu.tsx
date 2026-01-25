"use client";

import React, { useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { createPortal } from 'react-dom';

export interface ContextMenuOption {
  label: string;
  onClick: () => void;
}

export interface DataEntryTableCellContextMenuProps {
  options: ContextMenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
}

export const DataEntryTableCellContextMenu: React.FC<DataEntryTableCellContextMenuProps> = ({
  options,
  position,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (options.length === 0) return null;

  const menuContent = (
    <div
      ref={menuRef}
      className={cn(
        "absolute z-[10000]",
        "bg-[var(--bg-primary)]",
        "border border-[var(--border-primary)]",
        "rounded-[var(--radius-md)]",
        "shadow-lg",
        "min-w-[var(--x20,80px)]",
        "overflow-hidden"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.onClick();
            onClose();
          }}
          className={cn(
            "w-full px-[var(--spacing-x3)] py-[var(--spacing-x2)]",
            "text-left leading-[1.4] font-normal font-sans",
            "text-[length:var(--font-size-md)]",
            "text-[var(--primary)]",
            "hover:bg-[var(--bg-secondary)]",
            "transition-colors duration-150",
            "border-0 bg-transparent cursor-pointer"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return createPortal(menuContent, document.body);
};

DataEntryTableCellContextMenu.displayName = 'DataEntryTableCellContextMenu';

