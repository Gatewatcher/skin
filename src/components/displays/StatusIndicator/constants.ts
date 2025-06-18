import { TYPES_WITH_NEUTRAL } from '@/constants';

import type { StatusIndicatorSize } from './types';

export const STATUS_INDICATOR_TYPES = TYPES_WITH_NEUTRAL;

export const STATUS_INDICATOR_SIZES = ['large', 'medium', 'small'] as const;
export const DEFAULT_STATUS_INDICATOR_SIZE: StatusIndicatorSize = 'small';
