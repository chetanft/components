"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Button } from '../../atoms/Button/Button';
import { Slot, type ComposableProps } from '../../../lib/slot';

export interface BackTopProps extends ComposableProps<'div'> {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  /** Glass morphism variant */
  glass?: GlassVariant;
  className?: string;
  style?: React.CSSProperties;
}

export const BackTop = React.forwardRef<HTMLDivElement, BackTopProps>(({
  visibilityHeight = 400,
  onClick,
  children,
  glass,
  className,
  style,
  asChild,
  ...props
}, ref) => {
  const resolvedGlass = useResolvedGlass(glass);
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

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      ref={ref}
      className={cn(
        "fixed right-10 bottom-10 z-50 transition-all duration-300 hover:scale-110",
        resolvedGlass && "rounded-full",
        resolvedGlass && getGlassClasses(resolvedGlass),
        className
      )}
      style={style}
      onClick={scrollToTop}
      {...props}
    >
      {children || (
        <Button
          variant="primary"
          size="md"
          icon="arrow-up"
          iconPosition="only"
          className={cn("rounded-full shadow-lg", resolvedGlass && "bg-transparent border-0")}
        />
      )}
    </Comp>
  );
});

BackTop.displayName = 'BackTop';
