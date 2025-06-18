import { TYPES } from '@/constants';
import type { SizeVariant as TextSize } from '@/skin/typography/types';

import type { IconName } from '../icons/types';
import type { BadgeSize, BadgeType } from './types';

export const BADGE_TYPES = TYPES;
export const BADGE_SIZES = ['medium', 'small'] as const;

export const DEFAULT_SIZE: BadgeSize = 'medium';

export const BADGE_ICONS: Record<BadgeType, IconName> = {
  error: 'Warning',
  info: 'Check',
  low: 'Check',
  success: 'Check',
  critical: 'Warning',
  danger: 'Warning',
  high: 'Warning',
  medium: 'Warning',
  warning: 'Warning',
};

export const BADGE_TEXT_SIZES: Record<BadgeSize, TextSize> = {
  small: 'extra-small',
  medium: 'regular',
};
