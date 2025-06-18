import type { ReactNode } from 'react';

import styles from './styles.module.scss';

export type SidePanelProps = {
  children?: ReactNode;
  width: number;
};

const Panel = ({ children, width }: SidePanelProps) => {
  return (
    <div
      className={styles.SidePanel}
      style={{ flex: `0 0 min(${width}px, 50%)` }}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export default Panel;
