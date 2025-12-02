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
 * Checks if critical CSS variables are loaded
 * Returns array of missing variable names
 */
export function checkCSSVariablesLoaded(): string[] {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return [];
  }

  const criticalTokens = [
    '--primary',
    '--secondary',
    '--spacing-x4',
    '--radius-md',
    '--font-family-primary',
  ];

  const rootStyles = getComputedStyle(document.documentElement);
  const missing: string[] = [];

  criticalTokens.forEach(token => {
    const value = rootStyles.getPropertyValue(token).trim();
    if (!value || value === '') {
      missing.push(token);
    }
  });

  return missing;
}

/**
 * Validates that FT Design System is properly loaded
 * Enhanced version that checks actual CSS variable values
 */
export function validateFTDesignSystem(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ validateFTDesignSystem() called in non-browser environment');
    }
    return false;
  }

  // Check for CDN usage first
  if ((window as Window & { FTDesignSystem?: unknown }).FTDesignSystem) {
    const missingVars = checkCSSVariablesLoaded();
    if (missingVars.length > 0) {
      console.error('❌ FT Design System CSS variables not loaded');
      console.error('Missing variables:', missingVars);
      console.warn('💡 Make sure the CSS file is loaded before components render');
      return false;
    }
    console.log('✅ FT Design System CDN loaded successfully');
    return true;
  }

  // For npm usage, check CSS variables directly
  const missingVars = checkCSSVariablesLoaded();
  
  if (missingVars.length > 0) {
    console.error('❌ FT Design System CSS not loaded properly');
    console.error('Missing CSS variables:', missingVars);
    console.group('🔧 How to fix:');
    console.log('1. Import CSS in your root file (BEFORE other styles):');
    console.log('   import "ft-design-system/styles.css";');
    console.log('');
    console.log('2. For Next.js App Router: Add to app/layout.tsx');
    console.log('3. For Next.js Pages Router: Add to pages/_app.tsx');
    console.log('4. For Vite/CRA: Add to main.tsx or App.tsx');
    console.log('');
    console.log('5. Make sure CSS import is BEFORE component imports');
    console.groupEnd();
    return false;
  }

  // Check if stylesheet link exists (optional check)
  const ftStylesheet = document.querySelector('link[href*="ft-design-system"]');
  if (!ftStylesheet && process.env.NODE_ENV === 'development') {
    // This is just a warning, not an error, since npm users import CSS directly
    console.log('ℹ️ FT Design System CSS loaded (npm import detected)');
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('✅ FT Design System validation passed - all CSS variables loaded');
  }
  return true;
}

/**
 * Development helper that runs all AI-related checks
 * Call this once in your app during development
 */
export function runAIDevelopmentChecks(): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.group('🔍 FT Design System AI Development Checks');

  // Validate FT Design System (enhanced validation)
  const isValid = validateFTDesignSystem();
  
  if (!isValid) {
    console.warn('⚠️ FT Design System validation failed. Components may not render correctly.');
  }

  // Check for conflicts
  debugDesignSystemConflicts();

  // Check CSS variables
  const missingVars = checkCSSVariablesLoaded();
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing CSS variables:', missingVars);
  } else {
    console.log('✅ All critical CSS variables loaded');
  }

  // Log available components (if using CDN)
  if (typeof window !== 'undefined' && (window as Window & { FTDesignSystem?: Record<string, unknown> }).FTDesignSystem) {
    const availableComponents = Object.keys((window as Window & { FTDesignSystem?: Record<string, unknown> }).FTDesignSystem!);
    console.log('📦 Available FT Components:', availableComponents);
  }

  console.groupEnd();
} 