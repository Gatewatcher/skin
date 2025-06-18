import { getPropertyValue } from '@gatewatcher/bistoury/utils-dom';
import { insertIf, isDefined } from '@gatewatcher/bistoury/utils-lang';

import {
  DEFAULT_COLOR_NEUTRAL_SCALE,
  DEFAULT_COLOR_SCALE,
  RISK_TYPES,
} from '@/constants';
import type { ColorsScale, ColorsWithNeutral, RiskType } from '@/types';

export const getThemeValue = (property = ''): string => {
  return getPropertyValue(`--${property.replace(/^--/, '')}`);
};

export const getThemeSpacing = (
  spacing?: number | string,
  unit: 'rem' | 'px' = 'rem',
): string => {
  const value = getThemeValue(`spacing-${spacing}`);

  return unit === 'px' ? (+value.replace(/rem$/, '') * 16).toString() : value;
};

type GetColorOptions = {
  alpha?: number;
  currentColor?: boolean;
  variant?: ColorsScale;
};

export const getColor = (
  color?: ColorsWithNeutral | 'white' | 'transparent',
  options: GetColorOptions = {},
): string => {
  const { alpha, currentColor, variant } = options;

  if (currentColor) {
    return 'currentColor';
  }

  const value = [
    'color',
    ...insertIf(!!color, color),
    ...insertIf(!!color && RISK_TYPES.includes(color as RiskType), 'risk'),
    ...insertIf(
      !!variant &&
        ((color !== 'neutral' && variant !== DEFAULT_COLOR_SCALE) ||
          (color === 'neutral' && variant !== DEFAULT_COLOR_NEUTRAL_SCALE)),
      variant,
    ),
    ...insertIf(
      isDefined(alpha) && alpha !== 1,
      alpha === 0 ? 'a0' : `a${alpha?.toString().padStart(2, '0')}`,
    ),
  ].join('-');

  return getThemeValue(value) ? `var(--${value})` : '';
};
