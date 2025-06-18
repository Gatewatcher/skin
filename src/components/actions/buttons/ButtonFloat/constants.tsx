import { type Elevation } from '@/hocs';

import { BUTTON_SIZES as BUTTON_BASE_SIZES } from '../ButtonBase/constants';
import type { ButtonSize, ButtonVariant } from './types';

export const BUTTON_SIZES = [...BUTTON_BASE_SIZES, 'medium'] as const;
export const BUTTON_VARIANTS = ['contained', 'outlined'] as const;

export const DEFAULT_SIZE: ButtonSize = 'medium';
export const DEFAULT_VARIANT: ButtonVariant = 'contained';
export const DEFAULT_ELEVATION: Elevation = 2;
