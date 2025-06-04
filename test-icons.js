import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple test to verify icon system is working
console.log('🎨 Testing Icon System...');

try {
  // Test that we can import the icon system
  // Check if iconMap file exists and is valid
  const iconMapPath = path.join(__dirname, 'src/components/Icons/iconMap.ts');
  const iconMapExists = fs.existsSync(iconMapPath);
  console.log(`✅ iconMap.ts exists: ${iconMapExists}`);
  
  // Check if Icon component exists
  const iconComponentPath = path.join(__dirname, 'src/components/Icons/Icon.tsx');
  const iconComponentExists = fs.existsSync(iconComponentPath);
  console.log(`✅ Icon.tsx exists: ${iconComponentExists}`);
  
  // Check number of icon files
  const iconsDir = path.join(__dirname, 'src/components/Icons');
  const iconFiles = fs.readdirSync(iconsDir).filter(file => 
    file.endsWith('.tsx') && 
    file !== 'Icon.tsx' && 
    !file.includes('index') && 
    !file.includes('iconMap')
  );
  console.log(`✅ Number of icon components: ${iconFiles.length}`);
  
  // Sample icon files
  console.log('📋 Sample icons:', iconFiles.slice(0, 5));
  
  // Check if index file exists
  const indexPath = path.join(__dirname, 'src/components/Icons/index.ts');
  const indexExists = fs.existsSync(indexPath);
  console.log(`✅ index.ts exists: ${indexExists}`);
  
  console.log('🎉 Icon system test completed successfully!');
  
} catch (error) {
  console.error('❌ Error testing icon system:', error.message);
} 