import { type MetricsTextSize } from './types';

export const METRICS_TEXT_SIZES = [
  'small',
  'medium',
  'large',
  'extra-large',
] as const;

export const DEFAULT_SIZE: MetricsTextSize = 'small';
