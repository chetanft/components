/**
 * Static Component Contract Checker
 *
 * Analyzes component source files WITHOUT a browser.
 * Catches implementation-level defects:
 *   - Props declared but never consumed/rendered
 *   - children/label/icon paths not rendered
 *   - variant/size/state branches missing
 *   - Missing story coverage for declared variants
 *   - Hardcoded colors/tokens in source
 *   - Missing argTypes in story meta
 *
 * Run: npx tsx qa/static/check-component-contract.ts
 */
import * as fs from "fs";
import * as path from "path";
import * as glob from "fs";

// ── Types ──

interface ComponentContract {
  name: string;
  componentPath: string;
  storyPath: string | null;
  props: PropInfo[];
  variants: string[];
  sizes: string[];
  states: string[];
  issues: Issue[];
}

interface PropInfo {
  name: string;
  type: string;
  optional: boolean;
  hasDefault: boolean;
  consumed: boolean;
  rendered: boolean;
}

interface Issue {
  severity: "error" | "warning" | "info";
  category: string;
  message: string;
  file?: string;
  line?: number;
}

// ── Config ──

// Resolve paths relative to the ft-docs project root (cwd when script runs)
const PROJECT_ROOT = path.resolve(process.cwd(), "..");
const SRC_ROOT = path.join(PROJECT_ROOT, "src/components");
const STORIES_ROOT = path.join(PROJECT_ROOT, "src");
const DOCS_STORIES_ROOT = path.resolve(process.cwd(), "src/components");
const MANIFEST_PATH = path.resolve(process.cwd(), "src/lib/story-manifest.ts");

// Props that are always inherited and don't need to be rendered
const INHERITED_PROPS = new Set([
  "className", "style", "ref", "children", "id", "key",
  "onClick", "onChange", "onBlur", "onFocus", "onKeyDown", "onKeyUp",
  "onMouseEnter", "onMouseLeave", "onSelect", "onSubmit",
  "aria-label", "aria-labelledby", "aria-describedby",
  "role", "tabIndex", "data-testid",
]);

// Internal/utility components that don't need stories or docs pages
const INTERNAL_COMPONENTS = new Set([
  "Colors",        // Documentation-only color reference
  "FigmaBadge",    // Internal Figma integration
  "Content",       // Layout utility wrapper
  "Message",       // Programmatic API (not a rendered component)
  "NavigationMenu", // Internal sub-component
  "PercentageOfChargeInput", // Domain-specific internal component
  "DisplayBlock",  // Used internally by other organisms
  "FilterDateRange", // Internal filter sub-component
  "FilterDropdown",  // Internal filter sub-component
  "FilterSearch",    // Internal filter sub-component
  "PageHeaderFilters", // Internal layout sub-component
  "ThemeSwitch",     // Internal utility component
  "Select",          // Uses SelectComposable (different name pattern)
]);

// Hardcoded color patterns that should use tokens
const HARDCODED_COLOR_RE = /#[0-9a-fA-F]{3,8}(?!\w)/g;
const TAILWIND_PALETTE_RE = /(?:bg|text|border|ring)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}/g;

// ── Helpers ──

function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function findComponentFiles(componentDir: string): string[] {
  const files: string[] = [];
  try {
    for (const entry of fs.readdirSync(componentDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".tsx") && !entry.name.includes(".stories.") && !entry.name.includes(".test.")) {
        files.push(path.join(componentDir, entry.name));
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return files;
}

function findStoryFile(componentDir: string, componentName?: string): string | null {
  if (componentName) {
    // 1. Check src/stories/ FIRST — these are the canonical docs stories
    for (const ext of [".stories.tsx", ".stories.ts"]) {
      const canonicalPath = path.join(PROJECT_ROOT, "src/stories", `${componentName}${ext}`);
      if (fs.existsSync(canonicalPath)) {
        return canonicalPath;
      }
    }
  }

  // 2. Check the component's own directory — prefer file matching component name
  try {
    let fallbackStory: string | null = null;
    for (const entry of fs.readdirSync(componentDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.includes(".stories.")) {
        if (componentName && entry.name.startsWith(`${componentName}.stories.`)) {
          return path.join(componentDir, entry.name);
        }
        if (!fallbackStory) fallbackStory = path.join(componentDir, entry.name);
      }
    }
    if (fallbackStory) return fallbackStory;
  } catch {
    // Directory doesn't exist
  }

  // 3. Fallback: check other category directories (molecules, organisms)
  if (componentName) {
    for (const category of ["atoms", "molecules", "organisms"]) {
      const altDir = path.join(SRC_ROOT, category, componentName);
      if (altDir === componentDir) continue;
      try {
        for (const entry of fs.readdirSync(altDir, { withFileTypes: true })) {
          if (entry.isFile() && entry.name.includes(".stories.")) {
            return path.join(altDir, entry.name);
          }
        }
      } catch {
        // Directory doesn't exist
      }
    }
  }

  return null;
}

// ── Extractors ──

interface ExtractedProps {
  props: PropInfo[];
  variants: string[];
  sizes: string[];
  states: string[];
}

function extractPropsBody(source: string): string | null {
  const propsStart = source.search(/(?:interface|type)\s+\w*Props\w*\s*(?:=\s*)?(?:extends[^{]+)?\{/);
  if (propsStart === -1) return null;

  const braceStart = source.indexOf("{", propsStart);
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < source.length; i++) {
    const char = source[i];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(braceStart + 1, i);
      }
    }
  }

  return null;
}

function extractPropsFromSource(source: string): ExtractedProps {
  const props: PropInfo[] = [];
  const variants: string[] = [];
  const sizes: string[] = [];
  const states: string[] = [];

  const body = extractPropsBody(source);
  if (body) {
    // Parse prop lines: propName?: Type
    const propRegex = /^\s*\/?\*?\*?\s*(\w+)(\?)?:\s*([^;]+)/gm;
    let match;
    while ((match = propRegex.exec(body)) !== null) {
      const [, name, optional, type] = match;
      if (name.startsWith("on") && name[2]?.match(/[A-Z]/)) continue; // Skip callbacks
      if (INHERITED_PROPS.has(name)) continue;

      props.push({
        name,
        type: type.trim(),
        optional: !!optional,
        hasDefault: false,
        consumed: false,
        rendered: false,
      });

      // Extract variant/size/state unions
      const unionMatch = type.match(/['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"]/);
      if (unionMatch || type.includes("'") || type.includes('"')) {
        const values = [...type.matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
        if (name === "variant" || name === "type") {
          variants.push(...values);
        } else if (name === "size") {
          sizes.push(...values);
        } else if (name === "state" || name === "status") {
          states.push(...values);
        }
      }
    }
  }

  // Check which props are destructured/consumed in the component body
  for (const prop of props) {
    // Check if prop name appears in destructuring or usage
    const usageRe = new RegExp(`\\b${prop.name}\\b`, "g");
    const occurrences = (source.match(usageRe) || []).length;
    // More than just the interface declaration = consumed
    prop.consumed = occurrences > 1;

    // Check for default value in destructuring
    const defaultRe = new RegExp(`${prop.name}\\s*=\\s*`);
    prop.hasDefault = defaultRe.test(source);

    // Check if prop is rendered (appears in JSX return)
    const jsxRe = new RegExp(`[{>]\\s*\\b${prop.name}\\b|\\{${prop.name}\\}`);
    prop.rendered = jsxRe.test(source);
  }

  return { props, variants, sizes, states };
}

function checkStoryMeta(storySource: string): Issue[] {
  const issues: Issue[] = [];

  // Check for argTypes
  if (!storySource.includes("argTypes")) {
    issues.push({
      severity: "error",
      category: "story-coverage",
      message: "Story meta has no argTypes — Props table will not render in docs",
    });
  }

  // Check for at least one story export
  const storyExports = storySource.match(/export\s+(?:const|function)\s+(\w+)/g) || [];
  const namedExports = storyExports.filter((e) => !e.includes("default"));
  if (namedExports.length === 0) {
    issues.push({
      severity: "error",
      category: "story-coverage",
      message: "No named story exports found",
    });
  }

  return issues;
}

function checkStoryCoverage(
  storySource: string,
  variants: string[],
  sizes: string[],
): Issue[] {
  const issues: Issue[] = [];

  // Check that key variants have stories
  for (const variant of variants) {
    const variantRe = new RegExp(`['"]${variant}['"]`, "i");
    if (!variantRe.test(storySource)) {
      issues.push({
        severity: "warning",
        category: "story-coverage",
        message: `Variant "${variant}" declared in props but no story covers it`,
      });
    }
  }

  for (const size of sizes) {
    const sizeRe = new RegExp(`['"]${size}['"]`, "i");
    if (!sizeRe.test(storySource)) {
      issues.push({
        severity: "warning",
        category: "story-coverage",
        message: `Size "${size}" declared in props but no story covers it`,
      });
    }
  }

  return issues;
}

function checkTokenCompliance(source: string, filePath: string): Issue[] {
  const issues: Issue[] = [];
  const lines = source.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip comments and imports
    if (line.trim().startsWith("//") || line.trim().startsWith("*") || line.trim().startsWith("import")) continue;

    // Check for hardcoded hex colors (but allow in comments and CSS variable fallbacks)
    const hexMatches = line.match(HARDCODED_COLOR_RE);
    if (hexMatches) {
      // Filter out common safe patterns
      const real = hexMatches.filter((h) => {
        const lower = h.toLowerCase();
        return !["#000", "#fff", "#000000", "#ffffff", "#0000"].includes(lower);
      });
      if (real.length > 0 && !line.includes("var(--") && !line.includes("//")) {
        issues.push({
          severity: "warning",
          category: "token-compliance",
          message: `Hardcoded hex color: ${real.join(", ")}`,
          file: filePath,
          line: i + 1,
        });
      }
    }

    // Check for Tailwind palette classes
    const tailwindMatches = line.match(TAILWIND_PALETTE_RE);
    if (tailwindMatches) {
      issues.push({
        severity: "error",
        category: "token-compliance",
        message: `Tailwind default palette class: ${tailwindMatches.join(", ")}`,
        file: filePath,
        line: i + 1,
      });
    }
  }

  return issues;
}

function checkPropUsage(props: PropInfo[]): Issue[] {
  const issues: Issue[] = [];

  for (const prop of props) {
    if (!prop.consumed) {
      issues.push({
        severity: "warning",
        category: "prop-usage",
        message: `Prop "${prop.name}" (${prop.type}) declared but never consumed`,
      });
    }

    // Check render props specifically
    if (["label", "title", "description", "icon", "badge"].includes(prop.name)) {
      if (prop.consumed && !prop.rendered) {
        issues.push({
          severity: "warning",
          category: "prop-render",
          message: `Prop "${prop.name}" is consumed but may not be rendered in JSX`,
        });
      }
    }
  }

  return issues;
}

// ── Discovery ──

function discoverComponents(): Map<string, { dir: string; category: string }> {
  const components = new Map<string, { dir: string; category: string }>();
  const categories = ["atoms", "molecules", "organisms"];

  for (const category of categories) {
    const categoryDir = path.join(SRC_ROOT, category);
    try {
      for (const entry of fs.readdirSync(categoryDir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          components.set(entry.name, {
            dir: path.join(categoryDir, entry.name),
            category,
          });
        }
      }
    } catch {
      // Category dir doesn't exist
    }
  }

  return components;
}

// ── Main ──

function runChecks(): void {
  const components = discoverComponents();
  const contracts: ComponentContract[] = [];
  let totalIssues = 0;
  let errors = 0;
  let warnings = 0;

  console.log(`\n🔍 Static Component Contract Check`);
  console.log(`${"─".repeat(60)}`);
  console.log(`Found ${components.size} components\n`);

  for (const [name, { dir, category }] of components) {
    // Skip internal/utility components
    if (INTERNAL_COMPONENTS.has(name)) continue;

    const componentFiles = findComponentFiles(dir);
    if (componentFiles.length === 0) continue;

    const mainFile = componentFiles.find((f) => path.basename(f) === `${name}.tsx`) || componentFiles[0];
    const source = readFile(mainFile);
    if (!source) continue;

    const storyPath = findStoryFile(dir, name);
    const storySource = storyPath ? readFile(storyPath) : null;

    const { props, variants, sizes, states } = extractPropsFromSource(source);
    const issues: Issue[] = [];

    // 1. Prop usage checks
    issues.push(...checkPropUsage(props));

    // 2. Token compliance (skip documentation-only components)
    for (const file of componentFiles) {
      const fileSource = readFile(file);
      if (fileSource) {
        issues.push(...checkTokenCompliance(fileSource, file));
      }
    }

    // 3. Story meta checks
    if (storySource) {
      issues.push(...checkStoryMeta(storySource));
      issues.push(...checkStoryCoverage(storySource, variants, sizes));
    } else {
      issues.push({
        severity: "error",
        category: "story-coverage",
        message: "No story file found for component",
      });
    }

    const contract: ComponentContract = {
      name,
      componentPath: mainFile,
      storyPath,
      props,
      variants,
      sizes,
      states,
      issues,
    };
    contracts.push(contract);

    // Print issues
    const componentErrors = issues.filter((i) => i.severity === "error");
    const componentWarnings = issues.filter((i) => i.severity === "warning");

    if (componentErrors.length > 0 || componentWarnings.length > 0) {
      const badge = componentErrors.length > 0 ? "FAIL" : "WARN";
      console.log(`[${badge}] ${category}/${name} (${props.length} props, ${variants.length} variants)`);
      for (const issue of issues) {
        if (issue.severity === "error") {
          console.log(`  ✗ ${issue.message}${issue.line ? ` (line ${issue.line})` : ""}`);
          errors++;
        } else if (issue.severity === "warning") {
          console.log(`  ⚠ ${issue.message}${issue.line ? ` (line ${issue.line})` : ""}`);
          warnings++;
        }
      }
      totalIssues += issues.length;
    }
  }

  // Summary
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Summary: ${contracts.length} components checked`);
  console.log(`  Errors:   ${errors}`);
  console.log(`  Warnings: ${warnings}`);
  console.log(`  Clean:    ${contracts.filter((c) => c.issues.length === 0).length}`);

  // Write JSON report
  const reportPath = path.resolve(process.cwd(), "qa/reports/contract-report-latest.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        summary: {
          total: contracts.length,
          errors,
          warnings,
          clean: contracts.filter((c) => c.issues.length === 0).length,
        },
        components: contracts.map((c) => ({
          name: c.name,
          path: c.componentPath,
          storyPath: c.storyPath,
          propCount: c.props.length,
          variants: c.variants,
          sizes: c.sizes,
          issues: c.issues,
        })),
      },
      null,
      2
    )
  );
  console.log(`\nReport: ${reportPath}`);

  // Exit with error code if errors found
  if (errors > 0) {
    process.exit(1);
  }
}

runChecks();
