import { TYPES_WITH_NEUTRAL } from '@/constants';
import { COLOR_PALETTE_THEME_COLORS } from '@/skin/forms/inputs/ColorPalette/constants';

import type { ChipType } from './types';

export const CHIP_THEME_COLORS = [...COLOR_PALETTE_THEME_COLORS] as const;
export const CHIP_TYPES_BASE = TYPES_WITH_NEUTRAL;

export const CHIP_TYPES = [...CHIP_TYPES_BASE, ...CHIP_THEME_COLORS] as const;

export const DEFAULT_TYPE: ChipType = 'info';
