"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';
import { Spin } from '../../atoms/Spin/Spin';

// ============================================================================
// Types
// ============================================================================

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Image source */
  src: string;
  /** Alt text */
  alt: string;
  /** Fallback image src */
  fallback?: string;
  /** Placeholder to show while loading */
  placeholder?: React.ReactNode;
  /** Enable preview on click */
  preview?: boolean | PreviewConfig;
  /** Image width */
  width?: number | string;
  /** Image height */
  height?: number | string;
  /** Root class name */
  rootClassName?: string;
  /** Callback when image fails to load */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export interface PreviewConfig {
  /** Whether preview is visible (controlled) */
  visible?: boolean;
  /** Callback when preview visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Source for preview (if different from main image) */
  src?: string;
  /** Enable zoom */
  zoom?: boolean;
  /** Enable rotation */
  rotate?: boolean;
  /** Minimum zoom scale */
  minScale?: number;
  /** Maximum zoom scale */
  maxScale?: number;
}

// ============================================================================
// ImagePreview Component
// ============================================================================

interface ImagePreviewProps {
  src: string;
  alt: string;
  visible: boolean;
  onClose: () => void;
  zoom?: boolean;
  rotate?: boolean;
  minScale?: number;
  maxScale?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  visible,
  onClose,
  zoom = true,
  rotate = true,
  minScale = 0.5,
  maxScale = 5,
}) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });

  // Reset state when closing
  useEffect(() => {
    if (!visible) {
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [visible]);

  const handleZoomIn = useCallback(() => {
    if (zoom) {
      setScale(prev => Math.min(prev + 0.25, maxScale));
    }
  }, [zoom, maxScale]);

  const handleZoomOut = useCallback(() => {
    if (zoom) {
      setScale(prev => Math.max(prev - 0.25, minScale));
    }
  }, [zoom, minScale]);

  const handleRotateLeft = useCallback(() => {
    if (rotate) {
      setRotation(prev => prev - 90);
    }
  }, [rotate]);

  const handleRotateRight = useCallback(() => {
    if (rotate) {
      setRotation(prev => prev + 90);
    }
  }, [rotate]);

  // Keyboard handlers
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === 'ArrowLeft') {
        handleRotateLeft();
      } else if (e.key === 'ArrowRight') {
        handleRotateRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose, handleZoomIn, handleZoomOut, handleRotateLeft, handleRotateRight]);

  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!zoom) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(minScale, Math.min(maxScale, prev + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      positionStart.current = position;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPosition({
      x: positionStart.current.x + dx,
      y: positionStart.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[10000] flex items-center justify-center",
        "bg-black/80"
      )}
      onClick={onClose}
    >
      {/* Toolbar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 z-10",
          "flex items-center justify-center gap-[var(--spacing-x2)] p-[var(--spacing-x4)]",
          "bg-gradient-to-b from-[var(--overlay-strong)] to-transparent"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {zoom && (
          <>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
              aria-label="Zoom out"
            >
              <Icon name="subtract" size={20} />
            </button>
            <span className="text-[var(--overlay-control-text)] text-sm min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
              aria-label="Zoom in"
            >
              <Icon name="add" size={20} />
            </button>
          </>
        )}
        {rotate && (
          <>
            <div className="w-px h-6 bg-[var(--overlay-control-divider)] mx-2" />
            <button
              type="button"
              onClick={handleRotateLeft}
              className="p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
              aria-label="Rotate left"
            >
              <Icon name="refresh" size={20} />
            </button>
            <button
              type="button"
              onClick={handleRotateRight}
              className="p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
              aria-label="Rotate right"
            >
              <Icon name="refresh" size={20} />
            </button>
          </>
        )}
        <div className="w-px h-6 bg-[var(--overlay-control-divider)] mx-2" />
        <button
          type="button"
          onClick={handleReset}
          className="p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
          aria-label="Reset"
        >
          <Icon name="expand" size={20} />
        </button>
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className={cn(
          "absolute top-[var(--spacing-x4)] right-[var(--spacing-x4)] z-10",
          "p-[var(--spacing-x2)] rounded-full bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-bg-hover)] text-[var(--overlay-control-text)] transition-colors"
        )}
        aria-label="Close preview"
      >
        <Icon name="cross" size={24} />
      </button>

      {/* Image */}
      <div
        className={cn(
          "max-w-[90vw] max-h-[90vh] overflow-hidden",
          isDragging ? "cursor-grabbing" : scale > 1 ? "cursor-grab" : "cursor-default"
        )}
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain transition-transform duration-200"
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
          }}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
};

// ============================================================================
// Image Component
// ============================================================================

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({
    className,
    src,
    alt,
    fallback,
    placeholder,
    preview = false,
    width,
    height,
    rootClassName,
    onError,
    style,
    ...props
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Reset state when src changes
    useEffect(() => {
      setCurrentSrc(src);
      setIsLoading(true);
      setHasError(false);
    }, [src]);

    const previewConfig = typeof preview === 'object' ? preview : {};
    const isPreviewEnabled = preview !== false;

    const handleLoad = () => {
      setIsLoading(false);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      setHasError(true);

      if (fallback && currentSrc !== fallback) {
        setCurrentSrc(fallback);
        setHasError(false);
        setIsLoading(true);
      }

      onError?.(e);
    };

    const handlePreviewOpen = () => {
      if (isPreviewEnabled && !hasError) {
        if (previewConfig.onVisibleChange) {
          previewConfig.onVisibleChange(true);
        } else {
          setPreviewVisible(true);
        }
      }
    };

    const handlePreviewClose = () => {
      if (previewConfig.onVisibleChange) {
        previewConfig.onVisibleChange(false);
      } else {
        setPreviewVisible(false);
      }
    };

    const isPreviewVisible = previewConfig.visible !== undefined
      ? previewConfig.visible
      : previewVisible;

    return (
      <>
        <div
          className={cn(
            "relative inline-block overflow-hidden",
            isPreviewEnabled && !hasError && "cursor-zoom-in",
            rootClassName
          )}
          style={{ width, height }}
          onClick={handlePreviewOpen}
        >
          {/* Loading placeholder */}
          {isLoading && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-[var(--color-bg-secondary)]"
              )}
            >
              {placeholder || <Spin size="sm" />}
            </div>
          )}

          {/* Error fallback */}
          {hasError && !fallback && (
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center",
                "bg-[var(--color-bg-secondary)] text-[var(--color-tertiary)]"
              )}
            >
              <Icon name="image" size={32} className="mb-2" />
              <span className="text-sm">Failed to load image</span>
            </div>
          )}

          {/* Image */}
          <img
            ref={ref}
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-opacity duration-300",
              isLoading || hasError ? "opacity-0" : "opacity-100",
              className
            )}
            style={style}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />

          {/* Preview icon overlay */}
          {isPreviewEnabled && !hasError && !isLoading && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "bg-transparent hover:bg-[var(--overlay-control-bg-hover)] transition-colors",
                "opacity-0 hover:opacity-100"
              )}
            >
              <Icon name="search" size={32} className="text-[var(--overlay-control-text)]" />
            </div>
          )}
        </div>

        {/* Preview modal */}
        {isPreviewEnabled && (
          <ImagePreview
            src={previewConfig.src || src}
            alt={alt}
            visible={isPreviewVisible}
            onClose={handlePreviewClose}
            zoom={previewConfig.zoom}
            rotate={previewConfig.rotate}
            minScale={previewConfig.minScale}
            maxScale={previewConfig.maxScale}
          />
        )}
      </>
    );
  }
);

Image.displayName = 'Image';

export default Image;
