import type { ReactNode } from 'react';

export interface DropdownOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  description?: ReactNode;
  icon?: ReactNode;
  group?: string;
  searchValue?: string;
}
