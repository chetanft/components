"use client";

/**
 * @deprecated This module is kept for backward compatibility.
 * All theme functionality is now provided by `FTProvider` in `src/components/FTProvider.tsx`.
 * Import from there instead.
 */

export type { Theme, ThemeContextType, ThemeProviderProps } from '../components/FTProvider';
export { ThemeProvider, useTheme } from '../components/FTProvider';
