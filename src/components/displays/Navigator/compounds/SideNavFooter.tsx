import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../styles.module.scss';

export type SideNavFooterProps = DataTestId & {
  children: ReactNode;
};

const SideNavFooter = ({
  children,
  'data-testid': testId = 'sidenav-footer',
}: SideNavFooterProps) => {
  return (
    <Stack className={classNames(styles.SideNavFooter)} data-testid={testId}>
      {children}
    </Stack>
  );
};

export default SideNavFooter;
