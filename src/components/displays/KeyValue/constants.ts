import type { KeyValueVariant } from './types';

export const KEY_VALUE_VARIANTS = ['column', 'row'] as const;

export const DEFAULT_VALUE_FALLBACK = '-';
export const DEFAULT_KEY_VALUE_VARIANT: KeyValueVariant = 'column';
