#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

function findObjectBlock(source, key, from = 0) {
  const keyIdx = source.indexOf(`${key}:`, from);
  if (keyIdx === -1) return null;
  const braceStart = source.indexOf("{", keyIdx);
  if (braceStart === -1) return null;
  let depth = 1;
  let i = braceStart + 1;
  while (i < source.length && depth > 0) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") depth--;
    i++;
  }
  if (depth !== 0) return null;
  return { keyIdx, braceStart, braceEnd: i - 1 };
}

function lineIndentAt(source, idx) {
  const start = source.lastIndexOf("\n", idx) + 1;
  const line = source.slice(start, idx);
  const m = line.match(/^\s*/);
  return m ? m[0] : "";
}

function choosePreset(relFile) {
  const f = relFile.replace(/\\/g, "/");
  const base = path.basename(f);

  const tokenSpacingNames = new Set([
    "Button.stories.tsx",
    "Input.stories.tsx",
    "Checkbox.stories.tsx",
    "RadioGroup.stories.tsx",
    "Switch.stories.tsx",
    "Toggle.stories.tsx",
    "Badge.stories.tsx",
    "Avatar.stories.tsx",
    "Textarea.stories.tsx",
    "InputNumber.stories.tsx",
    "Dropdown.stories.tsx",
    "Select.stories.tsx",
    "DatePicker.stories.tsx",
    "TimePicker.stories.tsx",
    "SegmentedTabs.stories.tsx",
    "Pagination.stories.tsx",
    "Steps.stories.tsx",
    "ToggleGroup.stories.tsx",
    "ButtonGroup.stories.tsx",
    "Chicklet.stories.tsx",
    "Mentions.stories.tsx",
    "Rate.stories.tsx",
    "Slider.stories.tsx",
    "Tooltip.stories.tsx",
    "UploadButton.stories.tsx",
    "UploadItem.stories.tsx",
    "Card.stories.tsx",
    "Modal.stories.tsx",
    "Drawer.stories.tsx",
    "Tabs.stories.tsx",
    "TableComposable.stories.tsx",
    "Table.stories.tsx",
    "QuickFilters.stories.tsx",
    "Tree.stories.tsx",
    "TreeSelect.stories.tsx",
    "Transfer.stories.tsx",
    "ProgressBar.stories.tsx",
    "ProgressList.stories.tsx",
    "Upload.stories.tsx",
    "UploadZone.stories.tsx",
    "UploadFlow.stories.tsx",
    "UploadThumbnail.stories.tsx",
    "Divider.stories.tsx",
    "Spacer.stories.tsx",
    "SubText.stories.tsx",
    "Text.stories.tsx",
    "Typography.stories.tsx",
    "Affix.stories.tsx",
    "Alert.stories.tsx",
    "Anchor.stories.tsx",
    "BackTop.stories.tsx",
    "Breadcrumb.stories.tsx",
    "Calendar.stories.tsx",
    "Carousel.stories.tsx",
    "Cascader.stories.tsx",
    "Descriptions.stories.tsx",
    "DropdownMenu.stories.tsx",
    "Empty.stories.tsx",
    "FloatButton.stories.tsx",
    "List.stories.tsx",
    "Loader.stories.tsx",
    "Notification.stories.tsx",
    "Popconfirm.stories.tsx",
    "RadioSelector.stories.tsx",
    "Timeline.stories.tsx",
    "Tour.stories.tsx",
    "Watermark.stories.tsx",
    "Collapsible.stories.tsx",
    "Footer.stories.tsx",
    "Form.stories.tsx",
    "PageHeader.stories.tsx",
    "Result.stories.tsx",
    "AppHeader.stories.tsx",
    "NavigationLauncher.stories.tsx",
    "NavigationPopover.stories.tsx",
    "Label.stories.tsx",
    "ReadOnly.stories.tsx",
    "UserProfile.stories.tsx",
    "FileCard.stories.tsx",
    "FileValidationCard.stories.tsx",
    "FileTypeIcon.stories.tsx",
    "Spin.stories.tsx",
    "Statistic.stories.tsx",
    "ColorPicker.stories.tsx",
    "HoverCard.stories.tsx",
    "SimpleColumnLayout.stories.tsx",
    "DataEntryTable.stories.tsx",
    "Grid.stories.tsx",
    "ThemeSystem.stories.tsx",
    "FileThumbnail.stories.tsx",
    "Icon.stories.tsx",
    "Image.stories.tsx",
    "Illustration.stories.tsx",
    "Logo.stories.tsx",
    "StackedBarChart.stories.tsx",
    "AreaChart.stories.tsx",
    "ColorSystem.stories.tsx",
    "LineChart.stories.tsx",
    "PieChart.stories.tsx",
    "RadarChart.stories.tsx",
    "RadialChart.stories.tsx",
  ]);

  if (
    tokenSpacingNames.has(base) ||
    /\/src\/stories\/(Input|UploadButton)\.stories\.tsx$/.test(f)
  ) {
    return "token";
  }

  if (/Chart\.stories\.tsx$/.test(base) || /\/charts\//.test(f)) {
    return "box";
  }

  return "box";
}

function makeInspectorBlock(indent, mode) {
  const i1 = indent;
  const i2 = `${indent}  `;
  const i3 = `${indent}    `;
  const i4 = `${indent}      `;

  if (mode === "token") {
    return (
      `${i1}inspector: {\n` +
      `${i2}enabled: true,\n` +
      `${i2}defaultMode: 'token-spacing' as const,\n` +
      `${i2}spacingHints: {\n` +
      `${i3}outerXToken: 'x6',\n` +
      `${i3}outerYToken: 'x3',\n` +
      `${i3}innerGapToken: 'x2',\n` +
      `${i2}},\n` +
      `${i1}},`
    );
  }

  return (
    `${i1}inspector: {\n` +
    `${i2}enabled: true,\n` +
    `${i2}defaultMode: 'box-model' as const,\n` +
    `${i1}},`
  );
}

function replaceInspectorInExplorer(source, relFile) {
  const explorer = findObjectBlock(source, "explorer");
  if (!explorer) return null;

  const explorerStart = explorer.braceStart + 1;
  const explorerEnd = explorer.braceEnd;
  const explorerBody = source.slice(explorerStart, explorerEnd);

  const inspectorRelIdx = explorerBody.indexOf("inspector:");
  if (inspectorRelIdx === -1) return null;
  const inspectorKeyIdx = explorerStart + inspectorRelIdx;
  const inspectorObj = findObjectBlock(source, "inspector", inspectorKeyIdx - 20);
  if (!inspectorObj || inspectorObj.keyIdx < inspectorKeyIdx || inspectorObj.keyIdx > explorerEnd) {
    return null;
  }

  let replaceEnd = inspectorObj.braceEnd + 1;
  while (replaceEnd < source.length && /\s/.test(source[replaceEnd])) replaceEnd++;
  if (source[replaceEnd] === ",") replaceEnd += 1;

  const indent = lineIndentAt(source, inspectorObj.keyIdx);
  const mode = choosePreset(relFile);
  const nextChar = source[replaceEnd];
  const needsTrailingNewline = nextChar !== "\n";
  const replacement = makeInspectorBlock(indent, mode) + (needsTrailingNewline ? "\n" : "");

  return source.slice(0, inspectorObj.keyIdx) + replacement + source.slice(replaceEnd);
}

function main() {
  const files = walk(SRC).filter((f) => f.endsWith(".stories.tsx"));
  let changed = 0;
  let tokenModeCount = 0;
  let boxModeCount = 0;

  for (const abs of files) {
    const rel = path.relative(ROOT, abs).replace(/\\/g, "/");
    const src = fs.readFileSync(abs, "utf8");
    if (!src.includes("explorer:") || !src.includes("inspector:")) continue;
    const out = replaceInspectorInExplorer(src, rel);
    if (!out || out === src) continue;
    fs.writeFileSync(abs, out);
    changed += 1;
    if (choosePreset(rel) === "token") tokenModeCount += 1;
    else boxModeCount += 1;
  }

  console.log(`Applied inspector presets to ${changed} story files.`);
  console.log(`token-spacing preset files: ${tokenModeCount}`);
  console.log(`box-model preset files: ${boxModeCount}`);
}

main();
