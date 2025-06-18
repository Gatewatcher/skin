import { MESSAGE_TYPES_WITH_NEUTRAL } from '@/constants';

import type { IconName } from '../icons/types';
import type { HintSize, HintVariant } from './types';

export const HINT_VARIANTS = MESSAGE_TYPES_WITH_NEUTRAL;

export const DEFAULT_VARIANT: HintVariant = 'neutral';

export const HINT_SIZES = ['small', 'medium'] as const;

export const DEFAULT_SIZE: HintSize = 'small';

export const HINT_ICONS: Record<HintVariant, IconName> = {
  neutral: 'CircleFilledWarning',
  info: 'CircleFilledInfo',
  danger: 'CircleFilledWarning',
  success: 'CircleFilledCheck',
  warning: 'CircleFilledWarning',
  error: 'CircleFilledWarning',
};
