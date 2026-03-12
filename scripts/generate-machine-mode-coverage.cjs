#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const requiredSurfaces = [
  {
    route: '/docs',
    file: 'ft-docs/src/app/docs/[[...slug]]/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/components/[component]',
    file: 'ft-docs/src/components/story-component-page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/ai-prompts',
    file: 'ft-docs/src/app/docs/ai-prompts/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/for-designers',
    file: 'ft-docs/src/app/docs/for-designers/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/for-developers',
    file: 'ft-docs/src/app/docs/for-developers/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/storybook',
    file: 'ft-docs/src/app/docs/storybook/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/npm-package',
    file: 'ft-docs/src/app/docs/npm-package/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/global-css',
    file: 'ft-docs/src/app/docs/global-css/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/accessibility',
    file: 'ft-docs/src/app/docs/accessibility/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/docs/migrations',
    file: 'ft-docs/src/app/docs/migrations/page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
  {
    route: '/icons',
    file: 'ft-docs/src/app/icons/page.tsx',
    check: ['globalViewMode === \'machine\'', 'globalViewMode === "machine"'],
  },
  {
    route: '/colors',
    file: 'ft-docs/src/app/colors/page.tsx',
    check: ['viewMode === \'machine\'', 'viewMode === "machine"'],
  },
  {
    route: '/charts/*',
    file: 'ft-docs/src/components/chart-page.tsx',
    check: ['viewMode === "machine"', 'viewMode === \'machine\''],
  },
];

function read(file) {
  return fs.readFileSync(path.join(projectRoot, file), 'utf8');
}

function hasMachineMode(content, patterns) {
  return patterns.some((pattern) => content.includes(pattern));
}

function generateCoverage() {
  const rows = requiredSurfaces.map((surface) => {
    const content = read(surface.file);
    const covered = hasMachineMode(content, surface.check);
    return {
      route: surface.route,
      file: surface.file,
      status: covered ? 'covered' : 'missing',
    };
  });

  const summary = {
    total: rows.length,
    covered: rows.filter((row) => row.status === 'covered').length,
    missing: rows.filter((row) => row.status === 'missing').length,
  };

  const jsonPath = path.join(projectRoot, 'docs/audits/machine-mode-coverage.json');
  const mdPath = path.join(projectRoot, 'docs/audits/machine-mode-coverage.md');

  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  const generatedAt = process.env.SYNC_TIMESTAMP || new Date().toISOString();
  fs.writeFileSync(jsonPath, JSON.stringify({ generatedAt, summary, rows }, null, 2) + '\n');

  const md = [
    '# Machine Mode Coverage',
    '',
    `- Total required routes: ${summary.total}`,
    `- Covered: ${summary.covered}`,
    `- Missing: ${summary.missing}`,
    '',
    '| Route | Status | Source |',
    '| --- | --- | --- |',
    ...rows.map((row) => `| \`${row.route}\` | ${row.status} | \`${row.file}\` |`),
    '',
  ].join('\n');

  fs.writeFileSync(mdPath, md);
  return { summary, rows, jsonPath, mdPath };
}

if (require.main === module) {
  const strict = process.argv.includes('--strict');
  const result = generateCoverage();
  if (strict && result.summary.missing > 0) {
    console.error(`Machine mode coverage failed: ${result.summary.missing} required route(s) missing.`);
    process.exit(1);
  }
}

module.exports = { generateCoverage };

