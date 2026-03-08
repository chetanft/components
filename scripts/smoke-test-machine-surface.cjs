#!/usr/bin/env node
'use strict';

/**
 * Post-deploy smoke test for the AI-facing machine-readable surface.
 *
 * Usage:
 *   node scripts/smoke-test-machine-surface.cjs https://ft-design-system.dev
 *   node scripts/smoke-test-machine-surface.cjs https://ft-design-system.dev --dry-run
 *
 * Exits 0 if every endpoint returns the expected status, content-type, and
 * (where specified) body substring. Exits 1 if any check fails.
 */

const CHECKS = [
  { url: '/llms.txt',                        expectStatus: 200, expectContentType: 'text/plain', expectBodyContains: 'FT Design System' },
  { url: '/.well-known/llms.txt',            expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/docs',                    expectStatus: 200, expectContentType: 'text/plain', expectBodyContains: 'FT Design System' },
  { url: '/machine/docs/ai-prompts',         expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/docs/for-developers',     expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/docs/global-css',         expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/colors',                  expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/icons',                   expectStatus: 200, expectContentType: 'text/plain' },
  { url: '/machine/docs/components/button',  expectStatus: 200, expectContentType: 'text/plain' },
];

function parseArgs(argv) {
  const args = { baseUrl: null, dryRun: false };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (!arg.startsWith('--')) {
      args.baseUrl = arg.replace(/\/+$/, ''); // strip trailing slashes
    }
  }

  return args;
}

function printTable(rows) {
  // rows: [{ url, status, contentType, result }]
  const cols = {
    url:         Math.max('URL'.length,          ...rows.map((r) => r.url.length)),
    status:      Math.max('Status'.length,       ...rows.map((r) => String(r.status).length)),
    contentType: Math.max('Content-Type'.length, ...rows.map((r) => r.contentType.length)),
    result:      Math.max('Result'.length,       ...rows.map((r) => r.result.length)),
  };

  const header = [
    'URL'.padEnd(cols.url),
    'Status'.padEnd(cols.status),
    'Content-Type'.padEnd(cols.contentType),
    'Result'.padEnd(cols.result),
  ].join('  ');

  const separator = [
    '-'.repeat(cols.url),
    '-'.repeat(cols.status),
    '-'.repeat(cols.contentType),
    '-'.repeat(cols.result),
  ].join('  ');

  console.log(header);
  console.log(separator);
  for (const row of rows) {
    console.log([
      row.url.padEnd(cols.url),
      String(row.status).padEnd(cols.status),
      row.contentType.padEnd(cols.contentType),
      row.result.padEnd(cols.result),
    ].join('  '));
  }
}

async function runChecks(baseUrl) {
  const results = [];
  let failures = 0;

  for (const check of CHECKS) {
    const fullUrl = `${baseUrl}${check.url}`;
    let status = '-';
    let contentType = '-';
    let result = 'FAIL';

    try {
      const res = await fetch(fullUrl);
      status = res.status;
      contentType = (res.headers.get('content-type') || '').split(';')[0].trim();
      const body = await res.text();

      const statusOk = status === check.expectStatus;
      const ctOk = contentType === check.expectContentType;
      const bodyOk = check.expectBodyContains ? body.includes(check.expectBodyContains) : true;

      if (statusOk && ctOk && bodyOk) {
        result = 'PASS';
      } else {
        const reasons = [];
        if (!statusOk)  reasons.push(`status ${status} != ${check.expectStatus}`);
        if (!ctOk)      reasons.push(`ct "${contentType}" != "${check.expectContentType}"`);
        if (!bodyOk)    reasons.push(`body missing "${check.expectBodyContains}"`);
        result = `FAIL (${reasons.join(', ')})`;
      }
    } catch (err) {
      result = `FAIL (${err.message})`;
    }

    if (!result.startsWith('PASS')) failures++;

    results.push({ url: check.url, status: String(status), contentType, result });
  }

  return { results, failures };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.baseUrl) {
    console.error('Usage: node scripts/smoke-test-machine-surface.cjs <base-url> [--dry-run]');
    process.exit(1);
  }

  console.log(`\nSmoke-testing machine-readable surface: ${args.baseUrl}\n`);

  if (args.dryRun) {
    console.log('Dry-run mode — listing endpoints that would be checked:\n');
    const rows = CHECKS.map((c) => ({
      url: c.url,
      status: String(c.expectStatus),
      contentType: c.expectContentType,
      result: c.expectBodyContains ? `body contains "${c.expectBodyContains}"` : '-',
    }));
    printTable(rows);
    console.log(`\n${CHECKS.length} endpoint(s) would be checked.`);
    process.exit(0);
  }

  const { results, failures } = await runChecks(args.baseUrl);

  printTable(results);

  const passed = results.length - failures;
  console.log(`\n${passed}/${results.length} passed.`);

  if (failures > 0) {
    console.error(`${failures} check(s) failed.`);
    process.exit(1);
  }

  console.log('All checks passed.');
}

main();
