import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactNode } from 'react';

import type { NavIdProps } from '../types';

import styles from '../styles.module.scss';

export type NavigatorPanelProps = NavIdProps &
  DataTestId & {
    children: ReactNode;
    path?: string;
  };

const NavigatorPanel = ({
  children,
  'data-testid': testId = 'navigator-panel',
}: NavigatorPanelProps) => {
  return (
    <div className={styles.NavigatorPanel} data-testid={testId}>
      {children}
    </div>
  );
};

export default NavigatorPanel;
