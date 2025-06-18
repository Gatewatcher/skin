import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import { useSidenavContext } from '../context';

import styles from '../styles.module.scss';

export type SideNavFooterProps = DataTestId & {
  children: ReactNode;
};

const SideNavFooter = ({
  children,
  'data-testid': testId = 'side-nav-footer',
}: SideNavFooterProps) => {
  const { isOpened } = useSidenavContext();
  return (
    <Stack
      alignItems="center"
      as="footer"
      className={classNames(styles.Footer, !isOpened && styles.FooterClosed)}
      data-testid={testId}
    >
      {children}
    </Stack>
  );
};

export default SideNavFooter;
