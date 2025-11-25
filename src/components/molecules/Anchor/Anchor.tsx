"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export interface AnchorLinkProps {
  href: string;
  title: React.ReactNode;
  children?: React.ReactNode; // For nested links
  className?: string;
  target?: string;
}

export interface AnchorProps {
  items?: AnchorLinkProps[]; // Simplified data structure
  affix?: boolean;
  bounds?: number;
  offsetTarget?: () => HTMLElement | Window;
  targetOffset?: number;
  showInkInFixed?: boolean;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  direction?: 'vertical' | 'horizontal';
  children?: React.ReactNode; // Can be used for custom link rendering structure
  className?: string;
  style?: React.CSSProperties;
}

const AnchorLink: React.FC<AnchorLinkProps & { active?: boolean; onClick?: (e: React.MouseEvent<HTMLElement>, href: string) => void }> = ({
  href,
  title,
  children,
  className,
  active,
  onClick,
  target
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e, href);
  };

  return (
    <div className={cn("ft-anchor-link", className)}>
      <a
        className={cn(
          "block relative transition-all duration-300 py-1 px-4 text-sm rounded-md",
          active 
            ? "text-[var(--primary)] font-medium bg-[var(--primary-bg-subtle)]" 
            : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
        )}
        href={href}
        title={typeof title === 'string' ? title : ''}
        target={target}
        onClick={handleClick}
      >
        {title}
      </a>
      {children && <div className="pl-4">{children}</div>}
    </div>
  );
};

export const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>(({
  items,
  affix = true,
  bounds = 5,
  offsetTarget,
  targetOffset = 0,
  showInkInFixed = false, // Not fully implemented in this simple version
  onChange,
  onClick,
  direction = 'vertical',
  children,
  className,
  style,
  ...props
}, ref) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Helper to render links recursively
  const renderLinks = (links: AnchorLinkProps[]) => {
    return links.map(link => (
      <AnchorLink
        key={link.href}
        {...link}
        active={activeLink === link.href}
        onClick={(e, href) => {
          onClick?.(e, { title: link.title, href });
          // Handle scroll manually if needed or let default behavior work
        }}
      >
        {link.children ? renderLinks(link.children as any) : null}
      </AnchorLink>
    ));
  };

  // Scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      // Simple implementation: find the element that is closest to the top of the viewport
      if (!items) return;
      
      const flattenItems = (arr: AnchorLinkProps[]): string[] => {
        return arr.reduce((acc, item) => {
          acc.push(item.href);
          if (item.children) {
            // @ts-ignore
            acc.push(...flattenItems(item.children));
          }
          return acc;
        }, [] as string[]);
      };

      const allHrefs = flattenItems(items);
      let current = '';
      
      for (const href of allHrefs) {
        if (!href.startsWith('#')) continue;
        const element = document.getElementById(href.substring(1));
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= (targetOffset + bounds + 100) && rect.bottom > 0) { // +100 buffer
             current = href;
             // Don't break, we want the last one that fits the criteria if multiple are visible/close? 
             // Actually usually we want the first one that is "active". 
             // Common logic: first element whose top is <= offset.
          }
        }
      }
      
      // If we found a candidate, verify it's the "best" one. 
      // Actually simple loop: find the one closest to top but still passed it.
      
      // Let's iterate and find the one with rect.top <= offset + bounds with the largest rect.top (closest to top line)
      let maxTop = -Infinity;
      let bestCandidate = '';
      
      for (const href of allHrefs) {
         if (!href.startsWith('#')) continue;
         const element = document.getElementById(href.substring(1));
         if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= (targetOffset + bounds + 50)) {
               if (rect.top > maxTop) {
                  maxTop = rect.top;
                  bestCandidate = href;
               }
            }
         }
      }

      if (bestCandidate && bestCandidate !== activeLink) {
        setActiveLink(bestCandidate);
        onChange?.(bestCandidate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, bounds, targetOffset, activeLink, onChange]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "ft-anchor relative", 
        affix ? "sticky top-4" : "", // Simple sticky implementation for 'affix'
        direction === 'horizontal' ? "flex flex-row space-x-4" : "flex flex-col",
        className
      )}
      style={style}
      {...props}
    >
      {direction === 'vertical' && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--border-primary)] opacity-50 ml-[1px]" />
      )}
      {/* Ink bar could be implemented here */}
      
      <div className={cn("relative z-10", direction === 'horizontal' ? "flex gap-2" : "flex flex-col gap-1")}>
        {items ? renderLinks(items) : children}
      </div>
    </div>
  );
});

Anchor.displayName = 'Anchor';

