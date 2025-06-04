/**
 * Figma Component Extractor
 * 
 * Instructions:
 * 1. Open your Figma file in a browser
 * 2. Open browser DevTools (F12)
 * 3. Go to Console tab
 * 4. Paste this entire script and press Enter
 * 5. Copy the output and share it with me
 */

console.log('🎨 Figma Component Extractor Started...');

// Function to extract component information
function extractFigmaComponents() {
  const components = [];
  
  try {
    // Try to access Figma's internal API (this works in the browser)
    if (window.figma && window.figma.currentPage) {
      console.log('✅ Figma API detected');
      
      const page = window.figma.currentPage;
      
      // Find all components on the page
      const findComponents = (node) => {
        if (node.type === 'COMPONENT') {
          components.push({
            id: node.id,
            name: node.name,
            type: node.type,
            width: node.width,
            height: node.height,
            description: node.description || '',
            variantProperties: node.variantProperties || {},
            children: node.children ? node.children.length : 0
          });
        }
        
        if (node.children) {
          node.children.forEach(findComponents);
        }
      };
      
      findComponents(page);
      
    } else {
      console.log('❌ Figma API not available - trying alternative method');
      
      // Alternative: Extract from DOM/URL
      const url = window.location.href;
      const fileMatch = url.match(/file\/([^\/]+)/);
      const nodeMatch = url.match(/node-id=([^&]+)/);
      
      if (fileMatch) {
        console.log('📄 File ID found:', fileMatch[1]);
      }
      
      if (nodeMatch) {
        const nodeId = decodeURIComponent(nodeMatch[1]);
        console.log('🎯 Current Node ID:', nodeId);
      }
    }
    
  } catch (error) {
    console.error('Error extracting components:', error);
  }
  
  return components;
}

// Extract components
const extractedComponents = extractFigmaComponents();

console.log('📋 Component Extraction Results:');
console.log('=====================================');

if (extractedComponents.length > 0) {
  console.log(`Found ${extractedComponents.length} components:`);
  
  extractedComponents.forEach((component, index) => {
    console.log(`\n${index + 1}. ${component.name}`);
    console.log(`   ID: ${component.id}`);
    console.log(`   Size: ${component.width}x${component.height}`);
    console.log(`   Description: ${component.description}`);
    if (Object.keys(component.variantProperties).length > 0) {
      console.log(`   Variants: ${JSON.stringify(component.variantProperties)}`);
    }
  });
  
  // Generate Code Connect template
  console.log('\n🔗 Code Connect Templates:');
  console.log('=====================================');
  
  extractedComponents.forEach(component => {
    const componentName = component.name.replace(/[^a-zA-Z0-9]/g, '');
    console.log(`\n// ${component.name}`);
    console.log(`export default figma.connect(${componentName}, '${component.id}', {`);
    console.log(`  props: {`);
    console.log(`    // Map your component props here`);
    console.log(`  },`);
    console.log(`  example: (props) => <${componentName} {...props} />,`);
    console.log(`});`);
  });
  
} else {
  console.log('No components found. Please try:');
  console.log('1. Make sure you\'re on a Figma design file page');
  console.log('2. The page contains components');
  console.log('3. Try selecting a component first');
}

// Get current URL info
console.log('\n🌐 Current Page Info:');
console.log('=====================================');
console.log('URL:', window.location.href);

const urlParams = new URLSearchParams(window.location.search);
urlParams.forEach((value, key) => {
  if (key.includes('node') || key.includes('id')) {
    console.log(`${key}: ${decodeURIComponent(value)}`);
  }
});

console.log('\n✨ Extraction Complete!');
console.log('Copy this output and share it to continue building your design system.'); 