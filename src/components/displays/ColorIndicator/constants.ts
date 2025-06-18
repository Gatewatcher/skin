import { THEME_COLORS } from '@/constants';

import type { ColorIndicatorSize } from './types';

export const COLOR_INDICATOR_SIZES = ['medium'] as const;
export const COLOR_INDICATOR_COLORS = [...THEME_COLORS] as const;

export const DEFAULT_SIZE: ColorIndicatorSize = 'medium';
