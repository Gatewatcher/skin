import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from './styles.module.scss';

export type NavBarProps = DataTestId & {
  endElement: ReactNode;
  startElement: ReactNode;
};

const NavBar = ({
  'data-testid': testId = 'nav-bar',
  endElement,
  startElement,
}: NavBarProps) => {
  return (
    <Stack
      alignItems="center"
      as="nav"
      className={styles.NavBar}
      data-testid={testId}
      gap={3}
      justifyContent="space-between"
      padding={{ x: 9 }}
    >
      {startElement}

      <Stack alignItems="center" className={styles.endContainer} gap={7}>
        {endElement}
      </Stack>
    </Stack>
  );
};

export default NavBar;
