import { classNames } from '@gatewatcher/bistoury/utils-dom';
import type { CSSProperties, ReactNode } from 'react';

import styles from '../styles.module.scss';

export type PanelProps = {
  children?: ReactNode;
  className?: string;
  isActive: boolean;
  style?: CSSProperties;
};

const Panel = ({ children, className, isActive, style }: PanelProps) => {
  return (
    <div
      className={classNames(styles.panel, isActive && styles.active, className)}
      data-testid="tabpanel"
      hidden={!isActive}
      role="tabpanel"
      style={style}
    >
      {children}
    </div>
  );
};

export default Panel;
