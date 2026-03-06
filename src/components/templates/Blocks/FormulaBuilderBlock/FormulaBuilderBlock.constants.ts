export const VALUE_PICKER_CATEGORIES = [
  { id: 'charges', label: 'Charges' },
  { id: 'percentage-of-charge', label: 'Percentage of Value' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'percentage-of-dimensions', label: 'Percentage of Dimensions' },
  { id: 'constant', label: 'Constant' },
  { id: 'functions', label: 'Functions' },
];

export const CHARGE_OPTIONS = [
  { value: 'base-freight', label: 'Base freight' },
  { value: 'fuel-surcharge', label: 'Fuel surcharge' },
  { value: 'freight-on-value', label: 'Freight on value' },
  { value: 'oda', label: 'ODA' },
  { value: 'computed-freight', label: 'Computed freight' },
  { value: 'expected-freight', label: 'Expected freight' },
];

export const DIMENSION_OPTIONS = [
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'origin', label: 'Origin' },
  { value: 'destination', label: 'Destination' },
  { value: 'mode', label: 'Mode' },
  { value: 'service-level', label: 'Service level' },
];

export const NUMERIC_DIMENSIONS = [
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'quantity', label: 'Quantity' },
];

// Wrapper functions (1-arg): wrap previous value token
export const WRAPPER_FUNCTIONS = [
  { value: 'ABS', label: 'ABS( )' },
  { value: 'CEIL', label: 'CEIL( )' },
  { value: 'FLOOR', label: 'FLOOR( )' },
];

// Aggregator functions (multi-arg): need argument builder UI
export const AGGREGATOR_FUNCTIONS = [
  { value: 'MAX', label: 'MAX( , )' },
  { value: 'MIN', label: 'MIN( , )' },
];

// Combined for display in value picker
export const FUNCTION_OPTIONS = [...WRAPPER_FUNCTIONS, ...AGGREGATOR_FUNCTIONS];

// Variable options for condition dropdowns
export const CONDITION_VARIABLES = [
  { value: 'invoice-value', label: 'Invoice value' },
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'distance', label: 'Distance' },
  { value: 'quantity', label: 'Quantity' },
  { value: 'base-freight', label: 'Base freight' },
  { value: 'fuel-surcharge', label: 'Fuel surcharge' },
  { value: 'computed-freight', label: 'Computed freight' },
  { value: 'expected-freight', label: 'Expected freight' },
];

// Operators
export const MATH_OPERATORS = ['(', ')', '+', '-', '×', '÷'];
export const CONDITION_OPERATORS = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '≥' },
  { value: '<=', label: '≤' },
  { value: '=', label: '=' },
  { value: '!=', label: '≠' },
  { value: 'between', label: 'BETWEEN' },
  { value: 'in', label: 'IN' },
  { value: 'not-in', label: 'NOT IN' },
];

export const LOGICAL_OPERATORS = [
  { value: 'And', label: 'And' },
  { value: 'Or', label: 'Or' },
  { value: 'Not', label: 'NOT' },
];
