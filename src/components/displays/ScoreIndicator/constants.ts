import type { ScoreIndicatorSize } from './types';

export const SUPPORTED_SECTOR_SIZE = [2, 3, 4, 6, 8, 9] as const;

export const SCORE_INDICATOR_SIZE = ['small', 'medium'] as const;

export const DEFAULT_SIZE: ScoreIndicatorSize = 'medium';
