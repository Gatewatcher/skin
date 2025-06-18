import { NEUTRAL_TYPES } from '@/constants';

import {
  BUTTON_SIZES as BUTTON_BASE_SIZES,
  DEFAULT_TYPE as BUTTON_BASE_TYPE,
  BUTTON_TYPES as BUTTON_BASE_TYPES,
} from '../ButtonBase/constants';
import type { ButtonSize, ButtonType } from './types';

export const BUTTON_SIZES = [...BUTTON_BASE_SIZES, 'medium'] as const;
export const BUTTON_TYPES = [...BUTTON_BASE_TYPES, ...NEUTRAL_TYPES] as const;

export const DEFAULT_SIZE: ButtonSize = 'medium';
export const DEFAULT_TYPE: ButtonType = BUTTON_BASE_TYPE;
