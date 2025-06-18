import type { SearchBarVariant } from './types';

export const DEFAULT_SHORTCUT_PLACEHOLDER = 'Press “/” to search...';
export const DEFAULT_PLACEHOLDER = 'Search...';
export const VARIANTS = ['default', 'ghosted', 'underlined'] as const;
export const DEFAULT_VARIANT: SearchBarVariant = 'default';
