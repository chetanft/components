"use client";

import React from 'react';
import { cn } from '../../../../lib/utils';
import { Slot, type ComposableProps } from '../../../../lib/slot';
import { useCardContext } from '../Card.context';

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
 * CardImage - Image/graphic section for Card
 * 
 * Displays an image or graphic at the top of a card with optional
 * overlay actions and aspect ratio control.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Card>
 *   <CardImage 
 *     src="/product.jpg" 
 *     alt="Product photo"
 *     aspectRatio="16/9"
 *     overlayAction={<Button icon="heart" iconPosition="only" />}
 *   />
 *   <CardBody>...</CardBody>
 * </Card>
 * ```
 * 
 * @remarks
 * - Supports `asChild` for custom wrapper elements
 * - Overlay action appears in top-right corner
 * - Default aspect ratio is auto (content-defined)
 */
export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
    ({
        src,
        alt = '',
        aspectRatio = 'auto',
        overlayAction,
        padded = false,
        children,
        className,
        asChild,
        ...props
    }, ref) => {
        const Comp = asChild ? Slot : 'div';

        const aspectRatioClass = {
            'auto': '',
            '16/9': 'aspect-video',
            '4/3': 'aspect-[4/3]',
            '1/1': 'aspect-square',
        }[aspectRatio];

        return (
            <Comp
                ref={ref}
                className={cn(
                    "relative w-full overflow-hidden",
                    "bg-[var(--bg-secondary)]",
                    padded && "p-[var(--spacing-x4)] rounded-t-lg",
                    aspectRatioClass,
                    className
                )}
                {...props}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : children}

                {overlayAction && (
                    <div className="absolute top-[var(--spacing-x2)] right-[var(--spacing-x2)]">
                        {overlayAction}
                    </div>
                )}
            </Comp>
        );
    }
);

CardImage.displayName = 'CardImage';
