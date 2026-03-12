/**
 * Story Source Code Loader
 * 
 * Loads raw source code for stories to display in the code view.
 * Uses dynamic imports with ?raw suffix to get source as string.
 */

// Map of component names to their raw story source loaders
const storySourceMap: Record<string, () => Promise<string>> = {
  // Atoms
  'Button': () => import('../../../src/components/atoms/Button/Button.stories.tsx?raw').then(m => m.default),
  'Badge': () => import('../../../src/components/atoms/Badge/Badge.stories.tsx?raw').then(m => m.default),
  'Checkbox': () => import('../../../src/components/atoms/Checkbox/Checkbox.stories.tsx?raw').then(m => m.default),
  'Switch': () => import('../../../src/components/atoms/Switch/Switch.stories.tsx?raw').then(m => m.default),
  'Avatar': () => import('../../../src/components/atoms/Avatar/Avatar.stories.tsx?raw').then(m => m.default),
  'Divider': () => import('../../../src/components/atoms/Divider/Divider.stories.tsx?raw').then(m => m.default),
  'Text': () => import('../../../src/components/atoms/Text/Text.stories.tsx?raw').then(m => m.default),
  'Typography': () => import('../../../src/components/atoms/Typography/Typography.stories.tsx?raw').then(m => m.default),
  'Spacer': () => import('../../../src/components/atoms/Spacer/Spacer.stories.tsx?raw').then(m => m.default),
  'Spin': () => import('../../../src/components/atoms/Spin/Spin.stories.tsx?raw').then(m => m.default),
  'Statistic': () => import('../../../src/components/atoms/Statistic/Statistic.stories.tsx?raw').then(m => m.default),
  'SubText': () => import('../../../src/components/atoms/SubText/SubText.stories.tsx?raw').then(m => m.default),
  'RadioGroup': () => import('../../../src/components/atoms/RadioGroup/RadioGroup.stories.tsx?raw').then(m => m.default),
  'Textarea': () => import('../../../src/components/atoms/Textarea/Textarea.stories.tsx?raw').then(m => m.default),
  'Illustration': () => import('../../../src/components/atoms/Illustration/Illustration.stories.tsx?raw').then(m => m.default),
  'Logo': () => import('../../../src/components/atoms/Logos/Logo.stories.tsx?raw').then(m => m.default),
  'Icon': () => import('../../../src/components/atoms/Icons/Icon.stories.tsx?raw').then(m => m.default),
  'Skeleton': () => import('../../../src/components/atoms/Skeleton/Skeleton.stories.tsx?raw').then(m => m.default),
  'Toggle': () => import('../../../src/components/atoms/Toggle/Toggle.stories.tsx?raw').then(m => m.default),

  // Molecules
  'Alert': () => import('../../../src/components/molecules/Alert/Alert.stories.tsx?raw').then(m => m.default),
  'Chicklet': () => import('../../../src/components/molecules/Chicklet/Chicklet.stories.tsx?raw').then(m => m.default),
  'ColorPicker': () => import('../../../src/components/molecules/ColorPicker/ColorPicker.stories.tsx?raw').then(m => m.default),
  'Transfer': () => import('../../../src/components/molecules/Transfer/Transfer.stories.tsx?raw').then(m => m.default),
  'Mentions': () => import('../../../src/components/molecules/Mentions/Mentions.stories.tsx?raw').then(m => m.default),
  'Watermark': () => import('../../../src/components/molecules/Watermark/Watermark.stories.tsx?raw').then(m => m.default),
  'Tour': () => import('../../../src/components/molecules/Tour/Tour.stories.tsx?raw').then(m => m.default),
  'FloatButton': () => import('../../../src/components/molecules/FloatButton/FloatButton.stories.tsx?raw').then(m => m.default),
  'BackTop': () => import('../../../src/components/molecules/BackTop/BackTop.stories.tsx?raw').then(m => m.default),
  'Affix': () => import('../../../src/components/molecules/Affix/Affix.stories.tsx?raw').then(m => m.default),
  'Anchor': () => import('../../../src/components/molecules/Anchor/Anchor.stories.tsx?raw').then(m => m.default),
  'DatePicker': () => import('../../../src/components/molecules/DatePicker/DatePicker.stories.tsx?raw').then(m => m.default),
  'Dropdown': () => import('../../../src/components/molecules/Dropdown/Dropdown.stories.tsx?raw').then(m => m.default),
  'DropdownMenu': () => import('../../../src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx?raw').then(m => m.default),
  'UploadThumbnail': () => import('../../../src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx?raw').then(m => m.default),
  'UploadItem': () => import('../../../src/components/molecules/UploadItem/UploadItem.stories.tsx?raw').then(m => m.default),
  'ButtonGroup': () => import('../../../src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx?raw').then(m => m.default),
  'ProgressBar': () => import('../../../src/components/molecules/ProgressBar/ProgressBar.stories.tsx?raw').then(m => m.default),
  'Calendar': () => import('../../../src/components/molecules/Calendar/Calendar.stories.tsx?raw').then(m => m.default),
  'Image': () => import('../../../src/components/molecules/Image/Image.stories.tsx?raw').then(m => m.default),
  'Tree': () => import('../../../src/components/molecules/Tree/Tree.stories.tsx?raw').then(m => m.default),
  'Carousel': () => import('../../../src/components/molecules/Carousel/Carousel.stories.tsx?raw').then(m => m.default),
  'Cascader': () => import('../../../src/components/molecules/Cascader/Cascader.stories.tsx?raw').then(m => m.default),
  'Timeline': () => import('../../../src/components/molecules/Timeline/Timeline.stories.tsx?raw').then(m => m.default),
  'TimePicker': () => import('../../../src/components/molecules/TimePicker/TimePicker.stories.tsx?raw').then(m => m.default),
  'Empty': () => import('../../../src/components/molecules/Empty/Empty.stories.tsx?raw').then(m => m.default),
  'Slider': () => import('../../../src/components/molecules/Slider/Slider.stories.tsx?raw').then(m => m.default),
  'InputNumber': () => import('../../../src/components/molecules/InputNumber/InputNumber.stories.tsx?raw').then(m => m.default),
  'Rate': () => import('../../../src/components/molecules/Rate/Rate.stories.tsx?raw').then(m => m.default),
  'Pagination': () => import('../../../src/components/molecules/Pagination/Pagination.stories.tsx?raw').then(m => m.default),
  'Tooltip': () => import('../../../src/components/molecules/Tooltip/Tooltip.stories.tsx?raw').then(m => m.default),
  'Breadcrumb': () => import('../../../src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx?raw').then(m => m.default),
  'SimpleColumnLayout': () => import('../../../src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx?raw').then(m => m.default),
  'Steps': () => import('../../../src/components/molecules/Steps/Steps.stories.tsx?raw').then(m => m.default),
  'StackedBarChart': () => import('../../../src/components/molecules/StackedBarChart/StackedBarChart.stories.tsx?raw').then(m => m.default),
  'Descriptions': () => import('../../../src/components/molecules/Descriptions/Descriptions.stories.tsx?raw').then(m => m.default),
  'HoverCard': () => import('../../../src/components/molecules/HoverCard/HoverCard.stories.tsx?raw').then(m => m.default),
  'List': () => import('../../../src/components/molecules/List/List.stories.tsx?raw').then(m => m.default),
  'Loader': () => import('../../../src/components/molecules/Loader/Loader.stories.tsx?raw').then(m => m.default),
  'Notification': () => import('../../../src/components/molecules/Notification/Notification.stories.tsx?raw').then(m => m.default),
  'Popconfirm': () => import('../../../src/components/molecules/Popconfirm/Popconfirm.stories.tsx?raw').then(m => m.default),
  'ToggleGroup': () => import('../../../src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx?raw').then(m => m.default),
  'TreeSelect': () => import('../../../src/components/molecules/TreeSelect/TreeSelect.stories.tsx?raw').then(m => m.default),

  // Organisms
  'DataEntryTable': () => import('../../../src/stories/DataEntryTable.stories.tsx?raw').then(m => m.default),
  'Tabs': () => import('../../../src/components/organisms/Tabs/Tabs.stories.tsx?raw').then(m => m.default),
  'Form': () => import('../../../src/components/organisms/Form/Form.stories.tsx?raw').then(m => m.default),
  'Grid': () => import('../../../src/components/organisms/Grid/Grid.stories.tsx?raw').then(m => m.default),
  'Result': () => import('../../../src/components/organisms/Result/Result.stories.tsx?raw').then(m => m.default),
  'Collapsible': () => import('../../../src/components/organisms/Collapsible/Collapsible.stories.tsx?raw').then(m => m.default),
  'Modal': () => import('../../../src/components/organisms/Modal/Modal.stories.tsx?raw').then(m => m.default),
  'Drawer': () => import('../../../src/components/organisms/Drawer/Drawer.stories.tsx?raw').then(m => m.default),
  'PageHeader': () => import('../../../src/components/organisms/PageHeader/PageHeader.stories.tsx?raw').then(m => m.default),
  'QuickFilters': () => import('../../../src/components/organisms/QuickFilters/QuickFilters.stories.tsx?raw').then(m => m.default),

  // Stories folder (standalone stories)
  'Input': () => import('../../../src/stories/Input.stories.tsx?raw').then(m => m.default),
  'Label': () => import('../../../src/stories/Label.stories.tsx?raw').then(m => m.default),
  'Card': () => import('../../../src/stories/Card.stories.tsx?raw').then(m => m.default),
  'Table': () => import('../../../src/stories/Table.stories.tsx?raw').then(m => m.default),
  'Upload': () => import('../../../src/stories/Upload.stories.tsx?raw').then(m => m.default),
  'UploadButton': () => import('../../../src/stories/UploadButton.stories.tsx?raw').then(m => m.default),
  'UploadZone': () => import('../../../src/stories/UploadZone.stories.tsx?raw').then(m => m.default),
  'RadioSelector': () => import('../../../src/stories/RadioSelector.stories.tsx?raw').then(m => m.default),
  'AppHeader': () => import('../../../src/stories/AppHeader.stories.tsx?raw').then(m => m.default),
  'ProgressList': () => import('../../../src/stories/ProgressList.stories.tsx?raw').then(m => m.default),
  'FileCard': () => import('../../../src/stories/FileCard.stories.tsx?raw').then(m => m.default),
  'FileThumbnail': () => import('../../../src/stories/FileThumbnail.stories.tsx?raw').then(m => m.default),
  'FileValidationCard': () => import('../../../src/stories/FileValidationCard.stories.tsx?raw').then(m => m.default),
  'FileTypeIcon': () => import('../../../src/stories/FileTypeIcon.stories.tsx?raw').then(m => m.default),
  'SegmentedTabs': () => import('../../../src/stories/SegmentedTabs.stories.tsx?raw').then(m => m.default),
  'UserProfile': () => import('../../../src/stories/UserProfile.stories.tsx?raw').then(m => m.default),
  'UserProfileDropdown': () => import('../../../src/stories/UserProfileDropdown.stories.tsx?raw').then(m => m.default),
  'NavigationLauncher': () => import('../../../src/stories/NavigationLauncher.stories.tsx?raw').then(m => m.default),
  'NavigationPopover': () => import('../../../src/stories/NavigationPopover.stories.tsx?raw').then(m => m.default),
  'Footer': () => import('../../../src/stories/Footer.stories.tsx?raw').then(m => m.default),
  'ReadOnly': () => import('../../../src/stories/ReadOnly.stories.tsx?raw').then(m => m.default),
  'ColorSystem': () => import('../../../src/stories/ColorSystem.stories.tsx?raw').then(m => m.default),
  'ThemeSystem': () => import('../../../src/stories/ThemeSystem.stories.tsx?raw').then(m => m.default),

  // Charts
  'AreaChart': () => import('../../../src/stories/AreaChart.stories.tsx?raw').then(m => m.default),
  'LineChart': () => import('../../../src/stories/LineChart.stories.tsx?raw').then(m => m.default),
  'PieChart': () => import('../../../src/stories/PieChart.stories.tsx?raw').then(m => m.default),
  'RadarChart': () => import('../../../src/stories/RadarChart.stories.tsx?raw').then(m => m.default),
  'RadialChart': () => import('../../../src/stories/RadialChart.stories.tsx?raw').then(m => m.default),
};

/**
 * Load raw source code for a story file
 */
export async function loadStorySource(componentName: string): Promise<string | null> {
  const loader = storySourceMap[componentName];

  if (!loader) {
    console.warn(`No story source found for component: ${componentName}`);
    return null;
  }

  try {
    return await loader();
  } catch (error) {
    console.error(`Failed to load story source for ${componentName}:`, error);
    return null;
  }
}

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
      if (depth === 0) {
        return i;
      }
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
      if (depth === 0) {
        return i;
      }
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

function normalizeExtractedJSX(code: string): string {
  let normalized = code.trim();
  if (normalized.endsWith(",")) normalized = normalized.slice(0, -1).trim();
  if (normalized.startsWith("(") && normalized.endsWith(")")) {
    normalized = normalized.slice(1, -1).trim();
  }
  return normalized;
}

/**
 * Extract source code for a specific story from the full source
 */
export function extractStorySource(fullSource: string, storyName: string): string | null {
  if (typeof fullSource !== 'string') {
    return null;
  }
  const storyObject = extractStoryObjectBlock(fullSource, storyName);
  if (storyObject) {
    const explicitSourceMatch = storyObject.match(/docs:\s*\{\s*source:\s*\{\s*code:\s*`([\s\S]*?)`\s*\}/m);
    if (explicitSourceMatch?.[1]) {
      return explicitSourceMatch[1].trim();
    }

    // Extract render body using balanced delimiter matching
    const renderIdx = storyObject.search(/render\s*:\s*\(/);
    if (renderIdx !== -1) {
      const arrowIdx = storyObject.indexOf("=>", renderIdx);
      if (arrowIdx !== -1) {
        // Find the first non-whitespace character after =>
        let cursor = arrowIdx + 2;
        while (cursor < storyObject.length && /\s/.test(storyObject[cursor])) cursor++;

        if (cursor < storyObject.length) {
          const nextChar = storyObject[cursor];
          if (nextChar === "(") {
            // Arrow with parens: render: (args) => ( ... )
            const closeIdx = findMatchingParen(storyObject, cursor);
            if (closeIdx !== -1) {
              const body = storyObject.slice(cursor + 1, closeIdx);
              return normalizeExtractedJSX(body);
            }
          } else if (nextChar === "{") {
            // Arrow with braces: render: (args) => { return (...) }
            const closeIdx = findMatchingBrace(storyObject, cursor);
            if (closeIdx !== -1) {
              const body = storyObject.slice(cursor, closeIdx + 1);
              // Try to extract the return statement's JSX
              const returnIdx = body.indexOf("return");
              if (returnIdx !== -1) {
                let retCursor = returnIdx + 6;
                while (retCursor < body.length && /\s/.test(body[retCursor])) retCursor++;
                if (retCursor < body.length && body[retCursor] === "(") {
                  const retClose = findMatchingParen(body, retCursor);
                  if (retClose !== -1) {
                    const jsx = body.slice(retCursor + 1, retClose);
                    return normalizeExtractedJSX(jsx);
                  }
                }
                // return without parens — grab until ; or end of block
                const returnBody = body.slice(retCursor, body.length - 1).replace(/;\s*$/, "");
                return normalizeExtractedJSX(returnBody);
              }
              // No return found, return the full brace body
              return normalizeExtractedJSX(body);
            }
          } else {
            // Bare expression after arrow: render: () => <Component />
            // Scan forward to find end of expression (next comma or closing brace at depth 0)
            let end = cursor;
            let scanDepth = 0;
            let inStr = false;
            let strCh = '';
            while (end < storyObject.length) {
              const c = storyObject[end];
              const p = end > 0 ? storyObject[end - 1] : '';
              if ((c === "'" || c === '"' || c === '`') && p !== '\\') {
                if (!inStr) { inStr = true; strCh = c; }
                else if (strCh === c) { inStr = false; strCh = ''; }
              }
              if (!inStr) {
                if (c === '{' || c === '(') scanDepth++;
                if (c === '}' || c === ')') {
                  if (scanDepth === 0) break;
                  scanDepth--;
                }
                if (c === ',' && scanDepth === 0) break;
              }
              end++;
            }
            const bareBody = storyObject.slice(cursor, end).trim();
            if (bareBody) return normalizeExtractedJSX(bareBody);
          }
        }
      }
    }

    // Fallback: regex-based render extraction for edge cases
    const renderMatch = storyObject.match(/render:\s*\([^)]*\)\s*=>\s*\(([\s\S]*?)\)\s*(?:,|\n\s*[a-zA-Z_])/m);
    if (renderMatch?.[1]) {
      return normalizeExtractedJSX(renderMatch[1]);
    }

    // Extract args object using balanced brace matching
    // Match "args:" but not "overrideArgs:", "defaultArgs:", etc.
    const argsRe = /(?<![a-zA-Z_])args\s*:\s*\{/g;
    let argsReMatch: RegExpExecArray | null;
    while ((argsReMatch = argsRe.exec(storyObject)) !== null) {
      const braceStart = storyObject.indexOf("{", argsReMatch.index + 4);
      if (braceStart === -1) continue;
      const braceEnd = findMatchingBrace(storyObject, braceStart);
      if (braceEnd !== -1) {
        const argsBody = storyObject.slice(braceStart + 1, braceEnd);
        return `// ${storyName} story\nargs: {\n${argsBody.trim()}\n}`;
      }
    }

    // Fallback: regex-based args extraction
    const argsMatch = storyObject.match(/args:\s*\{([\s\S]*?)\}\s*(?:,|\n\s*[a-zA-Z_])/m);
    if (argsMatch?.[1]) {
      return `// ${storyName} story\nargs: {\n${argsMatch[1].trim()}\n}`;
    }

    // Category D fallback: empty or minimal story object — return the raw definition
    const trimmedObj = storyObject.replace(/^\{/, '').replace(/\}$/, '').trim();
    if (trimmedObj.length > 0) {
      return `export const ${storyName}: Story = ${storyObject}`;
    }
  }

  // Pattern 2: export function StoryName() { ... } — use balanced brace matching
  const funcRe = new RegExp(`export\\s+function\\s+${storyName}\\s*\\([^)]*\\)\\s*\\{`);
  const funcMatch = funcRe.exec(fullSource);
  if (funcMatch) {
    const braceStart = fullSource.indexOf("{", funcMatch.index + funcMatch[0].length - 1);
    if (braceStart !== -1) {
      const braceEnd = findMatchingBrace(fullSource, braceStart);
      if (braceEnd !== -1) {
        const body = fullSource.slice(braceStart + 1, braceEnd);
        return `// ${storyName} story\nfunction ${storyName}() {${body}}`;
      }
    }
  }

  // Pattern 3: export const StoryName = () => { ... } or () => ( ... )
  const arrowRe = new RegExp(`export\\s+const\\s+${storyName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*`);
  const arrowMatch = arrowRe.exec(fullSource);
  if (arrowMatch) {
    const afterArrow = arrowMatch.index + arrowMatch[0].length;
    if (afterArrow < fullSource.length) {
      const ch = fullSource[afterArrow];
      if (ch === "{") {
        const closeIdx = findMatchingBrace(fullSource, afterArrow);
        if (closeIdx !== -1) {
          const body = fullSource.slice(afterArrow + 1, closeIdx);
          return `// ${storyName} story\nconst ${storyName} = () => {${body}}`;
        }
      } else if (ch === "(") {
        const closeIdx = findMatchingParen(fullSource, afterArrow);
        if (closeIdx !== -1) {
          const body = fullSource.slice(afterArrow + 1, closeIdx);
          return normalizeExtractedJSX(body);
        }
      }
    }
  }

  return null;
}

/**
 * Check if source is available for a component
 */
export function hasStorySource(componentName: string): boolean {
  return componentName in storySourceMap;
}
