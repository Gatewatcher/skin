import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import styles from '../styles.module.scss';

export type DropdownGroupProps = DataTestId & {
  children: ReactNode;
};

const Group = ({
  children,
  'data-testid': testId = 'dropdwon-group',
}: DropdownGroupProps) => {
  return (
    <div className={styles.DropdownGroup} data-testid={testId}>
      {children}
    </div>
  );
};

export default Group;
