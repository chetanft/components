# Docs UI Rendering & Discrepancy Report

## Executive Summary
The "docs ui" (`ft-docs`) implements a strict filtering system designed to ensure only variants that match the Figma design specifications are displayed. This system is currently causing visibility issues for several components and variants that exist in the code but do not match the strict "Figma-compliant" naming conventions.

## 1. Why Components Are Not Rendering
**Issue**: Some components (e.g., `Alert`, `Breadcrumb`, `Charts`, `Drawer`) are completely missing from the docs.
**Cause**: These components have **zero stories** (examples) defined in the codebase.
- The `NON_FIGMA_VARIANTS_REPORT.md` indicates that 425 non-Figma variants were removed.
- For components that *only* had non-Figma variants, this removal left them with no examples at all.
- Without a `.stories.tsx` file or valid stories, the docs generation script skips the component entirely.

**Example**:
- `src/components/molecules/Alert/` contains `Alert.tsx` but **no** `Alert.stories.tsx`.
- `src/stories/` also does not contain `Alert.stories.tsx`.

## 2. Why Variants Are Not Rendering
**Issue**: Visible components (e.g., `Button`) are missing specific variants (e.g., `CircularButtons`, `Xs` size) in the docs, even though they exist in the code.
**Cause**: The `component-metadata.ts` file enforces a **strict regex allowlist** for variant names.
- **Filtering Logic**: The system checks every variant against a list of "Figma-approved" patterns.
- **Hidden Variants**: Any variant that does not match these patterns is silently filtered out.

**Example (Button)**:
- **Code**: `Button.stories.tsx` contains a `CircularButtons` story and `Xs` size variants.
- **Filter**: The allowed pattern for Button is `/^(Primary|Secondary|Tertiary|Destructive|Text|Link)$/`.
- **Result**: `CircularButtons` and `Xs` (size-only) variants do not match the pattern and are hidden from the docs.

## 3. Why Discrepancies Exist (Code vs. Figma)
**Issue**: "Some have different variations which are not in Figma design."
**Cause**: The codebase has evolved to include implementation details and variations that are not part of the official Figma design system.
- **Code Reality**: Developers added useful variations (like "Circular" buttons or extra sizes) that work in the app.
- **Design Reality**: Figma only defines the core set (Primary, Secondary, etc.).
- **Docs Reality**: The docs attempt to bridge this gap by *hiding* the non-Figma variants, but this creates confusion because the code clearly supports them.

## 4. Detailed Component Status

| Component | Status in Docs | Missing Variants/Reason |
|-----------|----------------|-------------------------|
| **Alert** | ❌ Not Visible | No stories defined (all removed). |
| **Breadcrumb**| ❌ Not Visible | No stories defined. |
| **Button** | ⚠️ Partial | `CircularButtons`, `Xs` size hidden by filter. |
| **Input** | ⚠️ Partial | Usage examples hidden; only "Default", "Error", etc. shown. |
| **Badge** | ✅ Visible | Matches Figma patterns. |

## 5. Recommendations

1.  **Restore Missing Stories**:
    - Create new `FigmaVariants` stories for components like `Alert` and `Breadcrumb` that currently have none.
    - Ensure these new stories use naming conventions that match the Figma design (e.g., "Default", "Warning", "Error").

2.  **Review "Hidden" Variants**:
    - Decide if variants like `CircularButtons` are official.
    - **If Official**: Update `component-metadata.ts` patterns to include them.
    - **If Unofficial**: Keep them hidden or mark them as "Implementation Only" in the docs (requires code change).

3.  **Sync Code & Design**:
    - The long-term fix is to ensure the Figma design is updated to reflect useful code variants, or refactor code to strictly match Figma if strict adherence is required.
