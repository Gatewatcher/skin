import type { SizeVariant as TextSize } from '@/skin/typography/types';

import type { ChipSize } from './types';

export const CHIP_CUSTOM = 'custom' as const;
export const CHIP_SIZES = ['large', 'medium', 'small'] as const;

export const DEFAULT_SIZE: ChipSize = 'medium';

export const CHIP_TEXT_SIZE: Record<ChipSize, TextSize> = {
  large: 'regular',
  medium: 'small',
  small: 'extra-small',
};
