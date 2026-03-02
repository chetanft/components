# Specs Source of Truth

This directory is the canonical implementation contract for FT Design System.

Order of precedence:
1. `specs/` (normative)
2. `src/` implementation
3. Docs in `docs/` (informational)

Any UI change must:
- read relevant specs first
- implement according to specs
- pass token checks (`npm run check:tokens`)
