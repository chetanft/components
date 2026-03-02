#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();

const checks = [
  {
    file: 'src/stories/AppHeader.stories.tsx',
    pattern: /showThemeIcon\s*:\s*true/,
    message: 'AppHeader stories must enable `showThemeIcon: true` in at least one default preview.',
  },
  {
    file: 'src/components/molecules/Calendar/Calendar.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Calendar story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/Chicklet/Chicklet.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Chicklet story must expose/use `glass`.',
  },
  {
    file: 'src/stories/FileValidationCard.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'FileValidationCard story must expose/use `glass`.',
  },
  {
    file: 'src/components/organisms/Result/Result.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Result story must expose/use `glass`.',
  },
  {
    file: 'src/stories/Upload.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Upload story must expose/use `glass`.',
  },
  {
    file: 'src/stories/UploadZone.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'UploadZone story must expose/use `glass`.',
  },
  {
    file: 'src/stories/RadioSelector.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'RadioSelector story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'ButtonGroup story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'SimpleColumnLayout story must expose/use `glass`.',
  },
  {
    file: 'src/stories/UserProfile.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'UserProfile story must expose/use `glass`.',
  },
  {
    file: 'src/stories/UploadButton.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'UploadButton story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/UploadItem/UploadItem.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'UploadItem story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'UploadThumbnail story must expose/use `glass`.',
  },
  {
    file: 'src/stories/FileThumbnail.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'FileThumbnail story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/Watermark/Watermark.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Watermark story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/Anchor/Anchor.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Anchor story must expose/use `glass`.',
  },
  {
    file: 'src/components/molecules/Affix/Affix.stories.tsx',
    pattern: /\bglass\b\s*[:=]/,
    message: 'Affix story must expose/use `glass`.',
  },
];

const failures = [];

for (const check of checks) {
  const filePath = path.join(root, check.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing file: ${check.file}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (!check.pattern.test(content)) {
    failures.push(`${check.message} (${check.file})`);
  }
}

if (failures.length > 0) {
  console.error('Story visibility checks failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Story visibility checks passed (${checks.length} checks).`);
