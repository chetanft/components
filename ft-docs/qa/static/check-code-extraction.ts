/**
 * Static Code Extraction Coverage Checker
 *
 * Analyzes which story variants get real source extraction vs
 * falling back to generic `<Component />` in the docs code view.
 *
 * For each component in storySourceMap, reads the raw .tsx story file
 * and attempts extraction using the same logic as extractStorySource.
 *
 * Run: npx tsx qa/static/check-code-extraction.ts
 */
import * as fs from "fs";
import * as path from "path";

// ── Types ──

interface StoryResult {
  storyName: string;
  extraction: "render" | "explicit-source" | "args" | "function-export" | "arrow-export" | "fallback";
}

interface ComponentResult {
  component: string;
  storyFilePath: string;
  fileExists: boolean;
  stories: StoryResult[];
}

interface Report {
  timestamp: string;
  summary: {
    totalComponents: number;
    totalStories: number;
    withRender: number;
    withExplicitSource: number;
    withArgs: number;
    withFunctionExport: number;
    withArrowExport: number;
    fallback: number;
    coveragePercent: number;
  };
  fallbacks: { component: string; story: string }[];
  components: ComponentResult[];
}

// ── Source map: component name -> relative story path (from repo root) ──
// Derived from the import paths in ft-docs/src/lib/story-source.ts

const PROJECT_ROOT = path.resolve(process.cwd(), "..");

const storyPathMap: Record<string, string> = {
  // Atoms
  Button: "src/components/atoms/Button/Button.stories.tsx",
  Badge: "src/components/atoms/Badge/Badge.stories.tsx",
  Checkbox: "src/components/atoms/Checkbox/Checkbox.stories.tsx",
  Switch: "src/components/atoms/Switch/Switch.stories.tsx",
  Avatar: "src/components/atoms/Avatar/Avatar.stories.tsx",
  Divider: "src/components/atoms/Divider/Divider.stories.tsx",
  Text: "src/components/atoms/Text/Text.stories.tsx",
  Typography: "src/components/atoms/Typography/Typography.stories.tsx",
  Spacer: "src/components/atoms/Spacer/Spacer.stories.tsx",
  Spin: "src/components/atoms/Spin/Spin.stories.tsx",
  Statistic: "src/components/atoms/Statistic/Statistic.stories.tsx",
  SubText: "src/components/atoms/SubText/SubText.stories.tsx",
  RadioGroup: "src/components/atoms/RadioGroup/RadioGroup.stories.tsx",
  Textarea: "src/components/atoms/Textarea/Textarea.stories.tsx",
  Illustration: "src/components/atoms/Illustration/Illustration.stories.tsx",
  Logo: "src/components/atoms/Logos/Logo.stories.tsx",
  Icon: "src/components/atoms/Icons/Icon.stories.tsx",
  Skeleton: "src/components/atoms/Skeleton/Skeleton.stories.tsx",
  Toggle: "src/components/atoms/Toggle/Toggle.stories.tsx",

  // Molecules
  Alert: "src/components/molecules/Alert/Alert.stories.tsx",
  Chicklet: "src/components/molecules/Chicklet/Chicklet.stories.tsx",
  ColorPicker: "src/components/molecules/ColorPicker/ColorPicker.stories.tsx",
  Transfer: "src/components/molecules/Transfer/Transfer.stories.tsx",
  Mentions: "src/components/molecules/Mentions/Mentions.stories.tsx",
  Watermark: "src/components/molecules/Watermark/Watermark.stories.tsx",
  Tour: "src/components/molecules/Tour/Tour.stories.tsx",
  FloatButton: "src/components/molecules/FloatButton/FloatButton.stories.tsx",
  BackTop: "src/components/molecules/BackTop/BackTop.stories.tsx",
  Affix: "src/components/molecules/Affix/Affix.stories.tsx",
  Anchor: "src/components/molecules/Anchor/Anchor.stories.tsx",
  DatePicker: "src/components/molecules/DatePicker/DatePicker.stories.tsx",
  Dropdown: "src/components/molecules/Dropdown/Dropdown.stories.tsx",
  DropdownMenu: "src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx",
  UploadThumbnail: "src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx",
  UploadItem: "src/components/molecules/UploadItem/UploadItem.stories.tsx",
  ButtonGroup: "src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx",
  ProgressBar: "src/components/molecules/ProgressBar/ProgressBar.stories.tsx",
  Calendar: "src/components/molecules/Calendar/Calendar.stories.tsx",
  Image: "src/components/molecules/Image/Image.stories.tsx",
  Tree: "src/components/molecules/Tree/Tree.stories.tsx",
  Carousel: "src/components/molecules/Carousel/Carousel.stories.tsx",
  Cascader: "src/components/molecules/Cascader/Cascader.stories.tsx",
  Timeline: "src/components/molecules/Timeline/Timeline.stories.tsx",
  TimePicker: "src/components/molecules/TimePicker/TimePicker.stories.tsx",
  Empty: "src/components/molecules/Empty/Empty.stories.tsx",
  Slider: "src/components/molecules/Slider/Slider.stories.tsx",
  InputNumber: "src/components/molecules/InputNumber/InputNumber.stories.tsx",
  Rate: "src/components/molecules/Rate/Rate.stories.tsx",
  Pagination: "src/components/molecules/Pagination/Pagination.stories.tsx",
  Tooltip: "src/components/molecules/Tooltip/Tooltip.stories.tsx",
  Breadcrumb: "src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx",
  SimpleColumnLayout: "src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx",
  Steps: "src/components/molecules/Steps/Steps.stories.tsx",
  StackedBarChart: "src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx",
  Descriptions: "src/components/molecules/Descriptions/Descriptions.stories.tsx",
  HoverCard: "src/components/molecules/HoverCard/HoverCard.stories.tsx",
  List: "src/components/molecules/List/List.stories.tsx",
  Loader: "src/components/molecules/Loader/Loader.stories.tsx",
  Notification: "src/components/molecules/Notification/Notification.stories.tsx",
  Popconfirm: "src/components/molecules/Popconfirm/Popconfirm.stories.tsx",
  ToggleGroup: "src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx",
  TreeSelect: "src/components/molecules/TreeSelect/TreeSelect.stories.tsx",

  // Organisms
  DataEntryTable: "src/stories/DataEntryTable.stories.tsx",
  Tabs: "src/components/organisms/Tabs/Tabs.stories.tsx",
  Form: "src/components/organisms/Form/Form.stories.tsx",
  Grid: "src/components/organisms/Grid/Grid.stories.tsx",
  Result: "src/components/organisms/Result/Result.stories.tsx",
  Collapsible: "src/components/organisms/Collapsible/Collapsible.stories.tsx",
  Modal: "src/components/organisms/Modal/Modal.stories.tsx",
  Drawer: "src/components/organisms/Drawer/Drawer.stories.tsx",
  PageHeader: "src/components/organisms/PageHeader/PageHeader.stories.tsx",
  QuickFilters: "src/components/organisms/QuickFilters/QuickFilters.stories.tsx",

  // Stories folder (standalone)
  Input: "src/stories/Input.stories.tsx",
  Label: "src/stories/Label.stories.tsx",
  Card: "src/stories/Card.stories.tsx",
  Table: "src/stories/Table.stories.tsx",
  Upload: "src/stories/Upload.stories.tsx",
  UploadButton: "src/stories/UploadButton.stories.tsx",
  UploadZone: "src/stories/UploadZone.stories.tsx",
  RadioSelector: "src/stories/RadioSelector.stories.tsx",
  AppHeader: "src/stories/AppHeader.stories.tsx",
  ProgressList: "src/stories/ProgressList.stories.tsx",
  FileCard: "src/stories/FileCard.stories.tsx",
  FileThumbnail: "src/stories/FileThumbnail.stories.tsx",
  FileValidationCard: "src/stories/FileValidationCard.stories.tsx",
  FileTypeIcon: "src/stories/FileTypeIcon.stories.tsx",
  SegmentedTabs: "src/stories/SegmentedTabs.stories.tsx",
  UserProfile: "src/stories/UserProfile.stories.tsx",
  UserProfileDropdown: "src/stories/UserProfileDropdown.stories.tsx",
  NavigationLauncher: "src/stories/NavigationLauncher.stories.tsx",
  NavigationPopover: "src/stories/NavigationPopover.stories.tsx",
  Footer: "src/stories/Footer.stories.tsx",
  ReadOnly: "src/stories/ReadOnly.stories.tsx",
  ColorSystem: "src/stories/ColorSystem.stories.tsx",
  ThemeSystem: "src/stories/ThemeSystem.stories.tsx",

  // Charts
  AreaChart: "src/stories/AreaChart.stories.tsx",
  LineChart: "src/stories/LineChart.stories.tsx",
  PieChart: "src/stories/PieChart.stories.tsx",
  RadarChart: "src/stories/RadarChart.stories.tsx",
  RadialChart: "src/stories/RadialChart.stories.tsx",
};

// ── Extraction logic (mirrors extractStorySource from story-source.ts) ──

function findMatchingBrace(source: string, startIndex: number): number {
  let depth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = startIndex; i < source.length; i++) {
    const char = source[i];
    const prev = i > 0 ? source[i - 1] : "";

    if ((char === "'" || char === '"' || char === "`") && prev !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (stringChar === char) {
        inString = false;
        stringChar = "";
      }
    }

    if (inString) continue;

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function findMatchingParen(source: string, startIndex: number): number {
  let depth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = startIndex; i < source.length; i++) {
    const char = source[i];
    const prev = i > 0 ? source[i - 1] : "";

    if ((char === "'" || char === '"' || char === "`") && prev !== "\\") {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (stringChar === char) {
        inString = false;
        stringChar = "";
      }
    }

    if (inString) continue;

    if (char === "(") depth += 1;
    if (char === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function extractStoryObjectBlock(fullSource: string, storyName: string): string | null {
  const exportRe = new RegExp(`export\\s+const\\s+${storyName}\\s*:\\s*Story\\s*=\\s*\\{`);
  const match = exportRe.exec(fullSource);
  if (!match) return null;

  const braceStart = fullSource.indexOf("{", match.index);
  if (braceStart === -1) return null;

  const braceEnd = findMatchingBrace(fullSource, braceStart);
  if (braceEnd === -1) return null;

  return fullSource.slice(braceStart, braceEnd + 1);
}

type ExtractionKind = StoryResult["extraction"];

/**
 * Classify what extraction method would succeed for a given story.
 * Returns the extraction kind, or "fallback" if nothing works.
 */
function classifyExtraction(fullSource: string, storyName: string): ExtractionKind {
  const storyObject = extractStoryObjectBlock(fullSource, storyName);

  if (storyObject) {
    // 1. Explicit docs.source.code
    const explicitSourceMatch = storyObject.match(
      /docs:\s*\{\s*source:\s*\{\s*code:\s*`([\s\S]*?)`\s*\}/m
    );
    if (explicitSourceMatch?.[1]) {
      return "explicit-source";
    }

    // 2. render: function
    const renderIdx = storyObject.search(/render\s*:\s*\(/);
    if (renderIdx !== -1) {
      const arrowIdx = storyObject.indexOf("=>", renderIdx);
      if (arrowIdx !== -1) {
        let cursor = arrowIdx + 2;
        while (cursor < storyObject.length && /\s/.test(storyObject[cursor])) cursor++;

        if (cursor < storyObject.length) {
          const nextChar = storyObject[cursor];
          if (nextChar === "(") {
            const closeIdx = findMatchingParen(storyObject, cursor);
            if (closeIdx !== -1) return "render";
          } else if (nextChar === "{") {
            const closeIdx = findMatchingBrace(storyObject, cursor);
            if (closeIdx !== -1) return "render";
          } else {
            // Bare expression after arrow: render: () => <Component />
            return "render";
          }
        }
      }
    }

    // 2b. Regex fallback for render
    const renderMatch = storyObject.match(
      /render:\s*\([^)]*\)\s*=>\s*\(([\s\S]*?)\)\s*(?:,|\n\s*[a-zA-Z_])/m
    );
    if (renderMatch?.[1]) {
      return "render";
    }

    // 3. args object (balanced brace)
    const argsRe = /(?<![a-zA-Z_])args\s*:\s*\{/g;
    let argsReMatch: RegExpExecArray | null;
    while ((argsReMatch = argsRe.exec(storyObject)) !== null) {
      const braceStart = storyObject.indexOf("{", argsReMatch.index + 4);
      if (braceStart === -1) continue;
      const braceEnd = findMatchingBrace(storyObject, braceStart);
      if (braceEnd !== -1) return "args";
    }

    // 3b. Regex fallback for args
    const argsMatch = storyObject.match(
      /args:\s*\{([\s\S]*?)\}\s*(?:,|\n\s*[a-zA-Z_])/m
    );
    if (argsMatch?.[1]) {
      return "args";
    }
  }

  // 4. export function StoryName() { ... } — use balanced brace matching
  const funcRe = new RegExp(`export\\s+function\\s+${storyName}\\s*\\([^)]*\\)\\s*\\{`);
  const funcExecMatch = funcRe.exec(fullSource);
  if (funcExecMatch) {
    const braceStart = fullSource.indexOf("{", funcExecMatch.index + funcExecMatch[0].length - 1);
    if (braceStart !== -1) {
      const braceEnd = findMatchingBrace(fullSource, braceStart);
      if (braceEnd !== -1) return "function-export";
    }
  }

  // 5. export const StoryName = () => { ... } or () => ( ... )
  const arrowRe2 = new RegExp(`export\\s+const\\s+${storyName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*`);
  const arrowExecMatch = arrowRe2.exec(fullSource);
  if (arrowExecMatch) {
    const afterArrow = arrowExecMatch.index + arrowExecMatch[0].length;
    if (afterArrow < fullSource.length) {
      const ch = fullSource[afterArrow];
      if (ch === "{" || ch === "(") return "arrow-export";
    }
  }

  return "fallback";
}

// ── Story discovery ──

function findExportedStoryNames(source: string): string[] {
  const names: string[] = [];

  // Pattern: export const StoryName: Story = {
  const storyObjRe = /export\s+const\s+(\w+)\s*:\s*Story\s*=/g;
  let m: RegExpExecArray | null;
  while ((m = storyObjRe.exec(source)) !== null) {
    names.push(m[1]);
  }

  // Pattern: export function StoryName(
  const funcRe = /export\s+function\s+(\w+)\s*\(/g;
  while ((m = funcRe.exec(source)) !== null) {
    // Skip "default" or meta-related exports
    if (m[1] !== "default") {
      // Avoid duplicates
      if (!names.includes(m[1])) names.push(m[1]);
    }
  }

  // Pattern: export const StoryName = () =>
  const arrowRe = /export\s+const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/g;
  while ((m = arrowRe.exec(source)) !== null) {
    if (!names.includes(m[1])) names.push(m[1]);
  }

  return names;
}

// ── Main ──

function run(): void {
  const componentNames = Object.keys(storyPathMap);
  const results: ComponentResult[] = [];
  const fallbacks: { component: string; story: string }[] = [];

  let totalStories = 0;
  let withRender = 0;
  let withExplicitSource = 0;
  let withArgs = 0;
  let withFunctionExport = 0;
  let withArrowExport = 0;
  let fallbackCount = 0;

  console.log(`\nCode Extraction Coverage Check`);
  console.log(`${"=".repeat(60)}`);
  console.log(`Components in source map: ${componentNames.length}\n`);

  for (const component of componentNames) {
    const relPath = storyPathMap[component];
    const absPath = path.join(PROJECT_ROOT, relPath);
    const fileExists = fs.existsSync(absPath);

    const result: ComponentResult = {
      component,
      storyFilePath: relPath,
      fileExists,
      stories: [],
    };

    if (!fileExists) {
      console.log(`[MISS] ${component} -- file not found: ${relPath}`);
      results.push(result);
      continue;
    }

    const source = fs.readFileSync(absPath, "utf-8");
    const storyNames = findExportedStoryNames(source);

    if (storyNames.length === 0) {
      console.log(`[SKIP] ${component} -- no exported stories found`);
      results.push(result);
      continue;
    }

    let componentHasFallback = false;

    for (const storyName of storyNames) {
      const extraction = classifyExtraction(source, storyName);
      result.stories.push({ storyName, extraction });
      totalStories++;

      switch (extraction) {
        case "render":
          withRender++;
          break;
        case "explicit-source":
          withExplicitSource++;
          break;
        case "args":
          withArgs++;
          break;
        case "function-export":
          withFunctionExport++;
          break;
        case "arrow-export":
          withArrowExport++;
          break;
        case "fallback":
          fallbackCount++;
          fallbacks.push({ component, story: storyName });
          componentHasFallback = true;
          break;
      }
    }

    if (componentHasFallback) {
      const fb = result.stories.filter((s) => s.extraction === "fallback");
      console.log(
        `[FAIL] ${component} -- ${fb.length}/${result.stories.length} stories fall back to <Component />`
      );
      for (const s of fb) {
        console.log(`         - ${s.storyName}`);
      }
    }

    results.push(result);
  }

  // Summary
  const extracted = totalStories - fallbackCount;
  const coveragePercent =
    totalStories > 0 ? Math.round((extracted / totalStories) * 1000) / 10 : 100;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Summary`);
  console.log(`${"─".repeat(60)}`);
  console.log(`  Total stories found:       ${totalStories}`);
  console.log(`  With render function:      ${withRender}`);
  console.log(`  With explicit source:      ${withExplicitSource}`);
  console.log(`  With args (generated):     ${withArgs}`);
  console.log(`  With function export:      ${withFunctionExport}`);
  console.log(`  With arrow export:         ${withArrowExport}`);
  console.log(`  Fallback (<Component />):  ${fallbackCount}`);
  console.log(`  Coverage:                  ${coveragePercent}%`);

  if (fallbacks.length > 0) {
    console.log(`\nFallback stories (${fallbacks.length}):`);
    for (const fb of fallbacks) {
      console.log(`  ${fb.component} / ${fb.story}`);
    }
  } else {
    console.log(`\nAll stories have extractable source code.`);
  }

  // Write JSON report
  const report: Report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalComponents: componentNames.length,
      totalStories,
      withRender,
      withExplicitSource,
      withArgs,
      withFunctionExport,
      withArrowExport,
      fallback: fallbackCount,
      coveragePercent,
    },
    fallbacks,
    components: results,
  };

  const reportPath = path.resolve(process.cwd(), "qa/reports/code-extraction-coverage.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport: ${reportPath}`);

  // Exit with error code if any fallbacks found
  if (fallbackCount > 0) {
    process.exit(1);
  }
}

run();
