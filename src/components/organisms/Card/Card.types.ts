import React from 'react';
import { ComposableProps } from '../../../lib/slot';

/**
 * Card Component Props
 */
export interface CardProps extends Omit<ComposableProps<'div'>, 'title' | 'content'> {
    /** Card content (for composable API) */
    children?: React.ReactNode;
    /** Visual style variant */
    variant?: 'default' | 'elevated' | 'outlined';
    /** Card size affecting padding */
    size?: 'sm' | 'md' | 'lg';
    /** Show border */
    bordered?: boolean;
    /** Add hover effect */
    hoverable?: boolean;
    /** Loading state - shows skeleton */
    loading?: boolean;

    // Legacy props (deprecated - will be removed in v4.0)
    /** @deprecated Use CardHeader > CardTitle instead */
    title?: React.ReactNode;
    /** @deprecated Use children inside CardBody instead */
    content?: React.ReactNode;
    /** @deprecated Use CardFooter > CardActions instead */
    actions?: React.ReactNode[];
    /** @deprecated Use CardImage component instead */
    cover?: React.ReactNode;
    /** @deprecated Use composition instead */
    extra?: React.ReactNode;
}

/**
 * CardMeta Props
 */
export interface CardMetaProps extends ComposableProps<'div'> {
    /** Avatar element */
    avatar?: React.ReactNode;
}

/**
 * CardImage Props
 */
export interface CardImageProps extends ComposableProps<'div'> {
    /** Image source URL */
    src?: string;
    /** Alt text for image */
    alt?: string;
    /** Aspect ratio */
    aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1';
    /** Show overlay action button */
    overlayAction?: React.ReactNode;
    /** Add padding around image */
    padded?: boolean;
}

/**
 * CardSkeleton Props
 */
export interface CardSkeletonProps {
    /** Size variant for skeleton */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}
