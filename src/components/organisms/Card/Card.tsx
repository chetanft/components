import React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons/Icon';
import { Divider } from '../../atoms/Divider';
import { Spacer } from '../../atoms/Spacer';
import { Typography } from '../../atoms/Typography';
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
                <div className="text-base font-semibold text-[var(--text-primary)] leading-tight">{title}</div>
            )}
            {description && (
                <div className="text-sm text-[var(--text-secondary)]">{description}</div>
            )}
        </div>
    </div>
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Classic props
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  size?: 'default' | 'small';
  actions?: React.ReactNode[];
  cover?: React.ReactNode;
  
  // Legacy props (kept for compatibility)
  content?: "Basic" | "Advanced";
  state?: "Default";
  showEyebrow?: boolean;
  showFooter?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  title,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  size = 'default',
  actions,
  cover,
  className,
  children,
  // Legacy
  content,
  state,
  showEyebrow,
  showFooter,
  ...props
}, ref) => {
    
  // If legacy specific props are used exclusively without new props, potentially render legacy structure?
  // But new structure is generic enough.
  // We'll prioritize new generic structure.

  const isSmall = size === 'small';

  const renderLoading = () => (
      <div className="p-6">
          <Skeleton height="24px" width="30%" className="mb-4" />
          <Skeleton height="16px" count={3} />
      </div>
  );

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-lg transition-all duration-200 flex flex-col overflow-hidden",
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
           <div className={cn("font-semibold text-[var(--text-primary)]", isSmall ? "text-sm" : "text-lg")}>
               {title}
           </div>
           {extra && <div className="text-sm text-[var(--primary)]">{extra}</div>}
        </div>
      )}

      {/* Body */}
      <div className={cn("flex-1", isSmall ? "p-3" : "p-6")}>
          {loading ? renderLoading() : children}
      </div>

      {/* Actions */}
      {actions && actions.length > 0 && (
          <div className="flex items-center border-t border-[var(--border-primary)] bg-[var(--background-secondary)]">
              {actions.map((action, index) => (
                  <div 
                    key={index} 
                    className={cn(
                        "flex-1 flex items-center justify-center py-3 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer",
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
export { CardMeta };
