export type DataEntryCellType = 'read-only' | 'input' | 'amount-input' | 'dropdown' | 'date-time' | 'action';
export type DataEntryCellState = 'default' | 'hover' | 'focused' | 'typing' | 'filled' | 'error-filled' | 'disabled' | 'pre-filled';

export interface ActionConfig {
  label: string;
  icon?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'text';
}
