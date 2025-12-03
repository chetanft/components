"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '../../../lib/utils';
// import { getWindow } from '../../../lib/dom'; // Removed unused import

export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  offsetTop?: number;
  offsetBottom?: number;
  target?: () => Window | HTMLElement | null;
  onChange?: (affixed?: boolean) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Simple placeholder for getWindow if not exists
const getDefaultTarget = () => typeof window !== 'undefined' ? window : null;

export const Affix = React.forwardRef<HTMLDivElement, AffixProps>(({
  offsetTop,
  offsetBottom,
  target = getDefaultTarget,
  onChange,
  children,
  className,
  style,
  ...props
}, _ref) => {
  const [affixed, setAffixed] = useState(false);
  const [placeholderStyle, setPlaceholderStyle] = useState<React.CSSProperties>({});
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>({});
  const placeholderRef = useRef<HTMLDivElement>(null);
  const fixedNodeRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!placeholderRef.current) return;

    const targetNode = target();
    if (!targetNode) return;

    const placeholderRect = placeholderRef.current.getBoundingClientRect();
    const targetRect = targetNode === window
      ? { top: 0, bottom: window.innerHeight }
      : (targetNode as HTMLElement).getBoundingClientRect();

    const fixedTop = offsetTop !== undefined ? offsetTop + (targetNode !== window ? targetRect.top : 0) : undefined;
    const fixedBottom = offsetBottom !== undefined ? offsetBottom : undefined;

    let newState = false;
    let newAffixStyle: React.CSSProperties = {};
    let newPlaceholderStyle: React.CSSProperties = {};

    if (fixedTop !== undefined && placeholderRect.top <= fixedTop) {
      newState = true;
      newAffixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderRect.width,
        height: placeholderRect.height,
        zIndex: 100, // Ensure it's above content
      };
      newPlaceholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    } else if (fixedBottom !== undefined && placeholderRect.bottom >= (targetNode === window ? window.innerHeight : targetRect.bottom) - fixedBottom) {
      // Bottom logic is a bit more complex relative to window vs container, simplified here
      newState = true;
      newAffixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderRect.width,
        height: placeholderRect.height,
        zIndex: 100,
      };
      newPlaceholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    }

    // Use functional update to avoid dependency on 'affixed' state
    setAffixed((prevAffixed) => {
      if (newState !== prevAffixed) {
        onChange?.(newState);
        return newState;
      }
      return prevAffixed;
    });

    // Always update style if affixed to handle width changes or scroll
    if (newState) {
      setAffixStyle(newAffixStyle);
      setPlaceholderStyle(newPlaceholderStyle);
    } else {
      setAffixStyle({});
      setPlaceholderStyle({});
    }

  }, [offsetTop, offsetBottom, target, onChange]);

  useEffect(() => {
    const targetNode = target();
    if (!targetNode) return;

    const handleScroll = () => calculatePosition();
    const handleResize = () => calculatePosition();

    targetNode.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      targetNode.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [target, calculatePosition]);

  return (
    <div ref={placeholderRef} style={placeholderStyle} {...props}>
      <div
        ref={fixedNodeRef}
        className={cn(className)}
        style={{ ...style, ...affixStyle }}
      >
        {children}
      </div>
    </div>
  );
});

Affix.displayName = 'Affix';
