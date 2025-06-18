import type { ReactNode } from 'react';

import { Stack } from '@/skin/layout';

import styles from '../../styles.module.scss';

export type BatchActionsActions = {
  children: ReactNode;
};

const BatchActions = ({ children }: BatchActionsActions) => {
  return (
    <Stack
      className={styles.BatchActionsActions}
      gap={4}
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

export default BatchActions;
