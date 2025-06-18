import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type PopoverHeaderProps = DataTestId & {
  children: ReactNode;
  withDivider?: boolean;
};

const Header = ({
  children,
  'data-testid': testId = 'popover-header',
  withDivider = true,
}: PopoverHeaderProps) => {
  return (
    <Stack
      alignItems="flex-end"
      as="header"
      className={classNames(styles.Header, withDivider && styles.HeaderDivider)}
      data-testid={testId}
      gap={7}
      justifyContent="space-between"
      margin={{ bottom: 4 }}
      padding={{ bottom: 4 }}
    >
      {children}
    </Stack>
  );
};

export default Header;
