import { clamp, isDefined, isString } from '@gatewatcher/bistoury/utils-lang';

import { MAX_SPACING } from '@/constants';
import type { BreakpointProp } from '@/types';
import { buildCssBreakpointVariables } from '@/utils';

import { SPACING_VARIANT_KEYS } from './constants';
import type { SpacingVariantKey, Spacings } from './types';

export const buildSpacingStyles = (spacings: Spacings = {}) => {
  const transform = (value: number | string): string =>
    isString(value)
      ? `var(--spacing-${value})`
      : `var(--spacing-${clamp(value, 0, MAX_SPACING)})`;

  return Object.entries(spacings).reduce((acc, [key, value]) => {
    if (!isDefined(value)) {
      return acc;
    }

    const isVariantKey = Object.keys(value).some(prop =>
      SPACING_VARIANT_KEYS.includes(prop as SpacingVariantKey),
    );

    if (isVariantKey) {
      const styles = Object.entries(value).reduce(
        (acc, [spacingKey, spacingValue]) => {
          const propKey: string = [key, spacingKey].join('-');

          return {
            ...acc,
            ...buildCssBreakpointVariables(propKey, spacingValue, transform),
          };
        },
        {},
      );

      return { ...acc, ...styles };
    } else {
      return {
        ...acc,
        ...buildCssBreakpointVariables(key, value as BreakpointProp, transform),
      };
    }
  }, {});
};
