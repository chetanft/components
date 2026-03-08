/**
 * Machine-readable spec builder for the NPM Package page.
 * Shared by the interactive UI toggle and the /machine/docs/npm-package route.
 */

import { COMPONENT_COUNT } from "@/data/design-system.generated";

export function buildNpmPackageSpec(): string {
  return `# FT Design System — NPM Package
PACKAGE: ft-design-system
REGISTRY: https://www.npmjs.com/package/ft-design-system

## Install
npm install ft-design-system

## Setup
import 'ft-design-system/styles.css';
import { Button, Input, Table } from 'ft-design-system';

## Tailwind Config
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}'
  ],
}

## Package Includes
- ${COMPONENT_COUNT} production-ready React components
- 190+ custom icons with TypeScript support
- Full TypeScript definitions
- AI-protected components for coding assistants
- Quality gates: npm run check:tokens, npm run check:drift
- WCAG AA accessibility compliant`;
}
