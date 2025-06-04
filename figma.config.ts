// Figma Code Connect configuration
export default {
  // Include all component files
  include: ['src/components/**/*.figma.tsx'],
  
  // Exclude any files you don't want to include
  exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
  
  // Output directory for generated files
  output: './figma-connect',
}; 