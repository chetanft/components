"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Button } from '../../atoms/Button/Button';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  duration?: number; // ms
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const BackTop = React.forwardRef<HTMLDivElement, BackTopProps>(({
  visibilityHeight = 400,
  onClick,
  target,
  duration = 450,
  children,
  className,
  style,
  ...props
}, ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > visibilityHeight);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibilityHeight]);

  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    onClick?.(e);
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed right-10 bottom-10 z-50 cursor-pointer transition-all duration-300 hover:scale-110",
        className
      )}
      style={style}
      onClick={scrollToTop}
      {...props}
    >
      {children || (
        <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[var(--primary-hover)]">
          <Icon name="arrow-up" size={20} />
        </div>
      )}
    </div>
  );
});

BackTop.displayName = 'BackTop';

