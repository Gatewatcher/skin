import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { TabIdProps } from '../types';

import styles from '../styles.module.scss';

export type TabsPanelProps = TabIdProps &
  DataTestId & {
    children: ReactNode;
    path?: string;
  };

const TabsPanel = ({
  children,
  'data-testid': testId = 'tabs-panel',
}: TabsPanelProps) => {
  return (
    <div className={styles.TabsPanel} data-testid={testId}>
      {children}
    </div>
  );
};

export default TabsPanel;
