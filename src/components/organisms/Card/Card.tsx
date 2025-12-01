import React from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icons';
import { Skeleton } from '../../atoms/Skeleton';

export interface CardMetaProps {
    avatar?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const CardMeta: React.FC<CardMetaProps> = ({ avatar, title, description, className, style }) => (
    <div className={cn("flex gap-4 items-start", className)} style={style}>
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex flex-col gap-1 w-full">
            {title && (
                <div className="text-base font-semibold text-[var(--primary)] leading-tight">{title}</div>
            )}
            {description && (
                <div className="text-sm text-[var(--secondary)]">{description}</div>
            )}
        </div>
    </div>
);

export interface CardElementsProps {
    type?: 'Eyebrow' | 'Header' | 'Body';
    eyebrowBadges?: React.ReactNode[];
    headerTitle?: React.ReactNode;
    headerSubText?: React.ReactNode;
    showArrowIcon?: boolean;
    statisticValue?: React.ReactNode;
    statisticLabel?: React.ReactNode;
    readOnlyLabel?: React.ReactNode;
    readOnlyText?: React.ReactNode;
    className?: string;
}

const CardElements: React.FC<CardElementsProps> = ({
    type = 'Eyebrow',
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
    const isBody = type === 'Body';
    const isEyebrow = type === 'Eyebrow';
    const isHeader = type === 'Header';

    return (
        <div className={cn(
            "flex items-center justify-between w-full px-[var(--x5,20px)]",
            className
        )}>
            {/* Left Content */}
            <div className={cn(
                "flex flex-[1_0_0] gap-[var(--x5,20px)] items-start min-h-px min-w-px py-0 relative shrink-0"
            )}>
                <div className={cn(
                    "flex flex-[1_0_0] items-start min-h-px min-w-px relative shrink-0",
                    isEyebrow ? "flex-row gap-[10px] justify-start" : "flex-col justify-center",
                    ['Header', 'Body'].includes(type) ? "gap-[var(--x1,4px)]" : ""
                )}>
                    {isEyebrow && eyebrowBadges && eyebrowBadges.length > 0 && (
                        <React.Fragment>{eyebrowBadges[0]}</React.Fragment>
                    )}
                    {isHeader && (
                        <div className="flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-full">
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
                    {isBody && (
                        <div className="flex flex-col gap-[var(--x2,8px)] items-start justify-center p-0 relative shrink-0 w-full">
                            {statisticValue && (
                                <Typography variant="body-primary-regular" className="text-[var(--primary)]">
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
            </div>

            {/* Right Content */}
            <div className={cn(
                "flex flex-[1_0_0] min-h-px min-w-px py-0 relative shrink-0",
                isEyebrow ? "flex-row items-end justify-end" : isHeader ? "gap-[var(--x5,20px)] items-center justify-end" : isBody ? "flex-col gap-[var(--x1,4px)] items-end justify-center" : ""
            )}>
                {isEyebrow && eyebrowBadges && eyebrowBadges.length > 1 && (
                    <div className="flex items-end">
                        {eyebrowBadges[1]}
                    </div>
                )}
                {isHeader && showArrowIcon && (
                    <Icon name="arrow-top-right" size={16} className="text-[var(--primary)]" />
                )}
                {isBody && readOnlyLabel && (
                    <div className="flex flex-col gap-[var(--x2,8px)] items-start relative shrink-0 w-full">
                        <Typography variant="body-secondary-medium" className="text-[var(--secondary)]">
                            {readOnlyLabel}
                        </Typography>
                        {readOnlyText && (
                            <Typography variant="body-primary-regular" className="text-[var(--primary)]">
                                {readOnlyText}
                            </Typography>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export interface CardFooterProps {
    padding?: boolean;
    footerText?: React.ReactNode;
    footerButton?: React.ReactNode;
    className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({
    padding = false,
    footerText,
    footerButton,
    className
}) => {
    return (
        <div className={cn(
            "flex flex-col items-start pb-0 pt-[var(--x0,0px)] relative w-full",
            padding ? "px-[var(--x5,20px)]" : "px-0",
            className
        )}>
            <Divider type="primary" />
            <Spacer size="x5" />
            <div className={cn(
                "flex gap-[var(--x4,16px)] items-center relative shrink-0 w-full",
                padding ? "px-[var(--x5,20px)] py-0" : ""
            )}>
                {footerText && (
                    <div className="flex flex-[1_0_0] gap-[var(--x5,20px)] items-center justify-center min-h-px min-w-px px-0 py-0 relative shrink-0">
                        <div className="flex flex-[1_0_0] flex-col gap-[var(--x1,4px)] items-center justify-center min-h-px min-w-px relative shrink-0">
                            <div className="flex flex-col gap-[var(--x1,4px)] items-start justify-center relative shrink-0 w-full">
                                <Typography variant="body-primary-medium" className="text-[var(--primary)] font-bold">
                                    {footerText}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
                {footerButton && (
                    <div className={cn(
                        "flex flex-[1_0_0] gap-[var(--x5,20px)] items-center min-h-px min-w-px px-0 py-0 relative shrink-0",
                        padding ? "justify-center" : "justify-end"
                    )}>
                        <div className={cn(
                            "flex gap-[var(--x5,20px)] items-center relative shrink-0",
                            padding ? "flex-[1_0_0] justify-end min-h-px min-w-px" : "justify-center"
                        )}>
                            {footerButton}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export interface CardGraphicProps {
    padding?: boolean;
    overlayAction?: boolean;
    graphic?: 'Image' | 'Logo';
    imageUrl?: string;
    logo?: React.ReactNode;
    className?: string;
}

const CardGraphic: React.FC<CardGraphicProps> = ({
    padding = false,
    overlayAction = false,
    graphic = 'Image',
    imageUrl,
    logo,
    className
}) => {
    const isImage = graphic === 'Image';
    const isLogo = graphic === 'Logo';

    return (
        <div className={cn(
            "border border-[var(--border-secondary)] border-solid box-border flex flex-col gap-[10px] justify-center relative w-full",
            isImage && !padding ? "bg-[var(--color-bg-secondary)] h-[175px] items-center" : "",
            isImage && padding ? "bg-[var(--bg-primary)] h-[175px] items-center pb-0 pt-[var(--x0,0px)] px-[var(--x4,16px)] rounded-tl-[var(--x2,8px)] rounded-tr-[var(--x2,8px)]" : "",
            isLogo && padding ? "bg-[var(--bg-primary)] items-start pb-0 pt-[var(--x4,16px)] px-[var(--x4,16px)] rounded-tl-[var(--x2,8px)] rounded-tr-[var(--x2,8px)]" : "",
            className
        )}>
            {isImage && imageUrl && (
                <div className={cn(
                    "flex-[1_0_0] min-h-px min-w-px relative shrink-0 w-full",
                    padding ? "rounded-[var(--x2,8px)]" : ""
                )}>
                    <div className={cn(
                        "absolute inset-0 overflow-hidden pointer-events-none",
                        padding ? "rounded-[var(--x2,8px)]" : ""
                    )}>
                        <img
                            src={imageUrl}
                            alt=""
                            className="absolute h-[188.27%] left-0 max-w-none top-0 w-full object-cover"
                        />
                    </div>
                </div>
            )}
            {overlayAction && (
                <div className={cn(
                    "absolute box-border flex gap-[8px] items-center justify-center px-[24px] py-[12px] rounded-[100px] size-[var(--x10,40px)]",
                    !padding ? "left-[501px] top-[8px]" : "left-[485px] top-[24px]"
                )}>
                    <Button variant="primary" size="md" icon="add" iconPosition="only" />
                </div>
            )}
            {isLogo && logo && (
                <div className="overflow-clip relative shrink-0 size-[72px]">
                    {logo}
                </div>
            )}
        </div>
    );
};

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
    // Classic props
    /**
     * @deprecated Use `headerTitle` instead.
     */
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    hoverable?: boolean;
    loading?: boolean;
    /**
     * The size of the card.
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'default' | 'small';
    /**
     * @deprecated Use `size="md"` instead.
     */
    // default is included above
    /**
     * @deprecated Use `size="sm"` instead.
     */
    // small is included above
    actions?: React.ReactNode[];
    cover?: React.ReactNode;

    // New Figma-based props
    showEyebrow?: boolean;
    showFooter?: boolean;
    contentVariant?: 'Basic' | 'Advanced';

    // Card sections
    eyebrowBadges?: React.ReactNode[];
    headerTitle?: React.ReactNode;
    headerSubText?: React.ReactNode;
    showArrowIcon?: boolean;
    bodySections?: Array<{
        statisticValue?: React.ReactNode;
        statisticLabel?: React.ReactNode;
        readOnlyLabel?: React.ReactNode;
        readOnlyText?: React.ReactNode;
    }>;
    footerText?: React.ReactNode;
    footerButton?: React.ReactNode;
    graphic?: CardGraphicProps;

    // Legacy props (kept for compatibility)
    /**
     * @deprecated Use `contentVariant="Advanced"` with `bodySections` or children instead.
     */
    content?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
    title,
    extra,
    bordered = true,
    hoverable = false,
    loading = false,
    size = 'md',
    actions,
    cover,
    className,
    children,
    // New props
    showEyebrow = true,
    showFooter = true,
    contentVariant = 'Basic',
    eyebrowBadges,
    headerTitle,
    headerSubText,
    showArrowIcon = false,
    bodySections,
    footerText,
    footerButton,
    graphic,
    // Legacy
    content,
    ...props
}, ref) => {

    const isSmall = size === 'sm' || size === 'small';
    const isAdvanced = contentVariant === 'Advanced';

    React.useEffect(() => {
        if (title) {
            console.warn('Card: `title` prop is deprecated. Use `headerTitle` instead.');
        }
        if (content) {
            console.warn('Card: `content` prop is deprecated. Use `contentVariant="Advanced"` with `bodySections` or children instead.');
        }
    }, [title, content]);

    const renderLoading = () => (
        <div className="p-6">
            <Skeleton height="24px" width="30%" className="mb-4" />
            <Skeleton height="16px" className="mb-2" />
            <Skeleton height="16px" className="mb-2" />
            <Skeleton height="16px" />
        </div>
    );

    // Render new Figma-based structure if new props are provided
    const hasNewStructure = eyebrowBadges || headerTitle || bodySections || footerText || footerButton || graphic;

    if (hasNewStructure) {
        return (
            <div
                ref={ref}
                className={cn(
                    "bg-[var(--bg-primary)] border border-[var(--border-secondary)] border-solid relative rounded-[var(--x2,8px)] flex flex-col overflow-hidden",
                    isAdvanced ? "w-full max-w-[549.333px]" : "w-full max-w-[549px]",
                    className
                )}
                {...props}
            >
                <div className="flex flex-col gap-[var(--x0,0px)] items-start justify-end overflow-clip p-[var(--x0,0px)] relative rounded-[inherit] w-full">
                    <Spacer size="x5" />

                    {/* Eyebrow Section */}
                    {showEyebrow && eyebrowBadges && (
                        <>
                            <CardElements
                                type="Eyebrow"
                                eyebrowBadges={eyebrowBadges}
                            />
                            <Spacer size="x5" />
                        </>
                    )}

                    {/* Graphic Section (Advanced only) */}
                    {isAdvanced && graphic && (
                        <>
                            <CardGraphic {...graphic} />
                            <Spacer size="x5" />
                        </>
                    )}

                    {/* Header Section */}
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

                    {/* Body Sections */}
                    {bodySections && bodySections.map((section, idx) => (
                        <React.Fragment key={idx}>
                            <CardElements
                                type="Body"
                                statisticValue={section.statisticValue}
                                statisticLabel={section.statisticLabel}
                                readOnlyLabel={section.readOnlyLabel}
                                readOnlyText={section.readOnlyText}
                            />
                            {idx < bodySections.length - 1 && <Spacer size="x5" />}
                        </React.Fragment>
                    ))}

                    {/* Footer Section */}
                    {showFooter && (footerText || footerButton) && (
                        <>
                            <Spacer size="x5" />
                            <CardFooter
                                padding={true}
                                footerText={footerText}
                                footerButton={footerButton}
                            />
                            <Spacer size="x5" />
                        </>
                    )}

                    {/* Fallback for children if no structured content */}
                    {!hasNewStructure && children && (
                        <div className={cn("flex-1", isSmall ? "p-3" : "p-6")}>
                            {loading ? renderLoading() : children}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Legacy structure (for backward compatibility)
    return (
        <div
            ref={ref}
            className={cn(
                "bg-[var(--color-bg-primary)] rounded-lg transition-all duration-200 flex flex-col overflow-hidden",
                bordered ? "border border-[var(--border-primary)]" : "",
                hoverable ? "hover:shadow-lg cursor-pointer" : "shadow-sm",
                className
            )}
            {...props}
        >
            {/* Cover Image */}
            {cover && <div className="w-full">{cover}</div>}

            {/* Header */}
            {(title || extra) && (
                <div className={cn(
                    "flex items-center justify-between border-b border-[var(--border-primary)]",
                    isSmall ? "px-3 py-2" : "px-6 py-4"
                )}>
                    <div className={cn("font-semibold text-[var(--primary)]", isSmall ? "text-sm" : "text-lg")}>
                        {title}
                    </div>
                    {extra && <div className="text-sm text-[var(--primary)]">{extra}</div>}
                </div>
            )}

            {/* Body */}
            <div className={cn("flex-1", isSmall ? "p-3" : "p-6")}>
                {loading ? renderLoading() : (content || children)}
            </div>

            {/* Actions */}
            {actions && actions.length > 0 && (
                <div className="flex items-center border-t border-[var(--border-primary)] bg-[var(--color-bg-secondary)]">
                    {actions.map((action, index) => (
                        <div
                            key={index}
                            className={cn(
                                "flex-1 flex items-center justify-center py-3 text-[var(--secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer",
                                index < actions.length - 1 ? "border-r border-[var(--border-primary)]" : ""
                            )}
                        >
                            {action}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
});

Card.displayName = 'Card';

(Card as any).Meta = CardMeta;
(Card as any).Elements = CardElements;
(Card as any).Footer = CardFooter;
(Card as any).Graphic = CardGraphic;

export { CardMeta, CardElements, CardFooter, CardGraphic };
