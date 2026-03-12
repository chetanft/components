"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { type GlassVariant } from '../../../lib/glass';

export interface AnchorLinkProps {
  href: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  target?: string;
}

export interface AnchorProps {
  affix?: boolean;
  bounds?: number;
  offsetTarget?: () => HTMLElement | Window;
  targetOffset?: number;
  onChange?: (currentActiveLink: string) => void;
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  direction?: 'vertical' | 'horizontal';
  /** Glass morphism variant */
  glass?: GlassVariant;
  /** Anchor links (for composable API) */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AnchorLink — used as a child of Anchor for the composable API.
 */
export const AnchorLink: React.FC<AnchorLinkProps & { active?: boolean; onClick?: (e: React.MouseEvent<HTMLElement>, href: string) => void }> = ({
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
          "block relative transition-all duration-300 py-[var(--spacing-x1)] px-[var(--spacing-x4)] text-sm rounded-md",
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
      {children && <div className="pl-[var(--spacing-x4)]">{children}</div>}
    </div>
  );
};

AnchorLink.displayName = 'AnchorLink';

/** Extract hrefs from AnchorLink children (for scroll-spy in composable mode) */
function extractHrefsFromChildren(children: React.ReactNode): string[] {
  const hrefs: string[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && (child.type as any)?.displayName === 'AnchorLink') {
      const href = (child.props as AnchorLinkProps).href;
      if (href) hrefs.push(href);
      // Recurse into nested AnchorLink children
      if (child.props.children) {
        hrefs.push(...extractHrefsFromChildren(child.props.children));
      }
    }
  });
  return hrefs;
}

export const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>(({
  affix = true,
  bounds = 5,
  offsetTarget: _offsetTarget,
  targetOffset = 0,
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

  // Detect composable children
  const hasComposableChildren = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type as any)?.displayName === 'AnchorLink'
  );

  // Scroll spy logic
  useEffect(() => {
    const allHrefs = extractHrefsFromChildren(children);

    if (allHrefs.length === 0) return;

    const handleScroll = () => {
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [children, bounds, targetOffset, onChange]);

  // Inject active/onClick into composable AnchorLink children
  const renderComposableChildren = (nodes: React.ReactNode): React.ReactNode => {
    return React.Children.map(nodes, (child) => {
      if (React.isValidElement(child) && (child.type as any)?.displayName === 'AnchorLink') {
        const linkProps = child.props as AnchorLinkProps;
        return React.cloneElement(child as React.ReactElement<any>, {
          active: activeLink === linkProps.href,
          onClick: (e: React.MouseEvent<HTMLElement>, href: string) => {
            onClick?.(e, { title: linkProps.title, href });
          },
          children: linkProps.children ? renderComposableChildren(linkProps.children) : undefined,
        });
      }
      return child;
    });
  };

  return (
    <div
      ref={ref}
      className={cn(
        "ft-anchor relative",
        affix ? "sticky top-4" : "",
        direction === 'horizontal' ? "flex flex-row space-x-4" : "flex flex-col",
        className
      )}
      style={style}
      {...props}
    >
      {direction === 'vertical' && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--border-primary)] opacity-50 ml-px" />
      )}

      <div className={cn("relative z-10", direction === 'horizontal' ? "flex gap-[var(--spacing-x2)]" : "flex flex-col gap-[var(--spacing-x1)]")}>
        {hasComposableChildren
          ? renderComposableChildren(children)
          : children
        }
      </div>
    </div>
  );
});

Anchor.displayName = 'Anchor';
