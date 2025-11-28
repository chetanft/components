/**
 * Component Validation Utilities for AI Tools
 * Helps prevent common mistakes when using FT Design System components
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
}

/**
 * Validates Table component data structure
 */
export function validateTableData(data: unknown[]): ValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!Array.isArray(data)) {
    errors.push('Table data must be an array');
    suggestions.push('Use: data={[{id: 1, name: "Item"}]}');
    return { isValid: false, errors, suggestions };
  }

  if (data.length === 0) {
    suggestions.push('Empty data array - table will show empty state');
  }

  const missingIds = data.filter(row => {
    if (row && typeof row === 'object' && 'id' in row) {
      return row.id === undefined || row.id === null;
    }
    return true;
  });
  if (missingIds.length > 0) {
    errors.push(`${missingIds.length} rows missing required 'id' property`);
    suggestions.push('Add id to each row: {id: 1, ...otherProps}');
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}

/**
 * Validates Table columns structure
 */
export function validateTableColumns(columns: unknown[]): ValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];

  if (!Array.isArray(columns)) {
    errors.push('Table columns must be an array');
    suggestions.push('Use: columns={[{key: "name", title: "Name"}]}');
    return { isValid: false, errors, suggestions };
  }

  columns.forEach((col, index) => {
    if (col && typeof col === 'object') {
      if (!('key' in col)) {
        errors.push(`Column ${index} missing 'key' property`);
      }
      if (!('title' in col)) {
        errors.push(`Column ${index} missing 'title' property (not 'header' or 'label')`);
        suggestions.push('Use "title" not "header": {key: "name", title: "Name"}');
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}

/**
 * Validates component size props
 */
export function validateComponentSize(component: string, size: string): ValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];

  const validSizes: Record<string, string[]> = {
    Button: ['sm', 'md', 'lg'],
    Input: ['sm', 'md', 'lg'],
    Dropdown: ['m', 'l', 'xl'],
    DatePicker: ['m', 'l', 'xl']
  };

  const componentSizes = validSizes[component];
  if (!componentSizes) {
    suggestions.push(`Unknown component: ${component}`);
    return { isValid: true, errors, suggestions };
  }

  if (!componentSizes.includes(size)) {
    errors.push(`Invalid size "${size}" for ${component}`);
    suggestions.push(`Valid sizes for ${component}: ${componentSizes.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}

/**
 * Detects common anti-patterns in component usage
 */
export function detectAntiPatterns(jsx: string): ValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];

  // Check for manual height overrides
  if (jsx.includes('className="h-') || jsx.includes('h-10') || jsx.includes('h-12')) {
    errors.push('Manual height classes detected');
    suggestions.push('Use size props instead: <Component size="md" />');
  }

  // Check for inline styles on FT components
  if (jsx.includes('style={{') && (jsx.includes('height:') || jsx.includes('borderRadius:'))) {
    errors.push('Inline styles detected on FT components');
    suggestions.push('Remove inline styles - FT components handle their own styling');
  }

  // Check for hardcoded colors
  if (jsx.includes('bg-[#') || jsx.includes('text-[#') || jsx.includes('border-[#')) {
    errors.push('Hardcoded color classes detected');
    suggestions.push('Use component variants instead of manual color classes');
  }

  // Check for incorrect Table props
  if (jsx.includes('header:') && jsx.includes('Table')) {
    errors.push('Table columns using "header" instead of "title"');
    suggestions.push('Use "title" property: {key: "name", title: "Name"}');
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}

/**
 * Comprehensive component validation
 */
export function validateComponent(componentName: string, props: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const suggestions: string[] = [];

  switch (componentName) {
    case 'Table':
      if (props.data && Array.isArray(props.data)) {
        const dataValidation = validateTableData(props.data);
        errors.push(...dataValidation.errors);
        suggestions.push(...dataValidation.suggestions);
      }
      if (props.columns && Array.isArray(props.columns)) {
        const columnsValidation = validateTableColumns(props.columns);
        errors.push(...columnsValidation.errors);
        suggestions.push(...columnsValidation.suggestions);
      }
      break;

    case 'Button':
    case 'Input':
    case 'Dropdown':
    case 'DatePicker':
      if (props.size && typeof props.size === 'string') {
        const sizeValidation = validateComponentSize(componentName, props.size);
        errors.push(...sizeValidation.errors);
        suggestions.push(...sizeValidation.suggestions);
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
}

/**
 * Debug helper for AI tools
 */
export function debugComponent(componentName: string, props: Record<string, unknown>): void {
  console.group(`🔍 FT Design System - ${componentName} Debug`);

  const validation = validateComponent(componentName, props);

  if (validation.isValid) {
    console.log('✅ Component usage is valid');
  } else {
    console.error('❌ Component validation errors:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
  }

  if (validation.suggestions.length > 0) {
    console.warn('💡 Suggestions:');
    validation.suggestions.forEach(suggestion => console.warn(`  - ${suggestion}`));
  }

  console.groupEnd();
} 