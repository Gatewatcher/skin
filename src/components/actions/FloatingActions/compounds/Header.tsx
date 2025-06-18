import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';
import { Text } from '@/skin/typography';

import styles from '../styles.module.scss';

export type FloatingActionsHeaderProps = DataTestId & {
  children: ReactNode;
};

const Header = ({
  children,
  'data-testid': testId = 'floating-actions-header',
}: FloatingActionsHeaderProps) => {
  return (
    <Stack className={styles.Body} data-testid={testId} padding={{ bottom: 6 }}>
      {isString(children) ? <Text>{children}</Text> : children}
    </Stack>
  );
};

export default Header;
