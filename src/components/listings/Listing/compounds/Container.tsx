import {
  classNames,
  stylesToPascalCase,
} from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import type { PlaceholderSizeProps } from '../types';

import styles from '../styles.module.scss';

export type ContainerProps = DataTestId &
  PlaceholderSizeProps & {
    children: ReactNode;
    className?: string;
  };

const Container = ({
  children,
  className,
  placeholderSize,
  ...rest
}: ContainerProps) => {
  return (
    <Stack
      className={classNames(
        styles.Container,
        stylesToPascalCase(styles, 'container', placeholderSize),
        className,
      )}
      alignItems="center"
      direction="column"
      gap={4}
      justifyContent="center"
      padding={{ y: 7 }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Container;
