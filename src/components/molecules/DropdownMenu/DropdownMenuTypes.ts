import type { DropdownMenuItemProps } from './DropdownMenuItem';
import type { ReactNode } from 'react';

export interface DropdownMenuOption extends Omit<DropdownMenuItemProps, 'children'> {
  value: string;
  label: ReactNode;
  searchValue?: string;
  group?: string;
}
