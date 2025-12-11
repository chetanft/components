/**
 * FT DESIGN SYSTEM
 * 
 * Components with built-in AI protection utilities available.
 * Use filterAIClasses() or withAIProtection() HOC for AI safety.
 * 
 * Quick Start:
 * import { Button, Input, filterAIClasses } from 'ft-design-system';
 * 
 * @module ft-design-system
 */

// Import global styles
import './styles/globals.css';

// Design tokens
export { designTokens, cssVariables, resolveBaseColor, getThemeColor } from './tokens/design-tokens';

// ⚠️ IMPORTANT: When adding/removing components below, also update:
// 1. src/stories/prompts/General.stories.tsx (downloadable docs)
// 2. Run: npm run update-docs (to check sync)
// 3. Test downloadable JSON/MDX files work correctly

// Re-export all components from the atomic design structure
export * from './components';

// Utilities
export { cn } from './lib/utils';
export * from './utils/component-validation';

// AI utilities - Use these to wrap components or filter classes
export * from './lib/ai-utils';

// Global styles - consumers should import this manually
export const globalStyles = './styles/globals.css';
