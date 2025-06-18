import type { Type } from '@/types';

import type { SCORE_INDICATOR_SIZE } from './constants';

export type ScoreIndicatorSector = {
  type: Type;
  start: number;
  end: number;
  label?: string;
};

export type ScoreIndicatorSize = typeof SCORE_INDICATOR_SIZE[number];
