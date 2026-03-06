"use client";

import React from 'react';
import { cn } from '../../../lib/utils';
import { getGlassClasses, useResolvedGlass, type GlassVariant } from '../../../lib/glass';
import { Typography } from '../../atoms/Typography';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';
import { Button } from '../../atoms/Button/Button';
import { Skeleton } from '../../atoms/Skeleton';
import { Slot, type ComposableProps } from '../../../lib/slot';

// ---------------------------------------------------------------------------
// CardMeta (legacy)
// ---------------------------------------------------------------------------

export interface CardMetaProps {
    avatar?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const CardMeta: React.FC<CardMetaProps> = ({ avatar, title, description, className, style }) => (
    <div className={cn("flex gap-[var(--spacing-x4)] items-start", className)} style={style}>
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex flex-col gap-[var(--spacing-x1)] w-full">
            {title && (
                <div className="text-base font-semibold text-[var(--primary)] leading-tight">{title}</div>
            )}
            {description && (
                <div className="text-sm text-[var(--secondary)]">{description}</div>
            )}
        </div>
    </div>
);

// ---------------------------------------------------------------------------
// CardElements — Figma ".card_elements" component
//
// Figma structure (all 3 types):
//   <div.card_elements>           ← full-width, flex, items-center, justify-between
//     <div.display-block>         ← flex-1, gap-x5, px-x5
//       <div.content-left>        ← flex-1, flex-col
//       <div.content-right>       ← flex-1, flex-col
//
// Three types:
//   Eyebrow — left/right each hold a text or badge (body-primary-regular md)
//   Header  — left holds title (display-primary lg 600) + sub-text (body-secondary-regular sm)
//             right holds secondary text
//   Body    — left holds statistic value (display-primary lg) + label (body-secondary-medium sm)
//             right holds read-only label (body-secondary-medium sm) + text (body-primary-regular md)
// ---------------------------------------------------------------------------

export interface CardElementsProps {
    type?: 'Eyebrow' | 'Header' | 'Body';
    /** Eyebrow: left content */
    leftContent?: React.ReactNode;
    /** Eyebrow: right content */
    rightContent?: React.ReactNode;
    /** Header: main title (lg, semibold) */
    headerTitle?: React.ReactNode;
    /** Header: sub text below title */
    headerSubText?: React.ReactNode;
    /** Header: arrow icon on right */
    showArrowIcon?: boolean;
    /** Body: large value text (left column) */
    statisticValue?: React.ReactNode;
    /** Body: label below value (left column) */
    statisticLabel?: React.ReactNode;
    /** Body: label text (right column) */
    readOnlyLabel?: React.ReactNode;
    /** Body: value text (right column) */
    readOnlyText?: React.ReactNode;
    className?: string;
    /** @deprecated Use leftContent/rightContent instead */
    eyebrowBadges?: React.ReactNode[];
}

const CardElements: React.FC<CardElementsProps> = ({
    type = 'Eyebrow',
    leftContent,
    rightContent,
    eyebrowBadges,
    headerTitle,
    headerSubText,
    showArrowIcon = false,
    statisticValue,
    statisticLabel,
    readOnlyLabel,
    readOnlyText,
    className
}) => {
    // Backward compat: map eyebrowBadges to left/right content
    const resolvedLeft = leftContent ?? (eyebrowBadges?.[0] ?? null);
    const resolvedRight = rightContent ?? (eyebrowBadges?.[1] ?? null);

    return (
        <div className={cn(
            "flex items-center justify-between w-full",
            className
        )}>
            {/* Display block — the two-column Figma pattern */}
            <div className="flex flex-1 gap-[var(--spacing-x5)] items-start min-h-px min-w-px px-[var(--spacing-x5)]">
                {/* Left content column */}
                <div className="flex flex-1 flex-col gap-[var(--spacing-x1)] items-start justify-center min-h-px min-w-px">
                    {type === 'Eyebrow' && resolvedLeft && (
                        <div className="flex flex-col gap-0 items-start justify-center w-full">
                            <Typography variant="body-primary-regular" className="text-[var(--primary)]">
                                {resolvedLeft}
                            </Typography>
                        </div>
                    )}
                    {type === 'Header' && (
                        <div className="flex flex-col gap-[var(--spacing-x1)] items-start justify-center w-full">
                            {headerTitle && (
                                <Typography variant="display-primary" className="text-[var(--primary)]">
                                    {headerTitle}
                                </Typography>
                            )}
                            {headerSubText && (
                                <Typography variant="body-secondary-regular" className="text-[var(--secondary)]">
                                    {headerSubText}
                                </Typography>
                            )}
                        </div>
                    )}
                    {type === 'Body' && (
                        <div className="flex flex-col gap-[var(--spacing-x2)] items-start justify-center w-full">
                            {statisticValue && (
                                <Typography variant="display-primary" className="text-[var(--primary)]">
                                    {statisticValue}
                                </Typography>
                            )}
                            {statisticLabel && (
                                <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                                    {statisticLabel}
                                </Typography>
                            )}
                        </div>
                    )}
                </div>

                {/* Right content column */}
                <div className="flex flex-1 flex-col gap-[var(--spacing-x1)] items-start justify-center min-h-px min-w-px">
                    {type === 'Eyebrow' && resolvedRight && (
                        <div className="flex flex-col gap-0 items-start justify-center w-full">
                            <Typography variant="body-primary-regular" className="text-[var(--primary)]">
                                {resolvedRight}
                            </Typography>
                        </div>
                    )}
                    {type === 'Header' && showArrowIcon && (
                        <div className="flex items-center justify-end w-full">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[var(--primary)]">
                                <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    )}
                    {type === 'Body' && (readOnlyLabel || readOnlyText) && (
                        <div className="flex flex-col gap-[var(--spacing-x2)] items-start justify-center w-full">
                            {readOnlyLabel && (
                                <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                                    {readOnlyLabel}
                                </Typography>
                            )}
                            {readOnlyText && (
                                <Typography variant="body-primary-regular" className="text-[var(--primary)]">
                                    {readOnlyText}
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// CardFooterInternal — Figma ".card_footer" component
//
// Figma structure:
//   <div.card_footer>              ← flex-col, w-full
//     <Divider>                    ← full-width line
//     <div.footer-container>       ← flex, gap-x4, items-center, py-x3, px-x5 (if padding)
//       <div.display-block-left>   ← flex-1, text content
//       <div.display-block-right>  ← flex-1, text/button content
// ---------------------------------------------------------------------------

export interface CardFooterInternalProps {
    padding?: boolean;
    footerText?: React.ReactNode;
    footerButton?: React.ReactNode;
    className?: string;
}

const CardFooterInternal: React.FC<CardFooterInternalProps> = ({
    padding = true,
    footerText,
    footerButton,
    className
}) => {
    return (
        <div className={cn(
            "flex flex-col items-start pt-0 relative w-full",
            className
        )}>
            <Divider type="primary" className="w-full" />

            {/* Footer Container — two-column display block */}
            <div className={cn(
                "flex gap-[var(--spacing-x4)] items-center w-full py-[var(--spacing-x3)]",
                padding ? "px-[var(--spacing-x5)]" : ""
            )}>
                {/* Left display block */}
                <div className="flex flex-1 gap-0 items-start min-h-px min-w-px px-0">
                    {footerText && (
                        <div className="flex flex-col gap-0 items-start justify-center">
                            <Typography variant="body-primary-regular" className="text-[var(--primary)]">
                                {footerText}
                            </Typography>
                        </div>
                    )}
                </div>

                {/* Right display block */}
                <div className="flex flex-1 gap-0 items-start justify-end min-h-px min-w-px px-0">
                    {footerButton && (
                        <div className="flex flex-col gap-0 items-end justify-center">
                            {footerButton}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ---------------------------------------------------------------------------
// CardGraphic — Figma ".card_graphic" component
//
// Figma structure:
//   Image (no padding): bg secondary, h-10.9375rem, full-bleed
//   Image (padding):    bg white, border, h-10.9375rem, px-x4, rounded top corners, image rounded-x2
//   Logo (padding):     bg white, border, flex-center, courier text
//   Icon (padding):     bg white, border, pt-x4 px-x4, small x4 icon
//   overlayAction:      absolute-positioned star button in top-right
// ---------------------------------------------------------------------------

export interface CardGraphicProps {
    padding?: boolean;
    overlayAction?: boolean;
    graphic?: 'Image' | 'Logo' | 'Icon';
    imageUrl?: string;
    logo?: React.ReactNode;
    icon?: React.ReactNode;
    overlayButton?: React.ReactNode;
    className?: string;
}

const CardGraphic: React.FC<CardGraphicProps> = ({
    padding = false,
    overlayAction = false,
    graphic = 'Image',
    imageUrl,
    logo,
    icon,
    overlayButton,
    className
}) => {
    const isImage = graphic === 'Image';
    const isLogo = graphic === 'Logo';
    const isIcon = graphic === 'Icon';

    return (
        <div className={cn(
            "border border-[var(--border-secondary)] border-solid flex flex-col justify-center relative w-full",
            // Image variants
            isImage && !padding && "bg-[var(--bg-secondary)] h-[10.9375rem] items-center",
            isImage && padding && "bg-[var(--bg-primary)] h-[10.9375rem] items-center pt-0 px-[var(--spacing-x4)] rounded-tl-[var(--radius-md)] rounded-tr-[var(--radius-md)]",
            // Logo variant
            isLogo && padding && "bg-[var(--bg-primary)] h-16 items-start pt-[var(--spacing-x4)] px-[var(--spacing-x4)] rounded-tl-[var(--radius-md)] rounded-tr-[var(--radius-md)]",
            isLogo && !padding && "bg-[var(--bg-primary)] items-center justify-center",
            // Icon variant
            isIcon && padding && "bg-[var(--bg-primary)] items-start pt-[var(--spacing-x4)] px-[var(--spacing-x4)] rounded-tl-[var(--radius-md)] rounded-tr-[var(--radius-md)]",
            isIcon && !padding && "bg-[var(--bg-primary)] items-start",
            className
        )}>
            {/* Image graphic */}
            {isImage && imageUrl && (
                <div className={cn(
                    "flex-1 min-h-px min-w-px relative w-full",
                    padding && "rounded-[var(--radius-md)]"
                )}>
                    <div className={cn(
                        "absolute inset-0 overflow-hidden pointer-events-none",
                        padding && "rounded-[var(--radius-md)]"
                    )}>
                        <img
                            src={imageUrl}
                            alt=""
                            className="absolute h-full left-0 max-w-none top-0 w-full object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Overlay action button */}
            {overlayAction && isImage && (
                <div className={cn(
                    "absolute flex items-center justify-center rounded-full size-[var(--spacing-x10)]",
                    padding ? "right-[var(--spacing-x6)] top-[var(--spacing-x6)]" : "right-[var(--spacing-x2)] top-[var(--spacing-x2)]"
                )}>
                    {overlayButton ?? (
                        <Button variant="primary" size="md" icon="add" iconPosition="only" />
                    )}
                </div>
            )}

            {/* Logo graphic */}
            {isLogo && logo && (
                <div className="flex flex-1 flex-col items-center justify-center min-h-px min-w-px w-full">
                    {logo}
                </div>
            )}

            {/* Icon graphic */}
            {isIcon && icon && (
                <div className="overflow-clip shrink-0 size-4">
                    {icon}
                </div>
            )}
        </div>
    );
};

// ---------------------------------------------------------------------------
// Card — main component
// ---------------------------------------------------------------------------

export interface CardProps extends Omit<ComposableProps<'div'>, 'title' | 'content'> {
    children?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    hoverable?: boolean;
    loading?: boolean;
    size?: 'sm' | 'md';
    actions?: React.ReactNode[];
    cover?: React.ReactNode;

    /** Card content variant matching Figma */
    contentVariant?: 'Basic' | 'Advanced';

    // Figma card sections
    /** Eyebrow: left content (badge, text, etc.) */
    eyebrowLeft?: React.ReactNode;
    /** Eyebrow: right content (badge, text, etc.) */
    eyebrowRight?: React.ReactNode;
    /** Header: main title text */
    headerTitle?: React.ReactNode;
    /** Header: sub text below title */
    headerSubText?: React.ReactNode;
    /** Header: show arrow icon on right */
    showArrowIcon?: boolean;
    /** Body sections: array of statistic/read-only row pairs */
    bodySections?: Array<{
        statisticValue?: React.ReactNode;
        statisticLabel?: React.ReactNode;
        readOnlyLabel?: React.ReactNode;
        readOnlyText?: React.ReactNode;
    }>;
    /** Footer: left text */
    footerText?: React.ReactNode;
    /** Footer: right button/element */
    footerButton?: React.ReactNode;
    /** Show footer section */
    showFooter?: boolean;
    /** Show eyebrow section */
    showEyebrow?: boolean;
    /** Graphic configuration (Advanced variant) */
    graphic?: CardGraphicProps;
    /** Glass effect */
    glass?: GlassVariant;

    /** @deprecated Use eyebrowLeft/eyebrowRight instead */
    eyebrowBadges?: React.ReactNode[];
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    bordered = true,
    hoverable = false,
    loading = false,
    size = 'md',
    className,
    children,
    asChild,
    contentVariant = 'Basic',
    eyebrowLeft,
    eyebrowRight,
    eyebrowBadges,
    headerTitle,
    headerSubText,
    showArrowIcon = false,
    bodySections,
    footerText,
    footerButton,
    showFooter = true,
    showEyebrow = true,
    graphic,
    glass,
    ...props
}, ref) => {
    const resolvedGlass = useResolvedGlass(glass);

    // Backward compat: map eyebrowBadges to left/right
    const resolvedEyebrowLeft = eyebrowLeft ?? eyebrowBadges?.[0] ?? null;
    const resolvedEyebrowRight = eyebrowRight ?? eyebrowBadges?.[1] ?? null;
    const hasEyebrow = showEyebrow && (resolvedEyebrowLeft || resolvedEyebrowRight);
    const hasFooter = showFooter && (footerText || footerButton);
    const isAdvanced = contentVariant === 'Advanced';

    // Check if using composable API (has children with Card sub-components)
    const hasComposableChildren = React.Children.toArray(children).some((child: any) =>
        child?.type?.displayName?.startsWith('Card')
    );

    // Composable API path
    if (hasComposableChildren) {
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp
                ref={ref}
                data-inspector-root
                className={cn(
                    getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-secondary)] border-solid"),
                    "relative rounded-[var(--spacing-x2)] flex flex-col overflow-hidden",
                    className
                )}
                {...props}
            >
                {children}
            </Comp>
        );
    }

    const isSmall = size === 'sm';

    const renderLoading = () => (
        <div className="p-[var(--spacing-x6)]">
            <Skeleton height="var(--spacing-x6)" width="30%" className="mb-[var(--spacing-x4)]" />
            <Skeleton height="var(--spacing-x4)" className="mb-[var(--spacing-x2)]" />
            <Skeleton height="var(--spacing-x4)" className="mb-[var(--spacing-x2)]" />
            <Skeleton height="var(--spacing-x4)" />
        </div>
    );

    // Figma-aligned declarative structure
    const hasNewStructure = hasEyebrow || headerTitle || bodySections || hasFooter || graphic;

    if (hasNewStructure) {
        const Comp = asChild ? Slot : 'div';
        return (
            <Comp
                ref={ref}
                data-inspector-root
                className={cn(
                    getGlassClasses(resolvedGlass, "bg-[var(--bg-primary)]", "border border-[var(--border-secondary)] border-solid"),
                    "relative rounded-[var(--spacing-x2)] flex flex-col gap-0 items-start justify-end overflow-clip p-0",
                    isAdvanced && "shadow-[var(--shadow-md)]",
                    className
                )}
                {...props}
            >
                {/* --- Advanced: Graphic at top --- */}
                {isAdvanced && graphic && (
                    <>
                        <CardGraphic {...graphic} />
                        <Spacer size="x5" />
                    </>
                )}

                {/* --- Basic: leading spacer --- */}
                {!isAdvanced && <Spacer size="x5" />}

                {/* --- Eyebrow Section --- */}
                {hasEyebrow && (
                    <>
                        <CardElements
                            type="Eyebrow"
                            leftContent={resolvedEyebrowLeft}
                            rightContent={resolvedEyebrowRight}
                        />
                        <Spacer size="x5" />
                    </>
                )}

                {/* --- Advanced: eyebrow after graphic, then spacer --- */}
                {isAdvanced && !hasEyebrow && <Spacer size="x5" />}

                {/* --- Header Section --- */}
                {headerTitle && (
                    <>
                        <CardElements
                            type="Header"
                            headerTitle={headerTitle}
                            headerSubText={headerSubText}
                            showArrowIcon={showArrowIcon}
                        />
                        <Spacer size="x5" />
                    </>
                )}

                {/* --- Body Sections --- */}
                {bodySections && bodySections.map((section, idx) => (
                    <React.Fragment key={idx}>
                        <CardElements
                            type="Body"
                            statisticValue={section.statisticValue}
                            statisticLabel={section.statisticLabel}
                            readOnlyLabel={section.readOnlyLabel}
                            readOnlyText={section.readOnlyText}
                        />
                        <Spacer size="x5" />
                    </React.Fragment>
                ))}

                {/* --- Footer Section --- */}
                {hasFooter && (
                    <>
                        <CardFooterInternal
                            padding={true}
                            footerText={footerText}
                            footerButton={footerButton}
                        />
                        <Spacer size="x5" />
                    </>
                )}
            </Comp>
        );
    }

    // Simple card with body content only
    const Comp = asChild ? Slot : 'div';
    return (
        <Comp
            ref={ref}
            data-inspector-root
            className={cn(
                resolvedGlass
                    ? getGlassClasses(resolvedGlass)
                    : cn("bg-[var(--color-bg-primary)]", bordered ? "border border-[var(--border-primary)]" : ""),
                "rounded-[var(--spacing-x2)] transition-all duration-200 flex flex-col overflow-hidden",
                hoverable ? "hover:shadow-lg cursor-pointer" : !resolvedGlass ? "shadow-sm" : "",
                className
            )}
            {...props}
        >
            <div className={cn("flex-1", isSmall ? "p-[var(--spacing-x3)]" : "p-[var(--spacing-x6)]")}>
                {loading ? renderLoading() : children}
            </div>
        </Comp>
    );
});
Card.displayName = 'Card';

// Legacy exports (kept for backward compatibility)
(Card as any).Meta = CardMeta;
(Card as any).Elements = CardElements;
(Card as any).Footer = CardFooterInternal;
(Card as any).Graphic = CardGraphic;

export { CardMeta, CardElements, CardFooterInternal as CardFooter, CardGraphic };
