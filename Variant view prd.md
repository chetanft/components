Below is a detailed PRD you can give to Cursor. It is for adding a **new “Variant Explorer” view** inside every component docs page, starting **below the current “Examples” header**. It also includes making the **current left docs sidebar collapsable** so the content area becomes wider.

(Use FT tokens from the global CSS for spacing/colors/typography.) 

---

## PRD: Component Docs “Variant Explorer” + Collapsable Docs Sidebar

### 1) Background (current)

Today, each component page shows:

* Title + description
* Installation snippet
* **Examples** section with a list-style view (many examples stacked vertically)

Problem:

* When component has many variants, user must scroll a lot.
* Hard to compare variants quickly.
* No clear grouping (type/state/size/etc).
* Main content width is limited because left docs sidebar always takes space.

### 2) Goals

1. Add a new view under **Examples**:

   * Left side: list of variant names with clear grouping (Type / State / Size / etc)
   * Right side: selected variant preview + code (same as current preview/code tabs behavior)
2. Make the existing docs sidebar collapsable so the page can use more width.
3. Make it work for **every component** page, using current codebase patterns (no custom one-off per component).

### 3) Non-goals

* Do not change component implementation (only docs UI).
* Do not rewrite Storybook stories.
* Do not remove the existing “list view” examples (we will keep it, but add toggle).

---

## 4) User Stories

### Designer / PM

* I can quickly see all variants and switch between them.
* I can understand variant categories (type/state/size) without reading code.
* I can compare size/states faster.

### Developer

* I can copy the correct code for the selected variant.
* I can see props/args for the selected variant.
* I can navigate variants using keyboard.

---

## 5) Placement (Important)

On each component docs page (example: Button):

* Keep current **Examples** header.
* Directly under **Examples**, add a **view switch**:

  * “List” (existing current view)
  * “Explorer” (new view)

Default:

* Keep default as “List” to avoid breaking current expectation.
* If URL has query param `?view=explorer`, open explorer.

---

## 6) Information Architecture (Explorer View)

### Layout (Explorer)

Two-pane layout:

**Left Pane: Variant Navigator**

* Shows variant groups and items.
* Has search input (optional but highly useful).
* Scrollable.

**Right Pane: Variant Preview**

* Shows selected variant preview.
* Has “Preview / Code” tabs (reuse existing tabs behavior).
* Has copy button (reuse existing copy pattern).

Responsive:

* Desktop: 2 columns (left 280–340px, right flexible)
* Tablet: left collapsable drawer OR top dropdown
* Mobile: variant selection becomes dropdown, preview below

---

## 7) Variant Grouping Rules (Category system)

We need consistent categories across components. Use a **generic grouping engine**.

### Category priority (order)

1. **Type / Variant** (primary, secondary, text, link, etc)
2. **State** (default, hover, active, disabled, loading, error, success…)
3. **Size** (sm, md, lg…)
4. **Icon** (with icon, icon only, icon position…)
5. **Theme** (light/dark/night) *only if story supports it*
6. **Other** (any remaining dimensions)

### How to detect group data (per story)

We should support 2 approaches:

**Approach A (Preferred): Story metadata**

* Each story exports parameters like:

  * `parameters.variantMeta = { type: 'Primary', state: 'Disabled', size: 'MD' }`
* This gives clean and correct grouping.

**Approach B (Fallback): Infer from story name + args**

* Parse story title like “Primary / Disabled / MD”
* Or infer from Story args: `variant`, `size`, `disabled`, `loading`
* This fallback will be imperfect, but helps old stories.

**PRD requirement:**

* Build it so A is supported now.
* Build fallback so existing components still show something even if metadata is missing.

### Display rules

* Group headers are expandable/collapsable.
* Under each group header, show variant items.
* Variant item label should be human readable (no camelCase).

Example (Button):

* Type

  * Primary
  * Secondary
  * Destructive
  * Text
* State

  * Default
  * Disabled
  * Loading
* Size

  * Small
  * Medium
  * Large

---

## 8) Behavior & Interactions

### View toggle (List / Explorer)

* Toggle lives under Examples header.
* Remembers last choice in localStorage:

  * key: `ftds_docs_examples_view`
* URL param (optional):

  * `?view=explorer` or `?view=list` overrides storage

### Selecting a variant

* Click variant item → updates right pane preview
* Selected item has clear highlight
* Also update URL hash or query so it is shareable:

  * Example: `?view=explorer&story=primary-disabled`
* On page refresh, it should keep the selected story.

### Preview area

* Reuse existing “Preview / Code” toggle used in list view.
* Add small header above preview:

  * Variant name
  * Category chips (Type / State / Size) (optional)

### Keyboard support

* Up/Down moves selection in left list
* Enter selects
* Cmd/Ctrl+F focuses search (optional)

### Empty / error states

* If no stories found: show “No variants found for this component.”
* If story render fails: show “Preview failed” + console error.

---

## 9) Collapsable Docs Sidebar (Global)

### What to collapse

The current left docs navigation sidebar (Getting Started, Atoms, etc).

### Behavior

* Add collapse button at top of sidebar (icon button).
* When collapsed:

  * Sidebar becomes slim (icons only) OR fully hidden (preferred: slim)
  * Main content expands width.
* Remember state in localStorage:

  * key: `ftds_docs_sidebar_collapsed`
* Provide tooltip on icons in collapsed mode.

### Breakpoints

* Desktop: collapsable (default expanded)
* Mobile: sidebar becomes overlay drawer (hamburger), default hidden

---

## 10) Technical Requirements (must “plan according to codebase”)

Cursor should implement by following existing docs site structure.

### Where to implement

1. Identify current component docs template used for all component pages:

   * Likely a shared MDX layout or a docs page wrapper component.
2. Implement **Variant Explorer** as a reusable component:

   * `VariantExplorer` (generic)
   * `ExamplesSection` (holds List/Explorer toggle)
3. Integrate at the same point where current Examples list is rendered.

### Data source

* Use existing “stories list” already shown in Examples.
* The Explorer should use the same Story rendering pipeline as list view (so output matches).
* No duplication of story rendering logic.

### Suggested internal data model

Normalize each story into:

* `id` (stable story id/slug)
* `name` (display)
* `groupMeta` (type/state/size/…)
* `renderNode` (how you already render preview)
* `codeString` (how you already render code tab)
* `args/controls` (if needed)

### Styling

* Use FT tokens and existing CSS variables for spacing, borders, radius. 
* Keep UI consistent with FT look (same button, tabs, search input patterns).

---

## 11) Analytics (Optional but helpful)

Track:

* Examples view switch: list ↔ explorer
* Sidebar collapse toggle
* Variant selection events

(If analytics not present, skip.)

---

## 12) Performance Requirements

* Do not render all previews at once in Explorer.

  * Only render selected preview (important).
* Left pane can render list of variants (lightweight).
* Keep search filtering fast.

---

## 13) Accessibility Requirements

* Variant list is a proper listbox / menu pattern.
* Selected state announced to screen reader.
* Focus visible states follow existing style.
* Sidebar collapse button accessible label.

---

## 14) Acceptance Criteria (Test checklist)

### Explorer view

* [ ] Under Examples header, user can switch to Explorer view
* [ ] Left pane shows variants grouped (Type/State/Size…)
* [ ] Clicking a variant updates right preview and code
* [ ] Preview/Code tabs work same as current
* [ ] Selected variant persists on refresh (URL or local storage)
* [ ] Works for Button page and at least 3 other components

### Sidebar collapse

* [ ] Sidebar can collapse and expand
* [ ] Main content width increases when collapsed
* [ ] Collapsed state persists on refresh
* [ ] Mobile shows drawer behavior

---

## 15) Rollout Plan

1. Build Explorer UI using Button page as first test.
2. Validate it works with components having different story patterns (simple + complex).
3. Add story metadata gradually (optional improvement):

   * If metadata missing, fallback inference used.
4. Release behind a feature flag if needed:

   * `docs.examplesExplorer.enabled = true`


Got it 👍
I will **extend the PRD** and clearly mention that **the right side must show BOTH Preview and Code**, using the **existing Preview / Code tabs** (same UI, same logic).

Below is the **add-on section** you can directly paste into the PRD you give to Cursor.

---

## 🔁 Important Addition: Preview + Code in Explorer Right Panel

### Context (current behavior)

In the current docs:

* Every example already supports:

  * **Preview tab** (component rendered)
  * **Code tab** (JSX code)
* This UI already exists and works well.

👉 **We must reuse this exactly. Do not redesign it.**

---

## ✅ Requirement: Explorer Right Side Must Show Preview + Code

### What to show (mandatory)

For **each selected variant** in Explorer view:

* Right side must show:

  * **Preview tab**
  * **Code tab**
  * **Copy code button**
* Same layout, same styling, same interaction as current example blocks.

This is **not optional**.

---

### Layout details (Right Panel)

Structure (top to bottom):

1. **Variant Header (small)**

   * Variant name
     Example: `Primary · Disabled · MD`
   * Optional chips:

     * Type
     * State
     * Size

2. **Preview / Code Tabs** (reuse existing)

   * Default selected: **Preview**
   * Switch to **Code** shows JSX snippet
   * Copy icon stays at top-right (same as today)

3. **Content Area**

   * Preview:

     * Centered component (same container as today)
   * Code:

     * Same dark code block
     * Same syntax highlighting
     * Same copy behavior

📌 **Do NOT create a new preview renderer.**
📌 **Use the same component already used in current Examples list.**

---

### Interaction rules

* When user selects a variant on the left:

  * Right panel updates **both preview + code**
* Switching Preview ↔ Code:

  * Should NOT reset selected variant
* Refresh page:

  * Selected variant + active tab should persist (URL or localStorage)

---

### Technical instruction for Cursor (important)

* The Explorer should internally call the **same Example renderer** used today.
* Only difference:

  * Instead of rendering many examples vertically,
  * Render **only one example at a time**, based on selected variant.

This avoids:

* Duplicate logic
* Styling mismatch
* Bugs between List view and Explorer view

---

## ✅ Acceptance Criteria (Updated)

* [ ] Explorer right panel shows **Preview and Code tabs**
* [ ] Code output is identical to current list view example
* [ ] Copy button works
* [ ] Preview layout looks exactly same as existing example preview
* [ ] No new preview/code implementation added

---

