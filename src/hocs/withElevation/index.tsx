import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import type { Elevation, ElevationProps } from './types';

import styles from './styles.module.scss';

export type { Elevation, ElevationProps };

export const withElevation = (
  BaseComponent: ReactElement,
  elevation?: Elevation,
) => {
  return cloneElement(BaseComponent, {
    ...BaseComponent.props,
    className: classNames(
      BaseComponent.props.className,
      elevation && [
        styles.Elevation,
        stylesToPascalCase(styles, 'Elevation', elevation.toString()),
      ],
    ),
  });
};
