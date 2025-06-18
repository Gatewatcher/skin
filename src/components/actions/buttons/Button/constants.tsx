import { ICON_DEFAULT_SIZE } from '@/constants';
import type { IconSize } from '@/types';

import { BUTTON_TYPES as BUTTON_BASE_TYPES } from '../ButtonBase/constants';
import type { ButtonSize } from './types';

export const BUTTON_SIZES = ['large', 'small'] as const;
export const BUTTON_TYPES = BUTTON_BASE_TYPES;

export const DEFAULT_SIZE: ButtonSize = 'large';

export const ICON_SIZES: Record<ButtonSize, IconSize> = {
  large: ICON_DEFAULT_SIZE,
  small: 'small',
};
