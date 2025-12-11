/**
 * FT DESIGN SYSTEM - CORE (UNPROTECTED) COMPONENTS
 * 
 * This module provides unprotected versions of FT Design System components.
 * Use this only when you need direct access to components without AI protection.
 * 
 * For most use cases, prefer the default import:
 * import { Button } from 'ft-design-system';
 * 
 * Use this escape hatch only when needed:
 * import { Button } from 'ft-design-system/core';
 * 
 * @module ft-design-system/core
 */

// Import global styles
import '../styles/globals.css';

// Design tokens
export { designTokens, cssVariables, resolveBaseColor, getThemeColor } from '../tokens/design-tokens';

// Re-export all components from the atomic design structure (unprotected)
export * from '../components';

// Utilities
export { cn } from '../lib/utils';
export * from '../utils/component-validation';

// AI utilities (optional - for advanced users)
export * from '../lib/ai-utils';

// Global styles - consumers should import this manually
export const globalStyles = '../styles/globals.css';
