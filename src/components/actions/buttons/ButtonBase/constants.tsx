import type { ButtonHTMLAttributes } from 'react';

import { NEUTRAL_TYPES } from '@/constants';

import type { ButtonSize, ButtonType, ButtonVariant } from './types';

export const BUTTON_TYPES = ['primary', 'danger'] as const;
export const BUTTON_TYPES_WITH_NEUTRAL = [...BUTTON_TYPES, ...NEUTRAL_TYPES];

export const BUTTON_VARIANTS = [
  'contained',
  'outlined',
  'ghosted',
  'transparent',
  'bared',
] as const;
export const BUTTON_SIZES = ['large', 'small'] as const;
export const BUTTON_BEHAVIORS: Required<
  ButtonHTMLAttributes<HTMLButtonElement>
>['type'][] = ['button', 'submit', 'reset'];

export const DEFAULT_TYPE: ButtonType = 'primary';
export const DEFAULT_VARIANT: ButtonVariant = 'contained';
export const DEFAULT_SIZE: ButtonSize = 'large';
export const DEFAULT_BEHAVIOR: ButtonHTMLAttributes<HTMLButtonElement>['type'] =
  'button';
