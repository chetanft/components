#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const checks = [
  {
    file: 'src/components/atoms/Button/Button.tsx',
    mustContain: [
      "xxs: {",
      "padding: 'px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]'",
      "xs: {",
      "padding: 'px-[var(--spacing-x2)] py-[var(--spacing-x1)]'",
      "sm: {",
      "padding: 'px-[var(--spacing-x3)] py-[var(--spacing-x2)]'",
      "md: {",
      "padding: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]'",
      "lg: {",
      "padding: 'px-[var(--spacing-x5)] py-[var(--spacing-x4)]'",
      "xl: {",
      "padding: 'px-[var(--spacing-x6)] py-[var(--spacing-x5)]'",
      "xxl: {",
      "padding: 'px-[var(--spacing-x7)] py-[var(--spacing-x6)]'",
    ],
  },
  {
    file: 'src/components/atoms/Textarea/TextareaField.tsx',
    mustContain: [
      "md: {",
      "padding: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]'",
      "fontSize: 'text-sm-rem'",
      "xxs: {",
      "padding: 'px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]'",
      "xs: {",
      "padding: 'px-[var(--spacing-x2)] py-[var(--spacing-x1)]'",
      "lg: {",
      "fontSize: 'text-md-rem'",
      "xl: {",
      "fontSize: 'text-md-rem'",
      "xxl: {",
      "fontSize: 'text-lg-rem'",
    ],
  },
  {
    file: 'src/components/molecules/Select/SelectTrigger.tsx',
    mustContain: [
      "xxs: 'h-component-xxs text-xs-rem px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]'",
      "xs: 'h-component-xs text-xs-rem px-[var(--spacing-x2)] py-[var(--spacing-x1)]'",
      "sm: 'h-component-sm text-sm-rem px-[var(--spacing-x3)] py-[var(--spacing-x2)]'",
      "md: 'h-component-md text-sm-rem px-[var(--spacing-x4)] py-[var(--spacing-x3)]'",
      "lg: 'h-component-lg text-md-rem px-[var(--spacing-x5)] py-[var(--spacing-x4)]'",
      "xl: 'h-component-xl text-md-rem px-[var(--spacing-x6)] py-[var(--spacing-x5)]'",
      "xxl: 'h-component-xxl text-lg-rem px-[var(--spacing-x7)] py-[var(--spacing-x6)]'",
    ],
  },
  {
    file: 'src/components/molecules/Dropdown/Dropdown.styles.ts',
    mustContain: [
      'md: {',
      'fontSize: "text-sm-rem"',
      'padding: "px-[var(--spacing-x4)] py-[var(--spacing-x3)]"',
      'lg: {',
      'padding: "px-[var(--spacing-x5)] py-[var(--spacing-x4)]"',
      'xl: {',
      'padding: "px-[var(--spacing-x6)] py-[var(--spacing-x5)]"',
      'xxl: {',
      'padding: "px-[var(--spacing-x7)] py-[var(--spacing-x6)]"',
    ],
  },
  {
    file: 'src/components/molecules/Dropdown/DropdownTrigger.tsx',
    mustContain: [
      'md: { height: "h-component-md", fontSize: "text-sm-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x4)] py-[var(--spacing-x3)]", iconSize: 18 }',
      'lg: { height: "h-component-lg", fontSize: "text-md-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x5)] py-[var(--spacing-x4)]", iconSize: 20 }',
      'xl: { height: "h-component-xl", fontSize: "text-md-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x6)] py-[var(--spacing-x5)]", iconSize: 22 }',
      'xxl: { height: "h-component-xxl", fontSize: "text-lg-rem", borderRadius: "rounded-lg", padding: "px-[var(--spacing-x7)] py-[var(--spacing-x6)]", iconSize: 24 }',
    ],
  },
  {
    file: 'src/components/molecules/Dropdown/Dropdown.tsx',
    mustContain: [
      'md: "text-sm-rem"',
      'lg: "text-md-rem"',
      'xxl: "text-lg-rem"',
    ],
  },
  {
    file: 'src/components/molecules/Select/SelectValue.tsx',
    mustContain: [
      "md: 'text-sm-rem'",
      "lg: 'text-md-rem'",
      "xxl: 'text-lg-rem'",
    ],
  },
  {
    file: 'src/components/atoms/Avatar/Avatar.tsx',
    mustContain: [
      'xxs: "size-[var(--spacing-x4)] text-xs-rem"',
      'sm: "size-[var(--spacing-x8)] text-sm-rem"',
      'md: "size-[var(--spacing-x10)] text-sm-rem"',
      'lg: "size-[var(--spacing-x12)] text-md-rem"',
      'xl: "size-[var(--spacing-x14)] text-md-rem"',
      'xxl: "size-[var(--spacing-x16)] text-lg-rem"',
    ],
  },
  {
    file: 'src/components/organisms/FileTypeIcon/FileTypeIcon.tsx',
    mustContain: [
      "sm: 'text-sm-rem'",
      "md: 'text-sm-rem'",
      "lg: 'text-md-rem'",
      "xxl: 'text-lg-rem'",
    ],
  },
  {
    file: 'src/components/atoms/Toggle/Toggle.tsx',
    mustContain: [
      "sm: 'h-8 px-[var(--spacing-x3)] min-w-[var(--spacing-x8)] text-sm-rem'",
      "md: 'h-10 px-[var(--spacing-x4)] min-w-[var(--spacing-x10)] text-sm-rem'",
      "lg: 'h-12 px-[var(--spacing-x5)] min-w-[var(--spacing-x12)] text-md-rem'",
    ],
  },
  {
    file: 'src/components/atoms/Badge/Badge.tsx',
    mustContain: [
      'xs: "text-xs-rem"',
      'sm: "text-sm-rem"',
      'md: "text-sm-rem"',
      'lg: "text-md-rem"',
    ],
  },
  {
    file: 'src/components/atoms/Checkbox/CheckboxError.tsx',
    mustContain: [
      'text: "text-sm-rem"',
      'currentSize.text',
    ],
  },
  {
    file: 'src/components/atoms/Checkbox/CheckboxHelper.tsx',
    mustContain: [
      'text: "text-sm-rem"',
      'currentSize.text',
    ],
  },
  {
    file: 'src/components/atoms/Checkbox/CheckboxInput.tsx',
    mustContain: [
      'text: "text-sm-rem"',
    ],
  },
  {
    file: 'src/components/atoms/RadioGroup/RadioItem.tsx',
    mustContain: [
      'text: "text-sm-rem"',
      'currentSize.text',
    ],
  },
  {
    file: 'src/components/atoms/RadioGroup/RadioItemInput.tsx',
    mustContain: [
      'text: "text-sm-rem"',
      'currentSize.text',
    ],
  },
  {
    file: 'src/components/atoms/Spin/Spin.tsx',
    mustContain: [
      "sm: { spinner: 16, container: 'p-[var(--spacing-x2)]', text: 'text-sm-rem' }",
      "lg: { spinner: 32, container: 'p-[var(--spacing-x4)]', text: 'text-md-rem' }",
      'config.text',
    ],
  },
  {
    file: 'src/components/atoms/Switch/SwitchInput.tsx',
    mustContain: [
      'text: "text-sm-rem"',
      'currentSize.text',
    ],
  },
  {
    file: 'src/components/molecules/Rate/Rate.tsx',
    mustContain: [
      "sm: { icon: 16, gap: 'gap-[var(--spacing-x1)]', text: 'text-sm-rem' }",
      "lg: { icon: 32, gap: 'gap-[var(--spacing-x2)]', text: 'text-md-rem' }",
      'config.text',
    ],
  },
  {
    file: 'src/components/molecules/ProgressBar/ProgressBar.tsx',
    mustContain: [
      'sm: { bar: "h-[var(--spacing-x1)]", text: "text-sm-rem" }',
      'lg: { bar: "h-[var(--spacing-x3)]", text: "text-md-rem" }',
      'sizeStyles[size].text',
    ],
  },
  {
    file: 'src/lib/variants/size.ts',
    mustContain: [
      "md: 'h-component-md text-sm-rem'",
      "xxs: 'px-[var(--spacing-x1-5)] py-[var(--spacing-x0-5)]'",
      "xs: 'px-[var(--spacing-x2)] py-[var(--spacing-x1)]'",
      "sm: 'px-[var(--spacing-x3)] py-[var(--spacing-x2)]'",
      "md: 'px-[var(--spacing-x4)] py-[var(--spacing-x3)]'",
      "lg: 'px-[var(--spacing-x5)] py-[var(--spacing-x4)]'",
      "xl: 'px-[var(--spacing-x6)] py-[var(--spacing-x5)]'",
      "xxl: 'px-[var(--spacing-x7)] py-[var(--spacing-x6)]'",
    ],
  },
  {
    file: 'src/components/molecules/List/ListBody.tsx',
    mustContain: [
      '"flex flex-col gap-[var(--spacing-x3)] py-[var(--spacing-x3)] px-[var(--spacing-x4)]"',
    ],
  },
];

const failures = [];

for (const check of checks) {
  const filePath = path.join(ROOT, check.file);
  if (!fs.existsSync(filePath)) {
    failures.push(`${check.file}: missing file`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  for (const snippet of check.mustContain) {
    if (!content.includes(snippet)) {
      failures.push(`${check.file}: missing "${snippet}"`);
    }
  }
}

if (failures.length > 0) {
  console.error('Size contract check failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Size contract check passed.');
