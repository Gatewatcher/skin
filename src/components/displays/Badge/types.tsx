import type { BADGE_SIZES, BADGE_TYPES } from './constants';

export type BadgeType = typeof BADGE_TYPES[number];
export type BadgeSize = typeof BADGE_SIZES[number];
