import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import {
  filterKeys,
  isDefined,
  isObject,
} from '@gatewatcher/bistoury/utils-lang';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import { BREAKPOINTS } from '@/constants';
import type { Breakpoint } from '@/types';

import { SPACING_VARIANT_KEYS } from './constants';
import type { SpacingVariantKey, Spacings } from './types';
import { buildSpacingStyles } from './utils';

import styles from './styles.module.scss';

export const withSpacing = (
  BaseComponent: ReactElement,
  spacings?: Spacings,
) => {
  const availableSpacings = filterKeys(spacings || {}, ['padding', 'margin']);
  const spacingStyles = buildSpacingStyles(availableSpacings);

  const spacingsClassNames = Object.keys(availableSpacings).map(key => {
    const value = availableSpacings[key as keyof Spacings];

    if (!isDefined(value)) {
      return null;
    }

    const isVariantKey =
      isObject(value) &&
      Object.keys(value).some(prop =>
        SPACING_VARIANT_KEYS.includes(prop as SpacingVariantKey),
      );

    const isResponsiveKey =
      isObject(value) &&
      Object.keys(value).some(prop => BREAKPOINTS.includes(prop as Breakpoint));

    if (!isObject(value) || isResponsiveKey) {
      return stylesToPascalCase(styles, 'Spacings', key);
    }

    if (isVariantKey) {
      return Object.keys(value).map(k =>
        stylesToPascalCase(styles, 'Spacings', key, k),
      );
    }

    return stylesToPascalCase(styles, 'Spacings', key);
  });

  return cloneElement(BaseComponent, {
    ...BaseComponent.props,
    className: classNames(BaseComponent.props.className, ...spacingsClassNames),
    style: { ...BaseComponent.props.style, ...spacingStyles },
  });
};
