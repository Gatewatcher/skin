import type { SpringConfig } from 'react-spring';
import { easings } from 'react-spring';

import type { ColorsScale, IconSize, IllustrationSize } from '@/types';

export * from './icons';
export * from './lotties';
export * from './illustrations';

export const NEUTRAL_TYPES = ['neutral'] as const;

export const RISK_TYPES = ['low', 'medium', 'high', 'critical'] as const;

export const MESSAGE_TYPES = [
  'info',
  'success',
  'warning',
  'danger',
  'error',
] as const;
export const MESSAGE_TYPES_WITH_NEUTRAL = [
  ...MESSAGE_TYPES,
  ...NEUTRAL_TYPES,
] as const;

export const TYPES = [...RISK_TYPES, ...MESSAGE_TYPES];
export const TYPES_WITH_NEUTRAL = [...TYPES, ...NEUTRAL_TYPES] as const;

export const THEME_COLORS = [
  'grey',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'turquoise',
  'blue',
  'purple',
  'magenta',
] as const;

export const COLORS_SCAlE = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export const DEFAULT_COLOR_SCALE: ColorsScale = 500;
export const DEFAULT_COLOR_NEUTRAL_SCALE: ColorsScale = 700;

export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const BREAKPOINTS_MAP: Record<typeof BREAKPOINTS[number], number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export const MAX_SPACING = 13;

export const ANIMATION_SHARED_CONFIG: SpringConfig = {
  duration: 300,
  easing: easings.easeInOutSine,
};

export const ASSETS_BASE_SIZES = ['small', 'medium', 'large'] as const;
export const ASSETS_SIZES = [
  ...ASSETS_BASE_SIZES,
  'xLarge',
  'xxLarge',
] as const;

export const ICON_SIZES = ASSETS_SIZES;
export const ICON_DEFAULT_SIZE: IconSize = 'medium';
export const ICON_SIZES_REM: Record<IconSize, string> = {
  small: '1rem',
  medium: '1.25rem',
  large: '1.5rem',
  xLarge: '2rem',
  xxLarge: '3rem',
};

export const ILLUSTRATION_SIZES = ASSETS_BASE_SIZES;
export const ILLUSTRATION_DEFAULT_SIZE: IllustrationSize = 'medium';
export const ILLUSTRATION_SIZES_PX: Record<IllustrationSize, string> = {
  small: '208px',
  medium: '304px',
  large: '400px',
};
