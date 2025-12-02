import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { Typography } from '../../atoms/Typography';

export type CellTextType = 'primary' | 'secondary';

export interface TableCellTextProps {
  type?: CellTextType;
  children: React.ReactNode;
  className?: string;
  singleLine?: boolean; // If true, join lines with space instead of splitting
  truncate?: boolean; // If true, truncate text with ellipsis (default: true for single-line)
  showTooltip?: boolean; // If true, show tooltip on hover when truncated (default: true when truncate is true)
}

export const TableCellText: React.FC<TableCellTextProps> = ({
  type = 'primary',
  children,
  className,
  singleLine = false,
  truncate = true, // Default to true for truncation
  showTooltip = true // Default to true to show tooltip
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [elementTruncated, setElementTruncated] = useState(false);
  const [fullText, setFullText] = useState<string>('');

  // Handle multi-line text
  // If truncate is true, force single line behavior
  const effectiveSingleLine = singleLine || truncate;
  const isMultiLine = typeof children === 'string' && children.includes('\n') && !effectiveSingleLine;

  // Single line or non-string content
  // If truncate is true, show only the first line (before newline) to remove numbers/extra info
  // Full text is still stored in fullText for tooltip
  const getDisplayContent = () => {
    if (typeof children === 'string') {
      if (truncate && children.includes('\n')) {
        // When truncating, show only the first line (name part, before phone number)
        return children.split('\n')[0];
      }
      if (effectiveSingleLine && children.includes('\n')) {
        return children.replace(/\n/g, ' ');
      }
      return children;
    }
    return children;
  };

  const content = getDisplayContent();

  const isReactElement = React.isValidElement(content);

  // Extract full text content for tooltip
  useEffect(() => {
    if (typeof children === 'string') {
      setFullText(children.replace(/\n/g, ' '));
    } else if (isReactElement) {
      // Try to extract text from React element
      const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (React.isValidElement(node) && node.props?.children) {
          return extractText(node.props.children);
        }
        return '';
      };
      setFullText(extractText(children));
    } else {
      setFullText(String(children ?? ''));
    }
  }, [children, isReactElement]);

  // Check if text is truncated (for wrapper div when truncate is true)
  useEffect(() => {
    if (textRef.current && truncate && showTooltip && !isReactElement) {
      const checkTruncation = () => {
        const element = textRef.current;
        if (element) {
          // Check if the content inside is overflowing
          const isOverflowing = element.scrollWidth > element.clientWidth;
          setIsTruncated(isOverflowing);
        }
      };

      // Use requestAnimationFrame to ensure DOM is ready
      const timeoutId = setTimeout(checkTruncation, 0);

      // Also check on window resize
      window.addEventListener('resize', checkTruncation);
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('resize', checkTruncation);
      };
    } else {
      setIsTruncated(false);
    }
  }, [children, truncate, showTooltip, isReactElement]);

  // Check if React element is truncated
  useEffect(() => {
    if (elementRef.current && truncate && showTooltip && isReactElement) {
      const checkTruncation = () => {
        const element = elementRef.current;
        if (element) {
          const isOverflowing = element.scrollWidth > element.clientWidth;
          setElementTruncated(isOverflowing);
        }
      };

      checkTruncation();
      window.addEventListener('resize', checkTruncation);
      return () => window.removeEventListener('resize', checkTruncation);
    } else {
      setElementTruncated(false);
    }
  }, [children, truncate, showTooltip, isReactElement]);

  if (isMultiLine) {
    // Split into multiple Typography components for multi-line display
    // First line uses primary color, second line uses secondary color
    return (
      <>
        {children.split('\n').map((line, index) => (
          <Typography
            key={index}
            variant="body-primary-regular"
            color={index === 0 ? 'primary' : 'secondary'}
          >
            {line}
          </Typography>
        ))}
      </>
    );
  }

  // If children is a React element (not a string), check if we need to wrap it for truncation
  if (isReactElement) {
    // If truncation is needed, wrap the element in a container with truncation styles
    if (truncate) {
      return (
        <div
          ref={elementRef}
          className={cn(
            "overflow-hidden text-ellipsis whitespace-nowrap max-w-full",
            className
          )}
          title={showTooltip && elementTruncated ? fullText : undefined}
        >
          {content}
        </div>
      );
    }
    // No truncation needed, render directly
    return <>{content}</>;
  }

  // Truncation wrapper for single-line text
  // Apply truncation directly to Typography component
  if (truncate) {
    return (
      <Typography
        ref={textRef as any}
        variant="body-primary-regular"
        className={cn(
          // Type-specific colors from Figma
          type === 'primary' && "text-[var(--primary)]",
          type === 'secondary' && "text-[var(--secondary)]",
          // Truncation styles - must be on the Typography element itself
          "overflow-hidden text-ellipsis whitespace-nowrap w-full min-w-0 block",
          className
        )}
        style={{ maxWidth: '100%' }}
        title={showTooltip && isTruncated ? fullText : undefined}
      >
        {content}
      </Typography>
    );
  }

  return (
    <Typography
      ref={textRef}
      variant="body-primary-regular"
      className={cn(
        // Type-specific colors from Figma
        type === 'primary' && "text-[var(--primary)]",
        type === 'secondary' && "text-[var(--secondary)]",
        className
      )}
      title={showTooltip && isTruncated ? fullText : undefined}
    >
      {content}
    </Typography>
  );
}; 