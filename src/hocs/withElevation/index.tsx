import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import type { ReactElement } from 'react';
import { cloneElement } from 'react';

import type { Elevation, ElevationProps } from './types';

import styles from './styles.module.scss';

export type { Elevation, ElevationProps };

export const withElevation = <T extends { className?: string }>(
  BaseComponent: ReactElement<T>,
  elevation?: Elevation,
) => {
  const props = BaseComponent.props;
  return cloneElement(BaseComponent, {
    ...props,
    className: classNames(
      props.className,
      elevation && [
        styles.Elevation,
        stylesToPascalCase(styles, 'Elevation', elevation.toString()),
      ],
    ),
  });
};
