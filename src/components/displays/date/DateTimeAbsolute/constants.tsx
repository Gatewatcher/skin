import { DATE_LONG_FORMAT } from '../DateTime/constants';
import type { Format } from './types';

export const FORMATS = ['short', 'long'] as const;

export const DEFAULT_FORMAT: Format = 'short';
export const FORMATS_CORRESPONDANCES: Record<
  Format,
  { text: string; tooltip: string }
> = {
  short: {
    text: 'L',
    tooltip: DATE_LONG_FORMAT,
  },
  long: {
    text: DATE_LONG_FORMAT,
    tooltip: `${DATE_LONG_FORMAT}:SSS`,
  },
};
