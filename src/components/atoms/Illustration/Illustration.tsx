import React from 'react';
import { cn } from '../../../lib/utils';

const illustrationSources = {
  overview: 'https://www.figma.com/api/mcp/asset/1135fea1-e788-4979-b5a2-ce58f7c8b2b9',
  insights: 'https://www.figma.com/api/mcp/asset/5a1c4925-2af3-4f1e-9b0f-0ad48441cf3b',
  workspace: 'https://www.figma.com/api/mcp/asset/e1a9e969-1790-40b1-b9be-ac8637cd668b',
  reports: 'https://www.figma.com/api/mcp/asset/1d030ded-5838-4411-9c7a-b1778903a960',
};

export type IllustrationVariant = keyof typeof illustrationSources;

export type IllustrationSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IllustrationProps {
  variant?: IllustrationVariant;
  src?: string;
  alt?: string;
  size?: IllustrationSize;
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'transparent' | 'subtle';
  className?: string;
}

const sizeClasses: Record<IllustrationSize, string> = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
  xl: 'w-[352px] h-[352px]',
};

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-[12px]',
  md: 'rounded-[16px]',
  lg: 'rounded-[20px]',
};

export const Illustration: React.FC<IllustrationProps> = ({
  variant = 'overview',
  src,
  alt = 'Illustration',
  size = 'md',
  rounded = 'md',
  background = 'subtle',
  className,
}) => {
  const resolvedSrc = src ?? illustrationSources[variant];

  return (
    <figure
      className={cn(
        'overflow-hidden border border-[var(--border-primary)] flex items-center justify-center',
        background === 'subtle' ? 'bg-[var(--bg-secondary)]' : 'bg-transparent',
        sizeClasses[size],
        roundedClasses[rounded],
        className
      )}
      aria-label={alt}
    >
      {resolvedSrc ? (
        <img src={resolvedSrc} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="text-[var(--tertiary)] text-sm">No illustration</div>
      )}
    </figure>
  );
};

Illustration.displayName = 'Illustration';

