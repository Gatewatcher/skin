import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { IconName } from '@/skin/displays';
import { IconContained } from '@/skin/displays';
import { Stack } from '@/skin/layout';
import type { ThemeColor } from '@/types';

import styles from '../styles.module.scss';

export type NavigationItemHeaderProps = DataTestId & {
  children: ReactNode;
  color: ThemeColor;
  icon: IconName;
};

const Header = ({
  children,
  color,
  'data-testid': testId = 'navigation-item-header',
  icon,
}: NavigationItemHeaderProps) => {
  return (
    <Stack
      alignItems="center"
      as="header"
      className={styles.Header}
      data-testid={testId}
      gap={4}
      margin={{ bottom: 7 }}
    >
      <IconContained color={color} name={icon} />
      {children}
    </Stack>
  );
};

export default Header;
