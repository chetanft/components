"use client";

import { useState, useEffect, useCallback, RefObject } from 'react';

export interface DropdownPosition {
    top: number;
    left: number;
    width: number;
}

export interface UseDropdownPositionOptions {
    /** Reference to the dropdown trigger element */
    dropdownRef: RefObject<HTMLDivElement>;
    /** Whether the dropdown is currently open */
    isOpen: boolean;
    /** Gap between trigger and menu in pixels */
    gap?: number;
}

/**
 * Hook for calculating dropdown menu position
 * 
 * Handles positioning updates on scroll and resize events.
 * Uses fixed positioning for proper portal behavior.
 * 
 * @example
 * ```tsx
 * const { position } = useDropdownPosition({
 *   dropdownRef,
 *   isOpen,
 *   gap: 4
 * });
 * ```
 */
export function useDropdownPosition({
    dropdownRef,
    isOpen,
    gap = 4,
}: UseDropdownPositionOptions) {
    const [position, setPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });

    const updatePosition = useCallback(() => {
        if (isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            // For fixed positioning, use viewport coordinates directly
            setPosition({
                top: rect.bottom + gap,
                left: rect.left,
                width: rect.width,
            });
        }
    }, [isOpen, dropdownRef, gap]);

    useEffect(() => {
        updatePosition();

        if (isOpen) {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isOpen, updatePosition]);

    return { position, updatePosition };
}

/**
 * Hook for managing dropdown portal container
 * 
 * Creates and manages a portal container element for the dropdown menu.
 * Automatically cleans up on unmount.
 * 
 * @example
 * ```tsx
 * const { portalContainer } = useDropdownPortal();
 * 
 * return portalContainer && createPortal(<Menu />, portalContainer);
 * ```
 */
export function useDropdownPortal() {
    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const container = document.createElement('div');
        container.setAttribute('data-dropdown-portal', 'true');
        document.body.appendChild(container);
        setPortalContainer(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return { portalContainer };
}

/**
 * Hook for handling click outside
 * 
 * Detects clicks outside of specified elements and triggers a callback.
 * 
 * @example
 * ```tsx
 * useClickOutside({
 *   refs: [dropdownRef, menuRef],
 *   isActive: isOpen,
 *   onClickOutside: () => setIsOpen(false)
 * });
 * ```
 */
export function useClickOutside({
    refs,
    isActive,
    onClickOutside,
}: {
    refs: RefObject<HTMLElement>[];
    isActive: boolean;
    onClickOutside: () => void;
}) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isOutside = refs.every(ref =>
                ref.current && !ref.current.contains(event.target as Node)
            );

            if (isOutside) {
                onClickOutside();
            }
        };

        if (isActive) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive, refs, onClickOutside]);
}
