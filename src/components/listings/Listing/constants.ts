import type { ConvertSortValuesOptions, PlaceholderSize } from './types';

export const PLACEHOLDER_SIZES = ['small', 'medium'] as const;

export const DEFAULT_INITIAL_SORT = [];
export const DEFAULT_PLACEHOLDER_SIZE: PlaceholderSize = 'medium';
export const DEFAULT_CONVERT_SORT_VALUE_OPTIONS: Required<ConvertSortValuesOptions> =
  {
    separator: ',',
    asArray: false,
  };
