import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type CardHeaderProps = DataTestId & {
  children: ReactNode;
  withBorder?: boolean;
};

const Header = ({
  children,
  'data-testid': testId = 'card-header',
  withBorder = true,
}: CardHeaderProps) => {
  return (
    <Stack
      alignItems="center"
      as="header"
      className={classNames(styles.Header, withBorder && styles.HeaderBorder)}
      data-testid={testId}
      gap={2}
      justifyContent="space-between"
      padding={{ top: 6, ...(withBorder && { bottom: 6 }), x: 8 }}
    >
      {children}
    </Stack>
  );
};

export default Header;
