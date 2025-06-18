import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../../styles.module.scss';

export type ToolbarProps = {
  children: ReactNode;
};

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <Stack className={styles.toolbar} padding={{ x: 4, y: 2 }}>
      {children}
    </Stack>
  );
};
