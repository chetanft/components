#!/usr/bin/env node

/**
 * FT Design System Examples Generator
 * 
 * Extracts code examples from Storybook stories to generate a machine-readable
 * examples.json file for AI tools to reference.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const storiesDir = path.join(projectRoot, 'src');
const outputPath = path.join(projectRoot, 'examples.json');

/**
 * Find all story files
 */
function findStoryFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory() && !entry.name.includes('node_modules')) {
        scan(fullPath);
      } else if (entry.name.endsWith('.stories.tsx') || entry.name.endsWith('.stories.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

/**
 * Extract examples from a story file
 */
function extractExamplesFromStory(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const examples = [];
  
  // Get component name from file path
  const fileName = path.basename(filePath);
  const componentName = fileName.replace('.stories.tsx', '').replace('.stories.ts', '');
  
  // Extract the meta title
  const metaMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const title = metaMatch ? metaMatch[1] : componentName;
  
  // Extract story exports with their render functions
  const storyMatches = content.matchAll(
    /export\s+const\s+(\w+)(?::\s*Story)?\s*=\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/gs
  );
  
  for (const match of storyMatches) {
    const storyName = match[1];
    const storyContent = match[2];
    
    // Skip Meta export
    if (storyName === 'default' || storyName === 'meta') continue;
    
    // Extract args/props
    const argsMatch = storyContent.match(/args:\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
    let props = {};
    
    if (argsMatch) {
      try {
        // Parse simple props
        const argsStr = argsMatch[1];
        const propMatches = argsStr.matchAll(/(\w+):\s*['"]?([^,\n'"]+)['"]?,?/g);
        for (const propMatch of propMatches) {
          const key = propMatch[1];
          let value = propMatch[2].trim();
          // Clean up value
          if (value === 'true') value = true;
          else if (value === 'false') value = false;
          else if (/^\d+$/.test(value)) value = parseInt(value);
          props[key] = value;
        }
      } catch (e) {
        // Skip if parsing fails
      }
    }
    
    // Generate code example
    let code = `<${componentName}`;
    
    // Add props
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'boolean') {
        if (value) code += ` ${key}`;
      } else if (typeof value === 'string') {
        code += ` ${key}="${value}"`;
      } else if (typeof value === 'number') {
        code += ` ${key}={${value}}`;
      }
    }
    
    // Check if there's children
    const childrenMatch = storyContent.match(/children:\s*['"]([^'"]+)['"]/);
    if (childrenMatch) {
      code += `>${childrenMatch[1]}</${componentName}>`;
    } else {
      code += ' />';
    }
    
    examples.push({
      component: componentName,
      story: storyName,
      title: `${componentName} - ${storyName.replace(/([A-Z])/g, ' $1').trim()}`,
      code,
      props,
    });
  }
  
  return examples;
}

/**
 * Generate examples JSON
 */
function generateExamples() {
  console.log('🔍 Extracting examples from Storybook stories...');
  
  const storyFiles = findStoryFiles(storiesDir);
  console.log(`   Found ${storyFiles.length} story files`);
  
  const allExamples = [];
  
  for (const file of storyFiles) {
    const examples = extractExamplesFromStory(file);
    if (examples.length > 0) {
      allExamples.push(...examples);
    }
  }
  
  // Group by component
  const byComponent = {};
  for (const example of allExamples) {
    if (!byComponent[example.component]) {
      byComponent[example.component] = [];
    }
    byComponent[example.component].push(example);
  }
  
  // Read package version
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
  
  const output = {
    $schema: 'https://ft-design-system.dev/examples-schema.json',
    name: 'ft-design-system',
    version: packageJson.version,
    generatedAt: new Date().toISOString(),
    
    summary: {
      totalExamples: allExamples.length,
      components: Object.keys(byComponent).length,
    },
    
    // All examples flat
    examples: allExamples,
    
    // Grouped by component
    byComponent,
    
    // Quick reference for common patterns
    quickPatterns: {
      button: {
        primary: '<Button variant="primary">Click me</Button>',
        secondary: '<Button variant="secondary">Cancel</Button>',
        withIcon: '<Button icon="plus" iconPosition="leading">Add</Button>',
        loading: '<Button loading>Saving...</Button>',
        disabled: '<Button disabled>Disabled</Button>',
      },
      input: {
        basic: '<Input label="Name" placeholder="Enter name" />',
        withError: '<Input label="Email" error="Invalid email" />',
        password: '<Input type="password" label="Password" />',
      },
      badge: {
        success: '<Badge variant="success">Active</Badge>',
        warning: '<Badge variant="warning">Pending</Badge>',
        error: '<Badge variant="danger">Failed</Badge>',
      },
      alert: {
        info: '<Alert variant="info" title="Info">Information message</Alert>',
        success: '<Alert variant="success" title="Success">Operation completed</Alert>',
        error: '<Alert variant="danger" title="Error">Something went wrong</Alert>',
      },
      card: {
        basic: '<Card title="Card Title"><p>Card content</p></Card>',
        withActions: '<Card title="Card" extra={<Button>Action</Button>}>Content</Card>',
      },
      modal: {
        basic: '<Modal open={open} onOpenChange={setOpen} title="Modal Title">Content</Modal>',
      },
      table: {
        basic: '<Table columns={columns} data={data} />',
        selectable: '<Table columns={columns} data={data} selectable />',
      },
    },
  };
  
  // Write output
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n✅ Examples generated: ${outputPath}`);
  console.log(`   Total examples: ${allExamples.length}`);
  console.log(`   Components: ${Object.keys(byComponent).length}`);
  
  return output;
}

// Run if called directly
if (require.main === module) {
  generateExamples();
}

module.exports = { generateExamples };
