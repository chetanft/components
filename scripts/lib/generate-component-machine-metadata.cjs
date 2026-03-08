'use strict';

const fs = require('fs');
const path = require('path');

function findMatchingBrace(input, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = openIndex; i < input.length; i += 1) {
    const ch = input[i];

    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === '\'' && !inSingle) {
      inSingle = true;
      continue;
    }
    if (inSingle && ch === '\'') {
      inSingle = false;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && !inDouble) {
      inDouble = true;
      continue;
    }
    if (inDouble && ch === '"') {
      inDouble = false;
      continue;
    }
    if (!inSingle && !inDouble && ch === '`' && !inTemplate) {
      inTemplate = true;
      continue;
    }
    if (inTemplate && ch === '`') {
      inTemplate = false;
      continue;
    }
    if (inSingle || inDouble || inTemplate) continue;

    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function splitTopLevelEntries(input) {
  const out = [];
  let current = '';
  let depthCurly = 0;
  let depthSquare = 0;
  let depthParen = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escaped = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    current += ch;

    if (escaped) {
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      escaped = true;
      continue;
    }
    if (!inDouble && !inTemplate && ch === '\'' && !inSingle) {
      inSingle = true;
      continue;
    }
    if (inSingle && ch === '\'') {
      inSingle = false;
      continue;
    }
    if (!inSingle && !inTemplate && ch === '"' && !inDouble) {
      inDouble = true;
      continue;
    }
    if (inDouble && ch === '"') {
      inDouble = false;
      continue;
    }
    if (!inSingle && !inDouble && ch === '`' && !inTemplate) {
      inTemplate = true;
      continue;
    }
    if (inTemplate && ch === '`') {
      inTemplate = false;
      continue;
    }
    if (inSingle || inDouble || inTemplate) continue;

    if (ch === '{') depthCurly += 1;
    else if (ch === '}') depthCurly -= 1;
    else if (ch === '[') depthSquare += 1;
    else if (ch === ']') depthSquare -= 1;
    else if (ch === '(') depthParen += 1;
    else if (ch === ')') depthParen -= 1;

    if (ch === ',' && depthCurly === 0 && depthSquare === 0 && depthParen === 0) {
      out.push(current.slice(0, -1).trim());
      current = '';
    }
  }

  if (current.trim()) out.push(current.trim());
  return out.filter(Boolean);
}

function parseObjectEntries(objBlock) {
  const trimmed = objBlock.trim();
  const inner = trimmed.startsWith('{') && trimmed.endsWith('}')
    ? trimmed.slice(1, -1)
    : trimmed;

  return splitTopLevelEntries(inner)
    .map((entry) => {
      const idx = entry.indexOf(':');
      if (idx === -1) return null;
      const rawKey = entry.slice(0, idx).trim();
      const value = entry.slice(idx + 1).trim();
      const key = rawKey.replace(/^['"`]/, '').replace(/['"`]$/, '');
      return { key, value };
    })
    .filter(Boolean);
}

function parseStringList(value) {
  return value
    .split(',')
    .map((item) => item.trim().replace(/^['"`]/, '').replace(/['"`]$/, ''))
    .filter(Boolean);
}

function toSlug(componentName) {
  return componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function parseManifest(projectRoot) {
  const manifestPath = path.join(projectRoot, 'ft-docs/src/lib/story-manifest.ts');
  const content = fs.readFileSync(manifestPath, 'utf8');
  const entries = [];
  const regex = /'([^']+)'\s*:\s*\(\)\s*=>\s*import\('([^']+)'\)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const componentName = match[1];
    const importPath = match[2];
    const stubBase = path.resolve(path.dirname(manifestPath), importPath);
    const stubPath = fs.existsSync(`${stubBase}.tsx`)
      ? `${stubBase}.tsx`
      : fs.existsSync(`${stubBase}.ts`)
        ? `${stubBase}.ts`
        : null;

    if (!stubPath) continue;

    const stubContent = fs.readFileSync(stubPath, 'utf8');
    const sourceMatch = stubContent.match(/from\s+'([^']+)'/);
    if (!sourceMatch) continue;

    const sourceBase = path.resolve(path.dirname(stubPath), sourceMatch[1]);
    const sourcePath = fs.existsSync(`${sourceBase}.tsx`)
      ? `${sourceBase}.tsx`
      : fs.existsSync(`${sourceBase}.ts`)
        ? `${sourceBase}.ts`
        : null;

    if (!sourcePath) continue;
    entries.push({ componentName, sourcePath });
  }

  return entries;
}

function extractMetaBlock(content) {
  const metaStart = content.search(/const\s+meta[^=]*=\s*{/);
  if (metaStart === -1) return null;
  const openBrace = content.indexOf('{', metaStart);
  if (openBrace === -1) return null;
  const closeBrace = findMatchingBrace(content, openBrace);
  if (closeBrace === -1) return null;
  return content.slice(openBrace, closeBrace + 1);
}

function extractDescription(metaBlock) {
  const nested = metaBlock.match(/description:\s*{\s*component:\s*['"`]([^'"`]+)['"`]/);
  if (nested) return nested[1];
  const direct = metaBlock.match(/description:\s*['"`]([^'"`]+)['"`]/);
  return direct ? direct[1] : '';
}

function extractTags(metaBlock) {
  const tagsMatch = metaBlock.match(/tags:\s*\[([^\]]*)\]/);
  return tagsMatch ? parseStringList(tagsMatch[1]) : [];
}

function extractArgTypes(metaBlock) {
  const argTypesIdx = metaBlock.search(/argTypes\s*:/);
  if (argTypesIdx === -1) return {};
  const openBrace = metaBlock.indexOf('{', argTypesIdx);
  if (openBrace === -1) return {};
  const closeBrace = findMatchingBrace(metaBlock, openBrace);
  if (closeBrace === -1) return {};

  const argTypesBlock = metaBlock.slice(openBrace, closeBrace + 1);
  const argTypes = {};

  for (const entry of parseObjectEntries(argTypesBlock)) {
    if (!entry || !entry.value.startsWith('{')) continue;
    const optionsMatch = entry.value.match(/options\s*:\s*\[([^\]]*)\]/s);
    argTypes[entry.key] = {
      options: optionsMatch ? parseStringList(optionsMatch[1]) : [],
    };
  }

  return argTypes;
}

function extractStoryCount(content) {
  const exports = content.match(/export\s+const\s+([A-Za-z0-9_]+)/g) || [];
  return exports
    .map((line) => line.replace(/^export\s+const\s+/, '').trim())
    .filter((name) => name && name !== 'meta').length;
}

function parseStoryMetadata(componentName, sourcePath) {
  const content = fs.readFileSync(sourcePath, 'utf8');
  const metaBlock = extractMetaBlock(content) || '{}';
  const argTypes = extractArgTypes(metaBlock);
  const propNames = Object.keys(argTypes).filter((name) => name !== 'children');

  return {
    componentName,
    slug: toSlug(componentName),
    sourcePath,
    description: extractDescription(metaBlock),
    tags: extractTags(metaBlock),
    propNames,
    sizeOptions: argTypes.size?.options || [],
    variantOptions: argTypes.variant?.options || [],
    storyCount: extractStoryCount(content),
  };
}

function renderTs(metadataList) {
  const byName = Object.fromEntries(metadataList.map((item) => [item.componentName, item]));
  const bySlug = Object.fromEntries(metadataList.map((item) => [item.slug, item]));

  return [
    '// AUTO-GENERATED — DO NOT EDIT',
    '// Source: scripts/lib/generate-component-machine-metadata.cjs',
    '',
    'export interface ComponentMachineMetadata {',
    '  componentName: string;',
    '  slug: string;',
    '  sourcePath: string;',
    '  description: string;',
    '  tags: string[];',
    '  propNames: string[];',
    '  sizeOptions: string[];',
    '  variantOptions: string[];',
    '  storyCount: number;',
    '}',
    '',
    `export const COMPONENT_MACHINE_METADATA: Record<string, ComponentMachineMetadata> = ${JSON.stringify(byName, null, 2)};`,
    '',
    `export const COMPONENT_MACHINE_METADATA_BY_SLUG: Record<string, ComponentMachineMetadata> = ${JSON.stringify(bySlug, null, 2)};`,
    '',
  ].join('\n');
}

function generateComponentMachineMetadata(projectRoot) {
  const manifestEntries = parseManifest(projectRoot);
  const metadataList = manifestEntries
    .map(({ componentName, sourcePath }) => parseStoryMetadata(componentName, sourcePath))
    .sort((a, b) => a.componentName.localeCompare(b.componentName));

  const tsPath = path.join(projectRoot, 'ft-docs/src/data/component-machine-metadata.generated.ts');
  const tsContent = renderTs(metadataList);
  fs.mkdirSync(path.dirname(tsPath), { recursive: true });
  fs.writeFileSync(tsPath, tsContent, 'utf8');

  return { tsPath, count: metadataList.length };
}

module.exports = { generateComponentMachineMetadata };
