import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type ModalHeaderProps = DataTestId & {
  children: ReactNode;
  withClose?: boolean;
};

const Header = ({
  children,
  'data-testid': testId = 'modal-header',
}: ModalHeaderProps) => {
  return (
    <Stack
      alignItems="center"
      as="header"
      className={styles.Header}
      data-testid={testId}
      justifyContent="space-between"
      margin={{ bottom: 9 }}
    >
      {children}
    </Stack>
  );
};

export default Header;
