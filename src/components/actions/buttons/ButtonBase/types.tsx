import type {
  BUTTON_SIZES,
  BUTTON_TYPES_WITH_NEUTRAL,
  BUTTON_VARIANTS,
} from './constants';

export type ButtonSize = typeof BUTTON_SIZES[number];
export type ButtonType = typeof BUTTON_TYPES_WITH_NEUTRAL[number];
export type ButtonVariant = typeof BUTTON_VARIANTS[number];
