"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../../atoms/Icons';

// ============================================================================
// Types
// ============================================================================

export type CarouselEffect = 'slide' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Auto play slides */
  autoplay?: boolean;
  /** Time between auto transitions (ms) */
  autoplaySpeed?: number;
  /** Show navigation dots */
  dots?: boolean;
  /** Dot position */
  dotPosition?: DotPosition;
  /** Custom dot render */
  customDot?: (props: { index: number; active: boolean }) => React.ReactNode;
  /** Transition effect */
  effect?: CarouselEffect;
  /** Show prev/next arrows */
  arrows?: boolean;
  /** Infinite loop */
  infinite?: boolean;
  /** Animation speed (ms) */
  speed?: number;
  /** Initial slide index */
  initialSlide?: number;
  /** Callback before slide change */
  beforeChange?: (current: number, next: number) => void;
  /** Callback after slide change */
  afterChange?: (current: number) => void;
  /** Slides per view */
  slidesToShow?: number;
  /** Slides to scroll at a time */
  slidesToScroll?: number;
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  /** Pause autoplay on focus */
  pauseOnFocus?: boolean;
  /** Enable swipe gestures */
  swipe?: boolean;
  /** Carousel items */
  children?: React.ReactNode;
}

// ============================================================================
// Carousel Component
// ============================================================================

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    className,
    autoplay = false,
    autoplaySpeed = 3000,
    dots = true,
    dotPosition = 'bottom',
    customDot,
    effect = 'slide',
    arrows = true,
    infinite = true,
    speed = 500,
    initialSlide = 0,
    beforeChange,
    afterChange,
    slidesToShow = 1,
    slidesToScroll = 1,
    pauseOnHover = true,
    pauseOnFocus = true,
    swipe = true,
    children,
    ...props
  }, ref) => {
    const slides = React.Children.toArray(children);
    const totalSlides = slides.length;
    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const goToSlide = useCallback((index: number) => {
      if (isTransitioning) return;

      let nextSlide = index;
      
      if (infinite) {
        if (index < 0) nextSlide = totalSlides - 1;
        else if (index >= totalSlides) nextSlide = 0;
      } else {
        if (index < 0) nextSlide = 0;
        else if (index >= totalSlides) nextSlide = totalSlides - 1;
      }

      if (nextSlide === currentSlide) return;

      beforeChange?.(currentSlide, nextSlide);
      setIsTransitioning(true);
      setCurrentSlide(nextSlide);

      setTimeout(() => {
        setIsTransitioning(false);
        afterChange?.(nextSlide);
      }, speed);
    }, [currentSlide, totalSlides, infinite, beforeChange, afterChange, speed, isTransitioning]);

    const goToNext = useCallback(() => {
      goToSlide(currentSlide + slidesToScroll);
    }, [currentSlide, slidesToScroll, goToSlide]);

    // Auto play
    useEffect(() => {
      if (!autoplay || isPaused || totalSlides <= 1) return;

      const interval = setInterval(() => {
        goToNext();
      }, autoplaySpeed);

      return () => clearInterval(interval);
    }, [autoplay, autoplaySpeed, isPaused, totalSlides, goToNext]);

    const goToPrev = useCallback(() => {
      goToSlide(currentSlide - slidesToScroll);
    }, [currentSlide, slidesToScroll, goToSlide]);

    // Touch/Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      if (!swipe) return;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!swipe) return;
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!swipe) return;
      const diff = touchStartX.current - touchEndX.current;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrev();
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    const isVertical = dotPosition === 'left' || dotPosition === 'right';

    // Container classes
    const containerClasses = cn(
      "relative overflow-hidden",
      isVertical && "flex",
      dotPosition === 'right' && "flex-row-reverse",
      className
    );

    // Track classes
    const trackClasses = cn(
      "flex transition-transform",
      effect === 'fade' && "relative",
      isVertical && "flex-col"
    );

    // Slide classes
    const slideClasses = (index: number) => cn(
      "flex-shrink-0 w-full",
      effect === 'fade' && [
        "absolute inset-0 transition-opacity",
        index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
      ]
    );

    // Dot container classes
    const dotContainerClasses = cn(
      "flex gap-[var(--spacing-x2)] p-[var(--spacing-x2)]",
      dotPosition === 'top' && "absolute top-0 left-1/2 -translate-x-1/2 z-20",
      dotPosition === 'bottom' && "absolute bottom-0 left-1/2 -translate-x-1/2 z-20",
      dotPosition === 'left' && "flex-col",
      dotPosition === 'right' && "flex-col"
    );

    // Arrow button classes
    const arrowClasses = cn(
      "absolute z-20 p-[var(--spacing-x2)] rounded-full",
      "bg-[var(--color-bg-primary)] shadow-[var(--shadow-md)]",
      "text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)]",
      "transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onFocus={() => pauseOnFocus && setIsPaused(true)}
        onBlur={() => pauseOnFocus && setIsPaused(false)}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        {...props}
      >
        {/* Slides container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden flex-1"
        >
          <div
            className={trackClasses}
            style={{
              transform: effect === 'slide' 
                ? `translateX(-${currentSlide * (100 / slidesToShow)}%)`
                : undefined,
              transitionDuration: `${speed}ms`,
              width: effect === 'slide' ? `${(totalSlides / slidesToShow) * 100}%` : '100%',
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={slideClasses(index)}
                style={{
                  width: effect === 'slide' ? `${100 / totalSlides}%` : '100%',
                  transitionDuration: `${speed}ms`,
                }}
                aria-hidden={index !== currentSlide}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${totalSlides}`}
              >
                {slide}
              </div>
            ))}
          </div>

          {/* Arrows */}
          {arrows && totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrev}
                disabled={!infinite && currentSlide === 0}
                className={cn(arrowClasses, "left-[var(--spacing-x2)] top-1/2 -translate-y-1/2")}
                aria-label="Previous slide"
              >
                <Icon name="chevron-left" size={20} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                disabled={!infinite && currentSlide >= totalSlides - 1}
                className={cn(arrowClasses, "right-[var(--spacing-x2)] top-1/2 -translate-y-1/2")}
                aria-label="Next slide"
              >
                <Icon name="chevron-right" size={20} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {dots && totalSlides > 1 && (
          <div className={dotContainerClasses} role="tablist">
            {slides.map((_, index) => {
              const isActive = index === currentSlide;
              
              if (customDot) {
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {customDot({ index, active: isActive })}
                  </button>
                );
              }

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-[8px] h-[8px] rounded-full transition-all",
                    isActive
                      ? "bg-[var(--color-primary)] w-[24px]"
                      : "bg-[var(--color-border-primary)] hover:bg-[var(--color-border-secondary)]"
                  )}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

export default Carousel;

