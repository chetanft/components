import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/components/Icons/assets');
const outputDir = path.join(__dirname, '../src/components/Icons');

// Convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert SVG content to React component
function svgToReactComponent(svgContent, componentName) {
  // Remove the SVG wrapper and extract the inner content
  const svgInnerContent = svgContent
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim();

  // Replace fill colors with currentColor for theming
  let processedContent = svgInnerContent
    .replace(/fill="#434343"/g, 'fill="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
    .replace(/stroke="#434343"/g, 'stroke="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"');

  // Convert string style attributes to React style objects
  processedContent = processedContent
    .replace(/style="([^"]*)"/g, (match, styleString) => {
      // Convert CSS string to React style object
      const styleObject = styleString
        .split(';')
        .filter(style => style.trim())
        .map(style => {
          const [property, value] = style.split(':').map(s => s.trim());
          if (property && value) {
            // Convert kebab-case to camelCase
            const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            return `${camelProperty}: '${value}'`;
          }
          return '';
        })
        .filter(style => style)
        .join(', ');
      
      return styleObject ? `style={{${styleObject}}}` : '';
    });

  // Convert hyphenated attributes to camelCase
  processedContent = processedContent
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/mask-type=/g, 'maskType=')
    .replace(/maskUnits=/g, 'maskUnits=');

  return `import React from 'react';

export const ${componentName}: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${processedContent}
  </svg>
);

export default ${componentName};
`;
}

// Main generation function
function generateIcons() {
  console.log('🎨 Generating icon components...');
  
  // Read all SVG files
  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
  console.log(`Found ${svgFiles.length} SVG files`);

  const iconExports = [];
  const iconMapEntries = [];

  svgFiles.forEach(file => {
    const fileName = path.basename(file, '.svg');
    const componentName = toPascalCase(fileName);
    
    // Read SVG content
    const svgPath = path.join(iconsDir, file);
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    
    // Generate React component
    const componentCode = svgToReactComponent(svgContent, componentName);
    
    // Write component file
    const componentPath = path.join(outputDir, `${componentName}.tsx`);
    fs.writeFileSync(componentPath, componentCode);
    
    // Add to exports and map
    iconExports.push(`export { ${componentName} } from './${componentName}';`);
    iconMapEntries.push(`  '${fileName}': ${componentName},`);
    
    console.log(`✅ Generated ${componentName} from ${file}`);
  });

  // Generate iconMap.ts
  const iconMapContent = `${iconExports.map(exp => exp.replace('export', 'import')).join('\n')}

export const iconMap = {
${iconMapEntries.join('\n')}
};

export type IconName = keyof typeof iconMap;
`;

  fs.writeFileSync(path.join(outputDir, 'iconMap.ts'), iconMapContent);
  console.log('✅ Generated iconMap.ts');

  // Generate comprehensive index.ts
  const indexContent = `// Individual icon exports
${iconExports.join('\n')}

// Icon component and types
export { Icon } from './Icon';
export type { IconProps, IconName } from './Icon';

// Icon map for dynamic loading
export { iconMap } from './iconMap';
`;

  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log('✅ Generated index.ts');

  console.log(`🎉 Successfully generated ${svgFiles.length} icon components!`);
}

// Run the generation
generateIcons(); 