import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import { type CSSProperties, type ReactNode } from 'react';

import styles from '../styles.module.scss';

export type ContentPanelProps = DataTestId & {
  children: ReactNode;
  innerWidth: CSSProperties['width'];
};

const MainPanel = ({
  'data-testid': testId = 'main-panel',
  children,
  innerWidth,
}: ContentPanelProps) => {
  return (
    <div className={styles.ContentPanel} data-testid={testId}>
      <main data-testid="main" style={{ minWidth: innerWidth }}>
        {children}
      </main>
    </div>
  );
};

export default MainPanel;
