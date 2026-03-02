#!/usr/bin/env node
/**
 * Codemod: Backfill parameters.docsOnly = true on all Docs-prefixed stories
 *
 * Finds every `export const Docs*: Story = { ... }` and ensures the story
 * object contains `parameters: { docsOnly: true }`.
 *
 * Handles:
 *   - Stories with no parameters block → adds one
 *   - Stories with existing parameters block → merges docsOnly into it
 *   - Stories already having docsOnly: true → skips
 *
 * Usage: node scripts/codemods/backfill-docs-only-param.cjs [--dry-run] [--file path]
 */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const ROOT = path.resolve(__dirname, "../..");
const DRY_RUN = process.argv.includes("--dry-run");
const SINGLE_FILE = process.argv.find((a, i) => process.argv[i - 1] === "--file");

const STORY_GLOBS = [
  "src/components/**/*.stories.tsx",
  "src/stories/*.stories.tsx",
];

/**
 * Find the matching closing brace for the story object.
 * Starts right after the opening `{` of `export const DocsFoo: Story = {`.
 */
function findClosingBrace(source, openIndex) {
  let depth = 1;
  let i = openIndex + 1;
  while (i < source.length && depth > 0) {
    const ch = source[i];
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    // Skip string literals
    if (ch === "'" || ch === '"' || ch === "`") {
      const quote = ch;
      i++;
      while (i < source.length && source[i] !== quote) {
        if (source[i] === "\\") i++; // skip escaped char
        i++;
      }
    }
    // Skip template literals with expressions
    if (ch === "/" && source[i + 1] === "/") {
      // line comment
      while (i < source.length && source[i] !== "\n") i++;
    }
    if (ch === "/" && source[i + 1] === "*") {
      // block comment
      i += 2;
      while (i < source.length - 1 && !(source[i] === "*" && source[i + 1] === "/")) i++;
      i++; // skip past /
    }
    i++;
  }
  return depth === 0 ? i - 1 : -1;
}

function processFile(relPath) {
  const fullPath = path.join(ROOT, relPath);
  let source = fs.readFileSync(fullPath, "utf8");
  const patches = [];

  // Match: export const DocsFoo: Story = {
  const exportRe = /export\s+const\s+(Docs\w+)\s*:\s*Story\s*=\s*\{/g;
  let m;

  while ((m = exportRe.exec(source)) !== null) {
    const name = m[1];
    const openBraceIndex = m.index + m[0].length - 1; // index of `{`
    const closeBraceIndex = findClosingBrace(source, openBraceIndex);

    if (closeBraceIndex === -1) continue;

    const storyBody = source.slice(openBraceIndex, closeBraceIndex + 1);

    // Skip if already has docsOnly
    if (/docsOnly\s*:\s*true/.test(storyBody)) continue;

    // Check if there's already a parameters block
    const paramsMatch = storyBody.match(/(\n\s*)parameters\s*:\s*\{/);

    if (paramsMatch) {
      // Has parameters — inject docsOnly: true after `parameters: {`
      const paramsIndex = storyBody.indexOf(paramsMatch[0]);
      const insertAfter = paramsIndex + paramsMatch[0].length;
      const absInsertPos = openBraceIndex + insertAfter;
      // Detect indentation: parameters line indent + 2 more spaces
      const indent = paramsMatch[1] + "  ";
      patches.push({
        name,
        action: "merge",
        pos: absInsertPos,
        insert: `\n${indent}docsOnly: true,`,
      });
    } else {
      // No parameters block — insert before closing brace
      // Detect the indentation of the story object
      const lastNewline = source.lastIndexOf("\n", closeBraceIndex);
      const closingIndent = source.slice(lastNewline + 1, closeBraceIndex).replace(/\S.*/, "");
      const propIndent = closingIndent + "  ";

      // Check if there's a trailing comma before the closing brace
      const beforeClose = source.slice(openBraceIndex + 1, closeBraceIndex).trimEnd();
      const needsComma = beforeClose.length > 0 && !beforeClose.endsWith(",");

      patches.push({
        name,
        action: "add",
        pos: closeBraceIndex,
        insert: `${needsComma ? "," : ""}\n${propIndent}parameters: { docsOnly: true },\n${closingIndent}`,
      });
    }
  }

  if (patches.length === 0) return { file: relPath, count: 0, names: [] };

  // Apply patches in reverse order so positions remain valid
  patches.sort((a, b) => b.pos - a.pos);

  let updated = source;
  for (const p of patches) {
    if (p.action === "add") {
      // Replace closing brace with insert + closing brace
      updated = updated.slice(0, p.pos) + p.insert + "}";
    } else {
      // Insert after position
      updated = updated.slice(0, p.pos) + p.insert + updated.slice(p.pos);
    }
  }

  if (!DRY_RUN) {
    fs.writeFileSync(fullPath, updated, "utf8");
  }

  return {
    file: relPath,
    count: patches.length,
    names: patches.map((p) => `${p.name} (${p.action})`),
  };
}

function main() {
  let files = [];
  if (SINGLE_FILE) {
    files = [SINGLE_FILE];
  } else {
    for (const g of STORY_GLOBS) {
      files.push(...glob.sync(g, { cwd: ROOT }));
    }
  }

  console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Processing ${files.length} files...\n`);

  let totalPatched = 0;
  const results = [];

  for (const f of files.sort()) {
    const result = processFile(f);
    if (result.count > 0) {
      results.push(result);
      totalPatched += result.count;
      console.log(`  ${result.file}: ${result.count} stories`);
      for (const n of result.names) {
        console.log(`    ${n}`);
      }
    }
  }

  console.log(`\nTotal: ${totalPatched} stories patched across ${results.length} files`);
  if (DRY_RUN) {
    console.log("(dry run - no files modified)");
  }
}

main();
