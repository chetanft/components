"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';

export interface AnchorLinkProps {
  href: string;
  title: React.ReactNode;
  children?: React.ReactNode; // For nested links
  className?: string;
  target?: string;
}

export interface AnchorProps {
  /**
   * Anchor items array (for declarative API)
   * @deprecated Use AnchorLink components as children instead
   */
  items?: AnchorLinkProps[]; // Simplified data structure
  affix?: boolean;
  bounds?: number;
  offsetTarget?: () => HTMLElement | Window;
  targetOffset?: number;
  /**
   * Show ink in fixed mode
   * @deprecated This prop is not fully implemented and will be removed. Use custom styling for ink.
   */
  showInkInFixed?: boolean;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  direction?: 'vertical' | 'horizontal';
  /** Glass morphism variant */
  glass?: GlassVariant;
  /** Anchor links (for composable API) */
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
  offsetTarget: _offsetTarget,
  targetOffset = 0,
  showInkInFixed: _showInkInFixed = false, // Not fully implemented in this simple version
  onChange,
  onClick,
  direction = 'vertical',
  glass,
  children,
  className,
  style,
  ...props
}, ref) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const resolvedGlass = useResolvedGlass(glass);
  
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
            // @ts-expect-error - recursive children typing
            acc.push(...flattenItems(item.children));
          }
          return acc;
        }, [] as string[]);
      };

      const allHrefs = flattenItems(items);

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

      // Use functional update to avoid dependency on 'activeLink' state
      if (bestCandidate) {
        setActiveLink((prevActiveLink) => {
          if (bestCandidate !== prevActiveLink) {
            onChange?.(bestCandidate);
            return bestCandidate;
          }
          return prevActiveLink;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, bounds, targetOffset, onChange]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "ft-anchor relative",
        affix ? "sticky top-4" : "", // Simple sticky implementation for 'affix'
        direction === 'horizontal' ? "flex flex-row space-x-4" : "flex flex-col",
        getGlassClasses(resolvedGlass, '', ''),
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
