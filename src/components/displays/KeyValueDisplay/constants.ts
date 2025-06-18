import type { KeyValueColumns, KeyValueVariant } from './types';

export const KEY_VALUE_DISPLAY_VARIANTS = ['grid', 'list', 'inline'] as const;

export const DEFAULT_VARIANT: KeyValueVariant = 'grid';
export const DEFAULT_WITH_EMPTY_ELEMENTS = true;
export const DEFAULT_COLUMNS: KeyValueColumns = { key: 6, value: 6 };
