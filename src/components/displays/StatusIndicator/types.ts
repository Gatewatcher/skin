import type {
  STATUS_INDICATOR_SIZES,
  STATUS_INDICATOR_TYPES,
} from './constants';

export type StatusIndicatorType = typeof STATUS_INDICATOR_TYPES[number];
export type StatusIndicatorSize = typeof STATUS_INDICATOR_SIZES[number];
