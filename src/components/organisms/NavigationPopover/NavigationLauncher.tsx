import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavigationPopover, type NavigationPopoverProps } from './NavigationPopover';
import { cn } from '../../../lib/utils';

type Alignment = 'center' | 'top-left';

export interface NavigationLauncherProps
  extends Omit<NavigationPopoverProps, 'open' | 'onClose'> {
  /**
   * Custom trigger render prop. Receives `isOpen` and toggle handlers.
   */
  trigger?: (args: { isOpen: boolean; toggle: () => void }) => React.ReactNode;
  /**
   * Optional className for the popover wrapper when rendered via portal.
   */
  portalClassName?: string;
  /**
   * Whether to render inside a portal (default: true).
   */
  usePortal?: boolean;
  /**
   * When true, the launcher renders nothing until `trigger` returns a node.
   */
  hideDefaultTrigger?: boolean;
  /**
   * Controls how the popover is positioned within the overlay.
   */
  alignment?: Alignment;
  /**
   * Shows a backdrop/scrim behind the popover. Disable for inline header launches.
   */
  showBackdrop?: boolean;
}

export const NavigationLauncher: React.FC<NavigationLauncherProps> = ({
  trigger,
  portalClassName,
  usePortal = true,
  hideDefaultTrigger = false,
  alignment = 'top-left',
  showBackdrop = true,
  ...popoverProps
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  const triggerNode =
    trigger?.({ isOpen: open, toggle }) ??
    (!hideDefaultTrigger && (
      <button
        type="button"
        onClick={toggle}
        aria-label="Open navigation"
        className="rounded-full border border-[var(--border-primary)] p-[10px] bg-[var(--bg-primary)] hover:bg-[var(--border-secondary)] transition"
      >
        <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3h6v6H3zM12 3h6v6h-6zM12 12h6v6h-6zM3 12h6v6H3z"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    ));

  const alignmentClass =
    alignment === 'center'
      ? 'justify-center items-start'
      : 'justify-start items-start';

  const overlay = (
    <div
      className={cn(
        'fixed inset-0 z-[1000]',
        showBackdrop ? 'bg-[var(--bg-secondary)]' : 'bg-transparent',
        portalClassName
      )}
      onClick={close}
    >
      <div className={cn('flex h-full w-full p-6 md:p-10', alignmentClass)}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="max-w-[1200px] w-full"
        >
          <NavigationPopover
            {...popoverProps}
            open={open}
            onClose={close}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {triggerNode}
      {open &&
        (usePortal ? createPortal(overlay, document.body) : overlay)}
    </>
  );
};

NavigationLauncher.displayName = 'NavigationLauncher';

