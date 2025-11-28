/**
 * AI UTILITIES FOR FT DESIGN SYSTEM
 * 
 * This module provides utilities for AI tools to work better with FT Design System.
 * These utilities are separate from core components to keep them clean and lightweight.
 */

import React, { useMemo } from 'react';
import { type ClassValue } from 'clsx';
import { cn } from './utils';

/**
 * Filters out problematic classes that AI tools might add
 * This prevents manual height overrides, border radius, and color overrides
 * that would break the design system's consistency
 */
export function filterAIClasses(className?: string): string {
  if (!className) return '';

  // Remove height overrides, border radius, and color overrides
  const filteredClasses = className
    .split(' ')
    .filter(cls => {
      // Block manual height classes that override component sizing
      if (cls.match(/^h-\d+$/) || cls.match(/^h-\[.*\]$/)) return false;
      // Block border radius overrides that break design consistency
      if (cls.match(/^rounded/) || cls.match(/^border-radius/)) return false;
      // Block background/text color overrides that break brand colors
      if (cls.match(/^bg-\[#/) || cls.match(/^text-\[#/) || cls.match(/^border-\[#/)) return false;
      // Block width overrides on form components
      if (cls.match(/^w-\d+$/) && !cls.includes('w-full')) return false;
      // Block padding overrides that break component spacing
      if (cls.match(/^p[xy]?-\d+$/) || cls.match(/^p[xy]?-\[.*\]$/)) return false;
      return true;
    })
    .join(' ');

  return filteredClasses;
}

/**
 * Enhanced cn function that automatically filters AI-generated problematic classes
 * Use this instead of regular cn for components that need AI protection
 */
export function cnSafe(...inputs: ClassValue[]) {
  const merged = cn(...inputs);
  return filterAIClasses(merged);
}

/**
 * Filters out problematic inline styles that AI tools might add
 * This prevents manual height, border-radius, and color overrides via style prop
 */
export function filterAIStyles(style?: React.CSSProperties): React.CSSProperties | undefined {
  if (!style) return undefined;

  const filteredStyle = { ...style };

  // Remove problematic style properties that break design system
  delete filteredStyle.height;
  delete filteredStyle.borderRadius;
  delete filteredStyle.backgroundColor;
  delete filteredStyle.color;
  delete filteredStyle.border;
  delete filteredStyle.padding;
  delete filteredStyle.paddingTop;
  delete filteredStyle.paddingBottom;
  delete filteredStyle.paddingLeft;
  delete filteredStyle.paddingRight;
  delete filteredStyle.width; // Allow only if it's 100%

  return Object.keys(filteredStyle).length > 0 ? filteredStyle : undefined;
}

/**
 * Higher-order component that adds AI protection to any component
 * This filters out problematic props that AI tools might add
 */
export function withAIProtection<P extends { className?: string; style?: React.CSSProperties }>(
  Component: React.ComponentType<P>
) {
  const AIProtectedComponent = (props: P) => {
    const safeProps = useMemo(() => {
      const { className, style, ...otherProps } = props;

      return {
        ...otherProps,
        className: filterAIClasses(className),
        style: filterAIStyles(style),
      } as P;
    }, [props]);

    return React.createElement(Component, safeProps);
  };

  AIProtectedComponent.displayName = `AIProtected(${Component.displayName || Component.name})`;

  return AIProtectedComponent;
}

/**
 * Detects conflicting design systems in the current environment
 * Useful for debugging when AI tools install multiple design systems
 */
export function detectDesignSystemConflicts(): string[] {
  if (typeof window === 'undefined') return [];

  const conflicts: string[] = [];

  // Check for common conflicting libraries
  if ((window as Window & { antd?: unknown }).antd) conflicts.push('Ant Design');
  if ((window as Window & { MaterialUI?: unknown }).MaterialUI) conflicts.push('Material-UI');
  if ((window as Window & { ChakraUI?: unknown }).ChakraUI) conflicts.push('Chakra UI');

  // Check DOM for conflicting CSS classes
  if (document.querySelector('[class*="MuiButton"]')) conflicts.push('Material-UI Components');
  if (document.querySelector('[class*="ant-btn"]')) conflicts.push('Ant Design Components');
  if (document.querySelector('[data-radix-collection-item]') &&
    !document.querySelector('[data-ft-design-system]')) {
    conflicts.push('Radix UI (possibly shadcn/ui)');
  }

  // Check for conflicting CSS variables
  const rootStyles = getComputedStyle(document.documentElement);
  if (rootStyles.getPropertyValue('--chakra-colors-blue-500')) {
    conflicts.push('Chakra UI CSS');
  }
  if (rootStyles.getPropertyValue('--ant-primary-color')) {
    conflicts.push('Ant Design CSS');
  }

  return conflicts;
}

/**
 * Logs design system conflicts and provides helpful debugging information
 */
export function debugDesignSystemConflicts(): void {
  const conflicts = detectDesignSystemConflicts();

  if (conflicts.length === 0) {
    console.log('✅ No design system conflicts detected');
    return;
  }

  console.group('🚨 Design System Conflicts Detected');
  console.warn('The following conflicting design systems were found:');
  conflicts.forEach(conflict => console.warn(`  - ${conflict}`));
  console.warn('\nThis may cause styling inconsistencies with FT Design System.');
  console.warn('Consider removing conflicting packages and using only FT Design System components.');
  console.groupEnd();
}

/**
 * Validates that FT Design System is properly loaded
 */
export function validateFTDesignSystem(): boolean {
  // Check if FT Design System CSS is loaded
  const ftStylesheet = document.querySelector('link[href*="ft-design-system"]');
  if (!ftStylesheet) {
    console.warn('⚠️ FT Design System CSS not detected. Make sure to import the stylesheet.');
    return false;
  }

  // Check if FT Design System components are available (for CDN usage)
  if (typeof window !== 'undefined' && (window as Window & { FTDesignSystem?: unknown }).FTDesignSystem) {
    console.log('✅ FT Design System CDN loaded successfully');
    return true;
  }

  // For npm usage, we can't easily detect if components are available
  console.log('✅ FT Design System validation passed');
  return true;
}

/**
 * Development helper that runs all AI-related checks
 * Call this once in your app during development
 */
export function runAIDevelopmentChecks(): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('🔍 FT Design System AI Development Checks');

  // Validate FT Design System
  validateFTDesignSystem();

  // Check for conflicts
  debugDesignSystemConflicts();

  // Log available components (if using CDN)
  if (typeof window !== 'undefined' && (window as Window & { FTDesignSystem?: Record<string, unknown> }).FTDesignSystem) {
    const availableComponents = Object.keys((window as Window & { FTDesignSystem?: Record<string, unknown> }).FTDesignSystem!);
    console.log('📦 Available FT Components:', availableComponents);
  }

  console.groupEnd();
} 